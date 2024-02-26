import React, { useEffect, useState } from 'react';
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
import CompanyDetails from './CompanyDetails';
import ClientOverview from './ClientOverview';
//import Utils from "../../services/Utils";
import CommanCLS from '../../services/CommanService';
import UdfCard from './UdfCard';



function ClientDetails() {

    const [selected, setSelected] = React.useState(false);

    const [value, setValue] = React.useState('1');

    const [clientDetails, setClientDetails] = useState({});

    const [companyDetails, setCompanyDetails] = useState([]);

    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

    const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";

    //let Util = new Utils();

    let Cls = new CommanCLS(baseUrl, "0261", "patrick@docusoft.net", "MjYxZG9jdXNvZnQ=");

    let webClientCLS = new CommanCLS(clientWebUrl, "0261", "patrick@docusoft.net", "MjYxZG9jdXNvZnQ=");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Json_GetClientCardDetails = () => {
        let obj = {
            Email: "patrick@docusoft.net",
            agrno: "0261",
            intProjectId: "4",
            password: "MjYxZG9jdXNvZnQ=",
            strOrignatorNumber: "Case1"
        };
        try{
            webClientCLS.Json_GetClientCardDetails(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_GetClientCardDetails", json);
                        setClientDetails(json);
                        setCompanyDetails(json.Table1);
                    }
                }
            });
        }catch(err){
            console.log("Error while calling Json_GetClientCardDetails",err)
        }
    }
    useEffect(() => {
        Json_GetClientCardDetails();
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
                                {/* For CompanyDetails */}
                                <CompanyDetails companyDetails={companyDetails} />
                                {/* For ClientOverview */}
                                <ClientOverview Cls={Cls} webClientCLS={webClientCLS}/>
                            </Box>
                        </Box>
                        <Box className='main-accordian'>
                            {/* For UDFs */}
                            <UdfCard data={clientDetails}/>
                        </Box>
                    </TabPanel>
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