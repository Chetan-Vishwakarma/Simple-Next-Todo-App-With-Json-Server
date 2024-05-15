import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Button, Typography, Radio, Menu, MenuItem, ListItemIcon, Badge } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import DataNotFound from './DataNotFound';
import CommanCLS from '../services/CommanService';
import { toast } from 'react-toastify';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArticleIcon from '@mui/icons-material/Article';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DocDetails from './DocDetails';
import DocumentsVewModal from '../client/utils/DocumentsVewModal';
import BootstrapTooltip from '../utils/BootstrapTooltip';
import Fileformat from '../images/files-icon/pdf.png';
import AttachFileIcon from '@mui/icons-material/InsertLink';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { setAllTaskFromRedux, setGetActivityDataSonam } from '../../src/redux/reducers/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskFieldFromRedux } from '../redux/reducers/api_helper';
import CustomLoader from './CustomLoader';
import TaskDetailModal from './TaskDetailModal';
import DocumentTripleDot from '../utils/DocumentTripleDot';
import GetFileType from './FileType';


const agrno = localStorage.getItem("agrno");
const Email = localStorage.getItem("Email");
const password = localStorage.getItem("Password");
const folderId = localStorage.getItem("FolderId");
const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
let Cls = new CommanCLS(baseUrl, agrno, Email, password);
const smsUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
let ClsSms = new CommanCLS(smsUrl, agrno, Email, password);
const baseUrlPortal = "https://portal.docusoftweb.com/clientservices.asmx/";
let ClsPortal = new CommanCLS(baseUrlPortal, agrno, Email, password);

function SearchResult({ myTotalTasks, myDocuments }) {
    const dispatch = useDispatch();
    const { actualData, isTaskLoadingFromRedux } = useSelector(state => state.counter);
    const { result: filteredDocuments, isLoading } = useSelector(state => state.counter.advanceSearchResult);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const target = searchParams.get("str");
    const folder = searchParams.get("folder");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState({});
    const [expanded, setExpanded] = React.useState('panel1');

    const [selectedDocument, setSelectedDocument] = React.useState(null);
    const [openPDFView, setOpenPDFView] = React.useState(false);
    const [isLoadingDoc, setIsLoadingDoc] = useState(false);
    const [openModal, setOpen] = React.useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [isApi, setIsApi] = useState(false);
    const [attachmentFileTodo, setAttachmentFileTodo] = useState([]);

    const ViewerDocument = (e) => {
        setAnchorElDocumentList({});
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
        setIsLoadingDoc(true)
    };

    const [editingIndex, setEditingIndex] = useState(null);
    const [updatedSubject, setUpdatedSubject] = useState('');
    const [test, setTest] = useState({});

    const handleEdit = (index) => {
        setEditingIndex(index);
        filteredDocuments.map(itm=>{
            if(itm["Registration No."]===index){
                setUpdatedSubject(itm.Description);
            }
        })
    };
    const handleChange = (event) => {
        setUpdatedSubject(event.target.value);
    };
    const Json_RenameDocument = (doc, newDesc, index) => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            ItemId: doc["Registration No."] ? doc["Registration No."] : "",
            Description: newDesc,
            FolderId: folderId
        };
        ClsSms.Json_RenameDocument(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    console.log("Json_RenameDocument", json);
                    if (json.Status === "Success") {
                        toast.success(json.Message);
                        setEditingIndex(null);
                        setTest({ ...test, [index]: newDesc });
                    } else {
                        toast.error("Unable to rename this document");
                    }
                }
            }
        });
    }

    const handleSave = (newDesc, oldDesc, doc, index) => {
        
        if (oldDesc === newDesc) return;
        Json_RenameDocument(doc, newDesc, index);
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
    const [showDocuDetails, setshowDocuDetails] = useState(false);
    const handleClickOpenDocumentDetailsList = (sDoc) => {
        setshowDocuDetails(true);
        setDocForDetails(sDoc);
        dispatch(setGetActivityDataSonam(sDoc));
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

    function addToWorkTable(Itid, e) {
        let obj = { agrno: agrno, Email: Email, password: password, ItemId: Itid, comment: `${e["Forwarded By"]} has completed  a task-${e.Subject} . Task ID : ${e.ID}` };
        ClsSms.Json_AddToWork(obj, function (status, data) {
            if (status) {
                if (data) {
                }
            }
        });
    }

    const GetMessageAttachments_Json = (mgsId, e) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: mgsId,
        };
        ClsPortal.GetMessageAttachments_Json(o, function (sts, data) {
            if (sts && data) {
                let arrayOfObjects = JSON.parse(data);
                if (arrayOfObjects && arrayOfObjects.length > 0) {
                    setAttachmentFileTodo(arrayOfObjects);
                    if (e.Source === "Portal") {
                        arrayOfObjects.forEach((item) => {
                            if (item.ItemID) {
                                addToWorkTable(item.ItemID, e);
                            }
                        });
                    }

                }
            }
        });
    }

    const MarkComplete = (e) => {
        Cls.ConfirmMessage("Are you sure you want to complete task", function (res) {
            if (res) {
                dispatch(updateTaskFieldFromRedux("Status", "Completed", e));
                try {
                    let obj = {};
                    obj.TaskId = e.ID;
                    Cls.Json_Get_CRM_SavedTask_ByTaskId(obj, function (status, data) {
                        if (status && data) {
                            let json = JSON.parse(data);
                            console.log("Json_Get_CRM_SavedTask_ByTaskId", json);

                            let table6 = json.T6;

                            if (table6 && table6.length > 0) {
                                table6.forEach((item) => {
                                    addToWorkTable(item.ItemId, e);
                                });
                            } else {

                            }

                        }
                    });
                } catch (e) { }
                try {
                    if (e.Source === "Portal") {
                        GetMessageAttachments_Json(e.PubMessageId, e);
                    }
                } catch (e) { }
            }
        })
    }

    const [userList, setUserList] = React.useState([]);

    function Json_GetForwardUserList() {
        try {
            let o = {};
            o.agrno = agrno;
            o.Email = Email;
            o.Password = password;
            ClsSms.GetInternalUserList(o, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let { Status, Message } = js;
                        if (Status === "Success") {
                            let tbl = Message.Table;
                            let result = tbl.filter((el) => {
                                return el.CGroup !== "Yes";
                            });
                            setUserList(result);
                        }
                    }

                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        Json_GetForwardUserList();

        let fltTasksssss = actualData.filter(itm => itm.Subject.toLowerCase().includes(target.toLowerCase()));
        setFilteredTasks(fltTasksssss);
        dispatch(setAllTaskFromRedux({ data: fltTasksssss, taskFilter: { "mstatus": ["Not Started", "On Hold", "In Progress"] } }))

    }, [target, folder, myDocuments]);

    const handleDocumentNavigation = () => {
        navigate("/dashboard/DocumentList?filter=true", { state: { globalSearchDocs: filteredDocuments, strGlobal: target } });
    }

    const handleMyTaskNavigation = () => {
        navigate("/dashboard/MyTask?filter=true", { state: { globalSearchTask: [], strGlobal: target } });
    }

    function startFormattingDate(dt) {
        const date = new Date(dt);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        return formattedDate === "Invalid Date" ? " " : formattedDate;
    }



    const [anchorElMore, setAnchorElMore] = useState({});
    const [openMore, setOpenMore] = useState({});

    const handleClickMore = (event, documentIndex) => {
        setAnchorElMore((prevState) => ({
            ...prevState,
            [documentIndex]: event.currentTarget
        }));
        setOpenMore((prevState) => ({
            ...prevState,
            [documentIndex]: true
        }));
    };

    const handleCloseMore = (documentIndex) => {
        setAnchorElMore((prevState) => ({
            ...prevState,
            [documentIndex]: null
        }));
        setOpenMore((prevState) => ({
            ...prevState,
            [documentIndex]: false
        }));
    };

    const FiterAssinee = (ownerid) => {

        let res = userList.filter((e) => e.UserId === ownerid);
        if (res.length > 0) {
            return res[0].UserName;
        }

    }

    const FilterAgs = (item) => {
        const arr = item.AssignedToID.split(",").filter(Boolean).map(Number);

        const filteredIds = arr.filter((k) => k !== item.OwnerID);

        let userFilter = []; // Initialize an empty array to store filtered users

        if (filteredIds.length > 0) {
            userFilter = userList.filter((user) => filteredIds.includes(user.UserId));
            console.log(userFilter, "hello pring data");
            // Filter userList to include only those users whose UserId is present in filteredIds
        }

        return userFilter && userFilter.length > 0 ? userFilter : "";
    }

    const handleClickOpen = (task = selectedTask) => {
        setSelectedTask(task);
        setOpen(true);
    };

    return (
        <>
            <DocumentsVewModal isLoadingDoc={isLoadingDoc} setIsLoadingDoc={setIsLoadingDoc} openPDFView={openPDFView} setOpenPDFView={setOpenPDFView} selectedDocument={selectedDocument}></DocumentsVewModal>
            {showDocuDetails === true && (<DocDetails expanded={expanded} setExpanded={setExpanded} ClsSms={ClsSms} docForDetails={docForDetails} selectedDocument={selectedDocument} openDocumentDetailsList={openDocumentDetailsList} setOpenDocumentDetailsList={setOpenDocumentDetailsList} />)}

            <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal} attachmentFileTodo={attachmentFileTodo}></TaskDetailModal>

            <Box className='clearfix'>
                <h3 className='font-20'><SearchIcon />  We found the following Documents matching <span className='text-blue bold'>"{target}"</span></h3>

                {isLoading ? <CustomLoader /> : <Grid className='mt-0' container spacing={2}>
                    {filteredDocuments.length > 0 ? filteredDocuments.slice(0, 9).map((item, index) => {
                        return <Grid key={index} className='pt-0 d-flex w-100' item xs={12} lg={4} md={4} sm={12}>
                            <Box className="file-uploads d-flex w-100">
                                <label className="file-uploads-label file-uploads-document d-flex w-100" onClick={(event) => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    handleCloseDocument(event, index);
                                }} onDoubleClick={(e) => ViewerDocument(item)}>
                                    <Box className="d-flex align-items-center">
                                        <div className='img-format'>
                                            <GetFileType Type={item.Type ? item.Type.toLowerCase() : null}></GetFileType>
                                            {/* <img src={Fileformat} /> */}
                                        </div>
                                        <Box className="upload-content pe-3">
                                            {editingIndex === item["Registration No."] ? (
                                                <input
                                                    type="text"
                                                    defaultValue={item.Description}
                                                    value={updatedSubject}
                                                    onChange={handleChange}
                                                    autoFocus
                                                    onBlur={(e) => handleSave(e.target.value, item.Description, item, index)}
                                                    className='edit-input'
                                                />
                                            ) : (
                                                <BootstrapTooltip title={item.Description ? item.Description : ""} arrow
                                                    placement="bottom-start"
                                                    slotProps={{
                                                        popper: {
                                                            modifiers: [
                                                                {
                                                                    name: 'offset',
                                                                    options: {
                                                                        offset: [0, -10],
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                    }}
                                                >
                                                    <Typography variant="h4" >
                                                        {Object.keys(test).includes(String(index)) ? test[index] : (item.Description && item.Description.length > 35) ? item.Description.substr(0, 35) + "..." : item.Description ? item.Description : "No Name"}
                                                    </Typography>
                                                </BootstrapTooltip>
                                            )}
                                            <Typography variant="body1">
                                                {/* Size:  <span className='sembold'>{item.FileSize? item.FileSize: ""}</span> |  */}
                                                Date <span className='sembold'>{item["Item Date"] ? item["Item Date"] : "01/01/2000"}</span>
                                                | <span className='sembold'>{item.Client}</span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <DocumentTripleDot data={{ data: item }} handleEdit={handleEdit} />
                                    </Box>
                                </label>
                            </Box>

                        </Grid>
                    }) : <DataNotFound />}</Grid>}

                {filteredDocuments.length > 9 && <Box className='text-center mt-5'><Button onClick={handleDocumentNavigation} variant="text" className='btn-blue-2 mb-4' size='small'>View More</Button></Box>}
            </Box>

            <Box className='mb-5 mt-5'>
                <h3 className='font-20 mt-1 mb-3'><SearchIcon /> We found the following Tasks matching <span className='text-blue bold'>"{target}"</span></h3>
                <Grid className='mt-0' container spacing={2} >
                    {isTaskLoadingFromRedux ? <CustomLoader /> : (filteredTasks.length > 0 ? filteredTasks.slice(0, 9).map((item, index) => {
                        const arr = item.AssignedToID.split(",").filter(Boolean).map(Number);
                        let userName = FilterAgs(item);
                        return <Grid className='pt-0' item xs={12} lg={4} md={4} sm={12}>
                            <Box className='todo-list-box white-box relative w-100' onDoubleClick={() => handleClickOpen(item)}>

                                <Box className='check-todo'>
                                    <Badge color="primary" className='custom-budget' badgeContent={0} showZero>
                                        <AttachFileIcon />
                                    </Badge>

                                    <Radio className={item.Priority === 1 ? 'text-red ' : item.Priority === 2 ? 'text-green' : 'text-grey'} checked
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "secondary",
                                            },
                                        }}
                                        size='small'
                                    />

                                    {/* <PushPinIcon className='pinicon'></PushPinIcon> */}

                                </Box>

                                <Typography variant='subtitle1 mb-3 d-block'><strong>Type:</strong> {item.Source}</Typography>
                                <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>
                                <Box className='d-flex align-items-center justify-content-between'>
                                    <Typography variant='subtitle1'><pan className='text-gray'>

                                        {FiterAssinee(item.OwnerID)} {arr.length > 1 && (<ArrowForwardIosIcon className='font-14' />)}  </pan>
                                        {/* <a href='#'>Patrick</a>, */}
                                        <span>{userName && userName.length > 0 ? userName[0].UserName : ""}</span>


                                        {arr && arr.length > 2 ? <Button
                                            id={`demo-positioned-button-${index}`}
                                            aria-controls={openMore[index] ? `demo-positioned-menu-${index}` : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openMore[index] ? 'true' : undefined}
                                            onClick={(event) => handleClickMore(event, index)}
                                        >
                                            + {arr && arr.length > 0 ? arr.length - 2 : ""}
                                        </Button> : ""}

                                        <Menu
                                            id={`demo-positioned-menu-${index}`}
                                            anchorEl={anchorElMore[index]}
                                            open={openMore[index]}
                                            onClose={() => handleCloseMore(index)}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            {userName && userName.length > 0 ? userName.slice(1).map((user, idx) => (
                                                <MenuItem key={idx} onClick={() => handleCloseMore(index)}>{user.UserName}</MenuItem>
                                            )) : ""}
                                        </Menu>


                                    </Typography>



                                    <Typography variant='subtitle1 sembold'>{item["CreationDate"] ? (startFormattingDate(item["CreationDate"])) : ""}</Typography>
                                </Box>
                                <Box className='d-flex align-items-center justify-content-between'>
                                    <Typography variant='subtitle1'>{item.Client}</Typography>
                                    <Typography variant='subtitle1'>
                                        <Box>
                                            <Button
                                                id="basic-button"
                                            >
                                                {item.mstatus}
                                            </Button>
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box className='mt-2'>
                                    <Button variant="text" disabled={item.mstatus === "Completed"} className='btn-blue-2 me-2' onClick={() => MarkComplete(item)}>Mark Complete</Button>
                                    <DateRangePicker initialSettings={{
                                        singleDatePicker: true,
                                        showDropdowns: true,
                                        startDate: new Date(parseInt(/\d+/.exec(item["EndDateTime"]))),
                                        minYear: 1901,
                                        maxYear: 2100,
                                    }}
                                        onCallback={(start) => {
                                            const date = start.format('YYYY/MM/DD');
                                            dispatch(updateTaskFieldFromRedux("EndDateTime", date, item));
                                        }}
                                    >
                                        <Button variant="outlined" className='btn-outlin-2'>
                                            Defer
                                        </Button>
                                    </DateRangePicker>
                                </Box>
                            </Box>
                        </Grid>

                    }) : <DataNotFound />)}
                </Grid>

                {filteredTasks.length > 9 && <Box className='text-center'><Button onClick={handleMyTaskNavigation} variant="text" className='btn-blue-2 mt-4 mb-4' size='small'>View More</Button></Box>}
            </Box>
        </>
    )
}

export default SearchResult
