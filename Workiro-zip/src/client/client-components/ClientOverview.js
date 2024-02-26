import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import PinDropIcon from '@mui/icons-material/PinDrop';
import axios from 'axios';

function ClientOverview() {

    const [taskInProgress, setTaskInProgress] = useState([]);

    const [noStarted, setNoStarted] = useState([]);

    const [totalContacts, setTotalContacts] = useState(0);

    const [totalDocuments, setTotalDocuments] = useState(0);

    const [lastActivityDate, setLastActivityDate] = useState("");

    const Json_CRM_GetOutlookTask = async () => {
        let response = await axios.post("https://docusms.uk/dsdesktopwebservice.asmx/Json_CRM_GetOutlookTask", {
            agrno: "0261",
            Email: "patrick@docusoft.net",
            password: "MjYxZG9jdXNvZnQ="
        });
        if (response.data.d !== "") {
            let details = JSON.parse(response.data.d).Table;
            console.log("Json_CRM_GetOutlookTask", details);
            setTaskInProgress(details.filter((el) => el.mstatus == "In Progress"));
            setNoStarted(details.filter((el) => el.mstatus == "Not Started"));
            Json_GetAllContactsByClientID();
        }
    }

    const Json_GetAllContactsByClientID = async () => {
        let response = await axios.post("https://docusms.uk/dsdesktopwebservice.asmx/Json_GetAllContactsByClientID", {
            agrno: "0261",
            Email: "patrick@docusoft.net",
            password: "MjYxZG9jdXNvZnQ=",
            ProjectID: "4",
            ClientID: "Case1"
        });
        if (response.data.d !== "") {
            let details = JSON.parse(response.data.d).Table;
            console.log("Json_GetAllContactsByClientID", details);
            setTotalContacts(details.length);
            Json_ExplorerSearchDoc();
        }
    }

    const Json_ExplorerSearchDoc = async () => {
        let response = await axios.post("https://docusms.uk/dsdesktopwebservice.asmx/Json_ExplorerSearchDoc", {
            agrno: "0261",
            Email: "patrick@docusoft.net",
            password: "MjYxZG9jdXNvZnQ=",
            ProjectId: "4",
            ClientId: "01",
            sectionId: "-1"
        });
        if (response.data.d !== "") {
            let details = JSON.parse(response.data.d).Table;
            console.log("Json_ExplorerSearchDoc", details);
            setTotalDocuments(details.length);
        }
    }

    useEffect(()=>{
        Json_CRM_GetOutlookTask();
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        setLastActivityDate(today);
    },[]);

    return (
        <Box className="col-xl-6 col-lg-6 col-md-12">

            <Typography variant="body1" className='mb-0 bold' gutterBottom>
                Overview
            </Typography>

            <Box className="row">
                <Box className="col-xl-4 col-lg-6 col-md-6 main-dashboard-box">
                    <Box className="dashboard-box d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <GroupIcon />
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <Typography variant="h6" gutterBottom>
                                Last Activity on
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {lastActivityDate}
                            </Typography>
                        </div>
                    </Box>
                </Box>

                <Box className="col-xl-4 col-lg-6 col-md-6 main-dashboard-box">
                    <Box className="dashboard-box d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <ArticleIcon />
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <Typography variant="h6" gutterBottom>
                                Total Document
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {totalDocuments}
                            </Typography>
                        </div>
                    </Box>
                </Box>

                <Box className="col-xl-4 col-lg-6 col-md-6 main-dashboard-box">
                    <Box className="dashboard-box d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <SignalCellularAltIcon />
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <Typography variant="h6" gutterBottom>
                                Task In Progress
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {taskInProgress.length}
                            </Typography>
                        </div>
                    </Box>
                </Box>

                <Box className="col-xl-4 col-lg-6 col-md-6 main-dashboard-box">
                    <Box className="dashboard-box d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <PinDropIcon />
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <Typography variant="h6" gutterBottom>
                                Not Started
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {noStarted.length}
                            </Typography>
                        </div>
                    </Box>
                </Box>

                <Box className="col-xl-4 col-lg-6 col-md-6 main-dashboard-box">
                    <Box className="dashboard-box d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <StayCurrentPortraitIcon />
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <Typography variant="h6" gutterBottom>
                                Total Contacts
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {totalContacts}
                            </Typography>
                        </div>
                    </Box>
                </Box>

                <Box className="col-xl-4 col-lg-6 col-md-6 main-dashboard-box">
                    <Box className="dashboard-box d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <MarkAsUnreadIcon />
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <Typography variant="h6" gutterBottom>
                                Messages Sent
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                200
                            </Typography>
                        </div>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default ClientOverview
