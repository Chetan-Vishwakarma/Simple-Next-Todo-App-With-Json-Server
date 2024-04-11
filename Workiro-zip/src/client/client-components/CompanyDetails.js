import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneIcon from '@mui/icons-material/Phone';

const agrno = localStorage.getItem("agrno");
const Email = localStorage.getItem("Email");
const password = localStorage.getItem("Password");
const folderId = localStorage.getItem("FolderId");

function CompanyDetails({ companyDetails, originatorNo, Cls }) {
    const [mainAddress,setMainAddress] = useState({});
    const Json_GetClientAddresses = (currentUser) => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            clientId: originatorNo
        };
        try {
            Cls.Json_GetClientAddresses(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        setMainAddress(json?.Table[0]);
                        console.log("Json_GetClientAddresses", json);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetToFavourites", err);
        }
    }
    useEffect(()=>{
        Json_GetClientAddresses();
    },[]);
    return (
        <Box className="col-xl-6 col-lg-6 col-md-12 main-company-details">
            <Typography variant="body1" className='mb-4 bold' gutterBottom>
                Company Details
            </Typography>

            <Box className="row">
                <Box className="col-lg-4 col-md-6 col-sm-12 pe-2">
                    <Box class="company-details-box d-flex">
                        <Box class="flex-shrink-0">
                            <PinDropIcon />
                        </Box>
                        {Object.keys(mainAddress).length>0 && <Box class="flex-grow-1 ms-2">
                            <Typography variant="h6" gutterBottom>
                                Address
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {mainAddress.Add1}
                            </Typography>
                        </Box>}
                    </Box>

                    <Box class="company-details-box d-flex">
                        <Box class="flex-shrink-0">
                            <PhoneIcon />
                        </Box>
                        <Box class="flex-grow-1 ms-2">
                            <Typography variant="h6" gutterBottom>
                                Tel
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {companyDetails[0]?.TelNo}
                            </Typography>
                        </Box>
                    </Box>

                </Box>

                <Box className="col-lg-8 col-md-6 col-sm-12 ps-1">
                    <Box className="row">
                        {companyDetails[0]?.StatusName && <Box className="col-xxl-4 col-lg-6 col-md-6">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Status
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.StatusName}
                                </Typography>
                            </Box>
                        </Box>}

                        {companyDetails[0]?.SourceName && <Box className="col-xxl-4 col-lg-6 col-md-6">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Source
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.SourceName}
                                </Typography>
                            </Box>
                        </Box>}

                        {companyDetails[0]?.ManagerName && <Box className="col-xxl-4 col-lg-6 col-md-6">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Manager
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.ManagerName}
                                </Typography>
                            </Box>
                        </Box>}

                        {companyDetails[0]?.Email && <Box className="col-xxl-4 col-lg-12">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Email
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.Email}
                                </Typography>
                            </Box>
                        </Box>}

                        {companyDetails[0]?.BussName && <Box className="col-xxl-8 col-lg-12">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Business
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.BussName}
                                </Typography>
                            </Box>
                        </Box>}
                    </Box>
                </Box>


            </Box>
        </Box>
    )
}

export default CompanyDetails
