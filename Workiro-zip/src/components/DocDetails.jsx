import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Link, Chip, Stack, ListItemIcon, Radio, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import Activity from '../client/utils/Activity';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskDetailModal from './TaskDetailModal';

// sadik code start
function createData(document, details) {
    return { document, details };
}
const rows = [
    createData('Folder', 'Client'),
    createData('Client', '212121Test'),
    createData('Section', '01. General Correspondence'),
    createData('Received Date', '02/03/2024'),
    createData('Doc. Date', '02/03/2024'),
    createData('Description', 'General Letter'),
    createData('Notes', 'Yes'),
    createData('Category', '1. Received'),
    createData('DocDirection', 'Incoming'),
    createData('ItemId', 998301),
    createData('Tax Year', '18/19'),
    createData('Financial Year', '2020'),
    createData('From Email', 'test@gmail.com'),
    createData('to Email', 'test@gmail.com'),
    createData('CC', 'test@gmail.com')
];

function DocDetails({ expanded, setExpanded, ClsSms, docForDetails, openDocumentDetailsList, setOpenDocumentDetailsList }) {
    // const [openDocumentDetailsList, setOpenDocumentDetailsList] = useState(false);
    const [associatedTask, setAssociatedTask] = useState([]);
    const [selectedTask,setSelectedTask] = useState({});
    const [openModal, setOpen] = React.useState(false);
    const handleClickDetailOpen = () => {
        setOpen(true);
    };
    const [isApi, setIsApi] = useState(false);
    const Json_CRM_GetOutlookTask=(event,sTask)=>{
        event.preventDefault();
        let obj = {
            Email: localStorage.getItem('Email'),
            agrno: localStorage.getItem("agrno"),
            password: localStorage.getItem("Password") 
        };
        try{
            ClsSms.Json_CRM_GetOutlookTask(obj,(sts,data)=>{
                const res = JSON.parse(data);
                if(res.Table){
                    const fltTask = res.Table.filter(itm=>itm.ID===sTask.Taskid);
                    const formattedTasks = fltTask.map((task) => {
                        let timestamp,timestamp2;
                        if (task.EndDateTime) {
                            timestamp = parseInt(task.EndDateTime.slice(6, -2));
                        }
                        if(task.CreationDate){
                            timestamp2 = parseInt(task.CreationDate.slice(6, -2));
                        }
        
                        const date = new Date(timestamp);
                        const date2 = new Date(timestamp2);
        
                        return { ...task, EndDateTime: date, CreationDate: date2 };
                    });
                    setSelectedTask(formattedTasks[0]);
                    handleClickDetailOpen(formattedTasks[0]);
                }
            });
        }catch(err){
            console.log("Error while calling Json_CRM_GetOutlookTask",err);
        }
    }
    const handleCloseDocumentDetailsList = (event) => {
        event.stopPropagation();
        setOpenDocumentDetailsList(false);
    };
    // accordian

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const Json_getAssociatedTaskListByDocumentId=(sDoc=docForDetails)=>{
        let obj = {
            Email: localStorage.getItem('Email'),
            ItemId: sDoc["Registration No."],
            agrno: localStorage.getItem("agrno"),
            password: localStorage.getItem("Password")
        }
        try{
            ClsSms.Json_getAssociatedTaskListByDocumentId(obj, (sts,data)=>{
                const res = JSON.parse(data);
                if(res.Table.length>0){
                    console.log("ddsfsf",res.Table);
                    setAssociatedTask(res.Table);
                }else{
                    setAssociatedTask([]);
                }
            })
        }catch(err){
            console.log("Error while calling Json_getAssociatedTaskListByDocumentId",err);
        }
    }

    const startFormattingDate=(timeStamp)=>{
        const dateObject = new Date(timeStamp);
        return `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
    }

    return (
        <>
        <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal}></TaskDetailModal>
        <Dialog
            open={openDocumentDetailsList}
            onClose={(event) => handleCloseDocumentDetailsList(event)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='custom-modal'
            sx={{
                maxWidth: 640,
                margin: '0 auto'
            }}
        >
            <DialogContent>
                <DialogContentText>

                    <Box className="d-flex align-items-center justify-content-between">
                        <Box className="dropdown-box">
                            <Typography variant="h4" className='font-18 bold mb-0 text-black'>
                                Document Details
                            </Typography>
                        </Box>

                        {/*  */}
                        <Button onClick={(event) => handleCloseDocumentDetailsList(event)} autoFocus sx={{ minWidth: 30 }}>
                            <span className="material-symbols-outlined text-black">
                                cancel
                            </span>
                        </Button>
                    </Box>

                    <hr />

                    <Box className='main-accordian main-accordian-single-row'>
                        <Accordion className='accordian-box' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Document Details
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: '100%' }} aria-label="simple table" size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className='bold'>Document</TableCell>
                                                <TableCell className='bold' align="right">Details</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* {rows.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left" className='bold'>{row.document}</TableCell>
                                                    <TableCell align="left">{row.details}</TableCell>
                                                </TableRow>
                                            ))} */}
                                            {Object.keys(docForDetails).length > 0 && Object.keys(docForDetails).map((itm, i) => {
                                                if (itm !== "StickyNotes") {
                                                    return <TableRow
                                                        key={i}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="left" className='bold'>{itm}</TableCell>
                                                        <TableCell align="left">{docForDetails[itm] !== "" && docForDetails[itm] !== undefined && docForDetails[itm] !== null && docForDetails[itm] !== "undefined" ? ["Received Date","Item Date"].includes(itm)?startFormattingDate(docForDetails[itm]):docForDetails[itm] : ""}</TableCell>
                                                    </TableRow>
                                                }
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className='accordian-box' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                Document Versions
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box className='table-responsive'>

                                    <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">
                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        This File is Test Files.pdf 2
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        12:36PM 28/12/2023 | File uploaded by Patrick
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </label>
                                    </Box>
                                    {/* file upload end */}

                                    <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">
                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        test doc file.doc
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        11:16PM 09/012/2024 | File uploaded by Patrick
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </label>
                                    </Box>
                                    {/* file upload end */}

                                    <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">
                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        loremipsomedolorsite.pdf
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        02:36PM 06/05/2023 | File uploaded by Patrick
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </label>
                                    </Box>
                                    {/* file upload end */}

                                    <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">
                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        This File is Test Files.pdf
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        02:36PM 06/05/2023 | File uploaded by Patrick
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </label>
                                    </Box>
                                    {/* file upload end */}


                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        {/* end */}



                        <Accordion onClick={()=>Json_getAssociatedTaskListByDocumentId(docForDetails)} className='accordian-box' expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                Attached To
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box className='mt-3'>

                                    {associatedTask.length > 0 ? associatedTask.map((itm, i) => {
                                        return <>
                                            <Link key={i} href="#" onClick={(e) => Json_CRM_GetOutlookTask(e, itm)} className="text-decoration-none d-inline-flex align-content-center me-3 mb-3 flex"><RadioButtonUncheckedIcon className="me-1" />{itm.Subject}</Link>
                                        </>
                                    }) : "Associated Task Not Available"}
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className='accordian-box' expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4-content"
                                id="panel4-header"
                            >
                                Activity
                            </AccordionSummary>
                            <AccordionDetails>

                                <Activity></Activity>


                                {/* {Array(5).fill("").map(() => {
                                        return <> */}
                                {/* <Box className='mb-3'>
                                                <Typography variant="body1" className="text-black sembold font-16">
                                                    New version uploaded
                                                </Typography>

                                                <Typography variant="body1" className="font-12 sembold text-gray">
                                                    02:36PM 06/05/2023 | by Me
                                                </Typography>

                                            </Box> */}
                                {/* </>
                                    })} */}
                            </AccordionDetails>
                        </Accordion>

                    </Box>

                </DialogContentText>
            </DialogContent>

        </Dialog>
        </>
    )
}

export default DocDetails
