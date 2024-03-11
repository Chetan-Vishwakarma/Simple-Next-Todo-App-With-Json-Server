import React from 'react'
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, Tabs, Tab, Checkbox, } from '@mui/material';
function Activity() {
    return (

        <Box class="ml-auto mr-auto">
            <Box class="activity-timeline">
                <ul class="timeline-ul">

                    {Array(5).fill("").map(() => {
                        return <>
                            <li>
                                <Box class="datetime">
                                    <span>09.03.2024</span>
                                    <span>10:30 AM</span>
                                </Box>
                                <Box class="line-dotted">
                                    <Box class="line-time"></Box>
                                    <Box class="circle-time"></Box>

                                    <Box class="circle-border"></Box>
                                </Box>
                                <Box class="timeline-details">
                                    <Box class="icon-time-status"></Box>
                                    <Box class="content-time">
                                        <h5>Lorem ipsome dolor site a met this is a dummy text</h5>
                                        <p>Lorem ipsome dolor</p>
                                    </Box>
                                </Box>
                            </li>
                        </>
                    })}
                </ul>
            </Box>
        </Box>

    )
}

export default Activity