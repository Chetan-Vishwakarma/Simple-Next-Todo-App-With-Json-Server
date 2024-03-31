import React, { useEffect, useState } from 'react';
import user from "../../images/01.png";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, Tabs, Tab, Checkbox, Link, MenuItem, Menu } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DescriptionIcon from '@mui/icons-material/Description';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Activity from '../../client/utils/Activity';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CategoryIcon from '@mui/icons-material/Category';
import GradingIcon from '@mui/icons-material/Grading';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AddIcon from '@mui/icons-material/Add';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CommanCLS from '../../services/CommanService';
import { json } from 'react-router-dom';

import HtmlEditorDX from '../../components/HtmlEditor';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import CreateNewModalTask from '../../components/CreateNewModal';

import $ from 'jquery';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



function DocumentsVewModal({ openPDFView, setOpenPDFView, selectedDocument }) {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [txtFolderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const [ViewerToken, setViewerToken] = useState(localStorage.getItem("ViewerToken"));
    const [getAudit, setGetAudit] = useState([]);
    const [getAttachment, setGetAttachment] = useState([]);
    //const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/"; // base url for api
    //   let dt = new LoginDetails();
    let cls = new CommanCLS(baseUrl, agrno, Email, password);
    // const [value, setValue] = React.useState(1);
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const [anchorElChangeIndex, setAnchorElChangeIndex] = React.useState(null);
    const ChangeIndex = Boolean(anchorElChangeIndex);
    const handleClickChangeIndex = (event) => {
        setAnchorElChangeIndex(event.currentTarget);
    };
    const handleCloseChangeIndex = () => {
        setAnchorElChangeIndex(null);
    };

    const [value, setValue] = React.useState('1');
    const [viewerUrl, setViwerUrl] = React.useState('');
    const [seletedFileData, setSeletedFileData] = React.useState([]);
    const [selectedFiles, setSelectedFiles] = React.useState([]);

    const [templateDataMarkup, setTemplateDataMarkup] = React.useState([]);
    const [editorContentValue, setEditorContentValue] = React.useState([]);
    const [getAssociatedTaskList, setGetAssociatedTaskList] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClosePDFView = () => {
        setOpenPDFView(false);
    };

    const Json_GetAudit = () => {
        try {
            let obj = {
                itemid: selectedDocument["Registration No."],

            }
            cls.Json_GetAudit(obj, function (sts, data) {
                if (sts && data) {
                    let parse = JSON.parse(data);
                    let table = parse.Table;
                    if (table.length > 0) {
                        setGetAudit(table);
                    }
                    console.log("Json_GetAudit", table)
                }
            })
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }
    const Json_GetAttachmentsByItemId = () => {
        try {
            let obj = {
                ItemId: selectedDocument["Registration No."],
                ViewerToken: ViewerToken,
            }
            cls.Json_GetAttachmentsByItemId(obj, function (sts, data) {
                if (sts && data) {
                    let parse = JSON.parse(data);
                    console.log("Json_GetAttachmentsByItemId", parse)
                    let table = parse.Table;
                    if (table.length > 0) {
                        setGetAttachment(table);
                    }

                }
            })
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }
    const Json_GetItemStickyNotes = () => {
        try {
            let obj = {
                ItemId: selectedDocument["Registration No."],
            }
            cls.Json_GetItemStickyNotes(obj, (sts, data) => {
                if (sts && data) {

                    let atob = window.atob(data);
                    console.log("Json_GetItemStickyNotes", atob);
                    setTemplateDataMarkup(atob)
                }
            })
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }

    const Json_getAssociatedTaskListByDocumentId = () => {
        try {
            let obj = {
                ItemId: selectedDocument["Registration No."],
            }
            cls.Json_getAssociatedTaskListByDocumentId(obj, (sts, data) => {
                if (sts && data) {
                    let js = JSON.parse(data);
                    let table = js.Table;
                    if (table.length > 0) {
                        setGetAssociatedTaskList(table)
                        console.log("Json_getAssociatedTaskListByDocumentId", table)
                    }

                }
            })
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }

    useEffect(() => {
        $(':root').css('--main-bg-color', '#d42027');
        document.documentElement.style.setProperty('--main-bg-color', '#d42027');
        setGetAttachment([]);
        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        setViewerToken(localStorage.getItem("ViewerToken"));

        if (selectedDocument) {
            var IsApproved = selectedDocument["IsApproved"];
            var PortalDocId = selectedDocument["PortalDocId"];
            let IsApp = "";
            let PortalID = "";

            if (IsApproved === "SIG" && PortalDocId !== "") {
                IsApp = IsApproved;
                PortalID = PortalDocId;
            }

            setViwerUrl(`https://mydocusoft.com/ViewerNew.aspx?AgreementNo=${localStorage.getItem("agrno")}&ItemId=${selectedDocument["Registration No."]}&ext=${selectedDocument.Type}&ViewerToken=${localStorage.getItem("ViewerToken")}&IsApp=${IsApp}&PortalID=${PortalID}`);
            Json_GetAudit();
            Json_GetAttachmentsByItemId();
            Json_GetItemStickyNotes();
            Json_getAssociatedTaskListByDocumentId();
        }
        setSeletedFileData([]);

    }, [selectedDocument])

    const handeleAttachmentChange = (el) => {
        console.log("handle change", el)
        setSeletedFileData((pre) => [...pre, el]);

    }



    function DowloadSingleFileOnClick() {
        try {
            if (seletedFileData.length === 1) {
                const uint8Array = new Uint8Array(seletedFileData[0].FileData);
                const blob = new Blob([uint8Array], { type: 'application/octet-stream' });

                // Create a URL representing the Blob
                const url = URL.createObjectURL(blob);

                // Create a link element pointing to the URL
                const link = document.createElement('a');
                link.href = url;

                // Set the download attribute to specify the file name
                link.download = seletedFileData[0].SubItemPath;

                // Append the link to the document body
                document.body.appendChild(link);

                // Trigger a click event on the link to initiate the download
                link.click();

                // Remove the link from the document body
                document.body.removeChild(link);
            }
            else {
                Json_DownloadZip();
            }
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }


    }

    function Json_DownloadZip() {
        try {
            if (seletedFileData.length > 1) {
                let strGuid = seletedFileData.map((el) => el.Guid).join(',');
                let obj = {};
                obj.strFieldValues = strGuid;
                obj.isattachments = 'yes';
                obj.strFileName = "DemoTest";
                let data = JSON.stringify(obj);

                cls.Json_DownloadZip(obj, function (sts, data) {
                    if (sts && data) {
                        // https://mydocusoft.com/DownloadFilesServer/0003/9/gfdgfdgfdgf.zip.zip

                        var element = document.createElement('a');
                        element.setAttribute('href', "https://docusms.uk/DownloadFilesServer/" + agrno + "/" + localStorage.getItem("UserId") + "/" + data);
                        element.setAttribute('download', "DemoTest" + ".zip");
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);

                    }
                })
            }
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }


    }

    function DeleteDocumentAttachment() {
        try {
            if (seletedFileData.length > 0) {
                let strGuid = seletedFileData.map((el) => el.Guid).join(',');
                // Display a confirmation dialog
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

                        let obj = {};
                        obj.GuId = strGuid;
                        cls.Json_DeleteAttachment(obj, function (sts, data) {
                            if (sts && data) {
                                console.log("Json_DeleteAttachment", data);
                                Json_GetAttachmentsByItemId()
                            }
                        })

                        //   Swal.fire({
                        //     title: "Deleted!",
                        //     text: "Your file has been deleted.",
                        //     icon: "success"
                        //   });
                    }
                });
            }
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }

    // Event handler to handle file selection
    const handleFileSelect = (event) => {
        try {
            const files = event.target.files;
            const selectedFilesArray = Array.from(files);
            const filesData = [];
            selectedFilesArray.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = () => {
                    let fileByte = reader.result.split(";")[1].replace("base64,", "");

                    const fileData = {
                        FileName: file.name,
                        Base64: fileByte ? fileByte : "", // Base64 data of the file
                        FileSize: file.size,
                        Preview: reader.result, // Data URL for preview
                        DocId: ""
                    };

                    filesData.push(fileData);


                    let obj = {};
                    obj.ItemId = selectedDocument["Registration No."];
                    obj.FileName = file.name;
                    obj.base64data = fileByte;
                    obj.ViewerToken = ViewerToken;
                    cls.Json_AddAttachment(obj, (sts, data) => {
                        if (sts && data) {
                            console.log("Json_AddAttachment", data);
                            if (data) {
                                Json_GetAttachmentsByItemId()
                            }
                        }

                    })

                    // Check if this is the last file
                    if (index === selectedFilesArray.length - 1) {
                        // Add new files to the uploadedFiles array
                        setSelectedFiles((prevUploadedFiles) => [
                            ...prevUploadedFiles,
                            ...filesData,
                        ]);
                    }
                };
                reader.readAsDataURL(file); // Read file as data URL (base64)
            });
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    };

    const SaveStickyNotes = () => {
        try {
            //  console.log(editorContentValue)
            let o = {
                ItemId: selectedDocument["Registration No."],
                strStickyNotes: window.btoa(editorContentValue)
            }
            cls.Json_SetItemStickyNotes(o, function (sts, data) {
                if (sts && data) {
                    if (data === "Success") {
                        Json_GetItemStickyNotes();
                        toast.success("Updated !");
                    }
                }
            })
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }

const createTask=()=>{
console.log("Create New Task")
}


    return (

        <Dialog
            open={openPDFView}
            onClose={handleClosePDFView}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='custom-modal full-modal'
            sx={{ width: '100%', maxWidth: '100%' }}
        >
            <DialogContent>

                <Box className="d-flex align-items-center justify-content-between">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold mb-0 text-black'>
                            Document List 
                        </Typography>
                    </Box>

                    {/*  */}

                    <Box className="d-flex align-items-center justify-content-between flex-wrap">
                        
                        <Button className='btn-blue-2 me-2 mb-1' size="small" onClick={createTask} >Create Task</Button>
                        <Button className='btn-blue-2 me-2 mb-1' size="small" >Send as Email</Button>
                        {/* <Button className='btn-blue-2 me-2 mb-1' size="small" >Downloads</Button> */}

                        <Box>
                            <Button
                                id="basic-button"
                                aria-controls={ChangeIndex ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={ChangeIndex ? 'true' : undefined}
                                onClick={handleClickChangeIndex}
                                className='btn-blue-2'
                            >
                                Category
                                {/* <KeyboardArrowDownIcon className='ms-1' /> */}
                            </Button>
                            {/* <Menu
                                id="basic-menu"
                                className='custom-dropdown'
                                anchorEl={anchorElChangeIndex}
                                open={ChangeIndex}
                                onClose={handleCloseChangeIndex}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleCloseChangeIndex}> <CategoryIcon className='me-2' /> Category</MenuItem>
                                <MenuItem onClick={handleCloseChangeIndex}> <GradingIcon className='me-2' /> Refile</MenuItem>
                                <MenuItem onClick={handleCloseChangeIndex}> <InsertLinkIcon className='me-2' /> Links</MenuItem>
                                <MenuItem onClick={handleCloseChangeIndex}> <AddIcon className='me-2' /> </MenuItem>
                                <MenuItem onClick={handleCloseChangeIndex}> <AlarmOnIcon className='me-2' /> Add Activity </MenuItem>
                            </Menu> */}
                        </Box>

                        <Button onClick={handleClosePDFView} autoFocus sx={{ minWidth: 30 }}>
                            <span className="material-symbols-outlined text-black">
                                cancel
                            </span>
                        </Button>

                    </Box>
                </Box>

                <hr />

                <DialogContentText id="alert-dialog-description">
                    <Box sx={{ width: '100%', typography: 'body1' }} className="mt-3">
                        <TabContext value={value}>
                            <Box>
                                <Tabs onChange={handleChange} aria-label="lab API tabs example" className='custom-tabs'>
                                    <Tab label="Documents" value="1" />
                                    <Tab label="Versions" value="2" />
                                    <Tab label="Notes" value="3" />
                                    <Tab label="Associated Tasks" value="4" />
                                    <Tab label="Activity" value="5" />
                                    <Tab label="Attachments" value="6" />
                                </Tabs>
                            </Box>
                            <TabPanel value="1" className='p-0'>
                                <Box className='white-box'>
                                    <Box className='text-end mb-3'>
                                        <DownloadForOfflineIcon className='text-red pointer font-32' />
                                    </Box>
                                    <iframe
                                        src={viewerUrl} // Specify the URL of the iframe
                                        width="100%" // Set the width
                                        height="700px" // Set the height
                                        frameBorder="0" // Set frameborder to 0
                                        allowFullScreen // Allow fullscreen mode
                                        title="Embedded Content" // Set the title for accessibility
                                    />
                                </Box>
                            </TabPanel>
                            
                            <TabPanel value="2">
                                <Box className='row'>
                                    {Array(12).fill("").map(() => {
                                        return <>
                                            <Box className='col-lg-3'>
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
                                            </Box>
                                        </>
                                    })}
                                </Box>
                            </TabPanel>

                            <TabPanel value="3" className='p-0'>
                                {<HtmlEditorDX templateDataMarkup={templateDataMarkup} setTemplateDataMarkup={setTemplateDataMarkup} setEditorContentValue={setEditorContentValue}></HtmlEditorDX>}
                                <Box className='text-end'>
                                    <Button onClick={SaveStickyNotes} variant="contained" className='mt-3'>Save Notes</Button>

                                    <ToastContainer></ToastContainer>

                                </Box>
                            </TabPanel>

                            <TabPanel value="4">

                                <Box className='text-center'>
                                    {getAssociatedTaskList && getAssociatedTaskList.map((item, index) => {
                                        let str = item?.AssignedToID;
                                        let arr = str?.split(',').map(Number);
                                        let isUserAssigned = arr?.includes(parseInt(localStorage.getItem('UserId')));
                                        console.log("isUserAssigned", isUserAssigned)
                                        return (
                                            <label key={index} className="text-decoration-none d-inline-flex align-content-center me-3 mb-3 flex">
                                                <RadioButtonUncheckedIcon className={`me-1 ${isUserAssigned ? 'green' : 'disabled'}`} />
                                                {item.Subject}
                                            </label>
                                        );
                                    })}

                                </Box>

                            </TabPanel>

                            <TabPanel value="5" className='p-0'>
                                <Activity getAudit={getAudit}></Activity>
                            </TabPanel>

                            {/* <TabPanel value="5">
                        <DocumentList/>
                    </TabPanel> */}
                            <TabPanel value="6">

                                <Box className='d-flex mb-3 mt-2'>
                                    {/* <FormControlLabel control={<Checkbox />} className="p-0 m-0 ms-2 ps-1" size="small"/> */}
                                    <Checkbox {...label} defaultChecked size="small" />

                                    <Button className='btn-blue-2 me-2 mb-1 pointer' for='file-upload' startIcon={<AttachFileIcon />}>
                                        <input type='file' id='file-upload' multiple onChange={handleFileSelect} className='file-input' />
                                        <label for='file-upload' className='pointer '>Upload Your File</label>
                                    </Button>

                                    <Button className='btn-red me-2 mb-1' onClick={DeleteDocumentAttachment} startIcon={<AttachFileIcon />}>Delete</Button>

                                    <Button className='btn-blue-2 me-2 mb-1' onClick={DowloadSingleFileOnClick} startIcon={<AttachFileIcon />}>Download</Button>

                                </Box>

                                <hr />

                                <Box className='row'>

                                    {getAttachment ? getAttachment.map((el, index) => {
                                        return (<>
                                            <Box className='col-xxl-3 col-xl-4 col-md-6'>
                                                <Box className="file-uploads">
                                                    <label className="file-uploads-label file-uploads-document">
                                                        <Box className="d-flex align-items-center">
                                                            <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" onChange={() => handeleAttachmentChange(el)} />

                                                            <DescriptionIcon
                                                                sx={{
                                                                    fontSize: 32,
                                                                }}
                                                                className='me-2'
                                                            />
                                                            <Box className="upload-content pe-3">
                                                                <Typography variant="h4" >
                                                                    {el.Description}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {cls.DateForMate(el.DateAssigned)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </label>
                                                </Box>
                                                {/* file upload end */}
                                            </Box>
                                        </>)
                                    }) : ""}

                                </Box>

                            </TabPanel>
                        </TabContext>

                    </Box>
                </DialogContentText>
            </DialogContent>

            {/* <DialogActions>
                <Button onClick={handleClosePDFView}>Disagree</Button>
                <Button onClick={handleClosePDFView} autoFocus>
                    Agree
                </Button>
            </DialogActions> */}
        </Dialog>

    )
}

export default DocumentsVewModal;