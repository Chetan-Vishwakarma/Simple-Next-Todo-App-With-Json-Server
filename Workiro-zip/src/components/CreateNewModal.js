import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import user from "../images/user.jpg";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function CreateNewModal() {

    const [anchorEl, userEl, setAnchorEl] = React.useState(null);



    const open2 = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl(null);
    };
    // 

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // dropdown add

    // 
    const [userDropdownanchorEl, setuserDropdownAnchorEl] = React.useState(null);
    const UserDropdownopen = Boolean(userDropdownanchorEl);
    const handleUserClick = (event) => {
        setuserDropdownAnchorEl(event.currentTarget);
    };
    const handleUserClose = () => {
        setuserDropdownAnchorEl(null);
    };
    // 


    const userAdd = Boolean(anchorEl);


    return (

        <React.Fragment>

            <Button className='btn-blue btn-round btn-block' onClick={handleClickOpen}><span className="material-symbols-outlined">
                edit_square
            </span> <span className='ps-2 create-text'>Create New</span></Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className='custom-modal'
            >

                <DialogContent>
                    <DialogContentText>
                        <Box className="d-flex align-items-center justify-content-between pt-2">
                            <Box className="dropdown-box" >
                                <Button className='btn-select'>Select Type
                                    <span className="material-symbols-outlined ps-2">
                                        keyboard_arrow_down
                                    </span></Button>
                                {/* <Box className="btn-Select">
                                    <Button className='btn-white'>Action</Button>
                                    <Button className='btn-white'>Ser</Button>
                                    <Button className='btn-white'>Custom</Button>

                                    <hr />

                                    <Button className='btn-blue-2' size="small">Apply Now</Button>
                                </Box> */}
                            </Box>

                            <Button onClick={handleClose} autoFocus sx={{ minWidth: 30, }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>

                        </Box>

                        <hr />

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box>
                                <Box className="d-flex align-items-center">
                                    <span class="material-symbols-outlined">
                                        edit_square
                                    </span>
                                    <Box className>
                                        <input className='input-text' type='text' value="This ia Subject" />
                                    </Box>
                                </Box>




                                <div className='mt-4'>
                                    <Button
                                        id="basic-button5"
                                        aria-controls={UserDropdownopen ? 'basic-menu5' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={UserDropdownopen ? 'true' : undefined}
                                        onClick={handleUserClick}
                                        className='p-0 w-auto d-inline-block'
                                    >
                                        <Box className="d-flex align-items-center">
                                            <Box className="d-flex">
                                                <span class="material-symbols-outlined">
                                                    person_add
                                                </span>
                                            </Box>

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



                            </Box>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker className="datepicker" />
                                </LocalizationProvider>
                            </Box>
                        </Box>

                        <Box className="file-uploads">
                            <input type='file' id='file-upload' />
                            <label className='file-uploads-label' for="file-upload">
                                <Box className="d-flex align-items-center">
                                    <span className="material-symbols-outlined icon">
                                        cloud_upload
                                    </span>
                                    <Box className="upload-content pe-3">
                                        <Typography variant="h4">Select a file or drag and drop here</Typography>
                                        <Typography variant="body1">JPG, PNG or PDF, file size no more than 10MB</Typography>
                                    </Box>
                                </Box>
                                <Button variant="text" className='btn-blue-2'>Select file</Button>
                            </label>
                        </Box>

                        <Box className="file-uploads">
                            <input type='file' id='file-upload' />
                            <label className='file-uploads-label' for="file-upload">
                                <Box className="d-flex align-items-center">
                                    <span className="material-symbols-outlined icon">
                                        description
                                    </span>
                                    <Box className="upload-content pe-3">
                                        <Typography variant="h4">my_test_file.pdf</Typography>
                                        <Typography variant="body1">
                                            Added Aug   |  at 08:04 PM  |  56 KB
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box className="d-flex align-items-center">
                                    <Button variant="text" className='btn-blue-2'>Sign</Button>
                                    <Box className='ps-2'>
                                        <Button
                                            className='p-0'
                                            sx={{
                                                minWidth: 24,
                                            }}
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu2' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <span className="material-symbols-outlined">
                                                more_vert
                                            </span>
                                        </Button>
                                        <Menu
                                            id="basic-menu2"
                                            anchorEl={anchorEl}
                                            open={open2}
                                            onClose={handleClose2}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose2}>Add</MenuItem>
                                            <MenuItem onClick={handleClose2}>Remove</MenuItem>
                                        </Menu>
                                    </Box>
                                </Box>
                                {/* <Button variant="text" className='btn-blue-2'>Select file</Button> */}
                            </label>
                        </Box>

                        <Box className="mt-3 mb-3">
                            <textarea className='form-control textarea resize-none' placeholder='Write a comment...'></textarea>
                        </Box>

                        <Box className="d-flex align-items-center flex-wrap justify-content-between">
                            <Box className="d-flex">
                                <Box className="dropdown-box pe-4">
                                    <Button className='btn-select'>Select Client
                                        <span className="material-symbols-outlined ps-2">
                                            keyboard_arrow_down
                                        </span></Button>
                                    {/* <Box className="btn-Select">
                                    <Button className='btn-white'>Action</Button>
                                    <Button className='btn-white'>Ser</Button>
                                    <Button className='btn-white'>Custom</Button>

                                    <hr />

                                    <Button className='btn-blue-2' size="small">Apply Now</Button>
                                </Box> */}
                                </Box>

                                <Box className="dropdown-box">
                                    <Button className='btn-select'>Select Section
                                        <span className="material-symbols-outlined ps-2">
                                            keyboard_arrow_down
                                        </span></Button>
                                    {/* <Box className="btn-Select">
                                    <Button className='btn-white'>Action</Button>
                                    <Button className='btn-white'>Ser</Button>
                                    <Button className='btn-white'>Custom</Button>

                                    <hr />

                                    <Button className='btn-blue-2' size="small">Apply Now</Button>
                                </Box> */}
                                </Box>
                            </Box>



                        </Box>
                    </DialogContentText>

                    <hr />

                    <DialogActions className='px-0 w-100'>
                        <Box className="d-flex align-items-center justify-content-between w-100">
                            <Box className="d-flex align-items-center">
                                <label className='pe-3'>Team Account:</label>
                                <Box className="dropdown-box">
                                    <Button className='btn-select'>All
                                        <span className="material-symbols-outlined ps-2">
                                            keyboard_arrow_down
                                        </span></Button>
                                    {/* <Box className="btn-Select">
                                            <Button className='btn-white'>Action</Button>
                                            <Button className='btn-white'>Ser</Button>
                                            <Button className='btn-white'>Custom</Button>

                                            <hr />

                                            <Button className='btn-blue-2' size="small">Apply Now</Button>
                                        </Box> */}
                                </Box>
                            </Box>

                            <Box>
                                <Button autoFocus className='btn-red me-2' onClick={handleClose}>
                                    cancel
                                </Button>
                                <Button className='btn-green' onClick={handleClose} autoFocus>
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>




    );
}