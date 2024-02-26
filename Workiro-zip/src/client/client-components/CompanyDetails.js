import { Box, Typography } from '@mui/material'
import React from 'react'
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneIcon from '@mui/icons-material/Phone';

function CompanyDetails({companyDetails}) {
    return (
        <Box className="col-xl-6 col-lg-6 col-md-12 main-company-details">
            <Typography variant="body1" className='mb-4 bold' gutterBottom>
                Company Details
            </Typography>

            <Box className="row">
                <Box className="col-lg-4 col-md-6 col-sm-12">
                    <Box class="company-details-box d-flex">
                        <Box class="flex-shrink-0">
                            <PinDropIcon />
                        </Box>
                        <Box class="flex-grow-1 ms-2">
                            <Typography variant="h6" gutterBottom>
                                Address
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {companyDetails[0]?.Address}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box className="col-lg-8 col-md-6 col-sm-12">
                    <Box className="row">
                        <Box className="col-xxl-4 col-lg-6 col-md-6">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Status
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.StatusName}
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="col-xxl-4 col-lg-6 col-md-6">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Source
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.SourceName}
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="col-xxl-4 col-lg-6 col-md-6">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Manager
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.ManagerName}
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="col-xxl-4 col-lg-12">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Email
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.Email}
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="col-xxl-8 col-lg-12">
                            <Box class="company-details-box">
                                <Typography variant="h6" gutterBottom>
                                    Business
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {companyDetails[0]?.BussName}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box class="company-details-box d-flex">
                    <Box class="flex-shrink-0">
                        <PhoneIcon />
                    </Box>
                    <Box class="flex-grow-1 ms-2">
                        <Typography variant="body1" gutterBottom>
                            {companyDetails[0]?.TelNo}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CompanyDetails
