import React, { useState } from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { countries } from './countries';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const selectMR = [
    { label: 'Mr' },
    { label: 'Mrs' },
    { label: 'Miss' },
    { label: 'Ms' },
    { label: 'Dr' }
];

function AMLVerification({ verificationModal, setVerificationModalOpen, contactDetails, amlDetails, agrno, Email, Password, Cls }) {
    const [currentDate, setCurrentDate] = useState("");
    const Json_VerifyDrivingLicence = () => {
        // setIsViewerModalOpen(!isViewerModalOpen);
        let obj = {
            agrno: agrno,
            strEmail: Email,
            password: Password,
            strTitle: "",
            strFirstName: "",
            strMiddleName: "",
            strLastName: "",
            dtDateOfBirth: "",
            strGender: "",
            strAddress1: "",
            strAddress2: "",
            strAddress3: "",
            strAddress4: "",
            strPostTown: "",
            strCounty: "",
            strPostCode: "",
            strCountry: "",
            strLicenseNo: amlDetails.drivingLicNo
        }
        try {
            Cls.Json_VerifyDrivingLicence(obj, (sts, data) => {
                if (sts) {
                    console.log("Json_VerifyDrivingLicence", data);
                }
            });
        } catch (err) {
            console.log("Error while calling Json_VerifyDrivingLicence", err);
        }
    }
    return (
        <Dialog
            open={verificationModal}
            onClose={() => setVerificationModalOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="custom-modal"

        >
            <Box className="d-flex align-items-center justify-content-between modal-head">
                <Box className="dropdown-box">
                    <Typography variant="h4" className='font-18 text-black'>Driving License Verification</Typography>
                </Box>

                <Button onClick={() => setVerificationModalOpen(false)} autoFocus sx={{ minWidth: 30 }} className='p-0'>
                    <span className="material-symbols-outlined text-black">
                        cancel
                    </span>
                </Button>
            </Box>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box className='row'>
                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    className='w-100'
                                    options={selectMR}
                                    renderInput={(params) => <TextField {...params} label="Title" />}
                                />
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <TextField label="First Name" defaultValue={contactDetails.length > 0 && contactDetails[0]["First Name"]} className='form-control' variant="outlined" />
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <TextField label="Middle Name" variant="outlined" className='form-control' />
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <TextField label="Last Name" defaultValue={contactDetails.length > 0 && contactDetails[0]["Last Name"]} variant="outlined" className='form-control' />
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <LocalizationProvider
                                    className="pe-0 sadik"
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker className=" w-100"
                                        defaultValue={currentDate}// Set the default value using the value prop
                                        onChange={(e) => setCurrentDate(e)} // Update the default date when the user changes it                      
                                        inputFormat="DD/MM/YYYY" // Set the input format to "dd/mm/yyyy"
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" className='sembold'>Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>

                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <textarea className='textarea form-control' placeholder='Address1'></textarea>
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <textarea className='textarea form-control' placeholder='Address2'></textarea>
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <textarea className='textarea form-control' placeholder='Address3'></textarea>
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <textarea className='textarea form-control' placeholder='Address4'></textarea>
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <TextField label="Post Town" variant="outlined" className='form-control' />
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>

                            <Autocomplete
                                id="country-select-demo"
                                options={countries}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img
                                            loading="lazy"
                                            width="20"
                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                            alt=""
                                        />
                                        {option.label} ({option.code}) +{option.phone}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        className='form-control'
                                        {...params}
                                        label="Choose a country"
                                        defaultValue={contactDetails[0].Country}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <TextField label="PostCode" defaultValue={contactDetails.length > 0 && contactDetails[0]["PostCode"]} variant="outlined" className='form-control' />
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <TextField label="County" defaultValue={contactDetails.length > 0 && contactDetails[0]["County"]} variant="outlined" className='form-control' />
                            </Box>
                        </Box>

                        <Box className='col-xl-6 col-md-6'>
                            <Box class="input-group mb-3">
                                <TextField label="Driving License Number" defaultValue={amlDetails.drivingLicNo} variant="outlined" className='form-control' />
                            </Box>
                        </Box>

                        <Box className='col-md-6'>
                            <Button variant="text" className="btn-blue btn-block" onClick={Json_VerifyDrivingLicence}>
                                Verify
                                <NavigateNextIcon className='ms-2' />
                            </Button>
                        </Box>
                    </Box>

                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default AMLVerification
