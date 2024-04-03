import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DatePicker from 'react-datetime';
import user from "../images/user.jpg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DvrIcon from '@mui/icons-material/Dvr';
import LanguageIcon from '@mui/icons-material/Language';
import 'react-datetime/css/react-datetime.css';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import {
    List,
    ListItem,
    ListItemText,
    TextField,
    responsiveFontSizes,
} from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


import dayjs from 'dayjs';
import DataGrid, {
    Column,
    FilterRow,
    Pager,
    Paging,
    SearchPanel,
} from 'devextreme-react/data-grid';


// import LoginDetails from "../services/Utils";
import CommanCLS from "../services/CommanService";
import { useEffect } from "react";
import { useState } from "react";
import Fade from '@mui/material/Fade';
import HtmlEditorDX from "./HtmlEditor";
import { styled } from '@mui/material/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renderTimeViewClock } from "@mui/x-date-pickers";
import moment from "moment";
import { Toast } from "devextreme-react";
import Reference from "../client/client-components/Reference";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { data } from "jquery";
import EditReference from "../client/client-components/EditReference";
import UploadDocument from "../client/client-components/UploadDocument";

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

// 
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const label = { inputProps: { "aria-label": "Checkbox demo" } };

const statusIconList = [<DoNotDisturbAltIcon color='secondary' className='font-20'/>,<PublishedWithChangesIcon color='primary' className='font-20'/>,<HourglassBottomIcon color='primary' className='font-20'/>,<CheckCircleOutlineIcon color='success' className='font-20'/>];

function CreateNewModalTask({ ...props }) {

    let {
       
        documentDate,
        receivedDate,
        createNewFileObj,
        txtFolderData,
        txtClientData,
        txtSectionData,
        TaskType,
        // passButtonHide,
        // setPassButtonHide,
        openModal,
       

    } = props;

    console.log("documentDate txtSectionId1", documentDate,
        receivedDate, createNewFileObj)

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));


    const [guid, setGuid] = useState('');

    //const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/"; // base url for api
    //   let dt = new LoginDetails();

    let cls = new CommanCLS(baseUrl, agrno, Email, password);

    const baseurlSMs = "https://docusms.uk/dsdesktopwebservice.asmx/"; // base url for api
    //   let dt = new LoginDetails();

    let clsSms = new CommanCLS(baseurlSMs, agrno, Email, password);


    const [filterText, setFilterText] = React.useState("");

    const [userFilter, setUserFilter] = React.useState([]);
    const [userListData, setUserListData] = React.useState([]);

    const [userList, setUserList] = React.useState([]);
    const [addUser, setAddUser] = useState([]);
    const [ownerRighClick, setOwnerRighClick] = useState(null)

    const folderListRef = React.useRef(null);
    const clientListRef = React.useRef(null);
    const sectionListRef = React.useRef(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [anchorel, setAnchorel] = React.useState(null);

    const [ownerID, setOwnerID] = React.useState("");
    const [messageId, setMessageId] = React.useState("");

    const [txtdescription, setTxtDescriptin] = React.useState("");
    // const [txtcomment, setTxtComment] = React.useState("");
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

    const [selectedFilesFromBrower, setSelectedFilesFromBrower] = useState([]);

    const [attachmentPath, setAttachmentPath] = useState([]);

    ////////////////////////////////End Attachment files

    ///////////////////////////////////////date set
    // State variables to hold current date and next day's date
    // Get the current date in "dd/mm/yyyy" format

    const [currentDate, setCurrentDate] = useState(new Date()); // Initialize with the current date in "dd/mm/yyyy" format
    const [nextDate, setNextDate] = useState("");
    const [remiderDate, setRemiderDate] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [startDate, setStartDate] = useState(new Date());


    ///////////////////////////////////////end date set

    const [loading, setLoading] = useState(false);

    //////////////////////Priority
    const [txtPrioriy, setTxtPriority] = useState("Normal");
    const [txtStatus, setTxtStatus] = useState("Not Started");

    const [txtPriorityId, setTxtPriorityId] = useState(2);

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

    const handleClickOpen = (vl) => {
        console.log("Type show 1111", vl)
        if (vl === "Portal") {
            settxtTaskType(vl)
            setIsVisibleByTypeCRM(true);
        }
        else {
            settxtTaskType(vl)
            setIsVisibleByTypeCRM(false);
        }

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

    const [userDropdownanchorElRight, setuserDropdownAnchorElRight] = React.useState(null);
    const UserDropdownopenRight = Boolean(userDropdownanchorElRight);

    const [dropdownVisible, setDropdownVisible] = useState(false);


    const handleUserClick = (event) => {
        setuserDropdownAnchorEl(event.currentTarget);
    };
    const handleUserClose = () => {
        setuserDropdownAnchorEl(null);
        setuserDropdownAnchorElRight(null)
    };


    const [anchorElpriority, setAnchorElPrior] = React.useState(null);
    const openpriority = Boolean(anchorElpriority);
    const handleClickpriority = (event) => {
        setAnchorElPrior(event.currentTarget);
    };
    const handleClosepriority = () => {
        setAnchorElPrior(null);
    };


    const [anchorElstatus, setAnchorElstatus] = React.useState(null);
    const openstatus = Boolean(anchorElstatus);
    const handleClickstatus = (event) => {
        setAnchorElstatus(event.currentTarget);
    };
    const handleClosestatus = () => {
        setAnchorElstatus(null);
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

    const [anchorSelectFileEl, setAnchorSelectFileEl] = React.useState(null);

    const openSelectFile = Boolean(anchorSelectFileEl);

    const handleClickSelectFile = (event) => {
        setAnchorSelectFileEl(event.currentTarget);
    };

    const handleSelectFileClose = () => {
        setAnchorSelectFileEl(null);
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


    // Function to disable past 


    const disablePastDt = (date) => {
        const today = new Date();
        return date.isSameOrAfter(today, 'day'); // Disable past dates

    };

    const disableDueDate = (date) => {
        const today = currentDate;
        return date.isSameOrAfter(today, 'day'); // Disable past dates


    };

    const disablePastDtTwoDate = (date) => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const twoDaysAhead = new Date(nextDate);
        // twoDaysAhead.setDate(today.getDate() + 2); // Set two days ahead

        return date.isBetween(today, twoDaysAhead, null, '[]'); // Disable past dates and dates beyond two days from today
    };


    const userAdd = Boolean(anchorel);

    function Json_GetForwardUserList(fid) {
        setAddUser([])
        try {
            let o = {};
            o.ProjectId = fid;
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
                                if (el.ID === parseInt(localStorage.getItem("UserId"))) {
                                    // console.log("Json_GetForwardUserList11", addUser);
                                    setOwnerID(el.ID);
                                    setOwnerRighClick(el);
                                    setAddUser((pre) => [...pre, el])

                                }
                            })
                        }

                        setUserList(result);
                        let removeuser = result.filter((e) => e.ID !== localStorage.getItem("UserId"));


                        setUserListData(removeuser);
                        setUserFilter(removeuser);

                        let commanuser = result.filter((e) => e.ID === localStorage.getItem("UserId"));
                        console.log("Json_GetForwardUserList11", removeuser);
                        setSelectedUSer(commanuser[0]);

                    }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }




    const handalClickAddUser = (e) => {
        // Check if the object 'e' already exists in the array based on its 'id'
        if (!addUser.some(user => user.ID === e.ID)) {
            // If it doesn't exist, add it to the 'addUser' array
            setAddUser([...addUser, e]);
            let res = userFilter.filter((user) => user.ID !== e.ID);
            setUserListData(res);
            setUserFilter(res);
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


    function Json_GetSections(fid) {
        try {
            let o = {};
            o.ProjectId = fid;
            cls.Json_GetSections(o, function (sts, data) {
                if (sts) {
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

    // Function to handle changes in the search input
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    // Filter the client list based on the search query
    const filteredClientList = clientList.filter((item) =>
        item.Client.toLowerCase().includes(searchQuery.toLowerCase())
    );




    function getCurrentDate() {
        console.log("documentDate22", documentDate)
        let currentDate = new Date();
        if (documentDate) {
            currentDate = new Date(documentDate);

        }

        const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and pad with 0 if needed
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0)
        const year = currentDate.getFullYear(); // Get the full year

        // Construct the date string in "dd/mm/yyyy" format
        const formattedDate = `${year}-${month}-${day}`;
        console.log("documentDate22", formattedDate)

        return formattedDate;
    }

    function getNextDate() {
        let currentDate = new Date();
        if (receivedDate) {
            currentDate = new Date(receivedDate);
        }


        currentDate.setDate(currentDate.getDate() + 1); // Increment the day by 1 to get the next day's date
        const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and pad with 0 if needed
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0)
        const year = currentDate.getFullYear(); // Get the full year
        // Construct the date string in "yyyy/mm/dd" format
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    // Function to close the folder list
    const closeFolderList = (e) => {
        if (folderListRef.current && !folderListRef.current.contains(e.target)) {
            setFolderAnchorEl(null);
        }
    };

    // Function to close the client list




    const handleMenuClose = () => {
        setFolderAnchorEl(null);
    };



    useEffect(() => {

        const handleClickOutside = (event) => {
            // Check if the menu is open and the click is outside the menu and not in the search box
            if (folderAnchorEl && folderListRef.current && !folderListRef.current.contains(event.target) && !event.target.closest('.px-1')) {
                // Clicked outside the menu list, so close the menu
                handleMenuClose();
            }
        };

        // Attach event listener when the menu is open
        if (folderAnchorEl) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Remove event listener when the menu is closed
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function to remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [folderAnchorEl]);


    const handleMenuCloseClient = () => {
        setClientAnchorEl(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the menu is open and the click is outside the menu and not in the search box
            if (clientAnchorEl && clientListRef.current && !clientListRef.current.contains(event.target) && !event.target.closest('.px-1')) {
                // Clicked outside the menu list, so close the menu
                handleMenuCloseClient();
            }
        };

        // Attach event listener when the menu is open
        if (clientAnchorEl) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Remove event listener when the menu is closed
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function to remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [clientAnchorEl]);


    const handleMenuCloseSection = () => {
        setSectionAnchorEl(null);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the menu is open and the click is outside the menu and not in the search box
            if (sectionAnchorEl && sectionListRef.current && !sectionListRef.current.contains(event.target) && !event.target.closest('.px-1')) {
                // Clicked outside the menu list, so close the menu
                handleMenuCloseSection();
            }
        };

        // Attach event listener when the menu is open
        if (sectionAnchorEl) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Remove event listener when the menu is closed
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function to remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sectionAnchorEl]);


    useEffect(() => {
        // if(passButtonHide){
        //     setPassButtonHide(passButtonHide)
        // }

        if (createNewFileObj) {

            //console.log("createNewFileObj1111", createNewFileObj)
            setSelectedFiles(createNewFileObj);
            setSelectedDocumentFile(createNewFileObj);

        }
        if (txtFolderData) {
            settxtFolder(txtFolderData.Folder);
            setFolderId(txtFolderData.FolderID);
        }
        if (txtClientData) {
            settxtClient(txtClientData.Client);
            setTextClientId(txtClientData.ClientID);
        }

        if (txtSectionData) {
            settxtSection(txtSectionData.Sec);
            setTxtSectionId(txtSectionData.SecID);
        }
        if (TaskType) {
            if (TaskType === "CRM") {
                setIsVisibleByTypeCRM(false);
                settxtTaskType("CRM")
            }
            else if (TaskType === "Portal") {
                setIsVisibleByTypeCRM(true);
                settxtTaskType("Portal")
            }
            else {
                console.log("Else Part");
            }


        }



    }, [createNewFileObj]);


    useEffect(() => {
        // Filter the userList based on filterText
        console.log("userFilter", userFilter)
        let res = userListData.filter((item) => {
            // Check if item and its properties are defined before accessing them
            // console.log("filterText", filterText);
            if (item && item.ForwardTo) {
                // You can customize the filtering logic here based on your requirements
                return item.ForwardTo.toLowerCase().includes(filterText.toLowerCase());
            } else {
                return false; // Return false if any required property is undefined
            }
        });

        setUserFilter(res);
    }, [filterText])

    const CurrentDateChange = (e) => {
        setCurrentDate(e);
        // setNextDate(formattedDate);
    }

    const [selectedDate, setSelectedDate] = useState(null); // State for selected date



    useEffect(() => {
        console.log("get folder list112222", selectedDate);
        setSelectedDate(null); // Set the selected date to null to clear it
    }, [currentDate]);

    useEffect(() => {
        setLoading(false);
        let strGuid = uuidv4().replace(/-/g, '');
        localStorage.setItem("GUID", strGuid)
        setAnchorSelectFileEl(null);
        setOpen(openModal);

        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));

        // setCurrentDate(dayjs(getCurrentDate()));

        //setNextDate(dayjs(getNextDate()));
        //setRemiderDate(dayjs(getCurrentDate()));
        setExpireDate(dayjs(getCurrentDate()));

        Json_GetFolders();
        Json_GetForwardUserList(txtFolderId);
        Json_GetFolderData();
        Json_GetSections(txtFolderId);
        //console.log(nextDate, currentDate)

        //document.addEventListener('mousedown', closeFolderList);
        //document.addEventListener('mousedown', closeClientList);
        //document.addEventListener('mousedown', closeSectionList);




        // return () => {
        //     document.removeEventListener('mousedown', closeFolderList);
        //     document.removeEventListener('mousedown', closeClientList);
        //     document.removeEventListener('mousedown', closeSectionList);
        // };


        const currentDate1 = new Date(currentDate);
        const nextDate = new Date(currentDate1); // Copy the current date        
        nextDate.setDate(currentDate1.getDate() + 1); // Increment the day by 1 to get the next day's date    
        // Get the day, month, and year
        const day = nextDate.getDate().toString().padStart(2, '0');
        const month = (nextDate.getMonth() + 1).toString().padStart(2, '0');
        const year = nextDate.getFullYear();
        // Construct the date string in "yyyy/mm/dd" format
        const formattedDate = `${day}/${month}/${year}`;
        // console.log("formattedDate", formattedDate);
        setNextDate(formattedDate); // Set nextDate with formatted date


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
    // Function to get file extension from file name
    const getFileExtension = (fileName) => {
        // Split the file name by the dot (.)
        const parts = fileName.split('.');
        // Return the last part, which is the extension
        return parts[parts.length - 1];
    };

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
                    Base64: fileByte ? fileByte : "", // Base64 data of the file
                    FileSize: file.size,
                    Preview: reader.result, // Data URL for preview
                    DocId: "",
                    Guid: localStorage.getItem("GUID"),
                    FileType: getFileExtension(file.name).toLowerCase()
                };
                console.log("get folder list 2222222222", fileData);
                filesData.push(fileData);

                if (txtTaskType === "CRM") {
                    UploadAttachment(fileData)
                }



                // Check if this is the last file
                if (index === selectedFilesArray.length - 1) {
                    // Add new files to the uploadedFiles array
                    setSelectedFiles((prevUploadedFiles) => [
                        ...prevUploadedFiles,
                        ...filesData,
                    ]);

                    setSelectedFilesFromBrower((prevUploadedFiles) => [
                        ...prevUploadedFiles,
                        ...filesData,
                    ]);

                }
            };
            reader.readAsDataURL(file); // Read file as data URL (base64)
        });

        setTimeout(() => {

            if (txtTaskType === "Portal") {
                PrepareDocumentsForPublish_Json(filesData, 1);
            }
        }, 3000);
    };


    function PrepareDocumentsForPublish_Json(filedata, ids) {
        try {
            // let myNewArr = [...selectedFilesFromBrower, ...selectedDocumentFile];
            // console.log("myNewArr", myNewArr)
            console.log("PrepareDocumentsForPublish_Json22", filedata);
            const ItemId = filedata.map(obj => obj.DocId);
            const fileNames = filedata.map(obj => obj["FileName"]);
            const fileDataBase64 = filedata.filter(obj => obj["Base64"] !== "").map(obj => obj["Base64"]);

            let o = {};
            o.accid = agrno;
            o.email = Email;
            o.password = password;
            o.uploadID = localStorage.getItem("GUID");
            o.filenames = fileNames;
            o.attachments = fileDataBase64;
            o.itemNos = ids === 1 ? null : ItemId;
            var urlLetter = "https://portal.docusoftweb.com/clientservices.asmx/";
            let cls = new CommanCLS(urlLetter, agrno, Email, password);
            cls.PrepareDocumentsForPublish_Json(o, function (sts, data) {
                if (sts && data) {
                    console.log("PrepareDocumentsForPublish_Json", data);

                    if (data === "Success") {

                    }
                }
            });
        }
        catch (error) {
            console.log({
                status: false,
                message: "Attachment is Not Uploaded Try again",
                error: error,
            });
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


    async function UploadAttachment(filedata) {

        // setLoading(true);
        // Your form submission logic, for example, making an API call
        try {
            let o = {};
            o.base64File = filedata.Base64;
            o.FileName = filedata.FileName;
            cls.SaveTaskAttachments(o, function (sts, data) {
                if (sts && data) {
                    let res = JSON.parse(data);
                    if (res.Status === "Success") {
                        let path = window.atob(res.Message);
                        let index = path.lastIndexOf("\\");
                        let fileName = path.slice(index + 1);
                        let o = { Path: path, FileName: fileName }

                        setAttachmentPath((prevAttachments) => [...prevAttachments, o]);

                    }
                }
            });
        }
        catch (error) {
            console.log({
                status: false,
                message: "Attachment is Not Uploaded Try again",
                error: error,
            });
        }

    }

    // async function UploadAttachment(filedata) {

    //     setLoading(true);
    //     // Your form submission logic, for example, making an API call
    //     try {
    //         if (filedata) {
    //             let promises = filedata.map((item) => {
    //                 return new Promise((resolve, reject) => {
    //                     let o = {};
    //                     o.base64File = item.Base64;
    //                     o.FileName = item.FileName;
    //                     cls.SaveTaskAttachments(o, function (sts, data) {
    //                         if (sts && data) {
    //                             let res = JSON.parse(data);
    //                             if (res.Status === "Success") {
    //                                 let path = window.atob(res.Message);
    //                                 let index = path.lastIndexOf("\\");
    //                                 let fileName = path.slice(index + 1);
    //                                 resolve({ Path: path, FileName: fileName });
    //                             } else {
    //                                 reject("Failed to save attachment.");
    //                             }
    //                         } else {
    //                             reject("Failed to save attachment.");
    //                         }
    //                     });
    //                 });
    //             });

    //             Promise.all(promises)
    //                 .then((attachments) => {
    //                     setAttachmentPath((prevAttachments) => [...prevAttachments, ...attachments]);
    //                     console.log('Attachments uploaded successfully:', attachments);
    //                     // setTimeout(() => {
    //                     //     Json_CRM_Task_Save();
    //                     // }, 2500);

    //                 })
    //                 .catch((error) => {
    //                     console.error("Error while saving attachments:", error);
    //                 });
    //         }
    //         else {
    //            // Json_CRM_Task_Save();
    //         }

    //         console.log('Form submitted successfully');
    //     } catch (error) {
    //         console.log({
    //             status: false,
    //             message: "Attachment is Not Uploaded Try again",
    //             error: error,
    //         });
    //     } finally {
    //         // Reset loading state after submission is complete

    //     }

    // }

    async function Json_CRM_Task_Save() {
        setLoading(true);
        if(txtSection){
            setLoading(false);
        }
        else{
            toast.error("Please Select a Section !")
        }
        const isaddUser = addUser.map(obj => obj.ID).join(',');
        const attString = attachmentPath.map(obj => obj.Path).join('|');

        //console.log("nextDate1", currentDate)
        let nxtdd = dayjs(nextDate).format("YYYY/MM/DD");
        if (nxtdd === "Invalid Date") {
            let dd = nextDate.split("/");//30/03/2024
            nxtdd = dd[2] + "/" + dd[1] + "/" + dd[0];
        }

        //console.log("nextDate",dayjs(nxtdd).format("YYYY/MM/DD"))
        let ooo = {

            "ClientIsRecurrence": false,
            "StartDate": dayjs(currentDate).format("YYYY/MM/DD"),
            "ClientEnd": nxtdd ? dayjs(nxtdd).format("YYYY/MM/DD") : "1900/01/01",
            "ClientDayNumber": "1",
            "ClientMonth": "1",
            "ClientOccurrenceCount": "1",
            "ClientPeriodicity": "1",
            "ClientRecurrenceRange": "0",
            "ClientRecurrenceType": "0",
            "ClientWeekDays": "1",
            "ClientWeekOfMonth": "1",
            "OwnerID": ownerID.toString(),
            "AssignedToID": isaddUser,
            "AssociateWithID": textClientId,
            "FolderId": txtFolderId.toString(),
            "Subject": textSubject,
            "TypeofTaskID": txtSectionId.toString(),
            "EndDateTime": nxtdd ? dayjs(nxtdd).format("YYYY/MM/DD") : "1900/01/01",
            "StartDateTime": dayjs(currentDate).format("YYYY/MM/DD"),
            "Status": txtStatus,
            "Priority": txtPriorityId.toString(),
            "PercentComplete": "1",
            "ReminderSet": false,
            "ReminderDateTime": remiderDate ? dayjs(remiderDate).format("YYYY/MM/DD") : "1900/01/01",
            "TaskNo": "0",
            "Attachments": attString ? attString : "",
            "Details": txtdescription,
            "YEDate": "1900/01/01",
            "SubDeadline": "1900/01/01",
            "DocRecdate": "1900/01/01",
            "ElectronicFile": false,
            "PaperFile": false,
            "Notes": "",
            "TaskSource": "CRM"
        }
        console.log("final save data obj", ooo);
        cls.Json_CRM_Task_Save(ooo, function (sts, data) {
            if (sts) {
                if (data) {
                    let js = JSON.parse(data);

                    console.log("save task rerurn value", js);

                    if (js.Status === "success") {
                        setLoading(false);
                        toast.success("Created Task !");
                        setMessageId(js.Message);
                        console.log("selectedDocumentFile", selectedDocumentFile)
                        if (selectedDocumentFile.length > 0) {
                            Json_CRM_TaskDMSAttachmentInsert(js.Message);
                        }
                        setOpen(false);
                       // setIsApi(!isApi);

                        // Inside your function or event handler where you want to show the success message
                        //handleSuccess(js.Message);
                        // setOpen(false);
                    }
                    else {
                        toast.error("Task Not Created Please Try Again");
                        console.log("Response final", data)
                    }
                }
                else {
                    toast.error("Faild Created Task Try again !");
                    setLoading(false);
                }


                // setLoading(false);
            }
        })

    }

    function Json_CRM_TaskDMSAttachmentInsert(TaskID) {

        const ItemId = selectedDocumentFile.map(obj => obj.DocId).join("|");
        let obj = {
            TaskID: TaskID,
            DMSItems: ItemId,
            Notes: ""
        };
        cls.Json_CRM_TaskDMSAttachmentInsert(obj, function (sts, data) {
            if (sts && data) {
                console.log('Json_CRM_TaskDMSAttachmentInsert', DataTransferItem);
            }
        })
    }

    //////////////////////////////////////End Attachment data




    /////////////////////////////Remove Assignee
    const handleRemoveUser = (id) => {
        // Filter out the object with the specified ID
        const updatedUsers = addUser.filter(user => user.ID !== id);
        setAddUser(updatedUsers);

        // Find the object with the specified ID in userFilter
        const removedUser = addUser.find(user => user.ID === id);

        // If the object is found in userFilter, add it back to userFilter
        if (removedUser) {
            setUserFilter(prevUsers => [...prevUsers, removedUser]);
        }

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

    const [txtColor, setTxtColor] = useState({ color: "#1976d2" });

    const getButtonColor = () => {
        if (textClientId) {
            setTxtColor({ color: "#1976d2" }); // Example: Set color to green when conditions met
        } else {
            setTxtColor({ color: "red" }); // Example: Set color to blue when conditions not met
        }
    };
    const getButtonColorfolder = () => {
        if (txtFolderId) {
            return { color: "#1976d2" }; // Example: Set color to green when conditions met
        } else {
            return { color: "red" }; // Example: Set color to blue when conditions not met
        }
    };

    const handleDocumentClickOpen = () => {
        setAnchorSelectFileEl(null);

        if (textClientId) {

            Json_ExplorerSearchDoc();
            setOpenDocumentList(true);

        } else {
            toast.warn("Select Referece !");
        }
        getButtonColor();
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
    const [portalUserCC, setPortalUserCC] = React.useState([]);
    const [portalUserTo, setPortalUserTo] = React.useState([]);

    const [txtTaskType, settxtTaskType] = React.useState("");

    const [isVisibleByTypeCRM, setIsVisibleByTypeCRM] = React.useState(false);




    const TastkType = Boolean(anchorElTastkType);
    const handleClickTastkType = (event) => {
        setAnchorElTastkType(event.currentTarget);
    };

    const handleCloseTastkType = (e) => {
        setAnchorElTastkType(null);

        // setCreateTaskButton(e.target.textContent)
        let txt = e.target.innerText;
        if (txt === "CRM") {
            setIsVisibleByTypeCRM(false);
            settxtTaskType(txt);
        }
        else if (txt === "Portal") {
            setIsVisibleByTypeCRM(true);
            settxtTaskType(txt);
        }
        else {
            console.log("Else Part");
        }

    };

    ////////////////// Priority
    let priorityarr = [{ id: 1, "name": "High" }, { id: 2, "name": "Normal" }, { id: 3, "name": "Low" }];
    let statusarr = [
        { id: 1, "name": "Not Started" },
        { id: 2, "name": "In Progress" },
        { id: 3, "name": "On Hold" },
        { id: 4, "name": "Completed" },
        // { id: 5, "name": "Done" },
        // { id: 6, "name": "Completed" },
    ];
    //////////////////End Priority

    const handleSelectionChanged = (selectedItems) => {
        setSelectedRows(selectedItems.selectedRowsData);
        // You can perform further actions with the selectedRows array
        console.log("selectedItems11", selectedItems); // Log the selected rows data

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
                            if (filteredUsers.length > 0) {
                                setPortalUser(filteredUsers.length > 0 ? filteredUsers : null);
                                setPortalUserCC(filteredUsers.length > 0 ? filteredUsers : null);
                                setPortalUserTo(filteredUsers.length > 0 ? filteredUsers : null);
                            }
                            console.log("Json_GetClientCardDetails", filteredUsers);
                        }
                        else {
                            // setPortalUser([]);
                        }
                    }
                });
            }
        } catch (error) {
            console.log("ExplorerSearchDoc", error);
        }
    };
    // Define the function to render cells based on the 'Type' column
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

    const getPortalUser = () => {

        Json_GetClientCardDetails();

    }

    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState([]);

    const handleAutocompleteChange = (event, newValue) => {

        setSelectedEmail(newValue ? newValue : null);

        if (newValue) {
            let res = portalUser.filter((user) => {
                let unk = newValue.find((u) => u.ContactNo === user.ContactNo);
                // console.log("selected email", unk);
                return unk === undefined; // If unk is undefined, it means there's no matching ContactNo in newValue
            });
            setPortalUserCC(res)
            // console.log("selected email11", res);
        } else {
            console.log("selected email11", portalUser); // If newValue is null, log the entire portalUser
        }

        //console.log("handleAutocompleteChange", newValue, event);
    };


    const [selectedEmailCC, setSelectedEmailCC] = useState(null);
    const handleAutocompleteChangeOnCC = (event, newValue) => {

        setSelectedEmailCC(newValue ? newValue : null);

        if (newValue) {
            let res = portalUser.filter((user) => {
                let unk = newValue.find((u) => u.ContactNo === user.ContactNo);
                // console.log("selected email", unk);
                return unk === undefined; // If unk is undefined, it means there's no matching ContactNo in newValue
            });
            setPortalUserTo(res)
            // console.log("selected email11", res);
        } else {
            console.log("selected email11", portalUser); // If newValue is null, log the entire portalUser
        }
    };

    //const filteredOptions = portalUser ? portalUser.filter(option => option["E-Mail"] !== selectedEmail) : [];
    const [selectedDocumentFile, setSelectedDocumentFile] = useState([]);

    const AddDocuments = () => {
        let filesData = [];
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
                // Check if this is the last file
                if (index === selectedRows.length - 1) {
                    // Add new files to the uploadedFiles array
                    setSelectedFiles((prevUploadedFiles) => [
                        ...prevUploadedFiles,
                        ...filesData,
                    ]);

                    setSelectedDocumentFile((prevUploadedFiles) => [
                        ...prevUploadedFiles,
                        ...filesData,
                    ]);
                }
            })


        })

        setTimeout(() => {
            PrepareDocumentsForPublish_Json(filesData, 2)
        }, 3000);


        setOpenDocumentList(false)

    }

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
                        toast.error(item.Description + "was not uploaded as it had no data")
                    }

                }

            })
        } catch (error) {
            console.log("Json_GetItemBase64DataById error", error)
        }

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



    function Json_GetHtmlFromRtf(rtfdata) {
        try {
            let obj = {};
            obj.strRtf = rtfdata;
            cls.Json_GetHtmlFromRtf(obj, function (sts, data) {
                if (sts && data) {

                    let json = JSON.parse(data);
                    //console.log("Template Data html", json);

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
                    //console.log("Json_GetStandardLetterData", data)
                    if (data.includes("File Not Found")) {
                        console.log("Json_GetStandardLetterData", data)
                    }
                    else {
                        Json_GetHtmlFromRtf(data);
                    }

                }
            })
        } catch (error) {
            console.log("Error for Tempalte", error)
        }
    }

    useEffect(() => {
        GetSMSTemplate();
    }, [setTxtTempId])

    const [textSubject, setTextSubject] = useState("");
    const [editorContentValue, setEditorContentValue] = useState(null);

    // Handle selection change


    const [selectedUSer, setSelectedUSer] = useState(null);
    const handleOptionChangeFromUser = (event, newValue) => {
        setSelectedUSer(newValue);
        // If newValue is not null, you can access its ID and perform any action you need
        if (newValue) {
            console.log('Selected ID:', newValue);
            // Perform any action you need with the selected ID
        }
    };

    // Function to generate and set the GUID without hyphens
    const generateGuid = () => {
        const newGuid = uuidv4().replace(/-/g, ''); // Removing hyphens from the generated GUID
        setGuid(newGuid);
    };



    function CreatePortalTask() {
        setLoading(true);
        // console.log("nextDate1", currentDate)
        ////console.log("nextDate", nextDate)

        let nxtdd = dayjs(nextDate).format("YYYY/MM/DD");
        if (nxtdd === "Invalid Date") {
            let dd = nextDate.split("/");//30/03/2024
            nxtdd = dd[2] + "/" + dd[1] + "/" + dd[0];
        }


        try {
            const isaddUser = addUser.map(obj => obj.ID).join(',');
            let ooo = {
                "ClientIsRecurrence": false,
                "StartDate": dayjs(currentDate).format("YYYY/MM/DD"),
                "ClientEnd": nxtdd ? dayjs(nxtdd).format("YYYY/MM/DD") : "1900/01/01",
                "ClientDayNumber": "1",
                "ClientMonth": "1",
                "ClientOccurrenceCount": "1",
                "ClientPeriodicity": "1",
                "ClientRecurrenceRange": "0",
                "ClientRecurrenceType": "0",
                "ClientWeekDays": "1",
                "ClientWeekOfMonth": "1",
                "OwnerID": ownerID.toString(),
                "AssignedToID": isaddUser,
                "AssociateWithID": textClientId,
                "FolderId": txtFolderId.toString(),
                "Subject": textSubject,
                "TypeofTaskID": txtSectionId.toString(),
                "EndDateTime": nxtdd ? dayjs(nxtdd).format("YYYY/MM/DD") : "1900/01/01",
                "StartDateTime": dayjs(currentDate).format("YYYY/MM/DD"),
                "Status": txtStatus,
                "Priority": txtPriorityId.toString(),
                "PercentComplete": "1",
                "ReminderSet": false,
                "ReminderDateTime": remiderDate ? dayjs(remiderDate).format("YYYY/MM/DD") : "1900/01/01",
                "TaskNo": "0",
                "Attachments": "",
                "Details": txtdescription,
                "YEDate": "1900/01/01",
                "SubDeadline": "1900/01/01",
                "DocRecdate": "1900/01/01",
                "ElectronicFile": false,
                "PaperFile": false,
                "Notes": "",
                "TaskSource": txtTaskType
            }
            console.log("final save data obj", ooo);
            clsSms.Json_CRM_Task_Save(ooo, function (sts, data) {
                if (sts) {
                    if (data) {
                        setLoading(false);
                        let js = JSON.parse(data);
                        console.log("Json_CRM_Task_Save ", js);
                        if (js.Status === "success") {
                            setMessageId(js.Message);
                            CreatePortalMessage(js.Message)
                            //toast.success("Created Task");
                            setOpen(false);
                           // setIsApi(!isApi);
                        }
                        else {
                            toast.error("Task Not Created Please Try Again");
                            console.log("Response final", data)
                        }
                    } else {
                        setLoading(false);
                        toast.error("Faild Created Task Try again !");
                    }



                    // setLoading(false);
                }
            })
        } catch (error) {
            console.log({
                status: false,
                message: "Faild Portal task Try again",
                error: error,
            });
        }
    }



    async function CreatePortalMessage(taskid) {

        try {
            if (selectedUSer.ID) {
                // let myNewArr = [...selectedFiles, ...selectedDocumentFile];
                // console.log("myNewArr", myNewArr)
                const ccEmail = selectedEmailCC ? selectedEmailCC.map(obj => obj["E-Mail"]) : "";
                const ToEmail = selectedEmail.map(obj => obj["E-Mail"]);
                // const ItemId = selectedDocumentFile.map(obj => obj.DocId);
                // const fileNames = myNewArr.map(obj => obj["FileName"]);
                // const fileDataBase64 = myNewArr.filter(obj => obj["Base64"] !== "").map(obj => obj["Base64"]);


                let obj = {
                    "accid": agrno,
                    "email": Email,
                    "password": password,
                    "senderID": selectedUSer.ID,
                    "sectionID": txtSectionId,
                    "ccode": textClientId,
                    "recipients": ToEmail,
                    "subject": textSubject ? textSubject : "",
                    "ccs": ccEmail ? ccEmail : [],
                    "forApproval": isCheckedForApproval,
                    "highImportance": false,
                    "expiryDate": dayjs(expireDate).format("YYYY/MM/DD"),
                    "actionDate": dayjs(currentDate).format("YYYY/MM/DD"),
                    "trackIt": false,
                    "docTemplateTaskId": 0,
                    "docTemplateId": txtTemplateId ? txtTemplateId[0]["TemplateID"] : 0,
                    //"filenames": fileNames,
                    //  "attachments": fileDataBase64 ? fileDataBase64 : [],
                    //"itemNos": ItemId ? ItemId : [],
                    "noMessage": isCheckedWithOutmgs,
                    "message": btoa(editorContentValue),
                    "docuBoxMessage": false,
                    "docuBoxEmails": "",
                    "daysToDelete": 0,
                    "approvalResponse": "",
                    "uploadID": localStorage.getItem("GUID"),
                    "PubTaskid": taskid


                }
                console.log("final save data obj", obj);

                var urlLetter = "https://portal.docusoftweb.com/clientservices.asmx/";
                let cls = new CommanCLS(urlLetter, agrno, Email, password);

                cls.MessagePublishedPortalTask_Json(obj, function (sts, data) {
                    if (sts) {
                        console.log("MessagePublished_Json", data)
                        if (!data) {
                            toast.success("Task Created");
                        }
                        setOpen(false);

                        // let js = JSON.parse(data);

                        // if (js.Status == "success") {
                        //     //setMessageId(js.Message)
                        //     //setLoading(false);
                        //     // Inside your function or event handler where you want to show the success message
                        //     //handleSuccess(js.Message);
                        //     //setOpen(false);
                        // }
                        // console.log("Response final", data)
                        // setLoading(false);
                    }
                })

            }
        } catch (error) {
            console.log({
                status: false,
                message: "PortMessage Faild Try again",
                error: error,
            });
        }
    }

    const [isCheckedForApproval, setIsCheckedForApproval] = useState(false);
    const [isDisabledForApproval, setIsDisabledForApproval] = useState(false);

    const handleCheckboxChangeForAppoval = (event) => {
        setIsCheckedForApproval(event.target.checked);
    };

    const [isCheckedWithOutmgs, setisCheckedWithOutmgs] = useState(false);

    const handleCheckboxChangeisCheckedWithOutmgs = (event) => {
        setisCheckedWithOutmgs(event.target.checked);
    };



    const handleRightClick = (event) => {
        event.preventDefault(); // Prevents the default context menu from appearing
        setDropdownVisible(true);
        setuserDropdownAnchorElRight(event.currentTarget);
        //setDropdownPosition({ x: event.clientX, y: event.clientY });
    };

    const firsorScandCtr = (item) => {
        if (item) {
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
            return result;
        }

    }


    const removeItemById = (array, idToRemove) => {
        // Filter out the item with the specified id
        return array.filter(item => item.ID !== idToRemove);
    };


    const handleItemClick = (e) => {
        //console.log("handleItemClick111", e);
        setOwnerRighClick(e);
        console.log("slected user", e)
        setOwnerID(e.ID)

        const existingObj = addUser.find(obj => obj.ID === e.ID);
        if (!existingObj) {
            setAddUser((pre) => [...pre, ...e]);
        }

        //let res = addUser.filter(user => user.ID !==e.ID);
        //setAddUser(res);
        // // Check if the object 'e' already exists in the array based on its 'id'
        // if (!addUser.some(user => user.ID === e.ID)) {
        //     // If it doesn't exist, add it to the 'addUser' array
        //     setAddUser([...addUser, e]);

        // }

        // setTimeout(() => {
        //     console.log("handleItemClick111333",addUser);
        // }, 3000);

    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };


    const [isRemindMe, setIsRemindMe] = useState(false);
    const handleRemindMe = (e) => {
        setIsRemindMe(e.target.checked);
        if (!e.target.checked) {
            setRemiderDate("")
        }
    }


    const SigningMethods = (e) => {
        setIsCheckedForApproval(true);
        setIsDisabledForApproval(true);
        const ToEmail = selectedEmail.map(obj => obj["E-Mail"]).join(",");
        let url = `https://signing.docusms.uk/Signing.aspx?accid=${agrno}&email=${Email}&password=${password}&sendclient=${textClientId}&sendemail=&clientname=${txtClient}&option=upload&file=${agrno}-${localStorage.getItem("GUID")}/${e.FileName}&to=${ToEmail}&rwndrnd=0.8166129123678032`;
        window.open(url);
    }

    const [anchorElDoc, setAnchorElDoc] = React.useState(null);
    const openDoc = Boolean(anchorElDoc);
    const [selectedFileIndex, setSelectedFileIndex] = useState(null); // State for the index of the selected file in the menu
    const handleClickDoc = (event, index) => {
        setAnchorElDoc(event.currentTarget);
        setSelectedFileIndex(index);
    };
    const handleCloseDoc = () => {
        setAnchorElDoc(null);

    };

    function DeleteFile(d) {
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
                RemoveFilesForUpload_Json(d)
            }
        });
    }


    function RemoveFilesForUpload_Json(d) {
        console.log("RemoveFilesForUpload_Json", selectedFiles)
        try {
            let o = {
                accid: agrno,
                email: Email,
                password: password,
                uploadID: d.Guid,
                filename: d.FileName
            }
            var urlLetter = "https://portal.docusoftweb.com/clientservices.asmx/";
            let cls = new CommanCLS(urlLetter, agrno, Email, password);
            cls.RemoveFilesForUpload_Json(o, function (sts, data) {
                if (sts && data) {

                    if (data === "Success") {
                        toast.success("Removed File !");
                        const updatedFiles = selectedFiles.filter(e => e.FileName !== d.FileName);
                        console.log("updatedFiles", updatedFiles);
                        setSelectedFiles(updatedFiles);
                    }
                }
            })
        } catch (error) {
            console.log({
                status: false,
                message: "Folder is Blank Try again",
                error: error,
            });
        }


    }



    // Function to get file extension from file name
    const getFileName = (fileName) => {
        // Split the file name by the dot (.)
        const parts = fileName.split('.');
        // Return the last part, which is the extension
        return parts[0];
    };



    function ConvertToPdf_Json(d) {
        setAnchorElDoc(null);
        // console.log("ConvertToPdf_Json", selectedFiles)
        try {
            let o = {
                accid: agrno,
                email: Email,
                password: password,
                Guid: d.Guid,
                FileName: d.FileName
            }
            var urlLetter = "https://portal.docusoftweb.com/clientservices.asmx/";
            let cls = new CommanCLS(urlLetter, agrno, Email, password);
            cls.ConvertToPdf_Json(o, function (sts, data) {
                if (sts) {
                    console.log("ConvertToPdf_Json", data)
                    if (data) {
                        let fname = getFileName(data);
                        let res = selectedFiles.map((file) => {
                            if (getFileName(file.FileName) === fname) {
                                return { ...file, FileName: data };
                            }
                            else {
                                return file;
                            }
                        })
                        setSelectedFiles(res)
                        toast.success("Converted File !")
                    }
                    else {
                        toast.error("Not Converted !")
                    }
                }
            })
        } catch (error) {
            console.log({
                status: false,
                message: "Folder is Blank Try again",
                error: error,
            });
        }
    }

    // dropdown
    const [anchorEl4, setAnchorEl4] = React.useState(null);
    const [openUploadDocument, setOpenUploadDocument] = React.useState(false);
    const open4 = Boolean(anchorEl4);
    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };
    const handleClose4 = () => {
        setAnchorEl4(null);
    };

    const handleUploadDocument = () => {
        setAnchorEl4(null);
        setOpenUploadDocument(true)
    };



    // Referance modal
    const [Referance, setReferance] = React.useState(false);
    const [ReferanceEdit, setReferanceEdit] = React.useState(false);
    const handleClickReferance = () => {
        setReferance(true);
    };
    const DocumentHandleClose = () => {
        setReferance(false);
    };
    const handleClickEditReferance = () => {
        setReferanceEdit(true);
    };
    const EditDocumentHandleClose = () => {   
        setReferanceEdit(false);
    };
    return (
        <React.Fragment>
            {/* <Button
                className="btn-blue btn-round btn-block"
                onClick={handleClickOpen}
            >
                <span className="material-symbols-outlined">edit_square</span>{" "}
                <span className="ps-2 create-text">Create New  </span>
            </Button> */}
            <UploadDocument openUploadDocument={openUploadDocument} setOpenUploadDocument={setOpenUploadDocument}></UploadDocument>
            <div className="select-border my-0 m-auto">
                <Button
                    id="basic-button"
                    aria-controls={open4 ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open4 ? 'true' : undefined}
                    onClick={handleClick4}
                    className="btn-blue-2 btn-round btn-block add-new-btn"
                    variant="text"
                    size="small"
                >
                    <span className="material-symbols-outlined font-18">edit_square</span>{" "}
                    <span className="ps-2 font-13 create-text">Add New  </span>

                </Button>
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
                    <MenuItem onClick={handleClickOpen}>CRM Task</MenuItem>
                    <MenuItem onClick={handleClickOpen}>Portal Task</MenuItem>
                    <MenuItem onClick={handleClickReferance}>Reference</MenuItem>
                    <MenuItem onClick={handleClose4}>Note</MenuItem>
                    <MenuItem onClick={handleClose4}>Document</MenuItem>
                    <MenuItem 
                    onClick={handleClickEditReferance}
                    >Edit Reference</MenuItem>
                    <MenuItem onClick={() => handleClickOpen("CRM")}>
                        {/* <ListItemIcon>
                            <EjectIcon fontSize="medium" className="text-red rotate-180" />
                        </ListItemIcon> */}
                        <ListItemIcon>
                            <DvrIcon className="font-20" />
                        </ListItemIcon> CRM Task
                    </MenuItem>

                    <MenuItem onClick={() => handleClickOpen("Portal")}><ListItemIcon>
                        <LanguageIcon className="font-20" />
                    </ListItemIcon>
                        Portal Task</MenuItem>

                    <MenuItem onClick={handleClickReferance}>
                        <ListItemIcon>
                            <GroupIcon className="font-20" />
                        </ListItemIcon> Reference
                    </MenuItem>

                    <MenuItem>
                        <ListItemIcon>
                            <GroupIcon className="font-20" />
                        </ListItemIcon> Add Contacts
                    </MenuItem>

                    <MenuItem onClick={handleClose4}>
                        <ListItemIcon>
                            <SaveAsIcon className="font-20" />
                        </ListItemIcon>
                        Note
                    </MenuItem>


                    <MenuItem onClick={handleUploadDocument}>
                        <ListItemIcon>
                            <DescriptionIcon className="font-20" />
                        </ListItemIcon>
                        Document</MenuItem>
                </Menu>
            </div>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className="custom-modal custom-modal-1200"
            >
                <DialogContent>
                    <DialogContentText>
                        <Box className="d-flex align-items-center justify-content-between">

                            <Box>
                                <Button
                                    id="basic-button"
                                    aria-controls={TastkType ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={TastkType ? 'true' : undefined}
                                    onClick={handleClickTastkType}
                                    className="btn-select min-width-auto"
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
                                    className="custom-dropdown"
                                >
                                    <MenuItem onClick={handleCloseTastkType}>
                                        <ListItemIcon>
                                            <DvrIcon className="font-20" />
                                        </ListItemIcon>
                                        CRM</MenuItem>

                                    <MenuItem onClick={handleCloseTastkType}>
                                        <ListItemIcon>
                                            <LanguageIcon className="font-20" />
                                        </ListItemIcon>
                                        Portal
                                    </MenuItem>
                                </Menu>
                            </Box>


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

                        <Box className="row full-height-modal">
                            <Box className="col-lg-8 border-end">
                                <Box className="clearfix">
                                    <Box>
                                        <Box className="align-items-center">
                                            {/* <span class="material-symbols-outlined">
                                                edit_square
                                            </span> */}

                                            {/* <Checkbox
                                                className='create-tast p-1 text-blue'
                                                {...label}
                                                defaultChecked
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                            /> */}

                                            {/* <Checkbox
                                                {...label}
                                                icon={<RadioButtonUncheckedOutlinedIcon />}
                                                checkedIcon={<CheckCircleIcon />}
                                                className="p-0"
                                            /> */}

                                            <Box>
                                                <input
                                                    placeholder="Subject..."
                                                    className="input-text"
                                                    onChange={(e) => setTextSubject(e.target.value)}
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


                                            {/* attached to end */}

                                            {isVisibleByTypeCRM && (
                                                <>
                                                    <Box className='mb-2'>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={userList}
                                                            getOptionLabel={(option) => option.ForwardTo}
                                                            renderInput={(params) => <TextField {...params} label="From" />}
                                                            className="w-100"
                                                            size="small"
                                                            value={selectedUSer}
                                                            onChange={handleOptionChangeFromUser}
                                                        />
                                                    </Box>
                                                    <Box className='mb-2'>

                                                        <Autocomplete
                                                            multiple
                                                            id="checkboxes-tags-demo"
                                                            options={portalUserTo}
                                                            disableCloseOnSelect
                                                            getOptionLabel={(option) => option["E-Mail"]}
                                                            size="small"
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

                                                    <Box className='mb-2'>
                                                        <Autocomplete
                                                            multiple
                                                            id="checkboxes-tags-demo"
                                                            options={portalUserCC}
                                                            disableCloseOnSelect
                                                            getOptionLabel={(option) => option["E-Mail"]}
                                                            size="small"
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

                                                    <Box className='mb-2'>
                                                        <FormControlLabel control={<Checkbox checked={isCheckedForApproval} disabled={isDisabledForApproval} onChange={handleCheckboxChangeForAppoval} />} label="For Approval" />
                                                        <FormControlLabel control={<Checkbox checked={isCheckedWithOutmgs} onChange={handleCheckboxChangeisCheckedWithOutmgs} />} label="Send Without Message" />

                                                        <Button
                                                            variant="contained"
                                                            id="fade-button"
                                                            aria-controls={openTemp ? 'fade-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={openTemp ? 'true' : undefined}
                                                            onClick={handleClickAddTemplate}
                                                            className="btn-blue-2"

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
                                                    <Box className='text-editor-box-name'>
                                                        {<HtmlEditorDX templateDataMarkup={templateDataMarkup} setTemplateDataMarkup={setTemplateDataMarkup} setEditorContentValue={setEditorContentValue}></HtmlEditorDX>}
                                                    </Box>
                                                </>
                                            )}

                                        </Box>

                                        {!isVisibleByTypeCRM && (<>
                                            <Box className="mt-3 mb-3">
                                                <textarea
                                                    className="form-control textarea-text resize-none"
                                                    placeholder="Description"
                                                    value={txtdescription} // Bind the value to the state
                                                    onChange={(e) => setTxtDescriptin(e.target.value)} // Handle changes to the textarea
                                                ></textarea>
                                            </Box>
                                        </>)}

                                        <div className="mt-2">
                                            <Button
                                                id="basic-button5"
                                                aria-controls={
                                                    UserDropdownopen ? "basic-menu5" : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={UserDropdownopen ? "true" : undefined}
                                                onClick={handleUserClick}
                                                onContextMenu={handleRightClick}
                                                className="p-0 w-auto d-inline-block"
                                            >

                                                <Box className="d-flex align-items-center">
                                                    {ownerRighClick && (<>
                                                        <Box
                                                            className="user-img-list me-2 admin"
                                                            title={ownerRighClick.ForwardTo}
                                                            key={ownerRighClick.ID}
                                                        >
                                                            <p>{firsorScandCtr(ownerRighClick)}</p>
                                                        </Box> <ArrowForwardIosIcon className='me-1' />
                                                    </>)}

                                                    {addUser.length > 1
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
                                                            if (item.ID !== ownerID) {
                                                                return (
                                                                    <>
                                                                        <Box
                                                                            className="user-img-list me-2 admin"
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

                                            {dropdownVisible && (<Menu
                                                id="basic-menu5"
                                                anchorEl={userDropdownanchorElRight}
                                                open={UserDropdownopenRight}
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
                                                    <p className="sembold">Assigned11</p>

                                                    <Box className="box-user-list-dropdown">



                                                        {addUser
                                                            ? addUser.map((item, ind) => {
                                                                if (item.ID === ownerID) {
                                                                    return (
                                                                        <React.Fragment key={ind}>
                                                                            <button type="button"
                                                                                id={item.ID}
                                                                            >
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
                                                                            <button type="button" id={item.ID}
                                                                                onClick={() => handleItemClick(item)}
                                                                            >
                                                                                <Box className="user-img-list me-2">
                                                                                    <img src={user} alt="User" />
                                                                                </Box>
                                                                                <p>{item.ForwardTo}</p>
                                                                                {/* <span
                                                                                    className="close"
                                                                                    onClick={() => handleRemoveUser(item.ID)}
                                                                                    role="button" // Adding role="button" to indicate this element is clickable
                                                                                    tabIndex="0" // Adding tabIndex to make the element focusable
                                                                                >
                                                                                    <span className="material-symbols-outlined">
                                                                                        close
                                                                                    </span>
                                                                                </span> */}
                                                                            </button>
                                                                        </React.Fragment>
                                                                    );
                                                                }
                                                            })
                                                            : null}
                                                    </Box>
                                                </Box>
                                            </Menu>)}

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
                                                                if (item.ID === ownerID) {
                                                                    return (
                                                                        <React.Fragment key={ind}>
                                                                            <button type="button" id={item.ID} >
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
                                                    <p className="sembold mb-0">My Team</p>

                                                    <Box className="box-user-list-dropdown" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                                        <Box className="mb-1 mt-3 px-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Search..."
                                                                size='small'
                                                                value={filterText}
                                                                onChange={(e) => setFilterText(e.target.value)}
                                                            />
                                                        </Box>
                                                        <Box className="box-user-list-dropdown">

                                                            {userFilter.map((item, ind) => (
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

                                        <Button
                                            id="basic-button"
                                            variant="contained"
                                            aria-controls={openSelectFile ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openSelectFile ? 'true' : undefined}
                                            onClick={handleClickSelectFile}
                                            className="btn-blue-2"
                                        >
                                            Select file
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorSelectFileEl}
                                            open={openSelectFile}
                                            onClose={handleSelectFileClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                            className="custom-dropdown"
                                        >
                                            <label onClick={handleSelectFileClose} htmlFor="file-upload">
                                                <MenuItem>Upload File(s)</MenuItem>
                                            </label>
                                            <MenuItem onClick={handleDocumentClickOpen}>Select From DMS</MenuItem>

                                        </Menu>

                                    </label>
                                </Box>

                                <Box className="file-uploads file-upload-height">
                                    {selectedFiles.length > 0
                                        ? selectedFiles.map((file, index) => {
                                            // console.log("Uploadin", file);

                                            return (
                                                <>
                                                    <label className="file-uploads-label mb-2" key={index}>
                                                        <Box className="d-flex align-items-center">
                                                            <span className="material-symbols-outlined icon">
                                                                description
                                                            </span>
                                                            <Box className="upload-content pe-3">
                                                                <Typography variant="h4">
                                                                    {file ? file.FileName : ""}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {file ? kbToMb(file.FileSize) : ""} MB
                                                                </Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box className="d-flex align-items-center">
                                                            {txtTaskType === "Portal" && (<>
                                                                <Button variant="text" onClick={() => SigningMethods(file)} className="btn-blue-2">
                                                                    Sign
                                                                </Button>
                                                            </>)}

                                                            <Box className="ps-2">

                                                                <Button
                                                                    id="basic-button"
                                                                    aria-controls={openDoc ? 'basic-menu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openDoc ? 'true' : undefined}
                                                                    onClick={(event) => handleClickDoc(event, index)} // Pass index to handleClickDoc
                                                                    className="min-width-auto"

                                                                >
                                                                    <span className="material-symbols-outlined">
                                                                        more_vert
                                                                    </span>
                                                                </Button>

                                                                <Menu
                                                                    id="basic-menu"
                                                                    className="custom-dropdown"
                                                                    anchorEl={anchorElDoc}
                                                                    open={openDoc && selectedFileIndex === index} // Ensure the menu opens only for the selected file
                                                                    onClose={handleCloseDoc}
                                                                    MenuListProps={{ 'aria-labelledby': `basic-button-${index}` }} // Use index to associate each menu with its button
                                                                >
                                                                    <MenuItem onClick={() => DeleteFile(file)}>Delete</MenuItem>
                                                                    {txtTaskType === "Portal" && (file.FileType === "docx" || file.FileType === "doc" || file.FileType === "xls" || file.FileType === "xlsx" || file.FileType === "msg") && (
                                                                        <MenuItem onClick={(e) => ConvertToPdf_Json(file)}>Convert To Pdf</MenuItem>
                                                                    )}


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

                                {/* <Box className="mt-3 mb-3">
                                    <textarea
                                        className="form-control textarea resize-none"
                                        placeholder="Write a comment..."
                                        value={txtcomment} // Bind the value to the state
                                        onChange={(e) => setTxtComment(e.target.value)} // Handle changes to the textarea
                                    ></textarea>
                                </Box> */}
                                {txtTaskType === "CRM" && (
                                    <Button
                                        variant="contained"
                                        onClick={Json_CRM_Task_Save}
                                        disabled={!textSubject || loading}
                                        className="btn-blue-2 mt-3"

                                    >
                                        {'CRM Task'}
                                    </Button>
                                )}

                                {txtTaskType === "Portal" && (
                                    <Button
                                        variant="contained"
                                        onClick={CreatePortalTask}
                                        disabled={!textSubject || loading}

                                        className="btn-blue-2 mt-1"
                                    >
                                        {'Portal Task'}
                                    </Button>
                                )}

                                <ToastContainer></ToastContainer>
                            </Box>
                            {/* col end */}

                            <Box className="col-lg-4">
                                <Box className="border-bottom mb-2">
                                    <label className="font-14 sembold">Index</label>
                                    <Box className="select-dropdown">
                                        <BootstrapTooltip title="Folder" arrow
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
                                            <Button
                                                id="basic-button-folder22"
                                                style={getButtonColorfolder()}
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
                                        </BootstrapTooltip>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={folderAnchorEl}
                                            open={Boolean(folderAnchorEl)}
                                            MenuListProps={{
                                                "aria-labelledby": "basic-button",
                                            }}
                                            className="search-list-main"
                                        >
                                            <Box className='px-1'>
                                                <TextField
                                                    label="Folder"
                                                    variant="outlined"
                                                    autoFocus
                                                    value={searchFolderQuery}
                                                    onChange={handleSearchInputChangeFolder}
                                                    onClick={(e) => e.stopPropagation()} // Prevent event propagation
                                                    sx={{ width: "100%" }}
                                                    size="small"
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
                                                                    // console.log("client select", item.Folder);
                                                                    setSearchFolderQuery("");
                                                                    settxtFolder(item.Folder); // Assuming item.Client holds the value you want
                                                                    setFolderId(item.FolderID);
                                                                    setFolderAnchorEl(null);
                                                                    Json_GetFolderData();
                                                                    settxtClient("Select Reference");
                                                                    settxtSection("Select Section");
                                                                    Json_GetSections(item.FolderID);
                                                                    Json_GetForwardUserList(item.FolderID)
                                                                }}
                                                                className="search-list"
                                                                ref={folderListRef}
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
                                        <BootstrapTooltip title="Client" arrow
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
                                            <Button
                                                id="basic-button-client"
                                                style={txtColor}
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
                                        </BootstrapTooltip>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={clientAnchorEl}
                                            open={Boolean(clientAnchorEl)}
                                            onClose={handleCloseClient}
                                            className="search-list-main"
                                            MenuListProps={{
                                                "aria-labelledby": "basic-button",
                                            }}
                                        >
                                            <Box className='px-1' >
                                                <TextField
                                                    label="Client"
                                                    variant="outlined"
                                                    autoFocus
                                                    value={searchQuery}
                                                    onChange={handleSearchInputChange}
                                                    sx={{ width: "100%" }}
                                                    size="small"
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
                                                                setSearchQuery("");
                                                                //console.log("client select", item.Client);
                                                                settxtClient(item.Client); // Assuming item.Client holds the value you want
                                                                setTextClientId(item.ClientID);
                                                                setClientAnchorEl(null);
                                                                Json_GetClientCardDetails(item.ClientID)
                                                                setTxtColor({ color: "#1976d2" });

                                                            }}
                                                            className="search-list"
                                                            ref={clientListRef}
                                                        >
                                                            {/* <ListItemAvatar>
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src="/static/images/avatar/1.jpg"
                                                                />
                                                            </ListItemAvatar> */}
                                                            <ListItemText
                                                                primary={item.Client}
                                                                className='m-0'
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
                                        <BootstrapTooltip title="Section" arrow
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
                                        </BootstrapTooltip>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={sectionAnchorEl}
                                            open={Boolean(sectionAnchorEl)}
                                            className="search-list-main"
                                            MenuListProps={{
                                                "aria-labelledby": "basic-button",
                                            }}
                                        >
                                            <Box className='px-1'>
                                                <TextField
                                                    label="Section"
                                                    variant="outlined"
                                                    autoFocus
                                                    value={searchSectionQuery}
                                                    onChange={handleSearchInputChangeSection}
                                                    sx={{ width: "100%" }}
                                                    size="small"
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
                                                                    setSearchSectionQuery("")
                                                                    // console.log("client select", item.Sec);
                                                                    settxtSection(item.Sec); // Assuming item.Client holds the value you want
                                                                    setTxtSectionId(item.SecID); // Assuming item.Client holds the value you want
                                                                    setSectionAnchorEl(null);
                                                                }}
                                                                className="search-list"
                                                                ref={sectionListRef}
                                                            >
                                                                {/* <ListItemAvatar>
                                                                    <Avatar
                                                                        alt="Remy Sharp"
                                                                        src="/static/images/avatar/1.jpg"
                                                                    />
                                                                </ListItemAvatar> */}
                                                                <ListItemText
                                                                    primary={item.Sec}
                                                                    className='m-0'
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

                                <Box className="mb-3">
                                    <Box className="mb-2 ">
                                        <label className="font-14 mb-1">Start Date</label>
                                        <Box className='custom-datepicker'>
                                            <LocalizationProvider
                                                className="pe-0 custom-datepicker"
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <CalendarMonthIcon />
                                                <DatePicker
                                                    showIcon
                                                    dateFormat="DD/MM/YYYY"
                                                    value={currentDate}
                                                    onChange={(e) => CurrentDateChange(e)} // Handle date changes
                                                    timeFormat={false}
                                                    isValidDate={disablePastDt}
                                                    closeOnSelect={true}
                                                    icon="fa fa-calendar"
                                                />

                                                {/* <DatePicker className="datepicker w-100"
                                                defaultValue={currentDate}// Set the default value using the value prop
                                                onChange={(e) => setCurrentDate(e)} // Update the default date when the user changes it                      
                                                inputFormat="DD/MM/YYYY" // Set the input format to "dd/mm/yyyy"
                                            /> */}
                                            </LocalizationProvider>
                                        </Box>

                                    </Box>
                                </Box>

                                {/* <Box className="border-bottom  mb-2">
                                    <label>Status on</label>

                                </Box> */}

                                {/* <Box className="border-bottom">
                                    <label>Index</label>
                                    
                                </Box> */}

                                <Box className="mb-3">
                                    <label className="font-14 semibold mb-1">Due By </label>

                                    <Box className='custom-datepicker'>

                                        <LocalizationProvider
                                            className="pe-0"
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <CalendarMonthIcon />
                                            <DatePicker className=" w-100"
                                                selected={selectedDate}
                                                showIcon
                                                dateFormat="DD/MM/YYYY"
                                                value={nextDate}
                                                onChange={(e) => setNextDate(e)} // Handle date changes
                                                timeFormat={false}
                                                isValidDate={disableDueDate}
                                                closeOnSelect={true}
                                                icon="fa fa-calendar"
                                                isClearable
                                            />
                                        </LocalizationProvider>


                                    </Box>


                                </Box>

                                <Box className="mb-2">
                                    <label className="font-14 d-block" sx={{ with: "30%" }}>
                                        Remind me
                                        <Checkbox onChange={handleRemindMe} {...label} size="small" />
                                    </label>

                                    {isRemindMe && (<>
                                        <label className="font-14 d-block mb-1">Reminder Date</label>

                                        <Box className='custom-datepicker'>
                                            <CalendarMonthIcon />
                                            <LocalizationProvider
                                                className="pe-0"
                                                dateAdapter={AdapterDayjs}
                                                timeFormat={false}
                                                isValidDate={disablePastDtTwoDate}
                                            >

                                                <DatePicker className=" w-100"
                                                    showIcon
                                                    dateFormat="DD/MM/YYYY"
                                                    value={remiderDate}
                                                    onChange={(e) => setRemiderDate(e)} // Handle date changes

                                                    timeFormat={false}
                                                    isValidDate={disablePastDtTwoDate}
                                                    closeOnSelect={true}
                                                    placeholder='Reminder Date'

                                                    icon="fa fa-calendar"

                                                />
                                            </LocalizationProvider>
                                        </Box>

                                    </>)}


                                    {txtTaskType === "Portal" && (<>
                                        <label className="font-14 d-block">Expires On</label>
                                        <LocalizationProvider
                                            className="pe-0"
                                            dateAdapter={AdapterDayjs}
                                        >


                                            <DatePicker className=" w-100"
                                                showIcon
                                                dateFormat="DD/MM/YYYY"
                                                value={expireDate}
                                                onChange={(e) => setExpireDate(e)} // Handle date changes
                                                timeFormat={false}
                                                closeOnSelect={true}
                                                icon="fa fa-calendar"

                                            />



                                        </LocalizationProvider>
                                    </>)}

                                </Box>

                                <Box className="select-dropdown">
                                    <BootstrapTooltip title="Priority" arrow
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
                                        <Button
                                            id="basic-button-section"
                                            aria-controls={openpriority ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openpriority ? 'true' : undefined}
                                            onClick={handleClickpriority}
                                        >
                                            {txtPrioriy}
                                            <KeyboardArrowDownIcon />
                                        </Button>
                                    </BootstrapTooltip>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElpriority}
                                        open={openpriority}
                                        onClose={handleClosepriority}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {priorityarr
                                            ? priorityarr.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <MenuItem onClick={(e) => {
                                                        console.log("client select", item.name);
                                                        setTxtPriority(item.name); // Assuming item.Client holds the value you want
                                                        setTxtPriorityId(item.id)
                                                        setAnchorElPrior(null);
                                                    }}
                                                        className='ps-2'
                                                    >
                                                        <ListItemIcon>
                                                            <PanoramaFishEyeIcon fontSize="medium" />
                                                        </ListItemIcon>

                                                        {item.name}</MenuItem>
                                                    {/* <Divider variant="inset" component="li" /> */}
                                                </React.Fragment>
                                            ))
                                            : null}
                                    </Menu>


                                </Box>

                                <Box className="select-dropdown">
                                    <BootstrapTooltip title="Status" arrow
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
                                        <Button
                                            id="basic-button-section"
                                            aria-controls={openstatus ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openstatus ? 'true' : undefined}
                                            onClick={handleClickstatus}
                                        >
                                            {txtStatus}
                                            <KeyboardArrowDownIcon />
                                        </Button>
                                    </BootstrapTooltip>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElstatus}
                                        open={openstatus}
                                        onClose={handleClosestatus}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className="custom-dropdown"
                                    >
                                        {statusarr
                                            ? statusarr.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <MenuItem onClick={(e) => {
                                                        //console.log("client select", item.name);
                                                        setTxtStatus(item.name); // Assuming item.Client holds the value you want
                                                        setAnchorElstatus(null);
                                                    }}>

                                                        <ListItemIcon>
                                                            {/* <RadioButtonUncheckedIcon fontSize="medium" className="text-success" /> */}
                                                            {statusIconList[index]}
                                                        </ListItemIcon>

                                                        {item.name}</MenuItem>

                                                </React.Fragment>
                                            ))
                                            : null}
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
            {/* end */}


            {/* create new modal */}
            <Dialog
                open={Referance}
                onClose={DocumentHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="custom-modal full-modal"
            >

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
                            <Button onClick={DocumentHandleClose} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>
                        <hr />

                        <Reference />

                    </DialogContentText>
                </DialogContent>
            </Dialog>


            <Dialog
                open={ReferanceEdit}
                onClose={EditDocumentHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="custom-modal full-modal"
            >

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
                            <Button onClick={EditDocumentHandleClose} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>
                        <hr />

                        <EditReference />

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment >
    );
}

export default CreateNewModalTask;
