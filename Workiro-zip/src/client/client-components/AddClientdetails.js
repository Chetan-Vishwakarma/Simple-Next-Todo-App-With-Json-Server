

import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { FormControl } from '@mui/material';
import CommanCLS from '../../services/CommanService';
// import { Autocomplete, TextField } from '@mui/material';
import {
  FormControlLabel,
  Switch
} from "@mui/material";
let folderData;
let billingcontry;
let ragistercountry;
export default function AddClientdetails({userDetail, setUserDetail}) {
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
      // const { agrno, Email, password, folderId, originatorNo } = location.state;
      const [folders, setFolders] = useState([]); // State to hold folders data
      const [bussiness, setBussiness] = useState([]); // State to hold folders data
      const [sources, setSources] = useState([]); // State to hold folders data
      const [mangers, setMangers] = useState([]); // State to hold folders data
      const [status, setStatus] = useState([]); // State to hold folders data
      const [configdata, setConfigdata] = useState(""); // State to hold folders data
      const [selectedFolderID, setSelectedFolderID] = useState(null);
    const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";

    //let Util = new Utils();

    let Cls = new CommanCLS(baseUrl, agrno, Email, password);

    let webClientCLS = new CommanCLS(clientWebUrl, agrno, Email, password);
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
      const onChangeclientlist = (
          event,
          value
        ) => {
          event.preventDefault();
          if (value) {
            // Update the selectedFolderID state with the FolderID of the selected option
            folderData = value.FolderID;
            setSelectedFolderID(value.FolderID);
            console.log(value.FolderID, "FolderID", selectedFolderID);
          } else {
            // If no option is selected, clear the selectedFolderID state
            setSelectedFolderID(null);
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
        // let passdata = localStorage.getItem("pass");
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
                      setStatus(json.Table);
                  }
              }
          });
      } catch (err) {
          console.log("Error while calling Json_GetClientCardDetails", err)
      }
        // CallApi(requestBody, "Json_GetConfiguration", function (res) {
        //   if (res) {
        //     console.log(res, "Json_GetConfiguration");
        //     let str = JSON.parse(JSON.stringify(res));
        //     let json = JSON.parse(str.d);
        //     console.log(json, "Json_GetConfiguration1");
        //     setBussiness(json.Table1);
        //     setSources(json.Table2);
        //     setMangers(json.Table3);
        //     setStatus(json.Table);
        //   } else {
           
        //   }
        // });
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
                        console.log("Json_GetFolders", json);
                        //let favouriteUser = json.Table;
                        setFolders(json.Table);
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

      useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        setFolderId(localStorage.getItem("FolderId"));
        //   Json_GetClientCardDetails();
          Json_GetFolders();
          Json_GetConfiguration();
      }, []);
  return (
    <div>
<Grid container spacing={3}>
          <Grid item xs={6} md={6}>
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

          <Grid item xs={6} md={6}>
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
                  value={userDetail.Selectclient}
                  onChange={onChange}
                  label="Client List"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  {...bussinesslist}
                  id="clear-on-escape-bussiness"
                  clearOnEscape
                  // onChange={onChangebussines}
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
            <Grid item xs={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  {...statuslistdata}
                  id="clear-on-escape-status"
                  clearOnEscape
                  // onChange={onChangestatuss}
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
            <Grid item xs={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  {...sourcelist}
                  id="clear-on-escape-source"
                  clearOnEscape
                  // onChange={onChangesource}
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
            <Grid item xs={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  {...userlistdata}
                  // options={mangers.map((manager: UserList) => ({
                  //   id: manager.UserId,
                  //   label: manager.UserName
                  // }))}
                  // getOptionLabel={(option:any) => option.label}
                  // id={`clear-on-escape-manager`}
                  key={`uniques-manager`}
                  // value={defaultUser || null}
                  // onChange={onChangeuser}
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      key={`textfield`}
                      name="Manager"
                      onChange={onChange}
                      label="Manager"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Mobile"
                variant="outlined"
                name="Mobile"
                value={userDetail.Mobile}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Telephone"
                variant="outlined"
                name="Telephone"
                value={userDetail.Telephone}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6} md={6}>
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
  )
}
