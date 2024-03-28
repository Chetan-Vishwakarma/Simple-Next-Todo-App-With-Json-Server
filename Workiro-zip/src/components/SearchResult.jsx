import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Button, Typography, Radio,  } from '@mui/material';
import Grid from '@mui/material/Grid';
import PushPinIcon from '@mui/icons-material/PushPin';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import DocumentList from '../client/client-components/DocumentList';

function SearchResult({ myTotalTasks, myDocuments }) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const target = searchParams.get("str");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // January is 0, so add 1 to get the correct month
        const year = date.getFullYear();
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
        return `${paddedDay}/${paddedMonth}/${year}`;
    }

    useEffect(() => {
        let fltTasks = myTotalTasks.filter(itm => itm.Subject.toLowerCase().includes(target.toLowerCase()));
        setFilteredTasks(fltTasks);
        let fltDocuments = myDocuments.filter(itm => itm.Description.toLowerCase().includes(target.toLowerCase()));
        setFilteredDocuments(fltDocuments);
        fltDocuments.map(itm => {
            itm["Item Date"] = formatDate(itm["Item Date"])
        })
        // console.log("fkjhdkjs",fltDocuments);
    }, [target]);

    const handleDocumentNavigation=()=>{
        navigate("/dashboard/DocumentList",{state:{globalSearchDocs:filteredDocuments}});
        // navigate("/dashboard/clientDetails?val=5",{
        //     state:{
        //         agrno: "",
        //         Email: "",
        //         password: "",
        //         folderId: "",
        //         originatorNo: "",
        //         globalSearchDocs:filteredDocuments
        //     }
        // });
    }
    return (
        <>

            <Box className='mb-5'>
                <h3 className='font-20'><SearchIcon/> We found the following Tasks matching <span className='text-blue bold'>"{target}"</span></h3>
                <Grid className='mt-0' container spacing={2} >
                    {filteredTasks.length > 0 && filteredTasks.slice(0, 9).map(itm => {
                        return <Grid className='pt-0' item xs={12} lg={4} md={4} sm={12}>
                        <Box className='todo-list-box white-box relative w-100'>
                            <Box className='clearfix'>
                                <Radio className='text-red check-todo'
                                    // {...label}
                                    // icon={<RadioButtonUncheckedIcon />}
                                    // checkedIcon={<CheckCircleIcon />}
                                    checked
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "secondary",
                                        },
                                    }}
                                />
                                <PushPinIcon className='pinicon'></PushPinIcon>
                            </Box>
                            <Typography variant='subtitle1 mb-3 d-block'><strong>Type:</strong> Signature Tast</Typography>
                            <Typography variant='h2' className='mb-2'>{itm.Subject}</Typography>
                            <Box className='d-flex align-items-center justify-content-between'>
                                <Typography variant='subtitle1' ><pan className='text-gray'>
                                    You <ArrowForwardIosIcon className='font-14' /> </pan>
                                    <a href='#'>Patrick</a>,
                                    <a href='#'>Patrick</a> <a href='#'> +2</a></Typography>
                                <Typography variant='subtitle1 sembold'>01/05/23</Typography>
                            </Box>
                            <Box className='d-flex align-items-center justify-content-between'>
                                <Typography variant='subtitle1'>Docusoft india pvt ltd</Typography>
                                <Typography variant='subtitle1'>
                                    <Box>
                                        <Button
                                            id="basic-button"
                                        >
                                            priority
                                        </Button>
                                    </Box>
                                </Typography>
                            </Box>
                            <Box className='mt-2'>
                                <Button variant="text" className='btn-blue-2 me-2'>Action</Button>
                                <Button variant="outlined" className='btn-outlin-2'>Defer</Button>
                            </Box>
                        </Box>
                    </Grid>

                    })}
                </Grid>

                {filteredTasks.length > 9 && <Box className='text-center'><Button variant="text" className='btn-blue-2 mt-4 mb-4' size='small'>View More</Button></Box>}
            </Box>


            <Box className='clearfix'>
                <h3  className='font-20'><SearchIcon/>  We found the following Documents matching <span className='text-blue bold'>"{target}"</span></h3>
                
                <Grid className='mt-0' container spacing={2}>
                    {filteredDocuments.length > 0 && filteredDocuments.slice(0, 9).map(itm => {
                        return <Grid className='pt-0' item xs={12} lg={4} md={4} sm={12}><Box className="file-uploads">
                            <label className="file-uploads-label file-uploads-document">
                                <Box className="d-flex align-items-center">
                                    <Box className="upload-content pe-3">
                                        <Typography variant="h4" >
                                            {itm.Description}
                                        </Typography>
                                        <Typography variant="body1">
                                            Size:  <span className='sembold'>0.00 KB</span> | Date <span className='sembold'>09/03/2024</span>
                                        </Typography>
                                    </Box>
                                </Box>
                            </label>
                        </Box></Grid>
                    })}</Grid>

                {filteredDocuments.length > 9 && <Box className='text-center mt-5'><Button onClick={handleDocumentNavigation} variant="text" className='btn-blue-2 mb-4' size='small'>View More</Button></Box>}
            </Box>
        </>
    )
}

export default SearchResult
