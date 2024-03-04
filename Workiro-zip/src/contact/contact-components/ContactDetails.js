import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggleButton from '@mui/material/ToggleButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EmailIcon from '@mui/icons-material/Email';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import user from "../../images/user.jpg";
import country from "../../images/uk.png";
import KeyIcon from '@mui/icons-material/Key';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import VerifiedIcon from '@mui/icons-material/Verified';
import CircleIcon from '@mui/icons-material/Circle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { useEffect } from 'react';
import CommanCLS from "../../services/CommanService"
import { useLocation } from 'react-router-dom';

function ContactDetails() {

    const location = useLocation();

    const {agrno, Email, password, folderId, originatorNo, contactNo} = location.state;

    const [selected, setSelected] = React.useState(false);

    const [value, setValue] = React.useState('1');

    const [contactDetails, setContactDetails] = React.useState([]);

    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

    const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";

    let Cls = new CommanCLS(baseUrl, agrno, Email, password);

    let webClientCLS = new CommanCLS(clientWebUrl, agrno, Email, password);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            ClientID: originatorNo,
            ProjectID: folderId
        };
        try {
            Cls.Json_GetAllContactsByClientID(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_GetAllContactsByClientID", json);
                        let details = json.Table;
                        setContactDetails(details.filter((item) => item.ContactNo === contactNo));
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetAllContactsByClientID", err);
        }
    }, []);
    console.log("contactDetails: ", contactDetails);
    // dropdown
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
            <Box className="d-flex align-items-center justify-content-between flex-wrap">
                <Box className='d-flex flex-wrap align-items-center'>
                    <Typography variant="h2" className='title me-3 mb-2' gutterBottom>
                        {contactDetails.length>0 ? contactDetails[0]["Company Name"]: "Loading..."}
                    </Typography>

                    {/* <ToggleButton
                        value="check"
                        selected={selected}
                        onChange={() => {
                            setSelected(!selected);
                        }}
                        className='mb-2 btn-favorite'
                    >
                        <FavoriteIcon />
                        Add to Favorites
                    </ToggleButton> */}
                </Box>

                <Box className='d-flex flex-wrap'>
                    <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<BorderColorIcon />}>Edit Contacts</Button>
                    <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<GroupAddIcon />}>Client Card</Button>
                    <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<FactCheckIcon />}>AML Check</Button>

                    <div>
                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className='min-width-auto mb-1'
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
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                My Account
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                My Account
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                My Account
                            </MenuItem>
                        </Menu>
                    </div>

                </Box>
            </Box>

            <Box sx={{ width: '100%', typography: 'body1' }} className="mt-3">
                <TabContext value={value}>
                    <Box className='d-none'>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" className='custom-tabs'>
                            <Tab label="General" value="1" />
                            <Tab label="Address" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className='p-0'>
                        <Box className="general-tab">
                            <Box className="row">
                                <Box className="col-xl-4 col-lg-4 col-md-12 d-flex">
                                    {
                                        contactDetails.length > 0 ?
                                          contactDetails.map((item)=>{
                                            return <Box className='white-box w-100'>

                                            <Box className='d-flex align-items-center'>
                                                <Box className='relative m-0 me-4'>
                                                    <Box className='client-img'>
                                                        <img src={user} />
                                                    </Box>

                                                    <Tooltip title="UK" arrow>
                                                        <Box className='country-flage'>
                                                            <img src={country} className='' />
                                                        </Box>
                                                    </Tooltip>

                                                    <VerifiedIcon className='user-register' />

                                                </Box>
                                                <Box className="clearfix">
                                                    <Typography variant="h5" className='mb-1 bold d-flex align-items-center' gutterBottom>
                                                        <CircleIcon className='text-success me-1 font-16' /> {item["First Name"]+ " "+ item["Last Name"]}
                                                    </Typography>


                                                    <Typography variant="body1" className='mb-0 ' gutterBottom>
                                                        <span className='bold'>
                                                            Role:</span> {item.Role}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box className='d-flex flex-wrap contact-availability mb-2'>
                                                <Box className={item["Main Contact"]?'contact-availability-box':'contact-availability-box inactive'}>
                                                    <CheckCircleIcon />
                                                    <Typography variant="h5" className='mb-0 ' gutterBottom>
                                                        Main Contact
                                                    </Typography>
                                                </Box>

                                                {/* <Box className='contact-availability-box inactive'>
                                                <CancelIcon />
                                                <Typography variant="h5" className='mb-0 ' gutterBottom>
                                                    In Active
                                                </Typography>
                                            </Box> */}

                                                <Box className='contact-availability-box inactive'>
                                                    <CancelIcon />
                                                    <Typography variant="h5" className='mb-0 ' gutterBottom>
                                                        Portal User
                                                    </Typography>
                                                </Box>

                                                {/* <Box className='contact-availability-box'>
                                                <CheckCircleIcon />
                                                <Typography variant="h5" className='mb-0 ' gutterBottom>
                                                    AML Check
                                                </Typography>
                                            </Box> */}

                                            </Box>

                                            <Box className='card-box d-flex mt-2'>
                                                <FmdGoodIcon className='me-2 text-primary' />

                                                <Box className=''>
                                                    <p className='font-16 bold mb-1 text-primary'>Address</p>
                                                    <p className='mb-0 font-14 text-gray'>{item["Address 1"]}</p>
                                                </Box>
                                            </Box>

                                            <Box className='card-box d-flex mt-2'>
                                                <FmdGoodIcon className='me-2 text-primary' />

                                                <Box className=''>
                                                    <p className='font-16 bold mb-1 text-primary'>Phone</p>
                                                    <p className='mb-0 font-14 text-gray'>{item.Tel}, {item.Mobile}</p>
                                                </Box>
                                            </Box>

                                                   </Box>
                                          }):<Box className='white-box w-100'>

                                            <Box className='d-flex align-items-center'>
                                                <Box className='relative m-0 me-4'>
                                                    <Box className='client-img'>
                                                        <img src={user} />
                                                    </Box>

                                                    <Tooltip title="UK" arrow>
                                                        <Box className='country-flage'>
                                                            <img src={country} className='' />
                                                        </Box>
                                                    </Tooltip>

                                                    <VerifiedIcon className='user-register' />

                                                </Box>
                                                <Box className="clearfix">
                                                    <Typography variant="h5" className='mb-1 bold d-flex align-items-center' gutterBottom>
                                                        <CircleIcon className='text-success me-1 font-16' /> Patrick Jones
                                                    </Typography>


                                                    <Typography variant="body1" className='mb-0 ' gutterBottom>
                                                        <span className='bold'>
                                                            Role:</span> Tester
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box className='d-flex flex-wrap contact-availability mb-2'>
                                                <Box className={'contact-availability-box inactive'}>
                                                    <CheckCircleIcon />
                                                    <Typography variant="h5" className='mb-0 ' gutterBottom>
                                                        Main Contact
                                                    </Typography>
                                                </Box>

                                                {/* <Box className='contact-availability-box inactive'>
                                                <CancelIcon />
                                                <Typography variant="h5" className='mb-0 ' gutterBottom>
                                                    In Active
                                                </Typography>
                                            </Box> */}

                                                <Box className='contact-availability-box inactive'>
                                                    <CancelIcon />
                                                    <Typography variant="h5" className='mb-0 ' gutterBottom>
                                                        Portal User
                                                    </Typography>
                                                </Box>

                                                {/* <Box className='contact-availability-box'>
                                                <CheckCircleIcon />
                                                <Typography variant="h5" className='mb-0 ' gutterBottom>
                                                    AML Check
                                                </Typography>
                                            </Box> */}

                                            </Box>

                                            <Box className='card-box d-flex mt-2'>
                                                <FmdGoodIcon className='me-2 text-primary' />

                                                <Box className=''>
                                                    <p className='font-16 bold mb-1 text-primary'>Address</p>
                                                    <p className='mb-0 font-14 text-gray'>testing/address</p>
                                                </Box>
                                            </Box>

                                            <Box className='card-box d-flex mt-2'>
                                                <FmdGoodIcon className='me-2 text-primary' />

                                                <Box className=''>
                                                    <p className='font-16 bold mb-1 text-primary'>Phone</p>
                                                    <p className='mb-0 font-14 text-gray'>0000000000, 000000000</p>
                                                </Box>
                                            </Box>

                                                   </Box>
                                    }

                                </Box>
                                {/* cold end */}

                                <Box className="col-xl-8 col-lg-8 col-md-12 d-flex">
                                    <Box className='white-box w-100'>
                                        <Box className='contact-detail-row mb-4'>
                                            <Box className='contact-detail-box'>
                                                <KeyIcon />
                                                <Typography variant="h4" className='mb-0 ' gutterBottom>
                                                    Key
                                                </Typography>

                                                <Typography variant="Body1" className='mb-0 ' gutterBottom>
                                                    23156
                                                </Typography>
                                            </Box>

                                            <Box className='contact-detail-box'>
                                                <RequestQuoteIcon />
                                                <Typography variant="h4" className='mb-0 ' gutterBottom>
                                                    Amount
                                                </Typography>

                                                <Typography variant="Body1" className='mb-0 ' gutterBottom>
                                                    $1012
                                                </Typography>
                                            </Box>

                                            <Box className='contact-detail-box'>
                                                <FactCheckIcon />
                                                <Typography variant="h4" className='mb-0 ' gutterBottom>
                                                    Claim Status
                                                </Typography>

                                                <Typography variant="Body1" className='mb-0 ' gutterBottom>
                                                    Pending
                                                </Typography>
                                            </Box>

                                            <Box className='contact-detail-box'>
                                                <FolderSharedIcon />
                                                <Typography variant="h4" className='mb-0 ' gutterBottom>
                                                    User ID
                                                </Typography>

                                                <Typography variant="Body1" className='mb-0 ' gutterBottom>
                                                    23156
                                                </Typography>
                                            </Box>

                                            <Box className='contact-detail-box'>
                                                <CalendarMonthIcon />
                                                <Typography variant="h4" className='mb-0 ' gutterBottom>
                                                    Date Added
                                                </Typography>

                                                <Typography variant="Body1" className='mb-0 ' gutterBottom>
                                                    23/05/23
                                                </Typography>
                                            </Box>
                                        </Box>


                                        {/* test */}
                                        <Box className='card-box d-flex'>
                                            <EditNoteIcon className='me-2 text-primary' />
                                            <Box className=''>
                                                <p className='font-16 bold mb-1 text-primary'>Notes</p>
                                                <p className='mb-0 font-14 text-gray'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the when an unknown printer took a galley of type  the industry standard dummy text ever since the when an unknown p and scrambled it to make a type specimen book.</p>
                                            </Box>
                                        </Box>





                                        {/* <textarea></textarea> */}

                                        {/*  */}




                                    </Box>
                                    {/* white box end */}
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
                            </Accordion>

                            <Accordion className='accordian-box'>
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
                            </Accordion>

                        </Box>
                    </TabPanel>
                    {/* tab end */}

                    <TabPanel value="2">Item Two</TabPanel>

                    {/* <TabPanel value="3">Item Three</TabPanel>
                    <TabPanel value="4">Item Three</TabPanel>
                    <TabPanel value="5">Item Three</TabPanel>
                    <TabPanel value="6">Item Three</TabPanel>
                    <TabPanel value="7">Item Three</TabPanel> */}
                </TabContext>
            </Box>

        </Box>

    )
}

export default ContactDetails

// rfce