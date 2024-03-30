import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommanCLS from "../../services/CommanService";

export default function MainContact(userContactDetails,setContactDetails) {
   const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const [folders, setFolders] = useState([]);
    const [contact, setContact] = useState([]);
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

    const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";

    //let Util = new Utils();

    let Cls = new CommanCLS(baseUrl, agrno, Email, password);
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
            setFolders(json.Table);
          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_GetToFavourites", err);
    }
  };
  const clientlist = {
    options: folders,
    getOptionLabel: (option) => option.EMailId || "",
  };
  const onChangecontactlist = (
    event,
    value
  ) => {
    event.preventDefault();
    if (value) {
      // clientData = value.ClientID;
      // clientName = value.Client;
      // let data = { ...userContactDetails };  
      // data = { ...data, ["ReferenceID"]:  value.Client };
     
      let result = folders.filter((el) => el["EMailId"] === value.EMailId);
      console.log(value, "onChangetitle",result);
      setContact(result[0]);
      
      // setContactDetails(data);
      // folders
    } else {
    }
  };
  console.log(contact, "contactcontact");
  useEffect(() => {
    setAgrNo(localStorage.getItem("agrno"));
    setPassword(localStorage.getItem("Password"));
    setEmail(localStorage.getItem("Email"));
    setFolderId(localStorage.getItem("FolderId"));
    // setIntUserid(localStorage.getItem("UserId"));
    Json_GetAllContacts();
    let data = { ...userContactDetails };
      data = { ...data, ["Title"]: contact.Salutation,
      ["FirstName"]: contact.FirstName,
      ["LastName"]: contact.LastName,
      ["ReferenceName"]: "",
      ["MainContact"]: contact.MainContact,
      ["Inactive"]: false,
      ["GreetingName"]: contact.Greeting,
      ["EmailName"]: contact.EMailId,
      ["MainUserId"]: -1,
      ["MainLine1Name"]: contact.Add1,
      ["MainLine2Name"]: contact.Add2,
      ["MainLine3Name"]: contact.Add3,
      ["MainTownName"]: contact.Town,
      ["MainPostcodeName"]: contact.PostCode,
      ["Maincontactcountry"]: "",
      ["MainTelephoneName"]: "",
      ["MainMobileName"]: "",
      ["mainCountry"]: "",
      ["billingsCountry"]: "",
      ["ragistersCountry"]: "",
      ["ReferenceID"]:"" };
      setContactDetails(data);
    
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={6}>
      <Autocomplete
                      {...clientlist}
                      id="clientlist"
                      clearOnEscape
                      onChange={onChangecontactlist}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          name="Selectclient"
                          value={""}
                        //   onChange={onChange}
                          label="Contact List"
                        />
                      )}
                    />
      </Grid>
    </Grid>
  );
}
