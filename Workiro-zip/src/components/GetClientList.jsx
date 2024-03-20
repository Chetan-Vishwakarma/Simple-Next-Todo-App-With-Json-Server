import * as React from "react";
import { useEffect, useState } from "react";
import CommanCLS from "../services/CommanService";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Box from "@mui/material/Box";

import {
    TextField,
} from "@mui/material";

import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,

} from "@mui/material";


const GetClientList = ({ selectedTask, setClientObject }) => {

    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));

   

    const [clientList, setClientList] = useState([]);
    const [txtClient, setTxtClient] = useState(null);
    const [txtClientId, setTxtClientId] = useState(null);

   


    let Cls = new CommanCLS(baseUrl, agrno, Email, password);

    const [anchorClsEl, setAnchorClsEl] = useState(null);
    const openClient = Boolean(anchorClsEl);
    const handleClickClick = (event) => {
        setAnchorClsEl(event.currentTarget);
    };
    const handleCloseClient = (e) => {
        setClientObject(e)
        setAnchorClsEl(null);
        setTxtClient(e.Client);
        setTxtClientId(e.ClientID);

    };


    function Json_GetFolderData() {

        try {
            let o = {};
            o.ProjectId = selectedTask.FolderID;
            o.SectionId = "-1";//selectedTask.SectionId;
            o.ClientId = "";
            Cls.Json_GetFolderData(o, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    console.log("Json_GetFolderData", js);
                    let clientList = js.Table1;
                    if (clientList.length > 0) {
                        setClientList(clientList);
                    }
                    // let sectionList = js.Table;
                    // if (sectionList.length > 0) {
                    //     setSectionList(sectionList);
                    // }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }





    useEffect(() => {
        Json_GetFolderData();
        setTxtClient(selectedTask.Client)
    }, [selectedTask])

    const [searchClientQuery, setSearchClientQuery] = useState("");

    const handleSearchInputChangeClient = (event) => {
        setSearchClientQuery(event.target.value);
    };

    const filtereClient = clientList.filter((item) =>
        item.Client.toLowerCase().includes(searchClientQuery.toLowerCase())
    );

    

    return (<>
        <Button
            id="fade-button"
            aria-controls={openClient ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openClient ? 'true' : undefined}
            onClick={handleClickClick}
        >
            {txtClient}
        </Button>

        <Menu
            id="fade-menu"
            MenuListProps={{
                'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorClsEl}
            open={openClient}
            onClose={handleClickClick}
            TransitionComponent={Fade}
        >

<TextField
                                        label="Search"
                                        variant="outlined"
                                        value={searchClientQuery}
                                        onChange={handleSearchInputChangeClient}
                                        sx={{ width: "100%" }}
                                    />

            {filtereClient ? filtereClient.map((item, index) => {
                return <MenuItem key={index} onClick={() => handleCloseClient(item)}>{item.Client}</MenuItem>
            }) : ""}


        </Menu>

    </>)
}
export default GetClientList;

