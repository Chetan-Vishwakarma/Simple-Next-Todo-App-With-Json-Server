import React, { useEffect, useState } from 'react';

import { Box, Button, Typography, Dialog, DialogContent, DialogContentText, Tabs, Tab, Checkbox, Menu, MenuItem, DialogActions, Grid, FormControlLabel, TextField, Autocomplete, RadioGroup, FormLabel, Radio, FormControl } from '@mui/material';
import { useSelector } from 'react-redux';
import { setOpenReIndex } from '../redux/reducers/counterSlice';

import { DatePicker, LocalizationProvider, esES } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CommanCLS from '../services/CommanService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReFile = ({ ReIndexopen, setReIndexOpen, selectedDocument }) => {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
    let cls = new CommanCLS(baseUrl, agrno, Email, password);

    const { allFolders, allSections, allClientsList } = useSelector(state => state.counter.connectionsState);

    const { opentReIndex } = useSelector((state) => state.counter.refile);

    // const {selectedDocumentRedux} = useSelector((state)=>state.counter.selectedDocumentRedux);

    console.log("selectedDocumentRedux", allFolders, allSections, allClientsList, selectedDocument)

    const [isDisabled, setIsDisabled] = useState(false);

    const [txtFolder, setTxtFolder] = useState(null);
    const [txtSection, setTxtSection] = useState("");
    const [txtCompanyName, setTxtCompanyName] = useState("");

    const [btnSubmit, setBtnSubmit] = useState("Submit");
    const [optDesabled, setoptDesabled] = useState(false);

    const ReIndexhandleClose = () => {
        setReIndexOpen(false);

    };
    const HandalClickRefile = () => {
        // setReIndexOpen(false);
        Json_ReFileDocument();
    };

    function Json_ReFileDocument() {
        try {
            let o = "";
            if(btnSubmit === "Folder Update"){
                o = {'ItemId': selectedDocument["Registration No."], 'ProjectId': txtFolder.FolderID, 'ClientId': '', 'sectionId': '-1', 'subsectionId': '-1' };
            }
            else if(btnSubmit==="Section Update"){
                o = {'ItemId': selectedDocument["Registration No."], 'ProjectId': "-1", 'ClientId': '', 'sectionId': txtSection.SecID, 'subsectionId': '-1' }; 
            } 
            else{
                console.log("Json_ReFileDocument obj", o);
            }
            
            console.log("Json_ReFileDocument obj", o);
            cls.Json_ReFileDocument(o, function (sts, data) {
                if (sts) {
                    if (data === "Success") {
                        toast.success("Document Filing Index Updated");
                    }
                    else {
                        toast.error("Document Filing Index Not Update Please Try Again !")
                    }
                }
                else {
                    toast.error("Document Filing Index Not Update Please Try Again !")
                }
            })
        } catch (error) {
            console.log("Network Error, Json_ReFileDocument", error)
        }
    }

    useEffect(() => {
        if (selectedDocument) {
            const defaultFolder = allFolders.find(fid => fid.FolderID === selectedDocument.ProjectId);
            setTxtFolder(defaultFolder || null)

            const defaultSection = allSections.find((secid) => secid.SecID === selectedDocument.PostItemTypeID);
            setTxtSection(defaultSection || null);

            const defaultClient = allClientsList.find((cid) => cid.OriginatorNo === selectedDocument.SenderId);
            setTxtCompanyName(defaultClient || null);

        }


    }, [selectedDocument])


    useEffect(() => {
        setIsDisabled(btnSubmit !== "Folder Update" && btnSubmit !== "Section Update" && btnSubmit !== "Client Update");
    }, [btnSubmit]);

    return (<>
        <Dialog
            open={ReIndexopen}
            onClose={opentReIndex}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='custom-modal'

            sx={{
                maxWidth: 600,
                width: '100%',
                margin: '0 auto'
            }}
        >
            <Box className="d-flex align-items-center justify-content-between modal-head">
                <Box className="dropdown-box">
                    <Typography variant="h4" className='font-18 bold text-black'>
                        Re-Index
                    </Typography>
                </Box>

                {/*  */}
                <Button onClick={ReIndexhandleClose}>
                    <span className="material-symbols-outlined text-black">
                        cancel
                    </span>
                </Button>
            </Box>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">

                    <Grid item xs={6} md={6} className='mb-3'>
                        <Autocomplete
                            disablePortal

                            options={allFolders}
                            getOptionLabel={(option) => option.Folder}
                            value={txtFolder || null}
                            onChange={(event, value) => {
                                event.preventDefault();
                                setTxtFolder(value);
                                setBtnSubmit("Folder Update")
                                // Disable other Autocomplete components based on selection
                                setTxtSection(null); // Reset selected section
                                setTxtCompanyName(null); // Reset selected client
                            }}
                            renderInput={(params) => <TextField {...params} label="Folder" />}
                            MenuProps={{ PaperProps: { sx: { maxHeight: '100px !important' } } }}
                        />
                    </Grid>

                    <Grid item xs={6} md={6} className='mb-3'>
                        <Autocomplete
                            disablePortal
                            options={allSections}
                            getOptionLabel={(option) => option.Sec}
                            value={txtSection || null}
                            onChange={(event, value) => {
                                event.preventDefault();
                                setTxtSection(value)
                                setBtnSubmit("Section Update");
                                // Disable other Autocomplete components based on selection
                                setTxtFolder(null); // Reset selected section
                                setTxtCompanyName(null); // Reset selected client
                            }}

                            renderInput={(params) => <TextField {...params} label="Section" />}
                            MenuProps={{ PaperProps: { sx: { maxHeight: '100px !important' } } }}
                        />
                    </Grid>

                    <Grid item xs={6} md={6} className='mb-3'>
                        <Autocomplete
                            disablePortal
                            options={allClientsList}
                            getOptionLabel={(option) => option["Company Name"]}
                            value={txtCompanyName || null}
                            onChange={(event, value) => {
                                event.preventDefault();
                                // console.log("selected clietn",value)
                                setTxtCompanyName(value)
                                setBtnSubmit("Client Update")
                                 // Disable other Autocomplete components based on selection
                                 setTxtFolder(null); // Reset selected section
                                 setTxtSection(null); // Reset selected client
                            }}
                            renderInput={(params) => <TextField {...params} label="Client" />}
                            MenuProps={{ PaperProps: { sx: { maxHeight: '100px !important' } } }}
                        />
                    </Grid>
                    <Grid className='mt-0' container spacing={2}>
                        <Grid item xs={6} md={6} className='pt-0'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Document Date" className=" w-100" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6} md={6} className='pt-0'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Received Date" className=" w-100" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                    </Grid>
                </DialogContentText>

                <DialogActions className='mt-4 mb-3 p-0'>
                    <Button className='btn-red' onClick={ReIndexhandleClose}>Cancel</Button>
                    <Button disabled={isDisabled} className='btn-blue-2' onClick={HandalClickRefile} autoFocus>
                        {btnSubmit}
                    </Button>
                </DialogActions>

            </DialogContent>
        </Dialog>
        <ToastContainer></ToastContainer>
    </>)
}
export default ReFile