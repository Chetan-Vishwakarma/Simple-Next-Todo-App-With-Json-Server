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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// sadik code end
const agrno = localStorage.getItem("agrno");
const Email = localStorage.getItem("Email");
const password = localStorage.getItem("Password");
const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
const baseUrlDocuSms = "https://docusms.uk/dsdesktopwebservice.asmx/";

function DocumentDetails({ documents, advFilteredResult, dataNotFoundBoolean, selectedGroup }) {

    const Cls = new CommanCLS(baseUrl, agrno, Email, password);
    const ClsDocuSms = new CommanCLS(baseUrlDocuSms, agrno, Email, password);

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
        event.preventDefault();
        event.stopPropagation();
        setSelectedDocument(data);
        setOpenPDFView(true);
        setIsLoadingDoc(true);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
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
            Cls.Json_CRM_GetOutlookTask(obj, (sts, data) => {
                const res = JSON.parse(data);
                if (res.Table) {
                    const fltTask = res.Table.filter(itm => itm.ID === sTask.Taskid);
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
                    setSelectedTask(formattedTasks[0]);
                    handleClickDetailOpen(formattedTasks[0]);
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
                        setGetAudit(table);
                    }
                    console.log("Json_GetAudit", table)
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

    };
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
    const [createNewFileObj, setCreateNewFileObj] = useState([]);

    const [TaskType, setTaskType] = useState("");
    const [txtClientData, setTxtClientData] = useState({});
    const [txtSectionData, setTxtSectionData] = useState({});
    const [txtFolderData, setTxtFolderData] = useState({});
    const [openModals,setopenModal]=useState(false);

    useEffect(()=>{
        setopenModal(false)
    },[])
    function Json_GetItemBase64DataById(item) {
        try {
            let filesData = [];
            let obj = {};
            obj.ItemId = item["Registration No."]
            console.log("handle change fileData1", obj)

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
                        setCreateNewFileObj(filesData);

                        setTxtClientData({ Client: item.Client, ClientID: item.SenderId })
                        setTxtSectionData({ Sec: item.Section, SecID: item.PostItemTypeID })
                        setTxtFolderData({ Folder: item.Folder, FolderID: item.ProjectId })

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
            setopenModal(true);
            setTaskType("Portal")
            console.log("row selected data", rowData)
            event.stopPropagation();
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            Json_GetItemBase64DataById(rowData.data)
        }
    };


    const handleCloseDocumentCreateTask = (event, rowData) => {
        if (rowData) {
            setopenModal(true);
            setTaskType("CRM")
           // console.log("row selected data", rowData)
            event.stopPropagation();
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            Json_GetItemBase64DataById(rowData.data)
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

    function downloadFile(item){

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
             let selectedDocument=rowData.data;
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
            {openModals && openModals && <CreateNewModalTask                              
                               TaskType={TaskType}
                               createNewFileObj={createNewFileObj}
                               txtClientData={txtClientData}
                               txtSectionData={txtSectionData}
                               txtFolderData={txtFolderData}
                               openModal={openModals}
                               setOpenModal={setopenModal}
                           ></CreateNewModalTask>}

                <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal}></TaskDetailModal>

                <DocumentsVewModal isLoadingDoc={isLoadingDoc} setIsLoadingDoc={setIsLoadingDoc} openPDFView={openPDFView} setOpenPDFView={setOpenPDFView} selectedDocument={selectedDocument}></DocumentsVewModal>
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
                                <label className="file-uploads-label file-uploads-document" onDoubleClick={(event) => handleClickOpenPDFView(event, data.data)}>
                                    <Box className="d-flex align-items-center">

                                        {/* <Checkbox {...label} onClick={(event)=>event.stopPropagation()} className="hover-checkbox p-0 ms-0" size="small" />  */}

                                        <DescriptionIcon
                                            sx={{
                                                fontSize: 32,
                                            }}
                                            className='me-2 ms-0'
                                        />
                                        <Box className="upload-content pe-3">
                                            <Typography variant="h4" >
                                                {data.data.Description ? data.data.Description : "Demo"}
                                            </Typography>
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
                                            onClick={(event) => handleClickDocumentList(event, data)}
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
                                                Publish</MenuItem>

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
                                                onClick={(event) => handleCloseDocument(event, data)}
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


                {/* {!isGroupBy&&advFilteredResult.length>0 ? (advFilteredResult.map((item) => {
                    return <>
                        <Box className="file-uploads">
                            <label className="file-uploads-label file-uploads-document" onClick={() => handleClickOpenPDFView(item)}>
                                <Box className="d-flex align-items-center">

                                    <Checkbox {...label} onClick={(event)=>event.stopPropagation()} className="hover-checkbox p-0 ms-0" size="small" />

                                    <DescriptionIcon
                                        sx={{
                                            fontSize: 32,
                                        }}
                                        className='me-2 ms-0'
                                    />
                                    <Box className="upload-content pe-3">
                                        <Typography variant="h4" >
                                        {item.Description ? item.Description : "Demo"}
                                        </Typography>
                                        <Typography variant="body1">
                                            Size:  <span className='sembold'>{item["FileSize"] ? item["FileSize"] : ""}</span> | Date <span className='sembold'>{item["Item Date"] ? item["Item Date"] : ""}</span>
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button
                                        id="basic-button"
                                        aria-controls={DocumentList ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={DocumentList ? 'true' : undefined}
                                        onClick={handleClickDocumentList}
                                        className='min-width-auto'
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    {/* <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElDocumentList}
                                        open={DocumentList}
                                        onClose={handleCloseDocument}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={() => {
                                            handleCloseDocument()
                                            handleClickOpenDocumentDetailsList()
                                        }}>
                                            <ListItemIcon>
                                                <ArticleIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Document Details</MenuItem>

                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Upload New Version</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Rename Document</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <TravelExploreIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Open in Browser</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudDownloadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Download</MenuItem>
                                    </Menu> }
                                </Box>
                            </label>
                        </Box>
                        {/* file upload end }
                    </>
                })):isGroupBy?(
                    <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                >
                    {Object.entries(groupByFilterResult).length>0 && Object.keys(groupByFilterResult).map((key)=>{
                        return <TreeItem key={key} nodeId={key} label={key!==""?key:"Demo"}>
                        {groupByFilterResult[key].map((item, index) => (
                        //   <TreeItem key={index} nodeId={`${key}-${index}`} label={item["Description"]}>
                            <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">

                                                <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" />

                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2 ms-0'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        {item["Description"]!=="" ? item["Description"]: "Demo"}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Size:  <span className='sembold'>{item["FileSize"]!==""?item["FileSize"]:""}</span> | Date <span className='sembold'>{item["Item Date"]!==""?item["Item Date"]:""}</span>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={DocumentList ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={DocumentList ? 'true' : undefined}
                                                    onClick={handleClickDocumentList}
                                                    className='min-width-auto'
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorElDocumentList}
                                                    open={DocumentList}
                                                    onClose={handleCloseDocument}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                    className='custom-dropdown'
                                                >
                                                    <MenuItem onClick={() => {
                                                        handleCloseDocument()
                                                        handleClickOpenDocumentDetailsList()
                                                    }}>
                                                        <ListItemIcon>
                                                            <ArticleIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Document Details</MenuItem>

                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudUploadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Upload New Version</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <DriveFileRenameOutlineIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Rename Document</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <TravelExploreIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Open in Browser</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudDownloadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Download</MenuItem>
                                                </Menu>
                                            </Box>
                                        </label>
                                    </Box>
                        //   </TreeItem>
                        ))}
                      </TreeItem>
                    })}
                    {/* <TreeItem nodeId="1" label="Applications">
                        <TreeItem nodeId="2" label="CLient Group A" />
                        <TreeItem nodeId="3" label="CLient Group B" />
                        <TreeItem nodeId="4" label="CLient Group C" />
                    </TreeItem> */}

                {/* <TreeItem nodeId="5" label="Documents">
                        <TreeItem nodeId="6" label="CLient Group">

                            {Array(4).fill("").map(() => {
                                return <>
                                    <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">

                                                <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" />

                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2 ms-0'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        thisisTest.pdf iu
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={DocumentList ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={DocumentList ? 'true' : undefined}
                                                    onClick={handleClickDocumentList}
                                                    className='min-width-auto'
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorElDocumentList}
                                                    open={DocumentList}
                                                    onClose={handleCloseDocument}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                    className='custom-dropdown'
                                                >
                                                    <MenuItem onClick={() => {
                                                        handleCloseDocument()
                                                        handleClickOpenDocumentDetailsList()
                                                    }}>
                                                        <ListItemIcon>
                                                            <ArticleIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Document Details</MenuItem>

                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudUploadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Upload New Version</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <DriveFileRenameOutlineIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Rename Document</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <TravelExploreIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Open in Browser</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudDownloadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Download</MenuItem>
                                                </Menu>
                                            </Box>
                                        </label>
                                    </Box>
                                    {/* file upload end 
                                </>
                            })}

                        </TreeItem>
                    </TreeItem> }
                </TreeView> 
                ):(documents.length>0 && documents.map((item) => {
                    return <>
                        <Box className="file-uploads">
                            <label className="file-uploads-label file-uploads-document" onClick={() => handleClickOpenPDFView(item)}>
                                <Box className="d-flex align-items-center">

                                    <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" />

                                    <DescriptionIcon
                                        sx={{
                                            fontSize: 32,
                                        }}
                                        className='me-2 ms-0'
                                    />
                                    <Box className="upload-content pe-3">
                                        <Typography variant="h4" >
                                        {item.Description ? item.Description : "Demo"}
                                        </Typography>
                                        <Typography variant="body1">
                                            Size:  <span className='sembold'>{item["FileSize"] ? item["FileSize"] : ""}</span> | Date <span className='sembold'>{item["Item Date"] ? item["Item Date"] : "Demo"}</span>
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button
                                        id="basic-button"
                                        aria-controls={DocumentList ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={DocumentList ? 'true' : undefined}
                                        onClick={handleClickDocumentList}
                                        className='min-width-auto'
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElDocumentList}
                                        open={DocumentList}
                                        onClose={handleCloseDocument}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={() => {
                                            handleCloseDocument()
                                            handleClickOpenDocumentDetailsList()
                                        }}>
                                            <ListItemIcon>
                                                <ArticleIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Document Details</MenuItem>

                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Upload New Version</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Rename Document</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <TravelExploreIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Open in Browser</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudDownloadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Download</MenuItem>
                                    </Menu>
                                </Box>
                            </label>
                        </Box>
                        {/* file upload end }
                    </>
                }))} */}






                {/* loop end */}


                {/* when data is grouped by */}
                {/* <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                >
                    <TreeItem nodeId="1" label="Applications">
                        <TreeItem nodeId="2" label="CLient Group A" />
                        <TreeItem nodeId="3" label="CLient Group B" />
                        <TreeItem nodeId="4" label="CLient Group C" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                        <TreeItem nodeId="6" label="CLient Group">

                            {Array(4).fill("").map(() => {
                                return <>
                                    <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">

                                                <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" />

                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2 ms-0'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        thisisTest.pdf iu
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={DocumentList ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={DocumentList ? 'true' : undefined}
                                                    onClick={handleClickDocumentList}
                                                    className='min-width-auto'
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorElDocumentList}
                                                    open={DocumentList}
                                                    onClose={handleCloseDocument}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                    className='custom-dropdown'
                                                >
                                                    <MenuItem onClick={() => {
                                                        handleCloseDocument()
                                                        handleClickOpenDocumentDetailsList()
                                                    }}>
                                                        <ListItemIcon>
                                                            <ArticleIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Document Details</MenuItem>

                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudUploadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Upload New Version</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <DriveFileRenameOutlineIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Rename Document</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <TravelExploreIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Open in Browser</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudDownloadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Download</MenuItem>
                                                </Menu>
                                            </Box>
                                        </label>
                                    </Box>
                                    {/* file upload end 
                                </>
                            })}

                        </TreeItem>
                    </TreeItem>
                </TreeView> */}
            </Box >



            {/* sadik new modal start  */}
            {/* // document list modal */}

            <Dialog
                open={documentLis}
                onClose={handleCloseDocumentList}
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
                        <Typography variant="h4" className='font-18 bold mb-2 text-black'>
                            Document List
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
                    <Button onClick={handleCloseDocumentList} autoFocus sx={{ minWidth: 30 }}>
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




                        {Array(5).fill("").map(() => {
                            return <>
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
                                                    thisisTest.pdf
                                                </Typography>
                                                <Typography variant="body1">
                                                    Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Button
                                                id="basic-button"
                                                aria-controls={DocumentList ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={DocumentList ? 'true' : undefined}
                                                onClick={handleClickDocumentList}
                                                className='min-width-auto'
                                            >
                                                <MoreVertIcon />
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorElDocumentList}
                                                open={DocumentList}
                                                onClose={handleCloseDocument}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                                className='custom-dropdown'
                                            >
                                                <MenuItem onClick={() => {
                                                    handleCloseDocument()
                                                    handleClickOpenDocumentDetailsList()
                                                }}>
                                                    <ListItemIcon>
                                                        <ArticleIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Document Details</MenuItem>

                                                <MenuItem onClick={handleCloseDocument}>
                                                    <ListItemIcon>
                                                        <CloudUploadIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Upload New Version</MenuItem>
                                                <MenuItem onClick={handleCloseDocument}>
                                                    <ListItemIcon>
                                                        <DriveFileRenameOutlineIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Rename Document</MenuItem>
                                                <MenuItem onClick={handleCloseDocument}>
                                                    <ListItemIcon>
                                                        <TravelExploreIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Open in Browser</MenuItem>
                                                <MenuItem onClick={handleCloseDocument}>
                                                    <ListItemIcon>
                                                        <CloudDownloadIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Download</MenuItem>
                                            </Menu>
                                        </Box>
                                    </label>
                                </Box>
                                {/* file upload end */}
                            </>
                        })}

                    </DialogContentText>
                </DialogContent>
            </Dialog>


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
                                                    if (itm !== "StickyNotes") {
                                                        return <TableRow
                                                            key={i}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="left" className='bold'>{itm}</TableCell>
                                                            <TableCell align="left">{docForDetails[itm] !== "" && docForDetails[itm] !== undefined && docForDetails[itm] !== null && docForDetails[itm] !== "undefined" ? ["Received Date"].includes(itm) ? startFormattingDate(docForDetails[itm]) : docForDetails[itm] : ""}</TableCell>
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

                                    <Activity getAudit={getAudit}></Activity>


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