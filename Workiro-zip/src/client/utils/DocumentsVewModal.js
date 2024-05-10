import React, { useEffect, useState } from 'react';

import { Box, Button, Typography, Dialog, DialogContent, DialogContentText, Tabs, Tab, Checkbox, Menu, MenuItem, DialogActions, Grid, FormControlLabel, TextField, Autocomplete, RadioGroup, FormLabel, Radio, FormControl } from '@mui/material';
import TabContext from '@mui/lab/TabContext';

import TabPanel from '@mui/lab/TabPanel';
import DescriptionIcon from '@mui/icons-material/Description';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Activity from '../../client/utils/Activity';

import LockIcon from '@mui/icons-material/Lock';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CommanCLS from '../../services/CommanService';

import HtmlEditorDX from '../../components/HtmlEditor';
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import CreateNewModalTask from '../../components/CreateNewModal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { handleOpenModalRedux, setClientAndDocDataForTaskModalRedux, setGetActivitySonam, setOpenReIndex, setSelectedDocumentRedux } from "../../redux/reducers/counterSlice"
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import $ from 'jquery';
import Fileformat from '../../images/files-icon/pdf.png';
import ListIcon from '@mui/icons-material/List';
import RedeemIcon from '@mui/icons-material/Redeem';
import CategoryIcon from '@mui/icons-material/Category';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import DvrIcon from '@mui/icons-material/Dvr';
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import LanguageIcon from '@mui/icons-material/Language';
import PublishIcon from '@mui/icons-material/Publish';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import DownloadIcon from '@mui/icons-material/Download';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CreateIcon from '@mui/icons-material/Create';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TabList } from '@mui/lab';

import { getFolders_Redux,Json_SearchDocById_Redux,Json_GetSections_Redux, Json_GetSupplierListByProject_Redux } from '../../redux/reducers/api_helper';
import { useDispatch,useSelector } from 'react-redux'; 
import ReFile from '../../components/ReFile';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




function DocumentsVewModal({ isLoadingDoc, setIsLoadingDoc, openPDFView, setOpenPDFView, selectedDocument, Json_CRM_GetOutlookTask }) {
   // console.log(selectedDocument, "selected document ")
    const dispatch = useDispatch();


   

    //console.log(allFolders, "selected document ")

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    // const [txtFolderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const [ViewerToken, setViewerToken] = useState(localStorage.getItem("ViewerToken"));
    const [getAudit, setGetAudit] = useState([]);

    const [getAttachment, setGetAttachment] = useState([]);

    const [txtClientData, setTxtClientData] = useState({});
    const [txtSectionData, setTxtSectionData] = useState({});
    const [txtFolderData, setTxtFolderData] = useState({});

   

    //const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
    const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    // base url for api
    //   let dt = new LoginDetails();
    let cls = new CommanCLS(baseUrl, agrno, Email, password);
    let clsPractice = new CommanCLS(baseUrlPractice, agrno, Email, password);

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
    const handleChangeCheckOut = () => {

        try {
            let o = { ItemId: selectedDocument["Registration No."], ViewerToken: localStorage.getItem("ViewerToken") }
            cls.Json_CheckoutItem(o, function (sts, data) {
                if (sts) {
                    if (data) {

                        console.log("Json_CheckoutItem", data)
                        if (data.includes("Success")) {
                            var getversion = data.split(":")[1];
                            let openUrl = `https://mydocusoft.com/DSFileViewer.aspx?agreementid=${agrno}&Email=${Email}&ItemId=${selectedDocument["Registration No."]}&Guid=${selectedDocument["guid"]}&VersionId=${getversion}&ViewerToken=${localStorage.getItem("ViewerToken")}`;

                            window.open(openUrl);
                            return;

                        }

                    }
                }
            })
        } catch (error) {

        }


        setAnchorElChangeIndex(null);

    };

    const [value, setValue] = React.useState('1');

    

    const [viewerUrl, setViwerUrl] = React.useState("");
   
    const [seletedFileData, setSeletedFileData] = React.useState([]);
    const [getVertion, setGetVertion] = React.useState([]);
    const [selectedFiles, setSelectedFiles] = React.useState([]);

    const [templateDataMarkup, setTemplateDataMarkup] = React.useState([]);
    const [editorContentValue, setEditorContentValue] = React.useState([]);
    const [getAssociatedTaskList, setGetAssociatedTaskList] = React.useState([]);



    const [documentdata, setDocumentData] = useState();
    const [openModal, setopenModal] = useState(false);
    const [TaskType, setTaskType] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const [createNewFileObj, setCreateNewFileObj] = useState([]);

    const [ShareanchorEl, setShareAnchorEl] = React.useState(null);
    const [CreateTaskanchorEl, setCreateTaskAnchorEl] = React.useState(null);
    const [ReIndexopen, setReIndexOpen] = React.useState(false);
    const [Categoryopen, CategorysetOpen] = React.useState(false);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClosePDFView = () => {
        setOpenPDFView(false);
    };

    const call_Json_GetAudit = () => {
        Json_GetAudit();
    }



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
                        // const formattedActivity = table.map((Actioned) => {
                        //     let ActioneddATE;
                        //     if (Actioned["Actioned Date"]) {
                        //         ActioneddATE = moment(Actioned["Actioned Date"]).format("DD/MM/YYYY HH:mm:ss");
                        //     }
                        //     // const date = new Date(ActivityDate);
                        //     return { ...Actioned, ["Actioned Date"]: ActioneddATE };
                        // });
                        const formattedActivity = table.map(itm => {
                            if (itm["Actioned Date"]) {
                                const timeStamp1 = parseInt(itm["Actioned Date"].match(/\d+/)[0]);
                                itm["Actioned Date"] = new Date(timeStamp1);
                            }
                            //const timeStamp2 = parseInt(itm["Start"].match(/\d+/)[0]);
                            //itm["Start"] = new Date(timeStamp2);
                            return itm;
                        })
                        if (formattedActivity.length > 0) {
                            const filteredArray = formattedActivity.filter(item => item.Comments !== null);

                            setGetAudit(filteredArray);
                            console.log("Json_GetAudit", filteredArray)
                        }


                    }


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
                    // console.log("Json_GetItemStickyNotes", atob);
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

        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        setViewerToken(localStorage.getItem("ViewerToken"));

        if (selectedDocument) {


            dispatch(getFolders_Redux());
            dispatch(Json_SearchDocById_Redux(selectedDocument["Registration No."]));
            if(selectedDocument.ProjectId){                    
                dispatch(Json_GetSections_Redux(selectedDocument.ProjectId));
                dispatch(Json_GetSupplierListByProject_Redux(selectedDocument.ProjectId))
               } 

            dispatch(setSelectedDocumentRedux(selectedDocument))
          


            console.log("selectedDocument", selectedDocument)

            setTxtClientData({ Client: selectedDocument.Client, ClientID: selectedDocument.SenderId })
            setTxtSectionData({ Sec: selectedDocument.Section, SecID: selectedDocument.PostItemTypeID })
            setTxtFolderData({ Folder: selectedDocument.Folder, FolderID: selectedDocument.ProjectId })

            Json_GetItemBase64DataById(selectedDocument)

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
            setSeletedFileData([]);
            setopenModal(false)
            Json_GetVersionByItemId();

        }

    }, [selectedDocument])

    const handeleAttachmentChange = (el) => {
        setSeletedFileData((pre) => [...pre, el]);

    }


    function Json_GetVersionByItemId() {
        try {
            let obj = {};
            obj.itemId = selectedDocument["Registration No."];
            cls.Json_GetVersionByItemId(obj, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let tbl = js.Table;
                        if (tbl.length > 0) {
                            console.log("Json_GetVersionByItemId", tbl)
                            setGetVertion(tbl)
                        }

                    }

                }

            })
        } catch (error) {
            console.log("Json_GetVersionByItemId error", error)
        }
    }


    function Json_GetItemBase64DataById(item) {
        try {
            let filesData = [];
            let obj = {};
            obj.ItemId = item["Registration No."]
            cls.Json_GetItemBase64DataById(obj, function (sts, base64data) {
                if (sts) {
                    if (base64data !== "No Data Exist") {
                        const fileData = {
                            FileName: item.Description + "." + item.Type,
                            Base64: base64data ? base64data : "", // Base64 data of the file
                            FileSize: "",
                            Preview: "", // Data URL for preview
                            DocId: item["Registration No."],
                            Guid: "",
                            FileType: item["Type"],
                            Description: item.Description

                        };
                        console.log("handle change fileData", fileData)
                        filesData.push(fileData);


                        // let tempTxtClientData = { Client: item.Client, ClientID: item.SenderId };
                        // let tempTxtSectionData = { Sec: item.Section, SecID: item.PostItemTypeID };
                        // let tempFolderData = { Folder: item.Folder, FolderID: item.ProjectId };

                        // dispatch(setClientAndDocDataForTaskModalRedux({ TaskType: "CRM", createNewFileObj: filesData, txtClientData: tempTxtClientData, txtSectionData: tempTxtSectionData, txtFolderData: tempFolderData, }));
                        // // console.log("dgjkdlgjroeti",tskType);
                        // dispatch(handleOpenModalRedux("CRM"));


                        setCreateNewFileObj(filesData);
                    }
                    else {
                        toast.error("Document is blank.")
                    }

                }

            })
        } catch (error) {
            console.log("Json_GetItemBase64DataById error", error)
        }
    }

    function DowloadSingleFileOnClick() {
        console.log("DowloadSingleFileOnClick", createNewFileObj)
        try {
            if (createNewFileObj.length > 0) {
                const byteCharacters = atob(createNewFileObj[0].Base64);
                const byteNumbers = new Array(byteCharacters.length);

                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/octet-stream' });

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = createNewFileObj[0].FileName;
                document.body.appendChild(a);
                a.click();

                // Clean up
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
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

    const handleTaskModalOpening = (taskType) => {
        if (selectedDocument && createNewFileObj) {
            let tempTxtClientData = { Client: selectedDocument.Client, ClientID: selectedDocument.SenderId };
            let tempTxtSectionData = { Sec: selectedDocument.Section, SecID: selectedDocument.PostItemTypeID };
            let tempFolderData = { Folder: selectedDocument.Folder, FolderID: selectedDocument.ProjectId };

            console.log("handle change fileData", createNewFileObj);

            dispatch(setClientAndDocDataForTaskModalRedux({ TaskType: taskType, createNewFileObj: createNewFileObj, txtClientData: tempTxtClientData, txtSectionData: tempTxtSectionData, txtFolderData: tempFolderData, }));
            // console.log("dgjkdlgjroeti",tskType);
            dispatch(handleOpenModalRedux(taskType));
        }
    }

    const createTask = () => {
        setTaskType("CRM")
        // setopenModal(true)
        handleTaskModalOpening("CRM");
    }

    const createTaskForPublish = () => {
        setTaskType("Portal")
        // setopenModal(true)
        handleTaskModalOpening("Portal");
    }
    const PublishDocument = () => {
        try {
            let o = { ItemId: selectedDocument["Registration No."] };
            cls.Json_SearchDocById(o, function (sts, doc) {
                if (sts) {
                    if (doc) {
                        let js = JSON.parse(doc);
                        let tbl = js[""];
                        console.log("Json_SearchDocById", tbl);
                        let opeUrl = `https://www.sharedocuments.co.uk/Compose.aspx?accid=${agrno}&email=${Email}&check=${password}&sendclient=${tbl[0].SenderId}&sendemail=&clientname=${tbl[0].Client}&docs=${tbl[0]["Registration No."]}`;
                        window.open(opeUrl);
                    }
                }

            });
        } catch (error) {
            console.log("Network Error Json_SearchDocById")
        }

    }


    // 

    const openCreateTask = Boolean(CreateTaskanchorEl);
    const createTaskhandleClick = (event) => {
        setCreateTaskAnchorEl(event.currentTarget);
    };
    const CreateTaskhandleClose = () => {
        setCreateTaskAnchorEl(null);
    };


    // 
    const openShare = Boolean(ShareanchorEl);
    const SharehandleClick = (event) => {
        setShareAnchorEl(event.currentTarget);
    };
    const SharehandleClose = () => {
        setShareAnchorEl(null);
    };

    const ReIndexhandleClickOpen = () => {        
        setReIndexOpen(true);

    };
   


    const CategoryhandleClickOpen = () => {
        CategorysetOpen(true);
    };

    const CategoryhandleClose = () => {
        CategorysetOpen(false);
    };


    const [Renameopen, RenamesetOpen] = React.useState(false);
    const RenamehandleClickOpen = () => {
        RenamesetOpen(true);
    };
    const RenamehandleClose = () => {
        RenamesetOpen(false);
    };

    return (
        <>
        <ReFile ReIndexopen={ReIndexopen} setReIndexOpen={setReIndexOpen} selectedDocument={selectedDocument}></ReFile>
            <Dialog
                open={openPDFView}
                onClose={handleClosePDFView}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal full-modal
                '
                sx={{ width: '100%', maxWidth: '100%' }}
            >

                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold mb-0 text-black'>
                            Document Viewer
                        </Typography>
                    </Box>

                    {/*  */}

                    <Box className="d-flex align-items-center justify-content-between flex-wrap">

                        <Box className='text-end relative me-3'>
                            <DownloadForOfflineIcon onClick={DowloadSingleFileOnClick} className='text-red pointer font-32 btn-download' />
                        </Box>

                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={openCreateTask ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openCreateTask ? 'true' : undefined}
                                onClick={createTaskhandleClick}
                                className='btn-blue-2 me-2 mb-1'
                                startIcon={<BorderColorIcon />}
                            >
                                Create Task
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={CreateTaskanchorEl}
                                open={openCreateTask}
                                onClose={CreateTaskhandleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        CreateTaskhandleClose();
                                        createTask();
                                    }}
                                ><DvrIcon className='me-1' /> CRM Task</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        CreateTaskhandleClose();
                                        createTask();
                                    }}
                                ><InsertPageBreakIcon className='me-1' /> DMS Task</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        CreateTaskhandleClose();
                                        createTaskForPublish();
                                    }}
                                ><LanguageIcon className='me-1' /> Portal Task</MenuItem>
                            </Menu>
                        </div>

                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={openShare ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openShare ? 'true' : undefined}
                                onClick={SharehandleClick}
                                className='btn-blue-2 me-2 mb-1'
                                startIcon={<ShareIcon />}
                            >
                                Share
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={ShareanchorEl}
                                open={openShare}
                                onClose={SharehandleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        SharehandleClose();
                                        PublishDocument();
                                    }}
                                >
                                    <PublishIcon className='me-1' />
                                    Publish</MenuItem>
                                {/* <MenuItem onClick={SharehandleClose}>
                                    <ForwardToInboxIcon className='me-1' />
                                    Send as Form</MenuItem>
                                <MenuItem onClick={SharehandleClose}>
                                    <MarkunreadIcon className='me-1' />
                                    Email</MenuItem> */}
                                {/* <MenuItem onClick={SharehandleClose}>
                                    <DownloadIcon className='me-1' />
                                    Download</MenuItem> */}
                            </Menu>
                        </div>

                        {/* <Button className='btn-blue-2 me-2 mb-1' size="small" onClick={createTask} >Create Task</Button>
                        <Button className='btn-blue-2 me-2 mb-1' size="small" onClick={createTaskForPublish} >Publish</Button> */}
                        <Box>
                            <Button
                                id="basic-button"
                                aria-controls={ChangeIndex ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={ChangeIndex ? 'true' : undefined}
                                onClick={handleClickChangeIndex}
                                className='btn-blue-2 me-2 mb-1'
                                startIcon={<CreateIcon />}

                            >
                                Edit
                                {/* <KeyboardArrowDownIcon className='ms-1' /> */}
                            </Button>
                            <Menu
                                id="basic-menu"
                                className='custom-dropdown'
                                anchorEl={anchorElChangeIndex}
                                open={ChangeIndex}
                                onClose={handleCloseChangeIndex}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >

                                <MenuItem onClick={() => {
                                    handleCloseChangeIndex();
                                    ReIndexhandleClickOpen();
                                }}>
                                    <ListIcon className='me-1' />  Re-index
                                </MenuItem>

                                {selectedDocument && (selectedDocument.type === "docx" || selectedDocument.type === "doc" || selectedDocument.type === "excel" || selectedDocument.type === "xlsx") && (
                                    <MenuItem onClick={handleChangeCheckOut}>
                                        <RedeemIcon className='me-1' />
                                        Check-Out
                                    </MenuItem>
                                )}
                                
                                {/* <MenuItem onClick={handleCloseChangeIndex}> <RedeemIcon className='me-1' /> Check-Out</MenuItem> */}
                                <MenuItem onClick={() => {
                                    handleCloseChangeIndex();
                                    CategoryhandleClickOpen();
                                }}
                                > <CategoryIcon className='me-1' /> Category</MenuItem>
                                <MenuItem

                                    onClick={() => {
                                        handleCloseChangeIndex();
                                        RenamehandleClickOpen();
                                    }}

                                > <DriveFileRenameOutlineIcon className='me-1' /> Rename</MenuItem>
                                {/* <MenuItem onClick={handleCloseChangeIndex}> <AddToDriveIcon className='me-1' /> Upload to Drive</MenuItem> */}
                            </Menu>
                        </Box>

                        <Button onClick={handleClosePDFView} autoFocus sx={{ minWidth: 30 }}>
                            <span className="material-symbols-outlined text-black">
                                cancel
                            </span>
                        </Button>

                    </Box>
                </Box>

                <DialogContent className='clearfix'>

                    <DialogContentText id="alert-dialog-description">
                        <Box className="mt-3 full-height-modal">
                            <TabContext value={value}>
                                <Box>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example" className='custom-tabs'>
                                        <Tab label="Documents" value="1" />
                                        <Tab label="Versions" value="2" />
                                        <Tab label="Notes" value="3" />
                                        <Tab label="Associated Tasks" value="4" />
                                        <Tab label="Activity" value="5" />
                                        <Tab label="Attachments" value="6" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1" className='p-0'>
                                    <Box className='white-box'>

                                        {viewerUrl && (
                                            <iframe
                                                src={isLoadingDoc ? "https://6612849d1f1acaa676039a99--amazing-haupia-bf1c0b.netlify.app/" : viewerUrl} // Specify the URL of the iframe
                                                // src={"http://127.0.0.1:5501/src/client/utils/test/test.html"}
                                                onLoad={() => {
                                                    setIsLoadingDoc(false);
                                                }}
                                                width="100%" // Set the width
                                                height="700px" // Set the height
                                                frameBorder="0" // Set frameborder to 0
                                                allowFullScreen // Allow fullscreen mode
                                                title="Embedded Content" // Set the title for accessibility
                                            />

                                        )}

                                    </Box>
                                </TabPanel>

                                <TabPanel value="2" className='p-0'>
                                    <Box className='row'>

                                        {getVertion.length > 0 ? getVertion.map((item, index) => {
                                            return <>
                                                <Box className='col-lg-3' key={index}>
                                                    <Box className="file-uploads">
                                                        <label className="file-uploads-label file-uploads-document">
                                                            <Box className="d-flex align-items-center">
                                                                {/* <DescriptionIcon
                                                                    sx={{
                                                                        fontSize: 32,
                                                                    }}
                                                                    className='me-2'
                                                                /> */}
                                                                <div className='img-format'>
                                                                    <img src={Fileformat} />
                                                                </div>
                                                                <Box className="upload-content pe-3">
                                                                    <Typography variant="h4" className='d-flex align-items-center justify-content-between' >
                                                                        Version No {item.VersionNo} {item.IsLocked && (<>

                                                                            <LockIcon size="small"></LockIcon>

                                                                        </>)}
                                                                    </Typography>
                                                                    <Typography variant="body1">
                                                                        {moment(item["VDate"]).format("DD/MM/YYYY HH:mm:ss")} | Updated by {item.UserName.toUpperCase()}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </label>
                                                    </Box>
                                                    {/* file upload end */}
                                                </Box>
                                            </>
                                        }) : ""}
                                    </Box>
                                </TabPanel>

                                <TabPanel value="3" className='p-0'>
                                    <Box className='mt-3'>
                                        {<HtmlEditorDX templateDataMarkup={templateDataMarkup} setTemplateDataMarkup={setTemplateDataMarkup} setEditorContentValue={setEditorContentValue}></HtmlEditorDX>}
                                        <Box className='text-end mt-2'>
                                            <Button onClick={SaveStickyNotes} variant="contained" className='mt-3 btn-blue-2'>Save Notes</Button>
                                            {/* <ToastContainer style={{ zIndex: "9999999" }}></ToastContainer> */}
                                        </Box>
                                    </Box>
                                </TabPanel>

                                <TabPanel value="4" className='p-0'>
                                    <Box className='text-center mt-4'>
                                        {getAssociatedTaskList && getAssociatedTaskList.map((item, index) => {
                                            let str = item?.AssignedToID;
                                            let arr = str?.split(',').map(Number);
                                            let isUserAssigned = arr?.includes(parseInt(localStorage.getItem('UserId')));
                                            console.log("isUserAssigned", isUserAssigned)
                                            return (
                                                // <Button key={index} onClick={(e) => Json_CRM_GetOutlookTask(e, item)} className="btn btn-outlin-2 me-2 mb-2" variant="outlined" disabled>
                                                //     <AlarmOnIcon className={`me-2 ${isUserAssigned ? 'green' : 'disabled'}`} />
                                                //     {item.Subject}
                                                // </Button>

                                                <Button key={index} onClick={(e) => Json_CRM_GetOutlookTask(e, item)} className="btn btn-outlin-2 me-2 mb-2" variant="outlined">
                                                    <AlarmOnIcon className={`me-2 ${isUserAssigned ? 'green' : 'disabled'}`} />
                                                    <span>{item.Subject}</span>
                                                </Button>
                                            );
                                        })}
                                    </Box>
                                </TabPanel>

                                <TabPanel value="5" className='p-0'>
                                    <Activity getAudit={getAudit} selectedDocument={selectedDocument} call_Json_GetAudit={call_Json_GetAudit}></Activity>
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

                                        <Button className='btn-red me-2 mb-1 ps-1' onClick={DeleteDocumentAttachment} startIcon={<AttachFileIcon />}>Delete</Button>

                                        <Button className='btn-blue-2 me-2 mb-1 ps-1' onClick={DowloadSingleFileOnClick} startIcon={<DownloadIcon />}>Download</Button>

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

                                                                {/* <DescriptionIcon
                                                                    sx={{
                                                                        fontSize: 32,
                                                                    }}
                                                                    className='me-2'
                                                                /> */}
                                                                <div className='img-format'>
                                                                    <img src={Fileformat} />
                                                                </div>
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


                            {/* {openModal && openModal && <CreateNewModalTask
                                TaskType={TaskType}
                                createNewFileObj={createNewFileObj}
                                txtClientData={txtClientData}
                                txtSectionData={txtSectionData}
                                txtFolderData={txtFolderData}
                                openModal={openModal}
                                setOpenModal={setopenModal}
                            ></CreateNewModalTask>} */}
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


            {/* Re-Index modal Start */}
           


            {/* category modal start */}

            <Dialog
                open={Categoryopen}
                onClose={CategoryhandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'

                sx={{
                    maxWidth: 660,
                    width: '100%',
                    margin: '0 auto'
                }}
            >
                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold text-black'>
                            Section Category
                        </Typography>
                    </Box>

                    {/*  */}
                    <Button onClick={CategoryhandleClose}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="1. Received" control={<Radio className='text-blue' />} label="1. Received" />
                                <FormControlLabel value="2. Pending" control={<Radio className='text-blue' />} label="2. Pending" />
                                <FormControlLabel value="3. Complete" control={<Radio className='text-blue' />} label="3. Complete" />
                                <FormControlLabel value="4. Will Test" control={<Radio className='text-blue' />} label="4. Will Test" />

                                <FormControlLabel value="1. Received" control={<Radio className='text-blue' />} label="1. Received" />
                                <FormControlLabel value="2. Pending" control={<Radio className='text-blue' />} label="2. Pending" />
                                <FormControlLabel value="3. Complete" control={<Radio className='text-blue' />} label="3. Complete" />
                                <FormControlLabel value="4. Will Test" control={<Radio className='text-blue' />} label="4. Will Test" />


                            </RadioGroup>
                        </FormControl>
                    </DialogContentText>

                    <hr />

                    <DialogActions className='justify-content-between'>

                        <Typography variant="h4" className='font-14 bold text-black mb-0'>
                            Doc ID: 992102
                            {/* {console.log(selectedDocudata, "selectedDocudata11")}
                            Doc ID: {selectedDocudata && selectedDocudata["Registration No."] ? selectedDocudata["Registration No."] : selectedDocudata?.ItemId
                            } */}
                        </Typography>

                        <Box>
                            <Button className='btn-red me-2' onClick={CategoryhandleClose}>Cancel</Button>
                            <Button className='btn-blue-2' onClick={CategoryhandleClose} autoFocus>
                                Submit
                            </Button>
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>



            {/* Rename Modal */}
            <Dialog
                open={Renameopen}
                onClose={RenamehandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'

                sx={{
                    maxWidth: 660,
                    width: '100%',
                    margin: '0 auto'
                }}
            >
                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold text-black'>
                            Edit Description
                        </Typography>
                    </Box>

                    {/*  */}
                    <Button onClick={RenamehandleClose}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box className='mb-3'>
                            <Autocomplete
                                disablePortal
                                options={top100Films}
                                renderInput={(params) => <TextField {...params} label="Standard Description List
                                " />}
                                MenuProps={{ PaperProps: { sx: { maxHeight: '100px !important' } } }}
                            />
                        </Box>

                        <Box>
                            <label className='font-14 text-black'>Document Date</label>
                            <textarea className='textarea w-100' placeholder='Description'></textarea>
                        </Box>

                    </DialogContentText>

                    <hr />

                    <DialogActions>
                        <Button onClick={RenamehandleClose} className='btn-red'>Cancel</Button>
                        <Button onClick={RenamehandleClose} className='btn-blue-2' autoFocus>
                            Submit
                        </Button>
                    </DialogActions>

                </DialogContent>

            </Dialog>
        </>
    )
}

const top100Films = [
    { label: 'Client', year: 1994 },
    { label: 'Cases', year: 1972 },
    { label: 'Customer', year: 1974 },
]
export default DocumentsVewModal;