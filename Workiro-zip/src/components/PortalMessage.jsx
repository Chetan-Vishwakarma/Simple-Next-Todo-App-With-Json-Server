import React, { useEffect, useRef, useState } from "react";
import CommanCL from "../services/CommanService";
import HtmlEditorDX from "./HtmlEditor";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Link, Chip, Stack, ListItemIcon, Radio, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, } from '@mui/material';
import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import CopyLinkButton from "./CopyLinkButton";

import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/material/styles';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


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

    const [copyLink, setCopyLink] = React.useState("");

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
        if (e.PortalDocId) {
            GetMessageHtml_Json(e.PortalDocId);
            GetCertificate_Json(e.PortalDocId);
            GetDocumentStatus_Json(e);
            setMessageEmail(e.emailid);
            setPortalEmailOpbject(e);
            handleClickOpenPortalAtt(true);
            let res = allPortalAttachments.length > 0 ? allPortalAttachments.filter((p) => p.emailid === e.emailid) : null;

            if (res && res.length > 0) {
                setFilterAttachments(res);

            }

            setCopyLink(`https://www.sharedocuments.co.uk/login.aspx?Code=${agrno}&message=${e.PortalDocId}`);
              

        }



    };


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
                if(arrayOfObjects.length>0){
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

    useEffect(() => {
        setAllPortalAttachments([]);
        setPortalEmail([]);
        //PortMethods
        if (selectedTask.PubMessageId) {

            GetMessageAttachments_Json(selectedTask.PubMessageId)
        }
    }, [selectedTask]);

    return ( <React.Fragment>

            {selectedTask.Source === "Portal" && (<>
                <HtmlEditorDX templateDataMarkup={templateDataMarkup} setTemplateDataMarkup={setTemplateDataMarkup} setEditorContentValue={setEditorContentValue}></HtmlEditorDX>



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
                {<CopyLinkButton copyLink={copyLink}></CopyLinkButton>}
            </>
            )}

      


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