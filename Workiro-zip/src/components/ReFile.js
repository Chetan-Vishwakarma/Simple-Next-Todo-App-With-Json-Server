import React, { useEffect, useState } from 'react';

import { Box, Button, Typography, Dialog, DialogContent, DialogContentText, Tabs, Tab, Checkbox, Menu, MenuItem, DialogActions, Grid, FormControlLabel, TextField, Autocomplete, RadioGroup, FormLabel, Radio, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenReIndex } from '../redux/reducers/counterSlice';

import { DatePicker, LocalizationProvider, esES } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CommanCLS from '../services/CommanService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Json_ExplorerSearchDoc_Redux, fetchRecentDocumentsRedux } from '../redux/reducers/api_helper';
import { Tune } from '@mui/icons-material';
import moment from 'moment';
import dayjs from 'dayjs';

const ReFile = ({ ReIndexopen, setReIndexOpen, selectedDocument }) => {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
    let cls = new CommanCLS(baseUrl, agrno, Email, password);

    const { allFolders, allSections, allClientsList } = useSelector(state => state.counter.connectionsState);

    const { opentReIndex } = useSelector((state) => state.counter.refile);
    const dispatch = useDispatch();

    // const {selectedDocumentRedux} = useSelector((state)=>state.counter.selectedDocumentRedux);

    console.log("selectedDocumentRedux", allFolders, allSections, allClientsList, selectedDocument,dayjs(selectedDocument["Item Date"]).format("YYYY/MM/DD"))

    const [isDisabled, setIsDisabled] = useState(false);

    const [txtFolder, setTxtFolder] = useState(null);
    const [txtSection, setTxtSection] = useState("");
    const [txtCompanyName, setTxtCompanyName] = useState("");

    const [btnSubmit, setBtnSubmit] = useState("Submit");


    const [isDisabledFolder, setIsDisabledFolder] = useState(false);
    const [isDisabledComp, setIsDisabledCom] = useState(false);
    const [isDisabledSection, setIsDisabledSection] = useState(false);


    const ReIndexhandleClose = () => {
        setBtnSubmit("Submit")
        setReIndexOpen(false);
        setIsDisabled(true);
        setIsDisabledCom(false);
        setIsDisabledFolder(false);
        setIsDisabledSection(false);


    };
    const HandalClickRefile = () => {
        // setReIndexOpen(false);
        Json_ReFileDocument();
    };

    function Json_ReFileDocument() {
        try {
            console.log("Invalid btnSubmit value:", btnSubmit);

            let o = {};
            if (btnSubmit === "Folder Update") {
                o = {
                    'ItemId': selectedDocument["Registration No."],
                    'ProjectId': txtFolder.FolderID,
                    'ClientId': '',
                    'sectionId': '-1',
                    'subsectionId': '-1'
                };
            } else if (btnSubmit === "Section Update") {
                o = {
                    'ItemId': selectedDocument["Registration No."],
                    'ProjectId': "-1",
                    'ClientId': '',
                    'sectionId': txtSection.SecID,
                    'subsectionId': '-1'
                };
            } else if (btnSubmit === "Client Update") {
                o = {
                    'ItemId': selectedDocument["Registration No."],
                    'ProjectId': "-1",
                    'ClientId': txtCompanyName.OriginatorNo,
                    'sectionId': "-1",
                    'subsectionId': '-1'
                };
            } else if (btnSubmit === "Document Date Update") {
               
                Json_ReIndexDate();
                return;
            }

            cls.Json_ReFileDocument(o, function (sts, data) {
                if (sts) {
                    if (data === "Success") {
                        toast.success("Document Filing Index Updated");
                        dispatch(fetchRecentDocumentsRedux());
                        let obj = {};
                        obj.ProjectId = selectedDocument.ProjectId;
                        obj.ClientId = selectedDocument.OriginatorNo;
                        obj.sectionId = "-1";
                        dispatch(Json_ExplorerSearchDoc_Redux(obj));
                        setIsDisabled(true)
                        setIsDisabledFolder(false);
                        setIsDisabledSection(false);
                        setIsDisabledCom(false);

                    } else {
                        toast.error("Document Filing Index Not Update Please Try Again !");
                    }
                } else {
                    //toast.error("Document Filing Index Not Update Please Try Again !");
                }
            });
        } catch (error) {
            console.error("Network Error, Json_ReFileDocument:", error);
        }

    }

    function Json_ReIndexDate() {
        try {
            var obj = {};
            obj.ItemDate = documentDate;
            obj.ReceivedDate = receivedDate;
            obj.ItemId = selectedDocument["Registration No."];
            cls.Json_ReIndexDate(obj, function (sts, data) {
                if (sts) {
                    if (data === "Success") {
                        toast.success("Document Filing Index Updated");
                        setBtnSubmit("Submit")
                        setIsDisabled(true)
                        setIsDisabledFolder(false);
                        setIsDisabledSection(false);
                        setIsDisabledCom(false);
                    }
                }
            })

        } catch (error) {
            console.log("Network error ", error)
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
        setIsDisabled(btnSubmit !== "Folder Update" && btnSubmit !== "Section Update" && btnSubmit !== "Client Update"&& btnSubmit !== "Document Date Update");
    }, [btnSubmit]);


    const [documentDate, setDocumentDate] = useState(selectedDocument?dayjs(selectedDocument["Item Date"]): null);
    const [receivedDate, setReceivedDate] = useState(selectedDocument? dayjs(selectedDocument["Received Date"]): null);

    const today = new Date();
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
                                setIsDisabledCom(true);
                                setIsDisabledSection(true);
                                // Disable other Autocomplete components based on selection
                                //setTxtSection(null); // Reset selected section
                                //setTxtCompanyName(null); // Reset selected client

                            }}
                            disabled={isDisabledFolder}
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
                                //setTxtFolder(null); // Reset selected section
                                // setTxtCompanyName(null); // Reset selected client
                                setIsDisabledFolder(true);
                                setIsDisabledCom(true);
                            }}
                            disabled={isDisabledSection}
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
                                console.log("selected clietn", value)
                                setTxtCompanyName(value)
                                setBtnSubmit("Client Update")
                                // Disable other Autocomplete components based on selection
                                //setTxtFolder(null); // Reset selected section
                                // setTxtSection(null); // Reset selected client
                                setIsDisabledFolder(true);
                                setIsDisabledSection(true);
                            }}
                            disabled={isDisabledComp}
                            renderInput={(params) => <TextField {...params} label="Client" />}
                            MenuProps={{ PaperProps: { sx: { maxHeight: '100px !important' } } }}
                        />
                    </Grid>
                    <Grid className='mt-0' container spacing={2}>
                        <Grid item xs={6} md={6} className='pt-0'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Document Date" className=" w-100"
                                    format="DD/MM/YYYY"
                                        value={documentDate}
                                        onChange={(newValue) => {
                                          
                                            setIsDisabled(false)
                                            let yy = dayjs(newValue).format("YYYY/MM/DD");
                                            setDocumentDate(yy);
                                            setBtnSubmit("Document Date Update")
                                            console.log("documentDate",yy)
                                        }}

                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6} md={6} className='pt-0'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Received Date" className=" w-100"
                                    format="DD/MM/YYYY"
                                        value={receivedDate}
                                        
                                        onChange={(newValue) => {
                                           
                                             setIsDisabled(false)

                                             let yy = dayjs(newValue).format("YYYY/MM/DD");

                                            setReceivedDate(yy);
                                            setBtnSubmit("Document Date Update")
                                            console.log("ReceivedDate",yy)
                                        }}
                                    />
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