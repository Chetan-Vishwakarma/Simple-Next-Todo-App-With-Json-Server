import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
//import { increment, decrement } from "../redux/reducers/counterSlice";
import { Box, Typography } from '@mui/material';
import user from "../images/user.jpg";
import pin from "../images/icons/star.svg";
import axios from "axios";




function Home() {
  //const data = useSelector((state) => state.counter.value);
  //const dispatch = useDispatch();
  const [clients,setClients] = useState([]);
  const [contacts,setContacts] = useState([]);
  const [onlyContacts,setOnlyContacts] = useState(true);
  const [onlyClients,setOnlyClients] = useState(true);
  const apiUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
  let getClientsByFolder = async (folderID="1") => {
    const response = await axios.post(`${apiUrl}Json_GetClientsByFolder`,{
      agrno: "0261",
      Email: "nabs@docusoft.net",
      password: "ZG9jdXNvZnQ=",
      ProjectId: folderID
    });
    let res = JSON.parse(response?.data?.d);
    //setBothClientContact(res?.Table1);
    console.log("getClientsByFolder",res?.Table1);
    setClients(res?.Table1);
  }
  let getContactsByFolder = async (folderID="1",obj, clientKeys) => {
    const response = await axios.post(`${apiUrl}Json_GetContactListByFolder`,{
      agrno: "0261",
      Email: "nabs@docusoft.net",
      password: "ZG9jdXNvZnQ=",
      intFolderId: folderID
    });
    if(response?.data?.d !== ''){
      let res = JSON.parse(response?.data?.d);
    // console.log("obj",[...obj,...res?.Table]);
      //setContactKeys(Object.keys(res?.Table[0]));
      //let contactKeys = Object.keys(res?.Table[0]);
      //setAdvanceSearchKeys([...clientKeys,...contactKeys]);
      //setBothClientContact([...obj,...res?.Table]);
      setContacts(res?.Table);
      console.log("getContactsByFolder",res?.Table);
    }
  }
  useEffect(()=>{
    getClientsByFolder();
    getContactsByFolder();
  },[]);
  const basedOnClientContactAndAll = (target) => {
    if(target==="All"){
      setOnlyClients(true);
      setOnlyContacts(true);
    }else if(target==="Clients"){
      setOnlyClients(true);
      setOnlyContacts(false);
    }else if(target==="Contacts"){
      setOnlyClients(false);
      setOnlyContacts(true);
    }
  }
  return (
    <Box className='container'>
      <div className='select-for-clients-contacts-and-both'>
          <select onChange={(e)=>basedOnClientContactAndAll(e.target.value)}>
            {["All","Clients","Contacts"].map((item)=>{
              return <option value={item}>{item}</option>
            })}
          </select>  
        </div>
      <Box className='row'>
        <Box className='col-lg-11 m-auto'>
          <Box className='row'>
            {onlyClients && clients.map((item)=>{
                return <Box className='col-lg-3'>
                <Box className='client-box'>
                  {/* <img src={pin} className='pin-img' /> */}
                  <Box className='client-img'>
                    <img src={user} />
                  </Box>
                  <Typography title={item.Client} variant="h2">{item.Client.substr(0,12)+"."}</Typography>
                  <Typography variant='h4'>Admin</Typography>
                  <Typography title={item.Email} variant='p' className='mb-0'>{item.Email.substr(0,22)+"."}</Typography>
                  <Box className='color-filter-box mt-3'>
                    <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                    <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                    <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                  </Box>
                </Box>
              </Box>
              })}
              {onlyContacts && contacts.map((item)=>{
                return <Box className='col-lg-3'>
                <Box className='client-box'>
                  {/* <img src={pin} className='pin-img' /> */}
                  <Box className='client-img'>
                    <img src={user} />
                  </Box>
                  <Typography title={item["Company Name"]} variant="h2">{item["Company Name"].substr(0,12)+"."}</Typography>
                  <Typography variant='h4'>Admin</Typography>
                  <Typography title={item["E-Mail"]} variant='p' className='mb-0'>{item["E-Mail"].substr(0,22)+"."}</Typography>
                  <Box className='color-filter-box mt-3'>
                    <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                    <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                    <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                  </Box>
                </Box>
              </Box>
              })}
            {/* col box end */}


          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
