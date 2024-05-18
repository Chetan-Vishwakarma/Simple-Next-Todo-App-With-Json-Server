import React, { useEffect, useRef, useState } from "react";
import CommanCLS from "../services/CommanService";
import dayjs from "dayjs";
// import LoginDetails from "../services/Utils";
import Swal from "sweetalert2";
// import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Link, Chip, Stack, ListItemIcon, Radio, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import {AdapterDayjs,LocalizationProvider,DatePicker} from '@mui/x-date-pickers';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { v4 as uuidv4 } from 'uuid';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    FilterRow,
    Pager,
    Paging,
    SearchPanel,
    Selection,
    Scrolling,
    Sorting,
    DataGridTypes 
} from 'devextreme-react/data-grid';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import BallotIcon from '@mui/icons-material/Ballot';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DescriptionIcon from '@mui/icons-material/Description';
import SendIcon from '@mui/icons-material/Send';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import FolderIcon from '@mui/icons-material/Folder';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import user from "../images/user.jpg";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DocumentDetails from "./DocumentDetails";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ArticleIcon from '@mui/icons-material/Article';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DatePicker from 'react-datetime';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EditIcon from '@mui/icons-material/Edit';
import EjectIcon from '@mui/icons-material/Eject';
import Checkbox from '@mui/material/Checkbox';
import Fade from '@mui/material/Fade';
import GetClientList from "./GetClientList";
import {
    TextField,
} from "@mui/material";
import AssigneeUsers from "./AssigneeUser";
import dxTileView from "devextreme/ui/tile_view";
import { HtmlEditor } from "devextreme-react";
import HtmlEditorDX from "./HtmlEditor";
import { json } from "react-router-dom";
import CopyLinkButton from "./CopyLinkButton";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PortalMessage from "./PortalMessage";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import MergeIcon from '@mui/icons-material/Merge';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DocumentList from "../client/client-components/DocumentList";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Activity from "../client/utils/Activity";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import Fileformat from '../images/files-icon/pdf.png';
import moment from 'moment';
import GetFileType from "./FileType";
import { BorderBottom } from "@mui/icons-material";
import { fetchAllTasksRedux } from "../redux/reducers/api_helper";
import { useDispatch } from "react-redux";
import DocumentTripleDot from "../utils/DocumentTripleDot";


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


let addItemdata = [];
function TaskDetailModal({ setIsApi, isApi, selectedTask, openModal, setOpen, attachmentFileTodo }) {
    console.log(attachmentFileTodo, "TaskDetailModal2222", selectedTask);
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    const baseUrlPortal = "https://portal.docusoftweb.com/clientservices.asmx/";
    const baseUrlSms = "https://docusms.uk/dsdesktopwebservice.asmx/";
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    let Clsprect = new CommanCLS(baseUrlPractice, agrno, Email, password);


    let Cls = new CommanCLS(baseUrl, agrno, Email, password);
    let ClsPortal = new CommanCLS(baseUrlPortal, agrno, Email, password);
    let ClsSms = new CommanCLS(baseUrlSms, agrno, Email, password);

    /////////////////////////////////////////Task Activity
    const [anchorEl4, setAnchorEl4] = React.useState(null);
    const [selectedEmailForComment, setSelectedEmailForComment] = React.useState({});
    // const [NumPriority, setNumPriority] = React.useState(selectedTask.Priority);
    const [NumPriority, setNumPriority] = React.useState((selectedTask && selectedTask.Priority) ? selectedTask.Priority : "");

    const [folderList, setFolderList] = useState([]);
    const [portalComments, setPortalComments] = useState([]);
    const [PortalDocumentShow, setPortalDocumentShow] = useState([]);
    const [copyLink, setCopyLink] = useState("");
    const pageSizes = [10, 25, 50, 100];
    // const [txtFolder, settxtFolder] = useState(selectedTask.Folder);
    const [txtFolder, settxtFolder] = useState((selectedTask && selectedTask.Folder) ? selectedTask.Folder : "");
    // const [txtFolderId, setTxtFolderId] = useState(selectedTask.FolderID);
    const [txtFolderId, setTxtFolderId] = useState((selectedTask && selectedTask.FolderID) ? selectedTask.FolderID : "");
    const [dmsDocumentList, setDMSDocumentList] = React.useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [secondary, setSecondary] = React.useState(false);
    const [getCRMSaved, setGetCRMSaved] = React.useState([]);
    const dispatch = useDispatch();
    // const [txtSection, settxtSection] = React.useState(selectedTask.Section);
    const [txtSection, settxtSection] = React.useState((selectedTask && selectedTask.Section) ? selectedTask.Section : "");
    // const [txtClient, setTxtClient] = React.useState(selectedTask.Client);
    const [txtClient, setTxtClient] = React.useState((selectedTask && selectedTask.Client) ? selectedTask.Client : "");
    // const [txtClientId, setTxtClientId] = React.useState(selectedTask.Client);
    const [txtClientId, setTxtClientId] = React.useState((selectedTask && selectedTask.Client) ? selectedTask.Client : "");

    const [txtSectionId, settxtSectionId] = React.useState(null);


    const [anchorClsEl, setAnchorClsEl] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [crmTaskAcivity, setCRMTaskAcivity] = React.useState(null);
    //const [selectedTaskp, setselectedTask] = React.useState(selectedTask);
    /////////////////////////////////////////End Task Activity

    const [messageId, setMessageId] = React.useState("");

    const [addUser, setAddUser] = useState([]);
    const [ownerID, setOwnerID] = React.useState("");

    const [forwardUser, setForwardUser] = React.useState({});


    const [currentDate, setCurrentDate] = useState(""); // Initialize with the current date in "dd/mm/yyyy" format
    const [nextDate, setNextDate] = useState("");
    const [remiderDate, setRemiderDate] = useState("");

    const [status, setStatus] = useState("");
    const [tSubject, setTSubject] = useState("");

    const messageContainerRef = useRef(null);

    ////////////////////////////////Attachment files
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [attachmentPath, setAttachmentPath] = useState([]);
    const [selectedDocumentFileDMS, setSelectedDocumentFileDMS] = useState([]);

    const [txtdescription, setTxtDescriptin] = React.useState("");
    const [details, setDetails] = React.useState("");

    const [clientList, setClientList] = useState([]);

    const [associatedTask, setAssociatedTask] = useState([]);



    ////////////////////////////////End Attachment files

    const [isVisible, setIsVisible] = useState(false); // Initially visible

    // 
    const [scroll, setScroll] = React.useState('paper');
    const [getUser, setGetUser] = React.useState({});
    const [sectionList, setSectionList] = React.useState([]);

    const [clientObject, setClientObject] = useState(null);

    const [searchSectionQuery, setSearchSectionQuery] = useState("");
    const [searchClient1Query, setSearchClient1Query] = useState("");
    const [isvisibleSubject, setisvisibleSubject] = useState(false);

    const toggleVisibilityCancle = () => {
        setIsVisible(false); // Toggle visibility
    };

    const handalClickEditeSubject = () => {
        setIsVisible(false); // Toggle visibility
        setisvisibleSubject(true)
    };
    const handalClickEditeDescription = () => {
        setIsVisible(true); // Toggle visibility
        setisvisibleSubject(false)
    };

    const toggleVisibilityCancleSubject = () => {
        setisvisibleSubject(false); // Toggle visibility
        setIsVisible(false); // Toggle visibility
    };

    const handalChangeSetSubject = (e) => {
        setTSubject(e.target.value); // Toggle visibility
    };

    const disablePastDt = (date) => {
        const today = new Date();
        return date.isSameOrAfter(today, 'day'); // Disable past dates

    };





    const [anchorElSec, setAnchorSectionEl] = React.useState(null);

    const openSection = Boolean(anchorElSec);
    const handleClickSection = (event) => {
        setAnchorSectionEl(event.currentTarget);
    };
    const handleCloseSection = (e) => {
        settxtSection(e.Sec)
        settxtSectionId(e.SecID)
        setAnchorSectionEl(null);
        Json_UpdateTaskField("TypeOfTaskID", e.SecID, "Section Updated!")
    };

    const handleSelectionChanged = (selectedItems) => {
        setSelectedRows(selectedItems.selectedRowsData);
        // You can perform further actions with the selectedRows array
        console.log("selectedItems11", selectedItems); // Log the selected rows data
        // Create a Set to store unique data
        // const uniqueData = new Set(addItemdata);
        // setOwnerTaskID(selectedItems.selectedRowsData[0]);
        // // Loop through each selected row data and add it to the uniqueData Set
        // selectedItems.selectedRowsData.forEach(rowData => {
        //     uniqueData.add(rowData);
        // });

        // // Convert the uniqueData Set back to an array and set it to addItemdata
        // addItemdata = [...uniqueData];
        console.log(addItemdata, "addItemdata");
    };




    const openClient = Boolean(anchorClsEl);

    const handleClickClick = (event) => {
        setAnchorClsEl(event.currentTarget);
    };
    const handleCloseClient = (e) => {
        setClientObject(e)
        setAnchorClsEl(null);
        setTxtClient(e.Client);
        setTxtClientId(e.ClientID);
        if (e.ClientID) {
            Json_UpdateTaskField("AssociatedWithID", e.ClientID, "Reference updated!")
        }


    };






    const Json_Get_CRM_Task_ActivityByTaskId = (taskid) => {
        // console.log("selectedTask333333333", taskid);
        let obj = {};
        obj.TaskID = taskid;
        try {
            const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
            let Cls = new CommanCLS(baseUrl, agrno, Email, password);

            Cls.Json_Get_CRM_Task_ActivityByTaskId(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_Get_CRM_Task_ActivityByTaskId", json);
                        const formattedActivity = json.Table.map((activity) => {
                            let ActivityDate;
                            if (activity.ActivityDate) {
                                ActivityDate = parseInt(activity.ActivityDate.slice(6, -2));
                            }
                            const date = new Date(ActivityDate);
                            return { ...activity, ActivityDate: date, comDate: date, comNotes: activity.Notes };
                        });
                        console.log(
                            "sonamJson_Get_CRM_Task_ActivityByTaskId",
                            formattedActivity
                        );

                        setCRMTaskAcivity(
                            formattedActivity.sort((a, b) => a.ActivityDate - b.ActivityDate)
                        );

                        let obj = {
                            ActivityId: 4,
                            ActivityDate: "2023-10-04T16:36:41.000Z",
                            Notes: "Task creation email send to Nabeel User",
                            TaskId: 19101,
                            username: "User",
                        };
                        // setCRMTaskAcivity((el) => [...el, obj]);
                        // setAllTask(json.Table);

                        if (selectedTask.Source === "Portal") {

                            let margeArr = mergeAndSortByDate(portalComments, formattedActivity, "comDate")
                            console.log("GetComments_Json111", margeArr);
                            setPortalComments(margeArr);
                        }

                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_CRM_GetOutlookTask", err);
        }
    };

    // Event handler to handle file selection
    const handleFileSelect = (event) => {

        const files = event.target.files;
        const selectedFilesArray = Array.from(files);
        const filesData = [];
        console.log(files, "filedatafdfdfdfdfdfdfdfdfd");
        selectedFilesArray.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = () => {
                let fileByte = reader.result.split(";")[1].replace("base64,", "");
                const fileData = {
                    FileName: file.name,
                    Base64: fileByte, // Base64 data of the file
                    FileSize: file.size,
                    Preview: reader.result, // Data URL for preview
                    lastModifiedDate: dateAndTime(file.lastModifiedDate),
                };
                filesData.push(fileData);

                UploadAttachment(fileData)
                //  console.log("Attachment list", filesData);
                // Check if this is the last file
                if (index === selectedFilesArray.length - 1) {
                    // Add new files to the uploadedFiles array
                    setSelectedFiles((prevUploadedFiles) => [
                        ...prevUploadedFiles,
                        ...filesData,
                    ]);
                }
            };
            reader.readAsDataURL(file); // Read file as data URL (base64)
        });
    };

    async function UploadAttachment(filedata) {
        // setLoading(true);
        // Your form submission logic, for example, making an API call
        try {

            let o = {};
            o.base64File = filedata.Base64;
            o.FileName = filedata.FileName;
            Cls.SaveTaskAttachments(o, function (sts, data) {
                if (sts && data) {
                    let res = JSON.parse(data);
                    if (res.Status === "Success") {
                        let path = window.atob(res.Message);
                        let fileName = "";
                        if (path) {
                            let index = path.lastIndexOf("\\");
                            fileName = path.slice(index + 1);
                        }


                        let o = { Path: path, FileName: fileName }

                        setAttachmentPath((prevAttachments) => [...prevAttachments, o]);

                    } else {
                        console.log("Failed to save attachment.");
                    }
                } else {
                    console.log("Failed to save attachment.");
                }
            });

        } catch (error) {
            console.log({
                status: false,
                message: "Attachment is Not Uploaded Try again",
                error: error,
            });
        } finally {
            // Reset loading state after submission is complete
        }
    }

    const [attachmentFile, setAttachmentFile] = useState([]);

    function formatDate(inputDate) {
        // Parse the input date string into a Date object
        const date = new Date(inputDate);

        // Get day, month, and year components
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        const year = date.getFullYear().toString();

        // Construct the formatted date string in "dd/mm/yyyy" format
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }
    
    async function Json_Get_CRM_SavedTask_ByTaskId(taskid) {
        setAttachmentFile([]);
        let obj = {};
        obj.TaskId = taskid;
        await Cls.Json_Get_CRM_SavedTask_ByTaskId(obj, function (status, data) {
            if (status && data) {
                let json = JSON.parse(data);
                console.log("Json_Get_CRM_SavedTask_ByTaskId", json);
                let table2 = json.T2;
                // setGetCRMSaved(table2);
                if (table2 && table2.length > 0) {
                    setTxtDescriptin(table2[0].Details);
                    setDetails(table2[0].Details);
                }

                let table6 = json.T6;

                if (table6 && table6.length > 0) {
                    const formattedActivity = table6.map((activity) => {
                        let timestamp;
                        if (activity.Item_Date) {
                            timestamp = parseInt(activity.Item_Date.slice(6, -2));
                        }
                        const date = new Date(timestamp);

                        const formatedate = formatDate(date)
                        // console.log(formatDate(date),"dateformattingdate");
                        return { ...activity, Item_Date: formatedate,Guid:uuidv4().replace(/-/g, '') };
                    });
                    let arr = [];
                    formattedActivity.map(itm=>{
                        if(itm.ItemId) arr.push({[itm.ItemId]:false})
                    });

                    setAttachmentFile(formattedActivity);
                }
            }
        });
    }

    const disableDueDate = (date) => {
        const today = currentDate;
        return date.isSameOrAfter(today, 'day'); // Disable past dates
    };

    function SetFileataByItemId(itemid) {
        try {
            let o = { ItemId: itemid.toString() }
            ClsSms.Json_SearchDocById(o, function (sts, data) {
                if (sts) {
                    if (data) {
                        //let js =JSON.parse(data);

                        console.log("Json_SearchDocById", data)
                        // let o = { Path: item.DestinationPath, FileName: GetFileNamebyPath(item.FileName) };                        
                        // setAttachmentPath((prevAttachments) => [...prevAttachments, o]);
                    }
                }
            })
        } catch (error) {
            console.log("datanot found Json_SearchDocById", error)
        }

    }

    function GetFileNamebyPath(path) {

        let fileName = "";
        if (path) {
            let index = path.lastIndexOf("\\");
            fileName = path.slice(index + 1);
        }
        return fileName;
    }

    function DateFormet(timestamp) {
        const date = new Date(timestamp);
        console.log("date formet1", date);
        return date;
    }

    function startFormattingDate(dt) {
        console.log("kjdhdsjhsdf", dt)
        if (dt) {
            // let fullDate = new Date(parseInt(dt.substr(6)));
            //  let fullDate = new Date(dt);

            let fullDate = new Date(parseInt(dt.substr(6)));
            console.log("date formet111", fullDate);
            return fullDate;
            // return fullDate;

        }
        else {
            return "";
        }

    }




    function Json_GetSections(secid) {
        try {
            let o = {};
            o.ProjectId = secid;
            Cls.Json_GetSections(o, function (sts, data) {
                if (sts && data) {
                    let js = JSON.parse(data);


                    let sectionList = js.Table;
                    if (sectionList.length > 0) {
                        setSectionList(sectionList);
                    }

                    console.log("Json_GetSections", js);
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }


    function Json_GetFolderData(pid) {


        try {
            let o = {};
            o.ProjectId = pid;
            o.SectionId = "-1";//selectedTask.SectionId;
            o.ClientId = "";
            Cls.Json_GetFolderData(o, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    console.log("Json_GetFolderData", js);
                    let clientList = js.Table1;
                    if (clientList.length > 0) {
                        setClientList(clientList);
                    }
                    // let sectionList = js.Table;
                    // if (sectionList.length > 0) {
                    //     setSectionList(sectionList);
                    // }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }



    function Json_GetFolders() {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password
        }

        try {
            Cls.Json_GetFolders(obj, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let tbl = js.Table;
                        console.log("get folder list", tbl);
                        setFolderList(tbl);
                        let res = tbl.filter((f) => f.FolderID === parseInt(localStorage.getItem("ProjectId")));
                        if (res.length > 0) {
                            settxtFolder(res[0].Folder);
                        }

                    }
                }
            });
        } catch (error) {
            console.log({
                status: false,
                message: "Folder is Blank Try again",
                error: error,
            });
        }
    }

    function Json_GetForwardUserList(fid) {
        // setAddUser([])
        try {
            let o = {};
            o.ProjectId = fid;
            o.SectionId = "-1";
            Cls.Json_GetForwardUserList(o, function (sts, data) {
                if (sts && data) {
                    let js = JSON.parse(data);
                    let dt = js.Table;
                    if (dt.length > 0) {
                        let result = dt.filter((el) => {
                            return el.CGroup !== "Yes";
                        });
                        if (result.length > 0) {
                            let res = result.filter((fuser) => fuser.ID === parseInt(localStorage.getItem("UserId")));
                            if (res.length > 0) {
                                setForwardUser(res[0]);
                            }
                            console.log("forwardUserList", res)
                        }

                    }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }


    // const baseUrlPortal = "https://portal.docusoftweb.com/clientservices.asmx/";
    // let ClsPortal = new CommanCLS(baseUrlPortal, agrno, Email, password);
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
                console.log("GetMessageAttachments_Json11", arrayOfObjects);
                if (arrayOfObjects && arrayOfObjects.length > 0) {
                    setPortalDocumentShow(arrayOfObjects);

                }
            }
        });
    }

    const [getVertion, setGetVertion] = React.useState([]);

    function Json_GetVersionByItemId(data) {
        // console.log("selected document data obj111", data)
        try {
            let obj = {};
            obj.itemId = data["Registration No."];
            ClsSms.Json_GetVersionByItemId(obj, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let tbl = js.Table;
                        if (tbl.length > 0) {
                            console.log("Json_GetVersionByItemId", tbl)
                            setGetVertion(tbl)
                        }

                    }

                }

            })
        } catch (error) {
            console.log("Json_GetVersionByItemId error", error)
        }
    }


    useEffect(() => {

        setAttachmentFile([]);

        setNumPriority(selectedTask.Priority);
        //End PortMethods
        Json_GetForwardUserList(selectedTask.FolderID);
        setSelectedFiles([]);
        Json_GetFolders();
        settxtSection(selectedTask.Section);
        setTxtClient(selectedTask.Client);
        setTxtClient(selectedTask.Client)
        GetMessageAttachments_Json(selectedTask.PubMessageId, selectedTask);
        settxtSectionId(selectedTask.SectionId);
        setTxtClientId(selectedTask.ClientNo);
        setNotesMessage("");
        Json_Get_CRM_SavedTask_ByTaskId(selectedTask.ID);

        setCurrentDate(startFormattingDate(selectedTask.Start));

        // setCurrentDate(moment(selectedTask.Start, "DD/MM/YYYY").toDate());

        console.log(docForDetails,"moment122222221", moment(selectedTask.Start, "DD/MM/YYYY").toDate());

        //moment(dateString, "DD/MM/YYYY").toDate();
        setNextDate(DateFormet(selectedTask.EndDateTime));
        setRemiderDate(dayjs(Cls.getCurrentDate()));
        Json_GetFolderData(selectedTask.FolderID ? selectedTask.FolderID : localStorage.getItem("FolderId"));
        setStatus(selectedTask.mstatus);
        // Json_GetTaskAttachmentList();
        setTSubject(selectedTask.Subject)
        Json_GetSections(selectedTask.FolderID)
        // const Json_CRM_GetOutlookTask=async()=>{
        //     let res = await axios.post(`${baseUrl}Json_CRM_GetOutlookTask`,{
        //         Email: "nabs@docusoft.net",
        //         agrno: "0261",
        //         password: "ZG9jdXNvZnQ="
        //     });
        //     console.log("Json_CRM_GetOutlookTask",JSON.parse(res.data.d));
        // }
        // Json_CRM_GetOutlookTask();
        // return ()=>{
        //     console.log("Modal is Closed");
        // }



        if (selectedTask.ID) {
            Json_Get_CRM_Task_ActivityByTaskId(selectedTask.ID);
        }


        setIsVisible(false)

    }, [selectedTask]);




   



    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleCloseModal = () => {
        setOpen(false);
    };

    const [anchorElSelect, setAnchorElSelect] = React.useState(null);
    const openDropdown = Boolean(anchorElSelect);

    const handleClickDroppdown = (event) => {
        setAnchorElSelect(event.currentTarget);
    };
    const handleCloseDropdown = () => {
        setAnchorElSelect(null);
    };

    // dropdown add
    // const [userDropdownanchorEl, setuserDropdownAnchorEl] = React.useState(null);
    // const UserDropdownopen = Boolean(userDropdownanchorEl);
    // const handleUserClick = (event) => {
    //     setuserDropdownAnchorEl(event.currentTarget);
    // };


    // end

    //const [anchorEl, setAnchorEl] = React.useState(null);
    //const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };
    const handleClose = () => {
        // setAnchorEl(null);
        setOpen(false);

    };


    

    const [anchorEl1, setAnchorEl1] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleClick2 = (event, index) => {
        setAnchorEl1(event.currentTarget);
        setSelectedIndex(index); // Remember the index of the clicked menu
    };

    const handleClose2 = () => {
        setAnchorEl1(null);
        setSelectedIndex(null); // Reset the selected index after closing the menu
    };

    const [anchorElStatus, setanchorElStatus] = useState(null);
    const [selectedIndexStatus, setSelectedIndexStatus] = useState(null);

    const handleClickStatus = (event, index) => {
        setanchorElStatus(event.currentTarget);
        setSelectedIndexStatus(index); // Remember the index of the clicked menu
    };


    const handleCloseStatus = (e) => {
        console.log(PortalDocumentShow, "top_status_changed", selectedTask);

        console.log(e.target.innerText);
        setStatus(e.target.innerText);
        setanchorElStatus(null);
        setSelectedIndexStatus(null); // Reset the selected index after closing the menu
        if (e.target.innerText) {
            console.log(e.target.innerText, "innerText");
            if (e.target.innerText == "Completed") {
                Cls.ConfirmMessage1("Are you sure you want to complete task", function (res) {
                    if (res) {
                        const checkbox = document.getElementById('myCheckbox');
                        const notifyAssignees = checkbox ? checkbox.checked : false;
                        console.log(selectedTask,'taskdetailsmodal2 Assignees:', notifyAssignees);
                        if(notifyAssignees==true){
                            Json_SendMail(selectedTask);  //pending by sonam

                        }
                        Json_UpdateTaskField("Status", e.target.innerText, returnMessageStatus(e.target.innerText));
                        if (attachmentFile && attachmentFile.length > 0) {
                            attachmentFile.forEach((item) => {
                                addToWorkTable(item.ItemId, selectedTask);
                            });
                        }
                        if (selectedTask.Source === "Portal") {

                            if (PortalDocumentShow && PortalDocumentShow.length > 0) {
                                PortalDocumentShow.forEach((item) => {
                                    if (item.ItemID) {
                                        addToWorkTable(item.ItemID, selectedTask);
                                    }
                                });
                            }
                        }

                    }

                });

            } else {

                Json_UpdateTaskField("Status", e.target.innerText, returnMessageStatus(e.target.innerText));
            }



        }

    };

    function returnMessageStatus(status) {
        if (status === "Completed") {
            return "Task Completed!";
        } else {
            return `Task status set to ${status}.`;
        }
    }

    const [anchorElProfile, setanchorElProfile] = useState(null);
    const [selectedIndexProfile, setSelectedIndexProfile] = useState(null);

    const handleClickProfile = (event, index) => {
        setanchorElProfile(event.currentTarget);
        setSelectedIndexProfile(index); // Remember the index of the clicked menu
    };

    const handleCloseProfile = (e) => {
        // console.log("folder data",e)
        setanchorElStatus(null);
        setSelectedIndexProfile(null); // Reset the selected index after closing the menu
        setAnchorElFolder(null);

        if (e.FolderID) {
            Json_UpdateTaskField("FolderID", e.FolderID, "Folder updated. Please review Reference and Section");

            setTxtFolderId(e.FolderID);
            settxtFolder(e.Folder);


            Json_GetFolderData(e.FolderID);
            Json_GetSections(e.FolderID);
        }

    };
    function Json_GetItemBase64DataById(item, callBack) {
        try {
            let obj = {};
            obj.ItemId = item["Registration No."]
            const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/"; // base url for api
            //   let dt = new LoginDetails();

            let cls = new CommanCLS(baseUrl, agrno, Email, password);
            cls.Json_GetItemBase64DataById(obj, function (sts, data) {
                if (sts) {
                    if (data !== "No Data Exist") {
                        // console.log("Json_GetItemBase64DataById data", data)
                        return callBack(data);
                    }
                    else {
                        console.log("Document is blank")
                    }

                }

            })
        } catch (error) {
            console.log("Json_GetItemBase64DataById error", error)
        }

    }
    const AddDocuments = () => {
        let filesData = [];
        setSelectedRows([]);
        //setSelectedDocumentFileDMS([]);
        console.log("AddDocuments11", selectedRows);
        selectedRows.forEach((row, index) => {
            Json_GetItemBase64DataById(row, function (base64data) {
                const fileData = {
                    FileName: row.Description + "." + row.Type,
                    Base64: base64data ? base64data : "", // Base64 data of the file
                    FileSize: "",
                    Preview: "", // Data URL for preview
                    DocId: row["Registration No."],
                    Guid: localStorage.getItem("GUID"),
                    FileType: row["Type"].toLowerCase(),
                    Description: row.Description

                };
                filesData.push(fileData);
                console.log(filesData, "getfilesdata");
                //Check if this is the last file
                if (index === selectedRows.length - 1) {
                    // Add new files to the uploadedFiles array
                    setSelectedFiles((prevUploadedFiles) => [
                        ...prevUploadedFiles,
                        ...filesData,
                    ]);

                    setSelectedDocumentFileDMS((prevUploadedFiles) => [
                        ...prevUploadedFiles,
                        ...filesData,
                    ]);
                }
            })


        })
        // setTimeout(() => {
        //     PrepareDocumentsForPublish_Json(filesData, 2)
        // }, 4000);



        setOpenDocumentListDMS(false)

    }

    function Json_CRM_TaskDMSAttachmentInsert(TaskID) {

        const ItemId = selectedDocumentFileDMS.map(obj => obj.DocId).join("|");
        let obj = {
            TaskID: TaskID,
            DMSItems: ItemId,
            Notes: ""
        };
        Cls.Json_CRM_TaskDMSAttachmentInsert(obj, function (sts, data) {
            if (sts && data) {
                console.log('Json_CRM_TaskDMSAttachmentInsert', data);
                setAttachmentPath([]);
                setSelectedFiles([])
            }
        })
    }
    function dateAndTime(dt) {
        // Create a new Date object
        var date = new Date(dt);

        // Extract individual components
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // Month is 0-indexed
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        // Formatting to ensure double digits
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Construct the formatted date and time string
        var formattedDateTime =
            year +
            "/" +
            month +
            "/" +
            day +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;

        //  console.log(formattedDateTime);
        return formattedDateTime;
    }

    // const handleKeyDown = (e) => {
    //   if (e.key === 'Enter') {
    //     addActivitySave();
    //   }
    // };

    const addActivitySave = () => {
        if (notesMessage) {
            Json_AddSupplierActivity(notesMessage, "usr");
        }
        if (selectedFiles.length > 0) {
            Json_CRM_Task_Update();
        }
    };

    const addActivitySaveForPortal = () => {
        if (notesMessage) {
            AddTaskComment_Json(notesMessage)
        }

    };

    useEffect(() => {
        GetComments_Json(selectedEmailForComment.PortalDocId);
        setCopyLink(`https://www.sharedocuments.co.uk/login.aspx?Code=${agrno}&message=${selectedEmailForComment.PortalDocId}`);
    }, [selectedEmailForComment])

    const AddTaskComment_Json = (notesMessage) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageID: selectedEmailForComment.PortalDocId,
            response: notesMessage,
            ConatctEmail: selectedEmailForComment.emailid,
        };

        ClsPortal.AddTaskComment_Json(o, function (sts, data) {
            if (sts) {

                console.log("AddTaskComment_Json", data);
                if (data) {
                    GetComments_Json(selectedEmailForComment.PortalDocId);
                    setNotesMessage("");
                }
                // setTemplateDataMarkup(data)
            }
        })
    }
    const GetComments_Json = (mgsid) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: mgsid,
        };

        ClsPortal.GetComments_Json(o, function (sts, data) {
            if (sts) {
                if (data) {
                    let js = JSON.parse(data);
                    if (data) {
                        const formattedActivity = js.map((activity) => {
                            // let DateOfRemark;
                            // if (activity.DateOfRemark) {
                            //     DateOfRemark = parseInt(activity.DateOfRemark.slice(6, -2));
                            // }
                            // const date = new Date(DateOfRemark);
                            let date = activity.DateOfRemark ? parseInt(activity.DateOfRemark.slice(6, -2)) : activity.DateOfRemark;


                            // let ReadDate;
                            // if (activity.ReadDate) {
                            //     ReadDate = parseInt(activity.ReadDate.slice(6, -2));
                            // }
                            // const ReadDate1 = new Date(ReadDate);
                            return { ...activity, DateOfRemark: date, comDate: date, comNotes: activity.Remark };
                        });
                        console.log("GetComments_Json", formattedActivity);


                        // let arr1 =  formattedActivity.sort((a, b) => a.DateOfRemark - b.DateOfRemark);

                        let margeArr = mergeAndSortByDate(formattedActivity, crmTaskAcivity, "comDate");

                        //console.log("GetComments_Json", margeArr);
                        setPortalComments(margeArr);

                    }
                }

                // setTemplateDataMarkup(data)
            }
        })
    }

    function mergeAndSortByDate(array1, array2, dateField) {
        // Concatenate the two arrays
        if (array1 && array2) {
            var mergedArray = array2.concat(array1);

            // Sort the merged array by date field
            mergedArray.sort(function (a, b) {
                return new Date(a[dateField]) - new Date(b[dateField]);
            });

            return mergedArray;
        }

    }



    const Json_AddSupplierActivity = (mgs, sts) => {
        let obj = {};
        obj.OriginatorNo = selectedTask.ClientNo;
        obj.ActionReminder = "";
        obj.Notes = mgs;
        obj.Status = sts; //selectedTask.Status;
        obj.TaskId = selectedTask.ID;
        obj.TaskName = "";
        obj.ActivityLevelID = "";
        obj.ItemId = "";

        try {
            Cls.Json_AddSupplierActivity(obj, function (sts, data) {
                if (sts && data) {
                    // console.log(data);
                    Json_Get_CRM_Task_ActivityByTaskId(selectedTask.ID);
                    setNotesMessage("");
                }
            });
        } catch (error) {
            console.log({ status: false, messages: "Faild Please Try again" });
        }
    };

    const [notesMessage, setNotesMessage] = useState(null);
    const handleChangeNotes = (e) => {
        setNotesMessage(e.target.value);

    };

    // Function to scroll to the bottom of the message container
    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
                messageContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();

    }, [notesMessage]);

    const handleSuccess = (mgsid) => {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Your task has been created successfully." + mgsid,
        });
    };


    const HandleChangeSubjectDetails = () => {
        Json_UpdateTaskField("Details", txtdescription, "Description Changed")
        setisvisibleSubject(false);
        setIsVisible(false);
    }
    const HandleChangeSubjectSubject = () => {
        Json_UpdateTaskField("Subject", tSubject, "Subject Changed")
        setisvisibleSubject(false);
        setIsVisible(false);

    }

    async function Json_CRM_Task_Update() {

        if (addUser.length > 0) {
            const idsString = addUser.map(obj => obj.ID).join(',');
            const attString = attachmentPath.map((obj) => obj.Path).join("|");

            let obj = {
                AssignedToID: idsString,
                TaskID: selectedTask.ID,
                DMSItems: (selectedDocumentFileDMS && selectedDocumentFileDMS.length > 0) ? selectedDocumentFileDMS.map(obj => obj.DocId).join("|") : "",
                Attachments: attString ? attString : "",
                Notes: "",
                Details: txtdescription,
                ReminderSet: false,
                ReminderDateTime: dayjs(remiderDate).format("YYYY/MM/DD"),
                StartDateTime: dayjs(currentDate).format("YYYY/MM/DD"),
                OwnerID: ownerID ? ownerID : selectedTask.OwnerID,
                AssociateWithID: txtClientId ? txtClientId : selectedTask.ClientNo,
                FolderId: txtFolderId ? txtFolderId : selectedTask.FolderID,
                Subject: tSubject,
                TypeofTaskID: txtSectionId ? txtSectionId : selectedTask.SectionId,
                EndDateTime: dayjs(nextDate).format("YYYY/MM/DD"),
                Status: status,
                Priority: selectedTask.Priority,
                PercentComplete: "1",
                ActivityMsg: "",
                YEDate: "1900/01/01",
                SubDeadline: "1900/01/01",
                DocRecdate: "1900/01/01",
                ElectronicFile: false,
                PaperFile: false,
            };

            console.log("final save data obj", obj);
            Cls.Json_CRM_Task_Update(obj, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    if (js.Status === "success") {
                        setSelectedFiles([]);

                        setMessageId(js.Message);
                        // setLoading(false);
                        setIsApi(!isApi);
                        // Inside your function or event handler where you want to show the success message
                        //  handleSuccess(js.Message);
                        // setOpen(false);
                        toast.success("Updated Task !");
                        //setIsVisible(false); // Toggle visibility
                        setTimeout(() => {
                            // setAttachmentPath([]);
                            Json_Get_CRM_SavedTask_ByTaskId(selectedTask.ID);
                        }, 2000);
                        setIsVisible(false); // Toggle visibility
                        // if (selectedFiles && selectedFiles.length > 0) {
                        //     console.log(selectedFiles,"selectedDocumentFileDMS")
                        //     Json_CRM_TaskDMSAttachmentInsert(js.Message);
                        // }
                        const attString = attachmentPath.map((item) => {
                            let fileName = "";
                            if (item.FileName) {
                                let Typest = item.FileName.lastIndexOf("\\");
                                fileName = item.FileName.slice(Typest + 1);
                            }

                            return fileName;
                        });
                        if (selectedFiles && selectedFiles.length > 0) {
                            let res = selectedFiles.map((e) => e.FileName).join(',');
                            let mgs = `Upload File ${res}`;
                            Json_AddSupplierActivity(mgs, "sys")
                        } else {

                            let mgs = `Upload File ${attString}`;
                            Json_AddSupplierActivity(mgs, "sys")
                        }



                    }
                    else {
                        console.log("Response final", data);
                        toast.error("Task Not Updated Please Try Again");
                    }

                    // setLoading(false);
                }
            });
        }
    }

    function Json_UpdateTaskField(FieldName, FieldValue, mgsd) {
        let o = {
            agrno: agrno,
            strEmail: Email,
            password: password,
            TaskId: selectedTask.ID,
            FieldName: FieldName,
            FieldValue: FieldValue
        }
        let baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
        let Cls = new CommanCLS(baseUrl, agrno, Email, password);
        Cls.Json_UpdateTaskField(o, function (sts, data) {
            if (sts && data) {
                if (data === "Success") {
                    toast.success(mgsd)
                    Json_AddSupplierActivity(mgsd + " by " + forwardUser.ForwardTo, "sys");
                    setIsApi(!isApi);
                }
                console.log("Json_UpdateTaskField", data)
            }
        })
    }



    // sadik js start



    // const handleUserClose = () => {
    //     setuserDropdownAnchorEl(null);
    // };
    // end


    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     // setAnchorEl(null);
    //     setOpen(false)
    // };


    const [documentLis, setOpenDocumentList] = React.useState(false);
    const handleClickOpen = () => {
        setOpenDocumentList(true);
    };
    const handleCloseDocumentList = () => {
        setOpenDocumentList(false);
    };
    // important sadik



    const handleDownloadDoc = (event, objdata) => {
        handleCloseDocument(event, objdata);
        let o = {
            path: window.btoa(objdata.DestinationPath),
        }
        Cls.GetBase64FromFilePath(o, function (sts, data) {
            if (sts && data) {
                let js = JSON.parse(data);
                if (js.Status === "Success") {
                    // var dencodedData = window.atob(Path);
                    // var fileName = dencodedData;
                    let fileName = txtClientId;
                    if (objdata.FileName) {
                        var Typest = objdata.FileName.lastIndexOf("\\");
                        fileName = objdata.FileName.slice(Typest + 1);
                    }

                    // console.log('FileName', fileName);
                    // console.log("jsonObj.Status", js.Message);
                    var a = document.createElement("a"); //Create <a>
                    a.href = "data:" + Cls.FileType(fileName) + ";base64," + js.Message; //Image Base64 Goes here
                    a.download = fileName; //File name Here
                    a.click(); //Downloaded file
                    setOpenDocumentList(false);

                }

            }
        })
    }

    const DeleteTasksAttachment = (objdata) => {

        try {
            Swal.fire({
                // title: "Are you sure you want to delete this item?",
                text: "Are you sure you want to delete this item?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {

                    let fileName = null;
                    if (objdata.FileName) {
                        var Typest = objdata.FileName.lastIndexOf("\\");
                        fileName = objdata.FileName.slice(Typest + 1);
                    }
                    let fname = fileName;
                    let o = {
                        agrno: agrno,
                        EmailId: Email,
                        password: password,
                        fileName: fname,
                        TaskId: selectedTask.ID,
                    }
                    Cls.DeleteTasksAttachment(o, function (sts, data) {
                        if (sts && data) {
                            let js = JSON.parse(data);
                            console.log("DeleteTasksAttachment", data)
                            if (js.Status === "Success") {
                                toast.success("Deleted Attachment");
                                Json_Get_CRM_SavedTask_ByTaskId(selectedTask.ID);
                            }

                        }
                    })

                }
            });
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }



    const handleSearchInputChangeSection = (event) => {
        setSearchSectionQuery(event.target.value);
    };
    const renderTypeCell = (data) => {
        // Define the condition based on which the icon will be rendered
        if (data.value === 'pdf') {
            return <PictureAsPdfIcon></PictureAsPdfIcon>;
        } else if (data.value === 'txt') {

            return <TextSnippetIcon></TextSnippetIcon>;
        }
        // You can add more conditions or return default content if needed
        return data.value;
    };
    const filtereSectionList = sectionList.filter((item) =>
        item.Sec.toLowerCase().includes(searchSectionQuery.toLowerCase())
    );

    const handleSearchInputChangeClient = (event) => {
        setSearchClient1Query(event.target.value);
    };

    const filtereClient = clientList.filter((item) =>
        item.Client.toLowerCase().includes(searchClient1Query.toLowerCase())
    );

    const handleDelete = (e) => {
        //console.info('You clicked the delete icon.');
        let res = selectedFiles.filter((file) => file.FileName !== e.FileName);
        setSelectedFiles(res)
    };


    const [checked, setChecked] = useState(false);
    function addToWorkTable(Itid, e) {
        console.log(e, "addToWorkTable", Itid);
        let obj = { agrno: agrno, Email: Email, password: password, ItemId: Itid, comment: `${e["Forwarded By"]} has completed a task-${e.Subject} . Task ID : ${e.ID}` };
        console.log("addToWorkTable111", obj);
        ClsSms.Json_AddToWork(obj, function (status, data) {
            if (status) {
                if (data) {
                    //let json = JSON.parse(data);
                    console.log("getitemid", data);
                }
            }
        });
    }
    const Json_SendMail = (taskDataCom) => {
        if(taskDataCom.ID){
            if(addUser && addUser.length > 0) {
                addUser.forEach(item => {
                    let obj={};
                    obj.Subject =`Docusoft Task ${txtClient}`;
                    // obj.Body = `Hi ${item?.ForwardTo},"\r\n" ${taskDataCom["Forwarded By"]} has initiated a task relating to ${txtClient} and you have been added as an assignee."\r\n" Task : ${taskDataCom.Subject} "\r\n" Task ID : ${taskDataCom.ID} "\r\n" Start Date : ${taskDataCom.Start} Please click on the following link to upload Open Upload Page <a href="">Launch</a>`;
                    obj.Body = `Hi ${item?.ForwardTo},<br><br>
                    ${taskDataCom["Forwarded By"]} has initiated a task relating to ${txtClient} and you have been added as an assignee.<br><br>
                    Task: ${taskDataCom.Subject}<br>
                    Task ID: ${taskDataCom.ID}<br>
                    Start Date: ${moment(taskDataCom.Start).format("DD/MM/YYYY")}<br><br>
                    Please click on the following link to upload:<br>
                    Open Upload Page <a href="${window.location.protocol+"//"+window.location.hostname+":"+window.location.port}/dashboard/MyTask">Open Task!</a>`;
                    obj.FromMail = Email;
                    obj.ToEmail = item?.UserEmail;
                    obj.strFileName = "";
                    obj.Byte = null;
                    console.log(obj,"sendmail_object data",addUser);
                    Cls.NewSendMail(obj, function (sts, data) {
                        if (sts) {
                            if (data) {
                                console.log(data,"SendMail by sonam");
                            }
                        }
                    });
                });
            }
           
        }
      
    }
    const handleChangeStatus = (event) => {
        console.log("change_statusevent", selectedTask);

        setChecked(event.target.checked);
        if (event.target.checked) {
            Cls.ConfirmMessage1("Are you sure you want to complete task", function (res) {
                if (res) {
                    const checkbox = document.getElementById('myCheckbox');
                        const notifyAssignees = checkbox ? checkbox.checked : false;
                        console.log(selectedTask,'taskdetailsmodal565 Assignees:', notifyAssignees);
                        if(notifyAssignees==true){
                               //pending by sonam
                               Json_SendMail(selectedTask);
                        }
                    Json_UpdateTaskField("Status", "Completed", returnMessageStatus("Completed"));
                    if (attachmentFile && attachmentFile.length > 0) {
                        attachmentFile.forEach((item) => {
                            addToWorkTable(item.ItemId, selectedTask);
                        });
                    }
                    if (selectedTask.Source === "Portal") {
                        if (PortalDocumentShow && PortalDocumentShow.length > 0) {
                            PortalDocumentShow.forEach((item) => {
                                if (item.ItemID) {
                                    addToWorkTable(item.ItemID, selectedTask);
                                }
                            });
                        }
                    }

                    setStatus("Completed");
                }

            });


        }
        else {
            setStatus(selectedTask.mstatus)
        }

    };


    const Json_RegisterItem = (data) => {
        console.log("selectedTask", selectedTask);
        let o = {
            deptId: "0",
            sectionId: txtSectionId ? txtSectionId : selectedTask.SectionId,
            folderId: txtFolderId ? txtFolderId : selectedTask.FolderID,
            categoryId: "0",
            subSectionId: "0",
            retForMonth: "-1",
            deptName: "",
            folderName: txtFolder,
            originatorId: txtClientId ? txtClientId : selectedTask.ClientNo,
            senderId: txtClientId ? txtClientId : selectedTask.ClientNo,
            sectionName: txtSection ? txtSection : selectedTask.Section,
            extDescription: "",//$("#DU_Comment").val(),
            docDirection: "",// docDirection,
            description: tSubject ? tSubject : selectedTask.Subject,//$("#DU_DescriptionText").val(),      
            stickyNote: "",//$("#DU_DescriptionText").val(),
            // fileName: att ? att.replace(/'/g, "") : $("#DU_DescriptionText").val().substring(0, 25) + ".eml", //$("#DU_DescriptionText").val().substring(0, 25) + ".eml",
            fileName: data.Details.PortalName, //$("#DU_DescriptionText").val().substring(0, 25) + ".eml",
            forActionList: "",
            forInformationList: "",
            forGroupList: "",
            uDFList: "",//UDF_array.join(","),
            sUDFList: "",

            clientname: txtClient,

            receiveDate: dayjs(currentDate).format("YYYY/MM/DD"),//receiveDate,

            actionByDate: "",//actionByDate,
            actionDate: "",//actionDate,
            docViewedDate: "", //docViewedDate,

            strb64: data.Base64,
            strtxt64: "",
            EmailMessageId: "",
            priority: "",
        };
        console.log("Json_RegisterItem", o)
        Cls.Json_RegisterItem(o, function (sts, data) {
            if (sts) {
                let js = JSON.parse(data);
                if (js.Status) {
                    toast.success("DocuSofted " + js.ItemId)
                }
                console.log("Json_RegisterItem", js)
            }
        })
    }


    // details dropdown
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState({});
    // const DocumentList = Boolean(anchorElDocumentList);
    const handleClickDocumentList = (event, rowData) => {
        console.log("djfldjdfds",rowData.key);
        event.stopPropagation();
        const newAnchorElDocumentList = { ...anchorElDocumentList };
        newAnchorElDocumentList[rowData.data.Guid] = event.currentTarget;
        setAnchorElDocumentList(newAnchorElDocumentList);
    };

    const handleCloseDocument = (event, rowData) => {
        event.stopPropagation();
        const newAnchorElDocumentList = { ...anchorElDocumentList };
        delete newAnchorElDocumentList[rowData.data.Guid];
        setAnchorElDocumentList(newAnchorElDocumentList);
    };



    // Document details List
    const [openDocumentDetailsList, setOpenDocumentDetailsList] = React.useState(false);
   
    const [docForDetails, setDocForDetails] = useState({});
    const [docDetailsSearchByItemId, setDocDetailsSearchByItemId] = useState([]);
    const [boolVal, setBoolVal] = useState(false);

    const handleClickOpenDocumentDetailsList = (sDoc) => {
        sDoc["PostItemTypeID"] = selectedTask.SectionId;
        setDocForDetails(sDoc);
        setExpanded("panel1");
        setOpenDocumentDetailsList(true);
        Json_getAssociatedTaskListByDocumentId(sDoc);
        Json_GetVersionByItemId(sDoc)

        if (sDoc.ItemId) {
            Json_SearchDocById(sDoc);
            Json_GetAudit(sDoc)
        }
        else{
            setBoolVal(false)
            setGetAudit([]);
            setDocDetailsSearchByItemId([]);
        }

    };
    const handleCloseDocumentDetailsList = () => {
        setOpenDocumentDetailsList(false);
    };
    // sadik code start
    function createData(document, details) {
        return { document, details };
    }

    
    function Json_SearchDocById(doc,index) {
        try {
            let o = {};
            o.ItemId = doc.ItemId;
            ClsSms.Json_SearchDocById(o, function (sts, data) {
                if (sts) {
                    if (data) {
                        setBoolVal(true)
                        let js = JSON.parse(data);
                        let tbl = js[""];
                     
                        setDocDetailsSearchByItemId(tbl[0]);

                        console.log("Json_SearchDocById", tbl.length )


                    }
                }
            })
        } catch (error) {
            console.log("NetWork Error Json_SearchDocById", error)
        }
    }
    const [getAudit, setGetAudit] = useState([]);
    const Json_GetAudit = (sDoc) => {
        console.log("Json_GetAudit", sDoc);
        try {
            let obj = {
                itemid: sDoc["ItemId"],
                password: localStorage.getItem("Password")
            }
            ClsSms.Json_GetAudit(obj, function (sts, data) {
                if (sts && data) {
                    let parse = JSON.parse(data);
                    let table = parse.Table;
                    if (table.length > 0) {
                        // const formattedActivity = table.map((Actioned) => {
                        //     let ActioneddATE;
                        //     if (Actioned["Actioned Date"]) {
                        //         ActioneddATE = moment(Actioned["Actioned Date"]).format("YYYY/MM/DD HH:mm:ss");
                        //     }
                        //     // const date = new Date(ActivityDate);
                        //     return { ...Actioned, ["Actioned Date"]: ActioneddATE };
                        // });

                        const formattedActivity = table.map(itm => {
                            if (itm["Actioned Date"]) {
                                const timeStamp1 = parseInt(itm["Actioned Date"].match(/\d+/)[0]);
                                itm["Actioned Date"] = new Date(timeStamp1);
                            }

                            //const timeStamp2 = parseInt(itm["Start"].match(/\d+/)[0]);
                            //itm["Start"] = new Date(timeStamp2);
                            return itm;
                        })

                        if (formattedActivity.length > 0) {
                            const filteredArray = formattedActivity.filter(item => item.Comments !== null);

                            setGetAudit(filteredArray);
                            console.log("Json_GetAudit", filteredArray)
                        }


                    }
                }
            })
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }

    }

    const call_Json_GetAudit = () => {
        Json_GetAudit(docForDetails);
    }
    const rows = [
        createData('Folder', 'Client'),
        createData('Client', '212121Test'),
        createData('Section', '01. General Correspondence'),
        createData('Received Date', '02/03/2024'),
        createData('Doc. Date', '02/03/2024'),
        createData('Description', 'General Letter'),
        createData('Notes', 'Yes'),
        createData('Category', '1. Received'),
        createData('DocDirection', 'Incoming'),
        createData('ItemId', 998301),
        createData('Tax Year', '18/19'),
        createData('Financial Year', '2020'),
        createData('From Email', 'test@gmail.com'),
        createData('to Email', 'test@gmail.com'),
        createData('CC', 'test@gmail.com')
    ];
    // accordian
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // CRM & Portal Dropdown

    const open4 = Boolean(anchorEl4);
    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };
    const handleClose4 = (e) => {

        setAnchorEl4(null);
        console.log("Priority", e.target.innerText)



        let pri = e.target.innerText;
        let res = pri === "High" ? 1 : pri === "Medium" ? 2 : pri === "Low" ? 3 : null;
        Json_UpdateTaskField("Priority", res, "Priority updated!");

        setNumPriority(res)

    };

    const [anchorElFolder, setAnchorElFolder] = React.useState(null);
    const openFolder = Boolean(anchorElFolder);
    const handleClickFolder = (event) => {
        setAnchorElFolder(event.currentTarget);
    };
    const handleCloseFolder = () => {
        setAnchorElFolder(null);
    };


    const [anchorElFiles, setAnchorElFiles] = React.useState(null);
    const openFiles = Boolean(anchorElFiles);
    const handleClickFiles = (event) => {
        setAnchorElFiles(event.currentTarget);
    };
    const handleCloseFiles = () => {
        setAnchorElFiles(null);
    };

    // 

    // const [anchorElAttached, setAnchorElAttached] = React.useState(null);
    // const openAttached = Boolean(anchorElAttached);
    // const AttachedhandleClick = (event) => {
    //     setAnchorElAttached(event.currentTarget);
    // };
    // const AttachedhandleClose = () => {
    //     setAnchorElAttached(null);
    // };

    const [AttachmentRef, setAttachmentRef] = React.useState(null);
    const [documentListDMS, setOpenDocumentListDMS] = React.useState(false);
    //   const open = Boolean(anchorEl);
    const handleAttachmentClick = (event) => {
        setAttachmentRef(event.currentTarget);
    };
    const handleAttachmentClose = () => {
        setAttachmentRef(null);
    };

    const handleDocumentClickOpen = () => {
        console.log("DocumentClickOpensonam", txtClientId);
        // setAttachmentRef(null);

        if (txtClientId) {

            Json_ExplorerSearchDoc();
            setOpenDocumentListDMS(true);

        } else {
            toast.warn("Select Referece !");
        }
        getButtonColor();
    };

    const handleCloseDocumentListDMS = () => {
        setOpenDocumentListDMS(false);
    };
    const CRM_TaskDeleteByTaskID = (userID,crmtaskID) => {
        let obj = {
          agrno: agrno,
          Email: Email,
          password: password,
          UserID: userID ? userID : "",
          TaskId: crmtaskID ? crmtaskID : ""
        };
        try {
          Cls.CRM_TaskDeleteByTaskID(obj, (sts, data) => {
            if (sts) {
              if (data) {
                console.log("CRM_TaskDeleteByTaskID", data);
                if(data){
                  toast.error(data);
                //   setTimeout(() => {
                    // navigate("/dashboard/Connections");
                    setOpen(false);
                    dispatch(fetchAllTasksRedux("Todo"));
                //   },1500);
                } else {
                  toast.error("Deleting this contact is not allowed because it has attached documents. Please remove the attached documents before proceeding with the deletion.");
                }
                
               
               setAnchorEl(null);
              }
            }
          });
        } catch (err) {
          console.log("Error while calling Json_GetCRMContactUDFValues", err);
        }
      };
    const handleDeleteTask = (selectedTask) => {
        console.log("deletetask",selectedTask);
        Clsprect.ConfirmMessage("Are you sure you want to delete this task ? ", function (res) {
          if (res) {
           CRM_TaskDeleteByTaskID(selectedTask.UserID,selectedTask.ID);
          }
      })
       
      };
    
    const Json_ExplorerSearchDoc = () => {
        console.log(selectedTask, 'Json_ExplorerSearchDoc', txtClientId);
        try {

            if (selectedTask.FolderID && txtClientId) {
                console.log(txtFolderId, 'Json_ExplorerSearchDoctxtClientId', txtClientId);
                let obj = {};
                obj.ProjectId = selectedTask.FolderID;
                obj.ClientId = txtClientId;
                obj.sectionId = "-1";
                Cls.Json_ExplorerSearchDoc(obj, function (sts, data) {
                    if (sts && data) {
                        let json = JSON.parse(data);
                        console.log("ExplorerSearchDoc", json);
                        let tble6 = json.Table6;
                        setDMSDocumentList(tble6);
                    }
                })
            }

        } catch (error) {
            console.log("ExplorerSearchDoc", error)
        }

    }
    const [txtColor, setTxtColor] = useState({ color: "#1976d2" });
    const getButtonColor = () => {
        if (txtClientId) {
            setTxtColor({ color: "#1976d2" }); // Example: Set color to green when conditions met
        } else {
            setTxtColor({ color: "red" }); // Example: Set color to blue when conditions not met
        }
    };

    const Json_getAssociatedTaskListByDocumentId = (sDoc) => {
        console.log("sDoc", sDoc);
        let obj = {
            Email: localStorage.getItem('Email'),
            ItemId: sDoc["ItemId"],
            agrno: localStorage.getItem("agrno"),
            password: localStorage.getItem("Password")
        }
        try {
            ClsSms.Json_getAssociatedTaskListByDocumentId(obj, (sts, data) => {
                const res = JSON.parse(data);
                console.log("Json_getAssociatedTaskListByDocumentId", res);
                if (res.Table.length > 0) {
                    setAssociatedTask(res.Table);
                } else {
                    setAssociatedTask([]);
                }
            })
        } catch (err) {
            console.log("Error while calling Json_getAssociatedTaskListByDocumentId", err);
        }
    }
    console.log(docForDetails,"docfordetailssonam");
    const cellRender = (data)=>{
        console.log(data, "datadms1111111111111")
        let rowdata = data.data;
        let rd = ClsSms.getFileExtension(rowdata.FileName);
        return (
            <Box className="file-uploads">
            <label className="file-uploads-label file-uploads-document" onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                handleCloseDocument(event, data);
            }} onDoubleClick={(event) => {
                // handleClickOpenPDFView(event, data.data);
                handleCloseDocument(event, data);
            }}>
                <Box className="d-flex align-items-center">

                    {/* <Checkbox {...label} onClick={(event)=>event.stopPropagation()} className="hover-checkbox p-0 ms-0" size="small" />  */}

                    {/* <DescriptionIcon
                        sx={{
                            fontSize: 32,
                        }}
                        className='me-2 ms-0'
                    /> */}
                    <div className='img-format'>
                        {/* <img src={Fileformat} /> */}
                        {<GetFileType Type={rd ? rd.toLowerCase() : null}></GetFileType>}
                    </div>
                    <Box className="upload-content pe-3">
                        <Typography variant="h4" >
                            {data.data.FileName ? data.data.FileName : "Demo"}
                        </Typography>
                        <Typography variant="body1">
                            {/* Size:  <span className='sembold'>{data.data["FileSize"] ? data.data["FileSize"] : ""}</span>  */}
                            {/* Date <span className='sembold'>{data.data["Item_Date"] ? data.data["Item_Date"] : ""}</span> | */}
                            Uploaded by <span className='sembold'>{forwardUser.ForwardTo}</span>
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <DocumentTripleDot data={data} handleEdit={()=>{}}/>
                    {/* <Button
                        id={`basic-button-${data.data.Guid}`}
                        aria-controls={anchorElDocumentList[data.data.Guid] ? `basic-menu-${data.data.Guid}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElDocumentList[data.data.Guid])}
                        onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            handleClickDocumentList(event, data)
                        }}
                        className='min-width-auto'
                    >
                        <MoreVertIcon />
                    </Button>
                    <Menu
                        id={`basic-menu-${data.data.Guid}`}
                        anchorEl={anchorElDocumentList[data.data.Guid]}
                        open={Boolean(anchorElDocumentList[data.data.Guid])}
                        onClose={(event) => handleCloseDocument(event, data)}
                        MenuListProps={{
                            'aria-labelledby': `basic-button-${data.data.Guid}`,
                        }}
                        className='custom-dropdown'
                    >
                        
                        <MenuItem onClick={(event) => {
                            handleCloseDocument(event, data);
                            handleClickOpenDocumentDetailsList(data.data);
                        }}>
                            <ListItemIcon>
                                <ArticleIcon fontSize="medium" />
                            </ListItemIcon>
                            Document Details</MenuItem>

                        <MenuItem
                            onClick={(event) =>{
                                event.stopPropagation();
                                event.preventDefault();
                                handleCloseDocument(event, data)
                            }}
                        >
                            <ListItemIcon>
                                <CloudUploadIcon fontSize="medium" />
                            </ListItemIcon>
                            Upload New Version</MenuItem>
                        <MenuItem
                            onClick={(event) => handleCloseDocument(event, data)}
                        >
                            <ListItemIcon>
                                <DriveFileRenameOutlineIcon fontSize="medium" />
                            </ListItemIcon>
                            Rename Document</MenuItem>
                        <MenuItem
                        // onClick={(event) => handleCloseDocumentOpenDocumentBrowers(event, data)}
                        >
                            <ListItemIcon>
                                <TravelExploreIcon fontSize="medium" />
                            </ListItemIcon>
                            Open in Browser</MenuItem>
                        <MenuItem
                            onClick={(event) => handleDownloadDoc(event, data)}
                        >
                            <ListItemIcon>
                                <CloudDownloadIcon fontSize="medium" />
                            </ListItemIcon>
                            Download</MenuItem>
                    </Menu> */}
                </Box>
            </label>
        </Box>
        )
        
    }

    return (
        <React.Fragment>

            <Dialog
                Dialog
                fullScreen={fullScreen}
                open={openModal}
                onClose={handleCloseModal}
                className="custom-modal"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="d-flex align-items-center">
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open4 ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open4 ? 'true' : undefined}
                                onClick={handleClick4}
                                className="min-width-auto"
                            >
                                {NumPriority === 1 && (

                                    <PanoramaFishEyeIcon className="text-red" fontSize="medium" />

                                )}
                                {NumPriority === 2 && (

                                    <RadioButtonUncheckedIcon fontSize="medium" className="text-warning" />

                                )}
                                {NumPriority === 3 && (

                                    <EjectIcon fontSize="medium" className="text-success rotate-180" />

                                )}
                                {/* {NumPriority !== 1 && NumPriority !== 2 && NumPriority !== 3 && (
                                    <CheckCircleIcon />
                                )} */}

                            </Button>
                            {selectedTask && selectedTask.Source === "CRM" && (<>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl4}
                                    open={open4}
                                    onClose={handleClose4}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    className="custom-dropdown"
                                >
                                    <MenuItem onClick={handleClose4} className="text-red pe-4">
                                        <EjectIcon>
                                            <PanoramaFishEyeIcon className="text-red" fontSize="medium" />
                                        </EjectIcon>
                                        High
                                    </MenuItem>

                                    <MenuItem onClick={handleClose4} className="text-warning pe-4">
                                        <ListItemIcon>
                                            <RadioButtonUncheckedIcon fontSize="medium" className="text-warning" />
                                        </ListItemIcon>
                                        Medium
                                    </MenuItem>

                                    <MenuItem onClick={handleClose4} className="text-success pe-4">
                                        <ListItemIcon>
                                            <EjectIcon fontSize="medium" className="text-success rotate-180" />
                                        </ListItemIcon>
                                        Low
                                    </MenuItem>

                                </Menu>
                            </>)}

                        </div>

                        {/* <div>
                            <Button
                                id="basic-button-status"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <CheckCircleIcon />
                                
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button-status',
                                    
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div> */}

                        <Typography
                            variant="subtitle1"
                            className="font-16 sembold mb-0"
                        >
                            {selectedTask && selectedTask.Source}
                        </Typography>
                    </Box>

                    <Box className="d-flex">
                        <Box>
                            <Button
                                id={`fade-button-${selectedTask && selectedTask.ID}`} // Use unique IDs for each button
                                aria-controls={
                                    anchorElStatus
                                        ? `fade-menu-${selectedTask && selectedTask.ID}`
                                        : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={anchorElStatus ? "true" : undefined}
                                onClick={(event) => {
                                    if (selectedTask && selectedTask.ID) {
                                        handleClickStatus(event, selectedTask.ID)
                                    }
                                }
                                } // Pass index to handleClick
                                className="min-width-auto px-0 text-danger"
                            >

                                {status === "Not Started" && (
                                    <>
                                        <ListItemIcon className="min-width-auto  me-2 text-secondary">
                                            <PublishedWithChangesIcon fontSize="medium" />
                                        </ListItemIcon>
                                        <span className="text-secondary">{status}</span>
                                    </>

                                )}
                                {status === "In Progress" && (<>
                                    <ListItemIcon className="min-width-auto  me-2 text-primary">
                                        <PublishedWithChangesIcon fontSize="medium" />
                                    </ListItemIcon>
                                    <span className="text-primary">{status}</span>
                                </>

                                )}
                                {status === "On Hold" && (<>
                                    <ListItemIcon className="min-width-auto  me-2 text-primary">
                                        <PublishedWithChangesIcon fontSize="medium" />
                                    </ListItemIcon>
                                    <span className="text-primary">{status ? status : selectedTask && selectedTask.mstatus}</span>
                                </>

                                )}
                                {status === "Completed" && (<>

                                    <ListItemIcon className="min-width-auto me-2 text-success">
                                        <PublishedWithChangesIcon fontSize="medium" />
                                    </ListItemIcon>
                                    <span className="text-success">{status}</span>
                                </>

                                )}

                                {status === "" && (<>

                                    <ListItemIcon className="min-width-auto me-2">
                                        <PublishedWithChangesIcon fontSize="medium" />
                                    </ListItemIcon>
                                    <span className="text-success">{selectedTask && selectedTask.mstatus}</span>
                                </>

                                )}

                            </Button>
                            <Menu
                                id={`fade-menu-${selectedTask && selectedTask.ID}`} // Use unique IDs for each menu
                                MenuListProps={{
                                    "aria-labelledby": `fade-button-${selectedTask && selectedTask.ID}`,
                                }}
                                anchorEl={anchorElStatus}
                                open={
                                    selectedTask && (selectedIndexStatus === selectedTask.ID &&
                                        Boolean(anchorElStatus))
                                } // Open menu if selectedIndex matches
                                onClose={handleCloseStatus}
                            >

                                {/*  */}
                                <MenuItem onClick={handleCloseStatus} className="text-secondary">
                                    <ListItemIcon>
                                        <DoNotDisturbAltIcon fontSize="medium" className="text-secondary" />
                                    </ListItemIcon>
                                    Not Started
                                </MenuItem>
                                <MenuItem onClick={handleCloseStatus} className="text-primary">
                                    <ListItemIcon>
                                        <PublishedWithChangesIcon fontSize="medium" className="text-primary" />
                                    </ListItemIcon>
                                    In Progress
                                </MenuItem>

                                <MenuItem onClick={handleCloseStatus} className="text-primary">
                                    <ListItemIcon>
                                        <HourglassBottomIcon fontSize="medium" className="text-primary" />
                                    </ListItemIcon>
                                    On Hold
                                </MenuItem>

                                <MenuItem onClick={handleCloseStatus} className="text-success"><ListItemIcon>
                                    <CheckCircleOutlineIcon fontSize="medium" className="text-success" />
                                </ListItemIcon>
                                    Completed
                                </MenuItem>

                                {/* <MenuItem onClick={handleCloseStatus} className="text-warning">
                                            <ListItemIcon>
                                                <ErrorOutlineIcon fontSize="medium" className="text-warning" />
                                            </ListItemIcon>
                                            Deferred</MenuItem>

                                        <MenuItem onClick={handleCloseStatus} className="text-success">
                                            <ListItemIcon>
                                                <CheckCircleOutlineIcon fontSize="medium" className="text-success" />
                                            </ListItemIcon>
                                            Done</MenuItem> */}

                                {/*  */}

                            </Menu>
                        </Box>

                        <div className="ps-2">
                            <Button
                                id={`fade-button-${selectedTask && selectedTask.ID}`} // Use unique IDs for each button
                                aria-controls={
                                    anchorElProfile
                                        ? `fade-menu-${selectedTask && selectedTask.ID}`
                                        : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={anchorElProfile ? "true" : undefined}
                                onClick={(event) => {
                                    if (selectedTask && selectedTask.ID) {
                                        handleClickProfile(event, selectedTask.ID)
                                    }
                                }
                                } // Pass index to handleClick
                                className="min-width-auto px-0 text-gray"
                            >
                                <MoreVertIcon />
                            </Button>
                            <Menu
                                id={`fade-menu-${selectedTask && selectedTask.ID}`} // Use unique IDs for each menu
                                MenuListProps={{
                                    "aria-labelledby": `fade-button-${selectedTask && selectedTask.ID}`,
                                }}
                                anchorEl={anchorElProfile}
                                open={
                                    selectedTask && (selectedIndexProfile === selectedTask.ID &&
                                        Boolean(anchorElProfile))
                                } // Open menu if selectedIndex matches
                                onClose={handleCloseProfile}
                            >

                                {/* only for portal */}
                                {selectedTask && selectedTask.Source === "Portal" && (
                                    <>
                                        <MenuItem className='ps-2' onClick={() => {
                                            setSelectedIndexProfile(null);
                                        }}>
                                            <ListItemIcon >
                                                <ContentCopyIcon fontSize="medium" className="font-20" />
                                            </ListItemIcon>
                                            {<CopyLinkButton copyLink={copyLink}></CopyLinkButton>}
                                        </MenuItem>

                                        <MenuItem className='ps-1'>
                                            <ListItemIcon>
                                                <MergeIcon fontSize="medium" />
                                            </ListItemIcon> Merge</MenuItem>

                                        <MenuItem className='ps-1'>
                                            <ListItemIcon>
                                                <AttachEmailIcon className="font-22" />
                                            </ListItemIcon> Retract Message (s)</MenuItem>

                                        <MenuItem className='ps-1'>
                                            <ListItemIcon>
                                                <DeleteIcon fontSize="medium" />
                                            </ListItemIcon> Delete Message (s)</MenuItem>
                                    </>
                                )}


                                {/* <MenuItem className='ps-2'>
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="medium" />
                                    </ListItemIcon> Delete Message (s)</MenuItem> */}
                                {selectedTask && selectedTask.Source === "CRM" && (<>
                                    <Button
                                        id="basic-button"
                                        aria-controls={openFolder ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openFolder ? 'true' : undefined}
                                        onClick={handleClickFolder}
                                        className="ps-0 w-100 text-left text-start"
                                    >
                                        <MenuItem className='ps-2 w-100'>
                                            <ListItemIcon>
                                                <AttachEmailIcon className="font-22" />
                                            </ListItemIcon>Change Folder</MenuItem>
                                    </Button>
                                    <MenuItem className='ps-2 w-100' onClick={()=>{handleDeleteTask(selectedTask)}}>
                                            <ListItemIcon>
                                            <DeleteIcon fontSize="medium" />
                                            </ListItemIcon>Delete Task</MenuItem>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElFolder}
                                        open={openFolder}
                                        onClose={handleCloseFolder}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >

                                        {folderList ? folderList.map((item) => {
                                            return (<>
                                                <MenuItem onClick={() => handleCloseProfile(item)}>
                                                    <ListItemIcon>
                                                        <FolderIcon fontSize="medium" />
                                                    </ListItemIcon>

                                                    {item.Folder}
                                                </MenuItem>
                                            </>)
                                        }) : ""}


                                    </Menu>
                                </>)}



                            </Menu>
                        </div>

                        <Button onClick={handleClose} autoFocus sx={{ minWidth: 30 }}>
                            <span className="material-symbols-outlined text-black">
                                cancel
                            </span>
                        </Button>
                    </Box>
                </Box>

                <DialogContent>
                    <DialogContentText>

                        <Box className='mb-2'>

                            {/* <FormControlLabel
                                control={<Checkbox checked={checked} onChange={handleChangeStatus} />}
                            /> */}

                            <Box className='d-flex'>
                                <Checkbox
                                    {...label}
                                    icon={<PanoramaFishEyeIcon className={status === "Completed" ? "text-success" : "text-gray"} />}
                                    onChange={handleChangeStatus}
                                    checkedIcon={<CheckCircleIcon className={status === "Completed" ? "text-success" : "text-gray"} />}
                                    className="ps-0"
                                    checked={status === "Completed"}
                                />
                                <input
                                    ariant="h4"
                                    className="input-text-title"
                                    type="text"
                                    onChange={handalChangeSetSubject}
                                    onClick={handalClickEditeSubject}
                                    value={tSubject}
                                    disabled={selectedTask && selectedTask.Source === "Portal"}
                                />
                            </Box>

                            <Box className="mt-2 mb-3">
                                {selectedTask && selectedTask.Source === "CRM" && (<>
                                    <textarea
                                        className="form-control textarea textarea-ony-read resize-none"
                                        placeholder="Description"
                                        value={txtdescription} // Bind the value to the state
                                        onChange={(e) => setTxtDescriptin(e.target.value)} // Handle changes to the textarea
                                        onClick={handalClickEditeDescription}

                                    ></textarea>
                                </>)}


                                {
                                    <PortalMessage selectedTask={selectedTask && selectedTask} Json_RegisterItem={Json_RegisterItem} setPortalComments={setPortalComments} setSelectedEmailForComment={setSelectedEmailForComment}></PortalMessage>
                                }

                            </Box>




                            {isVisible && selectedTask && selectedTask.Source === "CRM" && ( // Show the box if isVisible is true

                                <Box className='mb-3 mt-2'>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="outlined" onClick={toggleVisibilityCancleSubject}>Cancel</Button>
                                        <Button variant="contained" onClick={HandleChangeSubjectDetails}>Save</Button>
                                    </Stack>
                                </Box>
                            )}
                            {isvisibleSubject && selectedTask && selectedTask.Source === "CRM" && ( // Show the box if isVisible is true

                                <Box className='mb-3 mt-2'>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="outlined" onClick={toggleVisibilityCancleSubject}>Cancel</Button>
                                        <Button variant="contained" onClick={HandleChangeSubjectSubject}>Save</Button>
                                    </Stack>
                                </Box>
                            )}

                        </Box>

                        <Box className="d-flex flex-wrap justify-content-between">
                            <Box className="d-flex flex-wrap align-items-center">
                                Client
                                <Button
                                    id="fade-button"
                                    aria-controls={openClient ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openClient ? 'true' : undefined}
                                    onClick={handleClickClick}
                                >
                                    {txtClient ? txtClient : selectedTask && selectedTask.Client}
                                </Button>
                                {selectedTask && selectedTask.Source === "CRM" && (<Menu
                                    id="fade-menu11"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorClsEl}
                                    open={openClient}
                                    onClose={handleCloseClient}
                                    TransitionComponent={Fade}
                                    className="menu-height"
                                >

                                    <TextField
                                        label="Search"
                                        variant="outlined"
                                        // value={searchClient1Query}
                                        // onChange={handleSearchInputChangeClient}
                                        sx={{ width: "100%" }}
                                        size="small"
                                    />

                                    {filtereClient ? filtereClient.map((item, index) => {
                                        if (selectedTask && selectedTask.Source === "Portal") {
                                            return <MenuItem key={index} onClick={() => {
                                                setAnchorClsEl(null);
                                            }}>{item.Client}</MenuItem>
                                        }
                                        else {
                                            return <MenuItem key={index} onClick={() => handleCloseClient(item)}>{item.Client}</MenuItem>
                                        }

                                    }) : ""}
                                </Menu>)}



                                Section
                                <Button
                                    id="fade-button"
                                    aria-controls={openSection ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openSection ? 'true' : undefined}
                                    onClick={handleClickSection}
                                >
                                    {txtSection ? txtSection : selectedTask && selectedTask.Section}
                                </Button>
                                {selectedTask && selectedTask.Source === "CRM" && (<Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorElSec}
                                    open={openSection}
                                    onClose={handleCloseSection}
                                    TransitionComponent={Fade}
                                    className="menu-height"
                                >

                                    <TextField
                                        label="Search"
                                        variant="outlined"
                                        value={searchSectionQuery}
                                        onChange={handleSearchInputChangeSection}
                                        sx={{ width: "100%" }}
                                        size="small"
                                    />

                                    {filtereSectionList ? filtereSectionList.map((item, index) => {
                                        if (selectedTask && selectedTask.Source === "Portal") {
                                            return <MenuItem key={index} onClick={() => {
                                                setAnchorSectionEl(null);
                                            }}>{item.Sec}</MenuItem>
                                        }
                                        else {
                                            return <MenuItem key={index} onClick={() => handleCloseSection(item)}>{item.Sec}</MenuItem>
                                        }

                                    }) : ""}


                                </Menu>)}



                            </Box>

                            {/* <Box className="d-flex align-items-center mb-4 flex-wrap">
                        <Box className="user-img-list me-2">
                            <img src={user} />
                        </Box>
                        <Box className="user-img-list me-2">
                            <p>PJ</p>
                        </Box>
                        <Box className="user-img-list user-total-list me-2">
                            <p>14+</p>
                        </Box>
                    </Box> */}

                            <AssigneeUsers selectedTask={selectedTask && selectedTask} setAddUser={setAddUser} addUser={addUser} setOwnerID={setOwnerID} ownerID={ownerID} Json_UpdateTaskField={Json_UpdateTaskField} ></AssigneeUsers>

                            {/* dropdown end */}
                        </Box>
                        {/*  */}
                        {selectedTask && selectedTask.Source === "CRM" && (<>
                            <Box className='d-flex align-items-center justify-content-between flex-wrap'>
                                <Box className="d-flex mt-0">
                                    <Box className="mb-2 me-1 d-flex">
                                        <label className="font-14 text-black mb-1 me-1">Start Date</label>
                                        <Box className='custom-datepicker'
                                            sx={{
                                                width: '140px',
                                            }}>
                                            <CalendarMonthIcon />
                                            <DatePicker
                                                showIcon
                                                dateFormat="DD/MM/YYYY"
                                                value={currentDate}
                                                onChange={(e) => {
                                                    setCurrentDate(e)
                                                    setNextDate("");
                                                }


                                                } // Handle date changes
                                                timeFormat={false}
                                                isValidDate={disablePastDt}
                                                closeOnSelect={true}
                                                icon="fa fa-calendar"
                                            // sx={{
                                            //     width: '140px'
                                            // }}
                                            />
                                        </Box>
                                    </Box>

                                    <Box className="mb-2 d-flex">
                                        <label className="font-14 text-black mb-1 me-1">
                                            Due By
                                        </label>
                                        <Box className='custom-datepicker'
                                            sx={{
                                                width: '140px',
                                            }}>
                                            <CalendarMonthIcon />
                                            <DatePicker
                                                showIcon
                                                dateFormat="DD/MM/YYYY"
                                                value={nextDate}
                                                onChange={(e) => {
                                                    setNextDate(e);
                                                    let enddatetime = dayjs(e).format("YYYY/MM/DD");
                                                    if (enddatetime) {
                                                        Json_UpdateTaskField("EndDateTime", enddatetime, "Due date updated!")
                                                    }

                                                }} // Handle date changes
                                                timeFormat={false}
                                                isValidDate={disableDueDate}
                                                closeOnSelect={true}
                                                icon="fa fa-calendar"
                                            // sx={{
                                            //     width: '140px'
                                            // }}

                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="d-flex flex-wrap">
                                    <label className='text-decoration-none d-flex pointer'
                                        onClick={handleClickOpen}
                                    ><BallotIcon className='me-1' /> {attachmentFile.length} Documents</label>
                                    {/* <AttachmentView attachmentlist={attachmentFile} setAttOpen={setAttOpen} attOpen={attOpen}></AttachmentView> */}
                                </Box>
                            </Box>
                        </>)}

                        <Box className="pb-0 mb-0">
                            <Box className="main-chatbox">
                                {selectedTask && selectedTask.Source === "Portal" ? (<>
                                    {portalComments
                                        ? portalComments.map((item, index) => {

                                            // console.log("forwardUser22",forwardUser.ForwardTo)
                                            if (item.status === "sys") {
                                                return (
                                                    <>
                                                        <Box
                                                            className="text-center py-2 file-uploaded"
                                                            style={{
                                                                // backgroundColor: "#e5e5e5",
                                                                marginBottom: "0px",
                                                                "border-radius": "3px",
                                                            }}
                                                        >
                                                            <Typography key={index} variant="body1" className="font-14 semibold">
                                                                {item.Notes} {/* Display each note */}
                                                            </Typography>
                                                            <Typography variant="body1" className="font-12">
                                                                {moment(item.ActivityDate).format("DD/MM/YYYY HH:mm:ss")}
                                                            </Typography>
                                                        </Box>
                                                    </>
                                                );
                                            }
                                            else if (item.Type === "response") {
                                                return (
                                                    <>
                                                        <Box
                                                            className="chat-box d-flex align-items-end mb-2 sender"
                                                            justifyContent="flex-end"
                                                        >
                                                            <Box class="chat-message">
                                                                <Box class="inner-chat-message ms-auto">
                                                                    <Typography variant="body1" className="font-14">
                                                                        {item.Remark}
                                                                    </Typography>
                                                                    <Box className="d-flex align-items-center justify-content-end">
                                                                        <Typography variant="body1" className="font-10">
                                                                            {moment(item.DateOfRemark).format("DD/MM/YYYY HH:mm:ss")}
                                                                        </Typography>

                                                                        <Box className="">
                                                                            <Button
                                                                                id={`fade-button-${index}`} // Use unique IDs for each button
                                                                                aria-controls={
                                                                                    anchorEl1
                                                                                        ? `fade-menu-${index}`
                                                                                        : undefined
                                                                                }
                                                                                aria-haspopup="true"
                                                                                aria-expanded={
                                                                                    anchorEl1 ? "true" : undefined
                                                                                }
                                                                                onClick={(event) =>
                                                                                    handleClick2(event, index)
                                                                                } // Pass index to handleClick
                                                                                className="min-width-auto px-0 text-gray"
                                                                            >
                                                                                <MoreVertIcon />
                                                                            </Button>
                                                                            <Menu
                                                                                id={`fade-menu-${index}`} // Use unique IDs for each menu
                                                                                MenuListProps={{
                                                                                    "aria-labelledby": `fade-button-${index}`,
                                                                                }}
                                                                                anchorEl={anchorEl1}
                                                                                open={
                                                                                    selectedIndex === index &&
                                                                                    Boolean(anchorEl1)
                                                                                } // Open menu if selectedIndex matches
                                                                                onClose={handleClose2}
                                                                            >
                                                                                <MenuItem className='ps-1' onClick={handleClose2}>
                                                                                    <ListItemIcon>
                                                                                        <EditIcon fontSize="medium" />
                                                                                    </ListItemIcon> Edit</MenuItem>

                                                                                <MenuItem className='ps-1' onClick={handleClose2}>
                                                                                    <ListItemIcon>
                                                                                        <DeleteIcon fontSize="medium" />
                                                                                    </ListItemIcon> Delete Message</MenuItem>
                                                                            </Menu>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </>
                                                );
                                            }
                                            else {
                                                return (
                                                    <Box
                                                        className="chat-box d-flex align-items-end mb-2 reciever"
                                                        key={index}
                                                    >
                                                        <Box className="client-img me-3 mb-0 ms-0">
                                                            <img src={user} alt="User" />
                                                        </Box>
                                                        <Box className="chat-message me-2">
                                                            <Box className="inner-chat-message me-2">
                                                                <Typography variant="body1" className="font-14">
                                                                    {item.Remark}
                                                                </Typography>
                                                                <Box className="d-flex align-items-center justify-content-end">
                                                                    <Typography variant="body1" className="font-12">
                                                                        {moment(item.DateOfRemark).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </Typography>

                                                                    <Box className="">
                                                                        <Button
                                                                            id={`fade-button-${index}`} // Use unique IDs for each button
                                                                            aria-controls={
                                                                                anchorEl1
                                                                                    ? `fade-menu-${index}`
                                                                                    : undefined
                                                                            }
                                                                            aria-haspopup="true"
                                                                            aria-expanded={
                                                                                anchorEl1 ? "true" : undefined
                                                                            }
                                                                            onClick={(event) =>
                                                                                handleClick2(event, index)
                                                                            } // Pass index to handleClick
                                                                            className="min-width-auto px-0 text-gray"
                                                                        >
                                                                            <MoreVertIcon />
                                                                        </Button>
                                                                        <Menu
                                                                            id={`fade-menu-${index}`} // Use unique IDs for each menu
                                                                            MenuListProps={{
                                                                                "aria-labelledby": `fade-button-${index}`,
                                                                            }}
                                                                            anchorEl={anchorEl1}
                                                                            open={
                                                                                selectedIndex === index &&
                                                                                Boolean(anchorEl1)
                                                                            } // Open menu if selectedIndex matches
                                                                            onClose={handleClose2}
                                                                        >
                                                                            <MenuItem onClick={handleClose2}>
                                                                                <ListItemIcon>
                                                                                    <EditIcon className="font-18" />
                                                                                </ListItemIcon> Edit
                                                                            </MenuItem>
                                                                            <MenuItem onClick={handleClose2}>
                                                                                <ListItemIcon>
                                                                                    <DeleteIcon className="font-18" />
                                                                                </ListItemIcon> Delete
                                                                            </MenuItem>
                                                                        </Menu>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                );

                                            }
                                        })
                                        : null}
                                </>) : (<>
                                    {crmTaskAcivity
                                        ? crmTaskAcivity.map((item, index) => {
                                            const notesArray = item.Notes.split(',');
                                            // console.log("forwardUser22",forwardUser.ForwardTo)
                                            if (item.status === "sys") {
                                                return (
                                                    <>
                                                        <Box
                                                            className="text-center py-2 file-uploaded"
                                                            style={{
                                                                // backgroundColor: "#e5e5e5",
                                                                marginBottom: "0px",
                                                                "border-radius": "3px",
                                                            }}
                                                        >
                                                            {notesArray.map((note, index) => (
                                                                <Typography key={index} variant="body1" className="font-14 semibold">
                                                                    {note.trim()} {/* Display each note */}
                                                                </Typography>
                                                            ))}
                                                            <Typography variant="body1" className="font-12">
                                                                {moment(item.ActivityDate).format("DD/MM/YYYY HH:mm:ss")}
                                                            </Typography>
                                                        </Box>
                                                    </>
                                                );
                                            }
                                            else if (item.username === forwardUser.ForwardTo) {
                                                return (
                                                    <>
                                                        <Box
                                                            className="chat-box d-flex align-items-end mb-2 sender"
                                                            justifyContent="flex-end"
                                                        >
                                                            <Box class="chat-message">
                                                                <Box class="inner-chat-message ms-auto">
                                                                    <Typography variant="body1" className="font-14">
                                                                        {item.Notes}
                                                                    </Typography>
                                                                    <Box className="d-flex align-items-center justify-content-end">
                                                                        <Typography variant="body1" className="font-10">
                                                                            {moment(item.ActivityDate).format("DD/MM/YYYY HH:mm:ss")}
                                                                        </Typography>

                                                                        <Box className="">
                                                                            <Button
                                                                                id={`fade-button-${index}`} // Use unique IDs for each button
                                                                                aria-controls={
                                                                                    anchorEl1
                                                                                        ? `fade-menu-${index}`
                                                                                        : undefined
                                                                                }
                                                                                aria-haspopup="true"
                                                                                aria-expanded={
                                                                                    anchorEl1 ? "true" : undefined
                                                                                }
                                                                                onClick={(event) =>
                                                                                    handleClick2(event, index)
                                                                                } // Pass index to handleClick
                                                                                className="min-width-auto px-0 text-gray"
                                                                            >
                                                                                <MoreVertIcon />
                                                                            </Button>
                                                                            <Menu
                                                                                id={`fade-menu-${index}`} // Use unique IDs for each menu
                                                                                MenuListProps={{
                                                                                    "aria-labelledby": `fade-button-${index}`,
                                                                                }}
                                                                                anchorEl={anchorEl1}
                                                                                open={
                                                                                    selectedIndex === index &&
                                                                                    Boolean(anchorEl1)
                                                                                } // Open menu if selectedIndex matches
                                                                                onClose={handleClose2}
                                                                            >
                                                                                <MenuItem className='ps-1' onClick={handleClose2}>
                                                                                    <ListItemIcon>
                                                                                        <EditIcon fontSize="medium" />
                                                                                    </ListItemIcon> Edit</MenuItem>

                                                                                <MenuItem className='ps-1' onClick={handleClose2}>
                                                                                    <ListItemIcon>
                                                                                        <DeleteIcon fontSize="medium" />
                                                                                    </ListItemIcon> Delete Message</MenuItem>
                                                                            </Menu>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </>
                                                );
                                            }
                                            else {
                                                return (
                                                    <Box
                                                        className="chat-box d-flex align-items-end mb-2 reciever"
                                                        key={index}
                                                    >
                                                        <Box className="client-img me-3 mb-0 ms-0">
                                                            <img src={user} alt="User" />
                                                        </Box>
                                                        <Box className="chat-message me-2">
                                                            <Box className="inner-chat-message me-2">
                                                                <Typography variant="body1" className="font-14">
                                                                    {item.Notes}
                                                                </Typography>
                                                                <Box className="d-flex align-items-center justify-content-end">
                                                                    <Typography variant="body1" className="font-12">
                                                                        {moment(item.ActivityDate).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </Typography>

                                                                    <Box className="">
                                                                        <Button
                                                                            id={`fade-button-${index}`} // Use unique IDs for each button
                                                                            aria-controls={
                                                                                anchorEl1
                                                                                    ? `fade-menu-${index}`
                                                                                    : undefined
                                                                            }
                                                                            aria-haspopup="true"
                                                                            aria-expanded={
                                                                                anchorEl1 ? "true" : undefined
                                                                            }
                                                                            onClick={(event) =>
                                                                                handleClick2(event, index)
                                                                            } // Pass index to handleClick
                                                                            className="min-width-auto px-0 text-gray"
                                                                        >
                                                                            <MoreVertIcon />
                                                                        </Button>
                                                                        <Menu
                                                                            id={`fade-menu-${index}`} // Use unique IDs for each menu
                                                                            MenuListProps={{
                                                                                "aria-labelledby": `fade-button-${index}`,
                                                                            }}
                                                                            anchorEl={anchorEl1}
                                                                            open={
                                                                                selectedIndex === index &&
                                                                                Boolean(anchorEl1)
                                                                            } // Open menu if selectedIndex matches
                                                                            onClose={handleClose2}
                                                                        >
                                                                            <MenuItem onClick={handleClose2}>
                                                                                <ListItemIcon>
                                                                                    <EditIcon className="font-18" />
                                                                                </ListItemIcon> Edit
                                                                            </MenuItem>
                                                                            <MenuItem onClick={handleClose2}>
                                                                                <ListItemIcon>
                                                                                    <DeleteIcon className="font-18" />
                                                                                </ListItemIcon> Delete
                                                                            </MenuItem>
                                                                        </Menu>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                );

                                            }
                                        })
                                        : null}
                                </>)}


                                {/* Reciever Start */}

                                {/* Reciever End */}

                                {/* Sender Start */}

                                {/* Sender End */}

                            </Box>

                            {/* <Box className="text-center py-3 file-uploads">
                                <input
                                    type="file"
                                    id={`file-upload ${selectedTask.ID}`}
                                    multiple
                                    onChange={handleFileSelect}
                                    className="file-input"
                                />

                                <label
                                    className="file-uploads-label"
                                    for={`file-upload ${selectedTask.ID}`}
                                >
                                    <Box className="d-flex align-items-center">
                                        <span className="material-symbols-outlined icon">
                                            cloud_upload
                                        </span>
                                        <Box className="upload-content pe-3">
                                            <Typography variant="h4">
                                                Select a file or drag and drop here
                                            </Typography>
                                            <Typography variant="body1">
                                                JPG, PNG or PDF, file size no more than 10MB
                                            </Typography>
                                        </Box>
                                    </Box>
                                </label>
                            </Box> */}

                            <Box className="d-flex align-items-end main-file-upload  pt-3">
                                <Box className="w-100">
                                    <Stack direction="row" className='pb-2 custom-chips' spacing={1}>
                                        {/* {console.log(selectedFiles, "selectedFiles11")} */}
                                        {
                                            selectedFiles && selectedFiles.slice(0, 3).map((item, index) => (
                                                <Chip key={index} label={item.FileName} variant="outlined" onDelete={() => handleDelete(item)} />
                                            ))
                                        }

                                        {selectedFiles.length > 3 && (<>
                                            <Button
                                                id="basic-button"
                                                aria-controls={openFiles ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openFiles ? 'true' : undefined}
                                                onClick={handleClickFiles}
                                            >

                                                <span>+ {selectedFiles.length - 3}</span>

                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorElFiles}
                                                open={openFiles}
                                                onClose={handleCloseFiles}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                {selectedFiles.length > 3 &&
                                                    selectedFiles.slice(3, selectedFiles.length).map((item, index) => (
                                                        <MenuItem key={index} onClick={handleCloseFiles}>{item.FileName}</MenuItem>
                                                    ))
                                                }
                                            </Menu>
                                        </>)}
                                    </Stack>

                                    <Box className='position-relative'>
                                        {selectedTask && selectedTask.Source === "CRM" && (<>
                                            <Box className='upload-chat-file'>
                                                {/* <input
                                                    type="file"
                                                    id={`file-upload ${selectedTask.ID}`}
                                                    multiple
                                                    onChange={handleFileSelect}
                                                    className="file-input"
                                                />
                                                <label for={`file-upload ${selectedTask.ID}`} className="pointer"><AttachFileIcon /></label> */}

                                                <div>
                                                    <Button
                                                        id="basic-button"
                                                        aria-controls={Boolean(AttachmentRef) ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={Boolean(AttachmentRef) ? 'true' : undefined}
                                                        onClick={handleAttachmentClick}
                                                        className="p-0 min-width-auto"
                                                    >
                                                        <AttachFileIcon />
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id={`file-upload ${selectedTask && selectedTask.ID}`}
                                                        multiple
                                                        onChange={handleFileSelect}
                                                        className="file-input"
                                                        style={{ display: 'none' }} // Hide the input element
                                                    />
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={AttachmentRef}
                                                        open={Boolean(AttachmentRef)}
                                                        onClose={handleAttachmentClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={handleAttachmentClose}>
                                                            <label htmlFor={`file-upload ${selectedTask && selectedTask.ID}`} className="pointer">
                                                                <FileUploadIcon className="font-20 me-1" /> Upload File(s)
                                                            </label>
                                                        </MenuItem>
                                                        <MenuItem onClick={handleDocumentClickOpen}><InsertPageBreakIcon className="font-20 me-1" /> Select From DMS</MenuItem>
                                                    </Menu>
                                                    {/* <Menu
                                                        id="basic-menu"
                                                        anchorEl={AttachmentRef}
                                                        open={Boolean(AttachmentRef)}
                                                        onClose={handleAttachmentClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    > 
                                                     <input
                                                    type="file"
                                                    id={`file-upload ${selectedTask.ID}`}
                                                    multiple
                                                onChange={handleFileSelect}
                                                    className="file-input"
                                                />
                                                        <MenuItem onClick={handleAttachmentClose}>
                                                          
                                                            <label htmlFor={`file-upload ${selectedTask.ID}`}   className="pointer">
                                                                Upload File(s)
                                                            </label>
                                                        </MenuItem>
                                                        
                                                        <MenuItem onClick={handleDocumentClickOpen}>Select From DMS</MenuItem>
                                                    </Menu> */}
                                                </div>
                                            </Box>
                                        </>)}

                                        <textarea
                                            className="textarea"
                                            placeholder="Write message"
                                            value={notesMessage}
                                            onChange={handleChangeNotes}
                                        ></textarea>
                                    </Box>
                                </Box>

                                {selectedTask && selectedTask.Source === "Portal" ? (<Box className="d-flex d-flex align-items-center ms-3">
                                    <Button
                                        className="btn-blue-2 ms-0 mb-2"
                                        size="small"
                                        onClick={addActivitySaveForPortal}
                                        startIcon={<SendIcon />}
                                    >
                                        Send
                                    </Button>
                                    {/* <ToastContainer style={{ zIndex: "9999999" }}></ToastContainer> */}
                                </Box>) : (
                                    <Box className="d-flex d-flex align-items-center ms-3">
                                        <Button
                                            className="btn-blue-2 ms-0 mb-2"
                                            size="small"
                                            onClick={addActivitySave}
                                            startIcon={<SendIcon />}
                                        >
                                            Send
                                        </Button>
                                        {/* <ToastContainer style={{ zIndex: "9999999" }}></ToastContainer> */}
                                    </Box>
                                )}

                            </Box>
                        </Box>
                    </DialogContentText>

                    {/* <hr /> */}

                </DialogContent>
            </Dialog>
            {/* end */}

            {/* // document list modal */}
        
            <Dialog
                open={documentLis}
                onClose={handleCloseDocumentList}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
                sx={{
                    maxWidth: 640,
                    margin: '0 auto'
                }}
            >
                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold mb-0 text-black'>
                            Attachment List
                        </Typography>
                        </Box>
                    <Button onClick={handleCloseDocumentList} autoFocus sx={{ minWidth: 30 }}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                            <Grid item xs={12} md={6}>
                                <Box className="search-box">
                                    {attachmentFile.length > 0 && <DataGrid
                                        dataSource={attachmentFile}
                                        // keyExpr="Guid"
                                        allowColumnReordering={true}
                                        rowAlternationEnabled={true}
                                        showBorders={true}
                                        width="100%"
                                        wordWrapEnabled={true}
                                        className="table-view-files"
                                    >
                                        <Grouping autoExpandAll={false} />
                                        <GroupPanel visible={true} />
                                        <Sorting mode="single" />
                                        <Scrolling mode="virtual" />
                                        <Selection mode="multiple" />
                                        <Column
                                            dataField="Description"
                                            caption="Description"
                                            // Set the groupIndex to 0 to enable grouping by this column
                                            dataType="string"  // Set the data type to "string" for proper grouping
                                            cellRender={cellRender}
                                        />
                                    </DataGrid>}
                                </Box>
                            </Grid>
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>



            {/* document modal list details */}
            <Dialog
                open={openDocumentDetailsList}
                onClose={(event) => handleCloseDocumentDetailsList(event)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
                sx={{
                    maxWidth: 640,
                    margin: '0 auto'
                }}
            >
                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold mb-0 text-black'>
                            Document Details
                        </Typography>
                    </Box>

                    {/*  */}
                    <Button onClick={(event) => handleCloseDocumentDetailsList(event)} autoFocus sx={{ minWidth: 30 }}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>
                <DialogContent>
                    <DialogContentText>

                        <Box className='main-accordian main-accordian-single-row'>
                            <Accordion className='accordian-box' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Document Details
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: '100%' }} aria-label="simple table" size="small">
                                           
                                            {boolVal ? (<>
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell className='bold'>Document</TableCell>
                                                    <TableCell className='bold'>Details</TableCell>
                                                </TableRow>
                                            </TableHead>

                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Registration No</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Registration No."]?docDetailsSearchByItemId["Registration No."]:""}</TableCell>
                                                    </TableRow>
                                                </TableBody>

                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Folder</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Folder"]?docDetailsSearchByItemId["Folder"]:""}</TableCell>
                                                    </TableRow>
                                                </TableBody>

                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Client</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Client"]?docDetailsSearchByItemId["Client"]:""}</TableCell>

                                                    </TableRow>
                                                </TableBody>

                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Section</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Section"]?docDetailsSearchByItemId["Section"]:""}</TableCell>

                                                    </TableRow>
                                                </TableBody>

                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Received Date</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Received Date"]?moment(docDetailsSearchByItemId["Received Date"]).format("DD/MM/YYYY"):""}</TableCell>

                                                    </TableRow>
                                                </TableBody>
                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Item Date</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Item Date"]?moment(docDetailsSearchByItemId["Item Date"]).format("DD/MM/YYYY") :""}</TableCell>

                                                    </TableRow>
                                                </TableBody>
                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>File Size</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["FileSize"]?docDetailsSearchByItemId["FileSize"]:""}</TableCell>

                                                    </TableRow>
                                                </TableBody>
                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Notes</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Notes"]?docDetailsSearchByItemId["Notes"]:""}</TableCell>

                                                    </TableRow>
                                                </TableBody>
                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Category</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Category"]?docDetailsSearchByItemId["Category"]:""}</TableCell>

                                                    </TableRow>
                                                </TableBody>
                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Attachment(s)</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Client"]?docDetailsSearchByItemId["Client"]:""}</TableCell>

                                                    </TableRow>
                                                </TableBody>
                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Type</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Type"]?docDetailsSearchByItemId["Type"]:""}</TableCell>

                                                    </TableRow>
                                                </TableBody>
                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Version</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["Version"]?docDetailsSearchByItemId["Version"]:""}</TableCell>

                                                    </TableRow>
                                                </TableBody>
                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>ReceivedBy</TableCell>
                                                        <TableCell align="left">{docDetailsSearchByItemId && docDetailsSearchByItemId["ReceivedBy"]?docDetailsSearchByItemId["ReceivedBy"]:""}</TableCell>

                                                    </TableRow>
                                                </TableBody>
                                            </>

                                          
                                          ) :
                                            (<>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className='bold'>Document</TableCell>
                                                    <TableCell className='bold'>Details</TableCell>
                                                </TableRow>
                                            </TableHead>

                                                <TableBody>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>AttachId</TableCell>
                                                        <TableCell align="left">{docForDetails && docForDetails["AttachId"]?docForDetails["AttachId"]:""}</TableCell>
                                                    </TableRow>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>Type</TableCell>
                                                        <TableCell align="left">{docForDetails && docForDetails["type"]?docForDetails["type"]:""}</TableCell>
                                                    </TableRow>
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell align="left" className='bold'>File Name</TableCell>
                                                        <TableCell align="left">{docForDetails && docForDetails["FileName"]?docForDetails["FileName"]:""}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </> 
                                            )
                                            }

                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>
                            {docForDetails && docForDetails.type=="DMS" ? (
                            <><Accordion className='accordian-box' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        Document Versions
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box className='table-responsive'>

                                            {getVertion.length > 0 ? getVertion.map((item, index) => {
                                                return <>
                                                    <Box className="file-uploads" key={index}>
                                                        <label className="file-uploads-label file-uploads-document">
                                                            <Box className="d-flex align-items-center">
                                                                <div className='img-format'>
                                                                    <img src={Fileformat} />
                                                                </div>
                                                                <Box className="upload-content pe-3">
                                                                    <Typography variant="h4">
                                                                        Version No {item.VersionNo}
                                                                    </Typography>
                                                                    <Typography variant="body1">
                                                                        {moment(item["VDate"]).format("DD/MM/YYYY HH:mm:ss")} | Updated by {item.UserName.toUpperCase()}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </label>
                                                    </Box>
                                                </>;
                                            }) : ""}

                                        </Box>
                                    </AccordionDetails>
                                </Accordion><Accordion className='accordian-box' expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3-content"
                                            id="panel3-header"
                                        >
                                            Attached To
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='mt-3'>
                                                {associatedTask.length > 0 ? associatedTask.map((itm, i) => {
                                                    return <>
                                                        <Link key={i} href="#" className="text-decoration-none d-inline-flex align-content-center me-3 mb-3 flex"><RadioButtonUncheckedIcon className="me-1" />{itm.Subject}</Link>
                                                    </>;
                                                }) : <Typography>Not Available</Typography>}
                                                {/* {Array(5).fill("").map(() => {
        return <>
            <Link href="#" className="text-decoration-none d-inline-flex align-content-center me-3 mb-3 flex"><RadioButtonUncheckedIcon className="me-1" />Contact agreement</Link>
        </>
    })} */}
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion><Accordion className='accordian-box' expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel4-content"
                                            id="panel4-header"
                                        >
                                            Activity
                                        </AccordionSummary>
                                        <AccordionDetails>

                                            {<Activity getAudit={getAudit} selectedDocument={docForDetails} call_Json_GetAudit={call_Json_GetAudit}></Activity>}


                                            {/* {Array(5).fill("").map(() => {
        return <> */}
                                            {/* <Box className='mb-3'>
                <Typography variant="body1" className="text-black sembold font-16">
                    New version uploaded
                </Typography>

                <Typography variant="body1" className="font-12 sembold text-gray">
                    02:36PM 06/05/2023 | by Me
                </Typography>

            </Box> */}
                                            {/* </>
    })} */}
                                        </AccordionDetails>
                                    </Accordion></>
) : null}
                        </Box>

                    </DialogContentText>
                </DialogContent>

            </Dialog>

            <Dialog
                open={documentListDMS}
                onClose={handleCloseDocumentListDMS}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'

                sx={{
                    maxWidth: 640,
                    margin: '0 auto'
                }}
            >
                {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}

                <Box className="d-flex align-items-center justify-content-between modal-head">

                    <div>
                        <Button
                            id="basic-button"
                        >
                            Document List
                        </Button>
                    </div>

                    <Button onClick={handleCloseDocumentListDMS} autoFocus sx={{ minWidth: 30 }}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <DataGrid
                            dataSource={dmsDocumentList}
                            allowColumnReordering={true}
                            rowAlternationEnabled={true}
                            showBorders={true}
                            width="100%"
                            selectedRowKeys={selectedRows}
                            selection={{ mode: 'multiple' }}
                            onSelectionChanged={handleSelectionChanged} // Handle selection change event
                            className="table-grid"
                        >
                            <FilterRow visible={true} />
                            <SearchPanel visible={true} highlightCaseSensitive={true} />


                            <Column
                                dataField="Type"
                                caption="Type"
                                cellRender={renderTypeCell} // Render cells based on condition
                            />

                            <Column
                                dataField="Description"
                                caption="Description"
                            />
                            <Column
                                dataField="Section"
                                caption="Section"
                            />
                            <Column
                                dataField="Client"
                                caption="Client"
                            />
                            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                            <Paging defaultPageSize={10} />
                        </DataGrid>

                        {/* file upload end */}

                    </DialogContentText>
                </DialogContent>

                <DialogActions className="p-4 pt-3">
                    <Button
                        variant="contained"
                        onClick={AddDocuments}
                        className="btn-blue-2"
                    >
                        {'Add Document'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default TaskDetailModal;
