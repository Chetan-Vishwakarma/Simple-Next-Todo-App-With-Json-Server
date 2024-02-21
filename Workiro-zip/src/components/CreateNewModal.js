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

    return (

        <React.Fragment>

            <Button className='btn-blue btn-round btn-block' onClick={handleClickOpen}><span class="material-symbols-outlined">
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
                                    <span class="material-symbols-outlined ps-2">
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
                                <span class="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>

                        </Box>

                        <hr />

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box>
                                <h5 className='text-black mb-2'>Subject </h5>

                                <AvatarGroup max={4}>
                                    <Avatar alt="Remy Sharp" src={ user } />
                                    <Avatar alt="Travis Howard" src={ user } />
                                    <Avatar alt="Cindy Baker" src={ user } />
                                    <Avatar alt="Agnes Walker" src={ user } />
                                    <Avatar alt="Trevor Henderson" src={ user } />
                                </AvatarGroup>
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
                                    <span class="material-symbols-outlined icon">
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
                                    <span class="material-symbols-outlined icon">
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
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <span class="material-symbols-outlined">
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
                                            <MenuItem onClick={handleClose2}>Profile dfdfgsdfg</MenuItem>
                                            <MenuItem onClick={handleClose2}>My account</MenuItem>
                                            <MenuItem onClick={handleClose2}>Logout</MenuItem>
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
                                        <span class="material-symbols-outlined ps-2">
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
                                        <span class="material-symbols-outlined ps-2">
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


                            <Box className="d-flex align-items-center">
                                <label className='pe-3'>Team Account:</label>
                                <Box className="dropdown-box">
                                    <Button className='btn-select'>All
                                        <span class="material-symbols-outlined ps-2">
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

                    <DialogActions className='px-0'>
                        <Button autoFocus className='btn-red' onClick={handleClose}>
                            cancel
                        </Button>
                        <Button className='btn-green' onClick={handleClose} autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </React.Fragment>




    );
}