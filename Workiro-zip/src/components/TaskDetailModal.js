import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BallotIcon from '@mui/icons-material/Ballot';
import Link from '@mui/material/Link';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DescriptionIcon from '@mui/icons-material/Description';
import { Radio } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ListItemIcon from '@mui/material/ListItemIcon';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import user from "../images/user.jpg";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from "axios";


function TaskDetailModal({selectedTask,openModal, setOpen}) {

    const [allTask,setAllTask] = useState([]);

    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

    useEffect(()=>{
        const Json_CRM_GetOutlookTask=async()=>{
            let res = await axios.post(`${baseUrl}Json_CRM_GetOutlookTask`,{
                Email: "nabs@docusoft.net",
                agrno: "0261",
                password: "ZG9jdXNvZnQ="
            });
            console.log("Json_CRM_GetOutlookTask",JSON.parse(res.data.d));
        }
        Json_CRM_GetOutlookTask();
        return ()=>{
            console.log("Modal is Closed");
        }
    },[]);
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
                            <Box className="d-flex">

                                <Box>
                                    <Button
                                        id="fade-button5"
                                        aria-controls={openDropdown ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openDropdown ? 'true' : undefined}
                                        onClick={handleClickDroppdown}
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

                                <Typography variant='subtitle1' className='font-16 sembold mb-2'>Select Type</Typography>

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
                                                <AttachmentIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Waiting on someone else</MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <AttachmentIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Deferred</MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <AttachmentIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Done</MenuItem>
                                        <MenuItem onClick={handleClose}><ListItemIcon>
                                            <AttachmentIcon fontSize="medium" />
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
                        <Typography variant="h4">Contact Agreement Update</Typography>

                        <Box className='d-flex flex-wrap justify-content-between'>
                            <Box className='d-flex'>
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

                                        <Box className="user-img-list ms-2">
                                            <img src={user} />
                                            {/* <p>PJ</p> */}
                                        </Box>

                                        <Box className="user-img-list ms-2">
                                            <p>PJ</p>
                                        </Box>

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

                        <Box className='d-flex flex-wrap justify-content-between align-items-center'>

                            <Link href="#" className='text-decoration-none d-flex'><BallotIcon className='me-1' /> 15 Documents</Link>

                            <Box className='d-flex'>
                                <Box className='mb-2 border-bottom me-2 width-150'>
                                    <label className='font-14 text-black'>Start Date</label>
                                    <LocalizationProvider className='pe-0 sadik' dateAdapter={AdapterDayjs} >
                                        <DatePicker className="datepicker w-100" />
                                    </LocalizationProvider>
                                </Box>

                                <Box className="border-bottom mb-2 width-150">
                                    <Box className='mb-2 '>
                                        <label className='font-14 semibold text-black'>Due By</label>
                                        <LocalizationProvider className='pe-0 sadik' dateAdapter={AdapterDayjs} >
                                            <DatePicker className="datepicker w-100" />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box className="mt-3 mb-3">
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

                    <DialogActions className='px-0 w-100'>
                        <Box className="d-flex align-items-center justify-content-end w-100">

                            {/* <Box>
    <Button autoFocus className='btn-red me-2' onClick={handleCloseModal}>
        cancel
    </Button>
    <Button className='btn-green' onClick={handleCloseModal} autoFocus>
        Save
    </Button>
</Box> */}
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog >
        </React.Fragment >

    )
}

export default TaskDetailModal