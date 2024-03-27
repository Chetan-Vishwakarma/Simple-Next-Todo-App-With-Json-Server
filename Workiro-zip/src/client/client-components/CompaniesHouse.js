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

function CompaniesHouse() {
  return (
    <Box className='mt-3'>
                <Typography variant="h2" className='font-20 bold mb-2'>
                    Address
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xxl={4} xl={4} lg={6} md={12} sm={12} xs={12}>
                        <Box className='white-box h-100'>
                            <Typography variant="h2" className='font-16 bold mb-2'>
                                Main Address
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
                                            72 Gloddaeth Street, Birdwell, United Kingdom
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
                                            72 Gloddaeth Street, Birdwell, United Kingdom
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
                                            72 Gloddaeth Street, Birdwell, United Kingdom
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
                                            Barnstaple
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
                                            Devon
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
                                            EX32 7DD
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
                                            United Kingdom
                                        </Typography>
                                    </Box>
                                </ListItem>

                            </List>

                        </Box>
                    </Grid>

                    <Grid item xxl={4} xl={4} lg={6} md={12} sm={12} xs={12}>
                        <Box className='white-box h-100'>
                            <Typography variant="h2" className='font-16 bold mb-2'>
                                Billing Address
                            </Typography>
                            <hr />

                            <ul className='address-list'>
                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 1
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                            72 Gloddaeth Street, Birdwell, United Kingdom
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
                                            72 Gloddaeth Street, Birdwell, United Kingdom
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
                                            72 Gloddaeth Street, Birdwell, United Kingdom
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
                                            Barnstaple
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
                                            Devon
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
                                            EX32 7DD
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
                                            United Kingdom
                                        </Typography>
                                    </Box>
                                </ListItem>

                            </ul>

                        </Box>
                    </Grid>

                    <Grid item xxl={4} xl={4} lg={6} md={12} sm={12} xs={12}>
                        <Box className='white-box h-100'>
                            <Typography variant="h2" className='font-16 bold mb-2'>
                                Registered Address
                            </Typography>
                            <hr />

                            <ul className='address-list'>
                                <ListItem>
                                    <Box className='add-heading'>
                                        <LocationOnIcon />
                                        <Typography variant="body2" className='font-13 sembold'>
                                            Address 1
                                        </Typography>
                                    </Box>
                                    <Box className='add-details'>
                                        <Typography variant="body2" className='font-13 sembold'>
                                            72 Gloddaeth Street, Birdwell, United Kingdom
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
                                            72 Gloddaeth Street, Birdwell, United Kingdom
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
                                            72 Gloddaeth Street, Birdwell, United Kingdom
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
                                            Barnstaple
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
                                            Devon
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
                                            EX32 7DD
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
                                            United Kingdom
                                        </Typography>
                                    </Box>
                                </ListItem>

                            </ul>

                        </Box>
                    </Grid>

                </Grid>
            </Box>
  )
}

export default CompaniesHouse