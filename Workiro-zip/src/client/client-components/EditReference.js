import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CommanCLS from "../../services/CommanService";
import UDFClientcard from "./UDFClientcard";
import AddClientdetails from "./AddClientdetails";
import AddClientaddress from "./AddClientaddress";
import AddClientmaincontact from "./AddClientmaincontact";
import { ToastContainer, toast } from 'react-toastify';
import { memo } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EditClientdetails from "./EditClientdetails";
import EditUDFClientcard from "./EditUDFClientcard";
import EditClientaddress from "./EditClientaddress";
import { connect } from 'react-redux';
function EditReference({ companyEditDetails }) {
  console.log(companyEditDetails, "companyEditDetails");
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
  const [dataCompanyHouse, setDataCompanyHouse] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [userDetail, setUserDetail] = useState({
    Clientname: "",
    Clientid: companyEditDetails[0].OriginatorNo,
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
    folderId: localStorage.getItem("FolderId"),
    BussId: companyEditDetails[0].BussID,
    UserId: -1,
    SourceId: companyEditDetails[0].SourceId,
    StatusId: companyEditDetails[0].StatusId,
    Title: "",
    FirstName: "",
    LastName: "",
    ReferenceName: "",
    MainContact: false,
    Inactive: false,
    GreetingName: "",
    EmailName: "",
    MainUserId: -1,
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
    CHNumber: "",
    InActiveData:false,
    HideData:false
  });
  console.log("userDetailuserDetail", userDetail);
  const [originatorNo, setoriginatorNo] = useState("");
  const [companyDetails, setCompanyDetails] = useState([]);
  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
  const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";
  let Cls = new CommanCLS(baseUrl, agrno, Email, password);
  let webClientCLS = new CommanCLS(clientWebUrl, agrno, Email, password);
  const Json_GetClientCardDetails = () => {
    let obj = {
      Email: Email,
      agrno: agrno,
      intProjectId: folderId,
      password: password,
      strOrignatorNumber: companyEditDetails[0].OriginatorNo ? companyEditDetails[0].OriginatorNo : "",
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
      console.log("Error while calling Json_GetClientCardDetails", err);
    }
  };
  const Json_SetClientAddress = (objdata) => {
    Cls.Json_SetClientAddress(objdata, (sts, data) => {
      if (sts) {
        if (data) {
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
      Country: userDetail.mainCountry ? userDetail.mainCountry : "United Kingdom",
    };
    console.log(obj, "mainaddress",userDetail.mainCountry);
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
      Country: userDetail.billingsCountry ? userDetail.billingsCountry : "United Kingdom",
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
      AddressId: 3,
      AddressType: "Registered Address",
      Add1: userDetail.regLine1 ? userDetail.regLine1 : "",
      Add2: userDetail.regLine2 ? userDetail.regLine2 : "",
      Add3: userDetail.regLine3 ? userDetail.regLine3 : "",
      Town: userDetail.regTown ? userDetail.regTown : "",
      County: userDetail.regCountry ? userDetail.regCountry : "",
      Postcode: userDetail.regPostcode ? userDetail.regPostcode : "",
      Country: userDetail.ragistersCountry ? userDetail.ragtersCountry : "United Kingdom",
    };
    console.log(obj, "mainaddress22");

    Json_SetClientAddress(obj);
  };

  const Json_UpdateClientField = () => {
    let contactData =
    {
      "fieldName": "CompanyNo",
      "fieldFile": "Email"
    }
    console.log(contactData, "contactData");
    if (contactData.fieldName == "CompanyNo") {
      let birthdayObj = {
        "agrno": agrno,
        "Email": Email,
        "password": password,
        "ClientId": userDetail.Clientid ? userDetail.Clientid : "",
        "projectid": folderId,
        "fieldName": "CompanyNo",
        "fieldValue": userDetail.CHNumber ? userDetail.CHNumber : ""
      }
      Cls.Json_UpdateClientField(birthdayObj, (sts, data) => {
        if (sts) {
          console.log(sts, data, "Json_UpdateClientFieldcompanyno");
          // let jsonparse = JSON.parse(data);
          // if (jsonparse) {
          //     console.log(jsonparse,"successcontact");


          // }
        }

      });
    }
    if (contactData.fieldFile == "Email") {
      let profileObj = {
        "agrno": agrno,
        "Email": Email,
        "password": password,
        "ClientId": userDetail.Clientid ? userDetail.Clientid : "",
        "projectid": folderId,
        "fieldName": "Email",
        "fieldValue": userDetail.Email ? userDetail.Email : ""
      }

      Cls.Json_UpdateClientField(profileObj, (sts, data) => {
        if (sts) {
          console.log(sts, data, "Json_UpdateClientFieldEmail");
          // let jsonparse = JSON.parse(data);
          // if (jsonparse) {
          //     console.log(jsonparse,"successcontact");


          // }
        }

      });
    }
  };

  const Json_ChangeClientID = () => {
    let changeidObj = {
      "agrno": agrno,
      "Email": Email,
      "password": password,
      "oldID": companyEditDetails[0].OriginatorNo ? companyEditDetails[0].OriginatorNo : "",
      "NewId": userDetail.Clientid ? userDetail.Clientid : "",
      "ClientName": userDetail.Clientname ? userDetail.Clientname : ""
    }

    Cls.Json_ChangeClientID(changeidObj, (sts, data) => {
      if (sts) {
        console.log(sts, data, "Json_ChangeClientID");
        // let jsonparse = JSON.parse(data);
        // if (jsonparse) {
        //     console.log(jsonparse,"successcontact");


        // }
      }

    });
  }

  const Json_AssignProjectsToClient = () => {
    let changeidObj = {
      "agrno": agrno,
      "Email": Email,
      "password": password,
      "OriginatorNo": userDetail.Clientid ? userDetail.Clientid : "",
      "ProjectIdList": userDetail.FolderId ? userDetail.FolderId : -1
    }

    Cls.Json_AssignProjectsToClient(changeidObj, (sts, data) => {
      if (sts) {
        console.log(sts, data, "Json_AssignProjectsToClient");
        // let jsonparse = JSON.parse(data);
        // if (jsonparse) {
        //     console.log(jsonparse,"successcontact");


        // }
      }

    });
  }
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
      // ProjectIdList: userDetail.folderId ? userDetail.folderId : -1,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      OriginatorName: userDetail.Clientname ? userDetail.Clientname : "",
      Address: userDetail.fullAddress ? userDetail.fullAddress : "",
      TelNo: userDetail.Telephone ? userDetail.Telephone : "",
      AlteTelNo: userDetail.Mobile ? userDetail.Mobile : "",
      Faxno: "",
      ContactName: "",
      OrgActive: userDetail.InActiveData==true ? "No" : userDetail.HideData==true ? "HID" : "Yes",
      StickyNote: "",
      ContactEmail: userDetail.Email ? userDetail.Email : "",
      // MParameter: "",
      // CDate: todayDate(),
      BussId: userDetail.BussId ? userDetail.BussId : -1,
      SourceId: userDetail.SourceId ? userDetail.SourceId : -1,
      StatusId: userDetail.StatusId ? userDetail.StatusId : -1,
      Description: "",
      OrgPassword: "",
      ManagerId: userDetail.UserId ? userDetail.UserId : parseInt(intUserid),
      CCode: userDetail.Clientid ? userDetail.Clientid : ""
    };
    // toast.success("Reference Added Successfully !");
    // Json_InsertContact();
    console.log(clientdata, "updateclientdata");
    Cls.Json_UpdateClient(clientdata, (sts, data) => {
      console.log(sts, data, "Json_UpdateClient");
      // let jsonparse = JSON.parse(data);
      if (sts) {
        if(data){
          if (data == "Success") {
            console.log("Response", data);
            toast.success("Client Updated Successfully !");
            // Json_InsertContact(); Main contact not need
            Json_ChangeClientID();
            Json_UpdateClientField();
            Json_AssignProjectsToClient();
            saveUDF();
            mainAddress();
            billingAddress();
            ragisterAddress();
          }
          else {
            // toast.success("Reference ID Already Exists!");
            console.log("Faild Json_UpdateClient");
          }
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
      Country: userDetail.Maincontactcountry
        ? userDetail.Maincontactcountry
        : "",
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
      accid: agrno,
    };
    console.log(InsertContact, "Json_InsertContact");
    Cls.Json_InsertContact(InsertContact, (sts, data) => {
      if (sts) {
        if (data == "Success") {
          console.log("Response", data);
        }
      }
    });
  };


  const saveUDF = () => {
    const result = Object.entries(dataFromChild)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");


    let requestBody = {
      agrno: agrno,
      Email: Email,
      password: password,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      ProjectId: userDetail.folderId ? userDetail.folderId : -1,
      ClientUDFString: result ? result : "",
      ContactUDFString: "",
      ContactNo: "",
    };
    console.log(result, "resultresult_requestBody", requestBody);
    try {
      Cls.Json_CRMSaveUDFValues(requestBody, (sts, data) => {
        if (sts) {
          if (data) {
            console.log("Json_CRMSaveUDFValues", data);
            toast.success("UDF Saved Successfully !");
          }
        }
      });
    } catch (e) { }
  };
  const mapStateToProps = (state) => ({
    userDetail: state.userDetail,
    dataCompanyHouse: state.dataCompanyHouse,
  });
  const mapDispatchToProps = {
    setUserDetail,
    setDataCompanyHouse,
    setSelectedFolderID,
  };
  const EditClientdetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditClientdetails);


  useEffect(() => {
    setAgrNo(localStorage.getItem("agrno"));
    setPassword(localStorage.getItem("Password"));
    setEmail(localStorage.getItem("Email"));
    setFolderId(localStorage.getItem("FolderId"));
    setIntUserid(localStorage.getItem("UserId"));
    Json_GetClientCardDetails();
  }, []);

  // stepper
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  // Stepper form
  const steps = [
    {
      label: "Client Details",
      description: (
        <Box className="clearfix">
          {
            <EditClientdetails
              userDetail={userDetail}
              //
              dataCompanyHouse={dataCompanyHouse}
              // setDataCompanyHouse={setDataCompanyHouse}
              setUserDetail={setUserDetail}
              //
              companyEditDetails={companyEditDetails}
              setDataCompanyHouse={setDataCompanyHouse}
              setSelectedFolderID={setSelectedFolderID}
            //
            ></EditClientdetails>
          }
        </Box>
      ),
    },
    // {
    //   label: 'Main Contact',
    //   description:
    //     <Box className="clearfix">
    //       {
    //         <AddClientmaincontact
    //           userDetail={userDetail}
    //           //

    //           setUserDetail={setUserDetail}
    //         //

    //         ></AddClientmaincontact>
    //       }
    //     </Box>,
    // },

    {
      label: "Address",
      description: (
        <Box className="clearfix">
          {
            <EditClientaddress
              userDetail={userDetail}
              //
              dataCompanyHouse={dataCompanyHouse}
              setUserDetail={setUserDetail}
            //
            ></EditClientaddress>
          }
        </Box>
      ),
    },

    {
      label: "Details",
      description: (
        <Box className="clearfix">
          <EditUDFClientcard
            data={clientDetails}
            setDataFromChild={setDataFromChild}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box className="container-fluid p-0">
      <ToastContainer></ToastContainer>
      <Box sx={{ width: "100%", typography: "body1" }} className="">

        <Box className="clearfix">
          <h2 className="font-20 bold text-black mb-0">Client Details</h2>
          {
            <EditClientdetails
              userDetail={userDetail}
              //
              dataCompanyHouse={dataCompanyHouse}
              // setDataCompanyHouse={setDataCompanyHouse}
              setUserDetail={setUserDetail}
              //
              companyEditDetails={companyEditDetails}
              setDataCompanyHouse={setDataCompanyHouse}
              setSelectedFolderID={setSelectedFolderID}
            //
            ></EditClientdetails>
          }
        </Box>

        <hr />

        <Box className="mt-4">
          <h2 className="font-20 bold text-black mb-4">Address</h2>
          {
            <EditClientaddress
              userDetail={userDetail}
              //
              dataCompanyHouse={dataCompanyHouse}
              setUserDetail={setUserDetail}
            //
            ></EditClientaddress>
          }
        </Box>

        <hr />

        <Box className="mt-3">
          {/* <h2 className="font-20 bold text-black mb-4">Details</h2> */}
          <EditUDFClientcard
            data={clientDetails}
            setDataFromChild={setDataFromChild}
          />
        </Box>




        <Box sx={{ maxWidth: "100%" }} className='d-none'>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption"></Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box className="mt-3">
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                        size="small"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        className="btn-blue-2"
                        size="small"
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
        {/* Stepper end  */}



        <Box className="main-accordian">
          {/* <UDFClientcard data={clientDetails} setDataFromChild={setDataFromChild} /> */}

          <div style={{ marginBottom: "20px" }}>
            <Button
              style={{ marginTop: "20px" }}
              variant="contained"
              onClick={handleSubmit}
              disabled={
                !userDetail.Clientname || !userDetail.Clientid
                // !folderData
              }
              className="btn-blue-2"
            >
              Update Client
            </Button>{" "}
          </div>
        </Box>
      </Box>
    </Box>
  );
}
export default memo(EditReference);
