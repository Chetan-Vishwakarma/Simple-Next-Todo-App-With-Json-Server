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
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useSearchParams } from 'react-router-dom';
import CompaniesHouse from '../client/client-components/CompaniesHouse';
import TaskList from '../client/client-components/TaskList';
import CustomBreadCrumbs from './CustomBreadCrumbs';
import Contact from '../client/client-components/Contact';
import CommanCLS from '../services/CommanService';
import { Autocomplete, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import ContactMainform from '../contact/contact-components/ContactMainform';
import { toast } from 'react-toastify';
let originatorNo;
let folderData;
let clientData;
let clientName;
function AddContacts() {
    const [contact, setContact] = useState([]);
    const [fillcontact, setFillContact] = useState({});
    const [searchParams,setSearchParams] = useSearchParams();
    const tabValue = searchParams.get("val");
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const [value, setValue] = React.useState(tabValue?tabValue:'1');
    const [clientDetails, setClientDetails] = useState({});
    const [folders, setFolders] = useState([]);
    const [Importdata, setImportdata] = useState("");
    const [clientNames, setclientNames] = useState("");
    const [ImportContact, setImportContact] = useState("");
    const [contactlistdata, setContactlistdata] = useState([]);
    const [bussiness, setBussiness] = useState([]); // State to hold folders data
    const [selectedFolderID, setSelectedFolderID] = useState(null);
    const [selectedBussId, setSelectedBussId] = useState(null);
    const [userContactDetails, setContactDetails] = useState({
      Title: "",
      FirstName: "",
      LastName: "",
      ReferenceName: "",
      MainContact: false,
      Inactive: false,
      GreetingName: "",
      EmailName: "",
      MainUserId: -1,
      MainUserName:"",
      MainLine1Name: "",
      MainLine2Name: "",
      MainLine3Name: "",
      MainTownName: "",
      MainPostcodeName: "",
      Maincontactcountry: "",
      MainTelephoneName: "",
      MainMobileName: "",
      mainCountry: "",
      billingsCountry: "",
      ragistersCountry: "",
      ReferenceID:"",
      BirthDate:""
    });
    const [companyDetails, setCompanyDetails] = useState([]);

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
                      
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetClientCardDetails", err)
        }
    }
    const Json_GetFolders = () => {
        let requestBody = {
          agrno: agrno,
          Email: Email,
          password: password,
        };
        try {
          Cls.Json_GetFolders(requestBody, (sts, data) => {
            if (sts) {
              if (data) {
                let json = JSON.parse(data);
                setFolders(json.Table);
              }
            }
          });
        } catch (err) {
          console.log("Error while calling Json_GetToFavourites", err);
        }
      };
      const Json_GetClientsByFolder = (projectId) => {
        let requestBody = {
            agrno: agrno,
            Email: Email,
            password: password,
            ProjectId: projectId,
          };
          try {
            Cls.Json_GetClientsByFolder(requestBody, (sts, data) => {
              if (sts) {
                if (data) {
                  let json = JSON.parse(data);
                  setBussiness(json.Table1);
                }
              }
            });
          } catch (err) {
            console.log("Error while calling Json_GetToFavourites", err);
          }
          
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        let contactData = {
          "agrno": agrno,
          "Email": Email,
          "password": password,
          "FirstName": userContactDetails.FirstName,
          "LastName": userContactDetails.LastName,
          "Add1": userContactDetails.MainLine1Name,
          "Add2": userContactDetails.MainLine2Name,
          "Add3": userContactDetails.MainLine3Name,
          "Town": userContactDetails.MainTownName,
          "PostCode": userContactDetails.MainPostcodeName,
          "Country": userContactDetails.mainCountry,
          "ManagerName": userContactDetails.FirstName+" "+userContactDetails.LastName,
          "Role": "",
          "Tel": userContactDetails.MainTelephoneName,
          "Mobile": userContactDetails.MainMobileName,
          "greeting": userContactDetails.GreetingName,
          "email":userContactDetails.EmailName,
          "note": "",
          "emailupdate":userContactDetails.EmailName,
          "CActive": "Yes",
          "AssignedManager": userContactDetails.MainUserId,
          "maincontact": userContactDetails.MainContact,
          "CCode": userContactDetails.ReferenceID,
          "Salutation": userContactDetails.Title,
          "accid": agrno
      }
        console.log(contactData,"contactData");
        Cls.AddContact(contactData, (sts, data) => {
          console.log(sts, data,"newcontactData");
          let jsonparse = data;
          if (jsonparse=='Success') {
              console.log(jsonparse,"successcontact");
            
              toast.success("Contact Added Successfully !"); 
           
              // toast.success("Reference ID Already Exists!"); 
            
          }
        });
      };    
  const handleListItemClick = (item) => {
    console.log('Selecteditem:', item);
    setFillContact(item);
    let data = { ...userContactDetails };
          data = { ...data, ["Title"]: item.Salutation,
          ["FirstName"]: item.FirstName,
          ["LastName"]: item.LastName,
          ["ReferenceName"]: "",
          ["MainContact"]: item.MainContact,
          ["Inactive"]: item.CActive,
          ["GreetingName"]: item.Greeting,
          ["EmailName"]: item.EMailId,
          ["MainUserId"]: -1,
          ["MainLine1Name"]: item.Add1,
          ["MainLine2Name"]: item.Add2,
          ["MainLine3Name"]: item.Add3,
          ["MainTownName"]: item.Town,
          ["MainPostcodeName"]: item.PostCode,
          ["Maincontactcountry"]: "",
          ["MainTelephoneName"]: item.Tel,
          ["MainMobileName"]: item.Mobile,
          ["mainCountry"]: "",
          ["billingsCountry"]: "",
          ["ragistersCountry"]: "",
          ["ReferenceID"]:clientNames };
          setContactDetails(data);
  };
  const updateReferenceID = (client) => {
    let data = { ...userContactDetails };  
    data = { ...data, ReferenceID: client };
    console.log(data, "Update ReferenceID");
    setContactDetails(data);
  };
  
      const onChangebussines = (
        event,
        value
      ) => {
        event.preventDefault();
        if (value) {
          clientData = value.ClientID;
          clientName = value.Client;
          setclientNames(clientName);
          updateReferenceID(value.Client);
        } else {
        }
      };
      const Json_GetAllContacts = () => {
        let requestBody = {
          agrno: agrno,
          Email: Email,
          password: password,
        };
        try {
          Cls.Json_GetAllContacts(requestBody, (sts, data) => {
            if (sts) {
              if (data) {
                let json = JSON.parse(data);
                console.log(json.Table,"jsonjsonjson");
                setContactlistdata(json.Table);
              }
            }
          });
        } catch (err) {
          console.log("Error while calling Json_GetToFavourites", err);
        }
      };
      const 
      Json_CompanyHouseDetails = () => {
        let requestBody = {
          CompanyName_Number:Importdata
        };
        try {
          Cls.Json_CompanyHouseDetails(requestBody, (sts, data) => {
            if (sts) {
              if (data) {
                let json = JSON.parse(data);
                console.log(json,"Json_CompanyHouseDetails");
                let jdata = json.ContactDetails;
                console.log("Json_CompanyHouseDetails1", jdata);
                // setContactlistdata(json.Table);
                if(jdata.length > 0){
                  setImportContact(jdata);
                }
              }
            }
          });
        } catch (err) {
          console.log("Error while calling Json_GetToFavourites", err);
        }
      };
      const onChangeclientlist = (
        event,
        value
      ) => {
        event.preventDefault();
        if (value) {
          // Update the selectedFolderID state with the FolderID of the selected option
          folderData = value.FolderID;
          Json_GetClientsByFolder(folderData);
          setSelectedFolderID(value.FolderID);
          console.log(value.FolderID, "FolderID", selectedFolderID);
        } else {
          // If no option is selected, clear the selectedFolderID state
          setSelectedFolderID(null);
        }
      };
        const clientlist = {
            options: folders,
            getOptionLabel: (option) => option.Folder || "",
          };
          const bussinesslist = {
            options: bussiness,
            getOptionLabel: (option) => option.Client || "",
          };
          const contactlist = {
            options: contactlistdata,
            getOptionLabel: (option) => option.EMailId || "",
          };
          const onChangecontactlist = (
            event,
            value
          ) => {
            event.preventDefault();
            if (value) {
              let result = contactlistdata.filter((el) => el["EMailId"] === value.EMailId);
              console.log(value, "onChangetitle",result);
              setContact(result[0]);
            
            } else {
            }
          };
          const onChangeImportData = (e) => {
           
                e.preventDefault();
                console.log(e.target.value, "onChangeImportData");
                setImportdata(e.target.value);
          
        };
           
          const handleKeyDown = (e) => {  
            if (e.key === 'Enter') {   
              e.preventDefault();
              console.log(e.target.value, "onChangeImportData");
              Json_CompanyHouseDetails();
            }
          }
          console.log(contact, "contactcontact");
    useEffect(() => {
      setAgrNo(localStorage.getItem("agrno"));
      setPassword(localStorage.getItem("Password"));
      setEmail(localStorage.getItem("Email"));
      setFolderId(localStorage.getItem("FolderId"));
      // setIntUserid(localStorage.getItem("UserId"));
      Json_GetFolders();
        Json_GetClientCardDetails();
        Json_GetAllContacts();
    }, []);

    return (
        <Box className="container-fluid p-0">

            <CustomBreadCrumbs tabs={[{tabLink:"/dashboard/Connections",tabName:"Connections"},{tabLink:"/dashboard/clientDetails",tabName:"Client Details"}]}/>


            <Box sx={{ width: '100%', typography: 'body1' }} className="mt-3">
                <TabContext value={value}>
                    <Box className='mb-1'>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" className='custom-tabs'>
                            <Tab label="Contact Details" value="1" />
                            <Tab label="AML Details" value="2" />
                            <Tab label="UDF Details" value="3" />
                            <Tab label="Send Proposal" value="4" />
                            <Tab label="Portal User" value="5" />
                            <Tab label="Companies House" value="6" />
                            <Tab label="Requested Document" value="7" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className='p-0'>
                        <Box className="general-tab white-box">
                        <Box className="row mb-3">
                        <Grid container spacing={3}>
                        <Grid item xs={6} md={6}>
                        <Autocomplete
                      {...clientlist}
                      id="clientlist"
                      clearOnEscape
                      onChange={onChangeclientlist}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          name="Selectclient"
                          value={""}
                        //   onChange={onChange}
                          label="Folder List"
                        />
                      )}
                    />
        </Grid>
        <Grid item xs={6} md={6}>
        <Autocomplete
                      {...bussinesslist}
                      id="clear-on-escape-teams"
                      clearOnEscape
                      onChange={onChangebussines}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="Selectteamsa"
                          value={""}
                        //   onChange={onChangebussines}
                          label="Reference List"
                          variant="outlined"
                        />
                      )}
                    />
        </Grid>
       
        
                        </Grid>     
              
              </Box>
              <Box className="row mb-3">
              {/* <MainContact 
              userContactDetails={userContactDetails}
              setContactDetails={setContactDetails}
              /> */}
               <Grid container spacing={3}>
      <Grid item xs={6} md={6}>
      <Autocomplete
                      {...contactlist}
                      id="contactlist"
                      clearOnEscape
                      onChange={onChangecontactlist}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          name="contactlist"
                          value={""}
                        //   onChange={onChange}
                          label="Contact List"
                        />
                      )}
                    />
      </Grid>
    </Grid>
              </Box>
              <Box className="row mb-3">
              <ContactMainform 
              clientNames={clientNames}
              contact={contact}
               userContactDetails={userContactDetails}
               setContactDetails={setContactDetails}
              />
              </Box>
              <Box className="row mb-3">
              <Grid container spacing={3}>
      <Grid item xs={6} md={6}>
              <TextField
                          // {...params}wid
                          fullWidth
                          variant="outlined"
                          name="importclient"
                          // value={Importdata}
                          onKeyDown={handleKeyDown}
                          onChange={onChangeImportData}
                          label="Import List"
                        />
                        </Grid>
                        </Grid>
              </Box>
             
              <Box className="row mb-3">
              <Grid container spacing={3}>
      <Grid item xs={6} md={6}>
      {ImportContact && ImportContact.length > 0 && (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
              {ImportContact.map((item, index) => (
                !item.resigned_on && ( // Add this condition
                <ListItem key={index} button
                onClick={() => handleListItemClick(item)}
                >
                  <ListItemIcon>
                  <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.FirstName}/>
                  {/* Add additional secondary text or information as needed */}
                </ListItem>
              )
              ))}
            </List>
          )}
                        </Grid>
                        </Grid>
              </Box>
              <Box className="row mb-3">
              <Grid container spacing={3}>
      <Grid item xs={6} md={6}>
      <Button
              style={{ marginTop: "5px" }}
              variant="contained"
              disabled={!clientData || !selectedFolderID}
              onClick={handleSubmit}
            >
              Add New Contact
            </Button>{" "}
                        </Grid>
                        </Grid>
              </Box>
                        </Box>
                       
                    </TabPanel>

                    <TabPanel value="2" className='p-0'>
                        {/* <ClientAddress></ClientAddress> */}
                    </TabPanel>
                    <TabPanel value="3">
                        <Contact></Contact>
                    </TabPanel>
                    <TabPanel value="4">
                        <TaskList></TaskList>
                    </TabPanel>

                    {/* <TabPanel value="5" className='p-0'>
                        <DocumentList clientId={originatorNo} globalSearchDocs={globalSearchDocs} ></DocumentList>
                    </TabPanel> */}

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
    )
}
export default AddContacts;
