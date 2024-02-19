import React, {useEffect, useState} from 'react'
//import { useSelector, useDispatch } from "react-redux";
//import { increment, decrement } from "../redux/reducers/counterSlice";
import { Box, Typography } from '@mui/material';
import user from "../images/user.jpg";
//import pin from "../components/images/icons/star.svg";
import axios from "axios";
import { getClientsByFolder } from './client-services';
import Card from './utils/Card';
import { getContactsByFolder } from '../contact/contact-services';




function Client() {
  //const data = useSelector((state) => state.counter.value);
  //const dispatch = useDispatch();
  const [clients,setClients] = useState([]);
  const [contacts,setContacts] = useState([]);
  const [onlyContacts,setOnlyContacts] = useState(true);
  const [onlyClients,setOnlyClients] = useState(true);

  const getClients = async () => {
    let res = await getClientsByFolder();
    console.log("getClientsByFolder",res);
    setClients(res);
  }

  const getContacts = async () => {
    let res = await getContactsByFolder();
    setContacts(res);
    console.log("getContactsByFolder",res);
  }

  useEffect(()=>{
    getClients();
    getContacts();
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
                return <Card name={item.Client} email={item.Email} img={user}/>
            })}
              {onlyContacts && (contacts!=undefined? contacts.map((item)=>{
                return <Card name={item["Company Name"]} email={item["E-Mail"]} img={user}/>
              }):"")}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Client

