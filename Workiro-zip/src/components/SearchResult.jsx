import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Button, Typography, Radio, } from '@mui/material';
import Grid from '@mui/material/Grid';
import PushPinIcon from '@mui/icons-material/PushPin';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import DocumentList from '../client/client-components/DocumentList';
import DataNotFound from './DataNotFound';

function SearchResult({ myTotalTasks, myDocuments }) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const target = searchParams.get("str");
    const folder = searchParams.get("folder");
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

    // useEffect(() => {
    //     let fltTasks = myTotalTasks.filter(itm => itm.Subject.toLowerCase().includes(target.toLowerCase()));
    //     setFilteredTasks(fltTasks);
    //     let fltDocuments = myDocuments.filter(itm => itm.Description.toLowerCase().includes(target.toLowerCase()));
    //     fltDocuments.map(itm => {
    //         itm["Item Date"] = formatDate(itm["Item Date"])
    //     })
    //     setFilteredDocuments(fltDocuments);
    //     // console.log("fkjhdkjs",fltDocuments);
    // }, []);

    useEffect(() => {
        let fltTasks = myTotalTasks.filter(itm => itm.Subject.toLowerCase().includes(target.toLowerCase()));
        setFilteredTasks(fltTasks);
        let fltDocuments = myDocuments.filter(itm => itm.Description.toLowerCase().includes(target.toLowerCase()));
        fltDocuments.map(itm => {
            itm["Item Date"] = formatDate(itm["Item Date"])
        })
        setFilteredDocuments(fltDocuments);
        // console.log("fkjhdkjs",fltDocuments);
    }, [target,folder]);

    const handleDocumentNavigation = () => {
        navigate("/dashboard/DocumentList", { state: { globalSearchDocs: filteredDocuments, strGlobal: target } });
    }

    const handleMyTaskNavigation = () => {
        navigate("/dashboard/MyTask", { state: { globalSearchTask: filteredTasks, strGlobal: target } });
    }
    function startFormattingDate(dt) {
        //const timestamp = parseInt(/\d+/.exec(dt));
        const date = new Date(dt);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        return formattedDate === "Invalid Date" ? " " : formattedDate;
    }
    return (
        <>

            <Box className='mb-5'>
                <h3 className='font-20 mt-1'><SearchIcon /> We found the following Tasks matching <span className='text-blue bold'>"{target}"</span></h3>
                <Grid className='mt-0' container spacing={2} >
                    {filteredTasks.length > 0 ? filteredTasks.slice(0, 9).map(item => {
                        return <Grid className='pt-0' item xs={12} lg={4} md={4} sm={12}>
                            <Box className='todo-list-box white-box relative w-100'>
                                <Box className='clearfix'>
                                    <Radio className={item.Priority === 1 ? 'text-red check-todo' : item.Priority === 2 ? 'text-green check-todo' : 'text-grey check-todo'} checked
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "secondary",
                                            },
                                        }}
                                    />
                                    {/* <PushPinIcon className='pinicon'></PushPinIcon> */}
                                </Box>
                                <Typography variant='subtitle1 mb-3 d-block'><strong>Type:</strong> {item.Source}</Typography>
                                <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>
                                <Box className='d-flex align-items-center justify-content-between'>
                                    <Typography variant='subtitle1' ><pan className='text-gray'>
                                    {item.UserName} <ArrowForwardIosIcon className='font-14' /> </pan>
                                        {/* <a href='#'>Patrick</a>, */}
                                        <a href='#'>{item["Forwarded By"]}</a> <a href='#'> +2</a></Typography>
                                    <Typography variant='subtitle1 sembold'>{item["EndDateTime"] && startFormattingDate(item["EndDateTime"])}</Typography>
                                </Box>
                                <Box className='d-flex align-items-center justify-content-between'>
                                    <Typography variant='subtitle1'>{item.Client}</Typography>
                                    <Typography variant='subtitle1'>
                                        <Box>
                                            <Button
                                                id="basic-button"
                                            >
                                                {item.Status}
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

                    }):<DataNotFound/>}
                </Grid>

                {filteredTasks.length > 9 && <Box className='text-center'><Button onClick={handleMyTaskNavigation} variant="text" className='btn-blue-2 mt-4 mb-4' size='small'>View More</Button></Box>}
            </Box>


            <Box className='clearfix'>
                <h3 className='font-20'><SearchIcon />  We found the following Documents matching <span className='text-blue bold'>"{target}"</span></h3>

                <Grid className='mt-0' container spacing={2}>
                    {filteredDocuments.length > 0 ? filteredDocuments.slice(0, 9).map(item => {
                        return <Grid className='pt-0' item xs={12} lg={4} md={4} sm={12}><Box className="file-uploads">
                            <label className="file-uploads-label file-uploads-document">
                                <Box className="d-flex align-items-center">
                                    <Box className="upload-content pe-3">
                                        <Typography variant="h4" >
                                            {item.Description? item.Description: ""}
                                        </Typography>
                                        <Typography variant="body1">
                                            {/* Size:  <span className='sembold'>{item.FileSize? item.FileSize: ""}</span> |  */}
                                            Date <span className='sembold'>{item["Item Date"]!=="NaN/NaN/NaN"?item["Item Date"]:"01/01/2000"}</span>
                                            | Uploaded by <span className='sembold'>Patrick</span>
                                        </Typography>
                                    </Box>
                                </Box>
                            </label>
                        </Box></Grid>
                    }):<DataNotFound/>}</Grid>

                {filteredDocuments.length > 9 && <Box className='text-center mt-5'><Button onClick={handleDocumentNavigation} variant="text" className='btn-blue-2 mb-4' size='small'>View More</Button></Box>}
            </Box>
        </>
    )
}

export default SearchResult
