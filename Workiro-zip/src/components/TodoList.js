import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import user from "../images/user.jpg";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CommanCLS from '../services/CommanService';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function TodoList() {

    // modal start
    // modal start
    const [openModal, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };
    // modal end
    // modal end


    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

    let Cls = new CommanCLS(baseUrl, agrno, Email, password);

    const [allTask, setAllTask] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
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
                        setAllTask(json.Table);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_CRM_GetOutlookTask", err);
        }
    }

    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        Json_CRM_GetOutlookTask();
    }, []);

    function startFormattingDate(dt) {
        const timestamp = parseInt(/\d+/.exec(dt));
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        return formattedDate === "Invalid Date" ? "01/01/1900" : formattedDate;
    }


    // status dropdown
    const [anchorElSelect, setAnchorElSelect] = React.useState(null);
    const openDropdown = Boolean(anchorElSelect);
    const handleClickDroppdown = (event) => {
        setAnchorElSelect(event.currentTarget);
    };
    const handleCloseDropdown = () => {
        setAnchorElSelect(null);
    };

    return (
        <Box className="container-fluid p-0">


            {/* modal start */}
            <React.Fragment>



                <Dialog
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

                                    <div>
                                        <Button
                                            id="fade-button"
                                            aria-controls={open ? 'fade-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            className='min-width-auto'
                                        >
                                            Priority
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
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                        </Menu>
                                    </div>

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

                                <Box className="d-flex align-items-center mb-4 flex-wrap">
                                    <Box className="user-img-list me-2">
                                        <img src={user} />
                                        {/* <p>PJ</p> */}
                                    </Box>
                                    <Box className="user-img-list me-2">
                                        <p>PJ</p>
                                    </Box>
                                    <Box className="user-img-list user-total-list me-2">
                                        <p>14+</p>
                                    </Box>
                                </Box>
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

                            <Box className='d-flex'>
                                <Button variant="text" className='btn-blue-2 me-2'>Mark complete</Button>
                                <Button variant="text" className='btn-blue-2'>Defer</Button>
                            </Box>

                            <Box className='white-box'>
                                <Box className='chat-box d-flex align-items-end'>

                                    <Box class="client-img me-3 mb-0">
                                        <img src={user} />
                                    </Box>

                                    <Box class="chat-message me-2">
                                        <Box class="inner-chat-message me-2">
                                            <Typography variant="body1">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Typography>

                                            <Box className='d-flex'>
                                                <Typography variant="body1">6.30 pm</Typography>


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
                                                    >
                                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                                    </Menu>
                                                </div>

                                            </Box>
                                        </Box>
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
                </Dialog>
            </React.Fragment>
            {/* modal end */}


            <Typography variant='subtitle1' className='font-18 bold mb-2'>Select Filter</Typography>
            <Box className="d-flex align-items-center mb-4 flex-wrap">
                <Box className="user-img-list me-2">
                    <img src={user} />
                    {/* <p>PJ</p> */}
                </Box>
                <Box className="user-img-list me-2">
                    <p>PJ</p>
                </Box>
                <Box className="user-img-list me-2">
                    <img src={user} />
                    {/* <p>PJ</p> */}
                </Box>
                <Box className="user-img-list me-2">
                    <p>AP</p>
                </Box>
            </Box>


            <Box className='row'>
                {
                    allTask.length > 0 &&
                    allTask.map((item, index) => {
                        return <Box key={index} className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                            <Box className='todo-list-box white-box relative w-100' onClick={handleClickOpen}>

                                <Checkbox className='text-blue check-todo'
                                    {...label}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<CheckCircleIcon />}
                                />

                                <Typography variant='subtitle1 mb-4 d-block'><strong>Type:</strong> {item.Source}</Typography>

                                <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>

                                <Box className='d-flex align-items-center justify-content-between'>
                                    <Typography variant='subtitle1'><pan className='text-gray'>
                                        {item.UserName} <ArrowForwardIosIcon className='font-14' /> </pan>
                                        {/* <a href='#'>Patrick</a>, */}
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
                                                {item.Priority === 1 ? "High" : item.Priority === 2 ? "Medium" : "Low"}
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
    )
}

export default TodoList


// rfce