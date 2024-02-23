import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggleButton from '@mui/material/ToggleButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EmailIcon from '@mui/icons-material/Email';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table } from '@mui/material';
import axios from 'axios';


function ClientDetails() {

    const [selected, setSelected] = React.useState(false);

    const [value, setValue] = React.useState('1');

    const [clientDetails, setClientDetails] = useState({});

    const [companyDetails, setCompanyDetails] = useState([]);

    const [taskInProgress, setTaskInProgress] = useState([]);

    const [noStarted, setNoStarted] = useState([]);

    const [totalContacts, setTotalContacts] = useState(0);

    const [totalDocuments, setTotalDocuments] = useState(0);

    const [lastActivityDate, setLastActivityDate] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Json_GetClientCardDetails = async () => {
        let response = await axios.post("https://docusms.uk/dswebclientmanager.asmx/Json_GetClientCardDetails", {
            Email: "patrick@docusoft.net",
            agrno: "0261",
            intProjectId: "4",
            password: "MjYxZG9jdXNvZnQ=",
            strOrignatorNumber: "Case1"
        });
        if (response.data.d !== '') {
            let details = JSON.parse(response.data.d);
            console.log("Json_GetClientCardDetails", details);
            setClientDetails(details);
            setCompanyDetails(details.Table1);
            Json_CRM_GetOutlookTask();
        }
    }
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
    useEffect(() => {
        Json_GetClientCardDetails();
        // Json_CRM_GetOutlookTask();     // due to
        // Json_GetAllContactsByClientID();     // due to
        // Json_ExplorerSearchDoc();      // due to this sometimes data does not render that's why I comment this 3 lines
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        setLastActivityDate(today);
    }, []);

    return (
        <Box className="container-fluid p-0">
            <Box className="d-flex align-items-center justify-content-between flex-wrap">
                <Box className='d-flex flex-wrap align-items-center'>
                    <Typography variant="h2" className='title me-3 mb-2' gutterBottom>
                        Sample Case
                    </Typography>

                    <ToggleButton
                        value="check"
                        selected={selected}
                        onChange={() => {
                            setSelected(!selected);
                        }}
                        className='mb-2 btn-favorite'
                    >
                        <FavoriteIcon />
                        Add to Favorites
                    </ToggleButton>
                </Box>

                <Box className='d-flex flex-wrap'>
                    <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<BorderColorIcon />}>Edit Client</Button>
                    <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<GroupAddIcon />}>Add Client</Button>
                    <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<DeleteIcon />}>Notes</Button>
                    <Button className='btn-blue-2 mb-1' size="small" startIcon={<EmailIcon />}>Add Document</Button>
                </Box>
            </Box>

            <Box sx={{ width: '100%', typography: 'body1' }} className="mt-4 pt-1">
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" className='custom-tabs'>
                            <Tab label="General" value="1" />
                            <Tab label="Address" value="2" />
                            <Tab label="Contact" value="3" />
                            <Tab label="Tasks" value="4" />
                            <Tab label="Documents" value="5" />
                            <Tab label="Companies House" value="6" />
                            <Tab label="Requested Document" value="7" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className='p-0'>
                        <Box className="general-tab white-box">
                            <Box className="row">
                                <Box className="col-xl-6 col-lg-6 col-md-12 main-company-details">
                                    <Typography variant="body1" className='mb-4 bold' gutterBottom>
                                        Company Details
                                    </Typography>

                                    <Box className="row">
                                        <Box className="col-lg-4 col-md-6 col-sm-12">
                                            <Box class="company-details-box d-flex">
                                                <Box class="flex-shrink-0">
                                                    <PinDropIcon />
                                                </Box>
                                                <Box class="flex-grow-1 ms-2">
                                                    <Typography variant="h6" gutterBottom>
                                                        Address
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        {companyDetails[0]?.Address}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box className="col-lg-8 col-md-6 col-sm-12">
                                            <Box className="row">
                                                <Box className="col-xxl-4 col-lg-6 col-md-6">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Status
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            {companyDetails[0]?.StatusName}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box className="col-xxl-4 col-lg-6 col-md-6">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Source
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            {companyDetails[0]?.SourceName}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box className="col-xxl-4 col-lg-6 col-md-6">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Manager
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            {companyDetails[0]?.ManagerName}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box className="col-xxl-4 col-lg-12">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Email
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            {companyDetails[0]?.Email}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box className="col-xxl-8 col-lg-12">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Business
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            {companyDetails[0]?.BussName}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box class="company-details-box d-flex">
                                            <Box class="flex-shrink-0">
                                                <PhoneIcon />
                                            </Box>
                                            <Box class="flex-grow-1 ms-2">
                                                <Typography variant="body1" gutterBottom>
                                                    {companyDetails[0]?.TelNo}
                                                </Typography>
                                            </Box>
                                        </Box>


                                    </Box>
                                </Box>
                                {/* cold end */}

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
                                {/* cold end */}
                            </Box>
                            {/* row end */}
                        </Box>
                        {/* white box end */}

                        <Box className='main-accordian'>
                            {
                                Object.keys(clientDetails).length > 0
                                && clientDetails?.Table.map((item, i) => {
                                    return <Accordion className='accordian-box' defaultExpanded={i === 0 ? true : false}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            {item.TagName}
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='table-responsive'>
                                                <table className='table'>
                                                    <tbody>
                                                        {clientDetails?.Table3.map((data, i) => {
                                                            return <tr>
                                                                <th>{data.Name}</th>
                                                                <td>{data.UdfValue === "undefined" ? "" : data.UdfValue}</td>
                                                            </tr>
                                                        })}
                                                    </tbody>
                                                </table>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                })
                            }
                            {/* <Accordion className='accordian-box' defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Key Facts - Team
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box className='table-responsive'>
                                        <table className='table'>
                                            <tbody>
                                                <tr>
                                                    <th>Key Facts - Team</th>
                                                    <td>Key Facts - Team</td>
                                                </tr>
                                                <tr>
                                                    <th>Key Facts - Team</th>
                                                    <td>Patrick</td>
                                                </tr>
                                                <tr>
                                                    <th>Investigations manager Name</th>
                                                    <td>Jones</td>
                                                </tr>
                                                <tr>
                                                    <th>Assistant Manager Date</th>
                                                    <td>Jones@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th>Investigations manager Date</th>
                                                    <td>Admin</td>
                                                </tr>
                                                <tr>
                                                    <th>Closures Manager Date</th>
                                                    <td>Key</td>
                                                </tr>
                                                <tr>
                                                    <th>Administrator 1 Date</th>
                                                    <td>01/10/2001</td>
                                                </tr>
                                                <tr>
                                                    <th>Administrator 1 Date</th>
                                                    <td>01/10/2001</td>
                                                </tr>
                                                <tr>
                                                    <th>Assistant Manager Name</th>
                                                    <td>98756465464</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </AccordionDetails>
                            </Accordion> */}
                            {/* <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    Fee Data
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box className='table-responsive'>
                                        <table className='table'>
                                            <tbody>
                                                <tr>
                                                    <th>Key Facts - Team</th>
                                                    <td>Key Facts - Team</td>
                                                </tr>
                                                <tr>
                                                    <th>Key Facts - Team</th>
                                                    <td>Patrick</td>
                                                </tr>
                                                <tr>
                                                    <th>Investigations manager Name</th>
                                                    <td>Jones</td>
                                                </tr>
                                                <tr>
                                                    <th>Assistant Manager Date</th>
                                                    <td>Jones@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th>Investigations manager Date</th>
                                                    <td>Admin</td>
                                                </tr>
                                                <tr>
                                                    <th>Closures Manager Date</th>
                                                    <td>Key</td>
                                                </tr>
                                                <tr>
                                                    <th>Administrator 1 Date</th>
                                                    <td>01/10/2001</td>
                                                </tr>
                                                <tr>
                                                    <th>Administrator 1 Date</th>
                                                    <td>01/10/2001</td>
                                                </tr>
                                                <tr>
                                                    <th>Assistant Manager Name</th>
                                                    <td>98756465464</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    Key Facts - Team
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4-content"
                                    id="panel4-header"
                                >
                                    Key Facts - Team
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel5-content"
                                    id="panel5-header"
                                >
                                    WIP - Fee Approval
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel6-content"
                                    id="panel6-header"
                                >
                                    PreFee
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion> */}

                            {/* <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel7-content"
                                    id="panel7-header"
                                >
                                    Bonding
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel9-content"
                                    id="panel7-header"
                                >
                                    Next Actions
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel8-content"
                                    id="panel8-header"
                                >
                                    WIP - Current
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel9-content"
                                    id="panel9-header"
                                >
                                    Bonding
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion> */}

                        </Box>
                    </TabPanel>
                    {/* tab end */}


                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                    <TabPanel value="4">Item Three</TabPanel>
                    <TabPanel value="5">Item Three</TabPanel>
                    <TabPanel value="6">Item Three</TabPanel>
                    <TabPanel value="7">Item Three</TabPanel>
                </TabContext>
            </Box>

        </Box>

    )
}

export default ClientDetails

// rfce