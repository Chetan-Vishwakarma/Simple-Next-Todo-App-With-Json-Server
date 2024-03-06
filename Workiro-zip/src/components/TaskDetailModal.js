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
import BallotIcon from '@mui/icons-material/Ballot';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DescriptionIcon from '@mui/icons-material/Description';
import SendIcon from '@mui/icons-material/Send';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import user from "../images/user.jpg";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArticleIcon from '@mui/icons-material/Article';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';



// sadik code start
function createData(document, details) {
    return { document, details };
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
// sadik code end


function TaskDetailModal({ isApi, setIsApi, selectedTask, openModal, setOpen }) {
    console.log("TaskDetailModal2222", selectedTask);
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));

    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    let Cls = new CommanCLS(baseUrl, agrno, Email, password);

    /////////////////////////////////////////Task Activity

    const [crmTaskAcivity, setCRMTaskAcivity] = React.useState(null);
    //const [selectedTaskp, setselectedTask] = React.useState(selectedTask);
    /////////////////////////////////////////End Task Activity

    const [messageId, setMessageId] = React.useState("");

    const [addUser, setAddUser] = useState([]);
    const [ownerID, setOwnerID] = React.useState("");
    const [userList, setUserList] = React.useState([]);
    const [filterText, setFilterText] = React.useState("");

    const [currentDate, setCurrentDate] = useState(""); // Initialize with the current date in "dd/mm/yyyy" format
    const [nextDate, setNextDate] = useState("");
    const [remiderDate, setRemiderDate] = useState("");

    const [status, setStatus] = useState("Status");
    const [tSubject, setTSubject] = useState("");

    const messageContainerRef = useRef(null);

    ////////////////////////////////Attachment files
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [attachmentPath, setAttachmentPath] = useState([]);

    const [attOpen, setAttOpen] = React.useState(false);

    ////////////////////////////////End Attachment files

    const [isVisible, setIsVisible] = useState(false); // Initially visible

    const toggleVisibilityCancle = () => {
        setIsVisible(false); // Toggle visibility
    };
    const handalClickEditeSubject = () => {
        setIsVisible(true); // Toggle visibility
    };
    const handalChangeSetSubject = (e) => {
        setTSubject(e.target.value); // Toggle visibility
    };


    const Json_Get_CRM_Task_ActivityByTaskId = (taskid) => {
        console.log("selectedTask333333333", taskid);
        let obj = {};
        obj.TaskID = taskid;
        try {
            Cls.Json_Get_CRM_Task_ActivityByTaskId(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        const formattedActivity = json.Table.map((activity) => {
                            let ActivityDate;
                            if (activity.ActivityDate) {
                                ActivityDate = parseInt(activity.ActivityDate.slice(6, -2));
                            }
                            const date = new Date(ActivityDate);
                            return { ...activity, ActivityDate: date };
                        });
                        console.log(
                            "Json_Get_CRM_Task_ActivityByTaskId",
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
                        setCRMTaskAcivity((el) => [...el, obj]);
                        // setAllTask(json.Table);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_CRM_GetOutlookTask", err);
        }
    };

    async function Json_GetForwardUserList() {
        try {
            let o = {};
            o.ProjectId = folderId;
            o.SectionId = "-1";
            await Cls.Json_GetForwardUserList(o, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    let dt = js.Table;
                    if (dt.length > 0) {
                        let result = dt.filter((el) => {
                            return el.CGroup !== "Yes";
                        });
                        if (result.length > 0) {
                            result.map((el) => {
                                if (el.ID === parseFloat(localStorage.getItem("UserId"))) {
                                    setOwnerID(el.ID);
                                    setAddUser([el]);

                                }
                            });
                        }
                        console.log("Json_GetForwardUserList11333", result);
                        setUserList(result);
                    }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }


    // Filter the userList based on filterText
    const filteredUserList = userList.filter((item) => {
        // Check if item and its properties are defined before accessing them
        //console.log("filterText", filterText);
        if (item && item.ForwardTo) {
            // You can customize the filtering logic here based on your requirements
            return item.ForwardTo.toLowerCase().includes(filterText.toLowerCase());
        } else {
            return false; // Return false if any required property is undefined
        }
    });

    // Event handler to handle file selection
    const handleFileSelect = (event) => {
        const files = event.target.files;
        const selectedFilesArray = Array.from(files);
        const filesData = [];

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
                console.log("Attachment list", filesData);
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

    async function UploadAttachment() {
        // setLoading(true);
        // Your form submission logic, for example, making an API call
        try {
            if (selectedFiles.length > 0) {
                let promises = selectedFiles.map((item) => {
                    return new Promise((resolve, reject) => {
                        let o = {};
                        o.base64File = item.Base64;
                        o.FileName = item.FileName;
                        Cls.SaveTaskAttachments(o, function (sts, data) {
                            if (sts && data) {
                                let res = JSON.parse(data);
                                if (res.Status === "Success") {
                                    let path = window.atob(res.Message);
                                    let index = path.lastIndexOf("\\");
                                    let fileName = path.slice(index + 1);
                                    resolve({ Path: path, FileName: fileName });
                                } else {
                                    reject("Failed to save attachment.");
                                }
                            } else {
                                reject("Failed to save attachment.");
                            }
                        });
                    });
                });

                Promise.all(promises)
                    .then((attachments) => {
                        setAttachmentPath((prevAttachments) => [
                            ...prevAttachments,
                            ...attachments,
                        ]);
                        setTimeout(() => {
                            Json_CRM_Task_Save();
                        }, 2500);
                    })
                    .catch((error) => {
                        console.error("Error while saving attachments:", error);
                    });
            } else {
                Json_CRM_Task_Save();
            }

            console.log("Form submitted successfully");
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
    const [assignUser, setAssignUser] = useState([]);

    async function Json_Get_CRM_SavedTask_ByTaskId(taskid) {
        let obj = {};
        obj.TaskId = taskid;
        await Cls.Json_Get_CRM_SavedTask_ByTaskId(obj, function (status, data) {
            if (status && data) {
                let json = JSON.parse(data);
                console.log("Json_Get_CRM_SavedTask_ByTaskId", json);
                let table2 = json.T2;
                if (table2.length > 0) {
                    let spt = table2[0].AssignedToID.split(",");
                    let pushUser = [];
                    for (let i of spt) {
                        if (i) {
                            for (let j of userList) {
                                if (parseInt(i) === j.ID) {
                                    pushUser.push(j);
                                }
                            }
                        }
                    }
                    //console.log("Json_Get_CRM_SavedTask_ByTaskId22", pushUser);
                    setAddUser(pushUser);
                }

                let table6 = json.T6;
                if (table6.length > 0) {
                    let arrFile = [];
                    for (let item of table6) {
                        arrFile.push(getFilePath(item));
                    }
                    setAttachmentFile(arrFile);
                    setTimeout(() => {
                        console.log("attachmentFile", attachmentFile);
                    }, 3000);
                }
            }
        });
    }

    function getFilePath(dt) {
        const filePath = dt.DestinationPath;
        // Convert Windows file path to URL path
        const urlPath = filePath
            .replace(/\\/g, "/")
            .replace(
                "D:/Plesk/Vhosts/docusoftpractice.com/httpdocs/",
                "https://docusoftpractice.com/"
            );
        console.log("file path", urlPath);
        const fileNameWithExtension = dt.DestinationPath.match(/[^\\]+$/)[0];
        let o = {
            AttachId: dt.AttachId,
            DestinationPath: urlPath,
            fileName: fileNameWithExtension,
            data: selectedTask
        };

        return o;
    }


    function DateFormet(timestamp) {
        const date = new Date(timestamp);
        console.log("date formet1", date);
        return date;
    }

    function startFormattingDate(dt) {
        // let fullDate = new Date(parseInt(dt.substr(6)));
        // console.log("date formet111",fullDate);
        // return fullDate;
    }

    useEffect(() => {
        Json_Get_CRM_SavedTask_ByTaskId(selectedTask.ID);
        setCurrentDate(dayjs(startFormattingDate(selectedTask.CreationDate)));

        setNextDate(dayjs(DateFormet(selectedTask.EndDateTime)));
        setRemiderDate(dayjs(Cls.getCurrentDate()));
        Json_Get_CRM_Task_ActivityByTaskId(selectedTask.ID);
        Json_GetForwardUserList();
        setStatus(selectedTask.Status);

        setTSubject(selectedTask.Subject)
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

    const handleUserClose = () => {
        setuserDropdownAnchorEl(null);
    };
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



    const handalClickAddUser = (e) => {
        // Check if the object 'e' already exists in the array based on its 'id'
        if (!addUser.some((user) => user.ID === e.ID)) {
            // If it doesn't exist, add it to the 'addUser' array
            setAddUser([...addUser, e]);
        }

        // setTimeout(() => {
        //   console.log(addUser);
        // }, 2000);
    };

    const handleRemoveUser = (id) => {
        // Filter out the object with the specified ID
        const updatedUsers = addUser.filter((user) => user.ID !== id);
        setAddUser(updatedUsers);
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
        console.log(e.target.innerText);
        setStatus(e.target.innerText);
        setanchorElStatus(null);
        setSelectedIndexStatus(null); // Reset the selected index after closing the menu
    };

    const [anchorElProfile, setanchorElProfile] = useState(null);
    const [selectedIndexProfile, setSelectedIndexProfile] = useState(null);

    const handleClickProfile = (event, index) => {
        setanchorElProfile(event.currentTarget);
        setSelectedIndexProfile(index); // Remember the index of the clicked menu
    };

    const handleCloseProfile = () => {
        setanchorElStatus(null);
        setSelectedIndexProfile(null); // Reset the selected index after closing the menu
    };

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
        Json_AddSupplierActivity();
    };
    const Json_AddSupplierActivity = () => {
        let obj = {};
        obj.OriginatorNo = selectedTask.ClientNo;
        obj.ActionReminder = "";
        obj.Notes = notesMessage;
        obj.Status = "sys"; //selectedTask.Status;
        obj.TaskId = selectedTask.ID;
        obj.TaskName = "";
        obj.ActivityLevelID = "";
        obj.ItemId = "";

        try {
            Cls.Json_AddSupplierActivity(obj, function (sts, data) {
                if (sts && data) {
                    console.log(data);
                    Json_Get_CRM_Task_ActivityByTaskId(selectedTask.ID);
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


    async function Json_CRM_Task_Save() {
        if (addUser.length > 0) {
            const idsString = addUser.map(obj => obj.ID).join(',');
            const attString = attachmentPath.map((obj) => obj.Path).join(",");

            let obj = {
                AssignedToID: idsString,
                TaskID: selectedTask.ID,
                DMSItems: "",
                Attachments: attString ? attString : "",
                Notes: "",
                Details: "",
                ReminderSet: false,
                ReminderDateTime: dayjs(remiderDate).format("YYYY/MM/DD"),
                StartDateTime: dayjs(currentDate).format("YYYY/MM/DD"),
                OwnerID: "8",
                AssociateWithID: selectedTask.ClientNo,
                FolderId: selectedTask.FolderID,
                Subject: tSubject,
                TypeofTaskID: "3",
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
                        setMessageId(js.Message);
                        // setLoading(false);
                        setIsApi(!isApi);
                        // Inside your function or event handler where you want to show the success message
                        //  handleSuccess(js.Message);
                        // setOpen(false);
                        setIsVisible(false); // Toggle visibility
                    }
                    console.log("Response final", data);
                    // setLoading(false);
                }
            });
        }
    }



    // sadik js start


    // dropdown add
    const [userDropdownanchorEl, setuserDropdownAnchorEl] = React.useState(null);
    const UserDropdownopen = Boolean(userDropdownanchorEl);
    const handleUserClick = (event) => {
        setuserDropdownAnchorEl(event.currentTarget);
    };
    // const handleUserClose = () => {
    //     setuserDropdownAnchorEl(null);
    // };
    // end


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // const handleClose = () => {
    //     // setAnchorEl(null);
    //     setOpen(false)
    // };


    // document details modal
    const [documentLis, setOpenDocumentList] = React.useState(false);
    const handleClickOpen = () => {
        setOpenDocumentList(true);
    };
    const handleCloseDocumentList = () => {
        setOpenDocumentList(false);
    };

    // details dropdown
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState(null);
    const DocumentList = Boolean(anchorElDocumentList);
    const handleClickDocumentList = (event) => {
        setAnchorElDocumentList(event.currentTarget);
    };
    const handleCloseDocument = () => {
        setAnchorElDocumentList(null);
    };


    // Document details List
    const [openDocumentDetailsList, setOpenDocumentDetailsList] = React.useState(false);
    const handleClickOpenDocumentDetailsList = () => {
        setOpenDocumentDetailsList(true);
    };
    const handleCloseDocumentDetailsList = () => {
        setOpenDocumentDetailsList(false);
    };

    // accordian
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // end



    return (
        <React.Fragment>

            <Dialog
                Dialog
                fullScreen={fullScreen}
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="responsive-dialog-title"
                className="custom-modal"
            >
                <DialogContent>
                    <DialogContentText>
                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="d-flex align-items-center">
                                <Box>
                                    <Button
                                        id="fade-button5"
                                        aria-controls={openDropdown ? "fade-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openDropdown ? "true" : undefined}
                                        onClick={handleClickDroppdown}
                                        className="min-width-auto"
                                    >
                                        <CheckCircleIcon />
                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            "aria-labelledby": "fade-button5",
                                        }}
                                        anchorElSelect={anchorElSelect}
                                        open={openDropdown}
                                        onClose={handleCloseDropdown}
                                    >
                                        <MenuItem onClick={handleCloseDropdown}>Profile</MenuItem>
                                        <MenuItem onClick={handleCloseDropdown}>
                                            My account
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseDropdown}>Logout</MenuItem>
                                    </Menu>
                                </Box>

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
                                    Select Type
                                </Typography>
                            </Box>

                            <Box className="d-flex">
                                <Box>
                                    <Button
                                        id={`fade-button-${selectedTask.ID}`} // Use unique IDs for each button
                                        aria-controls={
                                            anchorElStatus
                                                ? `fade-menu-${selectedTask.ID}`
                                                : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={anchorElStatus ? "true" : undefined}
                                        onClick={(event) =>
                                            handleClickStatus(event, selectedTask.ID)
                                        } // Pass index to handleClick
                                        className="min-width-auto px-0 text-danger"
                                    >
                                        <ListItemIcon className="min-width-auto text-danger me-2">
                                            <PublishedWithChangesIcon fontSize="medium" />
                                        </ListItemIcon>
                                        {status}
                                    </Button>
                                    <Menu
                                        id={`fade-menu-${selectedTask.ID}`} // Use unique IDs for each menu
                                        MenuListProps={{
                                            "aria-labelledby": `fade-button-${selectedTask.ID}`,
                                        }}
                                        anchorEl={anchorElStatus}
                                        open={
                                            selectedIndexStatus === selectedTask.ID &&
                                            Boolean(anchorElStatus)
                                        } // Open menu if selectedIndex matches
                                        onClose={handleCloseStatus}
                                    >

                                        {/*  */}
                                        <MenuItem onClick={handleCloseStatus}>
                                            <ListItemIcon>
                                                <DoNotDisturbAltIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Not Started
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseStatus}>
                                            <ListItemIcon>
                                                <PublishedWithChangesIcon fontSize="medium" />
                                            </ListItemIcon>
                                            In Progress
                                        </MenuItem>

                                        <MenuItem onClick={handleCloseStatus}>
                                            <ListItemIcon>
                                                <HourglassBottomIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Waiting on someone else
                                        </MenuItem>

                                        <MenuItem onClick={handleCloseStatus}>
                                            <ListItemIcon>
                                                <ErrorOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Deferred</MenuItem>

                                        <MenuItem onClick={handleCloseStatus}>
                                            <ListItemIcon>
                                                <CheckCircleOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Done</MenuItem>

                                        <MenuItem onClick={handleCloseStatus}><ListItemIcon>
                                            <CheckCircleOutlineIcon fontSize="medium" />
                                        </ListItemIcon>
                                            Complete
                                        </MenuItem>
                                        {/*  */}

                                    </Menu>
                                </Box>

                                <div>
                                    <Button
                                        id={`fade-button-${selectedTask.ID}`} // Use unique IDs for each button
                                        aria-controls={
                                            anchorElProfile
                                                ? `fade-menu-${selectedTask.ID}`
                                                : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={anchorElProfile ? "true" : undefined}
                                        onClick={(event) =>
                                            handleClickProfile(event, selectedTask.ID)
                                        } // Pass index to handleClick
                                        className="min-width-auto px-0 text-gray"
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id={`fade-menu-${selectedTask.ID}`} // Use unique IDs for each menu
                                        MenuListProps={{
                                            "aria-labelledby": `fade-button-${selectedTask.ID}`,
                                        }}
                                        anchorEl={anchorElProfile}
                                        open={
                                            selectedIndexProfile === selectedTask.ID &&
                                            Boolean(anchorElProfile)
                                        } // Open menu if selectedIndex matches
                                        onClose={handleCloseProfile}
                                    >
                                        <MenuItem onClick={handleCloseProfile}>
                                            <ListItemIcon>
                                                <DoNotDisturbAltIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Profile
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseProfile}>
                                            <ListItemIcon>
                                                <PublishedWithChangesIcon fontSize="medium" />
                                            </ListItemIcon>
                                            My account
                                        </MenuItem>
                                    </Menu>
                                </div>

                                <Button onClick={handleClose} autoFocus sx={{ minWidth: 30 }}>
                                    <span className="material-symbols-outlined text-black">
                                        cancel
                                    </span>
                                </Button>
                            </Box>
                        </Box>

                        <hr />

                        <Box className='mb-2'>
                            <input
                                ariant="h4"
                                className="input-text-title"
                                type="text"
                                onChange={handalChangeSetSubject}
                                onClick={handalClickEditeSubject}
                                value={tSubject}
                            />
                            {isVisible && ( // Show the box if isVisible is true
                                <Box className='mb-3 mt-2'>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="outlined" onClick={toggleVisibilityCancle}>Cancel</Button>
                                        <Button variant="contained" onClick={UploadAttachment}>Save</Button>
                                    </Stack>
                                </Box>
                            )}
                        </Box>



                        <Box className="d-flex flex-wrap justify-content-between">
                            <Box className="d-flex flex-wrap align-items-center">
                                <p className="pe-2 me-2 border-end">
                                    <span className="text-black">Client:</span>
                                    {selectedTask.Client}
                                </p>
                                <p>
                                    <span className="text-black">Section:</span>{" "}
                                    {selectedTask.Section}
                                </p>
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

                            <div className="mb-2">
                                <Button
                                    id="basic-button5"
                                    aria-controls={UserDropdownopen ? "basic-menu5" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={UserDropdownopen ? "true" : undefined}
                                    onClick={handleUserClick}
                                    className="p-0 w-auto d-inline-block"
                                >
                                    <Box className="d-flex align-items-center">
                                        {addUser
                                            ? addUser.map((item) => {
                                                const words = item.ForwardTo.split(" ");
                                                // Extract the first letter of each word and concatenate them
                                                let result = "";
                                                for (let i = 0; i < words.length && i < 2; i++) {
                                                    result += words[i].charAt(0);
                                                }

                                                if (item.ID === parseInt(localStorage.getItem("UserId"))) {
                                                    return (
                                                        <>
                                                            <Box
                                                                className="user-img-list ms-2 bg-red"
                                                                title={item.ForwardTo}
                                                                key={item.ID}
                                                            >
                                                                <p>{result}</p>
                                                            </Box>
                                                        </>
                                                    );
                                                } else {
                                                    return (
                                                        <>
                                                            <Box
                                                                className="user-img-list ms-2"
                                                                title={item.ForwardTo}
                                                                key={item.ID}
                                                            >
                                                                <p>{result}</p>
                                                            </Box>
                                                        </>
                                                    );
                                                }
                                            })
                                            : null}

                                        <Box className="d-flex ms-3">
                                            <span class="material-symbols-outlined">person_add</span>
                                        </Box>
                                    </Box>
                                </Button>
                                <Menu
                                    id="basic-menu5"
                                    anchorEl={userDropdownanchorEl}
                                    open={UserDropdownopen}
                                    onClose={handleUserClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button5",
                                    }}
                                    className="user-list-dropdown"
                                >
                                    <Box className="mb-1 mt-3 px-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Type a name or email address"
                                        />
                                    </Box>

                                    <Box className="inner-user-list-dropdown">
                                        <p className="sembold">Assigned</p>

                                        <Box className="box-user-list-dropdown">
                                            {addUser
                                                ? addUser.map((item, ind) => {
                                                    if (item.ID === parseInt(localStorage.getItem("UserId"))) {
                                                        return (
                                                            <React.Fragment key={ind}>
                                                                <button type="button" id={item.ID}>
                                                                    <Box className="user-img-list me-2">
                                                                        <img src={user} alt="User" />
                                                                    </Box>
                                                                    <p>{item.ForwardTo}</p>
                                                                </button>
                                                            </React.Fragment>
                                                        );
                                                    } else {
                                                        return (
                                                            <React.Fragment key={ind}>
                                                                <button type="button" id={item.ID}>
                                                                    <Box className="user-img-list me-2">
                                                                        <img src={user} alt="User" />
                                                                    </Box>
                                                                    <p>{item.ForwardTo}</p>
                                                                    <span
                                                                        className="close"
                                                                        onClick={() => handleRemoveUser(item.ID)}
                                                                        role="button" // Adding role="button" to indicate this element is clickable
                                                                        tabIndex="0" // Adding tabIndex to make the element focusable
                                                                    >
                                                                        <span className="material-symbols-outlined">
                                                                            close
                                                                        </span>
                                                                    </span>
                                                                </button>
                                                            </React.Fragment>
                                                        );
                                                    }
                                                })
                                                : null}
                                        </Box>
                                    </Box>

                                    <Box
                                        className="inner-user-list-dropdown"
                                        style={{ maxHeight: "200px", overflowY: "auto" }}
                                    >
                                        <p className="sembold">My Team</p>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search..."
                                            value={filterText}
                                            onChange={(e) => setFilterText(e.target.value)}
                                        />

                                        <Box className="box-user-list-dropdown">
                                            {

                                                filteredUserList.map((item, ind) => (
                                                    <React.Fragment key={ind}>
                                                        <button
                                                            type="button"
                                                            id={item.ID}
                                                            onClick={() => handalClickAddUser(item)}
                                                        >
                                                            <Box className="user-img-list me-2">
                                                                <img src={user} alt="User" />
                                                            </Box>
                                                            <p>{item.ForwardTo}</p>
                                                            {/* <a href="" className="close">
                                    <span className="material-symbols-outlined">
                                      close
                                    </span>
                                  </a> */}
                                                        </button>
                                                    </React.Fragment>
                                                ))}
                                        </Box>
                                    </Box>
                                </Menu>
                            </div>
                            {/* dropdown end */}
                        </Box>
                        {/*  */}

                        <Box className="d-flex flex-wrap justify-content-between">
                            <Link href="#" className="text-decoration-none d-flex">
                                <Link href="#" className='text-decoration-none d-flex'
                                    onClick={handleClickOpen}
                                ><BallotIcon className='me-1' /> 15 Documents</Link>
                                {/* <AttachmentView attachmentlist={attachmentFile} setAttOpen={setAttOpen} attOpen={attOpen}></AttachmentView> */}
                            </Link>

                            <Box className="d-flex">
                                <Box className="mb-2 border-bottom me-3 width-150">
                                    <label className="font-14 text-black">Start Date</label>
                                    <LocalizationProvider
                                        className="pe-0 sadik"
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker
                                            className="datepicker w-100"
                                            value={currentDate} // Use the value prop to set the current selected date
                                            onChange={(date) => setCurrentDate(date)} // Update the state when the user changes the date
                                            inputFormat="DD/MM/YYYY" // Set the input format to "dd/mm/yyyy"
                                            disablePast={false} // Allow selection of dates before today
                                        />
                                    </LocalizationProvider>
                                </Box>

                                <Box className="border-bottom mb-2 width-150">
                                    <Box className="mb-2 ">
                                        <label className="font-14 semibold text-black">
                                            Due By
                                        </label>
                                        <LocalizationProvider
                                            className="pe-0 sadik"
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DatePicker
                                                className="datepicker w-100"
                                                value={nextDate} // Use the value prop to set the current selected date
                                                onChange={(date) => setNextDate(date)} // Update the state when the user changes the date
                                                inputFormat="DD/MM/YYYY" // Set the input format to "dd/mm/yyyy"
                                                disablePast={false} // Allow selection of dates before today
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box className="mt-2 mb-3">
                            <textarea
                                className="form-control textarea resize-none"
                                placeholder="Description"
                            ></textarea>
                        </Box>

                        <Box className="d-flex mb-3">
                            <Button variant="text" className="btn-blue-2 me-2">
                                Mark complete
                            </Button>
                            <Button variant="text" className="btn-blue-2">
                                Defer
                            </Button>
                        </Box>

                        <Box className="white-box pb-0 mb-0">
                            {crmTaskAcivity
                                ? crmTaskAcivity.map((item, index) => {
                                    if (item.username === "Admin") {
                                        return (
                                            <>
                                                <Box
                                                    className="text-center py-3 file-uploaded"
                                                    style={{
                                                        backgroundColor: "rgb(148 221 255)",
                                                        marginBottom: "10px",
                                                        "border-radius": "8px",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        className="font-16 sembold"
                                                    >
                                                        {item.Notes}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {dateAndTime(item.ActivityDate)}
                                                    </Typography>
                                                </Box>
                                            </>
                                        );
                                    }
                                    else if (item.username === addUser[0].ForwardTo) {
                                        return (
                                            <Box
                                                className="chat-box d-flex align-items-end mb-3 reciever"
                                                key={index}
                                            >
                                                <Box className="client-img me-3 mb-0 ms-0">
                                                    <img src={user} alt="User" />
                                                </Box>
                                                <Box className="chat-message me-2">
                                                    <Box className="inner-chat-message me-2">
                                                        <Typography variant="body1">
                                                            {item.Notes}
                                                        </Typography>
                                                        <Box className="d-flex align-items-center justify-content-end">
                                                            <Typography variant="body1">
                                                                {dateAndTime(item.ActivityDate)}
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
                                                                        Edit
                                                                    </MenuItem>
                                                                    <MenuItem onClick={handleClose2}>
                                                                        Delete
                                                                    </MenuItem>
                                                                </Menu>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        );
                                    }
                                    else {
                                        return (
                                            <>
                                                <Box
                                                    className="chat-box d-flex align-items-end mb-3 sender"
                                                    justifyContent="flex-end"
                                                >
                                                    <Box class="chat-message">
                                                        <Box class="inner-chat-message ms-auto">
                                                            <Typography variant="body1">
                                                                {item.Notes}
                                                            </Typography>
                                                            <Box className="d-flex align-items-center justify-content-end">
                                                                <Typography variant="body1">
                                                                    {dateAndTime(item.ActivityDate)}
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
                                                                            Edit
                                                                        </MenuItem>
                                                                        <MenuItem onClick={handleClose2}>
                                                                            Delete
                                                                        </MenuItem>
                                                                    </Menu>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </>
                                        );
                                    }
                                })
                                : null}

                            {/* Reciever Start */}

                            {/* Reciever End */}

                            {/* Sender Start */}

                            {/* Sender End */}

                            <Box className="text-center py-3 file-uploaded">
                                <input
                                    type="file"
                                    id={`file-upload ${selectedTask.ID}`}
                                    multiple
                                    onChange={handleFileSelect}
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
                                            <Typography variant="h5">
                                                Select a file or drag and drop here
                                            </Typography>
                                        </Box>
                                    </Box>
                                </label>
                            </Box>

                            <Box className="d-flex align-items-center main-file-upload">
                                <Box className="w-100">
                                    {/* <Stack direction="row" className='py-3' spacing={1}>
                                <Chip label="fileName123.Doc" variant="outlined" onDelete={handleDelete} />
                                <Chip label="fileName123.PDF" variant="outlined" onDelete={handleDelete} />
                            </Stack> */}

                                    <textarea
                                        className="textarea"
                                        placeholder="Write message"
                                        value={notesMessage}
                                        onChange={handleChangeNotes}
                                    ></textarea>
                                </Box>

                                <Box className="d-flex d-flex align-items-center ms-3">
                                    <Button
                                        className="btn-blue-2 ms-3"
                                        size="small"
                                        onClick={addActivitySave}
                                        startIcon={<SendIcon />}
                                    >
                                        Send
                                    </Button>

                                </Box>
                            </Box>
                        </Box>
                    </DialogContentText>

                    {/* <hr /> */}

                    <DialogActions className="px-0 w-100">
                        <Box className="d-flex align-items-center justify-content-end w-100">
                            {/* <Box>
    <Button autoFocus className='btn-red me-2' onClick={handleCloseModal}>
        cancel
    </Button>
    <Button className='btn-green' onClick={handleCloseModal} autoFocus>
        Save
    </Button>
</Box> */}
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            {/* end */}



            {/* sadik new modal start  */}
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
                {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="dropdown-box">
                                <Typography variant="h4" className='font-18 bold mb-2 text-black'>
                                    Document List
                                </Typography>
                                {/* <Box className="btn-Select">
                                    <Button className='btn-white'>Action</Button>
                                    <Button className='btn-white'>Ser</Button>
                                    <Button className='btn-white'>Custom</Button>

                                    <hr />

                                    <Button className='btn-blue-2' size="small">Apply Now</Button>
                                </Box> */}
                            </Box>

                            {/*  */}
                            <Button onClick={handleCloseDocumentList} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>

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
                                            thisisTest.pdf
                                        </Typography>
                                        <Typography variant="body1">
                                            Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box>
                                    <Button
                                        id="basic-button"
                                        aria-controls={DocumentList ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={DocumentList ? 'true' : undefined}
                                        onClick={handleClickDocumentList}
                                        className='min-width-auto'
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElDocumentList}
                                        open={DocumentList}
                                        onClose={handleCloseDocument}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={() => {
                                            handleCloseDocument()
                                            handleClickOpenDocumentDetailsList()
                                        }}>
                                            <ListItemIcon>
                                                <ArticleIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Document Details</MenuItem>

                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Upload New Version</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Rename Document</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <TravelExploreIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Open in Browser</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudDownloadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Download</MenuItem>
                                    </Menu>
                                </Box>
                            </label>
                        </Box>
                        {/* file upload end */}

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
                                            file_names_123.pdf
                                        </Typography>
                                        <Typography variant="body1">
                                            Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box>
                                    <Button
                                        id="basic-button"
                                        aria-controls={DocumentList ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={DocumentList ? 'true' : undefined}
                                        onClick={handleClickDocumentList}
                                        className='min-width-auto'
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElDocumentList}
                                        open={DocumentList}
                                        onClose={handleCloseDocument}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={() => {
                                            handleCloseDocument()
                                            handleClickOpenDocumentDetailsList()
                                        }}>
                                            <ListItemIcon>
                                                <ArticleIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Document Details</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Upload New Version</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Rename Document</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <TravelExploreIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Open in Browser</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudDownloadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Download</MenuItem>
                                    </Menu>
                                </Box>
                            </label>
                        </Box>
                        {/* file upload end */}

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
                                            test_three.doc
                                        </Typography>
                                        <Typography variant="body1">
                                            Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box>
                                    <Button
                                        id="basic-button"
                                        aria-controls={DocumentList ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={DocumentList ? 'true' : undefined}
                                        onClick={handleClickDocumentList}
                                        className='min-width-auto'
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElDocumentList}
                                        open={DocumentList}
                                        onClose={handleCloseDocument}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={() => {
                                            handleCloseDocument()
                                            handleClickOpenDocumentDetailsList()
                                        }}>
                                            <ListItemIcon>
                                                <ArticleIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Document Details</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Upload New Version</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Rename Document</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <TravelExploreIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Open in Browser</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudDownloadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Download</MenuItem>
                                    </Menu>
                                </Box>
                            </label>
                        </Box>
                        {/* file upload end */}

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
                                            document_654.pdf
                                        </Typography>
                                        <Typography variant="body1">
                                            Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box>
                                    <Button
                                        id="basic-button"
                                        aria-controls={DocumentList ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={DocumentList ? 'true' : undefined}
                                        onClick={handleClickDocumentList}
                                        className='min-width-auto'
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElDocumentList}
                                        open={DocumentList}
                                        onClose={handleCloseDocument}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={() => {
                                            handleCloseDocument()
                                            handleClickOpenDocumentDetailsList()
                                        }}>
                                            <ListItemIcon>
                                                <ArticleIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Document Details</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Upload New Version</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Rename Document</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <TravelExploreIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Open in Browser</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudDownloadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Download</MenuItem>
                                    </Menu>
                                </Box>
                            </label>
                        </Box>
                        {/* file upload end */}
                    </DialogContentText>
                </DialogContent>
            </Dialog>



            {/* document modal list details */}
            <Dialog
                open={openDocumentDetailsList}
                onClose={handleCloseDocumentDetailsList}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
                sx={{
                    maxWidth: 640,
                    margin: '0 auto'
                }}
            >
                <DialogContent>
                    <DialogContentText>

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="dropdown-box">
                                <Typography variant="h4" className='font-18 bold mb-2 text-black'>
                                    Document Details
                                </Typography>
                            </Box>

                            {/*  */}
                            <Button onClick={handleCloseDocumentList} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>

                        <div>
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
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className='bold'>Document</TableCell>
                                                    <TableCell className='bold' align="right">Details</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="left" className='bold'>{row.document}</TableCell>
                                                        <TableCell align="left">{row.details}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    Document Versions
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box className='table-responsive'>


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
                                                            This File is Test Files.pdf
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            12:36PM 28/12/2023 | File uploaded by Patrick
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </label>
                                        </Box>
                                        {/* file upload end */}

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
                                                            test doc file.doc
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            11:16PM 09/012/2024 | File uploaded by Patrick
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </label>
                                        </Box>
                                        {/* file upload end */}

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
                                                            loremipsomedolorsite.pdf
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            02:36PM 06/05/2023 | File uploaded by Patrick
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </label>
                                        </Box>
                                        {/* file upload end */}

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
                                                            This File is Test Files.pdf
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            02:36PM 06/05/2023 | File uploaded by Patrick
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </label>
                                        </Box>
                                        {/* file upload end */}


                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                        </div>



                    </DialogContentText>
                </DialogContent>

            </Dialog>


        </React.Fragment>
    );
}

export default TaskDetailModal;
