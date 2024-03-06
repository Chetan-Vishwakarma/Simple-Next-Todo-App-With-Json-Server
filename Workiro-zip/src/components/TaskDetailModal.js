import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Link, Chip, Stack, ListItemIcon, Radio, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import {AdapterDayjs,LocalizationProvider,DatePicker} from '@mui/x-date-pickers';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BallotIcon from '@mui/icons-material/Ballot';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DescriptionIcon from '@mui/icons-material/Description';
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import user from "../images/user.jpg";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
// import {CloudUploadIcon, DriveFileRenameOutlineIcon, TravelExploreIcon, CloudDownloadIcon} from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';




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


function TaskDetailModal({ selectedTask, openModal, setOpen }) {

    const [allTask, setAllTask] = useState([]);

    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

    useEffect(() => {
        const Json_CRM_GetOutlookTask = async () => {
            let res = await axios.post(`${baseUrl}Json_CRM_GetOutlookTask`, {
                Email: "nabs@docusoft.net",
                agrno: "0261",
                password: "ZG9jdXNvZnQ="
            });
            console.log("Json_CRM_GetOutlookTask", JSON.parse(res.data.d));
        }
        Json_CRM_GetOutlookTask();
        return () => {
            console.log("Modal is Closed");
        }
    }, []);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleCloseModal = () => {
        setOpen(false);
    };

    const [anchorElSelect, setAnchorElSelect] = React.useState(null);
    const openDropdown = Boolean(anchorElSelect);

    const handleClickDroppdown = (event) => {
        setAnchorElSelect(event.currentTarget);
    };
    const handleCloseDropdown = () => {
        setAnchorElSelect(null);
    };


    // dropdown add
    const [userDropdownanchorEl, setuserDropdownAnchorEl] = React.useState(null);
    const UserDropdownopen = Boolean(userDropdownanchorEl);
    const handleUserClick = (event) => {
        setuserDropdownAnchorEl(event.currentTarget);
    };
    const handleUserClose = () => {
        setuserDropdownAnchorEl(null);
    };
    // end


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        // setAnchorEl(null);
        setOpen(false)
    };


    // document details modal
    const [documentLis, setOpenDocumentList] = React.useState(false);
    const handleClickOpen = () => {
        setOpenDocumentList(true);
    };
    const handleCloseDocumentList = () => {
        setOpenDocumentList(false);
    };

    // details dropdown
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState(null);
    const DocumentList = Boolean(anchorElDocumentList);
    const handleClickDocumentList = (event) => {
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

    // accordian
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


    return (

        <React.Fragment >

            <Dialog Dialog
                fullScreen={fullScreen}
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="responsive-dialog-title"
                className='custom-modal'
            >

                <DialogContent>
                    <DialogContentText>

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="d-flex align-items-center">

                                <Box>
                                    <Button
                                        id="fade-button5"
                                        aria-controls={openDropdown ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openDropdown ? 'true' : undefined}
                                        onClick={handleClickDroppdown}
                                        className='min-width-auto'
                                    >

                                        <CheckCircleIcon />

                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button5',
                                        }}
                                        anchorElSelect={anchorElSelect}
                                        open={openDropdown}
                                        onClose={handleCloseDropdown}
                                    >
                                        <MenuItem onClick={handleCloseDropdown}>Profile</MenuItem>
                                        <MenuItem onClick={handleCloseDropdown}>My account</MenuItem>
                                        <MenuItem onClick={handleCloseDropdown}>Logout</MenuItem>
                                    </Menu>
                                </Box>


                                {/* <div>
                            <Button
                                id="basic-button-status"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <CheckCircleIcon />
                                
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button-status',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div> */}

                                <Typography variant='subtitle1' className='font-16 sembold'>Select Type</Typography>

                            </Box>

                            <Box className="d-flex">

                                <Box>
                                    <Button
                                        id="fade-button"
                                        aria-controls={open ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        className='min-width-auto'
                                    >
                                        Status
                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <DoNotDisturbAltIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Not Started
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <PublishedWithChangesIcon fontSize="medium" />
                                            </ListItemIcon>
                                            In Progress
                                        </MenuItem>

                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <HourglassBottomIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Waiting on someone else
                                        </MenuItem>



                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <ErrorOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Deferred</MenuItem>

                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <CheckCircleOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Done</MenuItem>



                                        <MenuItem onClick={handleClose}><ListItemIcon>
                                            <CheckCircleOutlineIcon fontSize="medium" />
                                        </ListItemIcon>
                                            Complete
                                        </MenuItem>
                                    </Menu>
                                </Box>

                                <div>
                                    <Button
                                        id="fade-button"
                                        aria-controls={open ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        className='min-width-auto px-0 text-gray'
                                    >

                                        <MoreVertIcon />

                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                    </Menu>
                                </div>

                                <Button onClick={handleClose} autoFocus sx={{ minWidth: 30, }}>
                                    <span className="material-symbols-outlined text-black">
                                        cancel
                                    </span>
                                </Button>

                            </Box>
                        </Box>
                        <hr />
                        <Typography variant="h4" className='font-18 bold mb-2 text-black'>Contact Agreement Update</Typography>

                        <Box className='d-flex flex-wrap justify-content-between align-items-center'>
                            <Box className='d-flex font-14 sembold'>
                                <p className='pe-2 me-2 border-end'><span className='text-black'>Client:</span> ABC Limited</p>
                                <p><span className='text-black'>Section:</span> ABC Limited</p>
                            </Box>

                            {/* <Box className="d-flex align-items-center mb-4 flex-wrap">
                        <Box className="user-img-list me-2">
                            <img src={user} />
                        </Box>
                        <Box className="user-img-list me-2">
                            <p>PJ</p>
                        </Box>
                        <Box className="user-img-list user-total-list me-2">
                            <p>14+</p>
                        </Box>
                    </Box> */}

                            <div className='mb-2'>
                                <Button
                                    id="basic-button5"
                                    aria-controls={UserDropdownopen ? 'basic-menu5' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={UserDropdownopen ? 'true' : undefined}
                                    onClick={handleUserClick}
                                    className='p-0 w-auto d-inline-block'
                                >
                                    <Box className="d-flex align-items-center">

                                        <Box className="user-img-list ms-2 admin">
                                            <img src={user} />
                                            {/* <p>PJ</p> */}
                                        </Box>

                                        <ArrowForwardIosIcon className='ms-2' />

                                        <Box className="user-img-list ms-2">
                                            <img src={user} />
                                            {/* <p>PJ</p> */}
                                        </Box>

                                        <Box className="user-img-list ms-2">
                                            <p>AP</p>
                                        </Box>

                                        <Box className="d-flex ms-3">
                                            <span class="material-symbols-outlined">
                                                person_add
                                            </span>
                                        </Box>

                                        {/* <Box className="user-img-list ms-2 user-total-list">
                                            <p>15+</p>
                                        </Box> */}

                                    </Box>


                                </Button>
                                <Menu
                                    id="basic-menu5"
                                    anchorEl={userDropdownanchorEl}
                                    open={UserDropdownopen}
                                    onClose={handleUserClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button5',
                                    }}
                                    className='user-list-dropdown'
                                >

                                    <Box className='mb-1 mt-3 px-3'>
                                        <input type='text' className='form-control' placeholder='Type a name or email address' />
                                    </Box>


                                    <Box className='inner-user-list-dropdown'>
                                        <p className='sembold'>Assigned</p>

                                        <Box className='box-user-list-dropdown'>
                                            <button type='button'>
                                                <Box className="user-img-list me-2">
                                                    <img src={user} />
                                                    {/* <p>PJ</p> */}
                                                </Box>
                                                <p>Patrick Jones</p>

                                                <a href='' className='close'><span class="material-symbols-outlined">
                                                    close
                                                </span></a>
                                            </button>

                                            <button type='button'>
                                                <Box className="user-img-list me-2">
                                                    <p>PJ</p>
                                                </Box>
                                                <p>Patrick Jones</p>

                                                <a href='' className='close'><span class="material-symbols-outlined">
                                                    close
                                                </span></a>
                                            </button>
                                        </Box>
                                    </Box>

                                    <Box className='inner-user-list-dropdown'>
                                        <p className='sembold'>My Team</p>

                                        <Box className='box-user-list-dropdown'>
                                            <button type='button'>
                                                <Box className="user-img-list me-2">
                                                    <img src={user} />
                                                    {/* <p>PJ</p> */}
                                                </Box>
                                                <p>Patrick Jones</p>
                                            </button>

                                            <button type='button'>
                                                <Box className="user-img-list me-2">
                                                    <p>PJ</p>
                                                </Box>
                                                <p>Patrick Jones</p>
                                            </button>
                                        </Box>
                                    </Box>
                                </Menu>
                            </div>
                            {/* dropdown end */}

                        </Box>
                        {/*  */}

                        <Box className='d-flex flex-wrap justify-content-between'>

                            <Link href="#" className='text-decoration-none d-flex'
                                onClick={handleClickOpen}
                            ><BallotIcon className='me-1' /> 15 Documents</Link>

                            <Box className='d-flex'>
                                <Box className='mb-2 border-bottom me-3 width-150'>
                                    <label className='font-14 text-black'>Start Date</label>
                                    <LocalizationProvider className='pe-0 ' dateAdapter={AdapterDayjs} >
                                        <DatePicker className="datepicker w-100"
                                            format="DD/MM/YYYY"
                                        />
                                    </LocalizationProvider>
                                </Box>

                                <Box className="border-bottom mb-2 width-150">
                                    <Box className='mb-2 '>
                                        <label className='font-14 semibold text-black'>Due By</label>
                                        <LocalizationProvider className='pe-0 ' dateAdapter={AdapterDayjs} >
                                            <DatePicker className="datepicker w-100" />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box className="mt-2 mb-3">
                            <textarea className='form-control textarea resize-none' placeholder='Description'></textarea>
                        </Box>

                        <Box className='d-flex mb-3'>
                            <Button variant="text" className='btn-blue-2 me-2'>Mark complete</Button>
                            <Button variant="text" className='btn-blue-2'>Defer</Button>
                        </Box>

                        <Box className='white-box pb-0 mb-0'>

                            {/* Reciever Start */}
                            <Box className='chat-box d-flex align-items-end mb-3 reciever'>
                                <Box class="client-img me-3 mb-0 ms-0">
                                    <img src={user} />
                                </Box>
                                <Box class="chat-message me-2">
                                    <Box class="inner-chat-message me-2">
                                        <Typography variant="body1">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Typography>
                                        <Box className='d-flex align-items-center justify-content-end'>
                                            <Typography variant="body1">6.30 pm</Typography>

                                            <Box className=''>
                                                <Button
                                                    id="fade-button"
                                                    aria-controls={open ? 'fade-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    className='min-width-auto px-0 text-gray'
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                                <Menu
                                                    id="fade-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'fade-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                                                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                                                </Menu>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            {/* Reciever End */}

                            {/* Sender Start */}
                            <Box className='chat-box d-flex align-items-end mb-3 sender'>
                                <Box class="chat-message">
                                    <Box class="inner-chat-message ms-auto">
                                        <Typography variant="body1">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Typography>
                                        <Box className='d-flex align-items-center justify-content-end'>
                                            <Typography variant="body1">6.30 pm</Typography>

                                            <Box className=''>
                                                <Button
                                                    id="fade-button"
                                                    aria-controls={open ? 'fade-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    className='min-width-auto px-0 text-gray'
                                                >
                                                    <MoreVertIcon className='text-white' />
                                                </Button>
                                                <Menu
                                                    id="fade-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'fade-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                                                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                                                </Menu>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>
                            {/* Sender End */}

                            <Box className='text-center py-3 file-uploaded'>
                                <DescriptionIcon className='mb-2' />
                                <Typography variant="body1" className='font-16 sembold'>
                                    File uploaded - test_file_12.doc (10kb)
                                </Typography>
                            </Box>

                            <Box className='d-flex align-items-center main-file-upload'>

                                <Box className='w-100'>

                                    {/* <Stack direction="row" className='py-3' spacing={1}>
                                <Chip label="fileName123.Doc" variant="outlined" onDelete={handleDelete} />
                                <Chip label="fileName123.PDF" variant="outlined" onDelete={handleDelete} />
                            </Stack> */}

                                    <textarea className='textarea' placeholder='Write massage'></textarea>

                                </Box>



                                <Box className='d-flex d-flex align-items-center ms-3'>
                                    <Box className='file-upload'>
                                        <input type='file' id='Fileupload' />
                                        <label for='Fileupload'>
                                            <AttachmentIcon />
                                        </label>
                                    </Box>

                                    <Button className='btn-blue-2 ms-3' size="small" startIcon={<SendIcon />}>Send</Button>

                                </Box>
                            </Box>
                        </Box>

                    </DialogContentText>

                    {/* <hr /> */}

                    {/* <DialogActions className='px-0 w-100'>
                        <Box className="d-flex align-items-center justify-content-end w-100">

                            <Box>
                                <Button autoFocus className='btn-red me-2' onClick={handleCloseModal}>
                                    cancel
                                </Button>
                                <Button className='btn-green' onClick={handleCloseModal} autoFocus>
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </DialogActions> */}

                </DialogContent>
            </Dialog >





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
                {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Box className="d-flex align-items-center justify-content-between">
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
                                            file_names_123.pdf
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
                                            test_three.doc
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
                                            document_654.pdf
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
                    </DialogContentText>
                </DialogContent>
            </Dialog>



            {/* document modal list details */}
            <Dialog
                open={openDocumentDetailsList}
                onClose={handleCloseDocumentDetailsList}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
                sx={{
                    maxWidth: 640,
                    margin: '0 auto'
                }}
            >
                <DialogContent>
                    <DialogContentText>

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="dropdown-box">
                                <Typography variant="h4" className='font-18 bold mb-2 text-black'>
                                    Document Details
                                </Typography>
                            </Box>

                            {/*  */}
                            <Button onClick={handleCloseDocumentList} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>

                        <div>
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
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="left" className='bold'>{row.document}</TableCell>
                                                        <TableCell align="left">{row.details}</TableCell>
                                                    </TableRow>
                                                ))}
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
                                                            This File is Test Files.pdf
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

                        </div>



                    </DialogContentText>
                </DialogContent>

            </Dialog>


        </React.Fragment >

    )
}

export default TaskDetailModal