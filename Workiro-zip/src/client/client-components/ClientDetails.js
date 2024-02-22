import React from 'react';
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


function ClientDetails() {

    const [selected, setSelected] = React.useState(false);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className="container-fluid">
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
                    <Button className='btn-blue-2 mb-1' size="small" startIcon={<EmailIcon />}>Email List</Button>
                </Box>
            </Box>

            <Box sx={{ width: '100%', typography: 'body1' }} className="mt-4 pt-1">
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" className='custom-tabs'>
                            <Tab label="General" value="1" />
                            <Tab label="Address" value="2" />
                            <Tab label="Contact" value="3" />
                            <Tab label="DMS Tasks" value="4" />
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
                                        <Box className="col-lg-4 col-md-12 col-sm-12">
                                            <Box class="company-details-box d-flex">
                                                <Box class="flex-shrink-0">
                                                    <PinDropIcon />
                                                </Box>
                                                <Box class="flex-grow-1 ms-2">
                                                    <Typography variant="h6" gutterBottom>
                                                        Address
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Sayaji Hotel, Near meghdud Guarden Vijay nagar square  indore
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box className="col-lg-8 col-md-12 col-sm-12">
                                            <Box className="row">
                                                <Box className="col-lg-4 col-md-6">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Status
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            Active
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box className="col-lg-4 col-md-6">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Source
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            Google
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box className="col-lg-4 col-md-6">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Manager
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            Patrick John
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box className="col-lg-4 col-md-6">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Email
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            test@gmail.com
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box className="col-lg-8 col-md-6">
                                                    <Box class="company-details-box">
                                                        <Typography variant="h6" gutterBottom>
                                                            Business
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            01130 Growing of vegetables and melons, roots and tubers1
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
                                                    9879898798, 7987987
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
                                                        09/02/2024
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
                                                        1256
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
                                                        54
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
                                                        22
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
                                                        65
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
                                                        545
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
                            <Accordion className='accordian-box' defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Key Facts - Team
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Table>
                                        
                                    </Table>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    Accordion 2
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    Accordion Actions 3
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button>Cancel</Button>
                                    <Button>Agree</Button>
                                </AccordionActions>
                            </Accordion>

                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4-content"
                                    id="panel4-header"
                                >
                                    Accordion 4
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
                                    Accordion 5
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
                                    Accordion 6
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel7-content"
                                    id="panel7-header"
                                >
                                    Accordion 7
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
                                    Accordion 8
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
                                    Accordion 9
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
                                    Accordion 10
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

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