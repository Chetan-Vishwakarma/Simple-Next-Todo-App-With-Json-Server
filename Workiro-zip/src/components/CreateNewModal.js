import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import user from "../images/user.jpg";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DescriptionIcon from '@mui/icons-material/Description';




import Swal from 'sweetalert2';
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    TextField,
} from "@mui/material";

import dayjs from 'dayjs';
////////////////////////////////////////////////////////////////Dxdata Grid
import ODataStore from 'devextreme/data/odata/store';
import DataGrid, {
    Column,
    DataGridTypes,
    Grouping,
    GroupPanel,
    FilterRow,
    Pager,
    Paging,
    SearchPanel,
} from 'devextreme-react/data-grid';


import BookmarkIcon from "@mui/icons-material/Bookmark";

import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import LoginDetails from "../services/Utils";
import CommanCLS from "../services/CommanService";
import { useEffect } from "react";
import { useState } from "react";
import Fade from '@mui/material/Fade';
import HtmlEditorDX from "./HtmlEditor";


// 
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function CreateNewModalTask() {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    //const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/"; // base url for api
    //   let dt = new LoginDetails();

    let cls = new CommanCLS(baseUrl, agrno, Email, password);

    const [filterText, setFilterText] = React.useState("");
    const [userList, setUserList] = React.useState([]);
    const [addUser, setAddUser] = useState([]);


    const [searchQuery, setSearchQuery] = useState("");
    const [anchorel, setAnchorel] = React.useState(null);

    const [ownerID, setOwnerID] = React.useState("");
    const [messageId, setMessageId] = React.useState("");

    const [txtdescription, setTxtDescriptin] = React.useState("");
    const [txtcomment, setTxtComment] = React.useState("");
    ///////////////////////////////////////////client Data
    const [clientList, setClientList] = useState([]);
    const [txtClient, settxtClient] = useState("Select Client");
    const [textClientId, setTextClientId] = useState("");

    const [clientAnchorEl, setClientAnchorEl] = React.useState(null);
    const [selectedClientMenu, setSelectedClientMenu] = useState(null);
    const boolClient = Boolean(clientAnchorEl);
    ////////////////////end client Data
    ////////////////////////////////////////Folder list
    const [folderList, setFolderList] = useState([]);
    const [searchFolderQuery, setSearchFolderQuery] = useState("");
    const [txtFolder, settxtFolder] = useState("Select Folder");
    const [txtFolderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    const [folderAnchorEl, setFolderAnchorEl] = React.useState(null);
    const [selectedFolderMenu, setSelectedFolderMenu] = useState(null);
    const boolFolder = Boolean(folderAnchorEl);

    ////////////////////////////////////////End Folder list

    //////////////////////////////////////////////////Section data
    const [txtSection, settxtSection] = useState("Select Section");
    const [txtSectionId, setTxtSectionId] = useState("");
    const [sectionAnchorEl, setSectionAnchorEl] = React.useState(null);
    const [selectedSectionMenu, setSelectedSectionMenu] = useState(null);
    const [sectionList, setSectionList] = useState([]);
    const boolSection = Boolean(sectionAnchorEl);
    const [searchSectionQuery, setSearchSectionQuery] = useState("");

    /////////////////////////////////////////////////End Section data

    ////////////////////////////////Attachment files
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [attachmentPath, setAttachmentPath] = useState([]);

    ////////////////////////////////End Attachment files

    ///////////////////////////////////////date set
    // State variables to hold current date and next day's date
    // Get the current date in "dd/mm/yyyy" format
    const [currentDate, setCurrentDate] = useState(""); // Initialize with the current date in "dd/mm/yyyy" format
    const [nextDate, setNextDate] = useState("");
    const [remiderDate, setRemiderDate] = useState("");
    const [expireDate, setExpireDate] = useState("");
    ///////////////////////////////////////end date set

    const [loading, setLoading] = useState(false);

    //////////////////////Priority
    const [txtPrioriy, setTxtPriority] = useState("Priority");
    const [txtStatus, setTxtStatus] = useState("Status");
    const [txtPriorityId, setTxtPriorityId] = useState("");

    const [prioriyAnchorEl, setPrioriyAnchorEl] = React.useState(null);
    const [selectedPrioriyMenu, setSelectedPrioriyMenu] = useState(null);
    const boolPriority = Boolean(prioriyAnchorEl);

    const [statusAnchorEl, setStatusAnchorEl] = React.useState(null);
    const [selectedStatusMenu, setSelectedStatusMenu] = useState(null);
    const boolStatus = Boolean(statusAnchorEl);

    //////////////////////End Priority


    const open2 = Boolean(anchorel);
    const handleClick = (event) => {
        //setAnchorel(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorel(null);
    };
    //

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // dropdown add

    //
    const [userDropdownanchorEl, setuserDropdownAnchorEl] = React.useState(null);
    const UserDropdownopen = Boolean(userDropdownanchorEl);
    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleUserClick = (event) => {
        setuserDropdownAnchorEl(event.currentTarget);
    };
    const handleUserClose = () => {
        setuserDropdownAnchorEl(null);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const Select2 = Boolean(anchorEl);

    const handleClick3 = (event, menuType) => {
        console.log(menuType);
        if (menuType === "client") {
            setClientAnchorEl(event.currentTarget); // Set the anchor element for the client menu
            setSelectedClientMenu(menuType); // Set the selected menu type for client
        } else if (menuType === "folder") {
            setFolderAnchorEl(event.currentTarget); // Set the anchor element for the folder menu
            setSelectedFolderMenu(menuType); // Set the selected menu type for folder
        } else if (menuType === "section") {
            setSectionAnchorEl(event.currentTarget); // Set the anchor element for the folder menu
            setSelectedSectionMenu(menuType); // Set the selected menu type for folder
        }
        else if (menuType === "priority") {
            setPrioriyAnchorEl(event.currentTarget); // Set the anchor element for the folder menu
            setSelectedPrioriyMenu(menuType); // Set the selected menu type for folder
        }
        else if (menuType === "status") {
            setStatusAnchorEl(event.currentTarget); // Set the anchor element for the folder menu
            setSelectedStatusMenu(menuType); // Set the selected menu type for folder
        }
    };

    const handleClose3 = (menuType) => {
        if (menuType === "client") {
            setClientAnchorEl(null); // Close the client menu by setting the anchor element to null
        }
        else if (menuType === "folder") {
            setFolderAnchorEl(null); // Close the folder menu by setting the anchor element to null
        }
        else if (menuType === "section") {
            setSectionAnchorEl(null); // Close the folder menu by setting the anchor element to null
        }
        else if (menuType === "priority") {
            setPrioriyAnchorEl(null); // Close the folder menu by setting the anchor element to null
        }

    };

    //   const handleClick3 = (event, menuType) => {
    //     console.log(menuType);
    //     if (menuType === "client") {
    //       setAnchorEl(event.currentTarget); // Set the anchor element for the menu
    //       setSelectedMenu(menuType); // Set the selected menu type
    //     }
    //    else if (menuType === "folder") {
    //         setAnchorEl(event.currentTarget); // Set the anchor element for the menu
    //         setSelectedMenu(menuType); // Set the selected menu type
    //       }
    //     // Add additional conditions for other menu types if needed
    //   };

    //   const handleClose3 = () => {
    //     setAnchorEl(null); // Close the menu by setting the anchor element to null
    //   };



    const userAdd = Boolean(anchorel);

    function Json_GetForwardUserList() {

        try {
            let o = {};
            o.ProjectId = txtFolderId;
            o.SectionId = "-1";
            cls.Json_GetForwardUserList(o, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    let dt = js.Table;
                    if (dt.length > 0) {
                        let result = dt.filter((el) => {
                            return el.CGroup !== "Yes";
                        });
                        if (result.length > 0) {
                            result.map((el) => {
                                if (el.ID == localStorage.getItem("UserId")) {
                                    console.log("Json_GetForwardUserList11", addUser);



                                    setOwnerID(el.ID);
                                    setAddUser([el]);

                                }
                            })
                        }

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
        console.log("filterText", filterText);
        if (item && item.ForwardTo) {
            // You can customize the filtering logic here based on your requirements
            return item.ForwardTo.toLowerCase().includes(filterText.toLowerCase());
        } else {
            return false; // Return false if any required property is undefined
        }
    });

    const handalClickAddUser = (e) => {
        // Check if the object 'e' already exists in the array based on its 'id'
        if (!addUser.some(user => user.ID === e.ID)) {
            // If it doesn't exist, add it to the 'addUser' array
            setAddUser([...addUser, e]);
        }


        setTimeout(() => {
            console.log(addUser);
        }, 2000);
    };


    const handleSaveTask = (e) => {
        console.error("get user list", addUser);
    };

    const kbToMb = (kb) => {
        let t = kb / 2024;

        return t.toFixed(2);
    };

    // Function to handle button click
    const handleClickClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle menu item click
    const handleCloseClient = () => {
        setAnchorEl(null);
    };

    function Json_GetFolderData() {
        console.log("Json_GetFolderData11", txtFolderId);
        try {
            let o = {};
            o.ProjectId = txtFolderId;
            o.SectionId = "-1";
            o.ClientId = "";
            cls.Json_GetFolderData(o, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    console.log("Json_GetFolderData", js);
                    let clientList = js.Table1;
                    if (clientList.length > 0) {
                        setClientList(clientList);
                    }
                    let sectionList = js.Table;
                    if (sectionList.length > 0) {
                        setSectionList(sectionList);
                    }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }

    // Function to handle changes in the search input
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    // Filter the client list based on the search query
    const filteredClientList = clientList.filter((item) =>
        item.Client.toLowerCase().includes(searchQuery.toLowerCase())
    );




    function getCurrentDate() {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and pad with 0 if needed
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0)
        const year = currentDate.getFullYear(); // Get the full year

        // Construct the date string in "dd/mm/yyyy" format
        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    }

    function getNextDate() {
        const currentDate = new Date();
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1); // Increment the day by 1 to get the next day's date

        const day = nextDate.getDate().toString().padStart(2, '0'); // Get the day and pad with 0 if needed
        const month = (nextDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0)
        const year = nextDate.getFullYear(); // Get the full year

        // Construct the date string in "yyyy/mm/dd" format
        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    }



    useEffect(() => {

        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));

        setCurrentDate(dayjs(getCurrentDate()));

        setNextDate(dayjs(getNextDate()));
        setRemiderDate(dayjs(getCurrentDate()));

        Json_GetFolders();
        Json_GetForwardUserList();
        Json_GetFolderData();
        //console.log(nextDate, currentDate)

    }, []);

    //////////////////////Folder Funciton
    const filteredFolderList = folderList.filter((item) =>
        item.Folder.toLowerCase().includes(searchFolderQuery.toLowerCase())
    );

    function Json_GetFolders() {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password
        }
        try {
            cls.Json_GetFolders(obj, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let tbl = js.Table;
                        console.log("get folder list", tbl);
                        setFolderList(tbl);
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

    const handleSearchInputChangeFolder = (event) => {
        setSearchFolderQuery(event.target.value);
    };
    //////////////////////End Folder Funciton

    ////////////////////////Section Function

    const handleSearchInputChangeSection = (event) => {
        setSearchSectionQuery(event.target.value);
    };

    const filtereSectionList = sectionList.filter((item) =>
        item.Sec.toLowerCase().includes(searchSectionQuery.toLowerCase())
    );
    ////////////////////////////// End Section Function
    //////////////////////////////////////Attachment data
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
                    DocId: ""
                };
                filesData.push(fileData);

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

        setLoading(true);
        // Your form submission logic, for example, making an API call
        try {
            if (selectedFiles.length > 0) {
                let promises = selectedFiles.map((item) => {
                    return new Promise((resolve, reject) => {
                        let o = {};
                        o.base64File = item.Base64;
                        o.FileName = item.FileName;
                        cls.SaveTaskAttachments(o, function (sts, data) {
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
                        setAttachmentPath((prevAttachments) => [...prevAttachments, ...attachments]);
                        setTimeout(() => {
                            Json_CRM_Task_Save();
                        }, 2500);

                    })
                    .catch((error) => {
                        console.error("Error while saving attachments:", error);
                    });
            }
            else {
                Json_CRM_Task_Save();
            }

            console.log('Form submitted successfully');
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
    const SETDate = (date) => {
        var d = new Date(date);
        var dd = d.getDate();
        var mm = d.getMonth() + 1;

        var yy = d.getFullYear();
        var DateVal;
        if (dd < "10" || mm < "10") {
            if (dd < "10" && mm < '10') {
                return date = yy + "/0" + mm + "/0" + dd;
            } else if (dd < "10") {
                return date = yy + "/" + mm + "/0" + dd;
            } else if (mm < "10") {
                return date = yy + "/0" + mm + "/" + dd;
            }

        } else {
            return DateVal = yy + "/" + mm + "/" + dd;
        }
    }

    const handleSuccess = (mgsid) => {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your task has been created successfully.' + mgsid,
        });
    };

    async function Json_CRM_Task_Save() {

        if (addUser.length > 0) {
            const idsString = selectedEmailCC.map(obj => obj.ID).join(',');
            const attString = attachmentPath.map(obj => obj.Path).join(',');
            let obj = {
                "ClientIsRecurrence": false,
                "StartDate": dayjs(currentDate).format("YYYY/MM/DD"),
                "ClientEnd": dayjs(nextDate).format("YYYY/MM/DD"),
                "ClientDayNumber": "1",
                "ClientMonth": "1",
                "ClientOccurrenceCount": "1",
                "ClientPeriodicity": "1",

                "ClientRecurrenceRange": "0",
                "ClientRecurrenceType": "0",
                "ClientWeekDays": "1",
                "ClientWeekOfMonth": "1",

                "OwnerID": ownerID,
                "AssignedToID": idsString,

                "AssociateWithID": textClientId,

                "FolderId": txtFolderId,

                "Subject": txtdescription,
                "TypeofTaskID": "3",

                "EndDateTime": dayjs(nextDate).format("YYYY/MM/DD"),
                "StartDateTime": dayjs(currentDate).format("YYYY/MM/DD"),
                "Status": txtStatus,
                "Priority": txtPriorityId,
                "PercentComplete": "1",
                "ReminderSet": false,
                "ReminderDateTime": dayjs(remiderDate).format("YYYY/MM/DD"),
                "TaskNo": "0",
                "Attachments": attString ? attString : "",
                "Details": "",
                "YEDate": "1900/01/01",
                "SubDeadline": "1900/01/01",
                "DocRecdate": "1900/01/01",
                // "YEDate": getCurrentDate(),
                // "SubDeadline": getCurrentDate(),
                // "DocRecdate":getCurrentDate(),

                "ElectronicFile": false,
                "PaperFile": false,
                "Notes": "",
                "TaskSource": "CRM"
            }
            console.log("final save data obj", obj);
            cls.Json_CRM_Task_Save(obj, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    if (js.Status == "success") {
                        setMessageId(js.Message)
                        setLoading(false);
                        // Inside your function or event handler where you want to show the success message
                        handleSuccess(js.Message);
                        setOpen(false);
                    }
                    console.log("Response final", data)
                    // setLoading(false);
                }
            })

        }



    }



    //////////////////////////////////////End Attachment data




    /////////////////////////////Remove Assignee
    const handleRemoveUser = (id) => {
        // Filter out the object with the specified ID
        const updatedUsers = addUser.filter(user => user.ID !== id);
        setAddUser(updatedUsers);
    };
    /////////////////////////////End Remove Assignee
    function rearrangeName(fullName) {
        // Split the full name into an array of words
        const words = fullName.split(' ');

        // Extract the first letter of the first name and capitalize it
        const firstLetterFirstName = words[0].charAt(0).toUpperCase();

        // Extract the first letter of the last name and capitalize it
        const firstLetterLastName = words[words.length - 1].charAt(0).toUpperCase();

        // Concatenate the first letters
        const result = firstLetterFirstName + firstLetterLastName;
        console.log("final save data2222222222", result);
    }

    ////////////////////////////////////DMS Document
    const [documentLisdoc, setOpenDocumentList] = React.useState(false);
    const [dmsDocumentList, setDMSDocumentList] = React.useState([]);
    const [allMode, setAllMode] = useState('allPages');
    const [selectedRows, setSelectedRows] = useState([]);

    const onAllModeChanged = React.useCallback(({ value }) => {
        setAllMode(value);
    }, []);

    const Json_ExplorerSearchDoc = () => {
        try {

            if (txtFolderId && textClientId) {
                let obj = {};
                obj.ProjectId = txtFolderId;
                obj.ClientId = textClientId;
                obj.sectionId = "-1";
                cls.Json_ExplorerSearchDoc(obj, function (sts, data) {
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



    const handleDocumentClickOpen = () => {
        Json_ExplorerSearchDoc();
        setOpenDocumentList(true);
    };
    const handleCloseDocumentList = () => {
        setOpenDocumentList(false);
    };
    const pageSizes = [10, 25, 50, 100];
    // useEffect(()=>{
    //     Json_ExplorerSearchDoc();
    // },[])


    // task dropdown 
    const [anchorElTastkType, setAnchorElTastkType] = React.useState(null);
    const [portalUser, setPortalUser] = React.useState([]);
    const [txtTaskType, settxtTaskType] = React.useState("Task Type");



    const TastkType = Boolean(anchorElTastkType);
    const handleClickTastkType = (event) => {
        setAnchorElTastkType(event.currentTarget);
    };

    const handleCloseTastkType = (e) => {
        setAnchorElTastkType(null);
        settxtTaskType(e.target.textContent);
        // setCreateTaskButton(e.target.textContent)
    };

    ////////////////// Priority
    let priorityarr = [{ id: 1, "name": "High" }, { id: 2, "name": "Normal" }, { id: 3, "name": "Low" }];
    let statusarr = [
        { id: 1, "name": "Not Started" },
        { id: 2, "name": "In Progress" },
        { id: 3, "name": "Waiting on someone else" },
        { id: 4, "name": "Deferred" },
        { id: 5, "name": "Done" },
        { id: 6, "name": "Completed" },
    ];
    //////////////////End Priority

    const handleSelectionChanged = (selectedItems) => {
        setSelectedRows(selectedItems.selectedRowsData);
        // You can perform further actions with the selectedRows array
        console.log(selectedRows); // Log the selected rows data
    };
    const Json_GetClientCardDetails = (cid) => {
        try {
            if (txtFolderId && cid) {
                let obj = {
                    agrno: agrno,
                    Email: Email,
                    password: password,
                    intProjectId: txtFolderId,
                    strOrignatorNumber: cid
                };

                cls.Json_GetClientCardDetails(obj, function (sts, data) {
                    if (sts && data) {
                        let json = JSON.parse(data);
                        let tble6 = json.Table6;

                        if (tble6.length > 0) {
                            let filteredUsers = tble6.filter(el => el["Portal User"] === true && el["Portal User"] !== null);
                            if(filteredUsers.length>0){
                                setPortalUser(filteredUsers.length > 0 ? filteredUsers : null);
                            }
                           
                            console.log("Json_GetClientCardDetails", filteredUsers);
                        } else {
                            setPortalUser(null);
                        }
                    }
                });
            }
        } catch (error) {
            console.log("ExplorerSearchDoc", error);
        }
    };


    const getPortalUser = () => {

        Json_GetClientCardDetails();

    }

    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState([]);

    const handleAutocompleteChange = (event, newValue) => {
        setSelectedEmail(newValue ? newValue : null);
        console.log("handleAutocompleteChange", newValue);
    };

    const [selectedEmailCC, setSelectedEmailCC] = useState(null);
    const handleAutocompleteChangeOnCC = (event, newValue) => {
        setSelectedEmailCC(newValue ? newValue : null);
        console.log("handleAutocompleteChange CC", newValue);
    };

    //const filteredOptions = portalUser ? portalUser.filter(option => option["E-Mail"] !== selectedEmail) : [];

    const AddDocuments = () => {
        let filesData = [];
        selectedRows.forEach((row, index) => {
            const fileData = {
                FileName: row.Path,
                Base64: "", // Base64 data of the file
                FileSize: row.FileSize,
                Preview: "", // Data URL for preview
                DocId: row.ItemId
            };
            filesData.push(fileData);
            // Check if this is the last file
            if (index === selectedRows.length - 1) {
                // Add new files to the uploadedFiles array
                setSelectedFiles((prevUploadedFiles) => [
                    ...prevUploadedFiles,
                    ...filesData,
                ]);
            }

        })

        setOpenDocumentList(false)

    }





    const [editorContent, setEditorContent] = useState('');

    // Handler function to update the editor content
    const handleContentChange = (e) => {
        setEditorContent(e.value);
    };
    //////////////////////////Template Start
    const [txtTemplateId, setTxtTempId] = useState(null);
    const [errorMgs, setErrorMgs] = useState(false);

    const handleSelectionChangedTemp = (selectedItems) => {
        setTxtTempId(selectedItems.selectedRowsData);
        setShowComponent(true);
        // You can perform further actions with the selectedRows array
        console.log("Seleted Template", txtTemplateId); // Log the selected rows data
        if (selectedEmail.length > 0) {
            Json_GetStandardLetterData(selectedItems.selectedRowsData)
        }
        else {
            setErrorMgs(true)
        }

        setTimeout(() => {
            setErrorMgs(false); // Set error message state to false to hide the message
        }, 3000);


    };

    function GetTemplateData(data) {
        try {
            let obj = {};
            obj.agrno = agrno;
            obj.UserEmail = Email;
            obj.password = password;
            obj.strFolderId = data[0].ProjectID;;
            obj.strClientId = textClientId;
            obj.strSectionId = data[0].ItemTypeId;
            obj.strTemplateId = data[0].TemplateID;

            cls.Json_GetTemplateData(obj, function (sts, data) {
                if (sts && data) {
                    console.log("Template Data ", data)
                    Json_GetHtmlFromRtf(data);
                }
            })
        } catch (error) {
            console.log("Error for Tempalte", error)
        }
    }

    const [templateDataMarkup, setTemplateDataMarkup] = useState(null);
    const [showComponent, setShowComponent] = useState(false);


    function Json_GetHtmlFromRtf(rtfdata) {
        try {
            let obj = {};
            obj.strRtf = rtfdata;
            cls.Json_GetHtmlFromRtf(obj, function (sts, data) {
                if (sts && data) {

                    let json = JSON.parse(data);
                    console.log("Template Data html", json);

                    setTemplateDataMarkup(json)
                }
            })
        } catch (error) {
            console.log("Error for Tempalte", error)
        }
    }

    const [smsTemplate, setSMSTemplate] = useState([]);

    const handleClickAddTemplate = (event) => {
        setAnchorElTemp(event.currentTarget);
    }

    const [anchorElTemp, setAnchorElTemp] = React.useState(null);
    const openTemp = Boolean(anchorElTemp);

    const handleCloseTemp = () => {
        setAnchorElTemp(null);
    };

    function GetSMSTemplate() {
        cls.Json_GetWebTemplatesList(function (sts, data) {
            if (sts && data) {
                let json = JSON.parse(data);
                console.log("Json_GetWebTemplatesList", json);
                let tbl = json.Table;
                setSMSTemplate(tbl)

            }
        });
    }





    function Json_GetStandardLetterData(data) {
        try {
            let obj = {};
            obj.agrno = agrno;
            obj.UserEmail = Email;
            obj.password = password;
            obj.strFolderId = data[0].ProjectID;
            obj.strClientId = textClientId;
            obj.strSectionId = data[0].ItemTypeId;
            obj.strTemplateId = data[0].TemplateID;
            obj.ContactEmail = selectedEmail[0]["E-Mail"];
            var urlLetter = "https://docusms.uk/dsdesktopwebservice.asmx/";
            let cls = new CommanCLS(urlLetter, agrno, Email, password);
            cls.Json_GetStandardLetterData(obj, function (sts, data) {
                if (sts && data) {
                    console.log("Json_GetStandardLetterData", data)
                    Json_GetHtmlFromRtf(data);
                }
            })
        } catch (error) {
            console.log("Error for Tempalte", error)
        }
    }

    useEffect(() => {
        GetSMSTemplate();
    }, [setTxtTempId])

    const [textSubject,setTextSubject]=useState("Subject");

    async function CreatePortalTask() {

        if (addUser.length > 0) {
            const ccEmail = selectedEmailCC.map(obj => obj["E-Mail"]).join(',');
            const ToEmail = selectedEmail.map(obj => obj["E-Mail"]).join(',');
            const ItemId = selectedRows.map(obj => obj["ItemId"]).join(',');
            
            let obj = {
                "senderID": textClientId,
                "sectionID":txtSectionId,
                "ccode":textClientId,
                "recipients": ToEmail,
                "ccs": ccEmail,
                "subject": textSubject,
                "forApproval": isCheckedForApproval,
                "highImportance":"" ,
                "expiryDate":expireDate ,
                "actionDate": currentDate,
                "trackIt": false,
                "docTemplateTaskId":0,
                "docTemplateId":txtTemplateId[0]["TemplateID"],
                "filenames":"" ,
                "attachments": "",
                "itemNos": ItemId,
                "noMessage": isCheckedWithOutmgs,
                "message": "",
                "docuBoxMessage": false,
                "docuBoxEmails": "",
                "daysToDelete": "",
                "approvalResponse": "",

               
            }
            console.log("final save data obj", obj);
            cls.Json_CRM_Task_Save(obj, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    if (js.Status == "success") {
                        setMessageId(js.Message)
                        setLoading(false);
                        // Inside your function or event handler where you want to show the success message
                        handleSuccess(js.Message);
                        setOpen(false);
                    }
                    console.log("Response final", data)
                    // setLoading(false);
                }
            })

        }



    }


    const [isCheckedForApproval, setIsCheckedForApproval] = useState(false);

    const handleCheckboxChangeForAppoval = (event) => {
        setIsCheckedForApproval(event.target.checked);
    };
    
    const [isCheckedWithOutmgs, setisCheckedWithOutmgs] = useState(false);

    const handleCheckboxChangeisCheckedWithOutmgs = (event) => {
        setisCheckedWithOutmgs(event.target.checked);
    };

    return (
        <React.Fragment>
            <Button
                className="btn-blue btn-round btn-block"
                onClick={handleClickOpen}
            >
                <span className="material-symbols-outlined">edit_square</span>{" "}
                <span className="ps-2 create-text">Create New</span>
            </Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className="custom-modal"
                maxWidth="xl" // Set maxWidth to control the width
                fullWidth={true} // Ensure the dialog takes up the full width
            >
                <DialogContent>
                    <DialogContentText>
                        <Box className="d-flex align-items-center justify-content-between">

                            <div>
                                <Button
                                    id="basic-button"
                                    aria-controls={TastkType ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={TastkType ? 'true' : undefined}
                                    onClick={handleClickTastkType}
                                    className="btn-select"
                                >
                                    {txtTaskType}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorElTastkType}
                                    open={TastkType}
                                    onClose={handleCloseTastkType}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    className="dropdown-box"
                                >
                                    <MenuItem onClick={handleCloseTastkType}>CRM</MenuItem>
                                    <MenuItem onClick={handleCloseTastkType}>Portal</MenuItem>
                                </Menu>
                            </div>


                            {/* <Box className="dropdown-box">
                                <Button className="btn-select">
                                    Select Type
                                    <span className="material-symbols-outlined ps-2">
                                        keyboard_arrow_down
                                    </span>
                                </Button>
                                <Box className="btn-Select">
                                    <Button className='btn-white'>Action</Button>
                                    <Button className='btn-white'>Ser</Button>
                                    <Button className='btn-white'>Custom</Button>

                                    <hr />

                                    <Button className='btn-blue-2' size="small">Apply Now</Button>
                                </Box>
                            </Box> */}

                            <Button onClick={handleClose} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>

                        <hr />

                        <Box className="row">
                            <Box className="col-lg-8 border-end">
                                <Box className="clearfix">
                                    <Box>
                                        <Box className="d-flex align-items-center">
                                            {/* <span class="material-symbols-outlined">
                                                edit_square
                                            </span> */}

                                            {/* <Checkbox
                                                className='create-tast p-1 text-blue'
                                                {...label}
                                                defaultChecked
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                            /> */}

                                            <Checkbox
                                                {...label}
                                                icon={<RadioButtonUncheckedOutlinedIcon />}
                                                checkedIcon={<CheckCircleIcon />}
                                                className="p-0"
                                            />

                                            <Box className>
                                                <input
                                                    className="input-text"
                                                    onChange={(e)=>setTextSubject(e.value)}
                                                    type="text"
                                                    value={textSubject}
                                                />
                                            </Box>
                                        </Box>

                                        {/* <Box className="d-flex align-items-center mt-3">
                                            <span class="material-symbols-outlined">
                                                edit_square
                                            </span>
                                            <Box className>
                                                <input className='font-14 input-text' type='text' value="Description" />
                                            </Box>
                                        </Box> */}




                                        {/* attached to start */}
                                        <Box className='mt-3'>

                                            {/* <Box className='mb-3'>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={userListName}
                                                    renderInput={(params) => <TextField {...params} label="From" />}
                                                    className="w-100"
                                                />
                                            </Box> */}
                                            {/* attached to end */}


                                            <Box className='mb-3'>

                                                <Autocomplete
                                                    multiple
                                                    id="checkboxes-tags-demo"
                                                    options={portalUser}
                                                    disableCloseOnSelect
                                                    getOptionLabel={(option) => option["E-Mail"]}
                                                    renderOption={(props, option, { selected }) => (
                                                        <li {...props}>
                                                            <Checkbox
                                                                icon={icon}
                                                                checkedIcon={checkedIcon}
                                                                style={{ marginRight: 8 }}
                                                                checked={selected}
                                                            />
                                                            {option["First Name"] + " " + option["Last Name"] + " (" + option["E-Mail"] + ")"}
                                                        </li>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="To:" limitTags={2} placeholder="" />
                                                    )}
                                                    onChange={handleAutocompleteChange} // Handle selection change

                                                />



                                            </Box>

                                            <Box className='mb-3'>
                                                <Autocomplete
                                                    multiple
                                                    id="checkboxes-tags-demo"
                                                    options={portalUser}
                                                    disableCloseOnSelect
                                                    getOptionLabel={(option) => option["E-Mail"]}
                                                    renderOption={(props, option, { selected }) => (
                                                        <li {...props}>
                                                            <Checkbox
                                                                icon={icon}
                                                                checkedIcon={checkedIcon}
                                                                style={{ marginRight: 8 }}
                                                                checked={selected}
                                                            />
                                                            {option["First Name"] + " " + option["Last Name"] + " (" + option["E-Mail"] + ")"}
                                                        </li>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="CC:" limitTags={2} placeholder="" />
                                                    )}
                                                    onChange={handleAutocompleteChangeOnCC} // Handle selection change
                                                />

                                            </Box>

                                            <Box className='mb-3'>
                                                <FormControlLabel control={<Checkbox checked={isCheckedForApproval} onChange={handleCheckboxChangeForAppoval} />} label="For Approval" />
                                                <FormControlLabel control={<Checkbox checked={isCheckedWithOutmgs} onChange={handleCheckboxChangeisCheckedWithOutmgs} />} label="Send Without Message" />

                                                <Button
                                                    variant="contained"
                                                    id="fade-button"
                                                    aria-controls={openTemp ? 'fade-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openTemp ? 'true' : undefined}
                                                    onClick={handleClickAddTemplate}

                                                >
                                                    Add Template
                                                </Button>
                                                <Menu
                                                    id="fade-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'fade-button',
                                                    }}
                                                    anchorEl={anchorElTemp}
                                                    open={openTemp}
                                                    onClose={handleCloseTemp}
                                                    TransitionComponent={Fade}
                                                    style={{ width: '50%', pending: "12px" }}
                                                >
                                                    {errorMgs ? (
                                                        <span sx={{ color: "red" }}>Email is blank, please select the mail</span>
                                                    ) : (
                                                        null // or any other element you want to render when errorMgs is false
                                                    )}
                                                    <DataGrid
                                                        dataSource={smsTemplate}
                                                        allowColumnReordering={true}
                                                        rowAlternationEnabled={true}
                                                        showBorders={true}
                                                        width={"100%"}
                                                        selection={{ mode: 'single' }}
                                                        onSelectionChanged={handleSelectionChangedTemp} // Handle selection change event
                                                    >
                                                        <FilterRow visible={true} />
                                                        <SearchPanel visible={false} highlightCaseSensitive={true} />

                                                        <Column
                                                            dataField="Description"
                                                            caption="Description"
                                                        />

                                                        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                                                        <Paging defaultPageSize={10} />
                                                    </DataGrid>
                                                </Menu>


                                            </Box>


                                        </Box>








                                        <Box className="mt-3 mb-3">

                                            {<HtmlEditorDX templateDataMarkup={templateDataMarkup} setTemplateDataMarkup={setTemplateDataMarkup}></HtmlEditorDX>}

                                            <textarea
                                                className="form-control textarea resize-none"
                                                placeholder="Description"
                                                value={txtdescription} // Bind the value to the state
                                                onChange={(e) => setTxtDescriptin(e.target.value)} // Handle changes to the textarea
                                            ></textarea>
                                        </Box>

                                        <div className="mt-4">
                                            <Button
                                                id="basic-button5"
                                                aria-controls={
                                                    UserDropdownopen ? "basic-menu5" : undefined
                                                }
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
                                                            for (
                                                                let i = 0;
                                                                i < words.length && i < 2;
                                                                i++
                                                            ) {
                                                                result += words[i].charAt(0);
                                                            }

                                                            if (item.ID == localStorage.getItem("UserId")) {

                                                                return (
                                                                    <>
                                                                        <Box
                                                                            className="user-img-list me-2 admin"
                                                                            title={item.ForwardTo}
                                                                            key={item.ID}
                                                                        >
                                                                            <p>{result}</p>
                                                                        </Box>

                                                                        <ArrowForwardIosIcon className='me-1' />
                                                                    </>
                                                                );
                                                            }
                                                            else {
                                                                return (
                                                                    <>
                                                                        <Box
                                                                            className="user-img-list me-2"
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

                                                    <Box className="d-flex">
                                                        <span class="material-symbols-outlined">
                                                            person_add
                                                        </span>
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

                                                <Box
                                                    className="inner-user-list-dropdown"
                                                    style={{ maxHeight: "200px", overflowY: "auto" }}
                                                >
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

                                                <Box className="inner-user-list-dropdown">
                                                    <p className="sembold">My Team</p>

                                                    <Box className="box-user-list-dropdown" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                                        <Box className="mb-1 mt-3 px-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Search..."
                                                                value={filterText}
                                                                onChange={(e) => setFilterText(e.target.value)}
                                                            />
                                                        </Box>
                                                        <Box className="box-user-list-dropdown">

                                                            {filteredUserList.map((item, ind) => (
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
                                                </Box>
                                            </Menu>
                                        </div>
                                    </Box>
                                </Box>

                                {/* end */}

                                <Box className="file-uploads">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        multiple
                                        onChange={handleFileSelect}
                                    />
                                    <label className="file-uploads-label" for="file-upload">
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
                                        <Button variant="text" className="btn-blue-2" onClick={handleDocumentClickOpen}>
                                            Select file
                                        </Button>
                                    </label>
                                </Box>

                                <Box className="file-uploads">
                                    {selectedFiles
                                        ? selectedFiles.map((file, index) => {
                                            console.log("Uploadin", file);

                                            return (
                                                <>
                                                    <label className="file-uploads-label" key={index}>
                                                        <Box className="d-flex align-items-center">
                                                            <span className="material-symbols-outlined icon">
                                                                description
                                                            </span>
                                                            <Box className="upload-content pe-3">
                                                                <Typography variant="h4">
                                                                    {file.FileName}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {kbToMb(file.FileSize)} MB
                                                                </Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box className="d-flex align-items-center">
                                                            <Button variant="text" className="btn-blue-2">
                                                                Sign
                                                            </Button>
                                                            <Box className="ps-2">
                                                                <Button
                                                                    className="p-0"
                                                                    sx={{
                                                                        minWidth: 24,
                                                                    }}
                                                                    id="basic-button"
                                                                    aria-controls={
                                                                        open ? "basic-menu2" : undefined
                                                                    }
                                                                    aria-haspopup="true"
                                                                    aria-expanded={open ? "true" : undefined}
                                                                    onClick={handleClick}
                                                                >
                                                                    <span className="material-symbols-outlined">
                                                                        more_vert
                                                                    </span>
                                                                </Button>
                                                                <Menu
                                                                    id="basic-menu"
                                                                    anchorel={anchorel}
                                                                    open={open2}
                                                                    onClose={handleClose2}
                                                                    MenuListProps={{
                                                                        "aria-labelledby": "basic-button",
                                                                    }}
                                                                >
                                                                    <MenuItem onClick={handleClose2}>
                                                                        <ListItemIcon>
                                                                            <LibraryAddIcon fontSize="small" />
                                                                        </ListItemIcon>
                                                                        Add
                                                                    </MenuItem>

                                                                    <MenuItem onClick={handleClose2}>
                                                                        <ListItemIcon>
                                                                            <DeleteIcon fontSize="small" />
                                                                        </ListItemIcon>{" "}
                                                                        Remove
                                                                    </MenuItem>
                                                                </Menu>
                                                            </Box>
                                                        </Box>
                                                        {/* <Button variant="text" className='btn-blue-2'>Select file</Button> */}
                                                    </label>
                                                </>
                                            );
                                        })
                                        : null}
                                </Box>

                                <Box className="mt-3 mb-3">
                                    <textarea
                                        className="form-control textarea resize-none"
                                        placeholder="Write a comment..."
                                        value={txtcomment} // Bind the value to the state
                                        onChange={(e) => setTxtComment(e.target.value)} // Handle changes to the textarea
                                    ></textarea>
                                </Box>
                                {txtTaskType === "CRM" && (
                                    <Button
                                        variant="contained"
                                        onClick={UploadAttachment}
                                        disabled={loading}
                                        className="btn-blue-2 mt-3"
                                    >
                                        {'CRM Task'}
                                    </Button>
                                )}

                                {txtTaskType === "Portal" && (
                                    <Button
                                        variant="contained"
                                        onClick={CreatePortalTask}
                                        disabled={loading}
                                        className="btn-blue-2 mt-3"
                                    >
                                        {'Portal Task'}
                                    </Button>
                                )}


                            </Box>
                            {/* col end */}

                            <Box className="col-lg-4">
                                <Box className="border-bottom mb-2">
                                    <label className="font-14 sembold">Index</label>

                                    <Box className="select-dropdown">
                                        <Button
                                            id="basic-button-folder22"
                                            aria-controls={
                                                boolFolder && selectedFolderMenu === "folder"
                                                    ? "basic-menu"
                                                    : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={
                                                boolFolder && selectedFolderMenu === "folder"
                                                    ? "true"
                                                    : undefined
                                            }
                                            onClick={(event) => handleClick3(event, "folder")}
                                        >
                                            {txtFolder}
                                            <KeyboardArrowDownIcon />
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={folderAnchorEl}
                                            open={Boolean(folderAnchorEl)}
                                            MenuListProps={{
                                                "aria-labelledby": "basic-button",
                                            }}
                                            className="search-list-main"
                                        >
                                            <Box className='px-3'>
                                                <TextField
                                                    label="Search"
                                                    variant="outlined"
                                                    value={searchFolderQuery}
                                                    onChange={handleSearchInputChangeFolder}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Box>

                                            <List
                                                sx={{
                                                    width: "100%",
                                                    maxWidth: 360,
                                                    bgcolor: "background.paper",
                                                    maxHeight: '230px'
                                                }}
                                            >
                                                {filteredFolderList
                                                    ? filteredFolderList.map((item, index) => (
                                                        <React.Fragment key={index}>
                                                            <ListItem
                                                                alignItems="flex-start"
                                                                onClick={(e) => {
                                                                    console.log("client select", item.Folder);
                                                                    settxtFolder(item.Folder); // Assuming item.Client holds the value you want
                                                                    setFolderId(item.FolderID);
                                                                    setFolderAnchorEl(null);
                                                                    Json_GetFolderData();
                                                                }}
                                                                className="search-list"
                                                            >
                                                                {/* <ListItemAvatar>
                                                                    <Avatar
                                                                        alt="Remy Sharp"
                                                                        src="/static/images/avatar/1.jpg"
                                                                    />
                                                                </ListItemAvatar> */}
                                                                <ListItemText
                                                                    className='m-0'
                                                                    primary={item.Folder}
                                                                    secondary={
                                                                        <React.Fragment>
                                                                            <Typography
                                                                                sx={{ display: "inline" }}
                                                                                component="span"
                                                                                variant="body2"
                                                                                color="text.primary"
                                                                            >
                                                                                {/* {item.FolderID} */}
                                                                            </Typography>
                                                                            {/* {item.CLMandatory} */}
                                                                        </React.Fragment>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            {/* <Divider variant="inset" component="li" /> */}
                                                        </React.Fragment>
                                                    ))
                                                    : null}
                                            </List>
                                        </Menu>
                                    </Box>

                                    <Box className="select-dropdown">
                                        <Button
                                            id="basic-button-client"
                                            aria-controls={
                                                boolClient && selectedClientMenu === "client"
                                                    ? "basic-menu"
                                                    : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={
                                                boolClient && selectedClientMenu === "client"
                                                    ? "true"
                                                    : undefined
                                            }
                                            onClick={(event) => handleClick3(event, "client")}
                                        >
                                            {txtClient}
                                            <KeyboardArrowDownIcon />
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={clientAnchorEl}
                                            open={Boolean(clientAnchorEl)}
                                            onClose={handleCloseClient}
                                            MenuListProps={{
                                                "aria-labelledby": "basic-button",
                                            }}
                                        >
                                            <Box className='p-2'>
                                                <TextField
                                                    label="Search"
                                                    variant="outlined"
                                                    value={searchQuery}
                                                    onChange={handleSearchInputChange}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Box>

                                            <List
                                                sx={{
                                                    width: "100%",
                                                    maxWidth: 360,
                                                    bgcolor: "background.paper",
                                                    maxHeight: '300px'
                                                }}
                                            >
                                                {filteredClientList.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <ListItem
                                                            alignItems="flex-start"
                                                            onClick={(e) => {
                                                                //console.log("client select", item.Client);
                                                                settxtClient(item.Client); // Assuming item.Client holds the value you want
                                                                setTextClientId(item.ClientID);
                                                                setClientAnchorEl(null);
                                                                Json_GetClientCardDetails(item.ClientID)


                                                            }}
                                                            className="search-list"
                                                        >
                                                            {/* <ListItemAvatar>
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src="/static/images/avatar/1.jpg"
                                                                />
                                                            </ListItemAvatar> */}
                                                            <ListItemText
                                                                primary={item.Client}
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            sx={{ display: "inline" }}
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="text.primary"
                                                                        >
                                                                            {/* {item.ClientID} */}
                                                                        </Typography>
                                                                        {/* {item.Email} */}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                        {/* <Divider variant="inset" component="li" /> */}
                                                    </React.Fragment>
                                                ))}
                                            </List>
                                        </Menu>
                                    </Box>

                                    <Box className="select-dropdown">
                                        <Button
                                            id="basic-button-section"
                                            aria-controls={
                                                boolSection && selectedSectionMenu === "section"
                                                    ? "basic-menu"
                                                    : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={
                                                boolSection && selectedSectionMenu === "section"
                                                    ? "true"
                                                    : undefined
                                            }
                                            onClick={(event) => handleClick3(event, "section")}
                                        >
                                            {txtSection}
                                            <KeyboardArrowDownIcon />
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={sectionAnchorEl}
                                            open={Boolean(sectionAnchorEl)}
                                            MenuListProps={{
                                                "aria-labelledby": "basic-button",
                                            }}
                                        >
                                            <Box className='p-2'>
                                                <TextField
                                                    label="Search"
                                                    variant="outlined"
                                                    value={searchFolderQuery}
                                                    onChange={handleSearchInputChangeSection}
                                                    sx={{ width: "100%" }}
                                                />
                                            </Box>
                                            <List
                                                sx={{
                                                    width: "100%",
                                                    maxWidth: 360,
                                                    bgcolor: "background.paper",
                                                    height: '260px'
                                                }}
                                            >
                                                {filtereSectionList
                                                    ? filtereSectionList.map((item, index) => (
                                                        <React.Fragment key={index}>
                                                            <ListItem
                                                                alignItems="flex-start"
                                                                onClick={(e) => {
                                                                    console.log("client select", item.Sec);
                                                                    settxtSection(item.Sec); // Assuming item.Client holds the value you want
                                                                    setTxtSectionId(item.SecID); // Assuming item.Client holds the value you want
                                                                    setSectionAnchorEl(null);
                                                                }}
                                                                className="search-list"
                                                            >
                                                                {/* <ListItemAvatar>
                                                                    <Avatar
                                                                        alt="Remy Sharp"
                                                                        src="/static/images/avatar/1.jpg"
                                                                    />
                                                                </ListItemAvatar> */}
                                                                <ListItemText
                                                                    primary={item.Sec}
                                                                    secondary={
                                                                        <React.Fragment>
                                                                            <Typography
                                                                                sx={{ display: "inline" }}
                                                                                component="span"
                                                                                variant="body2"
                                                                                color="text.primary"
                                                                            >
                                                                                {/* {item.SecID} */}
                                                                            </Typography>
                                                                            {/* {item.CLMandatory} */}
                                                                        </React.Fragment>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            {/* <Divider variant="inset" component="li" /> */}
                                                        </React.Fragment>
                                                    ))
                                                    : null}
                                            </List>
                                        </Menu>
                                    </Box>
                                </Box>

                                <Box className="border-bottom mb-2">
                                    <Box className="mb-2 ">
                                        <label className="font-14 semibold">Due By</label>
                                        <LocalizationProvider
                                            className="pe-0"
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DatePicker className="datepicker w-100"
                                                defaultValue={currentDate}// Set the default value using the value prop
                                                onChange={(e) => setCurrentDate(e)} // Update the default date when the user changes it                      
                                                inputFormat="DD/MM/YYYY" // Set the input format to "dd/mm/yyyy"
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>

                                {/* <Box className="border-bottom  mb-2">
                                    <label>Status on</label>

                                </Box> */}

                                {/* <Box className="border-bottom">
                                    <label>Index</label>
                                    
                                </Box> */}

                                <Box className="mb-2 border-bottom">
                                    <label className="font-14">Start Date</label>
                                    <LocalizationProvider
                                        className="pe-0"
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker className="datepicker w-100"
                                            defaultValue={nextDate} // Set the default value using the value prop
                                            onChange={(e) => setNextDate(e)} // Update the default date when the user changes it                      
                                            inputFormat="DD/MM/YYYY" // Set the input format to "dd/mm/yyyy"
                                        />
                                    </LocalizationProvider>
                                </Box>

                                <Box className="mb-2 border-bottom">
                                    <label className="font-14 d-block">
                                        Remind me
                                        <Checkbox {...label} defaultChecked size="small" />
                                    </label>

                                    <label className="font-14 d-block">Reminder Date</label>
                                    <LocalizationProvider
                                        className="pe-0"
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker className="datepicker w-100"
                                            defaultValue={remiderDate} // Set the default value using the value prop
                                            onChange={(e) => setRemiderDate(e)} // Update the default date when the user changes it                      
                                            inputFormat="DD/MM/YYYY" // Set the input format to "dd/mm/yyyy"
                                        />
                                    </LocalizationProvider>


                                    <label className="font-14 d-block">Expires On</label>
                                    <LocalizationProvider
                                        className="pe-0"
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker className="datepicker w-100"
                                            defaultValue={expireDate} // Set the default value using the value prop
                                            onChange={(e) => setExpireDate(e)} // Update the default date when the user changes it                      
                                            inputFormat="DD/MM/YYYY" // Set the input format to "dd/mm/yyyy"
                                        />
                                    </LocalizationProvider>
                                </Box>

                                <Box className="select-dropdown">
                                    <Button
                                        id="basic-button-section"
                                        aria-controls={
                                            boolPriority && selectedPrioriyMenu === "priority"
                                                ? "basic-menu"
                                                : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                            boolPriority && selectedPrioriyMenu === "priority"
                                                ? "true"
                                                : undefined
                                        }
                                        onClick={(event) => handleClick3(event, "priority")}
                                    >
                                        {txtPrioriy}
                                        <KeyboardArrowDownIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={prioriyAnchorEl}
                                        open={Boolean(prioriyAnchorEl)}
                                        MenuListProps={{
                                            "aria-labelledby": "basic-button",
                                        }}
                                    >

                                        <List
                                            sx={{
                                                width: "100%",
                                                maxWidth: 600,
                                                bgcolor: "background.paper",
                                            }}
                                        >
                                            {priorityarr
                                                ? priorityarr.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <ListItem
                                                            alignItems="flex-start"
                                                            onClick={(e) => {
                                                                console.log("client select", item.name);
                                                                setTxtPriority(item.name); // Assuming item.Client holds the value you want
                                                                setTxtPriorityId(item.id)
                                                                setPrioriyAnchorEl(null);
                                                            }}
                                                            className="search-list"
                                                        >
                                                            {/* <ListItemAvatar>
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src="/static/images/avatar/1.jpg"
                                                                />
                                                            </ListItemAvatar> */}
                                                            <ListItemText
                                                                primary={item.name}
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            sx={{ display: "inline" }}
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="text.primary"
                                                                        >
                                                                            {/* {item.id} */}
                                                                        </Typography>
                                                                        {/* {item.CLMandatory} */}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                        {/* <Divider variant="inset" component="li" /> */}
                                                    </React.Fragment>
                                                ))
                                                : null}
                                        </List>
                                    </Menu>
                                </Box>

                                <Box className="select-dropdown">
                                    <Button
                                        id="basic-button-section"
                                        aria-controls={
                                            boolStatus && selectedStatusMenu === "status"
                                                ? "basic-menu"
                                                : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                            boolStatus && selectedStatusMenu === "status" ? "true" : undefined
                                        }
                                        onClick={(event) => handleClick3(event, "status")}
                                    >
                                        {txtStatus}
                                        <KeyboardArrowDownIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={statusAnchorEl}
                                        open={Boolean(statusAnchorEl)}
                                        MenuListProps={{
                                            "aria-labelledby": "basic-button",
                                        }}
                                    >
                                        <List
                                            sx={{
                                                width: "100%",
                                                maxWidth: 600,
                                                bgcolor: "background.paper",
                                                height: '200px'
                                            }}
                                        >
                                            {statusarr
                                                ? statusarr.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <ListItem
                                                            alignItems="flex-start"
                                                            onClick={(e) => {
                                                                console.log("client select", item.name);
                                                                setTxtStatus(item.name); // Assuming item.Client holds the value you want

                                                                setStatusAnchorEl(null);
                                                            }}
                                                            className="search-list"
                                                        >
                                                            {/* <ListItemAvatar>
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src="/static/images/avatar/1.jpg"
                                                                />
                                                            </ListItemAvatar> */}
                                                            <ListItemText
                                                                primary={item.name}
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            sx={{ display: "inline" }}
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="text.primary"
                                                                        >
                                                                            {/* {item.id} */}
                                                                        </Typography>
                                                                        {/* {item.CLMandatory} */}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                        {/* <Divider variant="inset" component="li" /> */}
                                                    </React.Fragment>
                                                ))
                                                : null}
                                        </List>
                                    </Menu>
                                </Box>
                            </Box>
                            {/* col end */}








                        </Box>
                    </DialogContentText>



                    <DialogActions className="px-0 w-100 p-0">
                        <Box className="d-flex align-items-center justify-content-end w-100">
                            {/* <Box className="d-flex align-items-center">
                                <label className='pe-3'>Team Account:</label>
                                <Box className="dropdown-box">
                                    <Button className='btn-select'>All
                                        <span className="material-symbols-outlined ps-2">
                                            keyboard_arrow_down
                                        </span></Button>
                                    <Box className="btn-Select">
                                            <Button className='btn-white'>Action</Button>
                                            <Button className='btn-white'>Ser</Button>
                                            <Button className='btn-white'>Custom</Button>

                                            <hr />

                                            <Button className='btn-blue-2' size="small">Apply Now</Button>
                                        </Box>
                                </Box>
                            </Box> */}

                            {/* <Box>
                                <Button autoFocus className='btn-red me-2' onClick={handleClose}>
                                    cancel
                                </Button>
                                <Button className='btn-green' onClick={handleClose} autoFocus>
                                    Save
                                </Button>
                            </Box> */}
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog
                open={documentLisdoc}
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

                            <div>
                                <Button
                                    id="basic-button"
                                >
                                    Document List
                                </Button>

                            </div>




                            <Button onClick={handleCloseDocumentList} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>

                        <hr />

                        <DataGrid
                            dataSource={dmsDocumentList}
                            allowColumnReordering={true}
                            rowAlternationEnabled={true}
                            showBorders={true}
                            width="100%"
                            selection={{ mode: 'multiple' }}
                            onSelectionChanged={handleSelectionChanged} // Handle selection change event
                        >
                            <FilterRow visible={true} />
                            <SearchPanel visible={true} highlightCaseSensitive={true} />

                            <Column
                                dataField="Client"
                                caption="Client"
                            />
                            <Column
                                dataField="Description"
                                caption="Description"
                            />
                            <Column
                                dataField="Section"
                                caption="Section"
                            />

                            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                            <Paging defaultPageSize={10} />
                        </DataGrid>

                        {/* file upload end */}

                        <Button
                            variant="contained"
                            onClick={AddDocuments}
                            className="btn-blue-2 mt-3"
                        >
                            {'Add Document'}
                        </Button>

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
