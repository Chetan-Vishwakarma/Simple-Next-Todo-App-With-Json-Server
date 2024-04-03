import React, { useState, useEffect, useRef } from 'react';
import user from "../images/user.jpg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CommanCLS from '../services/CommanService';
import TaskDetailModal from './TaskDetailModal';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Link, Chip, Stack, ListItemIcon, Radio, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, Checkbox } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArticleIcon from '@mui/icons-material/Article';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import PushPinIcon from '@mui/icons-material/PushPin';
import EventNoteIcon from '@mui/icons-material/EventNote';
import moment from 'moment';
import DocumentsVewModal from '../client/utils/DocumentsVewModal';
import { toast } from 'react-toastify';
import DocDetails from './DocDetails';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const userId = localStorage.getItem("UserId");

function NewTodoList() {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));

    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    const baseUrlPortal = "https://sharepoint.docusoftweb.com/dsdesktopwebservice.asmx/";
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

    let ClsSms = new CommanCLS(baseUrl, agrno, Email, password);
    let Cls = new CommanCLS(baseUrlPractice, agrno, Email, password);
    let ClsPortal = new CommanCLS(baseUrlPortal, agrno, Email, password);
    //let Clsp = new CommanCLS(baseUrlPractice, agrno, Email, password);

    const [allTask, setAllTask] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});
    const [recentTaskList, setRecentTaskList] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userName, setUserName] = React.useState(null);
    const [recentDocument, setRecentDocument] = React.useState([]);

    const [expanded, setExpanded] = React.useState('panel1');

    const [activeSectionList, setActiveSectionList] = useState({
        section1: true,
        section2: false,
        section3: false,
        section4: false,
    });


    const [loadMore, setLoadMore] = useState(9);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const Json_Get_CRM_UserByProjectId = () => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            ProjectId: folderId
        };
        ClsSms.Json_Get_CRM_UserByProjectId(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    console.log("Json_Get_CRM_UserByProjectId", json.Table);
                    json.Table.map((item) => {
                        if (item.loggedInUser === "True") {
                            setUserName(item.DisplayName);
                        }
                    });
                }
            }
        });
    }

    const Json_CRM_GetOutlookTask = () => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password
        };
        try {
            Cls.Json_CRM_GetOutlookTask_ForTask((sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);

                        const formattedTasks = json.Table.map((task) => {
                            let timestamp;
                            if (task.EndDateTime) {
                                timestamp = parseInt(task.EndDateTime.slice(6, -2));
                            }

                            const date = new Date(timestamp);

                            return { ...task, EndDateTime: date };
                        });

                        // Sorting by EndDateTime
                        formattedTasks.sort((a, b) => b.EndDateTime - a.EndDateTime);

                        const filtredTask = formattedTasks.filter(itm=>itm.AssignedToID.split(",").includes(userId) && itm.mstatus!=="Completed" && ["Portal","CRM"].includes(itm.Source));
                        
                        // console.log("Json_CRM_GetOutlookTask", filtredTask);
                        setAllTask(filtredTask);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_CRM_GetOutlookTask", err);
        }
    }



    const Json_getRecentTaskList = () => {

        try {
            ClsPortal.Json_getRecentTaskList((sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_getRecentTaskList", json);
                        let tbl = json.Table;
                        if (tbl.length > 0) {

                            setRecentTaskList(tbl)
                        }
                        // const formattedTasks = json.Table.map((task) => {
                        //     let timestamp;
                        //     if (task.EndDateTime) {
                        //         timestamp = parseInt(task.EndDateTime.slice(6, -2));
                        //     }

                        //     const date = new Date(timestamp);

                        //     return { ...task, EndDateTime: date };
                        // });

                        //setAllTask(formattedTasks.sort((a, b) => a.EndDateTime - b.EndDateTime));
                        // setAllTask(json.Table);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_CRM_GetOutlookTask", err);
        }
    }

    const [isApi, setIsApi] = useState(false);


    const Json_ExplorerSearchDoc = () => {
        try {
            let obj = {};
            obj.ProjectId = folderId;
            obj.ClientId = "";
            obj.sectionId = "-1";
            Cls.Json_ExplorerSearchDoc(obj, function (sts, data) {
                if (sts && data) {
                    //console.log("ExplorerSearchDoc", JSON.parse(data));
                    let json = JSON.parse(data);
                    if (json?.Table6?.length > 0) {

                        // let docs = json.Table6.length >= 100 ? json.Table6.slice(0, 80) : json.Table6;
                        let docs = json.Table6;

                        if (docs?.length > 0) {
                            console.log("ExplorerSearchDoc", docs);
                            Json_getRecentDocumentList(docs)
                        }
                    }
                }
            })
        } catch (error) {
            console.log("ExplorerSearchDoc", error)
        }
    }

    const Json_getRecentDocumentList = (exData = []) => {

        try {
            ClsPortal.Json_getRecentDocumentList((sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        let tbl = json.Table;

                        const itemIdSet = new Set(tbl.map(item => item.ItemId));
                        console.log("Json_getRecentDocumentList", itemIdSet);

                        if (exData.length > 0) {
                            const filteredArray2 = exData.filter(item => itemIdSet.has(item["Registration No."]));
                            console.log("Json_getRecentDocumentList1", filteredArray2);
                            if (filteredArray2.length > 0) {
                                setRecentDocument(filteredArray2);
                            }

                        }


                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_getRecentDocumentList", err);
        }
    }



    const handleLoadMore = () => {
        // Increase the number of items to display by, for example, 5 when the button is clicked
        setLoadMore(prevLoadMore => prevLoadMore + 9);
    };
    const handleLoadMoreRecentTask = () => {
        // Increase the number of items to display by, for example, 5 when the button is clicked
        setLoadMore(prevLoadMore => prevLoadMore + 9);
    };

    useEffect(() => {
        Json_getRecentDocumentList();
        Json_ExplorerSearchDoc();
        Json_Get_CRM_UserByProjectId();
        Json_CRM_GetOutlookTask();
        Json_getRecentTaskList();


    }, [isApi])



    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        Json_CRM_GetOutlookTask();
    }, []);

    function startFormattingDate(dt) {
        //const timestamp = parseInt(/\d+/.exec(dt));
        const date = new Date(dt);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        return formattedDate === "Invalid Date" ? " " : formattedDate;
    }

    // modal
    const [openModal, setOpen] = React.useState(false);

    const handleClickOpen = (task = selectedTask) => {
        setSelectedTask(task);
        setOpen(true);
    };



    function returnMessageStatus(status) {
        if (status === "Completed") {
            return "Task Completed!";
        } else {
            return `Task status set to ${status}.`;
        }
    }
    const MarkComplete = (e) => {
        console.log("MarkComplete", e)
        Cls.ConfirmMessage("Are you sure you want to complete task", function (res) {
            if (res) {
                Json_UpdateTaskField("Status", "Completed", e);
            }
        })
    }
    function Json_UpdateTaskField(FieldName, FieldValue, e) {
        let o = {
            agrno: agrno,
            strEmail: Email,
            password: password,
            TaskId: e.ID,
            FieldName: FieldName,
            FieldValue: FieldValue
        }

        ClsSms.Json_UpdateTaskField(o, function (sts, data) {
            if (sts && data) {
                if (data === "Success") {
                    toast.success("Completed")
                    Json_AddSupplierActivity(e);
                }
                console.log("Json_UpdateTaskField", data)
            }
        })
    }

    const Json_AddSupplierActivity = (e) => {
        let obj = {};
        obj.OriginatorNo = e.ClientNo;
        obj.ActionReminder = "";
        obj.Notes = "Completed by " + e["Forwarded By"];
        obj.Status = "sys"; //selectedTask.Status;
        obj.TaskId = e.ID;
        obj.TaskName = "";
        obj.ActivityLevelID = "";
        obj.ItemId = "";

        try {
            ClsSms.Json_AddSupplierActivity(obj, function (sts, data) {
                if (sts && data) {
                    console.log({ status: true, messages: "Success", res: data });
                    Json_CRM_GetOutlookTask()
                }
            });
        } catch (error) {
            console.log({ status: false, messages: "Faild Please Try again" });
        }
    };

    // details dropdown
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState(null);
    // const DocumentList = Boolean(anchorElDocumentList);
    // const handleClickDocumentList = (event) => {
    //     console.log(event.currentTarget);
    //     event.stopPropagation();
    //     setAnchorElDocumentList(event.currentTarget);
    // };

    // const handleCloseDocument = () => {
    //     setAnchorElDocumentList(null);
    // };


    const [openMenus, setOpenMenus] = React.useState({});

    const handleClickDocumentList = (event, index) => {
        setOpenMenus(prevState => ({
            ...prevState,
            [index]: event.currentTarget
        }));
    };

    const handleCloseDocument = (index) => {
        setOpenMenus(prevState => ({
            ...prevState,
            [index]: null
        }));
    };


    const handleDowloadDocument = (e,index) => {
        handleCloseDocument(index);
        // setAnchorElDocumentList(null);
        console.log("document object", e);
        let o = { ItemId: e["Registration No."] };
        ClsSms.Json_GetItemBase64DataById(o, function (sts, data) {
            if (sts && data) {
                // console.log("Json_GetItemBase64DataById",data)
                let ankr = document.createElement("a");
                ankr.href = `data:application/octet-stream;base64,${data}`;
                ankr.download = e.Path;
                ankr.click();
            }
        })
    };

    const handleOpenBrower = (e,index) => {
        handleCloseDocument(index);
        //setAnchorElDocumentList(null);
        console.log("document object", e);
        var IsApproved = e["IsApproved"];
        var PortalDocId = e["PortalDocId"];
        let IsApp = "";
        let PortalID = "";

        if (IsApproved === "SIG" && PortalDocId !== "") {
            IsApp = IsApproved;
            PortalID = PortalDocId;
        }

        let url = `https://mydocusoft.com/ViewerNew.aspx?AgreementNo=${localStorage.getItem("agrno")}&ItemId=${e["Registration No."]}&ext=${e.Type}&ViewerToken=${localStorage.getItem("ViewerToken")}&IsApp=${IsApp}&PortalID=${PortalID}`;
        window.open(url);
    };

    const [selectedDocument, setSelectedDocument] = React.useState(null);
    const [openPDFView, setOpenPDFView] = React.useState(false);

    const ViewerDocument = (e) => {
        setAnchorElDocumentList(null);
        console.log("document object", e);
        setSelectedDocument(e);
        setOpenPDFView(true);
        //    let url =`https://mydocusoft.com/viewer.html?GuidG=${e.Guid}&srtAgreement=${agrno}&strItemId=1002909&filetype=txt&ViewerToken=${localStorage.getItem("ViewerToken")}&IsApp=&PortalID=`;
        // window.open(url);

    };




    // Document details List
    const [openDocumentDetailsList, setOpenDocumentDetailsList] = React.useState(false);
    const [docForDetails, setDocForDetails] = useState({});
    const handleClickOpenDocumentDetailsList = (sDoc) => {
        setDocForDetails(sDoc);
        setExpanded("panel1");
        setOpenDocumentDetailsList(true);
    };
    const handleCloseDocumentDetailsList = () => {
        setOpenDocumentDetailsList(false);
    };

    function startFormattingDate(dt) {
        //const timestamp = parseInt(/\d+/.exec(dt));
        const date = new Date(dt);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        return formattedDate === "Invalid Date" ? " " : formattedDate;
    }

    const handleActiveTab = (target) => {
        for (let key in activeSectionList) {
            if (key === target) {
                activeSectionList[key] = true;
            } else {
                activeSectionList[key] = false;
            }
        }
    }

    

    return (
        <Box className="container-fluid p-0">
            <DocumentsVewModal openPDFView={openPDFView} setOpenPDFView={setOpenPDFView} selectedDocument={selectedDocument}></DocumentsVewModal>
            <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal}></TaskDetailModal>

            <DocDetails expanded={expanded} setExpanded={setExpanded} ClsSms={ClsSms} docForDetails={docForDetails} openDocumentDetailsList={openDocumentDetailsList} setOpenDocumentDetailsList={setOpenDocumentDetailsList }/>

            <Box className='d-flex flex-wrap align-items-end justify-content-end'>
                {/* <Box className='clearfix'>
                    <Typography variant='subtitle1' className='font-18 bold mb-2'>Select Filter</Typography>
                    <Box className="d-flex align-items-center mb-4 flex-wrap">
                        <Box className="user-img-list me-2">
                            <img src={user} />
                        </Box>
                        <Box className="user-img-list me-2">
                            <p>PJ</p>
                        </Box>
                        <Box className="user-img-list me-2">
                            <img src={user} />
                        </Box>
                        <Box className="user-img-list me-2">
                            <p>AP</p>
                        </Box>
                    </Box>
                </Box> */}

                {/* <Box className='mb-3'>
                    <Button variant="text" className='btn-blue-2 mb-2 ms-2'>Task Due Soon</Button>
                    <Button variant="text" className='btn-blue-2 mb-2 ms-2'>Recently Updated</Button>
                    <Button variant="text" className='btn-blue-2 mb-2 ms-2'>Pinned Task</Button>
                    <Button variant="text" className='btn-blue-2 mb-2 ms-2'>Recently Accessed Documents</Button>
                </Box> */}
            </Box>


            {/*  */}
            <Box className='no-touch'>
                <nav class="cd-vertical-nav">
                    <ul>
                        <li onClick={() => handleActiveTab("section1")}><a href="#section1" class={activeSectionList.section1 ? "active" : ""}><span class="label">Task Due <br />Soon</span>
                            <EventNoteIcon className='hover-icon' />
                        </a></li>
                        <li onClick={() => handleActiveTab("section2")}><a href="#section2" class={activeSectionList.section2 ? "active" : ""}><span class="label">Recently Updated</span><EventNoteIcon className='hover-icon' /></a></li>
                        <li onClick={() => handleActiveTab("section3")}><a href="#section3" class={activeSectionList.section3 ? "active" : ""}><span class="label">Pinned<br />Task</span><EventNoteIcon className='hover-icon' /></a></li>
                        <li onClick={() => handleActiveTab("section4")}><a href="#section4" class={activeSectionList.section4 ? "active" : ""}><span class="label">Recently Accessed Documents</span><EventNoteIcon className='hover-icon' /></a></li>
                    </ul>
                </nav>
            </Box>
            {/*  */}

            <Box className='pe-5' id="section1">

                <Typography variant='subtitle1' className='font-20 bold mb-0'>Welcome {userName}</Typography>
                <Typography variant='subtitle1' className='font-16 bold mb-2'>The following tasks are due soon:</Typography>

                <Box className='row'>
                    {/* {
                        allTask.length > 0 &&
                        allTask.slice(0, loadMore).map((item, index) => {
                            return <Box key={index} className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                                <Box className='todo-list-box white-box relative w-100' onClick={() => handleClickOpen(item)}>

                                    <Radio className={item.Priority === 1 ? 'text-red check-todo' : item.Priority === 2 ? 'text-green check-todo' : 'text-grey check-todo'} checked
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "secondary",
                                            },
                                        }}
                                    />

                                    <Typography variant='subtitle1 mb-3 d-block'><strong>Type:</strong> {item.Source}</Typography>

                                    <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>

                                    <Box className='d-flex align-items-center justify-content-between'>
                                        <Typography variant='subtitle1'><pan className='text-gray'>
                                            {item.UserName} <ArrowForwardIosIcon className='font-14' /> </pan>
                                            <a href='#'>{item["Forwarded By"]}</a> <a href='#'> +1</a></Typography>
                                        <Typography variant='subtitle1 sembold'>{startFormattingDate(item["EndDateTime"])}</Typography>
                                    </Box>

                                    <Box className='d-flex align-items-center justify-content-between'>
                                        <Typography variant='subtitle1'>{item.Client}</Typography>
                                        <Typography variant='subtitle1'>

                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                >
                                                    {item.Status && item.Status}
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    className='custom-dropdown'
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={handleClose}>High</MenuItem>
                                                    <MenuItem onClick={handleClose}>Medium</MenuItem>
                                                    <MenuItem onClick={handleClose}>Low</MenuItem>
                                                </Menu>
                                            </Box>

                                        </Typography>
                                    </Box>

                                    <Box className='mt-2'>
                                        <Button variant="text" className='btn-blue-2 me-2'>Mark Complete</Button>
                                        <Button variant="text" className='btn-blue-2'>Defer</Button>
                                    </Box>

                                </Box>
                            </Box>
                        })
                    } */}


                    {allTask.length > 0 ? allTask.slice(0, loadMore).map((item, index) => {
                        const arr = item.AssignedToID.split(",").filter(Boolean).map(Number);

                        const priority = item.Priority === 1 ? "High" :
                            item.Priority === 2 ? "Normal" :
                                item.Priority === 3 ? "Low" : "Normal";



                        return <>

                            <Box key={index} className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                                <Box className='todo-list-box white-box relative w-100'
                                    onDoubleClick={() => handleClickOpen(item)}>

                                    <Radio className='check-todo'
                                        checked
                                        sx={{
                                            '&.Mui-checked': {
                                                color: item.Priority === 1 ? "red" : item.Priority === 2 ? "secondary" : item.Priority === 3 ? "green" : "primary"
                                            }
                                        }}
                                    />

                                    <Typography variant='subtitle1 mb-3 d-block'><strong>Type: </strong> {item.Source} </Typography>

                                    <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>

                                    <Box className='d-flex align-items-center justify-content-between'>
                                        <Typography variant='subtitle1' ><pan className='text-gray'>
                                            <a href='#'>{item.UserName}</a> <ArrowForwardIosIcon className='font-14' /> </pan>

                                            <a href='#'>{item["Forwarded By"]}</a> <a href='#'> +{arr.length}</a></Typography>
                                        <Typography variant='subtitle1 sembold'>{item["EndDateTime"] && startFormattingDate(item["EndDateTime"])}</Typography>
                                    </Box>

                                    <Box className='d-flex align-items-center justify-content-between'>
                                        <Typography variant='subtitle1'>Docusoft india pvt ltd</Typography>
                                        <Typography variant='subtitle1'>

                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    className='font-14'
                                                    sx={{
                                                        color: item.mstatus === "Completed" ? "green" : "primary"
                                                    }}
                                                >
                                                    {item.mstatus}
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    className='custom-dropdown'
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={handleClose}>High</MenuItem>
                                                    <MenuItem onClick={handleClose}>Medium</MenuItem>
                                                    <MenuItem onClick={handleClose}>Low</MenuItem>
                                                </Menu>
                                            </Box>

                                        </Typography>
                                    </Box>

                                    <Box className='mt-2'>
                                        <Button variant="text" className='btn-blue-2 me-2' onClick={() => MarkComplete(item)}>Mark Complete</Button>
                                        <Button variant="outlined" className='btn-outlin-2'>Defer</Button>
                                    </Box>

                                </Box>
                            </Box>
                            {/* col end */}

                        </>
                    }) : ""}
                </Box>

                <Box id="section2" className='py-4 text-center'>
                    <Button variant="outlined" onClick={handleLoadMore}>View More</Button>
                </Box>

                {/* row end */}
                <hr />

                {/* <Typography variant='subtitle1' className='font-20 bold mb-0'>Welcome Patirck</Typography>
                <Typography variant='subtitle1' className='font-16 bold mb-2'>The following tasks are due soon:</Typography> */}


                <Typography variant='subtitle1' className='font-18 bold mb-2 mt-4'>The following tasks were recently updated: </Typography>

                <Box className='row'>
                    {recentTaskList.length > 0 ? recentTaskList.slice(0, loadMore).map((item, index) => {
                        return <>

                            <Box key={index} className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                                <Box className='todo-list-box white-box relative w-100'
                                    onClick={() => handleClickOpen()}>

                                    <Radio className='text-red check-todo'
                                        // {...label}
                                        // icon={<RadioButtonUncheckedIcon />}
                                        // checkedIcon={<CheckCircleIcon />}
                                        checked
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "secondary",
                                            },
                                        }}
                                    />

                                    <Typography variant='subtitle1 mb-3 d-block'><strong>Type:</strong> Signature Tast</Typography>

                                    <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>

                                    <Box className='d-flex align-items-center justify-content-between'>
                                        <Typography variant='subtitle1' ><pan className='text-gray'>
                                            You <ArrowForwardIosIcon className='font-14' /> </pan>
                                            <a href='#'>Patrick</a>,
                                            <a href='#'>Patrick</a> <a href='#'> +2</a></Typography>
                                        <Typography variant='subtitle1 sembold'>01/05/23</Typography>
                                    </Box>

                                    <Box className='d-flex align-items-center justify-content-between'>
                                        <Typography variant='subtitle1'>Docusoft india pvt ltd</Typography>
                                        <Typography variant='subtitle1'>

                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                >
                                                    priority
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    className='custom-dropdown'
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={handleClose}>High</MenuItem>
                                                    <MenuItem onClick={handleClose}>Medium</MenuItem>
                                                    <MenuItem onClick={handleClose}>Low</MenuItem>
                                                </Menu>
                                            </Box>

                                        </Typography>
                                    </Box>

                                    <Box className='mt-2'>
                                        <Button variant="text" className='btn-blue-2 me-2'>Action</Button>
                                        <Button variant="outlined" className='btn-outlin-2'>Defer</Button>
                                    </Box>

                                    <Box className="todo-list-details d-flex align-items-center user-dropdown">
                                        <Box className="user-img me-2">
                                            <img src={user} />
                                        </Box>
                                        <Box className="user-content text-start">
                                            <Typography variant='h2'>{'user name'}</Typography>
                                            <Typography variant='body1'>{'Lorem ipsome dolor site amet this is a dummy text loprem ipsome dolor site amet this is a dummy text '}</Typography>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                            {/* col end */}

                        </>
                    }) : ""}
                </Box>
                <Box id="section3" className='py-4 text-center'>
                    <Button variant="outlined" onClick={handleLoadMoreRecentTask}>View More</Button>
                </Box>


                {/* row end */}
                <hr />

                <Typography variant='subtitle1' className='font-18 bold mb-2 mt-4'>You pinned the following tasks:</Typography>

                <Box className='row'>
                    {Array(9).fill("").map(() => {
                        return <>

                            <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                                <Box className='todo-list-box white-box relative w-100'
                                    onClick={() => handleClickOpen()}>

                                    <Box className='clearfix'>
                                        <Radio className='text-red check-todo'
                                            // {...label}
                                            // icon={<RadioButtonUncheckedIcon />}
                                            // checkedIcon={<CheckCircleIcon />}
                                            checked
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: "secondary",
                                                },
                                            }}
                                        />

                                        <PushPinIcon className='pinicon'></PushPinIcon>

                                    </Box>


                                    <Typography variant='subtitle1 mb-3 d-block'><strong>Type:</strong> Signature Tast</Typography>

                                    <Typography variant='h2' className='mb-2'>Lorem ipsome dolor site</Typography>

                                    <Box className='d-flex align-items-center justify-content-between'>
                                        <Typography variant='subtitle1' ><pan className='text-gray'>
                                            You <ArrowForwardIosIcon className='font-14' /> </pan>
                                            <a href='#'>Patrick</a>,
                                            <a href='#'>Patrick</a> <a href='#'> +2</a></Typography>
                                        <Typography variant='subtitle1 sembold'>01/05/23</Typography>
                                    </Box>

                                    <Box className='d-flex align-items-center justify-content-between'>
                                        <Typography variant='subtitle1'>Docusoft india pvt ltd</Typography>
                                        <Typography variant='subtitle1'>

                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                >
                                                    priority
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    className='custom-dropdown'
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={handleClose}>High</MenuItem>
                                                    <MenuItem onClick={handleClose}>Medium</MenuItem>
                                                    <MenuItem onClick={handleClose}>Low</MenuItem>
                                                </Menu>
                                            </Box>

                                        </Typography>
                                    </Box>

                                    <Box className='mt-2'>
                                        <Button variant="text" className='btn-blue-2 me-2'>Action</Button>
                                        <Button variant="outlined" className='btn-outlin-2'>Defer</Button>
                                    </Box>

                                </Box>
                            </Box>
                            {/* col end */}

                        </>
                    })}
                </Box>



                {/* row end */}
                <hr />
                <Typography id="section4" variant='subtitle1' className='font-18 bold mb-2 mt-4'>You accessed the following documents recently:</Typography>

                {/* <DocumentDetails></DocumentDetails> */}

                <Box className='row'>
                    {recentDocument.length > 0 ? recentDocument.map((item, index) => {
                        return <>

                            <Box className='col-xxl-3 col-xl-4 col-md-6' key={index}>
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
                                            <Box className="upload-content pe-3" onDoubleClick={(e) => ViewerDocument(item)}>
                                                <Typography variant="h4" >
                                                    {item.Description}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {/* Size:  <span className='sembold'>{item.FileSize}</span> |   */}
                                                    <span className='sembold'>{moment(item["Item Date"]).format("DD/MM/YYYY")!=="Invalid date"?moment(item["Item Date"]).format("DD/MM/YYYY"):"01/01/2000"}</span>
                                                    | Uploaded by <span className='sembold'>{item.Client!==""&&item.Client!==null&&item.Client!=="undefined"&&item.Client!==undefined? item.Client: ""}</span>
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Button
                                                id={`basic-button-${index}`}
                                                aria-controls={openMenus[index] ? `basic-menu-${index}` : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openMenus[index] ? 'true' : undefined}
                                                onClick={(event) => handleClickDocumentList(event, index)}
                                                className='min-width-auto'
                                            >
                                                <MoreVertIcon />
                                            </Button>
                                            <Menu
                                                id={`basic-menu-${index}`}
                                                anchorEl={openMenus[index]}
                                                open={Boolean(openMenus[index])}
                                                onClose={() => handleCloseDocument(index)}
                                                MenuListProps={{
                                                    'aria-labelledby': `basic-button-${index}`,
                                                }}
                                                className='custom-dropdown'
                                            >
                                                <MenuItem onClick={() => {
                                                    handleCloseDocument(index)
                                                    handleClickOpenDocumentDetailsList(item)
                                                }}>
                                                    <ListItemIcon>
                                                        <ArticleIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Document Details</MenuItem>

                                                <MenuItem onClick={()=>handleCloseDocument(index)}>
                                                    <ListItemIcon>
                                                        <CloudUploadIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Upload New Version</MenuItem>
                                                <MenuItem onClick={()=>handleCloseDocument(index)}>
                                                    <ListItemIcon>
                                                        <DriveFileRenameOutlineIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Rename Document</MenuItem>
                                                <MenuItem onClick={() => handleOpenBrower(item,index)} >
                                                    <ListItemIcon>
                                                        <TravelExploreIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Open in Browser</MenuItem>
                                                <MenuItem onClick={(e) => handleDowloadDocument(item,index)}>
                                                    <ListItemIcon>
                                                        <CloudDownloadIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Download</MenuItem>
                                            </Menu>
                                        </Box>
                                    </label>
                                </Box>
                            </Box>

                        </>
                    }) : ""}

                </Box>




            </Box>
        </Box>
    )
}

export default NewTodoList


// rfce