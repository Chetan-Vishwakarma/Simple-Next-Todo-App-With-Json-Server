import React from 'react';
import user from "../../images/01.png";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, Tabs, Tab, Checkbox, Link,MenuItem,Menu } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DescriptionIcon from '@mui/icons-material/Description';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Activity from '../../client/utils/Activity';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CategoryIcon from '@mui/icons-material/Category';
import GradingIcon from '@mui/icons-material/Grading';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AddIcon from '@mui/icons-material/Add';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function DocumentsVewModal({ openPDFView, setOpenPDFView }) {

    // const [value, setValue] = React.useState(1);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const [anchorElChangeIndex, setAnchorElChangeIndex] = React.useState(null);
    const ChangeIndex = Boolean(anchorElChangeIndex);
    const handleClickChangeIndex = (event) => {
        setAnchorElChangeIndex(event.currentTarget);
    };
    const handleCloseChangeIndex = () => {
        setAnchorElChangeIndex(null);
    };

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClosePDFView = () => {
        setOpenPDFView(false);
    };

    return (

        <Dialog
            open={openPDFView}
            onClose={handleClosePDFView}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='custom-modal full-modal'
            sx={{ width: '100%', maxWidth: '100%' }}
        >
            <DialogContent>

                <Box className="d-flex align-items-center justify-content-between">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold mb-0 text-black'>
                            Document List 
                        </Typography>
                    </Box>

                    {/*  */}

                    <Box className="d-flex align-items-center justify-content-between flex-wrap">
                        <Button className='btn-blue-2 me-2 mb-1' size="small" >Create Task</Button>
                        <Button className='btn-blue-2 me-2 mb-1' size="small" >Send as Email</Button>
                        <Button className='btn-blue-2 me-2 mb-1' size="small" >Downloads</Button>

                        <Box>
                            <Button
                                id="basic-button"
                                aria-controls={ChangeIndex ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={ChangeIndex ? 'true' : undefined}
                                onClick={handleClickChangeIndex}
                                className='btn-blue-2'
                            >
                                Change Index <KeyboardArrowDownIcon className='ms-1'/>
                            </Button>
                            <Menu
                                id="basic-menu"
                                className='custom-dropdown'
                                anchorEl={anchorElChangeIndex}
                                open={ChangeIndex}
                                onClose={handleCloseChangeIndex}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}                                
                            >
                                <MenuItem onClick={handleCloseChangeIndex}> <CategoryIcon className='me-2'/> Category</MenuItem>
                                <MenuItem onClick={handleCloseChangeIndex}> <GradingIcon className='me-2'/> Refile</MenuItem>
                                <MenuItem onClick={handleCloseChangeIndex}> <InsertLinkIcon className='me-2'/> Links</MenuItem>
                                <MenuItem onClick={handleCloseChangeIndex}> <AddIcon className='me-2'/> Add</MenuItem>
                                <MenuItem onClick={handleCloseChangeIndex}> <AlarmOnIcon className='me-2'/> Activity</MenuItem>
                            </Menu>
                        </Box>

                        <Button onClick={handleClosePDFView} autoFocus sx={{ minWidth: 30 }}>
                            <span className="material-symbols-outlined text-black">
                                cancel
                            </span>
                        </Button>

                    </Box>
                </Box>

                <hr />

                <DialogContentText id="alert-dialog-description">

                    <Box sx={{ width: '100%', typography: 'body1' }} className="mt-4 pt-1">
                        <TabContext value={value}>
                            <Box>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" className='custom-tabs'>
                                    <Tab label="Documents" value="1" />
                                    <Tab label="Versions" value="2" />
                                    <Tab label="Notes" value="3" />
                                    <Tab label="Associated Tasks" value="4" />
                                    <Tab label="Activity" value="5" />
                                    <Tab label="Attachments" value="6" />
                                </TabList>
                            </Box>
                            <TabPanel value="1" className='p-0'>

                                <Box className='white-box'>
                                    <img src={user} alt="User" className='w-100' />
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">

                                <Box className='row'>
                                    {Array(12).fill("").map(() => {
                                        return <>
                                            <Box className='col-lg-3'>
                                                <Box className="file-uploads">
                                                    <label className="file-uploads-label file-uploads-document">
                                                        <Box className="d-flex align-items-center">
                                                            <DescriptionIcon
                                                                sx={{
                                                                    fontSize: 32,
                                                                }}
                                                                className='me-2'
                                                            />
                                                            <Box className="upload-content pe-3">
                                                                <Typography variant="h4" >
                                                                    This File is Test Files.pdf 2
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    12:36PM 28/12/2023 | File uploaded by Patrick
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </label>
                                                </Box>
                                                {/* file upload end */}
                                            </Box>
                                        </>
                                    })}
                                </Box>

                            </TabPanel>
                            <TabPanel value="3">
                                Notes textarea here
                            </TabPanel>

                            <TabPanel value="4">

                                <Box className='text-center'>

                                    {Array(15).fill("").map(() => {
                                        return <>
                                            <Link href="#" className="text-decoration-none d-inline-flex align-content-center me-3 mb-3 flex"><RadioButtonUncheckedIcon className="me-1" />Contact agreement</Link>
                                        </>
                                    })}

                                </Box>

                            </TabPanel>

                            <TabPanel value="5" className='p-0'>
                                <Activity></Activity>
                            </TabPanel>

                            {/* <TabPanel value="5">
                        <DocumentList/>
                    </TabPanel> */}
                            <TabPanel value="6">

                                <Box className='d-flex mb-3 mt-2'>
                                    {/* <FormControlLabel control={<Checkbox />} className="p-0 m-0 ms-2 ps-1" size="small"/> */}
                                    <Checkbox {...label} defaultChecked size="small" />

                                    <Button className='btn-blue-2 me-2 mb-1' startIcon={<AttachFileIcon />}>Upload Your File</Button>

                                    <Button className='btn-red me-2 mb-1' startIcon={<AttachFileIcon />}>Delete</Button>

                                    <Button className='btn-blue-2 me-2 mb-1' startIcon={<AttachFileIcon />}>Download</Button>

                                </Box>

                                <hr />

                                <Box className='row'>
                                    {Array(12).fill("").map(() => {
                                        return <>
                                            <Box className='col-xxl-3 col-xl-4 col-md-6'>
                                                <Box className="file-uploads">
                                                    <label className="file-uploads-label file-uploads-document">
                                                        <Box className="d-flex align-items-center">
                                                            <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" />

                                                            <DescriptionIcon
                                                                sx={{
                                                                    fontSize: 32,
                                                                }}
                                                                className='me-2'
                                                            />
                                                            <Box className="upload-content pe-3">
                                                                <Typography variant="h4" >
                                                                    cmd-extension
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    12:36PM 02/03/2024
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </label>
                                                </Box>
                                                {/* file upload end */}
                                            </Box>
                                        </>
                                    })}
                                </Box>

                            </TabPanel>
                        </TabContext>
                    </Box>
                </DialogContentText>
            </DialogContent>

            {/* <DialogActions>
                <Button onClick={handleClosePDFView}>Disagree</Button>
                <Button onClick={handleClosePDFView} autoFocus>
                    Agree
                </Button>
            </DialogActions> */}
        </Dialog>

    )
}

export default DocumentsVewModal;