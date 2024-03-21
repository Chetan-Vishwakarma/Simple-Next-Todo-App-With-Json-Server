import { Breadcrumbs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function CustomBreadCrumbs({location}) {
    const [tabs,setTabs] = useState([]);
    useEffect(()=>{
        // console.log("location Object: ",location.pathname.split("/"));
        let data = location.pathname.split("/").map((itm,i)=>{
            if(i>1){
                return {label:itm,value:itm}
            }
        }).filter(dt=>dt!==undefined);
        setTabs(data);
    },[location.pathname]);
    console.log("location Object: ",tabs);
  return (
    <div role="presentation" className='mb-2 mb-3 '>
                <Breadcrumbs aria-label="breadcrumb">
                    {tabs.length>0&& tabs.map(itm=>(
                        <Link underline="hover" color="inherit" to={`/dashboard/${itm.label}`}>
                        {itm.label}
                        </Link>
                    ))}
                    {/* <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Clients
                    </Link>
                    <Typography color="text.primary">Client Details</Typography> */}
                </Breadcrumbs>
            </div>
  )
}

export default CustomBreadCrumbs
