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
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function CompaniesHouse() {
    return (
        <Box className='mt-3'>
            {/* <Typography variant="h2" className='font-20 bold mb-2'>
                Companies House
            </Typography> */}
            <Box className='white-box h-100'>
                <Typography variant="h2" className='font-16 bold mb-2'>
                    Companies House
                </Typography>
                <hr />
                <Grid container spacing={2} className='mt-3'>
                    <Grid item xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}
                        sx={{
                            borderRight: '2px solid #f1f1f1'
                        }}
                    >
                        <ul className='address-list'>
                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Company number
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        04856441
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Company name
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        DOCUSOFT LIMITED
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Type
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        LTD
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Status
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Active
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Registered Office
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        30 Bear Street,,Barnstaple,EX32 7DD,
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Postcode
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        EX32 7DD
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Confirmation statement next due
                                    </Typography>
                                </Box>
                                <Box className='add-details d-flex align-items-center'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Lorem ipsome dolore site amet
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Date of creation
                                    </Typography>
                                </Box>
                                <Box className='add-details d-flex align-items-center'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        05/08/2003
                                    </Typography>
                                </Box>
                            </ListItem>

                        </ul>
                    </Grid>

                    <Grid item xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <ul className='address-list'>
                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Can File
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Lorem ipsome dolor site
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Has insolvency history
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        No
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Accounts next made up to
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        31/12/2023
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Accounts next due
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        30/09/2024

                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Confirmation statement next made up to
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Lorem ipsome dolore site
                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Next Statement Date
                                    </Typography>
                                </Box>
                                <Box className='add-details'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        03/02/2025

                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Due By
                                    </Typography>
                                </Box>
                                <Box className='add-details d-flex align-items-center'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        03/02/2025

                                    </Typography>
                                </Box>
                            </ListItem>

                            <ListItem>
                                <Box className='add-heading add-heading-client'>
                                    <KeyboardDoubleArrowRightIcon />
                                    <Typography variant="body2" className='font-13 sembold'>
                                        Last Statement Date
                                    </Typography>
                                </Box>
                                <Box className='add-details d-flex align-items-center'>
                                    <Typography variant="body2" className='font-13 sembold'>
                                        03/02/2024
                                    </Typography>
                                </Box>
                            </ListItem>
                        </ul>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default CompaniesHouse