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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DownloadIcon from '@mui/icons-material/Download';
import docuicon from "../images/docu-icon.svg";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const PortalMessage = ({ selectedTask, Json_RegisterItem, setPortalComments, setSelectedEmailForComment }) => {
    console.log("selectedTask portal message", selectedTask)

    const baseUrlPortal = "https://portal.docusoftweb.com/clientservices.asmx/";
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    let ClsPortal = new CommanCL(baseUrlPortal, agrno, Email, password);


    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/"; // base url for api
    //   let dt = new LoginDetails();

    let clssms = new CommanCL(baseUrl, agrno, Email, password);

    /////////////////////Call Portal Methods  
    const [templateDataMarkup, setTemplateDataMarkup] = useState(null);
    const [assigneeUser, setAssigneeUser] = useState([]);
    const [asgUser, setAsgUser] = useState("");
    const [editorContentValue, setEditorContentValue] = useState(null);
    const [portalEmail, setPortalEmail] = useState([]);
    const [anchorElMgs, setAnchorElMgs] = React.useState(null);
    const [messageEmail, setMessageEmail] = React.useState("Select Message");
    const [portalEmailOpbject, setPortalEmailOpbject] = React.useState({});
    const [filterAttachments, setFilterAttachments] = React.useState([]);
    const [totalAttachment, setTotalAttachment] = React.useState([]);
    const [allPortalAttachments, setAllPortalAttachments] = React.useState([]);
    const [selectedEmail, setSelectedEmail] = React.useState({});

    const [txtRecipient, settxtRecipient] = React.useState(0);

    const [iframeViewDocument, setIframeViewDocument] = React.useState(null);
    const [OpenPortalAttachmnet, setOpenPortalAttachmnet] = React.useState(false);
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [messageViewHistory, setMessageViewHistory] = React.useState([]);

    const [copyLink, setCopyLink] = React.useState("");
    const [certificateData, setCertificateData] = React.useState("");

    const [documentStatus, setDocumentStatus] = React.useState("");

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

    const GetMessageHtml_Json = (m) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: m.PortalDocId,
        };

        ClsPortal.GetMessageHtml_Json(o, function (sts, data) {
            if (sts) {
                console.log("GetMessageHtml_Json", data);

                setTemplateDataMarkup(HtmlToText(data))
            }
        })
    }
    function HtmlToText(data) {
        if (data) {
            const textContent = data.replace(/<[^>]*>/g, '');
            return textContent;
        }
        else {
            return "";
        }

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
                // console.log("GetCertificate_Json", data);
                // setTemplateDataMarkup(data)
            }
        })
    }

    const GetDocumentStatus_Json = (m) => {
        try {
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
                    if (data) {
                        let js = JSON.parse(data);
                        // console.log("GetDocumentStatus_Json", js);
                        let res = js.filter((e) => e.Emailid === m.emailid);
                        if (res.length > 0) {
                            const formattedActivity = res.map((el) => {
                                let ActivityDate; // Declare ActivityDate variable
                                if (el["Actioned On"]) { // Check if "Actioned On" property exists
                                    ActivityDate = el["Actioned On"].slice(6, -2); // If exists, slice the string
                                }
                                const date = new Date(ActivityDate); // Create Date object using ActivityDate
                                return { ...el, ["Actioned On"]: date }; // Return new object with formatted date
                            });

                            setDocumentStatus(formattedActivity[0])
                            console.log("GetDocumentStatus_Json", formattedActivity);

                        }

                    }
                }
            })
        } catch (error) {
            console.log({
                status: false,
                message: "GetDocumentStatus_Json is Blank Try again",
                error: error,
            });
        }

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
                // console.log("GetAttachment_Json", data);
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
        // console.log("GetMessageHtml_Json11", e);
        //console.log("GetMessageHtml_Json11", e);

        if (e.PortalDocId) {
            setSelectedEmail(e);
            setSelectedEmailForComment(e);
            GetMessageHtml_Json(e);
            GetDocumentStatus_Json(e);
            GetCertificate_Json(e.PortalDocId);
            setMessageEmail(e.emailid);
            setPortalEmailOpbject(e);
            GetMessageViewHistory_Json(e);
            GetSignedAttachment_Json(e);
            ApprovalStatusChanged_Json(e);
            //handleClickOpenPortalAtt(true);
            let res = allPortalAttachments.length > 0 ? allPortalAttachments.filter((p) => p.emailid === e.emailid) : null;

            if (res && res.length > 0) {
                setFilterAttachments(res);
                //  console.log("GetMessageHtml_Json11", res);
                setTotalAttachment(res.length);

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
            console.log("dfhldsjlfjf",data);
            if (sts && data) {
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

                        if (uniqueObjectsArray.length === 1) {
                            handleCloseMgs(uniqueObjectsArray[0]);
                            console.log("GetMessageAttachments_Json22", arrayOfObjects);

                            setFilterAttachments(uniqueObjectsArray);
                            setTotalAttachment(uniqueObjectsArray.length);
                            settxtRecipient(uniqueObjectsArray.length)
                        }
                        else {
                            handleCloseMgs(uniqueObjectsArray[0]);
                            setMessageEmail(uniqueObjectsArray[0].emailid);
                            setPortalEmail(uniqueObjectsArray)
                            settxtRecipient(uniqueObjectsArray.length)
                        }
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

    function Json_GetForwardUserList(fid) {

        try {
            let o = {};
            o.ProjectId = fid;
            o.SectionId = "-1";
            clssms.Json_GetForwardUserList(o, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    let dt = js.Table;
                    if (dt.length > 0) {
                        let result = dt.filter((el) => {
                            return el.CGroup !== "Yes";
                        });

                        if (result.length > 0) {
                            let assinee = selectedTask.AssignedToID.split(",");
                            let filteredArray = result.filter(obj1 => {
                                // Find corresponding object in array2 with the same 'id'
                                let matchingObj = assinee.find(obj2 => obj2 == obj1.ID);
                                // If a matching object is found in array2, include it in the result
                                return matchingObj !== undefined;
                            });
                            console.log("filteredArray", filteredArray);
                            let user = result.filter((el) => el.ID === parseInt(localStorage.getItem("UserId")));
                            if (user.length > 0) {
                                setAsgUser(user[0].ForwardTo);
                            }
                            setAssigneeUser(filteredArray)
                        }
                    }
                }
            });
        } catch (error) {
            console.log("error", error);
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

            Json_GetForwardUserList(selectedTask.FolderID)
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

    const HandalChangeSendReminder = () => {
        //setSelectedEmail
        try {
            let o = {
                accid: agrno,
                email: Email,
                password: password,
                messageID: selectedEmail.PortalDocId,
                contactEmail: selectedEmail.emailid
            };
            ClsPortal.SendReminder_Json(o, function (sts, data) {
                if (sts) {
                    if (data) {
                        toast.success(data);
                        console.log("SendReminder_Json", data)
                    }
                }
            })
        } catch (error) {
            console.log({ message: false, Error: error })
        }
    }
    // document modal
    const [DocumentSent, setDocumentSent] = React.useState(false);
    const handleClickDocumentSent = () => {
        setDocumentSent(true);

    };
    const DocumentHandleClose = () => {
        setDocumentSent(false);
    };

    const UploadToDocuSoft = (data) => {
        ClsPortal.ConfirmMessage("Are you sure you want to upload to docusoft?", function (res) {
            try {
                // console.log("ConfirmMessage", res,data)
                if (res) {
                    GetDocumentBase64(data);
                }
            } catch (error) {
                console.log({ Status: false, mgs: "Faild Please Try Again", Error: error });
            }

        })
    }


    const GetDocumentBase64 = (m) => {
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
                // console.log("GetAttachment_Json", data);
                if (data) {
                    let obj = {
                        Base64: data,
                        Details: m
                    }
                    Json_RegisterItem(obj)
                }
                // setTemplateDataMarkup(data)
            }
        })
    }

    const [anchorElAsg, setAnchorElAsg] = React.useState(null);
    const openAsg = Boolean(anchorElAsg);
    const handleClickAsg = (event, vl) => {
        setAnchorElAsg(event.currentTarget);

    };
    const handleCloseAsg = (vl) => {
        setAnchorElAsg(null);
        setAsgUser(vl.ForwardTo);
    };

    return (<React.Fragment>
        {selectedTask.Source === "Portal" && (<>
            {txtRecipient > 1 && (<>
                <Box className='d-flex align-items-center  mb-3'>

                    <p className="mb-0 font-14 text-black me-3">{`This message was sent to ${portalEmail.length} recipients. Viewing as`}
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
                            {
                                portalEmail.length > 0 ? portalEmail.map((item, index) => {
                                    return (<>
                                        <MenuItem key={index} onClick={() => handleCloseMgs(item)}>{item.emailid}</MenuItem>
                                    </>)
                                }) : ""
                            }


                        </Menu>  </p>
                </Box>
            </>)}


            <Box className='mb-3'>
                {/* <Box className='d-flex align-items-center mb-2'>
                <Checkbox
                    {...label}
                    icon={<NewReleasesIcon />}
                    checkedIcon={<VerifiedIcon />}
                />
                <h5 className='mb-0 text-black'>{selectedTask.Subject}</h5>
            </Box> */}
                <Box className='mb-3'>
                    {/* <p className='mb-0'>
                        <HtmlEditorDX templateDataMarkup={templateDataMarkup} setTemplateDataMarkup={setTemplateDataMarkup} setEditorContentValue={setEditorContentValue}></HtmlEditorDX>
                    </p> */}
                    <textarea
                        templateDataMarkup={templateDataMarkup}
                        setTemplateDataMarkup={setTemplateDataMarkup}
                        setEditorContentValue={setEditorContentValue}
                        className="form-control textarea textarea-2"
                        disabled={selectedTask.Source === "Portal"}
                        value={templateDataMarkup}
                    ></textarea>
                </Box>

                <Box className='d-flex flex-wrap align-items-center justify-content-between'>
                    <Box className='d-flex'>
                        <MarkunreadIcon className='text-blue' />
                        {/* <DraftsIcon /> */}
                        <Box className='ps-3'>
                            <h5 className='font-14 text-black mb-1'>{messageViewHistory?.length > 0 ? "Last Viewed On" : "The message has not yet been viewed"} </h5>
                            <p className='font-12 text-gray sembold mb-2'>{messageViewHistory?.length > 0 ? messageViewHistory[messageViewHistory.length - 1].ViewDateTime : ""}</p>
                            <Button className='btn-blue-2' size="small" startIcon={<ScheduleIcon />} onClick={handleClickOpen}>View History</Button>
                        </Box>
                    </Box>

                    <Box className='d-flex align-items-center'>

                        {/* <NewReleasesIcon className='text-warning' /> */}

                        {/* <DraftsIcon /> */}
                        {
                            documentStatus.ForApproval === "Yes" ? (
                                <>
                                    {documentStatus.Approved === "Yes" ? (
                                        <>
                                            <Box className='ps-3'>
                                                <VerifiedIcon className='text-green' />
                                                <h5 className='font-14 text-black mb-1'>Message approved </h5>
                                                <p className='font-12 text-gray sembold mb-2'>{documentStatus["Actioned On"]}</p>
                                                <Button className='btn-blue-2' size="small" onClick={handleClickOpenCertificate} startIcon={<ScheduleIcon />}>Certificate of Approval</Button>
                                            </Box>
                                        </>
                                    ) : (
                                        <>
                                            <Box className='ps-2'>
                                                {/* {<CopyLinkButton copyLink={copyLink}></CopyLinkButton>} */}
                                                <Box className='d-flex align-items-center mb-2'>
                                                    <HourglassEmptyIcon className='text-gray me-1' />
                                                    <h5 className='font-14 text-black mb-0'>Pending Approval</h5>
                                                </Box>
                                                <Button className='btn-blue-2' size="small" onClick={HandalChangeSendReminder} startIcon={<ScheduleIcon />}>Send Reminder</Button>
                                            </Box>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <DoDisturbIcon className='text-gray' />
                                    <Box className='ps-3'>
                                        <h5 className='font-14 text-black mb-0'>Not sent for approval </h5>
                                    </Box>
                                </>
                            )
                        }
                    </Box>

                    <Box className='pe-3'>
                        {/* <MarkunreadIcon /> */}
                        {/* <DraftsIcon /> */}
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
                    <label className='text-decoration-none d-flex pointer' onClick={handleClickDocumentSent}><BallotIcon className='me-1' />{totalAttachment} Portal Documents</label>
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
            <Box className="d-flex align-items-center justify-content-between modal-head">
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

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
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
            <Box className="d-flex align-items-center justify-content-between modal-head">
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
            <DialogContent>
                <DialogContentText id="alert-dialog-description">

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
            className='custom-modal full-modal'
        >
            <Box className="d-flex align-items-center justify-content-between modal-head">
                <Box className="align-items-center d-flex">
                    <Typography variant="h4" className='font-18 bold text-black mb-0'>
                        Attachments
                    </Typography>
                </Box>
                <Box className='d-flex'>
                    <Button onClick={DocumentHandleClose} className='p-0 min-width-auto'>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>
            </Box>
            <DialogContent>
                <DialogContentText>
                    <Box className='row'>

                        {filterAttachments.map((item, index) => {

                            return <>

                                <Box key={index} className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex'>
                                    <Box className='todo-list-box white-box relative w-100'>

                                        <Box className='download-btn-box'>
                                            <Button onClick={() => UploadToDocuSoft(item)} size="small" className="min-width-auto me-1">
                                                <img src={docuicon} width='18' />
                                            </Button>
                                            <Button size="small" className="min-width-auto" onClick={() => handleDownloadPortalAtt(item)} ><DownloadIcon /></Button>
                                        </Box>

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

                                        <Box className='d-flex flex-wrap approval-main'>
                                            <Box className='approval-box'>
                                                <VerifiedIcon className="me-2" />
                                                <Typography variant='subtitle1' className='text-center'>

                                                    {documentStatus.ForApproval === "Yes" ? "Sent For Approval" : "Not Sent For Approval"}
                                                </Typography>
                                            </Box>

                                            {documentStatus.ForApproval === "Yes" && (<>
                                                <Box className='approval-box'>
                                                    <Box className='d-flex'>

                                                        <Typography variant='subtitle1' className='text-center'>
                                                            {documentStatus.Approved === "Yes" ? "Pending Approval" : (<>

                                                                <Button variant="contained"><NotificationImportantIcon className="me-2" /> Send Reminder</Button>
                                                            </>)}

                                                        </Typography>
                                                    </Box>

                                                    {/* <Button className='btn-blue-2 btn-padding-same ms-2' size="small"><NotificationsActiveIcon /> Send Reminder</Button> */}

                                                </Box>

                                                <Box className='approval-box'>
                                                    <VisibilityOffIcon className="me-2" />
                                                    <Typography variant='subtitle1' className='text-center'>
                                                        Not Yet Viewed
                                                    </Typography>

                                                </Box>
                                                {documentStatus.Approved === "Yes" && (<>
                                                    <Box className='approval-box' onDoubleClick={() => handleClickViewDocument(item)}>
                                                        <VerifiedUserIcon className="me-2" />
                                                        <Typography variant='subtitle1' className='text-center'>
                                                            View  Certificate  of approval
                                                        </Typography>

                                                    </Box>
                                                </>)}

                                            </>)}

                                        </Box>

                                    </Box>
                                    {/* col end */}
                                </Box>
                            </>
                        })}
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
            <Box className="d-flex align-items-center justify-content-between modal-head">
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
            {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">



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