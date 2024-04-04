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
import UploadButtons from '../contact/contact-components/UploadProfile';
import ContactUDF from '../contact/contact-components/ContactUDF';
import { ToastContainer, toast } from 'react-toastify';
let originatorNo;
let folderData;
let clientData;
let clientName;
function AddContacts() {
  const [contact, setContact] = useState([]);
  const [fillcontact, setFillContact] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const tabValue = searchParams.get("val");
  const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
  const [value, setValue] = React.useState(tabValue ? tabValue : '1');
  const [clientDetails, setClientDetails] = useState({});
  const [folders, setFolders] = useState([]);
  const [Importdata, setImportdata] = useState([]);
  const [Importcontactdata, setImportcontactdata] = useState({});
  const [clientNames, setclientNames] = useState("");
  const [clientIddata, setClientIddata] = useState(-1);
  const [ImportContact, setImportContact] = useState([]);
  const [contactlistdata, setContactlistdata] = useState([]);
  const [bussiness, setBussiness] = useState([]); // State to hold folders data
  const [selectedFolderID, setSelectedFolderID] = useState(null);
  const [selectedBussId, setSelectedBussId] = useState(null);
  const [dataFromChild, setDataFromChild] = useState([]);
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
    MainUserName: "",
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
    ReferenceID: "",
    BirthDate: "",
    RolesData: "",
    Base64ImgData: "",
    CreatePortal: false,
  });
  const [companyDetails, setCompanyDetails] = useState([]);

  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

  const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";
  const portalUrl = "https://portal.docusoftweb.com/clientservices.asmx/";

  const ContactUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
  //let Util = new Utils();

  let Cls = new CommanCLS(baseUrl, agrno, Email, password);
  let portlCls = new CommanCLS(portalUrl, agrno, Email, password);
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


  const Json_GetCRMContactUDFValues = () => {
    let obj = {
      agrno: agrno,
      Email: Email,
      password: password,
      ProjectId: folderId,
      // ClientId: localStorage.getItem("origiNator") ? localStorage.getItem("origiNator") : userContactDetails.ReferenceID,
      ClientId: "0007",
      ContactId: "-1"
    };
    try {
      Cls.Json_GetCRMContactUDFValues(obj, (sts, data) => {
        if (sts) {
          if (data) {
            let json = JSON.parse(data);
            console.log("Json_GetCRMContactUDFValues", json);
            setClientDetails(json);


          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_GetCRMContactUDFValues", err)
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
  function saveUDF(contactnumber) {
    console.log(contactnumber, "contactNumber", dataFromChild);
    const result = Object.entries(dataFromChild)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    console.log(result, "resultresult");
    let requestBody = {
      agrno: agrno,
      Email: Email,
      password: password,
      OriginatorNo: clientIddata ? clientIddata : "",
      ProjectId: folderId ? folderId : -1,
      ClientUDFString: "",
      ContactUDFString: result ? result : "",
      ContactNo: contactnumber ? contactnumber : -1,
    };
    console.log(requestBody, "requestBody11");
    Cls.Json_CRMSaveUDFValues(requestBody, (sts, data) => {
      if (sts) {
        if (data) {
          console.log("Json_CRMSaveUDFValues", data);
          toast.success("Contact UDF Saved Successfully !");
        }
      }
    });

  };
  const Json_GetContactNumber = () => {
    let contactData = {
      "agrno": agrno,
      "Email": Email,
      "password": password,
      "ClientId": clientIddata ? clientIddata : -1,
      "ContactEmail": userContactDetails.EmailName ? userContactDetails.EmailName : "",
    }
    console.log(contactData, "contactData");
    Cls.Json_GetContactNumber(contactData, (sts, data) => {
      if (sts) {
        // console.log(sts, data,"newcontactData");
        // let jsonparse = JSON.parse(data);
        if (data) {
          console.log(data, "successcontact");
          Json_UpdateContactField(data);
          saveUDF(data);
        }
      }

    });
  };
  const Json_UpdateContactField = (contactNumber) => {
    let contactData =
    {
      "fieldName": "BirthDate",
      "fieldFile": "imgPath"
    }
    console.log(contactData, "contactData");
    if (contactData.fieldName == "BirthDate") {
      let birthdayObj = {
        "agrno": agrno,
        "Email": Email,
        "password": password,
        "ClientId": clientIddata ? clientIddata : -1,
        "projectid": folderId,
        "ContactNo": contactNumber,
        "fieldName": "BirthDate",
        "fieldValue": userContactDetails.BirthDate
      }
      Cls.Json_UpdateContactField(birthdayObj, (sts, data) => {
        if (sts) {
          console.log(sts, data, "birthdaynewcontactData");
          // let jsonparse = JSON.parse(data);
          // if (jsonparse) {
          //     console.log(jsonparse,"successcontact");


          // }
        }

      });
    }
    if (contactData.fieldFile == "imgPath") {
      let profileObj = {
        "agrno": agrno,
        "Email": Email,
        "password": password,
        "ClientId": clientIddata ? clientIddata : -1,
        "projectid": folderId,
        "ContactNo": contactNumber,
        "fieldName": "BirthDate",
        "fieldValue": userContactDetails.Base64ImgData
      }

      Cls.Json_UpdateContactField(profileObj, (sts, data) => {
        if (sts) {
          console.log(sts, data, "profilenewcontactData");
          // let jsonparse = JSON.parse(data);
          // if (jsonparse) {
          //     console.log(jsonparse,"successcontact");


          // }
        }

      });
    }
  };
  const PortalUserAccountCreated_Json = () => {
    let obj = {
      "accid": agrno,
      "email": Email,
      "password": password,
      "PresetMemorableData": true,
      "IssueReminders": false,
      "ExcludeMessageLink": false,
      "KeepSignedIn": false,
      "AllowUpload": false,
      "ChangeProfile": false,
      "LoggedIn": false,
      "Blocked": false,
      "emailAddress": userContactDetails.EmailName ? userContactDetails.EmailName : "",
      "ccode": clientIddata ? clientIddata : "",
      "clientName": clientNames ? clientNames : "",
    };
    try {
      portlCls.PortalUserAccountCreated_Json(obj, (sts, data) => {
        if (sts) {
          if (data) {
            // let json = JSON.parse(data);
            console.log("PortalUserAccountCreated_Json", data);
            toast.success("Portal Account Created Successfully !");

          }
        }
      });
    } catch (err) {
      console.log("Error while calling PortalUserAccountCreated_Json", err)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userContactDetails, "createportal");
    let contactData = {
      "agrno": agrno,
      "Email": Email,
      "password": password,
      "FirstName": userContactDetails.FirstName ? userContactDetails.FirstName : "",
      "LastName": userContactDetails.LastName ? userContactDetails.LastName : "",
      "Add1": userContactDetails.MainLine1Name ? userContactDetails.MainLine1Name : "",
      "Add2": userContactDetails.MainLine2Name ? userContactDetails.MainLine2Name : "",
      "Add3": userContactDetails.MainLine3Name ? userContactDetails.MainLine3Name : "",
      "Town": userContactDetails.MainTownName ? userContactDetails.MainTownName : "",
      "PostCode": userContactDetails.MainPostcodeName ? userContactDetails.MainPostcodeName : "",
      "Country": userContactDetails.mainCountry ? userContactDetails.mainCountry : "United Kingdom",
      "ManagerName": userContactDetails.FirstName + " " + userContactDetails.LastName,
      "Role": userContactDetails.RolesData ? userContactDetails.RolesData : "",
      "Tel": userContactDetails.MainTelephoneName ? userContactDetails.MainTelephoneName : "",
      "Mobile": userContactDetails.MainMobileName ? userContactDetails.MainMobileName : "",
      "greeting": userContactDetails.GreetingName ? userContactDetails.GreetingName : "",
      "email": userContactDetails.EmailName ? userContactDetails.EmailName : "",
      "note": "",
      "emailupdate": userContactDetails.EmailName ? userContactDetails.EmailName : "",
      "CActive": userContactDetails.Inactive === true ? "Yes" : "No",
      "AssignedManager": userContactDetails.MainUserId ? userContactDetails.MainUserId : -1,
      "maincontact": userContactDetails.MainContact ? userContactDetails.MainContact : false,
      "CCode": clientIddata ? clientIddata : -1,
      "Salutation": userContactDetails.Title ? userContactDetails.Title : "",
      "accid": agrno
    }
    console.log(contactData, "contactData");
    Cls.AddContact(contactData, (sts, data) => {
      if (sts) {
        if (data) {
          if (data == 'Success') {
            console.log(data, "successcontact");
            if (userContactDetails.CreatePortal == true) {
              PortalUserAccountCreated_Json();
            }
            Json_GetContactNumber();
            toast.success("Contact Added Successfully !");

            // toast.success("Reference ID Already Exists!"); 

          }
        }
      }

    });
  };
  const handleListItemClick = (item) => {
    console.log('Selecteditem:', item);
    setFillContact(item);
    let data = { ...userContactDetails };
    data = {
      ...data, ["Title"]: item.Salutation,
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
      ["ReferenceID"]: clientNames
    };
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
      console.log(value, "valueclientid");
      clientData = value.ClientID;
      localStorage.setItem("origiNator", clientData);
      clientName = value.Client;
      setclientNames(clientName);
      setClientIddata(value.ClientID);
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
            console.log(json.Table, "jsonjsonjson");
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
        CompanyName_Number: Importdata
      };
      try {
        Cls.Json_CompanyHouseDetails(requestBody, (sts, data) => {
          if (sts) {
            if (data) {
              let json = JSON.parse(data);
              console.log(json, "Json_CompanyHouseDetails");
              let jdata = json.ContactDetails;
              console.log("Json_CompanyHouseDetails1", jdata);
              // setContactlistdata(json.Table);
              if (jdata.length > 0) {
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
      console.log(value, "onChangetitle", result);
      setContact(result[0]);

    } else {
    }
  };
  // const onChangeImportData = (e) => {

  //   e.preventDefault();
  //   console.log(e.target.value, "onChangeImportData");
  //   setImportdata(e.target.value);

  // };
  const onChangeImportData = (e) => {

    e.preventDefault();
    const inputValue = e.target.value;
    console.log(inputValue,"import_data");
    setImportdata(inputValue);
    Json_CompanyHouseDetails(inputValue);
};
const [txtValue,setTxtValue]=useState(null);
const [open, setOpen] = useState(false);
const handleOptionClick = (item) => {
  console.log(item, "onSelectData");
      setTxtValue(item);
    setOpen(false); 
    setImportcontactdata(item);
  // Perform actions with the id
  // let data = id.company_number;
  // Json_CompanyHouseDetails();
  // console.log(data, "onSelectDatacnnumbr");

};
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(e.target.value, "onChangeImportData");
      Json_CompanyHouseDetails();
    }
  }
  console.log(contact, "contactcontact",ImportContact);
  useEffect(() => {
    setAgrNo(localStorage.getItem("agrno"));
    setPassword(localStorage.getItem("Password"));
    setEmail(localStorage.getItem("Email"));
    setFolderId(localStorage.getItem("FolderId"));
    // setIntUserid(localStorage.getItem("UserId"));
    Json_GetFolders();
    Json_GetClientCardDetails();
    Json_GetCRMContactUDFValues();
    Json_GetAllContacts();
  }, []);

  return (
    <Box className="container-fluid p-0">
      <ToastContainer></ToastContainer>
      <CustomBreadCrumbs tabs={[{ tabLink: "/dashboard/Connections", tabName: "Connections" }, { tabLink: "/dashboard/clientDetails", tabName: "Client Details" }]} />


      <Box sx={{ width: '100%', typography: 'body1' }} className="mt-3">
        <TabContext value={value}>
          <Box className='mb-1'>
            <TabList onChange={handleChange} aria-label="lab API tabs example" className='custom-tabs'>
              <Tab label="Contact Details" value="1" />
              <Tab label="AML Details" value="2" />
              <Tab label="UDF Details" value="3" />
              {/* <Tab label="Send Proposal" value="4" />
                            <Tab label="Portal User" value="5" />
                            <Tab label="Companies House" value="6" />
                            <Tab label="Requested Document" value="7" /> */}
            </TabList>
          </Box>
          <TabPanel value="1" className='p-0'>
            <Box className="general-tab white-box">
              <Box className='d-flex'>
                <Box className="mb-3 pe-4 border-end me-4">
                  <UploadButtons
                    userContactDetails={userContactDetails}
                    setContactDetails={setContactDetails}
                  />
                </Box>

                <Box className="mb-3 w-100">

                  <Grid container spacing={2}>
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
                    <Grid item xs={6} md={6}>
                      {/* <TextField
                        // {...params}wid
                        fullWidth
                        variant="outlined"
                        name="importclient"
                        // value={Importdata}
                        onKeyDown={handleKeyDown}
                        onChange={onChangeImportData}
                        label="Import List"
                      /> */}
                       <Autocomplete
      fullWidth
      // options={ImportContact.map((option) => option.title)}
      options={ImportContact} // Pass the entire ImportContact array
      getOptionLabel={(option) => option.FirstName + " " + option.LastName}
      onChange={(e, value) => setImportdata(value)}
      onKeyDown={handleKeyDown}
      // inputValue={ImportContact}
      noOptionsText="No matches found"
      filterOptions={(x) => x}
      autoComplete
      includeInputInList
    value={txtValue}
    open={open} // Controlled by state
    onOpen={() => setOpen(true)} // Open the Autocomplete dropdown
    onClose={() => setOpen(false)} // Close the Autocomplete dropdown
      renderOption={(props, option) => {
        // Custom rendering for each option
        console.log(option,"rendwered dynamic from apifff",props);
        return (
          !option.resigned_on && (
            <div>
                <li
                    {...props}
                    onClick={() => {
                        handleOptionClick(option); // Pass the id directly
                    }}
                >
                    <Grid container alignItems="center">
                        <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                            {option.FirstName + " " + option.LastName}
                        </Grid>
                    </Grid>
                </li>
            </div>
        )
        
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          variant="outlined"
          name="importclient"
          onChange={onChangeImportData}
          label="Enter Company Name or Number"
        />
      )}
    />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ContactMainform
                        clientNames={clientNames}
                        contact={contact}
                        contactlistdata={contactlistdata}
                        userContactDetails={userContactDetails}
                        setContactDetails={setContactDetails}
                        Importcontactdata={Importcontactdata}
                      />
                    </Grid>


                    

                  </Grid>

                </Box>
              </Box>

              <Box className="mb-3">
                {/* <MainContact 
              userContactDetails={userContactDetails}
              setContactDetails={setContactDetails}
              /> */}
                <Grid container spacing={3}>

                </Grid>
              </Box>

              <Box className='text-end'>
                <Button
                  style={{ marginTop: "5px" }}
                  variant="contained"
                  disabled={!clientData || !selectedFolderID}
                  onClick={handleSubmit}
                  className='btn-blue-2'
                >
                  Add New Contact
                </Button>
              </Box>
            </Box>

          </TabPanel>

          <TabPanel value="2" className='p-0'>
            {/* <ClientAddress></ClientAddress> */}
          </TabPanel>
          <TabPanel value="3">
            {/* <Contact></Contact> */}
            <Box className="general-tab white-box">
              <ContactUDF
                data={clientDetails}
                setDataFromChild={setDataFromChild}
              ></ContactUDF>
            </Box>

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
