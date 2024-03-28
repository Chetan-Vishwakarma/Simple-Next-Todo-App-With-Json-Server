import React, { useEffect, useState } from "react";
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
import CommanCLS from "../../services/CommanService";
import UDFClientcard from "./UDFClientcard";
import DocumentList from "./DocumentList";
import UploadDocument from "./UploadDocument";
import AddClientdetails from "./AddClientdetails";
import AddClientaddress from "./AddClientaddress";
import AddClientmaincontact from "./AddClientmaincontact";
function Reference() {
  const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [intUserid, setIntUserid] = useState(localStorage.getItem("UserId"));
  const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
  const [selected, setSelected] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const [clientDetails, setClientDetails] = useState({});
  const [selectedFolderID, setSelectedFolderID] = useState(null);
  const [dataFromChild, setDataFromChild] = useState([]);

  const [userDetail, setUserDetail] = useState({
    CHnumber: "",
    Clientname: "",
    Clientid: "",
    Mobile: "",
    Telephone: "",
    Line1: "",
    Line2: "",
    Line3: "",
    Town: "",
    MCounty: "",
    Postcode: "",
    BilLine1: "",
    BilLine2: "",
    BilLine3: "",
    BilTown: "",
    BilCountry: "",
    BilPostcode: "",
    regLine1: "",
    regLine2: "",
    regLine3: "",
    regTown: "",
    regCountry: "",
    regPostcode: "",
    Selectclient: "",
    Selectteamsa: "",
    addDetails: "",
    mainAddress: "",
    biliAddress: "",
    regAddress: "",
    fullAddress: "",
    Bussiness: "",
    Status: "",
    Source: "",
    Manager: "",
    Email: "",
    folderId:localStorage.getItem("FolderId"),
    BussId:-1,
    UserId:-1,
    SourceId:-1,
    StatusId:-1,
    Title:"",
    FirstName:"",
    LastName:"",
    ReferenceName:"",
    MainContact:false,
    Inactive:false,
    GreetingName:"",
    EmailName:"",
    MainUserId:-1,
    MainLine1Name:"",
    MainLine2Name:"",
    MainLine3Name:"",
    MainTownName:"",
    MainPostcodeName:"",
    Maincontactcountry:"",
    MainTelephoneName:"",
    MainMobileName:"",
    mainCountry:"",
    billingsCountry:"",
    ragistersCountry:""
  });
  console.log("userDetailuserDetail",userDetail);
  const [originatorNo, setoriginatorNo] = useState("");
  const [companyDetails, setCompanyDetails] = useState([]);
  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
  const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";
  let Cls = new CommanCLS(baseUrl, agrno, Email, password);
  let webClientCLS = new CommanCLS(clientWebUrl, agrno, Email, password);
  const [openUploadDocument, setOpenUploadDocument] = React.useState(false);
  const onChange = (e) => {
    e.preventDefault();
    let data = { ...userDetail };
    let name = e.target.name;
    let val = e.target.value;
    data = { ...data, [name]: val };
    console.log(data, "dataOnchange", e);
    setUserDetail(data);
  };

  const handleClickOpenUploadDocument = () => {
    setOpenUploadDocument(true);
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Json_GetToFavourites = (currentUser) => {
    let obj = {
      agrno: agrno,
      Email: Email,
      password: password,
    };
    try {
      Cls.Json_GetToFavourites(obj, (sts, data) => {
        if (sts) {
          if (data) {
            let json = JSON.parse(data);
            console.log("Json_GetToFavourites", json);
            let favouriteUser = json.Table;
            // if (favouriteUser.length > 0 && currentUser.length > 0) {
            //     let ans = favouriteUser.some((item) => item.OriginatorNo === currentUser[0]?.OriginatorNo);
            //     if (ans) {
            //         setSelected(true);
            //     } else {
            //         setSelected(false);
            //     }
            // } else {
            //     setSelected(false);
            // }
          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_GetToFavourites", err);
    }
  };

  const Json_RemoveToFavourite = () => {
    let obj = {
      agrno: agrno,
      Email: Email,
      password: password,
      OrgNo: originatorNo,
      ProjectID: folderId,
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
  };

  const Json_AddToFavourite = () => {
    let obj = {
      agrno: agrno,
      Email: Email,
      password: password,
      ProjectID: folderId,
      OrgNo: originatorNo,
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
  };

  const Json_GetClientCardDetails = () => {
    let obj = {
      Email: Email,
      agrno: agrno,
      intProjectId: folderId,
      password: password,
      strOrignatorNumber: originatorNo,
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
      console.log("Error while calling Json_GetClientCardDetails", err);
    }
  };
  const Json_SetClientAddress = (objdata) => {
    Cls.Json_SetClientAddress(objdata, (sts, data) => {
      if (sts) {
        if (data== "Success") {
          console.log("Json_SetClientAddress", data);
        }
      }
    });
  };
  const mainAddress = () => {
    let obj = {
      agrno: agrno,
      Email: Email,
      password: password,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      AddressId: 1,
      AddressType: "Main Address",
      Add1: userDetail.Line1 ? userDetail.Line1 : "",
      Add2: userDetail.Line2 ? userDetail.Line2 : "",
      Add3: userDetail.Line3 ? userDetail.Line3 : "",
      Town: userDetail.Town ? userDetail.Town : "",
      County: userDetail.MCounty ? userDetail.MCounty : "",
      Postcode: userDetail.Postcode ? userDetail.Postcode : "",
      Country: userDetail.mainCountry,
    };
    console.log(obj, "mainaddress");
    Json_SetClientAddress(obj);
  };

  const billingAddress = () => {
    let obj = {
      agrno: agrno,
      Email: Email,
      password: password,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      AddressId: 2,
      AddressType: "Billing Address",
      Add1: userDetail.BilLine1 ? userDetail.BilLine1 : "",
      Add2: userDetail.BilLine2 ? userDetail.BilLine2 : "",
      Add3: userDetail.BilLine3 ? userDetail.BilLine3 : "",
      Town: userDetail.BilTown ? userDetail.BilTown : "",
      County: userDetail.BilCountry ? userDetail.BilCountry : "",
      Postcode: userDetail.BilPostcode ? userDetail.BilPostcode : "",
      Country: userDetail.billingsCountry,
    };
    console.log(obj, "mainaddress11");
    Json_SetClientAddress(obj);
  };
  const ragisterAddress = () => {
    let obj = {
      agrno: agrno,
      Email: Email,
      password: password,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      AddressId: 1,
      AddressType: "Registered Address",
      Add1: userDetail.regLine1 ? userDetail.regLine1 : "",
      Add2: userDetail.regLine2 ? userDetail.regLine2 : "",
      Add3: userDetail.regLine3 ? userDetail.regLine3 : "",
      Town: userDetail.regTown ? userDetail.regTown : "",
      County: userDetail.regCountry ? userDetail.regCountry : "",
      Postcode: userDetail.regPostcode ? userDetail.regPostcode : "",
      Country: userDetail.ragistersCountry,
    };
    console.log(obj, "mainaddress22");

    Json_SetClientAddress(obj);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    function todayDate() {
      var today = new Date().toJSON().slice(0, 10);
      return today;
    }
    let clientdata = {
      agrno: agrno,
      Email: Email,
      password: password,
      ProjectIdList: userDetail.folderId ? userDetail.folderId : -1,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      OriginatorName: userDetail.Clientname ? userDetail.Clientname : "",
      Address: userDetail.fullAddress ? userDetail.fullAddress : "",
      TelNo: userDetail.Telephone ? userDetail.Telephone : "",
      AlteTelNo: userDetail.Mobile ? userDetail.Mobile : "",
      Faxno: "",
      ContactName:"",
      UDF1: "",
      UDF2: "",
      UDF3: "",
      StickyNote: "",
      ContactEmail: userDetail.Email ? userDetail.Email : "",
      MParameter: "",
      CDate: todayDate(),
      BussId: userDetail.BussId ? userDetail.BussId : -1,
      SourceId: userDetail.SourceId ? userDetail.SourceId : -1,
      StatusId: userDetail.StatusId ? userDetail.StatusId : -1,
      Description: "",
      OrgPassword: "",
      ManagerId: userDetail.UserId ? userDetail.UserId : parseInt(intUserid),
      OrgActive: "Yes",
    };
    Json_InsertContact();
    console.log(clientdata,"clientdata");
    Cls.Json_AddClient(clientdata, (sts, data) => {
      if (sts) {
        if (data== "Success") {
          console.log("Response", data);
          Json_InsertContact();
          saveUDF();
          mainAddress();
          billingAddress();
          ragisterAddress();
        }
      }
    });
  };
  const Json_InsertContact = () => {
    let InsertContact = {
      agrno: agrno,
      strEmail: Email,
      password: password,
      FirstName: userDetail.FirstName ? userDetail.FirstName : "",
      LastName: userDetail.LastName ? userDetail.LastName : "",
      Add1: userDetail.MainLine1Name ? userDetail.MainLine1Name : "",
      Add2: userDetail.MainLine2Name ? userDetail.MainLine2Name : "",
      Add3: userDetail.MainLine3Name ? userDetail.MainLine3Name : "",
      Town: userDetail.MainTownName ? userDetail.MainTownName : "",
      PostCode: userDetail.MainPostcodeName ? userDetail.MainPostcodeName : "",
      Country: userDetail.Maincontactcountry ? userDetail.Maincontactcountry : "",
      ManagerName: "",
      Role: "",
      Tel: userDetail.MainTelephoneName ? userDetail.MainTelephoneName : "",
      Mobile: userDetail.MainMobileName ? userDetail.MainMobileName : "",
      greeting: userDetail.GreetingName ? userDetail.GreetingName : "",
      email: userDetail.EmailName ? userDetail.EmailName : "",
      note: "",
      CActive: "Yes",
      AssignedManager: userDetail.UserId ? userDetail.UserId : "",
      maincontact: userDetail.MainContact ? userDetail.MainContact : false,
      CCode: userDetail.Clientid ? userDetail.Clientid : "",
      Salutation: userDetail.Title ? userDetail.Title : "",
      accid: agrno
  }
    console.log(InsertContact,"Json_InsertContact");
    Cls.Json_InsertContact(InsertContact, (sts, data) => {
      if (sts) {
        if (data== "Success") {
          console.log("Response", data);
          // var urladd = "add_contact_update.html?Edata=" + oring + ":" + localStorage.getItem("DefaultFolderID") + "&CNO=" + ContactNo;

          // setTimeout(function () {
          //  location.href = urladd;
          // }, 2000); // 2000 milliseconds = 2 seconds
        }
      }
    });
  };
  const saveUDF = () => {
    const result = Object.entries(dataFromChild)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
  
  console.log(result,"resultresult");
    let requestBody = {
        agrno: agrno,
        Email: Email,
        password: password,
        OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
        ProjectId:  userDetail.folderId ? userDetail.folderId : -1,
        ClientUDFString:result,
        ContactUDFString:""	,
        ContactNo:""
    }
    Cls.Json_CRMSaveUDFValues(requestBody, (sts, data) => {
      if (sts) {
        if (data) {
          console.log("Json_CRMSaveUDFValues", data);
        }
      }
    });
  }
  useEffect(() => {
   
    setAgrNo(localStorage.getItem("agrno"));
    setPassword(localStorage.getItem("Password"));
    setEmail(localStorage.getItem("Email"));
    setFolderId(localStorage.getItem("FolderId"));
    setIntUserid(localStorage.getItem("UserId"));
    Json_GetClientCardDetails();
  }, []);

  return (
    <Box className="container-fluid p-0">
      <Box sx={{ width: "100%", typography: "body1" }} className="mt-4 pt-1">
            <Box className="general-tab white-box">
              <Box className="row mb-3">
                <h5>Client Details</h5>

                {
                  <AddClientdetails
                    userDetail={userDetail}
                    setUserDetail={setUserDetail}
                    setSelectedFolderID={setSelectedFolderID}
                  ></AddClientdetails>
                }
              </Box>
              <Box className="row mb-3">
                <h5>Main Contact</h5>
                {
                  <AddClientmaincontact
                    userDetail={userDetail}
                    setUserDetail={setUserDetail}
                  ></AddClientmaincontact>
                }
              
              </Box>
              <Box className="row ">
                <Box>
                  {
                    <AddClientaddress
                      userDetail={userDetail}
                      setUserDetail={setUserDetail}
                    ></AddClientaddress>
                  }
                </Box>
              </Box>
            </Box>
            <Box></Box>

            <Box className="main-accordian">
              <UDFClientcard data={clientDetails} setDataFromChild={setDataFromChild}/>
              <div style={{marginBottom:"20px"}}>
                <Button
                  style={{ marginTop: "20px" }}
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={
                    !userDetail.Clientname ||
                    !userDetail.Clientid 
                    // !folderData
                  }
                >
                  Add Client
                </Button>{" "}
              </div>
            </Box>
      </Box>
    </Box>
  );
}
export default Reference;
