import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, Tabs, Tab, Checkbox, } from '@mui/material';
import CommanCLS from '../../services/CommanService';
function Activity({...props}) {
    let {getAudit}=props;

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/"; // base url for api
    //   let dt = new LoginDetails();
    let cls = new CommanCLS(baseUrl, agrno, Email, password);

useEffect(()=>{
       setAgrNo(localStorage.getItem("agrno"));      
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email")); 
        console.log("getAudit",getAudit)      
},[getAudit])



    return (

        <Box class="ml-auto mr-auto">
            <Box class="activity-timeline">
                <ul class="timeline-ul">

                    {getAudit?getAudit.map((item, index)=>{
                        return(
                            <>
                            <li key={index}>
                                <Box class="datetime">
                                    <span>{cls.DateForMate(item["Actioned Date"])}</span>
                                   <span>{}</span>
                                </Box>
                                <Box class="line-dotted">
                                    <Box class="line-time"></Box>
                                    <Box class="circle-time"></Box>

                                    <Box class="circle-border"></Box>
                                </Box>
                                <Box class="timeline-details">
                                    <Box class="icon-time-status"></Box>
                                    <Box class="content-time">
                                        <h5>{item.Comments}</h5>
                                        <p>{item["ForwardedBy"]}</p>
                                    </Box>
                                </Box>
                            </li>
                        </>
                        )
                        
                    }):""}
                </ul>
            </Box>
        </Box>

    )
}

export default Activity