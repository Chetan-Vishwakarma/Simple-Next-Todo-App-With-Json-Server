import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CommanCLS from '../services/CommanService';
import { Box, Button, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import AMLVerification from './AMLVerification';

const agrno = localStorage.getItem("agrno");
const Email = localStorage.getItem("Email");
const Password = localStorage.getItem("Password");

function AMLCheck({ isAMLChkOpen, setisAMLChkOpen, contactDetails }) {
  const [verificationModal,setVerificationModalOpen] = useState(false);
  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
  let Cls = new CommanCLS(baseUrl, agrno, Email, Password);
  const [amlDetails, setAmlDetails] = useState({
    bankAccNo: "",
    bankSrNo: "",
    drivingLicNo: "",
    NiNumber: "",
    passportNo: "",
    isContactVerified: false
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAmlDetails(prevState => ({
      ...prevState, [name]: value
    }));
  }
  const isValidate = (str) => {
    if (amlDetails[str].length > 0) {
      return true;
    } else {
      return false
    }
  }
  const Json_UpdateContactVerify = () => {
    let obj = {
        agrno: agrno,
        Email: Email,
        password: Password,
        Contactemail: contactDetails[0]["E-Mail"],
        BnkAccNumber: "",
        BnkSrCode: "",
        DrvLicNumber: amlDetails.drivingLicNo,
        NatInsNumber: "",
        PassportNumber: ""
    }
    try {
        Cls.Json_UpdateContactVerify(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    console.log("Json_UpdateContactVerify", data);
                    if (data === "Success") {
                        setVerificationModalOpen(true);
                        // setAmlDetails({...amlDetails,isContactVerified:true});
                    }else{
                      toast.error("Contact verification failed");
                    }
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_UpdateContactVerify", err);
    }
}
  const handleUpdateContactVerify = (target) => {
    if (target === "drivingLicNo") {
      if (isValidate("drivingLicNo")) {
        Json_UpdateContactVerify();
      }
    }
  }

  return (
    <>
      {/* AML check modal Start */}
      <Dialog
        open={isAMLChkOpen}
        onClose={() => setisAMLChkOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="custom-modal aml-details-modal"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box className="d-flex align-items-center justify-content-between">
              <Box className="dropdown-box">
                <Typography variant="h4" className='font-18 text-black'>AML Details</Typography>
              </Box>

              <Button onClick={() => setisAMLChkOpen(false)} autoFocus sx={{ minWidth: 30 }} className='p-0'>
                <span className="material-symbols-outlined text-black">
                  cancel
                </span>
              </Button>
            </Box>

            <hr />

            <Box className='row'>
              <Box className='col-md-6'>
                <Box class="input-group mb-3">
                  <TextField name='bankAccNo' value={amlDetails.bankAccNo} onChange={handleInputChange} label="Bank Account No" className='form-control' variant="outlined" />
                  <Button className={isValidate("bankAccNo") ? 'btn-blue-2 btn-sign active' : 'btn-blue-2 btn-sign'} onClick={() => handleUpdateContactVerify("bankAccNo")}><CheckIcon /></Button>
                </Box>

              </Box>

              <Box className='col-md-6'>
                <Box class="input-group mb-3">
                  <TextField name='bankSrNo' value={amlDetails.bankSrNo} onChange={handleInputChange} label="Bank SR Code" variant="outlined" className='form-control' />
                  <Button className={isValidate("bankSrNo") ? 'btn-blue-2 btn-sign active' : 'btn-blue-2 btn-sign'} onClick={() => handleUpdateContactVerify("bankSrNo")}><CheckIcon /></Button>
                </Box>
              </Box>
            </Box>

            <Box className='row'>
              <Box className='col-md-6'>
                <Box class="input-group mb-3">
                  <TextField name='drivingLicNo' value={amlDetails.drivingLicNo} onChange={handleInputChange} label="Driving Lic No" variant="outlined" className='form-control' />
                  <Button className={isValidate("drivingLicNo") ? 'btn-blue-2 btn-sign active' : 'btn-blue-2 btn-sign'} onClick={() => handleUpdateContactVerify("drivingLicNo")}><CheckIcon /></Button>
                </Box>
              </Box>

              <Box className='col-md-6'>
                <Box class="input-group mb-3">
                  <TextField name='NiNumber' value={amlDetails.NiNumber} onChange={handleInputChange} label="NI Number" variant="outlined" className='form-control' />
                  <Button className={isValidate("NiNumber") ? 'btn-blue-2 btn-sign active' : 'btn-blue-2 btn-sign'} onClick={() => handleUpdateContactVerify("NiNumber")}><CheckIcon /></Button>
                </Box>
              </Box>

              <Box className='col-md-6'>
                <Box class="input-group mb-3">
                  <TextField name='passportNo' value={amlDetails.passportNo} onChange={handleInputChange} label="Passport Number" variant="outlined" className='form-control' />
                  <Button className={isValidate("passportNo") ? 'btn-blue-2 btn-sign active' : 'btn-blue-2 btn-sign'} onClick={() => handleUpdateContactVerify("passportNo")}><CheckIcon /></Button>
                </Box>
              </Box>

              {/* <Box className='col-md-6'>
                <Button variant="text" className="btn-blue btn-block">
                  Next
                  <NavigateNextIcon className='ms-2' />
                </Button>
              </Box> */}
            </Box>

          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
                Agree
            </Button>
        </DialogActions> */}
      </Dialog>

      {/* AML check modal End */}


      {/* Checkmodal modal Start */}
      <AMLVerification verificationModal={verificationModal} setVerificationModalOpen={setVerificationModalOpen} contactDetails={contactDetails} amlDetails={amlDetails} agrno={agrno} Email={Email} Password={Password} Cls={Cls}/>
      {/* <Dialog
        open={verificationModal}
        onClose={() => setVerificationModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="custom-modal"

      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box className="d-flex align-items-center justify-content-between">
              <Box className="dropdown-box">
                <Typography variant="h4" className='font-18 text-black'>Driving License Verification</Typography>
              </Box>

              <Button onClick={() => setVerificationModalOpen(false)} autoFocus sx={{ minWidth: 30 }} className='p-0'>
                <span className="material-symbols-outlined text-black">
                  cancel
                </span>
              </Button>
            </Box>

            <hr />

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
      </Dialog> */}

      {/* Checkmodal check modal End */}

      {/* viewer modal start */}
      {/* <Dialog
        open={isViewerModalOpen}
        onClose={() => setIsViewerModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="custom-modal"

      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box className="d-flex align-items-center justify-content-between">
              <Box className="dropdown-box">
                <Typography variant="h4" className='font-18 text-black'>Driving License Verification</Typography>
              </Box>

              <Button onClick={() => setIsViewerModalOpen(false)} autoFocus sx={{ minWidth: 30 }} className='p-0'>
                <span className="material-symbols-outlined text-black">
                  cancel
                </span>
              </Button>
            </Box>

            <hr />

            <TestPDF />

          </DialogContentText>
        </DialogContent>
      </Dialog> */}

      {/* viewer modal end */}
    </>
  )
}

export default AMLCheck