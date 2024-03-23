import React, { useState, useEffect } from 'react';

import { Box, Button, Typography, Menu, MenuItem, Dialog, DialogContent, DialogContentText, ListItemIcon, Radio, Checkbox, TextField, Autocomplete, ToggleButton, ToggleButtonGroup, FormControl, Select, } from '@mui/material';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import VerifiedIcon from '@mui/icons-material/Verified';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import DraftsIcon from '@mui/icons-material/Drafts';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BallotIcon from '@mui/icons-material/Ballot';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function PortalDetails() {

    // new portal modal
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    // document modal
    const [DocumentSent, setDocumentSent] = React.useState(false);
    const handleClickDocumentSent = () => {
        setDocumentSent(true);
    };
    const DocumentHandleClose = () => {
        setDocumentSent(false);
    };



    return (
        <>
            <Box className='mb-3'>
                <Box className='d-flex align-items-center mb-2'>
                    <Checkbox
                        {...label}
                        icon={<NewReleasesIcon />}
                        checkedIcon={<VerifiedIcon />}
                    />
                    <h5 className='mb-0 text-black'>Subject line from the Portal Message</h5>
                </Box>
                <Box className='font-14 well mb-3'>
                    <p className='mb-0'>
                        After conducting thorough research on your company's impressive track record and innovative approach, I believe there could be significant synergies between our organizations. Both of our companies share a commitment to excellence and a drive for innovation, making me optimistic about the potential for a mutually beneficial partnership.
                        I would like to propose a meeting at your earliest convenience to discuss how we can leverage each other's strengths to drive growth and success.
                    </p>
                </Box>

                <Box className='d-flex flex-wrap align-items-center justify-content-between'>
                    <Box className='d-flex'>
                        <MarkunreadIcon className='text-blue' />
                        {/* <DraftsIcon /> */}
                        <Box className='ps-3'>
                            <h5 className='font-14 text-black mb-1'>Last Viewed On</h5>
                            <p className='font-12 text-gray sembold mb-2'>10/11/24 09:50PM</p>
                            <Button className='btn-blue-2' size="small" startIcon={<ScheduleIcon />} onClick={handleClickOpen}>View History</Button>
                        </Box>
                    </Box>

                    <Box className='d-flex'>
                        <VerifiedIcon className='text-green' />
                        {/* <NewReleasesIcon className='text-warning' /> */}

                        {/* <DraftsIcon /> */}
                        <Box className='ps-3'>
                            <h5 className='font-14 text-black mb-1'>Message approved </h5>
                            <p className='font-12 text-gray sembold mb-2'>10/11/24 09:50PM</p>
                            <Button className='btn-blue-2' size="small" startIcon={<ScheduleIcon />}>Certificate of Approval</Button>

                            {/* <Button className='btn-blue-2 btn btn-warning' size="small" sx={{
                                            background: '#ffc107 !important'
                                        }} startIcon={<NewReleasesIcon />}>Pending Approval</Button> */}
                        </Box>
                    </Box>

                    <Box className='d-flex'>
                        {/* <MarkunreadIcon /> */}
                        <DraftsIcon />
                        <Box className='ps-3'>
                            <h5 className='font-14 text-black mb-1'>Start Date</h5>
                            <p className='font-12 text-gray sembold'>10/11/24</p>
                        </Box>
                        <Box className='ps-3'>
                            <h5 className='font-14 text-black mb-1'>End Date</h5>
                            <p className='font-12 text-gray sembold mb-0'>10/11/24</p>
                        </Box>
                    </Box>

                </Box>

                <hr />

                <Box className="d-flex flex-wrap">
                    <label className='text-decoration-none d-flex pointer' onClick={handleClickDocumentSent}><BallotIcon className='me-1' /> 15 Documents</label>
                    {/* <AttachmentView attachmentlist={attachmentFile} setAttOpen={setAttOpen} attOpen={attOpen}></AttachmentView> */}
                </Box>

            </Box>


            {/* history modal start */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="align-items-center d-flex">
                                <Typography variant="h4" className='font-18 bold text-black mb-0'>
                                    View History
                                </Typography>
                            </Box>

                            {/*  */}

                            <Box className='d-flex'>
                                <Button onClick={handleClose} className='p-0'>
                                    <span className="material-symbols-outlined text-black">
                                        cancel
                                    </span>
                                </Button>
                            </Box>
                        </Box>

                        <hr />

                        <Box class="ml-auto mr-auto">
                            <Box class="activity-timeline">
                                <ul class="timeline-ul">

                                    {Array(5).fill("").map(() => {
                                        return <>

                                            <li>
                                                <Box class="datetime">
                                                    <span>09/03/2024 </span>
                                                    <span>5:30:0</span>
                                                </Box>
                                                <Box class="line-dotted">
                                                    <Box class="line-time"></Box>
                                                    <Box class="circle-time"></Box>
                                                    <Box class="circle-border"></Box>
                                                </Box>
                                                <Box class="timeline-details">
                                                    <Box class="icon-time-status"></Box>
                                                    <Box class="content-time">
                                                        <h5>Viewed by patrick@docusoftlnet</h5>
                                                        <p>from IP 81.134.15.254</p>
                                                    </Box>
                                                </Box>
                                            </li>
                                        </>
                                    })}
                                </ul>
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
            </Dialog>
            {/* history modal end */}


            {/* document send modal start */}

            <Dialog
                open={DocumentSent}
                onClose={DocumentHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal custom-modal-1200'
            >
                <DialogContent>
                    <DialogContentText>

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="align-items-center d-flex">
                                <Typography variant="h4" className='font-18 bold text-black mb-0'>
                                    View History
                                </Typography>
                            </Box>
                            <Box className='d-flex'>
                                <Button onClick={DocumentHandleClose} className='p-0'>
                                    <span className="material-symbols-outlined text-black">
                                        cancel
                                    </span>
                                </Button>
                            </Box>
                        </Box>

                        <hr />
                        <Box className='row'>

                            {Array(6).fill("").map(() => {
                                return <>

                                    <Box className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex'>
                                        <Box className='todo-list-box white-box relative w-100'>

                                            {/* <Typography variant='h2' className='mb-2'>Lorem ipsome dolor site</Typography> */}

                                            <Box className='d-flex align-items-center justify-content-between'>
                                                <Typography variant='subtitle1 mb-2 d-block'><strong>Name:</strong> File Name here</Typography>
                                            </Box>

                                            <Typography variant='subtitle1 mb-2 d-block'><strong>Document Number:</strong> 165454</Typography>

                                            <Typography variant='subtitle1 mb-2 d-block'><strong> Published   On:</strong> 10/05/24</Typography>

                                            <Box className='d-flex align-items-center justify-content-between'>
                                                <Typography variant='subtitle1'><pan className='text-gray'>
                                                    Recipient Email  </pan>
                                                    <a href='#'>test@gmail.com</a></Typography>
                                            </Box>

                                            <hr />

                                            <Box className='d-flex approval-main'>
                                                <Box className='approval-box'>
                                                    <Typography variant='subtitle1' className='text-center me-2'>
                                                        Sent For Approval
                                                        <VerifiedIcon />
                                                    </Typography>
                                                </Box>

                                                <Box className='approval-box'>
                                                    <Typography variant='subtitle1' className='text-center me-2'>
                                                        Sent For Approval
                                                        <VerifiedIcon />
                                                    </Typography>
                                                </Box>

                                                <Box className='approval-box'>
                                                    <Typography variant='subtitle1' className='text-center me-2'>
                                                        Sent For Approval
                                                        <VerifiedIcon />
                                                    </Typography>
                                                </Box>

                                                <Box className='approval-box'>
                                                    <Typography variant='subtitle1' className='text-center me-2'>
                                                        Sent For Approval
                                                        <VerifiedIcon />
                                                    </Typography>
                                                </Box>

                                                <Box className='approval-box'>
                                                    <Typography variant='subtitle1' className='text-center me-2'>
                                                        Sent For Approval
                                                        <VerifiedIcon />
                                                    </Typography>
                                                </Box>

                                            </Box>

                                        </Box>
                                        {/* col end */}
                                    </Box>
                                </>
                            })}
                        </Box>



                    </DialogContentText>
                </DialogContent>
            </Dialog >
            {/* document sent modal end */}

        </>
    )
}

export default PortalDetails