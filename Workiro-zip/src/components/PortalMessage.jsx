import React, { useEffect, useRef, useState } from "react";
import CommanCL from "../services/CommanService";
import HtmlEditorDX from "./HtmlEditor";
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Link, Chip, Stack, ListItemIcon, Radio, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, } from '@mui/material';
import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import CopyLinkButton from "./CopyLinkButton";

import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/material/styles';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

import NewReleasesIcon from '@mui/icons-material/NewReleases';
import VerifiedIcon from '@mui/icons-material/Verified';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import DraftsIcon from '@mui/icons-material/Drafts';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BallotIcon from '@mui/icons-material/Ballot';
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const PortalMessage = ({ selectedTask }) => {
    console.log("selectedTask portal message", selectedTask)

    const baseUrlPortal = "https://portal.docusoftweb.com/clientservices.asmx/";
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    let ClsPortal = new CommanCL(baseUrlPortal, agrno, Email, password);



    /////////////////////Call Portal Methods  
    const [templateDataMarkup, setTemplateDataMarkup] = useState(null);
    const [editorContentValue, setEditorContentValue] = useState(null);
    const [portalEmail, setPortalEmail] = useState([]);
    const [anchorElMgs, setAnchorElMgs] = React.useState(null);
    const [messageEmail, setMessageEmail] = React.useState("Select Message");
    const [portalEmailOpbject, setPortalEmailOpbject] = React.useState({});
    const [filterAttachments, setFilterAttachments] = React.useState([]);
    const [allPortalAttachments, setAllPortalAttachments] = React.useState([]);

    const [iframeViewDocument, setIframeViewDocument] = React.useState(null);
    const [OpenPortalAttachmnet, setOpenPortalAttachmnet] = React.useState(false);
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [messageViewHistory, setMessageViewHistory] = React.useState([]);

    const [copyLink, setCopyLink] = React.useState("");
    const [certificateData, setCertificateData] = React.useState("");

    const handleClickOpenPortalAtt = () => {
        setOpenPortalAttachmnet(true);
    };
    const handleClosePortalAtt = () => {
        setOpenPortalAttachmnet(false);
    };


    const openMgsMail = Boolean(anchorElMgs);
    const handleClickMgsMail = (event) => {
        setAnchorElMgs(event.currentTarget);
    };

    const GetMessageHtml_Json = (mgsId) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: mgsId,
        };

        ClsPortal.GetMessageHtml_Json(o, function (sts, data) {
            if (sts) {
                console.log("GetMessageHtml_Json", data);
                setTemplateDataMarkup(data)
            }
        })
    }

    const GetCertificate_Json = (mgsId) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: mgsId,
        };

        ClsPortal.GetCertificate_Json(o, function (sts, data) {
            if (sts) {
                console.log("GetCertificate_Json", data);
                // setTemplateDataMarkup(data)
            }
        })
    }

    const GetDocumentStatus_Json = (m) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: m.PortalDocId,
            messageEmailAddress: m.emailid,
            docName: m.PortalName,
        };

        ClsPortal.GetDocumentStatus_Json(o, function (sts, data) {
            if (sts) {
                console.log("GetDocumentStatus_Json", data);
                // setTemplateDataMarkup(data)
            }
        })
    }

    const GetAttachment_Json = (m) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: m.PortalDocId,
            attachid: m.Attachid,
            extension: m.DocExtension,
        };

        ClsPortal.GetAttachment_Json(o, function (sts, data) {
            if (sts) {
                console.log("GetAttachment_Json", data);
                if (data) {
                    var a = document.createElement("a"); //Create <a>
                    a.href = "data:" + ClsPortal.FileType(m.PortalName) + ";base64," + data; //Image Base64 Goes here
                    a.download = m.PortalName; //File name Here
                    a.click(); //Downloaded file
                }


                // setTemplateDataMarkup(data)
            }
        })
    }

    const handleDownloadPortalAtt = (m) => {
        if (m.PortalDocId) {
            GetAttachment_Json(m)
        }
    }

    const handleCloseMgs = (e) => {
        setAnchorElMgs(null);
        console.log("GetMessageHtml_Json11", e);
        //console.log("GetMessageHtml_Json11", e);
        if (e.PortalDocId) {
            GetMessageHtml_Json(e.PortalDocId);
            GetCertificate_Json(e.PortalDocId);
            GetDocumentStatus_Json(e);
            setMessageEmail(e.emailid);
            setPortalEmailOpbject(e);
            GetMessageViewHistory_Json(e);
            GetSignedAttachment_Json(e);
            ApprovalStatusChanged_Json(e);
            //handleClickOpenPortalAtt(true);
            let res = allPortalAttachments.length > 0 ? allPortalAttachments.filter((p) => p.emailid === e.emailid) : null;

            if (res && res.length > 0) {
                setFilterAttachments(res);

            }

            setCopyLink(`https://www.sharedocuments.co.uk/login.aspx?Code=${agrno}&message=${e.PortalDocId}`);


        }



    };


    const GetMessageViewHistory_Json = (m) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: m.PortalDocId,
            userEmail: m.emailid,
        };

        ClsPortal.GetMessageViewHistory_Json(o, function (sts, data) {
            if (sts) {
                if (data) {
                    let js = JSON.parse(data);

                    let res = js.map((el) => {
                        el.ViewDateTime = DateFormate(el.ViewDateTime);
                        return el;
                    });
                    console.log("GetMessageViewHistory_Json", res);
                    setMessageViewHistory(res);
                }

            }
        })
    }

    const GetSignedAttachment_Json = (m) => {
        try {
            if (m.ItemID) {
                let o = {
                    accid: agrno,
                    email: Email,
                    password: password,
                    messageId: m.PortalDocId,
                    itemid: m.ItemID,
                };

                ClsPortal.GetSignedAttachment_Json(o, function (sts, data) {
                    if (sts) {
                        if (data) {
                            const dataURI = "data:application/pdf;base64," + data;

                            console.log("GetSignedAttachment_Json", data);
                            setCertificateData(dataURI)

                        }

                    }
                })
            }

        } catch (error) {
            console.log({
                status: false,
                message: "GetSignedAttachment_Json is Blank Try again",
                error: error,
            });
        }

    }
    const ApprovalStatusChanged_Json = (m) => {
        try {
            let o = {
                accid: agrno,
                email: Email,
                password: password,
                messageID: m.PortalDocId,
            };

            ClsPortal.ApprovalStatusChanged_Json(o, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        console.log("ApprovalStatusChanged_Json", js);
                    }

                }
            })

        } catch (error) {
            console.log({
                status: false,
                message: "GetSignedAttachment_Json is Blank Try again",
                error: error,
            });
        }

    }
    function DateFormate(dt) {
        if (dt && dt.includes("/Date")) {
            let fullDate = new Date(parseInt(dt.substr(6)));
            return fullDate
        }
        else {
            return dt;
        }



    }

    const GetMessageDocuments_Json = (mgsId) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: mgsId,
        };

        ClsPortal.GetMessageDocuments_Json(o, function (sts, data) {
            if (sts) {
                console.log("GetMessageDocuments_Json", data);
            }
        })
    }


    const GetMessageAttachments_Json = (mgsId) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: mgsId,
        };

        ClsPortal.GetMessageAttachments_Json(o, function (sts, data) {
            if (sts) {
                let arrayOfObjects = JSON.parse(data);
                console.log("GetMessageAttachments_Json", arrayOfObjects);

                setAllPortalAttachments(arrayOfObjects);
                // Convert array of objects to Set to get unique objects based on specified properties
                if (arrayOfObjects.length > 0) {
                    const uniqueObjectsSet = new Set(arrayOfObjects.map(obj => generateUniqueKey(obj)));

                    // Convert Set back to array of objects
                    const uniqueObjectsArray = Array.from(uniqueObjectsSet).map(key => {
                        const [PortalDocId, emailid] = key.split('|');
                        return arrayOfObjects.find(obj => obj.PortalDocId === PortalDocId && obj.emailid === emailid);
                    });


                    if (data) {
                        setPortalEmail(uniqueObjectsArray)
                    }
                }

            }
        });
    }


    // Function to generate a unique key based on specified properties
    function generateUniqueKey(obj) {
        return obj.PortalDocId + '|' + obj.emailid;
    }

    const handleClickViewDocument = (e) => {
        let url = `https://www.sharedocuments.co.uk/Viewer.aspx?accid=${agrno}&print=no&id=${e.PortalDocId}&ext=${e.DocExtension}&attachment=${e.Attachid}`;
        window.open(url)
        setIframeViewDocument(url)
    }

    function DateFormate(dateString) {
        // Example date string

        // Extract the timestamp from the string using regular expressions
        const timestamp = parseInt(dateString.match(/\d+/)[0]);

        // Convert the timestamp to a Date object
        const date = new Date(timestamp);

        // Format the date as you desire
        const formattedDate = date.toLocaleString(); // Adjust the format as needed
        return formattedDate;
    }

    const DeletePortalAttachment = (objdata) => {

        try {
            Swal.fire({
                // title: "Are you sure you want to delete this item?",
                text: "Are you sure you want to delete this item?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {

                    let fileName = null;
                    if (objdata.FileName) {
                        var Typest = objdata.FileName.lastIndexOf("\\");
                        fileName = objdata.FileName.slice(Typest + 1);
                    }
                    let fname = fileName;
                    let o = {
                        agrno: agrno,
                        EmailId: Email,
                        password: password,
                        fileName: fname,
                        TaskId: selectedTask.ID,
                    }
                    ClsPortal.DeleteTasksAttachment(o, function (sts, data) {
                        if (sts && data) {
                            let js = JSON.parse(data);
                            console.log("DeleteTasksAttachment", data)
                            if (js.Status === "Success") {
                                toast.success("Deleted Attachment");
                                // Json_Get_CRM_SavedTask_ByTaskId(selectedTask.ID);
                            }

                        }
                    })

                }
            });
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }


    /////////////////////End Call Portal Methods 
    function startFormattingDate(dt) {
        // console.log("kjdhdsjhsdf", dt)
        if (dt) {
            // let fullDate = new Date(parseInt(dt.substr(6)));
            let fullDate = new Date(dt);
            //console.log("date formet111", fullDate);

            return dayjs(fullDate).format("DD/MM/YYYY");
        }
        else {
            return "";
        }

    }

    useEffect(() => {
        setAllPortalAttachments([]);
        setPortalEmail([]);
        //PortMethods
        if (selectedTask.PubMessageId) {

            GetMessageAttachments_Json(selectedTask.PubMessageId);
            setStartDate(startFormattingDate(selectedTask.CreationDate));
            setEndDate(startFormattingDate(selectedTask.EndDateTime));
        }
    }, [selectedTask]);


    // new portal modal
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [openCertificate, setOpenCertificate] = React.useState(false);
    const handleClickOpenCertificate = () => {
        setOpenCertificate(true);
    };
    const handleCloseCertificate = () => {
        setOpenCertificate(false);
    };

    // document modal
    const [DocumentSent, setDocumentSent] = React.useState(false);
    const handleClickDocumentSent = () => {
        setDocumentSent(true);
    };
    const DocumentHandleClose = () => {
        setDocumentSent(false);
    };


    return (<React.Fragment>
{selectedTask.Source==="Portal" &&(<>
    <div>
            <Button
                id="basic-button"
                aria-controls={openMgsMail ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMgsMail ? 'true' : undefined}
                onClick={handleClickMgsMail}
            >
                {messageEmail ? messageEmail : "Select Message"}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorElMgs}
                open={openMgsMail}
                onClose={handleCloseMgs}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {portalEmail ? portalEmail.map((item, index) => {
                    return <MenuItem key={index} onClick={() => handleCloseMgs(item)}>{item.emailid}</MenuItem>
                }) : ""}


            </Menu>
        </div>

        <Box className='mb-3'>
            {/* <Box className='d-flex align-items-center mb-2'>
                <Checkbox
                    {...label}
                    icon={<NewReleasesIcon />}
                    checkedIcon={<VerifiedIcon />}
                />
                <h5 className='mb-0 text-black'>{selectedTask.Subject}</h5>
            </Box> */}
            <Box className='font-14 well mb-3'>
                <p className='mb-0'>
                    <HtmlEditorDX templateDataMarkup={templateDataMarkup} setTemplateDataMarkup={setTemplateDataMarkup} setEditorContentValue={setEditorContentValue}></HtmlEditorDX>
                </p>
            </Box>

            <Box className='d-flex flex-wrap align-items-center justify-content-between'>
                <Box className='d-flex'>
                    <MarkunreadIcon className='text-blue' />
                    {/* <DraftsIcon /> */}
                    <Box className='ps-3'>
                        <h5 className='font-14 text-black mb-1'>Last Viewed On</h5>
                        <p className='font-12 text-gray sembold mb-2'>10/11/24 09:50PM</p>
                        <Button className='btn-blue-2' size="small" startIcon={<ScheduleIcon />} onClick={handleClickOpen}>View History</Button>
                    </Box>
                </Box>

                <Box className='d-flex'>
                    <VerifiedIcon className='text-green' />
                    {/* <NewReleasesIcon className='text-warning' /> */}

                    {/* <DraftsIcon /> */}
                    <Box className='ps-3'>
                        <h5 className='font-14 text-black mb-1'>Message approved </h5>
                        <p className='font-12 text-gray sembold mb-2'>10/11/24 09:50PM</p>
                        <Button className='btn-blue-2' size="small" onClick={handleClickOpenCertificate} startIcon={<ScheduleIcon />}>Certificate of Approval</Button>
                        {<CopyLinkButton copyLink={copyLink}></CopyLinkButton>}
                        {/* <Button className='btn-blue-2 btn btn-warning' size="small" sx={{
                                            background: '#ffc107 !important'
                                        }} startIcon={<NewReleasesIcon />}>Pending Approval</Button> */}
                    </Box>
                </Box>

                <Box className='d-flex'>
                    {/* <MarkunreadIcon /> */}
                    <DraftsIcon />
                    <Box className='ps-3'>
                        <h5 className='font-14 text-black mb-1'>Start Date</h5>
                        <p className='font-12 text-gray sembold'>{startDate}</p>
                    </Box>
                    <Box className='ps-3'>
                        <h5 className='font-14 text-black mb-1'>End Date</h5>
                        <p className='font-12 text-gray sembold mb-0'>{endDate}</p>
                    </Box>
                </Box>

            </Box>

            <hr />

            <Box className="d-flex flex-wrap">
                <label className='text-decoration-none d-flex pointer' onClick={handleClickDocumentSent}><BallotIcon className='me-1' /> Portal Documents</label>
                {/* <AttachmentView attachmentlist={attachmentFile} setAttOpen={setAttOpen} attOpen={attOpen}></AttachmentView> */}
            </Box>

        </Box>
</>)}
       




        {/* history modal start */}
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='custom-modal'
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box className="d-flex align-items-center justify-content-between">
                        <Box className="align-items-center d-flex">
                            <Typography variant="h4" className='font-18 bold text-black mb-0'>
                                View History
                            </Typography>
                        </Box>

                        {/*  */}

                        <Box className='d-flex'>
                            <Button onClick={handleClose} className='p-0'>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>
                    </Box>

                    <hr />

                    <Box class="ml-auto mr-auto">
                        <Box class="activity-timeline">
                            <ul class="timeline-ul">

                                {messageViewHistory.length > 0 ? messageViewHistory.map((item, index) => {
                                    return <>

                                        <li key={index}>
                                            <Box class="datetime">
                                                <span>{item.ViewDateTime} </span>
                                            </Box>
                                            <Box class="line-dotted">
                                                <Box class="line-time"></Box>
                                                <Box class="circle-time"></Box>
                                                <Box class="circle-border"></Box>
                                            </Box>
                                            <Box class="timeline-details">
                                                <Box class="icon-time-status"></Box>
                                                <Box class="content-time">
                                                    <h5>Viewed by {item.UserID}</h5>
                                                    <p>from {item.IPAddress}</p>
                                                </Box>
                                            </Box>
                                        </li>
                                    </>
                                }) : ""}
                            </ul>
                        </Box>
                    </Box>
                </DialogContentText>
            </DialogContent>
            {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
        </Dialog>


        <Dialog
            open={openCertificate}
            onClose={handleCloseCertificate}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='custom-modal'
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box className="d-flex align-items-center justify-content-between">
                        <Box className="align-items-center d-flex">
                            <Typography variant="h4" className='font-18 bold text-black mb-0'>
                                Certificate
                            </Typography>
                        </Box>

                        {/*  */}

                        <Box className='d-flex'>
                            <Button onClick={handleCloseCertificate} className='p-0'>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>
                    </Box>

                    <hr />

                    <Box class="ml-auto mr-auto">
                        <Box class="activity-timeline">
                            <iframe src={certificateData} title="PDF Document" width="100%" height="500px" />
                        </Box>
                    </Box>
                </DialogContentText>
            </DialogContent>
            {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
        </Dialog>

        {/* history modal end */}
        {/* document send modal start */}

        <Dialog
            open={DocumentSent}
            onClose={DocumentHandleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='custom-modal custom-modal-1200'
        >
            <DialogContent>
                <DialogContentText>

                    <Box className="d-flex align-items-center justify-content-between">
                        <Box className="align-items-center d-flex">
                            <Typography variant="h4" className='font-18 bold text-black mb-0'>
                                Attachments
                            </Typography>
                        </Box>
                        <Box className='d-flex'>
                            <Button onClick={DocumentHandleClose} className='p-0'>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>
                    </Box>

                    <hr />
                    <Box className='row'>

                        {filterAttachments.length > 0 ? filterAttachments.map((item, index) => {
                            return <>

                                <Box key={index} className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex'>
                                    <Box className='todo-list-box white-box relative w-100'>

                                        {/* <Typography variant='h2' className='mb-2'>Lorem ipsome dolor site</Typography> */}

                                        <Box className='d-flex align-items-center justify-content-between'>
                                            <Typography variant='subtitle1 mb-2 d-block'><strong>Name: </strong> {item.PortalName} </Typography>
                                        </Box>

                                        <Typography variant='subtitle1 mb-2 d-block'><strong>Document Number: </strong> {item.ItemID} </Typography>

                                        <Typography variant='subtitle1 mb-2 d-block'><strong> Published On: </strong> {item.DDate ? DateFormate(item.DDate) : null} </Typography>

                                        <Box className='d-flex align-items-center justify-content-between'>
                                            <Typography variant='subtitle1'><pan className='text-gray'>
                                                Recipient Email  </pan>
                                                <a href='#'>{item.emailid}</a></Typography>
                                        </Box>

                                        <hr />

                                        <Box className='d-flex approval-main'>
                                            <Box className='approval-box'>
                                                <Typography variant='subtitle1' className='text-center me-2'>
                                                    Sent For Approval
                                                    <VerifiedIcon />
                                                </Typography>
                                            </Box>

                                            <Box className='approval-box'>
                                                <Typography variant='subtitle1' className='text-center me-2'>
                                                    Sent For Approval
                                                    <VerifiedIcon />
                                                </Typography>
                                            </Box>

                                            <Box className='approval-box'>
                                                <Typography variant='subtitle1' className='text-center me-2'>
                                                    Sent For Approval
                                                    <VerifiedIcon />
                                                </Typography>
                                            </Box>

                                            <Box className='approval-box'   onDoubleClick={() => handleClickViewDocument(item)}>
                                                <Typography variant='subtitle1' className='text-center me-2'>
                                                Launch
                                                    <VerifiedIcon />
                                                </Typography>
                                            </Box>

                                            <Box className='approval-box'>
                                                <Typography variant='subtitle1' className='text-center me-2'>
                                                    Download
                                                    <DownloadForOfflineIcon onClick={() => handleDownloadPortalAtt(item)} />

                                                </Typography>
                                            </Box>

                                        </Box>

                                    </Box>
                                    {/* col end */}
                                </Box>
                            </>
                        }) : ""}
                    </Box>



                </DialogContentText>
            </DialogContent>
        </Dialog >
        {/* document sent modal end */}


        <Dialog
            open={OpenPortalAttachmnet}
            onClose={handleClosePortalAtt}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='custom-modal'
            sx={{
                maxWidth: 1000,
                width: '100%',
                margin: '0 auto'
            }}
        >
            {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">

                    <Box className="d-flex align-items-center justify-content-between">
                        <Box className="dropdown-box">
                            <Typography variant="h4" className='font-18 bold mb-2 text-black'>
                                Attachments
                            </Typography>
                            {/* <Box className="btn-Select">
                                    <Button className='btn-white'>Action</Button>
                                    <Button className='btn-white'>Ser</Button>
                                    <Button className='btn-white'>Custom</Button>

                                    <hr />

                                    <Button className='btn-blue-2' size="small">Apply Now</Button>
                                </Box> */}
                        </Box>

                        {/*  */}
                        <Button onClick={handleClosePortalAtt} autoFocus sx={{ minWidth: 30 }}>
                            <span className="material-symbols-outlined text-black">
                                cancel
                            </span>
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid xs={6}>
                                    <Demo>
                                        <List>


                                            {filterAttachments.length > 0 ? filterAttachments.map((item, index) => {


                                                return (<>
                                                    <ListItem key={index}
                                                        onDoubleClick={() => handleClickViewDocument(item)}
                                                        secondaryAction={
                                                            <IconButton edge="end" aria-label="delete">
                                                                <DeleteIcon onClick={() => DeletePortalAttachment(item)} />
                                                                <DownloadForOfflineIcon onClick={() => handleDownloadPortalAtt(item)} />
                                                            </IconButton>
                                                        }
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <FolderIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={item.PortalName}
                                                            secondary={item.DDate ? DateFormate(item.DDate) : null}
                                                        />
                                                    </ListItem>
                                                </>)
                                            }) : ""}


                                        </List>
                                    </Demo>
                                </Grid>
                                <Grid xs={6}>
                                    <iframe sx={{ width: "100%", innerHeight: '500px' }} src={iframeViewDocument}></iframe>
                                </Grid>

                            </Grid>
                        </Box>


                    </Box>


                    {/* <DocumentDetails></DocumentDetails> */}



                </DialogContentText>
            </DialogContent>
        </Dialog>
    </React.Fragment>

    )
}
export default PortalMessage;