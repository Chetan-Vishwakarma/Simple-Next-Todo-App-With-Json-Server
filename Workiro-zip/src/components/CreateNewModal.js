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
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';


import BookmarkIcon from '@mui/icons-material/Bookmark';

import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



export default function CreateNewModal() {

    const [anchorel, setAnchorel] = React.useState(null);
    const open2 = Boolean(anchorel);
    const handleClick = (event) => {
        setAnchorel(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorel(null);
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


    // test
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Select2 = Boolean(anchorEl);
    const handleClick3 = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose3 = () => {
        setAnchorEl(null);
    };
    // 


    const userAdd = Boolean(anchorel);


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
                        <Box className="d-flex align-items-center justify-content-between">
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



                        <Box className='row'>
                            <Box className='col-lg-8 border-end'>
                                <Box className="clearfix">
                                    <Box>
                                        <Box className="d-flex align-items-center">

                                            {/* <span class="material-symbols-outlined">
                                                edit_square
                                            </span> */}

                                            {/* <Checkbox
                                                className='create-tast p-1 text-blue'
                                                {...label}
                                                defaultChecked
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                            /> */}

                                            <Checkbox
                                                {...label}
                                                icon={<RadioButtonUncheckedOutlinedIcon />}
                                                checkedIcon={<CheckCircleIcon />}
                                            />

                                            <Box className>
                                                <input className='input-text' type='text' value="This is Subject" />
                                            </Box>
                                        </Box>

                                        {/* <Box className="d-flex align-items-center mt-3">
                                            <span class="material-symbols-outlined">
                                                edit_square
                                            </span>
                                            <Box className>
                                                <input className='font-14 input-text' type='text' value="Description" />
                                            </Box>
                                        </Box> */}

                                        <Box className="mt-3 mb-3">
                                            <textarea className='form-control textarea resize-none' placeholder='Description'></textarea>
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
                                    </Box>
                                </Box>

                                {/* end */}

                                <Box className="file-uploads" >
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
                                                    id="basic-menu"
                                                    anchorel={anchorel}
                                                    open={open2}
                                                    onClose={handleClose2}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={handleClose2}>
                                                        <ListItemIcon>
                                                            <LibraryAddIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        Add
                                                    </MenuItem>

                                                    <MenuItem onClick={handleClose2}><ListItemIcon>
                                                        <DeleteIcon fontSize="small" />
                                                    </ListItemIcon> Remove</MenuItem>
                                                </Menu>
                                            </Box>
                                        </Box>
                                        {/* <Button variant="text" className='btn-blue-2'>Select file</Button> */}
                                    </label>
                                </Box>

                                <Box className="mt-3 mb-3">
                                    <textarea className='form-control textarea resize-none' placeholder='Write a comment...'></textarea>
                                </Box>

                            </Box>
                            {/* col end */}

                            <Box className='col-lg-4'>

                                <Box className="border-bottom mb-2">
                                    <label className='font-14 sembold'>Index</label>



                                    <Box className='select-dropdown'>
                                        <Button
                                            id="basic-button"
                                            aria-controls={Select2 ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={Select2 ? 'true' : undefined}
                                            onClick={handleClick3}
                                        >
                                            Select Client
                                            <KeyboardArrowDownIcon />

                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={Select2}
                                            onClose={handleClose3}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose3}>Client 1</MenuItem>
                                            <MenuItem onClick={handleClose3}>Client 2</MenuItem>
                                            <MenuItem onClick={handleClose3}>Client 3</MenuItem>
                                        </Menu>
                                    </Box>

                                    <Box className='select-dropdown'>
                                        <Button
                                            id="basic-button"
                                            aria-controls={Select2 ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={Select2 ? 'true' : undefined}
                                            onClick={handleClick3}
                                        >
                                            Select Section
                                            <KeyboardArrowDownIcon />

                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={Select2}
                                            onClose={handleClose3}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose3}>Select Section 1</MenuItem>
                                            <MenuItem onClick={handleClose3}>Select Section 2</MenuItem>
                                            <MenuItem onClick={handleClose3}>Select Section 3</MenuItem>
                                        </Menu>
                                    </Box>


                                    <Box className='select-dropdown'>
                                        <Button
                                            id="basic-button"
                                            aria-controls={Select2 ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={Select2 ? 'true' : undefined}
                                            onClick={handleClick3}
                                        >
                                            Select Folder
                                            <KeyboardArrowDownIcon />

                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={Select2}
                                            onClose={handleClose3}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose3}>Select Section 1</MenuItem>
                                            <MenuItem onClick={handleClose3}>Select Section 2</MenuItem>
                                            <MenuItem onClick={handleClose3}>Select Section 3</MenuItem>
                                        </Menu>
                                    </Box>
                                    {/*  */}

                                </Box>

                                <Box className="border-bottom mb-2">

                                    <Box className='mb-2 '>
                                        <label className='font-14 semibold'>Due By</label>
                                        <LocalizationProvider className='pe-0 sadik' dateAdapter={AdapterDayjs} >
                                            <DatePicker className="datepicker w-100" />
                                        </LocalizationProvider>
                                    </Box>

                                </Box>

                                {/* <Box className="border-bottom  mb-2">
                                    <label>Status on</label>

                                </Box> */}

                                {/* <Box className="border-bottom">
                                    <label>Index</label>
                                    
                                </Box> */}


                                <Box className='mb-2 border-bottom'>
                                    <label className='font-14'>Start Date</label>
                                    <LocalizationProvider className='pe-0 sadik' dateAdapter={AdapterDayjs} >
                                        <DatePicker className="datepicker w-100" />
                                    </LocalizationProvider>
                                </Box>

                                <Box className='mb-2 border-bottom'>
                                    <label className='font-14 d-block'>Remind me
                                        <Checkbox {...label} defaultChecked size="small" />
                                    </label>

                                    <label className='font-14 d-block'>Reminder Date
                                    </label>

                                    <LocalizationProvider className='pe-0 sadik' dateAdapter={AdapterDayjs} >
                                        <DatePicker className="datepicker w-100" />
                                    </LocalizationProvider>
                                </Box>


                                <Box className='select-dropdown'>
                                    <Button
                                        id="basic-button"
                                        aria-controls={Select2 ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={Select2 ? 'true' : undefined}
                                        onClick={handleClick3}
                                    >
                                        Priority
                                        <KeyboardArrowDownIcon />

                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={Select2}
                                        onClose={handleClose3}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose3}>Low</MenuItem>
                                        <MenuItem onClick={handleClose3}>High</MenuItem>
                                    </Menu>
                                </Box>

                                <Box className='select-dropdown'>
                                    <Button
                                        id="basic-button"
                                        aria-controls={Select2 ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={Select2 ? 'true' : undefined}
                                        onClick={handleClick3}
                                    >
                                        Status
                                        <KeyboardArrowDownIcon />

                                    </Button>


                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={Select2}
                                        onClose={handleClose3}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose3}>Select Section 1</MenuItem>
                                        <MenuItem onClick={handleClose3}>Select Section 2</MenuItem>
                                        <MenuItem onClick={handleClose3}>Select Section 3</MenuItem>
                                    </Menu>
                                </Box>

                            </Box>
                            {/* col end */}
                        </Box>





                    </DialogContentText>

                    {/* <hr /> */}

                    <DialogActions className='px-0 w-100'>
                        <Box className="d-flex align-items-center justify-content-end w-100">
                            {/* <Box className="d-flex align-items-center">
                                <label className='pe-3'>Team Account:</label>
                                <Box className="dropdown-box">
                                    <Button className='btn-select'>All
                                        <span className="material-symbols-outlined ps-2">
                                            keyboard_arrow_down
                                        </span></Button>
                                    <Box className="btn-Select">
                                            <Button className='btn-white'>Action</Button>
                                            <Button className='btn-white'>Ser</Button>
                                            <Button className='btn-white'>Custom</Button>

                                            <hr />

                                            <Button className='btn-blue-2' size="small">Apply Now</Button>
                                        </Box>
                                </Box>
                            </Box> */}

                            {/* <Box>
                                <Button autoFocus className='btn-red me-2' onClick={handleClose}>
                                    cancel
                                </Button>
                                <Button className='btn-green' onClick={handleClose} autoFocus>
                                    Save
                                </Button>
                            </Box> */}
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>




    );
}