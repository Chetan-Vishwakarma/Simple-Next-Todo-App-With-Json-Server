import React, { useEffect, useState } from 'react';

import { Box, Button, Typography, Dialog, DialogContent, DialogContentText, Tabs, Tab, Checkbox, Menu, MenuItem, DialogActions, Grid, FormControlLabel, TextField, Autocomplete, RadioGroup, FormLabel, Radio, FormControl } from '@mui/material';
import { useSelector } from 'react-redux';
import { setOpenReIndex } from '../redux/reducers/counterSlice';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const ReFile=({ReIndexopen,setReIndexOpen,selectedDocument})=>{

    const { allFolders,allSections,allClientsList } = useSelector(state=> state.counter.connectionsState);

    const {opentReIndex}=useSelector((state)=>state.counter.refile);

   // const {selectedDocumentRedux} = useSelector((state)=>state.counter.selectedDocumentRedux);

    console.log("selectedDocumentRedux",allFolders,allSections,allClientsList )

   

    const [txtFolder,setTxtFolder]=useState(null);

    const [txtSection,setTxtSection]=useState("");
    const [txtCompanyName,setTxtCompanyName]=useState("");

    const ReIndexhandleClose = () => {
        setReIndexOpen(false)
    };

    useEffect(()=>{
        if(selectedDocument){
            const defaultFolder = allFolders.find(fid => fid.FolderID === selectedDocument.ProjectId);
            setTxtFolder(defaultFolder || null)

            const defaultSection = allSections.find((secid)=>secid.SecID===selectedDocument.PostItemTypeID);
            setTxtSection(defaultSection || null);

            const defaultClient = allClientsList.find((cid)=>cid.OriginatorNo===selectedDocument.SenderId);
            setTxtCompanyName(defaultClient || null);

        }

      
    },[selectedDocument])

    return(<>
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
                                onChange={(event, value)=>{
                                    event.preventDefault();
                                    setTxtFolder(value)
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
                                onChange={(event, value)=>{
                                    event.preventDefault();
                                    setTxtSection(value)
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
                                onChange={(event,value)=>{
                                    event.preventDefault();
                                    setTxtCompanyName(value)
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
                        <Button className='btn-blue-2' onClick={ReIndexhandleClose} autoFocus>
                            Submit
                        </Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
    </>)
}
export default ReFile