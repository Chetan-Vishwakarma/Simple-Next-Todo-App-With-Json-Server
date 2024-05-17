import moment from 'moment';
import React, { useState } from 'react'
import Activity from '../client/utils/Activity';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Dialog, DialogContent, DialogContentText, Link, Accordion, AccordionSummary, AccordionDetails, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskDetailModal from '../components/TaskDetailModal';
import { useSelector } from 'react-redux';

function DocForDetail({ openDocumentDetailsList, setOpenDocumentDetailsList, docForDetails, getVertion, associatedTask, getAudit, call_Json_GetAudit }) {

    const allTaskData = useSelector(state=>state.counter.actualData);
    const [expanded, setExpanded] = React.useState('panel1');
    const [isApi, setIsApi] = useState(false);
    const [openModal, setOpen] = React.useState(false);  //for task detail modal
    const [selectedTask, setSelectedTask] = useState({});
    const [attachmentFileTodo, setAttachmentFileTodo] = useState([]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleCloseDocumentDetailsList = (event) => {
        event.stopPropagation();
        setOpenDocumentDetailsList(false);
    };
    const handleTaskDetailModalOpen=(e,itm)=>{
        e.stopPropagation();
        e.preventDefault();
        let fltTask = allTaskData.filter(task=>task.ID===itm.Taskid);
        setSelectedTask(fltTask[0]);
        setOpen(true);
    }
    return (
        <>

            <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal} attachmentFileTodo={attachmentFileTodo}></TaskDetailModal>

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
                <Box className="d-flex align-items-center justify-content-between modal-head">
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
                <DialogContent>
                    <DialogContentText>

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
                                                    <TableCell className='bold'>Details</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Object.keys(docForDetails).length > 0 && Object.keys(docForDetails).map((itm, i) => {
                                                    if (["Registration No.", "Folder", "Client", "Section", "Received Date", "Item Date", "FileSize", "Notes", "Category", "Attachment(s)", "Type", "Version", "ReceivedBy", "Item ID"].includes(itm)) {
                                                        return <TableRow
                                                            key={i}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="left" className='bold'>{itm}</TableCell>
                                                            <TableCell align="left">{docForDetails[itm] !== "" && docForDetails[itm] !== undefined && docForDetails[itm] !== null && docForDetails[itm] !== "undefined" ? docForDetails[itm] : ""}</TableCell>
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
                                        {getVertion.length > 0 ? getVertion.map((item, index) => {
                                            return <>
                                                <Box className="file-uploads" key={index}>
                                                    <label className="file-uploads-label file-uploads-document">
                                                        <Box className="d-flex align-items-center">
                                                            <div className='img-format'>
                                                                {/* <img src={Fileformat} /> */}
                                                            </div>
                                                            <Box className="upload-content pe-3">
                                                                <Typography variant="h4" >
                                                                    Version No {item.VersionNo}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {moment(item["VDate"]).format("DD/MM/YYYY HH:mm:ss")} | Updated by {item.UserName.toUpperCase()}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </label>
                                                </Box>
                                            </>
                                        }) : ""}


                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            {/* end */}
                            <Accordion className='accordian-box' expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    Attached To
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box className='mt-3'>

                                        {associatedTask.length > 0 && associatedTask.map((itm, i) => {
                                            return <>
                                                <Link key={i} href="#"
                                                     onClick={(e) => handleTaskDetailModalOpen(e, itm)} 
                                                    className="text-decoration-none d-inline-flex align-content-center me-3 mb-3 flex"><RadioButtonUncheckedIcon className="me-1" />{itm.Subject}</Link>
                                            </>
                                        })}
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
                                    <Activity getAudit={getAudit} selectedDocument={docForDetails} call_Json_GetAudit={call_Json_GetAudit}></Activity>
                                </AccordionDetails>
                            </Accordion>

                        </Box>

                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default DocForDetail
