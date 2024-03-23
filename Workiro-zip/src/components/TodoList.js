import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ScheduleIcon from '@mui/icons-material/Schedule';

import user from "../images/user.jpg";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CommanCLS from '../services/CommanService';

import { Checkbox, Radio } from '@mui/material';
import TaskDetailModal from './TaskDetailModal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DownloadIcon from '@mui/icons-material/Download';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import noData from "../../src/images/no-data.gif";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import VerifiedIcon from '@mui/icons-material/Verified';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import DraftsIcon from '@mui/icons-material/Drafts';
import CustomLoader from './CustomLoader';


import { data } from 'jquery';


function TodoList() {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));

    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const [userId, setUserId] = useState(localStorage.getItem("UserId"));




    const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";

    let Cls = new CommanCLS(baseUrlPractice, agrno, Email, password);
    //let Clsp = new CommanCLS(baseUrlPractice, agrno, Email, password);

    const [allTask, setAllTask] = useState([]);
    const [actualData, setActualData] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [loadMore, setLoadMore] = useState(20);

    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState("Folder");
    const [selectedStatus, setSelectedStatus] = useState("Status");
    const [selectedType, setSelectedType] = useState("Source");
    const [taskFilter, setTaskFilter] = useState({});

    const [selectedSortBy, setSelectedSortBy] = useState("Sort By");
    const [selectedGroupBy, setSelectedGroupBy] = useState("Group By");

    const [dataInGroup, setDataInGroup] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    // for date datepicker
    const [state, setState] = useState({
        start: moment().subtract(29, 'days'),
        end: moment(),
    });
    const { start, end } = state;


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        // setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function Json_GetFolders() {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password
        }
        try {
            Cls.Json_GetFolders(obj, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let tbl = js.Table;
                        // console.log("Json_GetFolders", tbl);
                        setFolders(tbl);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetFolders", err);
        }
    }
    const Json_CRM_GetOutlookTask = () => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password
        };
        try {
            Cls.Json_CRM_GetOutlookTask(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_CRM_GetOutlookTask", json.Table);
                        let result = json.Table.filter((el) => el.Source === "CRM" || el.Source === "Portal");
                        const formattedTasks = result.map((task) => {
                            let timestamp;
                            if (task.EndDateTime) {
                                timestamp = parseInt(task.EndDateTime.slice(6, -2));
                            }

                            const date = new Date(timestamp);
                            // let dateForm = startFormattingDate(date);

                            return { ...task, EndDateTime: date };
                        });

                        // setAllTask(formattedTasks.sort((a, b) => a.EndDateTime - b.EndDateTime));

                        // let tasks = formattedTasks.sort((a, b) => a.EndDateTime - b.EndDateTime);
                        // let myTasks = tasks.filter((item)=>item.AssignedToID.split(",").includes(userId));
                        let myTasks = formattedTasks.filter((item) => item.AssignedToID.split(",").includes(userId));

                        let hasCreationDate = myTasks.filter((item) => item.CreationDate !== null).map((task) => {
                            let timestamp;
                            if (task.CreationDate) {
                                timestamp = parseInt(task.CreationDate.slice(6, -2));
                            }

                            const date = new Date(timestamp);

                            return { ...task, CreationDate: date };
                        }).sort((a, b) => b.CreationDate - a.CreationDate);


                        // setActualData([...myTasks]);
                        setActualData([...hasCreationDate]);
                        setAllTask([...hasCreationDate]);
                        setTaskFilter({...taskFilter, "EndDateTime": [start._d, end._d]});  // for initialization of filter
                        setIsLoading(false);
                        Json_GetFolders();
                        // console.log("modified tasks: ",myTasks);

                        // console.log("modified tasks",formattedTasks.sort((a, b) => a.EndDateTime - b.EndDateTime));
                        // setAllTask(formattedTasks.sort((a, b) => a.EndDateTime - b.EndDateTime));
                        // setAllTask(json.Table);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_CRM_GetOutlookTask", err);
        }
    }

    const [isApi, setIsApi] = useState(false);


    const eventHandler = (e) => {
        console.log("Load more data2", e);
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            // Check if there's more data to load before updating loadMore

            setLoadMore((prevLoadMore) => prevLoadMore + 50);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', eventHandler);

        return () => {
            console.log("Removing scroll event listener");
            window.removeEventListener('scroll', eventHandler);
        };
    }, []);

    useEffect(() => {
        Json_CRM_GetOutlookTask();

    }, [isApi])


    function DownLoadAttachment(Path) {
        let OBJ = {};
        OBJ.agrno = agrno;
        OBJ.Email = Email;
        OBJ.password = password;
        OBJ.path = Path;
        Cls.CallNewService('GetBase64FromFilePath', function (status, Data) {
            if (status) {
                var jsonObj = JSON.parse(Data);
                if (jsonObj.Status === "Success") {
                    var dencodedData = window.atob(Path);
                    var fileName = dencodedData;
                    var Typest = fileName.lastIndexOf("\\");
                    fileName = fileName.slice(Typest + 1);
                    console.log('FileName', fileName);
                    console.log("jsonObj.Status", jsonObj.Message);
                    var a = document.createElement("a"); //Create <a>
                    a.href = "data:" + FileType(fileName) + ";base64," + jsonObj.Message; //Image Base64 Goes here
                    a.download = fileName; //File name Here
                    a.click(); //Downloaded file

                }

            }
        });
    }

    function FileType(fileName) {
        // for (var i = 0; i < fileName.length; i++) {
        let Typest = fileName.lastIndexOf(".");
        var Type = fileName.slice(Typest + 1);
        var type = Type.toUpperCase();
        return type;
    }

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

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    useEffect(() => {
        let fltData = actualData.filter(function (obj) {
            return Object.keys(taskFilter).every(function (key) {
                if (taskFilter[key][0].length > 0 || typeof taskFilter[key][0] === "object") {
                    if (obj[key] && obj[key] !== undefined && obj[key] !== "") {
                        if (key === "EndDateTime") {
                            let docDate = obj[key];
                            let sDate = taskFilter[key][0];
                            let eDate = taskFilter[key][1];
                            return docDate >= sDate && docDate <= eDate;
                        } else {
                            return obj[key].toString().toLowerCase().includes(taskFilter[key][0].toString().toLowerCase());
                        }
                    }
                }
            });
        });

        setAllTask([...fltData]);
        if (Object.keys(dataInGroup).length > 0) {
            let gData = groupByProperty(fltData, selectedGroupBy);
            setDataInGroup(gData);
        }

    }, [taskFilter]);

    function handleFilterDeletion(target) {
        let obj = Object.keys(taskFilter).filter(objKey =>
            objKey !== target).reduce((newObj, key) => {
                newObj[key] = taskFilter[key];
                return newObj;
            }, {}
            );
        setTaskFilter(obj);
    }
    const handleCallback = (start, end) => {
        setTaskFilter({ ...taskFilter, "EndDateTime": [start._d, end._d] });
        setState({ start, end });
    };

    const label =
        start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY');

    const isGroupDataExist = (orderedData) => {
        if (Object.keys(dataInGroup).length > 0) {
            let data = groupByProperty(orderedData, selectedGroupBy);
            setDataInGroup(data);
        }
    }

    const handleDescending = () => {
        switch (selectedSortBy) {
            case "EndDateTime":
                let sotEndDate = [...allTask].sort((a, b) => b.EndDateTime - a.EndDateTime);
                setAllTask(sotEndDate);
                isGroupDataExist(sotEndDate);
                return;
            case "CreationDate":
                let sortStartDate = [...allTask].sort((a, b) => b.CreationDate - a.CreationDate);
                setAllTask(sortStartDate);
                isGroupDataExist(sortStartDate);
                return;
            case "Subject":
                let sortSubject = [...allTask].sort((a, b) => b.Subject.localeCompare(a.Subject));
                setAllTask(sortSubject);
                isGroupDataExist(sortSubject);
                return;
            case "Client":
                let fltData = [...allTask].filter(itm => itm.Client !== null);
                let sortClient = [...fltData].sort((a, b) => b.Client.localeCompare(a.Client));
                setAllTask(sortClient);
                isGroupDataExist(sortClient);
                return;
            case "Priority":
                let sortPriority = [...allTask].sort((a, b) => b.Priority - a.Priority);
                setAllTask(sortPriority);
                isGroupDataExist(sortPriority);
                return;
            case "Section":
                let sortSection = [...allTask].sort((a, b) => b.Section.split(" ")[1] - a.Section.split(" ")[1]);
                setAllTask(sortSection);
                isGroupDataExist(sortSection);
                return;
            default:
                return;
        }
    }

    const handleAscending = () => {
        switch (selectedSortBy) {
            case "EndDateTime":
                let sotEndDate = [...allTask].sort((a, b) => a.EndDateTime - b.EndDateTime);
                setAllTask(sotEndDate);
                isGroupDataExist(sotEndDate);
                return;
            case "CreationDate":
                let sortStartDate = [...allTask].sort((a, b) => a.CreationDate - b.CreationDate);
                setAllTask(sortStartDate);
                isGroupDataExist(sortStartDate);
                return;
            case "Subject":
                let sortSubject = [...allTask].sort((a, b) => a.Subject.localeCompare(b.Subject));
                setAllTask(sortSubject);
                isGroupDataExist(sortSubject);
                return;
            case "Client":
                let fltData = [...allTask].filter(itm => itm.Client !== null);
                let sortClient = [...fltData].sort((a, b) => a.Client.localeCompare(b.Client));
                setAllTask(sortClient);
                isGroupDataExist(sortClient);
                return;
            case "Priority":
                let sortPriority = [...allTask].sort((a, b) => a.Priority - b.Priority);
                setAllTask(sortPriority);
                isGroupDataExist(sortPriority);
                return;
            case "Section":
                let sortSection = [...allTask].sort((a, b) => a.Section.split(" ")[1] - b.Section.split(" ")[1]);
                setAllTask(sortSection);
                isGroupDataExist(sortSection);
                return;
            default:
                return;
        }
    }
    const handleSortBy = (check) => {
        if (check) {
            handleDescending();
        } else {
            handleAscending();
        }
    }
    function groupByProperty(data, property) {
        return data.reduce((acc, obj) => {
            const value = obj[property];
            acc[value] = acc[value] || [];
            acc[value].push(obj);
            return acc;
        }, {});
    }
    const handleGrouping = (val) => {
        setSelectedGroupBy(val);
        if (val !== "Group By") {
            let groupedData = groupByProperty(allTask, val);
            // console.log("Grouped Data: ",groupedData);
            setDataInGroup(groupedData);
        } else if (val === "Group By") {
            setDataInGroup([]);
        }
    }


    // 
    const [openPortal, setOpenPortal] = React.useState(false);
    const handleClickOpenPortal = () => {
        setOpenPortal(true);
    };
    const handleClosePortal = () => {
        setOpenPortal(false);
    };


    return (
        <>
            <Box className="container-fluid p-0">
                <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal}></TaskDetailModal>

                <Box className='d-flex main-search-box mb-3 align-items-center justify-content-between'>
                    <Box className='d-flex align-items-center'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={allTask.map((itm) => ({ value: itm.Subject, label: itm.Subject }))}
                            sx={{ width: 230 }}
                            size='small'
                            renderInput={(params) => <TextField sx={{ fontSize: 14 }} {...params} label="Subject" className='font-14' />}
                        />

                        <FormControl size="small" className='select-border ms-3'>
                            {/* <InputLabel id="demo-simple-select-label">Folder</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedFolder}
                                label="Folder"
                                onChange={(e) => {
                                    setSelectedFolder(e.target.value);
                                    if (e.target.value === "Folder") {
                                        handleFilterDeletion("Folder");
                                        return;
                                    } else {
                                        setTaskFilter({ ...taskFilter, Folder: [e.target.value] })
                                    }
                                }}
                                className='custom-dropdown'
                            >
                                <MenuItem value="Folder">Folders</MenuItem>
                                {folders.length > 0 && folders.map(fld => <MenuItem value={fld.Folder}>{fld.Folder}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl size="small" className='select-border ms-3'>
                            {/* <InputLabel id="demo-simple-select-label">Type</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedType}
                                label="Type"
                                onChange={(e) => {
                                    setSelectedType(e.target.value);
                                    if (e.target.value === "Source") {
                                        handleFilterDeletion("Source");
                                        return;
                                    } else {
                                        setTaskFilter({ ...taskFilter, Source: [e.target.value] });
                                    }
                                }}
                                className='custom-dropdown'
                            >
                                <MenuItem value="Source">Type</MenuItem>
                                <MenuItem value="CRM">CRM</MenuItem>
                                <MenuItem value="Process">Process</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" className='select-border ms-3'>
                            {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedStatus}
                                label="Status"
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                    if (e.target.value === "Status") {
                                        handleFilterDeletion("Status");
                                        return;
                                    } else {
                                        setTaskFilter({ ...taskFilter, Status: [e.target.value] });
                                    }
                                }}
                                className='custom-dropdown'
                            >
                                {["Status", "Done", "Not Started", "In Progress", "Waiting on someone else", "Deferred", "Deleted", "Completed"].map(itm => <MenuItem value={itm}>{itm}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box className='d-flex align-items-end'>
                        <Box>
                            <DateRangePicker
                                initialSettings={{
                                    startDate: start.toDate(),
                                    endDate: end.toDate(),
                                    ranges: {
                                        'All': [
                                            moment({ year: 1990, month: 0, day: 1 }).toDate(),
                                            moment().toDate()
                                        ],
                                        Today: [moment().toDate(), moment().toDate()],
                                        Yesterday: [
                                            moment().subtract(1, 'days').toDate(),
                                            moment().subtract(1, 'days').toDate(),
                                        ],
                                        'Last 7 Days': [
                                            moment().subtract(6, 'days').toDate(),
                                            moment().toDate(),
                                        ],
                                        'Last 30 Days': [
                                            moment().subtract(29, 'days').toDate(),
                                            moment().toDate(),
                                        ],
                                        'This Month': [
                                            moment().startOf('month').toDate(),
                                            moment().endOf('month').toDate(),
                                        ],
                                        'Last Month': [
                                            moment().subtract(1, 'month').startOf('month').toDate(),
                                            moment().subtract(1, 'month').endOf('month').toDate(),
                                        ],
                                    },
                                }}
                                onCallback={handleCallback}
                            >
                                <div className='pointer me-2 d-flex align-items-center' id="reportrange"
                                >
                                    <i className="fa fa-calendar"></i>
                                    <CalendarMonthIcon className='me-2 text-red' />

                                    <span>{label === "Invalid date - Invalid date" ? "All" : label}</span> <i className="fa fa-caret-down"></i>
                                </div>
                            </DateRangePicker>
                        </Box>

                        <FormControl size="small" className='select-border ms-3'>
                            {/* <InputLabel id="demo-simple-select-label">Group By</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSortBy}
                                label="Group By"
                                onChange={(e) => setSelectedSortBy(e.target.value)}
                                className='custom-dropdown'
                            >
                                <MenuItem value="Sort By" onClick={() => setAllTask([...actualData])}>Sort By</MenuItem>
                                <MenuItem value="Client">Client Name</MenuItem>
                                <MenuItem value="EndDateTime">Due Date</MenuItem>
                                <MenuItem value="Priority">Priority</MenuItem>
                                <MenuItem value="Section">Section</MenuItem>
                                <MenuItem value="CreationDate">Start Date</MenuItem>
                                <MenuItem value="Subject">Subject</MenuItem>
                            </Select>
                        </FormControl>
                        {selectedSortBy !== "Sort By" && <Checkbox onClick={(e) => handleSortBy(e.target.checked)} className='p-0' {...label} icon={<UpgradeIcon />} checkedIcon={<VerticalAlignBottomIcon />} />}
                        <FormControl size="small" className='select-border ms-3'>
                            {/* <InputLabel id="demo-simple-select-label">Sort By</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedGroupBy}
                                label="Sort By"
                                onChange={(e) => handleGrouping(e.target.value)}
                                className='custom-dropdown'

                            >
                                <MenuItem value="Group By">Group By</MenuItem>
                                <MenuItem value="Client">Client Name</MenuItem>
                                <MenuItem value="EndDateTime">Due Date</MenuItem>
                                <MenuItem value="Priority">Priority</MenuItem>
                                <MenuItem value="Section">Section</MenuItem>
                                <MenuItem value="CreationDate">Start Date</MenuItem>
                                <MenuItem value="Subject">Subject</MenuItem>
                            </Select>

                        </FormControl>


                        <ToggleButtonGroup className='ms-3' size='small'>
                            <ToggleButton value="left" aria-label="left aligned">
                                <DownloadIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>



                    </Box>
                </Box>


                <Box className='main-filter-box'>
                    {/* <Box className='row'> */}
                    {isLoading?<Box className="custom-loader"><CustomLoader/></Box>:(<Box className='row'>

                        {

                            Object.keys(dataInGroup).length > 0 ? (<>
                                {Object.keys(dataInGroup).map((key) => {
                                    return <>
                                        <h4>{key == 1 ? "High" : key == 2 ? "Medium" : key}</h4>
                                        {dataInGroup[key].length > 0 && dataInGroup[key].map((item, index) => {
                                            return <Box key={index} className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                                                <Box className='todo-list-box white-box relative w-100' onClick={() => handleClickOpen(item)}>

                                                    <Radio className={item.Priority === 1 ? 'text-red check-todo' : item.Priority === 2 ? 'text-green check-todo' : 'text-grey check-todo'} checked
                                                        sx={{
                                                            '&.Mui-checked': {
                                                                color: "secondary",
                                                            },
                                                        }}
                                                    />

                                                    <Typography variant='subtitle1 mb-4 d-block'><strong>Type:</strong> {item.Source}</Typography>

                                                    <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>

                                                    <Box className='d-flex align-items-center justify-content-between'>
                                                        <Typography variant='subtitle1'><pan className='text-gray'>
                                                            {item.UserName} <ArrowForwardIosIcon className='font-14' /> </pan>
                                                            {/* <a href='#'>Patrick</a>, */}
                                                            <a href='#'>{item["Forwarded By"]}</a> <a href='#'> +1</a></Typography>
                                                        <Typography variant='subtitle1 sembold'>{item["EndDateTime"] && startFormattingDate(item["EndDateTime"])}</Typography>
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
                                                                    className='font-14'
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
                                                        <Button variant="outlined" className='btn-outlin-2'>Defer</Button>
                                                    </Box>

                                                </Box>
                                            </Box>
                                        })}
                                    </>
                                })}
                            </>) : (allTask.length > 0 ?
                                (allTask.slice(0, loadMore).map((item, index) => {
                                    return <Box key={index} className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                                        <Box className='todo-list-box white-box relative w-100' onClick={() => handleClickOpen(item)}>

                                            <Radio className={item.Priority === 1 ? 'text-red check-todo' : item.Priority === 2 ? 'text-green check-todo' : 'text-grey check-todo'} checked
                                                sx={{
                                                    '&.Mui-checked': {
                                                        color: "secondary",
                                                    },
                                                }}
                                            />

                                            <Typography variant='subtitle1 mb-4 d-block'><strong>Type:</strong> {item.Source}</Typography>

                                            <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>

                                            <Box className='d-flex align-items-center justify-content-between'>
                                                <Typography variant='subtitle1'><pan className='text-gray'>
                                                    {item.UserName} <ArrowForwardIosIcon className='font-14' /> </pan>
                                                    {/* <a href='#'>Patrick</a>, */}
                                                    <a href='#'>{item["Forwarded By"]}</a> <a href='#'> +1</a></Typography>
                                                <Typography variant='subtitle1 sembold'>{item["EndDateTime"] && startFormattingDate(item["EndDateTime"])}</Typography>
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
                                                            className='font-14'
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
                                                <Button variant="outlined" className='btn-outlin-2'>Defer</Button>
                                            </Box>

                                        </Box>
                                    </Box>
                                })) : <Box className='text-center no-data-found'>
                                    <img src={noData} />
                                    <h4 className='font-18 text-gray'>Data Not Found</h4></Box>)
                        }

                        {/* statick box */}
                        <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex' onClick={handleClickOpenPortal}>
                            <Box className='todo-list-box white-box relative w-100'>

                                <Radio className='text-red check-todo' checked
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "secondary",
                                        },
                                    }}
                                />

                                <Typography variant='subtitle1 mb-4 d-block'><strong>Type:</strong> Signature Tast</Typography>

                                <Typography variant='h2' className='mb-2'>Lorem ipsome dolor site</Typography>

                                <Box className='d-flex align-items-center justify-content-between'>
                                    <Typography variant='subtitle1'><pan className='text-gray'>
                                        You <ArrowForwardIosIcon className='font-14' /> </pan>
                                        <a href='#'>Patrick</a>,
                                        <a href='#'>Patrick</a> <a href='#'> +5</a></Typography>
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
                                    <Button variant="text" className='btn-blue-2'>Defer</Button>
                                </Box>

                            </Box>
                        </Box>
                        {/* col end */}
                    </Box>)}
                </Box>
            </Box>

            {/* modal */}

            <Dialog
                open={openPortal}
                onClose={handleClosePortal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
                sx={{
                    // maxWidth: 640,
                    margin: '0 auto'
                }}
            >

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="dropdown-box">
                                <Typography variant="h4" className='font-18 bold text-black mb-0'>
                                    Portal Task
                                </Typography>
                            </Box>

                            {/*  */}
                            <Button >
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>
                        <hr />

                        <Box>
                            <Box className='d-flex align-items-center mb-2'>
                                <Checkbox
                                    {...label}
                                    icon={<NewReleasesIcon />}
                                    checkedIcon={<VerifiedIcon />}
                                />
                                <h5 className='mb-0 text-black'>Subject line from the Portal Message</h5>
                            </Box>
                            <Box className='font-14 well mb-3'>
                                <p className='mb-0'>
                                    After conducting thorough research on your company's impressive track record and innovative approach, I believe there could be significant synergies between our organizations. Both of our companies share a commitment to excellence and a drive for innovation, making me optimistic about the potential for a mutually beneficial partnership.
                                    I would like to propose a meeting at your earliest convenience to discuss how we can leverage each other's strengths to drive growth and success.
                                </p>
                            </Box>

                            <Box className='d-flex flex-wrap align-items-center justify-content-between'>
                                <Box className='d-flex'>
                                    <MarkunreadIcon className='text-blue' />
                                    {/* <DraftsIcon /> */}
                                    <Box className='ps-3'>
                                        <h5 className='font-14 text-black mb-1'>Last Viewed On</h5>
                                        <p className='font-12 text-gray sembold mb-2'>10/11/24 09:50PM</p>
                                        <Button className='btn-blue-2' size="small" startIcon={<ScheduleIcon />}>View History</Button>
                                    </Box>
                                </Box>

                                <Box className='d-flex'>
                                    <VerifiedIcon className='text-green' />
                                    {/* <NewReleasesIcon className='text-warning' /> */}

                                    {/* <DraftsIcon /> */}
                                    <Box className='ps-3'>
                                        <h5 className='font-14 text-black mb-1'>Message approved </h5>
                                        <p className='font-12 text-gray sembold mb-2'>10/11/24 09:50PM</p>
                                        <Button className='btn-blue-2' size="small" startIcon={<ScheduleIcon />}>Certificate of Approval</Button>
                                    </Box>
                                </Box>

                                <Box className='d-fle'>
                                    {/* <MarkunreadIcon /> */}
                                    <DraftsIcon />
                                    <Box className='ps-3'>
                                        <h5 className='font-14 text-black mb-1'>Start Date</h5>
                                        <p className='font-12 text-gray sembold'>10/11/24</p>
                                    </Box>
                                    <Box className='ps-3'>
                                        <h5 className='font-14 text-black mb-1'>End Date</h5>
                                        <p className='font-12 text-gray sembold mb-0'>10/11/24</p>
                                    </Box>
                                </Box>

                            </Box>

                        </Box>





                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default TodoList

// rfce