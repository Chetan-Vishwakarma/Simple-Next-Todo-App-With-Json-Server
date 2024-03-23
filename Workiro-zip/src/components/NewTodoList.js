import React, { useState, useEffect } from 'react';
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


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function NewTodoList() {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));

    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));




    const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";

    let Cls = new CommanCLS(baseUrlPractice, agrno, Email, password);
    //let Clsp = new CommanCLS(baseUrlPractice, agrno, Email, password);

    const [allTask, setAllTask] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [loadMore, setLoadMore] = useState(20);


    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                        const formattedTasks = json.Table.map((task) => {
                            let timestamp;
                            if (task.EndDateTime) {
                                timestamp = parseInt(task.EndDateTime.slice(6, -2));
                            }

                            const date = new Date(timestamp);

                            return { ...task, EndDateTime: date };
                        });

                        setAllTask(formattedTasks.sort((a, b) => a.EndDateTime - b.EndDateTime));
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
            setLoadMore((preValue) => preValue + 20);
        }
    }

    useEffect(() => {
        Json_CRM_GetOutlookTask();
        window.addEventListener('scroll', eventHandler)
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


    // details dropdown
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState(null);
    const DocumentList = Boolean(anchorElDocumentList);
    const handleClickDocumentList = (event) => {
        console.log(event.currentTarget);
        event.stopPropagation();
        setAnchorElDocumentList(event.currentTarget);
    };
    const handleCloseDocument = () => {
        setAnchorElDocumentList(null);
    };


    // Document details List
    const [openDocumentDetailsList, setOpenDocumentDetailsList] = React.useState(false);
    const handleClickOpenDocumentDetailsList = () => {
        setOpenDocumentDetailsList(true);
    };
    const handleCloseDocumentDetailsList = () => {
        setOpenDocumentDetailsList(false);
    };

    return (
        <Box className="container-fluid p-0">
            <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal}></TaskDetailModal>

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
                    <Button variant="text" className='btn-blue-2 mb-2 ms-2'>Recently Access Documents</Button>
                </Box> */}
            </Box>


            {/*  */}
            <Box className='no-touch'>
                <nav class="cd-vertical-nav">
                    <ul>
                        <li><a href="#section1" class="active"><span class="label">Task Due <br />Soon</span>
                        <EventNoteIcon className='hover-icon' />
                        </a></li>
                        <li><a href="#section2" class=""><span class="label">Recently Updated</span><EventNoteIcon className='hover-icon' /></a></li>
                        <li><a href="#section3" class=""><span class="label">Pinned<br />Task</span><EventNoteIcon className='hover-icon' /></a></li>
                        <li><a href="#section4" class=""><span class="label">Recently Access Documents</span><EventNoteIcon className='hover-icon' /></a></li>
                    </ul>
                </nav>
            </Box>
            {/*  */}

            <Box className='pe-5'>

                <Typography variant='subtitle1' className='font-18 bold mb-2'>Task Due Soon</Typography>

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


                    {Array(9).fill("").map(() => {
                        return <>

                            <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                                <Box className='todo-list-box white-box relative w-100'
                                    onClick={() => handleClickOpen()}>

                                    <Radio className='text-red check-todo'
                                        checked
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "secondary",
                                            },
                                        }}
                                    />

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
                                                    className='font-14'
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

                <Box className='py-4 text-center'>
                    <Button variant="outlined">View More</Button>
                </Box>

                {/* row end */}
                <hr />


                <Typography variant='subtitle1' className='font-18 bold mb-2 mt-4'>Recently Updated</Typography>

                <Box className='row'>
                    {Array(9).fill("").map(() => {
                        return <>

                            <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
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
                    })}
                </Box>

                <Box className='py-4 text-center'>
                    <Button variant="outlined">View More</Button>
                </Box>

                {/* row end */}
                <hr />

                <Typography variant='subtitle1' className='font-18 bold mb-2 mt-4'>Pinned Task</Typography>

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
                <Typography variant='subtitle1' className='font-18 bold mb-2 mt-4'>Recently Access Documents</Typography>

                {/* <DocumentDetails></DocumentDetails> */}

                <Box className='row'>
                    {Array(20).fill("").map(() => {
                        return <>

                            <Box className='col-xxl-3 col-xl-4 col-md-6'>
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
                                                    lorem ipsome dolor site amet
                                                </Typography>
                                                <Typography variant="body1">
                                                    Size:  <span className='sembold'>0.00 KB</span> | Date <span className='sembold'>09/03/2024</span>
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
                            </Box>

                        </>
                    })}

                </Box>




            </Box>
        </Box>
    )
}

export default NewTodoList


// rfce