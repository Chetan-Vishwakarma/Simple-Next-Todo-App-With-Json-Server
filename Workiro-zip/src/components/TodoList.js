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


function TodoList() {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));

    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const [userId,setUserId] = useState(localStorage.getItem("UserId"));




    const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";

    let Cls = new CommanCLS(baseUrlPractice, agrno, Email, password);
    //let Clsp = new CommanCLS(baseUrlPractice, agrno, Email, password);

    const [allTask, setAllTask] = useState([]);
    const [actualData,setActualData] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [loadMore, setLoadMore] = useState(50);

    const [folders,setFolders] = useState([]);
    const [selectedFolder,setSelectedFolder] = useState("Folder");
    const [selectedStatus,setSelectedStatus] = useState("Status");
    const [selectedType,setSelectedType] = useState("Source");
    const [taskFilter,setTaskFilter] = useState({}); 

    const [selectedSortBy,setSelectedSortBy] = useState("Sort By");

    // for date datepicker
    const [state, setState] = useState({
        start: moment().subtract(29, 'days'),
        end: moment(),
    });
    const { start, end } = state;


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
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
                        console.log("Json_CRM_GetOutlookTask", json);
                        let result = json.Table.filter((el)=>["CRM", "Portal"].includes(el.Source));
                        // let result = json.Table;
                        // result.filter(it=> it.EndDateTime!==null && !it.EndDateTime.split("").includes("-"))  //to remove (Invalid date)
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
                        let myTasks = formattedTasks.filter((item)=>item.AssignedToID.split(",").includes(userId));

                        let hasCreationDate = myTasks.filter((item)=>item.CreationDate!==null).map((task) => {
                            let timestamp;
                            if (task.CreationDate) {
                                timestamp = parseInt(task.CreationDate.slice(6, -2));
                            }

                            const date = new Date(timestamp);

                            return { ...task, CreationDate: date };
                        }).sort((a, b) => b.CreationDate - a.CreationDate);
                        // console.log("hasCreationDate",hasCreationDate);

                        // myTasks.map((task) => {
                        //     console.log("creation date: ",task.CreationDate);
                        //     let timestamp;
                        //     if (task.CreationDate) {
                        //         timestamp = parseInt(task.CreationDate.slice(6, -2));
                        //     }

                        //     const date = new Date(timestamp);

                        //     return { ...task, CreationDate: date };
                        // });



                        setActualData([...myTasks]);
                        setAllTask([...hasCreationDate]);
                        Json_GetFolders();
                        // console.log("modified tasks: ",myTasks);
                        
                        // console.log("modified tasks",formattedTasks.sort((a, b) => a.EndDateTime - b.EndDateTime));
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
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            setLoadMore((preValue) => preValue + 50);
        }
    }

    useEffect(() => {
        Json_CRM_GetOutlookTask();
        window.addEventListener('scroll', eventHandler)
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
        setUserId(localStorage.getItem("UserId"));
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

    useEffect(()=>{
        let fltData =  actualData.filter(function (obj) {
            return Object.keys(taskFilter).every(function (key) {
                if (taskFilter[key][0].length > 0 || typeof taskFilter[key][0]==="object") {
                    if (obj[key] && obj[key] !== undefined && obj[key] !== "") {
                        if(key === "EndDateTime"){
                            let docDate = obj[key];
                            let sDate = taskFilter[key][0];
                            let eDate = taskFilter[key][1];
                            return docDate >= sDate && docDate <= eDate;
                            // let d = obj[key].split("/");
                            // let df = `${d[2]}-${d[1]}-${d[0]}`
                            // // console.log("For Filter Criteria Before",df);
                            // let docDate = new Date(df);
                            // // console.log("For Filter Criteria",docDate);
                            // let d1 = taskFilter[key][0].split("/");
                            // let df1 = `${d1[2]}-${d1[1]}-${d1[0]}`;
                            // let fltD1 = new Date(df1);
                            // let d2 = taskFilter[key][1].split("/");
                            // let df2 = `${d2[2]}-${d2[1]}-${d2[0]}`;
                            // let fltD2 = new Date(df2);

                            // return docDate >= fltD1 && docDate <= fltD2;

                            // console.log("For Filter Criteria",df1,"------------",df2);
                            // console.log("For Filter Criteria",fltD1,"------------",fltD2);
                        }else{
                            return obj[key].toString().toLowerCase().includes(taskFilter[key][0].toString().toLowerCase()); 
                        }
                        // return obj[key].toString().toLowerCase().includes(my_criteria[key][0].toString().toLowerCase());
                    }
                }
            });
        });

        setAllTask([...fltData]);
        console.log("For Tasks filter", fltData.length);
        console.log("For Tasks filter", fltData);
        // console.log("For Tasks filter", fltData[0]?.Description);
        // console.log("For Tasks filter", fltData[fltData.length-1]?.Description);
        // if(fltData.length===0){
        //     setDataNotFoundBoolean(true);
        //     return;
        // }
        // setDataNotFoundBoolean(false);
        // setAdvFilteredResult(fltData);
    },[taskFilter]);

    function handleFilterDeletion(target){
        let obj = Object.keys(taskFilter).filter(objKey =>
            objKey !== target).reduce((newObj, key) =>
            {
                newObj[key] = taskFilter[key];
                return newObj;
            }, {}
        );
        setTaskFilter(obj);
    }
    const formatDatePickerDate = (dateString) =>{
        const dateObject = new Date(dateString);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 to adjust for zero-based index
        const year = dateObject.getFullYear();
        
        return `${day}/${month}/${year}`;
    }
    const handleCallback = (start, end) => {
        // let startDate = formatDatePickerDate(start._d);
        // let endDate = formatDatePickerDate(end._d);
        setTaskFilter({...taskFilter, "EndDateTime": [start._d, end._d]});

        // console.log("Start: ",start._d);
        // console.log("End: ",end._d);
        // console.log("Start: ",start._i);
        // console.log("End: ",end._i);
        // if(start._i==="All"&&end._i==="All"){
        //     handleFilterDeletion('Item Date');
        //     // let obj = Object.keys(filterCriteria).filter(objKey =>
        //     //     objKey !== 'Item Date').reduce((newObj, key) =>
        //     //     {
        //     //         newObj[key] = filterCriteria[key];
        //     //         return newObj;
        //     //     }, {}
        //     // );
        //     // setFilterCriteria(obj);

        // }else{
        //     let startDate = formatDatePickerDate(start._d);
        //     let endDate = formatDatePickerDate(end._d);
        //     setFilterCriteria({...filterCriteria, "Item Date": [startDate, endDate]});
        // }
        setState({ start, end });
    };

    const label =
        start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY');

    const handleDescending=()=>{
        switch(selectedSortBy){
            // case selectedSortBy
        }
    }
    const handleAscending=()=>{

    }
    const handleSortBy=(check)=>{
        if(check){
            handleDescending();
        }else{
            handleAscending();
        }
    }

    return (
        <Box className="container-fluid p-0">
            <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal}></TaskDetailModal>

            <Box className='d-flex main-search-box mb-3 align-items-center justify-content-between'>
                <Box className='d-flex align-items-center'>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={allTask.map((itm)=>({value:itm.Subject,label:itm.Subject}))}
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
                            onChange={(e)=>{
                                setSelectedFolder(e.target.value);
                                if(e.target.value==="Folder"){
                                    handleFilterDeletion("Folder");
                                    return;
                                }else{
                                    setTaskFilter({...taskFilter,Folder:[e.target.value]})
                                }
                            }}
                            className='custom-dropdown'
                        >
                            <MenuItem value="Folder">Folders</MenuItem>
                            {folders.length>0 && folders.map(fld=><MenuItem value={fld.Folder}>{fld.Folder}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl size="small" className='select-border ms-3'>
                        {/* <InputLabel id="demo-simple-select-label">Type</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedType}
                            label="Type"
                            onChange={(e)=>{
                                setSelectedType(e.target.value);
                                if(e.target.value==="Source"){
                                    handleFilterDeletion("Source");
                                    return;
                                }else{
                                    setTaskFilter({...taskFilter,Source:[e.target.value]});
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
                            onChange={(e)=>{
                                setSelectedStatus(e.target.value);
                                if(e.target.value==="Status"){
                                    handleFilterDeletion("Status");
                                    return;
                                }else{
                                    setTaskFilter({...taskFilter,Status:[e.target.value]});
                                }
                            }}
                            className='custom-dropdown'
                        >
                            {["Status","Done","Not Started","In Progress","Waiting on someone else","Deferred","Deleted","Completed"].map(itm=><MenuItem value={itm}>{itm}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>

                <Box className='d-flex align-items-center'>
                <Box sx={{ m: 1, width: 240 }}>
                        <DateRangePicker
                            initialSettings={{
                                startDate: start.toDate(),
                                endDate: end.toDate(),
                                ranges: {
                                    'All':[
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
                            <div
                                id="reportrange"
                                className="col-4"
                                style={{
                                    background: '#fff',
                                    cursor: 'pointer',
                                    padding: '5px 10px',
                                    border: '1px solid #ccc',
                                    width: '100%',
                                }}
                            >
                                <i className="fa fa-calendar"></i>&nbsp;
                                <span>{label==="Invalid date - Invalid date"?"All":label}</span> <i className="fa fa-caret-down"></i>
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
                            onChange={(e)=>setSelectedSortBy(e.target.value)}
                            className='custom-dropdown'

                        >
                            <MenuItem value="Sort By">Sort By</MenuItem>
                            <MenuItem value="Client">Client Name</MenuItem>
                            <MenuItem value="EndDateTime">Due Date</MenuItem>
                            <MenuItem value="Priority">Priority</MenuItem>
                            <MenuItem value="Section">Section</MenuItem>
                            <MenuItem value="CreationDate">Start Date</MenuItem>
                            <MenuItem value="Status">Status</MenuItem>
                            <MenuItem value="Subject">Subject</MenuItem>
                        </Select>
                    </FormControl>
                        {selectedSortBy!=="Sort By"&&<Checkbox onClick={(e)=>handleSortBy(e.target.checked)} className='p-0' {...label} icon={<UpgradeIcon />} checkedIcon={<VerticalAlignBottomIcon />} />}
                    <FormControl size="small" className='select-border ms-3'>
                        {/* <InputLabel id="demo-simple-select-label">Sort By</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Sort By"
                            onChange={handleChange}
                            className='custom-dropdown'

                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>

                    </FormControl>


                    <ToggleButtonGroup className='ms-3' size='small'>
                        <ToggleButton value="left" aria-label="left aligned">
                            <DownloadIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>


                    
                </Box>
            </Box>

            <Box className='main-filter-box mt-1'>
                <Box className='row'>
                    {
                        allTask.length > 0 &&
                        allTask.slice(0, loadMore).map((item, index) => {
                            return <Box key={index} className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                                <Box className='todo-list-box white-box relative w-100' onClick={() => handleClickOpen(item)}>

                                    {/* <Checkbox className='text-blue check-todo'
                                    {...label}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<CheckCircleIcon />}
                                /> */}
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
                                        <Typography variant='subtitle1 sembold'>{item["EndDateTime"]&&startFormattingDate(item["EndDateTime"])}</Typography>
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
                                        <Button variant="outlined">Defer</Button>
                                    </Box>

                                </Box>
                            </Box>
                        })
                    }

                    {/* <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                    <Box className='todo-list-box white-box relative w-100'>

                        <Checkbox className='text-blue check-todo'
                            {...label}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                        />

                        <Typography variant='subtitle1 mb-4 d-block'><strong>Type:</strong> Signature Tast</Typography>

                        <Typography variant='h2' className='mb-2'>Lorem ipsome dolor site</Typography>

                        <Box className='d-flex align-items-center justify-content-between'>
                            <Typography variant='subtitle1'><pan className='text-gray'>
                                You <ArrowForwardIosIcon className='font-14' /> </pan>
                                {/* <a href='#'>Patrick</a>, 
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
                </Box> */}
                    {/* col end */}


                    {/* <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                    <Box className='todo-list-box white-box relative w-100'>

                        <Checkbox className='text-blue check-todo'
                            {...label}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                        />

                        <Typography variant='subtitle1 mb-4 d-block'><strong>Type:</strong> Signature Tast</Typography>

                        <Typography variant='h2' className='mb-2'>Lorem ipsome dolor site</Typography>

                        <Box className='d-flex align-items-center justify-content-between'>
                            <Typography variant='subtitle1'><pan className='text-gray'>
                                You <ArrowForwardIosIcon className='font-14' /> </pan>
                                {/* <a href='#'>Patrick</a>, 
                                <a href='#'>Patrick</a> <a href='#'> +6</a></Typography>
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
                </Box> */}
                    {/* col end */}


                    {/* <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                    <Box className='todo-list-box white-box relative w-100'>

                        <Checkbox className='text-blue check-todo'
                            {...label}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                        />

                        <Typography variant='subtitle1 mb-4 d-block'><strong>Type:</strong> Signature Tast</Typography>

                        <Typography variant='h2' className='mb-2'>Lorem ipsome dolor site</Typography>

                        <Box className='d-flex align-items-center justify-content-between'>
                            <Typography variant='subtitle1'><pan className='text-gray'>
                                You <ArrowForwardIosIcon className='font-14' /> </pan>
                                {/* <a href='#'>Patrick</a>,
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
                            <Button variant="text" className='btn-blue-2'>Defer</Button>
                        </Box>

                    </Box>
                </Box> */}
                    {/* col end */}

                </Box>
            </Box>
        </Box>
    )
}

export default TodoList

// rfce