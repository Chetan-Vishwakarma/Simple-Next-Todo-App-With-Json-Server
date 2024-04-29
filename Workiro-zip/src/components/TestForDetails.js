import React, { useEffect, useState } from 'react'
import CommanCLS from '../services/CommanService';
import DescriptionIcon from '@mui/icons-material/Description';
// import DataGrid, {
//     Column, FilterRow, Search, SearchPanel, Selection,
//     HeaderFilter, Scrolling,
//     FilterPanel,
//     Pager, Paging, DataGridTypes, FormGroup,
// } from 'devextreme-react/data-grid';
// import 'devextreme/dist/css/dx.light.css';
import { Box, Typography, Button, Paper, Grid, TextField, Autocomplete } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import AppsIcon from '@mui/icons-material/Apps';
// import DocumentDetails from '../../components/DocumentDetails';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
import DateRangePicker from 'react-bootstrap-daterangepicker';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import DnsIcon from '@mui/icons-material/Dns';
import CloseIcon from '@mui/icons-material/Close';
// import TableRowsIcon from '@mui/icons-material/TableRows';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import ToggleButton from '@mui/material/ToggleButton';
import Checkbox from '@mui/material/Checkbox';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useLocation, useNavigate } from 'react-router-dom';
// import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
// import CustomLoader from '../../components/CustomLoader';
import ClearIcon from '@mui/icons-material/Clear';
// import SubjectIcon from '@mui/icons-material/Subject';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import WarningIcon from '@mui/icons-material/Warning';
import Popover from '@mui/material/Popover';
import TuneIcon from '@mui/icons-material/Tune';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import BootstrapTooltip from '../utils/BootstrapTooltip';
import { toast } from 'react-toastify';

let agrno = localStorage.getItem("agrno");
let password = localStorage.getItem("Password");
let Email = localStorage.getItem("Email");
let folderId = localStorage.getItem("FolderId");

function TestForDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const { globalSearchDocs, strGlobal } = location.state ? location.state : { globalSearchDocs: [], strGlobal: "" };
    const baseUrlSms = "https://docusms.uk/dsdesktopwebservice.asmx/";
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    let Cls = new CommanCLS(baseUrl, agrno, Email, password);
    let ClsSms = new CommanCLS(baseUrlSms, agrno, Email, password);
    const [documents, setDocuments] = useState([]);
    const [groupedOptions, setgroupedOptions] = useState([]);
    const [toggleScreen, setToggleScreen] = useState({ singleCardView: true, multipleCardView: false, tableGridView: false });
    const [filteredDocResult, setFilteredDocResult] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [advFilteredResult, setAdvFilteredResult] = useState([]);
    const [selectedSection, setSelectedSection] = React.useState('');
    const [selectedLastFilter, setSelectedLastFilter] = useState("");
    const [isRangeFilter, setIsRangeFilter] = useState(false);
    const [documentKeys, setDocumentKeys] = useState([]);
    const [searchByPropertyKey, setSearchByPropertyKey] = useState("");
    const [searchByPropertyInput, setSearchByPropertyInput] = useState("");
    const [bulkSearch, setBulkSearch] = useState([]);
    const [alignment, setAlignment] = React.useState('left');
    const [isAdvFilter, setIsAdvFilter] = useState(false);
    const [sections, setSections] = useState([]);
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState("");
    const [sortByProperty, setSortByProperty] = useState("");
    const [isGroupBy, setIsGroupBy] = useState(false);
    const [groupByFilterResult, setGroupByFilterResult] = useState({});
    const [selectedGroup, setSelectedGroup] = React.useState("");
    const [suggestionList, setSuggestionList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [clientList, setClientList] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});

    const [isClientField, setIsClientField] = useState(false);
    const [isDocIdField, setIsDocIdField] = useState(false);
    const [documentId, setDocumentId] = useState("");

    const [documentData, setDocumentData] = useState({
        ClientId: "",
        Description: "",
        Email: Email,
        IsUDF: "F",
        ItemFDate: "01/01/1900",
        ItemTDate: "01/01/1900",
        ItemrecFDate: "01/01/1900",
        ItemrecTDate: "01/01/1900",
        ProjectId: folderId,
        agrno: agrno,
        password: password,
        sectionId: "",
        udflist: [],
        udfvalueList: []
    });


    // for date datepicker
    const [state, setState] = useState({
        start: moment().subtract(29, 'days'),
        end: moment(),
    });
    const { start, end } = state;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const label =
        start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY');

    const handleCallback = (start, end) => {
        // if (start._i === "All" && end._i === "All") {
        //     handleFilterDeletion('Item Date');
        // } else {
        //     let startDate = formatDatePickerDate(start._d);
        //     let endDate = formatDatePickerDate(end._d);
        //     setFilterCriteria({ ...filterCriteria, "Item Date": [startDate, endDate] });
        // }
        setState({ start, end });
    };

    const Json_GetFolderData = () => {
        let obj = {
            ClientId: "", Email: Email, ProjectId: folderId ? folderId : localStorage.getItem("FolderId"), SectionId: "-1", agrno: agrno, password: password
        };
        try {
            Cls.Json_GetFolderData(obj, function (sts, data) {
                if (sts && data) {
                    let res = JSON.parse(data);
                    if (res.Table) {
                        //setSections(res.Table);
                        let uniqueSecIDs = {};
                        const filteredArray = res.Table.filter(item => {
                            if (!uniqueSecIDs[item.SecID]) {
                                uniqueSecIDs[item.SecID] = true;
                                return true;
                            }
                            return false;
                        });
                        setSections(filteredArray);
                        console.log("Json_GetFolderData", res);
                        // Json_GetFolders();
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetFolderData", err);
        }
    }
    function Json_GetFolders() {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password
        }
        try {
            ClsSms.Json_GetFolders(obj, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let tbl = js.Table;
                        console.log("Json_GetFolders", tbl);
                        setFolders(tbl);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetFolders", err);
        }
    }
    const Json_GetSupplierListByProject = (folder_id = folderId) => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            ProjectId: folder_id
        };
        try {
            Cls.Json_GetSupplierListByProject(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        const clients_data = json?.Table;
                        let client_list = clients_data.filter((v, i, a) => a.findIndex(v2 => (v2["Company Name"] === v["Company Name"])) === i);
                        setClientList(client_list);

                        // console.log("gjjflsdjuroiu",clients_data);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetSupplierListByProject", err);
        }
    }
    useEffect(() => {
        Json_GetFolderData();
        Json_GetFolders();
        Json_GetSupplierListByProject();
    }, []);
    const format_YYYY_MM_DD = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setDocumentData({ ...documentData, [name]: value });
    }
    const Json_AdvanceSearchDoc = (obj) => {
        try {
            ClsSms.Json_AdvanceSearchDoc(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_AdvanceSearchDoc", json.Table6);
                        if (json.Table6 && json.Table6.length > 0) {
                            let fltDouble = [];
                            json.Table6.map((itm) => itm.Description).filter(item => {
                                if (!fltDouble.includes(item)) {
                                    fltDouble.push(item);
                                }
                            });
                            setDocumentData({
                                ClientId: "",
                                Description: "",
                                Email: Email,
                                IsUDF: "F",
                                ItemFDate: "01/01/1900",
                                ItemTDate: "01/01/1900",
                                ItemrecFDate: "01/01/1900",
                                ItemrecTDate: "01/01/1900",
                                ProjectId: folderId,
                                agrno: agrno,
                                password: password,
                                sectionId: "",
                                udflist: [],
                                udfvalueList: []
                            });
                            setSelectedClient({});
                            handleClose();
                            navigate("/dashboard/DocumentList", { state: { globalSearchDocs: json.Table6, strGlobal: documentData.Description } });
                            // setDocumentsDescription(fltDouble);
                            // setMyDocuments(json.Table6);
                        } else {
                            toast.error("Documents not found for this criteria");
                            handleClose();
                        }
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_AdvanceSearchDoc", err);
        }
    }

    const Json_SearchDocById = () => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            ItemId: documentId
        }
        try {
            ClsSms.Json_SearchDocById(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_SearchDocById", json[""]);

                        navigate("/dashboard/DocumentList", { state: { globalSearchDocs: json[""], strGlobal: documentData.Description } });
                        handleClose();
                        setDocumentId("");
                    } else {
                        toast.error("Document not found please check entered Id");
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_SearchDocById", err);
        }
    }

    const handleDocIdField = () => {
        setIsDocIdField(true);
        setDocumentData({
            ClientId: "",
            Description: "",
            Email: Email,
            IsUDF: "F",
            ItemFDate: "01/01/1900",
            ItemTDate: "01/01/1900",
            ItemrecFDate: "01/01/1900",
            ItemrecTDate: "01/01/1900",
            ProjectId: folderId,
            agrno: agrno,
            password: password,
            sectionId: "",
            udflist: [],
            udfvalueList: []
        });
    }

    return (
        <div style={{ top: globalSearchDocs && globalSearchDocs.length > 0 && "85px", right: globalSearchDocs && globalSearchDocs.length > 0 && "20px" }} className=''>
            <Button aria-describedby={id} variant="" className='min-width-auto btn-blu px-0' size='small' onClick={handleClick}>
                <TuneIcon />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}

                className='p-5'
            >
                <Box className='client-details-filter p-2'>

                    <Box className='mb-0'>

                        <Box className="input-search">
                            <TextField name="Description" onChange={(e) => handleInputChange(e)} id="outlined-basic" placeholder='Description...' size="small" variant="outlined" className='ps-0' />
                            <span className="material-symbols-outlined search-icon">search</span>
                        </Box>

                        {/* sadik */}
                        <Box sx={{ m: 1 }} className='pt-2'>
                            <DateRangePicker
                                initialSettings={{
                                    startDate: start.toDate(),
                                    endDate: end.toDate(),
                                    ranges: {
                                        'All': [
                                            moment({ year: 1990, month: 0, day: 1 }).toDate(),
                                            moment().toDate()
                                        ],
                                        Today: [moment().toDate(), moment().toDate()],
                                        Yesterday: [
                                            moment().subtract(1, 'days').toDate(),
                                            moment().subtract(1, 'days').toDate(),
                                        ],
                                        'Last 7 Days': [
                                            moment().subtract(6, 'days').toDate(),
                                            moment().toDate(),
                                        ],
                                        'Last 30 Days': [
                                            moment().subtract(29, 'days').toDate(),
                                            moment().toDate(),
                                        ],
                                        'This Month': [
                                            moment().startOf('month').toDate(),
                                            moment().endOf('month').toDate(),
                                        ],
                                        'Last Month': [
                                            moment().subtract(1, 'month').startOf('month').toDate(),
                                            moment().subtract(1, 'month').endOf('month').toDate(),
                                        ],
                                    },
                                }}
                                onCallback={handleCallback}
                            >

                                <div className='pointer d-flex align-items-center custom-datepicker-bordered' id="reportrange">
                                    <i className="fa fa-calendar"></i>
                                    <CalendarMonthIcon className='me-2 text-red' />
                                    <span className='font-14'>{label === "Invalid date - Invalid date" ? "All" : label}</span> <i className="fa fa-caret-down"></i>
                                </div>
                                {/* <div
                                id="reportrange"
                                className="col-4"
                                style={{
                                    background: '#fff',
                                    cursor: 'pointer',
                                    padding: '5px 10px',
                                    border: '1px solid #ccc',
                                    width: '100%',
                                }}
                            >

                                <i className="fa fa-calendar"></i>&nbsp;
                                <span>{label === "Invalid date - Invalid date" ? "All" : label}</span> <i className="fa fa-caret-down"></i>
                            </div> */}
                            </DateRangePicker>
                        </Box>

                        <hr className='mt-1' />

                        <Typography variant="Body2" className='font-14 sembold mb-1 text-black ps-2'>
                            Filter By
                        </Typography>

                        <Box className='d-flex'>

                            <FormControl sx={{ m: 1, width: '100%' }} size="small" className='select-border mt-0 mb-0'>
                                <BootstrapTooltip title="Sections" arrow
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
                                    <Select
                                        value={documentData.sectionId}
                                        name='sectionId'
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setSelectedSection(e.target.value);
                                            if (e.target.value === "Section") {
                                                // handleFilterDeletion('Section');
                                                setSelectedSection("");
                                                return;
                                            } else if (e.target.value !== '') {
                                                // setFilterCriteria({ ...filterCriteria, Section: [e.target.value] })
                                            } else {
                                                // handleFilterDeletion('Section');
                                            }
                                        }}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='custom-dropdown'
                                    >

                                        <MenuItem value="" style={{ display: "none" }}>
                                            Sections
                                        </MenuItem>
                                        <MenuItem value="Section" >00. Clear Filter</MenuItem>
                                        {sections.length > 0 && sections.map((itm) => {
                                            return <MenuItem value={itm.SecID}>{itm.Sec}</MenuItem>
                                        })}

                                        {/* <MenuItem value={10}>Section 1</MenuItem>
                                    <MenuItem value={20}>Section 2</MenuItem> */}
                                    </Select>
                                </BootstrapTooltip>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: '100%' }} size="small" className='select-border mt-0 mb-0'>
                                <BootstrapTooltip title="Folders" arrow
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
                                    <Select
                                        value={documentData.ProjectId}
                                        name='ProjectId'
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setSelectedFolder(e.target.value);
                                            if (e.target.value === "Folder") {
                                                // handleFilterDeletion("Folder");
                                                setSelectedFolder("");
                                                return;
                                            } else if (e.target.value !== '') {
                                                // setFilterCriteria({ ...filterCriteria, Folder: [e.target.value] });
                                            } else {
                                                // handleFilterDeletion('Folder');
                                            }
                                        }}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem value={""} style={{ display: "none" }}>Client</MenuItem>

                                        <MenuItem value="Folder" className='text-danger ps-1'>
                                            <ClearIcon className='font-18 me-1' />
                                            Clear Filters</MenuItem>

                                        {folders.length > 0 && folders.map((itm) => {
                                            return <MenuItem value={itm.FolderID} className='ps-1'>
                                                <FolderSharedIcon className='font-18 me-1' />
                                                {itm.Folder}</MenuItem>
                                        })}

                                    </Select>
                                </BootstrapTooltip>
                            </FormControl>
                        </Box>

                        {/* <hr /> */}
                        <Box className='d-flex'>
                            {isClientField ? <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                defaultValue={Object.keys(selectedClient).length > 0 ? selectedClient : { "Company Name": "Select" }}
                                onChange={(e, newValue) => {
                                    // console.log("djskfjlkfj",e.target.value);
                                    console.log("djskfjlkfj", newValue);
                                    if (newValue === null) {
                                        setSelectedClient({});
                                    }
                                    if (newValue) {
                                        setSelectedClient(newValue);
                                        setDocumentData({ ...documentData, ClientId: newValue.OriginatorNo });
                                    }
                                }}
                                options={clientList}
                                getOptionLabel={(option) => {
                                    return option["Company Name"];
                                }}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField value={selectedClient ? selectedClient["Company Name"] : ""} autoFocus={true} onBlur={() => setIsClientField(false)} {...params} size="small" />}
                            /> : <Button onClick={() => {
                                setIsClientField(true);
                            }}>
                                {Object.keys(selectedClient).length > 0 ? selectedClient["Company Name"] : "Reference"}
                            </Button>}

                            <FormControl sx={{ m: 1, width: '100%' }} size="small" className='select-border'>
                                <BootstrapTooltip title="Document ID" arrow
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
                                    {!isDocIdField ? <Button onClick={handleDocIdField}>
                                        {documentId !== "" ? documentId : "Document ID"}
                                    </Button> : <TextField autoFocus={true} name="Description" type='number' value={documentId} onChange={(e) => setDocumentId(e.target.value)} onBlur={(e) => {
                                        setIsDocIdField(false);
                                    }} id="outlined-basic" placeholder='Document ID...' size="small" variant="outlined" />}
                                </BootstrapTooltip>
                            </FormControl>
                        </Box>

                        <Button disabled={documentData.ClientId && documentData.Description && documentData.ProjectId && documentData.sectionId ? false : true} variant="contained" size="small" onClick={() => {

                            let formated_start_date = format_YYYY_MM_DD(start._d);
                            let formated_end_date = format_YYYY_MM_DD(end._d);

                            let obj = { ...documentData, ItemFDate: formated_start_date, ItemTDate: formated_end_date };
                            setDocumentData({ ...documentData, ItemFDate: formated_start_date, ItemTDate: formated_end_date });
                            Json_AdvanceSearchDoc(obj);

                        }}>
                            Apply
                        </Button>

                        {documentId !== "" && <Typography onClick={() => {
                            Json_SearchDocById();
                        }} variant="Body2" className='font-14 sembold mb-1 text-black ps-2'>
                            By ID
                        </Typography>}

                        {/*
                                <Box className='d-flex'>
                                    <FormControl sx={{ m: 1, width: '100%' }} size="small" className='select-border mt-0 '>
                                        <BootstrapTooltip title="Group By" arrow
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
                                            <Select
                                                value={selectedGroup}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='custom-dropdown'
                                                onChange={(e) => {
                                                    if (e.target.value === "Group By") {
                                                        setSelectedGroup("");
                                                        return;
                                                    }
                                                    setSelectedGroup(e.target.value);
                                                }}
                                            >
                                                <MenuItem value="" style={{ display: "none" }}> Group By</MenuItem>
                                                <MenuItem className='ps-1 text-red' value="Group By">
                                                    <CloseIcon className='font-18 me-1' />
                                                    Clear Group by</MenuItem>
                                                <MenuItem className='ps-1' value="Description">
                                                    <DescriptionIcon className='font-18 me-1' />
                                                    Description</MenuItem>
                                                <MenuItem className='ps-1' value={"CommentBy"}>
                                                    <InsertCommentIcon className='font-18 me-1' />
                                                    Comment By</MenuItem>
                                                <MenuItem className='ps-1' value={"Type"}>
                                                    <ChecklistIcon className='font-18 me-1' />
                                                    Type</MenuItem>
                                            </Select>
                                        </BootstrapTooltip>
                                    </FormControl>

                                    <FormControl sx={{ m: 1, width: '100%' }} size="small" className='select-border mt-0'>
                                        <BootstrapTooltip title="Sort By" arrow
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
                                            <Select
                                                value={sortByProperty}
                                                onChange={(e) => {
                                                    if (e.target.value === "Sort By") {
                                                        setSortByProperty("")
                                                        return;
                                                    }
                                                    setSortByProperty(e.target.value)
                                                }
                                                }
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='custom-dropdown'
                                            >
                                                <MenuItem value="" style={{ display: "none" }}>
                                                    <SwapVertIcon className='pe-1' /> Sort By
                                                </MenuItem>
                                                <MenuItem className='ps-1' value="None" onClick={() => setAdvFilteredResult([])}><WarningIcon className='ps-1' />  Clear Sortby</MenuItem>
                                                <MenuItem value={"Date"} className='ps-1'>
                                                    <CalendarMonthIcon className='pe-1' />
                                                    By Date</MenuItem>
                                                <MenuItem value={"Description"} className='ps-1'><DescriptionIcon className='pe-1' />
                                                    By Description</MenuItem>
                                            </Select>
                                        </BootstrapTooltip>
                                    </FormControl>

                                    {sortByProperty !== "" && sortByProperty !== "None" && <Checkbox
                                        {...label}
                                        icon={<UpgradeIcon />}
                                        checkedIcon={<VerticalAlignBottomIcon />}
                                        className='p-0'
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                // handleAscendingSort();
                                            } else {
                                                // handleDescendingSort();
                                            }
                                        }}
                                    />}
                                </Box> */}




                        {/* <Button className='btn-blue-2 mb-1 ms-1' onClick={() => handleDocumentsFilter("LastMonth")}>Save View</Button> */}

                        {/* <FormControlLabel control={<Switch />} label="Save View" className='ms-2' /> */}

                    </Box>

                </Box>
            </Popover>
        </div>
    )
}

export default TestForDetails