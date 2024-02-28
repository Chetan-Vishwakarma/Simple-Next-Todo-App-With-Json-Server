import * as React from 'react';
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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function TodoList() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box className="container-fluid p-0">

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
                <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
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
                                {/* <a href='#'>Patrick</a>, */}
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


                <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
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
                                {/* <a href='#'>Patrick</a>, */}
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
                </Box>
                {/* col end */}


                <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
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
                                {/* <a href='#'>Patrick</a>, */}
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
                </Box>
                {/* col end */}


                <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
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
                                {/* <a href='#'>Patrick</a>, */}
                                <a href='#'>Patrick</a></Typography>
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


                <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
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
                                {/* <a href='#'>Patrick</a>, */}
                                <a href='#'>Patrick</a> <a href='#'> +1</a></Typography>
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


                <Box className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
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
                                {/* <a href='#'>Patrick</a>, */}
                                <a href='#'>Patrick</a></Typography>
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

            </Box>
        </Box>
    )
}

export default TodoList


// rfce