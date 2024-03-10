import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FolderIcon from '@mui/icons-material/Folder';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Checkbox, FormControlLabel } from '@mui/material';


function UploadDocument({ openUploadDocument, setOpenUploadDocument }) {

    const handleCloseDocumentUpload = () => {
        setOpenUploadDocument(false);
    };

    return (

        <React.Fragment>


            {/* <Button variant="outlined" onClick={handleClickOpenUploadDocument}>
                OpenUploadDocument alert dialog
            </Button> */}
            <Dialog
                open={openUploadDocument}
                onClose={handleCloseDocumentUpload}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
            >

                <DialogContent className='pb-0'>
                    <DialogContentText id="alert-dialog-description">

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="dropdown-box">
                                <Typography variant="h4" className='font-18 bold text-black'>
                                    Upload Document
                                </Typography>
                            </Box>

                            {/*  */}
                            <Button onClick={handleCloseDocumentUpload} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>

                        <hr />


                        {/* file upload */}
                        <Box className="">
                            <Box className='row'>
                                <Box className='col-lg-8 m-auto'>
                                    <Box className="file-upload-2 mt-4">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            multiple
                                        />
                                        <label className="file-upload-2-label" for="file-upload">
                                            <Box className="text-center">
                                                <span className="material-symbols-outlined icon">
                                                    cloud_upload
                                                </span>
                                                <Box className="upload-content-2">
                                                    <Typography variant="h4" className='font-18 bold mb-1'>
                                                        Select or drag file here
                                                    </Typography>
                                                    <Typography variant="body1" className='font-14'>
                                                        JPG, PNG or PDF, file size no more than 10MB
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </label>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className='uploaded-list mt-4'>
                                {Array(12).fill("").map(() => {
                                    return <>
                                        <Box className='uploaded-box'>
                                            <CloseIcon className='close-icon' />
                                            <DescriptionIcon />
                                            <Typography variant="body1" className='font-14'>
                                                Upload_Documen.pdf
                                            </Typography>
                                            <Typography variant="body1" className='font-12'>
                                                1054KB
                                            </Typography>
                                        </Box>
                                    </>
                                })}
                            </Box>
                        </Box>

                        <Box className='row d-none'>
                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Folder}
                                    renderInput={(params) => <TextField {...params} label="Folder" />}
                                />
                                
                            </Box>

                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Folder}
                                    renderInput={(params) => <TextField {...params} label="Scetion" />}
                                />
                            </Box>

                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Folder}
                                    renderInput={(params) => <TextField {...params} label="Reference" />}
                                />
                            </Box>

                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Folder}
                                    renderInput={(params) => <TextField {...params} label="Reference" />}
                                />
                            </Box>

                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                <label className='font-14 text-black'>Document Date</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker className=" w-100"
                                        format="DD/MM/YYYY"
                                    />
                                </LocalizationProvider>
                            </Box>

                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                <label className='font-14 text-black'>Received Date</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker className=" w-100"
                                        format="DD/MM/YYYY"
                                    />
                                </LocalizationProvider>
                            </Box>

                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Folder}
                                    renderInput={(params) => <TextField {...params} label="Standard Description" />}
                                />
                            </Box>

                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12 pt-2'>
                                <FormControlLabel control={<Checkbox />} label="Create Task" />
                                <FormControlLabel control={<Checkbox />} label="Publish" />
                            </Box>

                            <Box className='col-lg-12'>
                                <textarea className='textarea w-100' placeholder='Description'></textarea>
                            </Box>

                        </Box>


                        {/* row end */}

                        {/* UDF Start */}

                        {/* <hr />

                        <Typography variant="body1" className="font-18 bold mb-2 text-black">
                            UDF Form
                        </Typography>

                        <Box className='row'>
                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" className='w-100' />
                            </Box>

                            <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                <Autocomplete

                                    disablePortal
                                    id="combo-box-demo"
                                    options={Folder}
                                    renderInput={(params) => <TextField {...params} label="Financial Year" />}
                                />
                            </Box>
                        </Box> */}

                        {/* UDF End */}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box className="d-flex mb-3 pe-3">
                        <Button variant="text" className="btn-blue-2 me-2" onClick={handleCloseDocumentUpload}>
                            Next
                        </Button>
                        <Button variant="text" className="btn-blue-2" onClick={handleCloseDocumentUpload}>
                            Submit
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default UploadDocument

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Folder = [
    { label: 'Client' },
    { label: 'Cases' },
    { label: 'Customer' },
    { label: 'Share Allotments' },
    { label: 'M Customer' },
    { label: 'Process Folder' }
];