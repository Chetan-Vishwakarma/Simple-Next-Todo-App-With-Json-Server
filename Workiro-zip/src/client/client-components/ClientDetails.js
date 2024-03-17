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
import { useLocation } from 'react-router-dom';
// import DocumentList from './Document';
import DocumentList from './DocumentList';
import UploadDocument from './UploadDocument';



function ClientDetails() {

    const location = useLocation();
    const { agrno, Email, password, folderId, originatorNo } = location.state;
    const [selected, setSelected] = React.useState(false);
    const [value, setValue] = React.useState('1');
    const [clientDetails, setClientDetails] = useState({});

    const [companyDetails, setCompanyDetails] = useState([]);

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

    const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";

    //let Util = new Utils();

    let Cls = new CommanCLS(baseUrl, agrno, Email, password);

    let webClientCLS = new CommanCLS(clientWebUrl, agrno, Email, password);


    // upload document modal start
    const [openUploadDocument, setOpenUploadDocument] = React.useState(false);
    const handleClickOpenUploadDocument = () => {
        setOpenUploadDocument(true);
    };
    // upload document modal end


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Json_GetToFavourites = (currentUser) => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password
        };
        try {
            Cls.Json_GetToFavourites(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_GetToFavourites", json);
                        let favouriteUser = json.Table;
                        if (favouriteUser.length > 0 && currentUser.length > 0) {
                            let ans = favouriteUser.some((item) => item.OriginatorNo === currentUser[0]?.OriginatorNo);
                            if (ans) {
                                setSelected(true);
                            } else {
                                setSelected(false);
                            }
                        } else {
                            setSelected(false);
                        }
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetToFavourites", err);
        }
    }

    const Json_RemoveToFavourite = () => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            OrgNo: originatorNo,
            ProjectID: folderId
        };
        try {
            Cls.Json_RemoveToFavourite(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_RemoveToFavourite", json);
                        setSelected(false);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_RemoveToFavourite", err);
        }
    }

    const Json_AddToFavourite = () => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            ProjectID: folderId,
            OrgNo: originatorNo
        };
        try {
            Cls.Json_AddToFavourite(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_AddToFavourite", json);
                        let details = json.Table;
                        setSelected(true);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_AddToFavourite", err);
        }
    }

    // const Json_GetClientsByFolder=()=>{
    //     let obj = {
    //         agrno: agrno,
    //         Email: Email,
    //         password: password,
    //         ProjectId: folderId
    //     };
    //     try{
    //         Cls.Json_GetClientsByFolder(obj, (sts, data) => {
    //             if (sts) {
    //                 if (data) {
    //                     let json = JSON.parse(data);
    //                     console.log("Json_GetClientsByFolder", json);
    //                 }
    //             }
    //         });
    //     }catch(err){
    //         console.log("Error while calling Json_GetClientsByFolder",err);
    //     }
    // }

    const Json_GetClientCardDetails = () => {
        let obj = {
            Email: Email,
            agrno: agrno,
            intProjectId: folderId,
            password: password,
            strOrignatorNumber: originatorNo
        };
        try {
            webClientCLS.Json_GetClientCardDetails(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_GetClientCardDetails", json);
                        setClientDetails(json);
                        setCompanyDetails(json.Table1);
                        //Json_GetClientsByFolder();
                        Json_GetToFavourites(json.Table1);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetClientCardDetails", err)
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
                        {clientDetails.Table1 && clientDetails?.Table1[0]?.OriginatorName}
                    </Typography>

                    <ToggleButton
                        value="check"
                        selected={selected}
                        onChange={() => {
                            //setSelected(!selected);
                            if (selected) {
                                Json_RemoveToFavourite();
                            } else {
                                Json_AddToFavourite();
                            }

                        }}
                        className='mb-2 btn-favorite'
                    >
                        <FavoriteIcon />
                    </ToggleButton>
                </Box>

                <Box className='d-flex flex-wrap'>
                    <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<BorderColorIcon />}>Edit Client</Button>
                    <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<GroupAddIcon />}>Add Client</Button>
                    <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<DeleteIcon />}>Notes</Button>
                    <Button className='btn-blue-2 mb-1' size="small" startIcon={<EmailIcon />}
                    onClick={handleClickOpenUploadDocument}
                    >Add Document</Button>
                </Box>
            </Box>

            <UploadDocument setOpenUploadDocument={setOpenUploadDocument} openUploadDocument={openUploadDocument}></UploadDocument>

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
                                <ClientOverview Cls={Cls} webClientCLS={webClientCLS} locationState={location.state} />
                            </Box>
                        </Box>
                        <Box className='main-accordian'>
                            {/* For UDFs */}
                            <UdfCard data={clientDetails} />
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                    <TabPanel value="4">Item Three</TabPanel>

                    <TabPanel value="5" className='p-0'>
                        <DocumentList clientId={originatorNo} ></DocumentList>
                    </TabPanel>

                    {/* <TabPanel value="5">
                        <DocumentList/>
                    </TabPanel> */}
                    <TabPanel value="6">Item Three</TabPanel>
                    <TabPanel value="7">Item Three</TabPanel>
                </TabContext>
            </Box>
        </Box>
    )
}
export default ClientDetails