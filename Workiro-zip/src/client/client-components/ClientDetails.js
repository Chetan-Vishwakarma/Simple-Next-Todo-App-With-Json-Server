import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggleButton from '@mui/material/ToggleButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
import { useLocation, useSearchParams } from 'react-router-dom';
// import DocumentList from './Document';
import DocumentList from './DocumentList';
import UploadDocument from './UploadDocument';
import ClientAddress from './ClientAddress';
import Contact from './Contact';
import CompaniesHouse from './CompaniesHouse';
import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import TaskList from './TaskList';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import EditClientdetails from './EditClientdetails';
import EditReference from './EditReference';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UploadDocForClient from './UploadDocForClient';
import CustomLoader from '../../components/CustomLoader';
import { useDispatch, useSelector } from "react-redux";
import { setOpenDocumentModalByRedux } from '../../redux/reducers/counterSlice';
import HtmlEditorDX from '../../components/HtmlEditor';
import { Height } from '@mui/icons-material';
import Fileformat from '../../images/files-icon/pdf.png';
import { DialogTitle } from '@mui/material';
import { Label } from '@mui/icons-material';
import { fetchContactListByFolderRedux, fetchSupplierListOrderByFavourite } from '../../redux/reducers/api_helper';
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const agrno = localStorage.getItem("agrno");
const Email = localStorage.getItem("Email");
const password = localStorage.getItem("Password");
const folderId = localStorage.getItem("FolderId");


function ClientDetails() {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const tabValue = searchParams.get("val");
    // const test = searchParams.get("OrgNo");
    
    const originatorNo = searchParams.get("OrgNo");
    
    const { globalSearchDocs } = location.state !== null ? location.state : { globalSearchDocs: [] };

    const [selected, setSelected] = React.useState(false);
    const [value, setValue] = React.useState(tabValue ? tabValue : '1');
    const [clientDetails, setClientDetails] = useState({});

    const [companyDetails, setCompanyDetails] = useState([]);
    const [companyEditDetails, setCompanyEditDetails] = useState([]);
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

    const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";
    const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    let Clsprect = new CommanCLS(baseUrlPractice, agrno, Email, password);
    let Cls = new CommanCLS(baseUrl, agrno, Email, password);

    let webClientCLS = new CommanCLS(clientWebUrl, agrno, Email, password);

    const [templateDataMarkup, setTemplateDataMarkup] = React.useState([]);
    const [editorContentValue, setEditorContentValue] = React.useState([]);

    // upload document modal start
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickOpenUploadDocument = () => {
        dispatch(setOpenDocumentModalByRedux(true));
    };
    // upload document modal end

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const Suppliers = () => {
        let obj = {
          agrno: agrno,
          Email: Email,
          password: password,
          CCodeList: originatorNo ? originatorNo : ""
        };
        try {
          Cls.Suppliers(obj, (sts, data) => {
            if (sts) {
              if (data) {
                console.log("Suppliers", data);
                if(data =="Success"){
                  toast.error("Contact deleted Successfully !");
                  setTimeout(() => {
                    navigate("/dashboard/Connections");
                    dispatch(fetchSupplierListOrderByFavourite(folderId));
                  },1500);
                } else {
                  toast.error(data);
                }
                
               
               setAnchorEl(null);
              }
            }
          });
        } catch (err) {
          console.log("Error while calling Json_GetCRMContactUDFValues", err);
        }
      };
      const handleDelete = () => {
        console.log("deleteclient");
        Clsprect.ConfirmMessage("Are you sure you want to delete this client ? ", function (res) {
          if (res) {
            //Suppliers();
          }
      })
       
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Json_GetToFavourites = () => {
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
                        let favouriteUser = json.Table;
                        if (favouriteUser.length > 0) {
                            let ans = favouriteUser.map(itm=>itm.OriginatorNo.trim()).includes(originatorNo.trim());
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
                        toast.success("Removed from favourites");
                        dispatch(fetchSupplierListOrderByFavourite());
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
                        toast.success("Added to favourites");
                        dispatch(fetchSupplierListOrderByFavourite());
                        setSelected(true);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_AddToFavourite", err);
        }
    }

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
                        console.log("Json_GetClientCardDetailssssss", json);
                        setClientDetails(json);
                        setCompanyDetails(json.Table1);
                        setCompanyEditDetails(json.Table1);
                        //Json_GetClientsByFolder();
                        // Json_GetToFavourites(json.Table1);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetClientCardDetails", err)
        }
    }

    useEffect(() => {
        Json_GetClientCardDetails();
        Json_GetToFavourites();
    }, []);


    // edit client modal
    const [Referance, setReferance] = React.useState(false);
    const handleClickReferance = (e, originatorNo) => {
        setReferance(true);
    };
    const EditCLientHandleClose = () => {
        setReferance(false);
    };


    const [Notesopen, NotessetOpen] = React.useState(false);
    const NoteshandleClickOpen = () => {
        NotessetOpen(true);
    };
    const NoteshandleClose = () => {
        NotessetOpen(false);
    };


    const SaveStickyNotes = () => {
        try {
            //  console.log(editorContentValue)
            // let o = {
            //     ItemId: selectedDocument["Registration No."],
            //     strStickyNotes: window.btoa(editorContentValue)
            // }
            // cls.Json_SetItemStickyNotes(o, function (sts, data) {
            //     if (sts && data) {
            //         if (data === "Success") {
            //             Json_GetItemStickyNotes();
            //             toast.success("Updated !");
            //         }
            //     }
            // })
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }


    return (
        <>
            <Box className="container-fluid p-0">

                {/* <CustomBreadCrumbs tabs={[{ tabLink: "/dashboard/Connections", tabName: "Connections" }, { tabLink: "/dashboard/clientDetails", tabName: "Client Details" }]} /> */}

                {globalSearchDocs.length === 0 && <Box className="d-flex align-items-center justify-content-between flex-wrap">
                    <Box className='d-flex flex-wrap align-items-center'>

                        <ArrowBackIosIcon className='mb-2 pointer' onClick={() => navigate("/dashboard/Connections")} />

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
                        <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<BorderColorIcon />}
                            onClick={(e) => handleClickReferance(e, originatorNo)}>Edit Client</Button>
                        {/* <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<GroupAddIcon />}>Add Client</Button> */}
                        <Button className='btn-blue-2 me-2 mb-1' size="small" startIcon={<DeleteIcon />} onClick={NoteshandleClickOpen}>Notes</Button>
                        <Button className='btn-blue-2 mb-1' size="small" startIcon={<EmailIcon />}
                            onClick={handleClickOpenUploadDocument}
                        >Add Document</Button>

<div>
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="min-width-auto mb-1"
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
                            <MenuItem className="ps-1" onClick={handleDelete}>
                                <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                                </ListItemIcon>
                                Delete
                            </MenuItem>
            </Menu>
          </div>
                    </Box>
                </Box>}
                <hr />
                <Box sx={{ width: '100%', typography: 'body1' }} className="">
                    <TabContext value={value}>
                        <Box className='mb-1'>
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
                            {(clientDetails && clientDetails?.Table3?.length > 0) ? <><Box className="general-tab white-box">
                                <Box className="row">
                                    {/* For CompanyDetails */}
                                    <CompanyDetails companyDetails={companyDetails} originatorNo={originatorNo} Cls={Cls} />
                                    {/* For ClientOverview */}
                                    <ClientOverview Cls={Cls} webClientCLS={webClientCLS} locationState={{ agrno: agrno, Email: Email, password: password, folderId: folderId, originatorNo: originatorNo }} />
                                </Box>
                            </Box>
                                <Box className='main-accordian'>
                                    {/* For UDFs */}
                                    <UdfCard data={clientDetails} />
                                </Box></> : <CustomLoader />}
                        </TabPanel>

                        <TabPanel value="2" className='p-0'>
                            <ClientAddress originatorNo={originatorNo}></ClientAddress>
                        </TabPanel>
                        <TabPanel value="3" className='p-0 relative'>
                            <Contact clientId={clientDetails.Table1 && clientDetails?.Table1[0]?.OriginatorNo} clientName={clientDetails.Table1 && clientDetails?.Table1[0]?.OriginatorName}></Contact>
                        </TabPanel>
                        <TabPanel value="4" className='p-0 relative'>
                            <TaskList clientName={clientDetails.Table1 && clientDetails?.Table1[0]?.OriginatorNo}></TaskList>
                        </TabPanel>

                        <TabPanel value="5" className='p-0 relative'>
                            <DocumentList clientId={originatorNo} globalSearchDocs={globalSearchDocs} ></DocumentList>
                        </TabPanel>

                        {/* <TabPanel value="5">
                        <DocumentList/>
                    </TabPanel> */}
                        <TabPanel value="6" className='p-0'>
                            <CompaniesHouse></CompaniesHouse>
                        </TabPanel>
                        <TabPanel value="7">Item Three</TabPanel>
                    </TabContext>
                </Box>
            </Box>


            {/* edit Referance modal */}
            <Dialog
                open={Referance}
                onClose={EditCLientHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal full-modal'
            >
                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold text-black'>
                            Edit Client
                        </Typography>
                    </Box>

                    {/*  */}
                    <Button onClick={EditCLientHandleClose}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <EditReference companyEditDetails={companyEditDetails}></EditReference>
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={EditCLientHandleClose}>Disagree</Button>
                    <Button onClick={EditCLientHandleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
            </Dialog>


            {/* notes modal */}
            <Dialog
                open={Notesopen}
                onClose={NoteshandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
            >

                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold mb-0 text-black'>
                            Add Notes
                        </Typography>
                        {/* <Box className="btn-Select">
                                    <Button className='btn-white'>Action</Button>
                                    <Button className='btn-white'>Ser</Button>
                                    <Button className='btn-white'>Custom</Button>

                                    <hr />

                                    <Button className='btn-blue-2' size="small">Apply Now</Button>
                                </Box> */}
                    </Box>

                    {/*  */}
                    <Button onClick={NoteshandleClose} autoFocus sx={{ minWidth: 30 }}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='mb-4'>
                        <Box className='mt-1'>
                            {<HtmlEditorDX sx={{ Height: "200px !important" }} templateDataMarkup={templateDataMarkup} setTemplateDataMarkup={setTemplateDataMarkup} setEditorContentValue={setEditorContentValue}></HtmlEditorDX>}
                        </Box>
                    </DialogContentText>

                    <DialogActions>
                        <Button className="btn-blue-2" onClick={SaveStickyNotes} >Add Notes</Button>
                        <Button onClick={NoteshandleClose} className="btn-blue-2" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default ClientDetails