import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import country from "../../images/uk.png";
import PublicIcon from '@mui/icons-material/Public';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CommanCLS from '../../services/CommanService';



function ClientAddress({originatorNo}) {

    console.log("originatorNo1111",originatorNo)

    const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";

    //let Util = new Utils();

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    let webClientCLS = new CommanCLS(clientWebUrl, agrno, Email, password);
    const [getAddresses,setGetAddresses]=useState([]);


    const Json_GetClientAddresses = () => {
        let obj = {           
            clientId: originatorNo
        };
        try {
            webClientCLS.Json_GetClientAddressesAdd(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        let tbl = json.Table;
                        if(tbl.length>0){
                            setGetAddresses(tbl);
                            console.log("Json_GetClientAddresses111111", tbl);
                        }
                       
                       
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetClientAddresses", err)
        }
    }





    useEffect(() => {      
        Json_GetClientAddresses();
    }, [originatorNo]);


    return (
        <>
            <Box className='mt-3'>
                <Typography variant="h2" className='font-20 bold mb-2'>
                    Address
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xxl={4} xl={4} lg={6} md={12} sm={12} xs={12}>
                        <Box className='white-box h-100'>
                            <Typography variant="h2" className='font-16 bold mb-2'>
                            {getAddresses && getAddresses[0] && getAddresses[0].AddressType ? getAddresses[0].AddressType : ""}
                            </Typography>
                            <hr />

                            <List className='address-list'>
                                <ListItem >
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 1
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                          {getAddresses  && getAddresses[0] && getAddresses[0].Add1 ? (getAddresses[0].Add1):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 2
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[0] && getAddresses[0].Add2 ? (getAddresses[0].Add2):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 3
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[0] && getAddresses[0].Add3 ? (getAddresses[0].Add3):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationCityIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Town
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[0] && getAddresses[0].Town ? (getAddresses[0].Town):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <MapIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            County
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[0] && getAddresses[0].County ? (getAddresses[0].County):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <MarkAsUnreadIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Postcode
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[0] && getAddresses[0].Postcode ? (getAddresses[0].Postcode):""}  
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <PublicIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Country
                                        </Typography>
                                    </Box>
                                    <Box className='add-details d-flex align-items-center'>
                                        <Box className='country me-2'>
                                            <img src={country} />

                                        </Box>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[0] && getAddresses[0].Country ? (getAddresses[0].Country):""}   
                                        </Typography>
                                    </Box>
                                </ListItem>

                            </List>

                        </Box>
                    </Grid>

                    <Grid item xxl={4} xl={4} lg={6} md={12} sm={12} xs={12}>
                    <Box className='white-box h-100'>
                            <Typography variant="h2" className='font-16 bold mb-2'>
                            {getAddresses && getAddresses[1] && getAddresses[1].AddressType ? getAddresses[1].AddressType : ""}

                            </Typography>
                            <hr />

                            <List className='address-list'>
                                <ListItem >
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 1
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                          {getAddresses  && getAddresses[1] && getAddresses[1].Add1 ? (getAddresses[1].Add1):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 2
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[1] && getAddresses[1].Add2 ? (getAddresses[1].Add2):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 3
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[1] && getAddresses[1].Add3 ? (getAddresses[1].Add3):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationCityIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Town
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[1] && getAddresses[1].Town ? (getAddresses[1].Town):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <MapIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            County
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[1] && getAddresses[1].County ? (getAddresses[1].County):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <MarkAsUnreadIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Postcode
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[1] && getAddresses[1].Postcode ? (getAddresses[1].Postcode):""}  
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <PublicIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Country
                                        </Typography>
                                    </Box>
                                    <Box className='add-details d-flex align-items-center'>
                                        <Box className='country me-2'>
                                            <img src={country} />

                                        </Box>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[1] && getAddresses[1].Country ? (getAddresses[1].Country):""}   
                                        </Typography>
                                    </Box>
                                </ListItem>

                            </List>

                        </Box>
                    </Grid>

                    <Grid item xxl={4} xl={4} lg={6} md={12} sm={12} xs={12}>
                    <Box className='white-box h-100'>
                            <Typography variant="h2" className='font-16 bold mb-2'>
                            {getAddresses && getAddresses[2] && getAddresses[2].AddressType ? getAddresses[2].AddressType : ""}

                            </Typography>
                            <hr />

                            <List className='address-list'>
                                <ListItem >
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 1
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                          {getAddresses  && getAddresses[2] && getAddresses[2].Add1 ? (getAddresses[2].Add1):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 2
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[2] && getAddresses[2].Add2 ? (getAddresses[2].Add2):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 3
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[2] && getAddresses[2].Add3 ? (getAddresses[2].Add3):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationCityIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Town
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[2] && getAddresses[2].Town ? (getAddresses[2].Town):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <MapIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            County
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[2] && getAddresses[2].County ? (getAddresses[2].County):""}
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <MarkAsUnreadIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Postcode
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[2] && getAddresses[2].Postcode ? (getAddresses[2].Postcode):""}  
                                        </Typography>
                                    </Box>
                                </ListItem>

                                <ListItem>
                                    <Box className='add-heading'>
                                        <PublicIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Country
                                        </Typography>
                                    </Box>
                                    <Box className='add-details d-flex align-items-center'>
                                        <Box className='country me-2'>
                                            <img src={country} />

                                        </Box>
                                        <Typography variant="body2" className='font-13 sembold'>
                                        {getAddresses && getAddresses[2] && getAddresses[2].Country ? (getAddresses[2].Country):""}   
                                        </Typography>
                                    </Box>
                                </ListItem>

                            </List>

                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default ClientAddress