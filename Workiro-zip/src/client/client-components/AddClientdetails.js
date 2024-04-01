import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import { FormControl, List, ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import CommanCLS from "../../services/CommanService";
import { memo } from 'react';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const AddClientdetails = React.memo(({ userDetail, setUserDetail }) => {
  const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
  const [folders, setFolders] = useState([]);
  const [bussiness, setBussiness] = useState([]);
  const [sources, setSources] = useState([]);
  const [mangers, setMangers] = useState([]);
  const [defaultUser, setDefaultUser] = useState(null);
  const [status, setStatus] = useState([]);
  const [ImportContact, setImportContact] = useState([]);
  const [ImportCompanyDetails, setImportCompanyDetails] = useState([]);
  const [Importdata, setImportdata] = useState("");
  const [intUserid, setIntUserid] = useState(localStorage.getItem("UserId"));
  const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";
  let Cls = new CommanCLS(baseUrl, agrno, Email, password);
  let webClientCLS = new CommanCLS(clientWebUrl, agrno, Email, password);
  // const defaultUser = mangers.find((manager) => manager.UserId == intUserid);
  const clientlist = {
    options: folders,
    getOptionLabel: (option) => option.Folder || "",
  };
  const bussinesslist = {
    options: bussiness,
    getOptionLabel: (option) => option.BussName || "",
  };
  const sourcelist = {
    options: sources,
    getOptionLabel: (option) => option.SourceName || "",
  };
  const userlistdata = {
    options: mangers,
    getOptionLabel: (option) => option.UserName || "",
  };
  const statuslistdata = {
    options: status,
    getOptionLabel: (option) => option.StatusName || "",
  };
  const onChangeclientlist = (event, value) => {
    event.preventDefault();
    if (value) {
      let data = { ...userDetail };
      data = { ...data, ["FolderId"]: value.FolderID };
      setUserDetail(data);
    }
  };
  const onChangebussines = (event, value) => {
    event.preventDefault();
    if (value) {
      let data = { ...userDetail };
      data = { ...data, ["BussId"]: value.BussId };
      setUserDetail(data);
    } else {
    }
  };
  const onChangestatuss = (event, value) => {
    event.preventDefault();
    if (value) {
      let data = { ...userDetail };
      data = { ...data, ["StatusId"]: value.StatusId };
      setUserDetail(data);
    } else {
    }
  };
  const onChangesource = (event, value) => {
    event.preventDefault();
    if (value) {
      let data = { ...userDetail };
      data = { ...data, ["SourceId"]: value.SourceId };
      setUserDetail(data);
    } else {
    }
  };
  const onChangeuser = (event, value) => {
    event.preventDefault();
    if (value) {
      let data = { ...userDetail };
      data = { ...data, ["UserId"]: value.UserId };
      console.log(defaultUser, "dataOnchange111",value);
        setDefaultUser(value);
      setUserDetail(data);
    } else {
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    let data = { ...userDetail };
    let name = e.target.name;
    let val = e.target.value;
    data = { ...data, [name]: val };
    console.log(data, "dataOnchange", e);
    setUserDetail(data);
  };
  const Json_GetConfiguration = () => {
    let requestBody = {
      agrno: agrno,
      Email: Email,
      password: password,
    };
    try {
      webClientCLS.Json_GetConfiguration(requestBody, (sts, data) => {
        if (sts) {
          if (data) {
            let json = JSON.parse(data);
            console.log("Json_GetConfiguration", json);
            setBussiness(json.Table1);
            setSources(json.Table2);
            setMangers(json.Table3);
            let defaultUser1 = json.Table3.find(
              (manager) => manager.UserId == localStorage.getItem("UserId")
            );
            setDefaultUser(defaultUser1);
            setStatus(json.Table);
          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_GetClientCardDetails", err);
    }
  };
  const Json_GetFolders = () => {
    let passdata = localStorage.getItem("Password");
    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      Email: localStorage.getItem("Email"),
      password: passdata,
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

  const 
  Json_CompanyHouseDetails = (inputValue) => {
    let requestBody = {
      CompanyName_Number:inputValue
    };
    try {
      Cls.Json_CompanyHouseDetails(requestBody, (sts, data) => {
        if (sts) {
          if (data) {
            let json = JSON.parse(data);
            console.log(json,"Json_CompanyHouseDetails");
            let jdata = json.CompanyBasicDetails;
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

  
  const companyhouselist = {
    options: ImportContact,
    getOptionLabel: (option) => option.Folder || "",
  };
  const onChangeImportData = (e) => {
           
    e.preventDefault();
    const inputValue = e.target.value;
    console.log(inputValue,"import_data");
    setImportdata(inputValue);
    Json_CompanyHouseDetails(inputValue);
};

const [txtValue,setTxtValue]=useState(null);
const [open, setOpen] = useState(false);

const handleOptionClick = (id) => {
  console.log(id, "onSelectData");
  // Perform actions with the id
  let data = id.company_number;
  Json_CompanyHouseDetails(data);
  setTxtValue(id);
  setOpen(false); // Close the Autocomplete dropdown
};
const handleListItemClick = (item) => {
  console.log('Selecteditem:', item);
  // setFillContact(item);
  let data = { ...userDetail };
        data = { ...data,  CHnumber: "",
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
        folderId: localStorage.getItem("FolderId"),
        BussId: -1,
        UserId: -1,
        SourceId: -1,
        StatusId: -1,
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
        ragistersCountry: ""
      };
        // setUserDetail(data);
};
  console.log(Importdata,"Importdata")
  useEffect(() => {
    setAgrNo(localStorage.getItem("agrno"));
    setPassword(localStorage.getItem("Password"));
    setEmail(localStorage.getItem("Email"));
    setFolderId(localStorage.getItem("FolderId"));
    setIntUserid(localStorage.getItem("UserId"));
    //   Json_GetClientCardDetails();
    Json_GetFolders();
    Json_GetConfiguration();
  }, []);
  return (
    <div>

      <Box className='well'>
        <h2 className="font-14 bold mb-2 text-black">Import from Companies House</h2>
        <Grid container spacing={3} className="mb-">
          <Grid item lg={6} xs={6} md={6}>
          {/* <TextField
                          fullWidth
                          variant="outlined"
                          name="importclient"
                          onChange={onChangeImportData}
                          label="Enter Company Name or Number"
                        /> */}
                        <Autocomplete
      fullWidth
      // options={ImportContact.map((option) => option.title)}
      options={ImportContact} // Pass the entire ImportContact array
      getOptionLabel={(option) => option.title}
      onChange={(e, value) => setImportdata(value)}
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
          <li {...props} 
          onClick={() => {
            
            handleOptionClick(option); // Pass the id directly
          }}
  >
            {/* Your custom rendering */}
            <Grid container alignItems="center">
            
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {option.title}          
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {option.date_of_creation}
              </Grid>
            </Grid>
          </li>
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
          <Grid item lg={6} xs={6} md={6} className="d-flex align-items-center">
            <Button className="min-width-auto text-danger">
              <HighlightOffIcon className="font-32"/>
            </Button>
          </Grid>
          {/* {ImportContact && ImportContact.length > 0 && (
            <List >
              {ImportContact.map((item, index) => (
                // !item.resigned_on && ( // Add this condition
                <ListItem key={index} button
                onClick={() => handleListItemClick(item)}
                >
                 
                  <ListItemText primary={item.title}/>
                  <ListItemText secondary={item.date_of_creation} />
                 
                </ListItem>
              // )
              ))}
            </List>
          )} */}
          {/* <Grid item lg={6} xs={6} md={6} className="d-flex align-items-center">
            <FormControlLabel control={<Checkbox />} label="Active" />
          </Grid> */}
        </Grid>
      </Box>

      <Grid container spacing={3} className="mt-2">
        <Grid item lg={4} xs={6} md={6}>
          <TextField
            fullWidth
            id="standard-basic-client"
            label="Client Name"
            variant="outlined"
            name="Clientname"
            value={userDetail.Clientname}
            onChange={onChange}
          />
        </Grid>

        <Grid item lg={4} xs={6} md={6}>
          <TextField
            fullWidth
            id="standard-basic-id"
            label="Client ID"
            variant="outlined"
            name="Clientid"
            value={userDetail.Clientid}
            onChange={onChange}
          />
        </Grid>

        <Grid item lg={4} xs={6} md={6}>
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
                value={userDetail.Selectclient}
                onChange={onChange}
                label="Client List"
              />
            )}
          />
        </Grid>
        <Grid item lg={4} xs={6} md={6}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              {...bussinesslist}
              id="clear-on-escape-bussiness"
              clearOnEscape
              onChange={onChangebussines}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="Bussiness"
                  value={userDetail.Bussiness}
                  onChange={onChange}
                  label="Bussiness"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item lg={4} xs={6} md={6}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              {...statuslistdata}
              id="clear-on-escape-status"
              clearOnEscape
              onChange={onChangestatuss}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="Status"
                  value={userDetail.Status}
                  onChange={onChange}
                  label="Status"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item lg={4} xs={6} md={6}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              {...sourcelist}
              id="clear-on-escape-source"
              clearOnEscape
              onChange={onChangesource}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="Source"
                  value={userDetail.Source}
                  onChange={onChange}
                  label="Source"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item lg={4} xs={6} md={6}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              key={`uniques-manager`}
              options={mangers}
              getOptionLabel={(option) => option.UserName}
              value={defaultUser || null}
              onChange={onChangeuser}
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  key={`textfield`}
                  name="Manager"
                  // onChange={onChange}
                  label="Manager"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item lg={4} xs={6} md={6}>
          <TextField
            fullWidth
            id="standard-basic"
            type="number"
            label="Mobile"
            variant="outlined"
            name="Mobile"
            value={userDetail.Mobile}
            onChange={onChange}
          />
        </Grid>
        <Grid item lg={4} xs={6} md={6}>
          <TextField
            fullWidth
            id="standard-basic"
            type="number"
            label="Telephone"
            variant="outlined"
            name="Telephone"
            value={userDetail.Telephone}
            onChange={onChange}
          />
        </Grid>
        <Grid item lg={4} xs={6} md={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Email"
            variant="outlined"
            name="Email"
            value={userDetail.Email}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </div>
  );
});
export default memo(AddClientdetails);

