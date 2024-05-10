import React from 'react'
import { Box, Button, Typography, Menu, MenuItem, Dialog, DialogContent, DialogContentText, ListItemIcon, Radio, Checkbox, ToggleButton, ToggleButtonGroup, FormControl, Select } from '@mui/material';

function CreateTasksList() {
    return <>
        {(allTask.length > 0 ?
            (allTask.slice(0, loadMore).map((item, index) => {
                const arr = item.AssignedToID.split(",").filter(Boolean).map(Number);
                let userName = FilterAgs(item);
                return <Box key={index} className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                    <Box className='todo-list-box white-box relative w-100' onDoubleClick={() => handleClickOpen(item)}>

                        <Box className='check-todo'>
                            {/* <Badge color="primary" className='custom-budget' badgeContent={0} showZero>
                                                    <AttachFileIcon />
                                                </Badge> */}

                            <Radio className={item.Priority === 1 ? 'text-red' : item.Priority === 2 ? 'text-green' : 'text-grey'} checked
                                sx={{
                                    '&.Mui-checked': {
                                        color: "secondary",
                                    },
                                }}
                                size='small'
                            />

                            {/* <PushPinIcon className='pinicon'></PushPinIcon> */}

                        </Box>

                        <Typography variant='subtitle1 mb-4 d-block'><strong>Type:</strong> {item.Source}</Typography>

                        <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>

                        <Box className='d-flex align-items-center justify-content-between'>
                            <Typography variant='subtitle1'><pan className='text-gray'>
                                {FiterAssinee(item.OwnerID)} {arr.length > 1 && (<ArrowForwardIosIcon className='font-14' />)} </pan>
                                {/* <a href='#'>Patrick</a>, */}
                                <a href='javascript:void(0)'>{userName && userName.length > 0 ? userName[0].UserName : ""}</a> <a href='javascript:void(0)'> {arr.length > 2 && (<>
                                    +{arr.length - 2}
                                </>)}</a></Typography>
                            <Typography variant='subtitle1 sembold'>{item["CreationDate"] ? (startFormattingDate(item["CreationDate"])) : ""}</Typography>
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
                                        sx={{
                                            color: item.mstatus === "Completed" ? "green" : "primary"
                                        }}
                                    >
                                        {item.mstatus}
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
                                        <MenuItem onClick={handleClose}>
                                            <PriorityHighIcon />
                                            High</MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ReportProblemIcon />
                                            Medium</MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ArrowDownwardIcon />
                                            Low</MenuItem>
                                    </Menu>
                                </Box>

                            </Typography>
                        </Box>

                        <Box className='mt-2'>
                            <Button variant="text" disabled={item.mstatus === "Completed"} className='btn-blue-2 me-2' onClick={() => MarkComplete(item)} >Mark Complete</Button>
                            <DateRangePicker initialSettings={{
                                singleDatePicker: true,
                                showDropdowns: true,
                                startDate: item["EndDateTime"],
                                minYear: 1901,
                                maxYear: 2100,
                            }}
                                onCallback={(start) => {
                                    const date = start.format('YYYY/MM/DD');
                                    dispatch(updateTaskFieldFromRedux("EndDateTime", date, item));
                                }}
                            >
                                <Button variant="outlined" className='btn-outlin-2'>
                                    Defer
                                </Button>
                            </DateRangePicker>
                        </Box>

                    </Box>
                </Box>
            })) : (<DataNotFound />))}
    </>
}

export default CreateTasksList
