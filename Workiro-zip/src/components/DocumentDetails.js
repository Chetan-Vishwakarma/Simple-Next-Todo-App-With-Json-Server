import React, { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Link, Chip, Stack, ListItemIcon, Radio, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import moment from 'moment';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import DocumentsVewModal from "../client/utils/DocumentsVewModal";
import Activity from "../client/utils/Activity";
import { ToastContainer, toast } from 'react-toastify';
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
    DataGridTypes,
    Selection,
    Scrolling,
    RemoteOperations,
    Sorting
} from 'devextreme-react/data-grid';
import DataNotFound from "./DataNotFound";
import CommanCLS from "../services/CommanService";
import TaskDetailModal from "./TaskDetailModal";
import CreateNewModalTask from "./CreateNewModal";
import { useDispatch } from "react-redux";
import { handleOpenModalRedux, setClientAndDocDataForTaskModalRedux } from "../redux/reducers/counterSlice";


// sadik code start
// function createData(document, details) {
//     return { document, details };
// }


//const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// sadik code end
const agrno = localStorage.getItem("agrno");
const Email = localStorage.getItem("Email");
const password = localStorage.getItem("Password");
const folderId = localStorage.getItem("FolderId");
const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
//const baseUrlDocuSms = "https://docusms.uk/dsdesktopwebservice.asmx/";

function DocumentDetails({ documents, advFilteredResult, dataNotFoundBoolean, selectedGroup }) {
    const dispatch = useDispatch();
    const Cls = new CommanCLS(baseUrl, agrno, Email, password);
    const ClsPractice = new CommanCLS(baseUrlPractice, agrno, Email, password);

    //const ClsDocuSms = new CommanCLS(baseUrlDocuSms, agrno, Email, password);

    const [openPDFView, setOpenPDFView] = React.useState(false);

    const [selectedDocument, setSelectedDocument] = React.useState(null);
    const [docForDetails, setDocForDetails] = useState({});

    const [associatedTask, setAssociatedTask] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});
    const [isApi, setIsApi] = useState(false);

    const [getAudit, setGetAudit] = useState([]);

    // modal
    const [openModal, setOpen] = React.useState(false);
    const [isLoadingDoc, setIsLoadingDoc] = useState(true);

    const handleClickDetailOpen = () => {
        setOpen(true);
    };

    const handleClickOpenPDFView = (event, data) => {
        //console.log("fjdsfdlsjfljfllj main function");
        // event.preventDefault();
        event.stopPropagation();
        setSelectedDocument(data);
        setOpenPDFView(true);
        setIsLoadingDoc(true);
    };


    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     // setAnchorEl(null);
    //     setOpen(false)
    // };


    // document details modal
    const [documentLis, setOpenDocumentList] = React.useState(false);
    const handleClickOpen = () => {
        setOpenDocumentList(true);
    };
    const handleCloseDocumentList = () => {
        setOpenDocumentList(false);
    };

    // details dropdown
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState({});
    const DocumentList = (index) => Boolean(anchorElDocumentList[index]);
    const handleClickDocumentList = (event, rowData) => {
        // console.log("fjdsfdlsjfljfllj problem detect");
        event.stopPropagation();
        const newAnchorElDocumentList = { ...anchorElDocumentList };
        newAnchorElDocumentList[rowData.key] = event.currentTarget;
        setAnchorElDocumentList(newAnchorElDocumentList);
    };

    const handleCloseDocument = (event, rowData) => {
        event.stopPropagation();
        const newAnchorElDocumentList = { ...anchorElDocumentList };
        delete newAnchorElDocumentList[rowData.key];
        setAnchorElDocumentList(newAnchorElDocumentList);
    };

    const [editField,setEditField] = useState("");
    const [testForEdit,setTestForEdit] = useState("");
    const [renderTest,setRenderTest] = useState({});

    const [editingIndex, setEditingIndex] = useState(null);
    const [updatedSubject, setUpdatedSubject] = useState('');
    const [test, setTest] = useState({});

    const handleEdit = (index,data) => {
        console.log("Editing index:", index);
        setEditingIndex(index);
        setUpdatedSubject(data.Description);
    };

    const handleEditChange = (event) => {
        setUpdatedSubject(event.target.value);
    };

    const Json_RenameDocument = (doc, newDesc, index) => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            ItemId: doc["Registration No."] ? doc["Registration No."] : "",
            Description: newDesc,
            FolderId: folderId
        };
        Cls.Json_RenameDocument(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    console.log("Json_RenameDocument", json);
                    if(json.Status==="Success"){
                        // Json_getRecentDocumentList();
                        toast.success(json.Message);
                        setEditingIndex(null);
                        setTest({...test, [index]: newDesc});
                    }else{
                        toast.error("Unable to rename this document");
                    }
                }
            }
        });
    }

    const handleSave = (newDesc, oldDesc, doc, index) => {
        if(oldDesc===newDesc) return;
        Json_RenameDocument(doc, newDesc, index);
    };

    const handleEditField = (event, key) => {
        event.stopPropagation();
        setEditField(key);
        setTestForEdit("");
    }

    // const Json_Get_CRM_Task_ActivityByTaskId=(sTask)=>{
    //     let obj = {
    //         Email: localStorage.getItem('Email'),
    //         TaskID: sTask["Taskid"],
    //         agrno: localStorage.getItem("agrno"),
    //         password: localStorage.getItem("Password")
    //     }
    //     try{
    //         Cls.Json_Get_CRM_Task_ActivityByTaskId(obj,(sts,data)=>{
    //             const res = JSON.parse(data);
    //             if(res.Table.length>0){
    //                 console.log("sjdjsfs",res.Table[0]);
    //             }
    //         })
    //     }catch(err){
    //         console.log("Error while calling Json_Get_CRM_Task_ActivityByTaskId",err);
    //     }
    // } 

    const Json_CRM_GetOutlookTask = (event, sTask) => {
        event.preventDefault();
        let obj = {
            Email: localStorage.getItem('Email'),
            agrno: localStorage.getItem("agrno"),
            password: localStorage.getItem("Password")
        };
        try {
            Cls.Json_CRM_GetOutlookTask_ForTask((sts, data) => {
                const res = JSON.parse(data);
                if (res.Table) {

                    const fltTask = res.Table.filter(itm => itm.ID === sTask.Taskid);
                    // res.Table.filter(itm =>console.log(`ertiretufjhjfg ${itm.ID}`,itm.ID))
                    // console.log(`ertiretufjhjfg taskID`,sTask.Taskid);
                    const formattedTasks = fltTask.map((task) => {
                        let timestamp, timestamp2;
                        if (task.EndDateTime) {
                            timestamp = parseInt(task.EndDateTime.slice(6, -2));
                        }
                        if (task.CreationDate) {
                            timestamp2 = parseInt(task.CreationDate.slice(6, -2));
                        }

                        const date = new Date(timestamp);
                        const date2 = new Date(timestamp2);

                        return { ...task, EndDateTime: date, CreationDate: date2 };
                    });
                    // console.log("ertiretufjhjfg",formattedTasks);
                    if( formattedTasks.length > 0 ){
                        setSelectedTask(formattedTasks[0]);
                        handleClickDetailOpen(formattedTasks[0]);
                    }else if( formattedTasks.length === 0 ){
                        toast.error("Unable to open this task due to internal issue");
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_CRM_GetOutlookTask", err);
        }
    }

    const Json_getAssociatedTaskListByDocumentId = (sDoc) => {
        let obj = {
            Email: localStorage.getItem('Email'),
            ItemId: sDoc["Registration No."],
            agrno: localStorage.getItem("agrno"),
            password: localStorage.getItem("Password")
        }
        try {
            Cls.Json_getAssociatedTaskListByDocumentId(obj, (sts, data) => {
                const res = JSON.parse(data);
                if (res.Table.length > 0) {
                    setAssociatedTask(res.Table);
                } else {
                    setAssociatedTask([]);
                }
            })
        } catch (err) {
            console.log("Error while calling Json_getAssociatedTaskListByDocumentId", err);
        }
    }

    const Json_GetAudit = (sDoc) => {
        console.log("Json_GetAudit", sDoc);
        try {
            let obj = {
                itemid: sDoc["Registration No."],
                password: localStorage.getItem("Password")
            }
            Cls.Json_GetAudit(obj, function (sts, data) {
                if (sts && data) {
                    let parse = JSON.parse(data);
                    let table = parse.Table;
                    if (table.length > 0) {
                        // const formattedActivity = table.map((Actioned) => {
                        //     let ActioneddATE;
                        //     if (Actioned["Actioned Date"]) {
                        //         ActioneddATE = moment(Actioned["Actioned Date"]).format("YYYY/MM/DD HH:mm:ss");
                        //     }
                        //     // const date = new Date(ActivityDate);
                        //     return { ...Actioned, ["Actioned Date"]: ActioneddATE };
                        // });

                      const formattedActivity = table.map(itm => {
                        if(itm["Actioned Date"]){
                            const timeStamp1 = parseInt(itm["Actioned Date"].match(/\d+/)[0]);
                            itm["Actioned Date"] = new Date(timeStamp1);
                        }
                           
                            //const timeStamp2 = parseInt(itm["Start"].match(/\d+/)[0]);
                            //itm["Start"] = new Date(timeStamp2);
                            return itm;
                          })

                          if(formattedActivity.length>0){
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

    // Document details List
    const [openDocumentDetailsList, setOpenDocumentDetailsList] = React.useState(false);
    const handleClickOpenDocumentDetailsList = (event, sDoc) => {
        Json_getAssociatedTaskListByDocumentId(sDoc);
        setDocForDetails(sDoc);
        event.stopPropagation();
        setOpenDocumentDetailsList(true);
        Json_GetAudit(sDoc);
        console.log("selected document data obj",sDoc)
        Json_GetVersionByItemId(sDoc)

    };

    const [getVertion, setGetVertion] = React.useState([]);
    
    function Json_GetVersionByItemId(data) {
        console.log("selected document data obj333",data)
        try {           
            let obj = {};
           obj.itemId = data["Registration No."];
            Cls.Json_GetVersionByItemId(obj, function (sts, data) {
                if (sts) {   
                    if(data){
                        let js = JSON.parse(data);
                        let tbl = js.Table;
                        if(tbl.length>0){
                            console.log("Json_GetVersionByItemId",tbl)
                            setGetVertion(tbl)
                        }
                       
                    }                

                }

            })
        } catch (error) {
            console.log("Json_GetVersionByItemId error", error)
        }
    }


    const handleCloseDocumentDetailsList = (event) => {
        event.stopPropagation();
        setOpenDocumentDetailsList(false);
    };

    // accordian
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // end
    const customSortingMethod = (a, b) => {
        //console.log("dffdsf", a, b);
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
    };

    const startFormattingDate = (timeStamp) => {
        const dateObject = new Date(timeStamp);
        return `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
    }

    function Json_GetItemBase64DataById(item, tskType) {
        try {
            let filesData = [];
            let obj = {};
            obj.ItemId = item["Registration No."]
            // console.log("handle change fileData1", obj);

            Cls.Json_GetItemBase64DataById(obj, function (sts, base64data) {
                if (sts) {
                    if (base64data !== "No Data Exist") {
                        const fileData = {
                            FileName: item.Description + "." + item.Type,
                            Base64: base64data ? base64data : "", // Base64 data of the file
                            FileSize: "",
                            Preview: "", // Data URL for preview
                            DocId: item["Registration No."],
                            Guid: "",
                            FileType: item["Type"].toLowerCase(),
                            Description: item.Description

                        };
                        console.log("handle change fileData", fileData)
                        filesData.push(fileData);

                        let tempTxtClientData = { Client: item.Client, ClientID: item.SenderId };
                        let tempTxtSectionData = { Sec: item.Section, SecID: item.PostItemTypeID };
                        let tempFolderData = { Folder: item.Folder, FolderID: item.ProjectId };

                        dispatch(setClientAndDocDataForTaskModalRedux({ TaskType: tskType, createNewFileObj: filesData, txtClientData: tempTxtClientData, txtSectionData: tempTxtSectionData, txtFolderData: tempFolderData, }));
                        console.log("dgjkdlgjroeti",tskType);
                        dispatch(handleOpenModalRedux(tskType));
                    }
                    else {
                        toast.error(item.Description + "was not uploaded as it had no data")
                    }

                }

            })
        } catch (error) {
            console.log("Json_GetItemBase64DataById error", error)
        }

    }

    const handleCloseDocumentPublish = (event, rowData) => {
        if (rowData) {
            console.log("row selected data", rowData)
            event.stopPropagation();
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            let res = Json_GetItemBase64DataById(rowData.data, "Portal");
            if(res){
                dispatch(handleOpenModalRedux("Portal"));
            }
        }
    };


    const handleCloseDocumentCreateTask = (event, rowData) => {
        if (rowData) {
            // console.log("row selected data", rowData)
            event.stopPropagation();
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            Json_GetItemBase64DataById(rowData.data, "CRM"); 
        }
    };

    const handleCloseDocumentDownload = (event, rowData) => {
        if (rowData) {
            console.log("row selected data", rowData)
            event.stopPropagation();
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            downloadFile(rowData.data)
        }
    };

    function downloadFile(item) {

        try {
            let obj = {};
            obj.ItemId = item["Registration No."]
            console.log("handle change fileData1", obj)

            Cls.Json_GetItemBase64DataById(obj, function (sts, base64data) {
                if (sts) {
                    if (base64data !== "No Data Exist") {
                        let ankr = document.createElement("a");
                        ankr.href = `data:application/octet-stream;base64,${base64data}`;
                        ankr.download = item.Path;
                        ankr.click();
                    }
                    else {
                        toast.error(item.Description + "was not uploaded as it had no data")
                    }

                }

            })
        } catch (error) {
            console.log("Json_GetItemBase64DataById error", error)
        }



    }

    const handleCloseDocumentOpenDocumentBrowers = (event, rowData) => {
        if (rowData) {
            event.stopPropagation();
            let selectedDocument = rowData.data;
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            var IsApproved = selectedDocument["IsApproved"];
            var PortalDocId = selectedDocument["PortalDocId"];
            let IsApp = "";
            let PortalID = "";
            if (IsApproved === "SIG" && PortalDocId !== "") {
                IsApp = IsApproved;
                PortalID = PortalDocId;
            }
            let ViwerUrl = `https://mydocusoft.com/ViewerNew.aspx?AgreementNo=${localStorage.getItem("agrno")}&ItemId=${selectedDocument["Registration No."]}&ext=${selectedDocument.Type}&ViewerToken=${localStorage.getItem("ViewerToken")}&IsApp=${IsApp}&PortalID=${PortalID}`;
            window.open(ViwerUrl)


        }
    };

    


    return (
        <>
            <Box>
                {/* {openModals && openModals && <CreateNewModalTask                              
                               TaskType={TaskType}
                               createNewFileObj={createNewFileObj}
                               txtClientData={txtClientData}
                               txtSectionData={txtSectionData}
                               txtFolderData={txtFolderData}
                               openModal={openModals}
                               setOpenModal={setopenModal}
                           ></CreateNewModalTask>} */}

                <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal}></TaskDetailModal>

                <DocumentsVewModal isLoadingDoc={isLoadingDoc} setIsLoadingDoc={setIsLoadingDoc} openPDFView={openPDFView} setOpenPDFView={setOpenPDFView} selectedDocument={selectedDocument} Json_CRM_GetOutlookTask={Json_CRM_GetOutlookTask}></DocumentsVewModal>
                {/* <Box className='d-flex mb-3 mt-2'>
                    {/* <FormControlLabel control={<Checkbox />} className="p-0 m-0 ms-2 ps-1" size="small"/> 

                    <Checkbox {...label} defaultChecked size="small" />

                    <Button className="btn-blue-2 ms-2 py-1" size="small" variant="outlined"> Delete</Button>

                </Box> */}

                {dataNotFoundBoolean ? <DataNotFound /> : <DataGrid
                    dataSource={advFilteredResult.length > 0 ? advFilteredResult : documents}
                    keyExpr="Guid"
                    allowColumnReordering={true}
                    rowAlternationEnabled={true}
                    showBorders={true}
                    width="100%"
                    wordWrapEnabled={true}
                    className="table-view-files"
                >
                    <Grouping autoExpandAll={false} />
                    <GroupPanel visible={true} />
                    <Sorting mode="single" />
                    <Scrolling mode="virtual" />
                    <Selection mode="multiple" />
                    {selectedGroup === "Type" && <Column dataField="Type" groupIndex={0} dataType="Type" width={75} />}
                    {selectedGroup === "Comments" && <Column dataField="Comments" groupIndex={0} dataType="Comments" width={75} visible={false} />}
                    {selectedGroup === "Description" && <Column dataField="Description" groupIndex={0} dataType="Description" width={75} visible={false} />}
                    {selectedGroup === "CommentBy" && <Column dataField="CommentBy" groupIndex={0} dataType="CommentBy" width={75} visible={false} />}
                    <Column
                        dataField="Description"
                        caption="Description"

                        // Set the groupIndex to 0 to enable grouping by this column
                        dataType="string"  // Set the data type to "string" for proper grouping
                        cellRender={(data) => {
                            return <Box className="file-uploads">
                                <label className="file-uploads-label file-uploads-document" onClick={(event) => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    handleCloseDocument(event, data);
                                }} onDoubleClick={(event) => {
                                    handleClickOpenPDFView(event, data.data);
                                    handleCloseDocument(event, data);
                                }}>
                                    <Box className="d-flex align-items-center">

                                        {/* <Checkbox {...label} onClick={(event)=>event.stopPropagation()} className="hover-checkbox p-0 ms-0" size="small" />  */}

                                        <DescriptionIcon
                                            sx={{
                                                fontSize: 32,
                                            }}
                                            className='me-2 ms-0'
                                        />
                                        <Box className="upload-content pe-3">
                                            {editingIndex===data.key?<input
                                            type="text"
                                            defaultValue={data.data.Description}
                                            value={updatedSubject}
                                            onChange={handleEditChange}
                                            autoFocus
                                            onBlur={(e)=>handleSave(e.target.value, data.data.Description, data.data, data.key)}
                                            className='edit-input'
                                        />:<Typography variant="h4" >
                                                {test[data.key] ? test[data.key] : data.data.Description ? data.data.Description : "Demo"}
                                            </Typography>}
                                            <Typography variant="body1">
                                                {/* Size:  <span className='sembold'>{data.data["FileSize"] ? data.data["FileSize"] : ""}</span>  */}
                                                Date <span className='sembold'>{data.data["Item Date"] ? data.data["Item Date"] : ""}</span> |
                                                Uploaded by <span className='sembold'>Patrick</span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Button
                                            id={`basic-button-${data.key}`}
                                            aria-controls={anchorElDocumentList[data.key] ? `basic-menu-${data.key}` : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={Boolean(anchorElDocumentList[data.key])}
                                            onClick={(event) => {
                                                handleClickDocumentList(event, data)
                                            }}
                                            className='min-width-auto'
                                        >
                                            <MoreVertIcon />
                                        </Button>
                                        <Menu
                                            id={`basic-menu-${data.key}`}
                                            anchorEl={anchorElDocumentList[data.key]}
                                            open={Boolean(anchorElDocumentList[data.key])}
                                            onClose={(event) => handleCloseDocument(event, data)}
                                            MenuListProps={{
                                                'aria-labelledby': `basic-button-${data.key}`,
                                            }}
                                            className='custom-dropdown'
                                        >
                                            <MenuItem
                                                onClick={(event) => handleCloseDocumentCreateTask(event, data)}
                                            >
                                                <ListItemIcon>
                                                    <CloudUploadIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Create Task</MenuItem>
                                            <MenuItem
                                                onClick={(event) => handleCloseDocumentPublish(event, data)}
                                            >
                                                <ListItemIcon>
                                                    <CloudUploadIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Publish
                                            </MenuItem>

                                            <MenuItem onClick={(event) => {
                                                handleCloseDocument(event, data)
                                                handleClickOpenDocumentDetailsList(event, data.data)
                                            }}>
                                                <ListItemIcon>
                                                    <ArticleIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Document Details</MenuItem>

                                            <MenuItem
                                                onClick={(event) => handleCloseDocument(event, data)}
                                            >
                                                <ListItemIcon>
                                                    <CloudUploadIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Upload New Version</MenuItem>
                                            <MenuItem
                                                onClick={(event) => {
                                                    // handleEditField(event, data.key);
                                                    handleEdit(data.key,data.data);
                                                    handleCloseDocument(event, data);
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <DriveFileRenameOutlineIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Rename Document</MenuItem>
                                            <MenuItem
                                                onClick={(event) => handleCloseDocumentOpenDocumentBrowers(event, data)}
                                            >
                                                <ListItemIcon>
                                                    <TravelExploreIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Open in Browser</MenuItem>
                                            <MenuItem
                                                onClick={(event) => handleCloseDocumentDownload(event, data)}
                                            >
                                                <ListItemIcon>
                                                    <CloudDownloadIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Download</MenuItem>
                                        </Menu>
                                    </Box>
                                </label>
                            </Box>
                        }}
                    />
                </DataGrid>}
            </Box >

            {/* document modal list details */}
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
                                                    <TableCell className='bold' align="right">Details</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Object.keys(docForDetails).length > 0 && Object.keys(docForDetails).map((itm, i) => {
                                                    if ( [ "Registration No.", "Folder", "Client", "Section", "Received Date", "Item Date", "FileSize", "Notes", "Category", "Attach", "Type", "Version", "Received By", "Item ID" ].includes(itm) ) {
                                                        return <TableRow
                                                            key={i}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="left" className='bold'>{itm}</TableCell>
                                                            <TableCell align="left">{docForDetails[itm] !== "" && docForDetails[itm] !== undefined && docForDetails[itm] !== null && docForDetails[itm] !== "undefined" ? docForDetails[itm] : ""}</TableCell>
                                                        </TableRow>
                                                    }
                                                })}
                                                {/* {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="left" className='bold'>{row.document}</TableCell>
                                                        <TableCell align="left">{row.details}</TableCell>
                                                    </TableRow>
                                                ))} */}
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
                                    {getVertion.length>0 ? getVertion.map((item,index) => {
                                            return <>
                                            <Box className="file-uploads" key={index}>
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
                                        }):""}
                                  

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
                                                <Link key={i} href="#" onClick={(e) => Json_CRM_GetOutlookTask(e, itm)} className="text-decoration-none d-inline-flex align-content-center me-3 mb-3 flex"><RadioButtonUncheckedIcon className="me-1" />{itm.Subject}</Link>
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

                                    <Activity getAudit={getAudit} selectedDocument={docForDetails} ></Activity>


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

export default DocumentDetails