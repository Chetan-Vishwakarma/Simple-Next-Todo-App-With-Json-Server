import React, { memo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ToggleButton from "@mui/material/ToggleButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EmailIcon from "@mui/icons-material/Email";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SendIcon from "@mui/icons-material/Send";
import { useLocation, useSearchParams } from "react-router-dom";
import CompaniesHouse from "../client/client-components/CompaniesHouse";
import TaskList from "../client/client-components/TaskList";
import CustomBreadCrumbs from "./CustomBreadCrumbs";
import Contact from "../client/client-components/Contact";
import CommanCLS from "../services/CommanService";
import {
  Autocomplete,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import ContactMainform from "../contact/contact-components/ContactMainform";
import UploadButtons from "../contact/contact-components/UploadProfile";
import ContactUDF from "../contact/contact-components/ContactUDF";
import { ToastContainer, toast } from "react-toastify";
let originatorNo;
let folderData;
let clientData;
let defaultclientData;
let clientName;
function AddContacts({ addContactData,contactDetails}) {
  console.log(addContactData, "addContactData11111",contactDetails);
  const [contact, setContact] = useState([]);
  const [fillcontact, setFillContact] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const tabValue = searchParams.get("val");
  const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
  const [value, setValue] = React.useState(tabValue ? tabValue : "1");
  const [clientDetails, setClientDetails] = useState({});
  const [folders, setFolders] = useState([]);
  const [Importdata, setImportdata] = useState([]);
  const [GellAllClientList, setGellAllClientList] = useState([]);
  const [Importcontactdata, setImportcontactdata] = useState({});
  const [clientNames, setclientNames] = useState("");
  const [clientIddata, setClientIddata] = useState("");
  const [ImportContact, setImportContact] = useState([]);
  const [ContactUDFEdit, setContactUDFEdit] = useState([]);
  const [contactlistdata, setContactlistdata] = useState([]);
  const [bussiness, setBussiness] = useState([]); // State to hold folders data
  const [defaultClient, setdefaultClient] = useState(null);
  const [selectedFolderID, setSelectedFolderID] = useState(null);
  const [selectedBussId, setSelectedBussId] = useState(null);
  const [defaultFoldefr, setDefaultFolders] = useState(null);
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
    Notes:""
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
      ClientId: (contactDetails && contactDetails.length > 0 ) ? contactDetails[0]?.OriginatorNo ? contactDetails[0]?.OriginatorNo : "" : "",
      ContactId: (contactDetails && contactDetails.length > 0 ) ? contactDetails[0]?.ContactNo ? contactDetails[0]?.ContactNo : "-1" : "-1",
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
      console.log("Error while calling Json_GetCRMContactUDFValues", err);
    }
  };
  const Json_GetClientCardDetails = () => {
    let obj = {
      Email: Email,
      agrno: agrno,
      intProjectId: folderId,
      password: password,
      strOrignatorNumber: clientIddata ? clientIddata : "",
    };
    try {
      webClientCLS.Json_GetClientCardDetails(obj, (sts, data) => {
        if (sts) {
          if (data) {
            let json = JSON.parse(data);
            console.log("Json_GetClientCardDetails", json);
            //setClientDetails(json);
            setCompanyDetails(json.Table1);
            setContactUDFEdit(json.Table5);
          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_GetClientCardDetails", err);
    }
  };
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
  const Json_GetAllClientList = () => {
    let requestBody = {
      agrno: agrno,
      Email: Email,
      password: password,
    };
    try {
      Cls.Json_GetAllClientList(requestBody, (sts, data) => {
        if (sts) {
          if (data) {
            let json = JSON.parse(data);
            console.log(json, "jsondataget");
            if (json.Table && json.Table.length > 0) {
              const uniqueArray = json.Table.filter(
                (obj, index, self) =>
                  index === self.findIndex((t) => t.ClientId === obj.ClientId)
              );
              if(contactDetails && contactDetails.length > 0) {
                const filtercontact = json.Table.find(
                  (obj) => obj.ClientId == contactDetails[0].OriginatorNo
                );
                console.log(filtercontact,"filtercontactdata");
                setdefaultClient(filtercontact);
              }
              console.log(uniqueArray,"uniqueArray",json.Table);
              setBussiness(uniqueArray);
              try{
                const filteredData = json.Table.find(
                  (obj) => obj.ClientId === addContactData.Clientid
                );
               
               
                if(filteredData){
                  setdefaultClient(filteredData);
                  defaultclientData=filteredData.ClientId;
                  console.log(filteredData, "filteredData", json.Table);
                }
              } catch (e) {
                 console.log("not_found_data")
              }

            } 
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
            console.log(json, "clientdatalist");
          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_GetToFavourites", err);
    }
  };
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
  }
  const Json_GetContactNumber = () => {
    let contactData = {
      agrno: agrno,
      Email: Email,
      password: password,
      ClientId: clientIddata ? clientIddata : -1,
      ContactEmail: userContactDetails.EmailName
        ? userContactDetails.EmailName
        : "",
    };
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
    let contactData = {
      fieldName: "BirthDate",
      fieldFile: "imgPath",
    };
    console.log(contactData, "contactData");
    if (contactData.fieldName == "BirthDate") {
      let birthdayObj = {
        agrno: agrno,
        Email: Email,
        password: password,
        ClientId: clientIddata ? clientIddata : -1,
        projectid: folderId,
        ContactNo: contactNumber,
        fieldName: "BirthDate",
        fieldValue: userContactDetails.BirthDate,
      };
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
        agrno: agrno,
        Email: Email,
        password: password,
        ClientId: clientIddata ? clientIddata : -1,
        projectid: folderId,
        ContactNo: contactNumber,
        fieldName: "imgPath",
        fieldValue: userContactDetails.Base64ImgData,
      };

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
      accid: agrno,
      email: Email,
      password: password,
      PresetMemorableData: true,
      IssueReminders: false,
      ExcludeMessageLink: false,
      KeepSignedIn: false,
      AllowUpload: false,
      ChangeProfile: false,
      LoggedIn: false,
      Blocked: false,
      emailAddress: userContactDetails.EmailName
        ? userContactDetails.EmailName
        : "",
      ccode: clientIddata ? clientIddata : "",
      clientName: clientNames ? clientNames : "",
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
      console.log("Error while calling PortalUserAccountCreated_Json", err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userContactDetails, "createportal");
    
    // console.log(contactData, "contactData");
    if(contactDetails && contactDetails.length > 0) {
      let contactData = {
        agrno: agrno,
        Email: Email,
        password: password,
        FirstName: userContactDetails.FirstName
          ? userContactDetails.FirstName
          : "",
        LastName: userContactDetails.LastName ? userContactDetails.LastName : "",
        Add1: userContactDetails.MainLine1Name
          ? userContactDetails.MainLine1Name
          : "",
        Add2: userContactDetails.MainLine2Name
          ? userContactDetails.MainLine2Name
          : "",
        Add3: userContactDetails.MainLine3Name
          ? userContactDetails.MainLine3Name
          : "",
        Town: userContactDetails.MainTownName
          ? userContactDetails.MainTownName
          : "",
        PostCode: userContactDetails.MainPostcodeName
          ? userContactDetails.MainPostcodeName
          : "",
        Country: userContactDetails.mainCountry
          ? userContactDetails.mainCountry
          : "United Kingdom",
        ManagerName:
          userContactDetails.FirstName + " " + userContactDetails.LastName,
        Role: userContactDetails.RolesData ? userContactDetails.RolesData : "",
        Tel: userContactDetails.MainTelephoneName
          ? userContactDetails.MainTelephoneName
          : "",
        Mobile: userContactDetails.MainMobileName
          ? userContactDetails.MainMobileName
          : "",
        greeting: userContactDetails.GreetingName
          ? userContactDetails.GreetingName
          : "",
          Contactemail: userContactDetails.EmailName ? userContactDetails.EmailName : "",
        note: userContactDetails.Notes ? userContactDetails.Notes : "",
        emailupdate: userContactDetails.EmailName
          ? userContactDetails.EmailName
          : "",
        CActive: userContactDetails.Inactive === true ? "Yes" : "No",
        AssignedManager: userContactDetails.MainUserId
          ? userContactDetails.MainUserId
          : -1,
        maincontact: userContactDetails.MainContact
          ? userContactDetails.MainContact
          : false,
        CCode: contactDetails[0].OriginatorNo ? contactDetails[0].OriginatorNo : "-1",
        emailupdate: userContactDetails.EmailName ? userContactDetails.EmailName : "",
        Salutation: userContactDetails.Title ? userContactDetails.Title : "",
        accid: agrno,
      };
      Cls.UpdateContact(contactData, (sts, data) => {
        if (sts) {
          if (data) {
            if (data == "Success") {
              console.log(data, "successcontact");
              // if (userContactDetails.CreatePortal == true) {
              //   PortalUserAccountCreated_Json();
              // }
              // Json_GetContactNumber();
              toast.success("Contact Updated Successfully !");
  
              // toast.success("Reference ID Already Exists!");
            }
          }
        }
      });
    } else {
      let contactData = {
        agrno: agrno,
        Email: Email,
        password: password,
        FirstName: userContactDetails.FirstName
          ? userContactDetails.FirstName
          : "",
        LastName: userContactDetails.LastName ? userContactDetails.LastName : "",
        Add1: userContactDetails.MainLine1Name
          ? userContactDetails.MainLine1Name
          : "",
        Add2: userContactDetails.MainLine2Name
          ? userContactDetails.MainLine2Name
          : "",
        Add3: userContactDetails.MainLine3Name
          ? userContactDetails.MainLine3Name
          : "",
        Town: userContactDetails.MainTownName
          ? userContactDetails.MainTownName
          : "",
        PostCode: userContactDetails.MainPostcodeName
          ? userContactDetails.MainPostcodeName
          : "",
        Country: userContactDetails.mainCountry
          ? userContactDetails.mainCountry
          : "United Kingdom",
        ManagerName:
          userContactDetails.FirstName + " " + userContactDetails.LastName,
        Role: userContactDetails.RolesData ? userContactDetails.RolesData : "",
        Tel: userContactDetails.MainTelephoneName
          ? userContactDetails.MainTelephoneName
          : "",
        Mobile: userContactDetails.MainMobileName
          ? userContactDetails.MainMobileName
          : "",
        greeting: userContactDetails.GreetingName
          ? userContactDetails.GreetingName
          : "",
          Contactemail: userContactDetails.EmailName ? userContactDetails.EmailName : "",
        note: userContactDetails.Notes ? userContactDetails.Notes : "",
        emailupdate: userContactDetails.EmailName
          ? userContactDetails.EmailName
          : "",
        CActive: userContactDetails.Inactive === true ? "Yes" : "No",
        AssignedManager: userContactDetails.MainUserId
          ? userContactDetails.MainUserId
          : -1,
        maincontact: userContactDetails.MainContact
          ? userContactDetails.MainContact
          : false,
        CCode: clientIddata ? clientIddata : defaultclientData,
        Salutation: userContactDetails.Title ? userContactDetails.Title : "",
        accid: agrno,
      };
      Cls.AddContact(contactData, (sts, data) => {
        if (sts) {
          if (data) {
            if (data == "Success") {
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
    }
   
  };
  const handleListItemClick = (item) => {
    console.log("Selecteditem:", item);
    setFillContact(item);
    let data = { ...userContactDetails };
    data = {
      ...data,
      ["Title"]: item.Salutation,
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
      ["ReferenceID"]: clientNames,
    };
    setContactDetails(data);
  };
  const updateReferenceID = (client) => {
    let data = { ...userContactDetails };
    data = { ...data, ReferenceID: client };
    console.log(data, "Update ReferenceID");
    setContactDetails(data);
  };

  const onChangebussines = (event, value) => {
    event.preventDefault();
    if (value) {
      console.log(value, "valueclientid");
      clientData = value.ClientId;
      defaultclientData = value.ClientId;
      localStorage.setItem("origiNator", clientData);
      clientName = value.Client;
      setclientNames(clientName);
      // setDefaultFolders(value);
      setdefaultClient(value);
      setClientIddata(value.ClientId);
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
  const Json_CompanyHouseDetails = () => {
    let requestBody = {
      CompanyName_Number: Importdata,
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
  const onChangeclientlist = (event, value) => {
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
  const onChangecontactlist = (event, value) => {
    event.preventDefault();
    if (value) {
      let result = contactlistdata.filter(
        (el) => el["EMailId"] === value.EMailId
      );
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
    console.log(inputValue, "import_data");
    setImportdata(inputValue);
    Json_CompanyHouseDetails(inputValue);
  };
  const [txtValue, setTxtValue] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOptionClick = (item) => {
    console.log(item, "onSelectData");
    setImportcontactdata("");
    setTxtValue(item);
    setOpen(false);
    setImportcontactdata(item);
    // Perform actions with the id
    // let data = id.company_number;
    // Json_CompanyHouseDetails();
    // console.log(data, "onSelectDatacnnumbr");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(e.target.value, "onChangeImportData");
      Json_CompanyHouseDetails();
    }
  };
  const handleChangeTextArea = (e) => {
    e.preventDefault();
    let data = { ...userContactDetails };
    data = { ...data, ["Notes"]: e.target.value };
    setContactDetails(data);
  }
  console.log(contact, "contactcontact", ImportContact);
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
    Json_GetAllClientList();
    if(contactDetails && contactDetails.length > 0){
      console.log(contactDetails,"contactdetailssonam");
      let item = contactDetails[0];
      let data = { ...userContactDetails };
    data = {
      ...data,
      ["Title"]: item.Title,
      ["FirstName"]: item["First Name"],
      ["LastName"]: item["Last Name"],
      ["ReferenceName"]: "",
      ["MainContact"]: item["Main Contact"],
      ["Inactive"]: item.CActive,
      ["GreetingName"]: item.Greeting,
      ["EmailName"]: item["E-Mail"],
      ["MainUserId"]: -1,
      ["MainLine1Name"]: item["Address 1"],
      ["MainLine2Name"]: item["Address 2"],
      ["MainLine3Name"]: item["Address 3"],
      ["MainTownName"]: item.Town,
      ["Notes"]: item.Note,
      ["MainPostcodeName"]: item.Postcode,
      ["Maincontactcountry"]: "",
      ["MainTelephoneName"]: item.Tel,
      ["MainMobileName"]: item.Mobile,
      ["mainCountry"]: "",
      ["billingsCountry"]: "",
      ["ragistersCountry"]: "",
      ["ReferenceID"]: clientNames,
      ["CreatePortal"]: item["Portal User"],
      ["Base64ImgData"]:item.imgPath 
    };
    setContactDetails(data);
    }
    const clientName = localStorage.getItem("ClientName");
    // Update userContactDetails state with the retrieved value
    if (clientName) {
      setContactDetails((prevState) => ({
        ...prevState,
        ReferenceID: clientName,
      }));
    }
  }, []);
  console.log(defaultClient, "defaultClientfirst");
  return (
    <Box className="container-fluid p-0">
      {/* <ToastContainer style={{ zIndex: "9999999" }}></ToastContainer> */}
      <CustomBreadCrumbs
        tabs={[
          { tabLink: "/dashboard/Connections", tabName: "Connections" },
          { tabLink: "/dashboard/clientDetails", tabName: "Client Details" },
        ]}
      />

      <Box sx={{ width: "100%", typography: "body1" }} className="mt-3">
        <Box className="general-tab white-box">
          <Box className="d-flex">
            <Box className="mb-3 pe-2 me-2">
              <Box className="position-sticky top-0">
                <UploadButtons
                  userContactDetails={userContactDetails}
                  setContactDetails={setContactDetails}
                />
                <textarea
                  className="form-control textarea-2 mt-3"
                  placeholder="Notes.."
                  name="Notes"
                  value={userContactDetails?.Notes}
                  onChange={handleChangeTextArea} 
                ></textarea>
              </Box>
            </Box>

            <Box className="mb-3 w-100">
              <Box className="well mb-4">
                <h2 className="font-20 mb-3 text-black">Contact Details</h2>
                <Box className="well well-2 mb-3">
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <h2 className="font-14 bold mb-4 text-black">
                        Import Existing DocuSoft Contact
                      </h2>
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
                            label="Enter Contact Email"
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <h2 className="font-14 bold mb-4 text-black">
                        Import from Companies House
                      </h2>
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
                        getOptionLabel={(option) =>
                          option.FirstName + " " + option.LastName
                        }
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
                          console.log(
                            option,
                            "rendwered dynamic from apifff",
                            props
                          );
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
                                    <Grid
                                      item
                                      sx={{
                                        width: "calc(100% - 44px)",
                                        wordWrap: "break-word",
                                      }}
                                    >
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
                            label="Enter Company Name"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box className="well well-2 mb-3">
                  <Grid container spacing={2}>
                    {/* <Grid item xs={6} md={6}>
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
                            
                            label="Folder List"
                          />
                        )}
                      />
                    </Grid> */}

                    <Grid item xs={6} md={6}>
                      <Autocomplete
                        options={bussiness}
                        key={"someDynamicValue"} // Use a dynamic and unique key here
                        getOptionLabel={(option) =>
                          option.Client 
                        }
                        id="clear-on-escape-teams"
                        clearOnEscape
                        value={defaultClient || null}
                        onChange={onChangebussines}
                        filterOptions={(options, { inputValue }) =>
                        options.filter(option =>
                          option.Client.toLowerCase().includes(inputValue.toLowerCase())
                        )
                      }
                      autoHighlight  // Highlight the first suggestion
                      selectOnFocus  // Select suggestion when input is focused
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="Selectteamsa"
                            value={""}
                            label="Reference List"
                            variant="outlined"
                          />
                        )}
                      />

                      {/* <Autocomplete
                        // {...bussinesslist}
                        options={bussiness}
                        key={"dynamcreferencekey"}
                        getOptionLabel={(option) => option.Client ? option.Client : ""}

                        id="clear-on-escape-teams"
                        clearOnEscape
                        // defaultValue={defaultClient[0]}
                        value={defaultClient || null}
                        onChange={onChangebussines}
                        renderInput={(params,index) => (
                          <TextField
                            {...params}
                            name="Selectteamsa"
                            value={""}
                            //   onChange={onChangebussines}
                            label="Reference List"
                            key={index}
                            variant="outlined"
                          />
                        )}
                      /> */}
                    </Grid>
                  </Grid>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <ContactMainform
                      clientNames={clientNames}
                      contact={contact}
                      setContact={setContact}
                      contactlistdata={contactlistdata}
                      userContactDetails={userContactDetails}
                      setContactDetails={setContactDetails}
                      Importcontactdata={Importcontactdata}
                      setImportcontactdata={setImportcontactdata}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* <hr /> */}

              <Box className="well mb-4" style={{"display":"none"}}>
                <h2 className="font-20 mb-3 text-black">AML Details</h2>
              </Box>

              {/* <hr /> */}

              <Box className="well mb-4">
                <h2 className="font-20 mb-3 text-black">UDF Details</h2>
                <ContactUDF
                  data={clientDetails}
                  contactDetails={contactDetails}
                  setDataFromChild={setDataFromChild}
                  ContactUDFEdit={ContactUDFEdit}
                ></ContactUDF>
              </Box>
              {addContactData && addContactData=={} ? (
 <Button
 style={{ marginTop: "5px" }}
 variant="contained"
//  disabled={!clientData || !selectedFolderID}
 onClick={handleSubmit}
 className="btn-blue-2"
>
 Add New Contact
</Button>
              ):(
                contactDetails && contactDetails.length > 0 ? (
                  <Button
                    style={{ marginTop: "5px" }}
                    variant="contained"
                    // disabled={!clientData || !selectedFolderID}
                    // disabled={!defaultclientData}
                    onClick={handleSubmit}
                    className="btn-blue-2"
                  >
                    Update Contact
                  </Button>
                ) : (
                  <Button
                    style={{ marginTop: "5px" }}
                    variant="contained"
                    // disabled={!clientData || !selectedFolderID}
                    disabled={!defaultclientData}
                    onClick={handleSubmit}
                    className="btn-blue-2"
                  >
                    Add New Contact
                  </Button>
                )
              )}
             
            </Box>
          </Box>

          <Box className="mb-3">
            {/* <MainContact 
      userContactDetails={userContactDetails}
      setContactDetails={setContactDetails}
      /> */}
            <Grid container spacing={3}></Grid>
          </Box>

          {/* <Box className='text-end'>
      <Button
        style={{ marginTop: "5px" }}
        variant="contained"
        disabled={!clientData || !selectedFolderID}
        onClick={handleSubmit}
        className='btn-blue-2'
      >
        Add New Contact
      </Button>
    </Box> */}
        </Box>

        {/* end */}

        {/* <TabContext value={value}>
          <Box className='mb-1'>
            <TabList onChange={handleChange} aria-label="lab API tabs example" className='custom-tabs'>
              <Tab label="Contact Details" value="1" />
              <Tab label="AML Details" value="2" />
              <Tab label="UDF Details" value="3" />
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

                  <Box className='well mb-4'>
                    <h2 className='font-14 bold mb-2 text-black'>Import from Companies House</h2>
                    <Grid container spacing={2}>
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
                              label="Contact List"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>

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
                            console.log(option, "rendwered dynamic from apifff", props);
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
                              label="Enter Company Name"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Box>

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

                    <Grid item xs={12} md={12}>
                      <ContactMainform
                        clientNames={clientNames}
                        contact={contact}
                        setContact={setContact}
                        contactlistdata={contactlistdata}
                        userContactDetails={userContactDetails}
                        setContactDetails={setContactDetails}
                        Importcontactdata={Importcontactdata}
                        setImportcontactdata={setImportcontactdata}
                      />
                    </Grid>

                  </Grid>


                </Box>
              </Box>

              <Box className="mb-3">
                
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
          </TabPanel>

          <TabPanel value="3">
            <Box className="general-tab white-box">
              <ContactUDF
                data={clientDetails}
                setDataFromChild={setDataFromChild}
              ></ContactUDF>
            </Box>

          </TabPanel>

        </TabContext> */}
      </Box>
    </Box>
  );
}
export default memo(AddContacts);
