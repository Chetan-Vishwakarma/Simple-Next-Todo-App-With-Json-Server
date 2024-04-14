import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Button, Typography, Radio, Menu, MenuItem, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import PushPinIcon from '@mui/icons-material/PushPin';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import DocumentList from '../client/client-components/DocumentList';
import DataNotFound from './DataNotFound';
import CommanCLS from '../services/CommanService';
import { toast } from 'react-toastify';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArticleIcon from '@mui/icons-material/Article';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DocDetails from './DocDetails';
import DocumentsVewModal from '../client/utils/DocumentsVewModal';

const agrno = localStorage.getItem("agrno");
const Email = localStorage.getItem("Email");
const password = localStorage.getItem("Password");
const userId = localStorage.getItem("UserId");
const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
const smsUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";

function SearchResult({ myTotalTasks, myDocuments }) {
    let Cls = new CommanCLS(baseUrl, agrno, Email, password);
    let ClsSms = new CommanCLS(smsUrl, agrno, Email, password);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const target = searchParams.get("str");
    // const [target,setTarget] = useState(localStorage.getItem("globalSearchKey"));
    const folder = searchParams.get("folder");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState({});
    const [expanded, setExpanded] = React.useState('panel1');

    const [selectedDocument, setSelectedDocument] = React.useState(null);
    const [openPDFView, setOpenPDFView] = React.useState(false);
    const [isLoadingDoc, setIsLoadingDoc] = useState(false);
    const ViewerDocument = (e) => {
        setAnchorElDocumentList({});
        // console.log("document_object111", e);
        setSelectedDocument(e);

        setOpenPDFView(true);
        var IsApproved = e["IsApproved"];
        var PortalDocId = e["PortalDocId"];
        let IsApp = "";
        let PortalID = "";

        if (IsApproved === "SIG" && PortalDocId !== "") {
            IsApp = IsApproved;
            PortalID = PortalDocId;
        }

        let url = `https://mydocusoft.com/viewer.html?GuidG=${e.Guid}&srtAgreement=${agrno}&strItemId=${e["Registration No."]}&filetype=${e.type}&ViewerToken=${localStorage.getItem("ViewerToken")}&IsApp=${IsApp}&PortalID=${PortalID}`;
        console.log(url, "geturldata");
        // setsendUrldata(url);
        //window.open(url);
        setIsLoadingDoc(true)
    };

    const handleClickDocumentList = (event, index) => {
        event.stopPropagation();
        setAnchorElDocumentList(prevState => ({
            ...prevState,
            [index]: event.currentTarget
        }));
    };

    const handleCloseDocument = (event, index) => {
        event.stopPropagation();
        setAnchorElDocumentList(prevState => ({
            ...prevState,
            [index]: null
        }));
    };

    const [openDocumentDetailsList, setOpenDocumentDetailsList] = React.useState(false);
    const [docForDetails, setDocForDetails] = useState({});
    const handleClickOpenDocumentDetailsList = (sDoc) => {
        setDocForDetails(sDoc);
        setExpanded("panel1");
        setOpenDocumentDetailsList(true);
    };

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // January is 0, so add 1 to get the correct month
        const year = date.getFullYear();
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
        return `${paddedDay}/${paddedMonth}/${year}`;
    }

    const MarkComplete = (e) => {
        console.log("MarkComplete", e)
        Cls.ConfirmMessage("Are you sure you want to complete task", function (res) {
            if (res) {
                Json_UpdateTaskField("Status", "Completed", e);
            }
        })
    }
    function Json_UpdateTaskField(FieldName, FieldValue, e) {
        let o = {
            agrno: agrno,
            strEmail: Email,
            password: password,
            TaskId: e.ID,
            FieldName: FieldName,
            FieldValue: FieldValue
        }

        ClsSms.Json_UpdateTaskField(o, function (sts, data) {
            if (sts && data) {
                if (data === "Success") {
                    toast.success("Completed")
                    Json_AddSupplierActivity(e);
                }
                console.log("Json_UpdateTaskField", data)
            }
        })
    }

    const Json_AddSupplierActivity = (e) => {
        let obj = {};
        obj.OriginatorNo = e.ClientNo;
        obj.ActionReminder = "";
        obj.Notes = "Completed by " + e["Forwarded By"];
        obj.Status = "sys"; //selectedTask.Status;
        obj.TaskId = e.ID;
        obj.TaskName = "";
        obj.ActivityLevelID = "";
        obj.ItemId = "";

        try {
            ClsSms.Json_AddSupplierActivity(obj, function (sts, data) {
                if (sts && data) {
                    console.log({ status: true, messages: "Success", res: data });
                    Json_CRM_GetOutlookTask()
                }
            });
        } catch (error) {
            console.log({ status: false, messages: "Faild Please Try again" });
        }
    };

    const Json_CRM_GetOutlookTask = () => {
        try {
            Cls.Json_CRM_GetOutlookTask_ForTask((sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_CRM_GetOutlookTask111", json);
                        let result = json.Table.filter((el) => el.Source === "CRM" || el.Source === "Portal");
                        const formattedTasks = result.map((task) => {
                            let timestamp;
                            if (task.EndDateTime) {
                                timestamp = parseInt(task.EndDateTime.slice(6, -2));
                            }

                            const date = new Date(timestamp);

                            return { ...task, EndDateTime: date };
                        });

                        let myTasks = formattedTasks.filter((item) => item.AssignedToID.split(",").includes(userId) && item.mstatus !== "Completed");

                        let hasCreationDate = myTasks.filter((item) => item.CreationDate !== null).map((task) => {
                            let timestamp;
                            if (task.CreationDate) {
                                timestamp = parseInt(task.CreationDate.slice(6, -2));
                            }

                            const date = new Date(timestamp);

                            return { ...task, CreationDate: date };
                        }).sort((a, b) => b.CreationDate - a.CreationDate);

                        // dispatch(setMyTasks([...hasCreationDate]));
                        let fltTasks = hasCreationDate.filter(itm => itm.Subject.toLowerCase().includes(target.toLowerCase()));
                        setFilteredTasks(fltTasks);

                        // setActualData([...hasCreationDate]);
                        // setAllTask([...hasCreationDate]);

                        // setTaskFilter({...taskFilter, "EndDateTime": [start._d, end._d]});  // for initialization of filter
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_CRM_GetOutlookTask", err);
        }
    }

    useEffect(() => {
        let fltTasks = myTotalTasks.filter(itm => itm.Subject.toLowerCase().includes(target.toLowerCase()));
        setFilteredTasks(fltTasks);
        let fltDocuments = myDocuments.filter(itm => {
            if(itm.Description && target){
                return itm.Description.toLowerCase().includes(target.toLowerCase());
            }
        });
        // fltDocuments.map(itm => {
        //     itm["Item Date"] = formatDate(itm["Item Date"])
        // })
        setFilteredDocuments(fltDocuments);
        // console.log("fkjhdkjs",fltDocuments);
    }, [target, folder, myDocuments]);

    // useEffect(()=>{
    //     setTarget(localStorage.getItem("globalSearchKey"));
    // },[]);

    const handleDocumentNavigation = () => {
        navigate("/dashboard/DocumentList", { state: { globalSearchDocs: filteredDocuments, strGlobal: target } });
    }

    const handleMyTaskNavigation = () => {
        navigate("/dashboard/MyTask", { state: { globalSearchTask: filteredTasks, strGlobal: target } });
    }
    function startFormattingDate(dt) {
        const timestamp = parseInt(/\d+/.exec(dt));
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        return formattedDate === "Invalid Date" ? " " : formattedDate;
    }
    return (
        <>
        <DocumentsVewModal isLoadingDoc={isLoadingDoc} setIsLoadingDoc={setIsLoadingDoc} openPDFView={openPDFView} setOpenPDFView={setOpenPDFView} selectedDocument={selectedDocument}></DocumentsVewModal>
            <DocDetails expanded={expanded} setExpanded={setExpanded} ClsSms={ClsSms} docForDetails={docForDetails} openDocumentDetailsList={openDocumentDetailsList} setOpenDocumentDetailsList={setOpenDocumentDetailsList} />
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
                                    <Button variant="text" className='btn-blue-2 me-2' onClick={() => MarkComplete(item)}>Mark Complete</Button>
                                    <DateRangePicker initialSettings={{
                                        singleDatePicker: true,
                                        showDropdowns: true,
                                        startDate: new Date(parseInt(/\d+/.exec(item["EndDateTime"]))),
                                        minYear: 1901,
                                        maxYear: 2100,
                                    }}
                                        onCallback={(start) => {
                                            const date = start.format('YYYY/MM/DD');
                                            Json_UpdateTaskField("EndDateTime", date, item);
                                        }}
                                    >
                                        <Button variant="outlined" className='btn-outlin-2'>
                                            Defer
                                        </Button>
                                    </DateRangePicker>
                                </Box>
                            </Box>
                        </Grid>

                    }) : <DataNotFound />}
                </Grid>

                {filteredTasks.length > 9 && <Box className='text-center'><Button onClick={handleMyTaskNavigation} variant="text" className='btn-blue-2 mt-4 mb-4' size='small'>View More</Button></Box>}
            </Box>


            <Box className='clearfix'>
                <h3 className='font-20'><SearchIcon />  We found the following Documents matching <span className='text-blue bold'>"{target}"</span></h3>

                <Grid className='mt-0' container spacing={2}>
                    {filteredDocuments.length > 0 ? filteredDocuments.slice(0, 9).map((item, index) => {
                        return <Grid key={index} className='pt-0' item xs={12} lg={4} md={4} sm={12}><Box className="file-uploads">
                            <label className="file-uploads-label file-uploads-document" onDoubleClick={(e) => ViewerDocument(item)}>
                                <Box className="d-flex align-items-center">
                                    <DescriptionIcon
                                        sx={{
                                            fontSize: 32,
                                        }}
                                        className='me-2 ms-0'
                                    />
                                    <Box className="upload-content pe-3">
                                        <Typography variant="h4" >
                                            {item.Description ? item.Description : "No Name"}
                                        </Typography>
                                        <Typography variant="body1">
                                            {/* Size:  <span className='sembold'>{item.FileSize? item.FileSize: ""}</span> |  */}
                                            Date <span className='sembold'>{item["Item Date"] !== "NaN/NaN/NaN" ? formatDate(item["Item Date"]) : "01/01/2000"}</span>
                                            | <span className='sembold'>{item.Client}</span>
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button
                                        id={`basic-button-${index}`}
                                        aria-controls={anchorElDocumentList[index] ? `basic-menu-${index}` : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={Boolean(anchorElDocumentList[index])}
                                        onClick={(event) => handleClickDocumentList(event, index)}
                                        className='min-width-auto'
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id={`basic-menu-${index}`}
                                        anchorEl={anchorElDocumentList[index]}
                                        open={Boolean(anchorElDocumentList[index])}
                                        onClose={(event) => handleCloseDocument(event, index)}
                                        MenuListProps={{
                                            'aria-labelledby': `basic-button-${index}`,
                                        }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem
                                            onClick={(event) => handleCloseDocument(event, index)}
                                        >
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Create Task</MenuItem>
                                        <MenuItem onClick={(event) => {
                                            handleCloseDocument(event, index)
                                            handleClickOpenDocumentDetailsList(item)
                                        }}>
                                            <ListItemIcon>
                                                <ArticleIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Document Details</MenuItem>

                                        <MenuItem
                                            onClick={(event) => handleCloseDocument(event, index)}
                                        >
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Upload New Version</MenuItem>
                                        <MenuItem
                                            onClick={(event) => handleCloseDocument(event, index)}
                                        >
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Rename Document</MenuItem>
                                        <MenuItem
                                            onClick={(event) => handleCloseDocument(event, index)}
                                        >
                                            <ListItemIcon>
                                                <TravelExploreIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Open in Browser</MenuItem>
                                        <MenuItem
                                            onClick={(event) => handleCloseDocument(event, index)}
                                        >
                                            <ListItemIcon>
                                                <CloudDownloadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Download</MenuItem>
                                    </Menu>
                                </Box>
                            </label>
                        </Box></Grid>
                    }) : <DataNotFound />}</Grid>

                {filteredDocuments.length > 9 && <Box className='text-center mt-5'><Button onClick={handleDocumentNavigation} variant="text" className='btn-blue-2 mb-4' size='small'>View More</Button></Box>}
            </Box>
        </>
    )
}

export default SearchResult
