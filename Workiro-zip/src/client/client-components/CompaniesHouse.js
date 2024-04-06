import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import CircleIcon from '@mui/icons-material/Circle';


function CompaniesHouse() {
    return (
        <Box className='mt-3'>
            {/* <Typography variant="h2" className='font-20 bold mb-2'>
                Companies House
            </Typography> */}
            <Box className='white-box mb-5'>
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
                                    <CircleIcon className='me-2' />
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
            {/*  */}

            <Box className='mb-4'>
                <Typography variant="h2" className='font-16 bold mb-2'>
                    Officers
                </Typography>
                <hr />
                <Box className='main-accordian'>
                    {Array(9).fill("").map(() => {
                        return <>
                            <Accordion className='accordian-box' defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    kevin nigel salter
                                </AccordionSummary>
                                <AccordionDetails>

                                    <Box className='table-responsive' sx={{ maxHeight: 'initial !important' }}>
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <th>Contact Type</th>
                                                    <td>DIRECTOR</td>
                                                </tr>
                                                <tr>
                                                    <th>FirstName</th>
                                                    <td>Kevin Nigel</td>
                                                </tr>
                                                <tr>
                                                    <th>Last Name</th>
                                                    <td>Salter</td>
                                                </tr>
                                                <tr>
                                                    <th>Date Of Birth</th>
                                                    <td>02/01/2012</td>
                                                </tr>
                                                <tr>
                                                    <th>Nationality</th>
                                                    <td>British</td>
                                                </tr>
                                                <tr>
                                                    <th>Country of Residence</th>
                                                    <td>United Kingdom
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Country</th>
                                                    <td>United Kingdom
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Company Address</th>
                                                    <td>Bear Street,,Barnstaple,EX32 7DD,United Kingdom</td>
                                                </tr>
                                                <tr>
                                                    <th>Appointed on</th>
                                                    <td>02/01/2012</td>
                                                </tr>
                                                <tr>
                                                    <th>Resigned on</th>
                                                    <td>02/01/2012</td>
                                                </tr>
                                                <tr>
                                                    <th>Occupation</th>
                                                    <td>Chartered Accountant</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </Box>
                                </AccordionDetails>
                            </Accordion></>
                    })}

                </Box>

            </Box>

            <Box className=''>
                <Typography variant="h2" className='font-16 bold mb-2'>
                    History
                </Typography>
                <hr />
            </Box>

        </Box>
    )
}

export default CompaniesHouse