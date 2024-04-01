import React, { useEffect, useState } from 'react';
import CommanCLS from '../../services/CommanService';
import DescriptionIcon from '@mui/icons-material/Description';
import DataGrid, {
    Column, FilterRow, Search, SearchPanel, Selection,
    HeaderFilter, Scrolling,
    FilterPanel,
    Pager, Paging, DataGridTypes, FormGroup,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { Box, Typography, Button, Paper, Grid, TextField, Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppsIcon from '@mui/icons-material/Apps';
import DocumentDetails from '../../components/DocumentDetails';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DnsIcon from '@mui/icons-material/Dns';
import CloseIcon from '@mui/icons-material/Close';
import TableRowsIcon from '@mui/icons-material/TableRows';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import Checkbox from '@mui/material/Checkbox';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useLocation } from 'react-router-dom';
import CustomBreadCrumbs from '../../components/CustomBreadCrumbs';
import CustomLoader from '../../components/CustomLoader';
import ClearIcon from '@mui/icons-material/Clear';
import SubjectIcon from '@mui/icons-material/Subject';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import WarningIcon from '@mui/icons-material/Warning';
import Popover from '@mui/material/Popover';
import TuneIcon from '@mui/icons-material/Tune';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Layout = styled('div')`  display: flex;
  flex-flow: column nowrap;  gap: 4px;
`;
const AutocompleteWrapper = styled('div')`  position: relative;
`;

const blue = {
    100: '#DAECFF',
    200: '#99CCF3', 400: '#3399FF',
    500: '#007FFF', 600: '#0072E5',
    700: '#0059B2', 900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2', 200: '#DAE2ED',
    300: '#C7D0DD', 400: '#B0B8C4',
    500: '#9DA8B7', 600: '#6B7A90',
    700: '#434D5B', 800: '#303740',
    900: '#1C2025',
};

const AutocompleteRoot = styled('div')(({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;  font-weight: 400;
  border-radius: 8px;  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};
  display: flex;  gap: 5px;
  padding-right: 5px;  overflow: hidden;
  width: 320px;
  &.Mui-focused {    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};  }
  &:hover {
    border-color: ${blue[400]};  }
  &:focus-visible {
    outline: 0;
  }`,
);
const Input = styled('input')(
    ({ theme }) => `  font-size: 0.875rem;
  font-family: inherit;  font-weight: 400;
  line-height: 1.5;  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;  border: none;
  border-radius: inherit;  padding: 8px 12px;
  outline: 0;  flex: 1 0 auto;
`,);
const Listbox = styled('ul')(
    ({ theme }) => `  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;  box-sizing: border-box;
  padding: 6px;  margin: 12px 0;
  max-width: 320px;  border-radius: 12px;
  overflow: auto;  outline: 0px;
  max-height: 300px;  z-index: 1;
  position: absolute;  left: 0;
  right: 0;  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'};
  `,);
const Option = styled('li')(
    ({ theme }) => `  list-style: none;
  padding: 8px;  border-radius: 8px;
  cursor: default;
  &:last-of-type {    border-bottom: none;
  }
  &:hover {    cursor: pointer;
  }
  &[aria-selected=true] {    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};  }
  &.base--focused,
  &.base--focusVisible {    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};  }
  &.base--focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};  }
  &[aria-selected=true].base--focused,
  &[aria-selected=true].base--focusVisible {    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};  }
  `,);

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function DocumentList({ clientId }) {
    const location = useLocation();
    const { globalSearchDocs, strGlobal } = location.state;
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    let Cls = new CommanCLS(baseUrl, agrno, Email, password);
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
    const [selectedClient, setSelectedClient] = useState("");

    // for date datepicker
    const [state, setState] = useState({
        start: moment().subtract(29, 'days'),
        end: moment(),
    });
    const { start, end } = state;

    const formatDatePickerDate = (dateString) => {
        const dateObject = new Date(dateString);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 to adjust for zero-based index
        const year = dateObject.getFullYear();

        return `${day}/${month}/${year}`;
    }

    // for filter criteria
    const [filterCriteria, setFilterCriteria] = useState({
        "Item Date": [formatDatePickerDate(start._d), formatDatePickerDate(end._d)]
    });
    // setTimeout(()=>{
    //     setFilterCriteria({...filterCriteria,"Item Date": [formatDatePickerDate(start._d),formatDatePickerDate(end._d)]});
    // },1000);
    const [dataNotFoundBoolean, setDataNotFoundBoolean] = useState(false);


    const testDocumentsKey = [
        { key: "Registration No.", value: "Registration No" },
        { key: "SenderId", value: "Filled By" },
        { key: "SubSection", value: "Sub Section" },
        { key: "Description", value: "Document Name" },
        { key: "Category", value: "Category" },
        { key: "Notes", value: "Has Notes" },
        { key: "Attach", value: "Has Attachments" },
        { key: "Type", value: "Document Type" },
        { key: "Comments", value: "Comment" },
        { key: "CommentBy", value: "Comment By" }
    ];


    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };


    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    const [fromDate, setFormDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleSearchOpen = (text) => {
        if (text === "InputSearch") {
            setIsSearchOpen(!isSearchOpen);
        } else {
            setIsSearchOpen(false);
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
                        // console.log("Json_GetFolders", tbl);
                        setFolders(tbl);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetFolders", err);
        }
    }

    const Json_GetFolderData = () => {
        let obj = {
            ClientId: "", Email: Email, ProjectId: folderId, SectionId: "-1", agrno: agrno, password: password
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
                        Json_GetFolders();
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetFolderData", err);
        }
    }

    const Json_ExplorerSearchDoc = () => {
        try {
            let obj = {};
            obj.ProjectId = folderId;
            obj.ClientId = clientId;
            obj.sectionId = "-1";
            if (globalSearchDocs.length > 0) {
                let fltDouble = [];
                globalSearchDocs.map(itm => itm.Client).filter(item => {
                    if (!fltDouble.includes(item)) {
                        fltDouble.push(item);
                    }
                });
                setClientList(fltDouble);

                setTimeout(() => {
                    let docKeys = Object.keys(globalSearchDocs[0]);
                    // console.log("documentKeys",docKeys);
                    setDocumentKeys(docKeys);
                    setDocuments(globalSearchDocs);
                    handleDocumentsFilter(globalSearchDocs);
                    let desc = globalSearchDocs.filter((item) => item.Description !== "");
                    setgroupedOptions(desc);
                    setIsLoading(false);
                }, 1000);

                // return;
            } else {
                Cls.Json_ExplorerSearchDoc(obj, function (sts, data) {
                    if (sts && data) {
                        console.log("ExplorerSearchDoc", JSON.parse(data));
                        let json = JSON.parse(data);
                        if (json?.Table6?.length > 0) {
                            let docs = json.Table6;
                            if (docs?.length > 0) {
                                if (globalSearchDocs.length === 0) {
                                    let docKeys = Object.keys(docs[0]);
                                    setDocumentKeys(docKeys);
                                    docs.map((itm) => itm["Item Date"] = formatDate(itm["Item Date"]));
                                    setDocuments(docs);
                                    handleDocumentsFilter(docs);
                                    // setAdvFilteredResult(docs);

                                    let desc = docs.filter((item) => item.Description !== "");
                                    setgroupedOptions(desc);
                                }
                                Json_GetFolderData();
                            }
                        }
                    }
                })
            }
            Json_GetFolderData();
        } catch (error) {
            console.log("ExplorerSearchDoc", error)
        }
    }

    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        Json_ExplorerSearchDoc();
    }, []);
    const handleSearch = (text) => {
        if (documents.length > 0) {
            let filteredDocuments = documents.filter((item) => {
                return Object.entries(item).join("").toLowerCase().includes(text.toLowerCase());
            });
            setFilteredDocResult(filteredDocuments);
        }
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // January is 0, so add 1 to get the correct month
        const year = date.getFullYear();
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
        return `${paddedDay}/${paddedMonth}/${year}`;
    }

    function getRootProps(params) { }
    function getListboxProps(params) { }

    const handleSearchByProperty = (flitData) => {
        // console.log(searchByPropertyKey, "--------", searchByPropertyInput);
        setFilterCriteria({ ...filterCriteria, [searchByPropertyKey]: [searchByPropertyInput] });

        setSearchByPropertyInput("");
        setSearchByPropertyKey("");
    }

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/');
        return new Date(year, month - 1, day); // month - 1 because month is 0-indexed in Date objects
    }

    function handleAscendingSort() {
        if (sortByProperty === "Date") {
            if (isGroupBy) {
                let sortedData = [...documents].sort((a, b) => parseDate(a["Item Date"]) - parseDate(b["Item Date"]));
                let data = groupByProperty(sortedData, selectedGroup);
                setGroupByFilterResult(data);
            } else {
                if (advFilteredResult.length > 0) {
                    let sortedData = [...advFilteredResult].sort((a, b) => parseDate(a["Item Date"]) - parseDate(b["Item Date"]));
                    setAdvFilteredResult(sortedData);
                } else {
                    let sortedData = [...documents].sort((a, b) => parseDate(a["Item Date"]) - parseDate(b["Item Date"]));
                    setAdvFilteredResult(sortedData);
                }
            }

        } else if (sortByProperty === "Description") {
            if (isGroupBy) {
                let sortedData = [...documents].sort((a, b) => a["Description"].localeCompare(b["Description"]));
                let data = groupByProperty(sortedData, selectedGroup);
                setGroupByFilterResult(data);
            } else {
                if (advFilteredResult.length > 0) {
                    let sortedData = [...advFilteredResult].sort((a, b) => a["Description"].localeCompare(b["Description"]));
                    setAdvFilteredResult(sortedData);
                } else {
                    let sortedData = [...documents].sort((a, b) => a["Description"].localeCompare(b["Description"]));
                    setAdvFilteredResult(sortedData);
                }
            }

        }
    }

    function handleDescendingSort() {
        if (sortByProperty === "Date") {
            if (isGroupBy) {
                let sortedData = [...documents].sort((a, b) => parseDate(b["Item Date"]) - parseDate(a["Item Date"]));
                let data = groupByProperty(sortedData, selectedGroup);
                setGroupByFilterResult(data);
            } else {
                if (advFilteredResult.length > 0) {
                    let sortedData = [...advFilteredResult].sort((a, b) => parseDate(b["Item Date"]) - parseDate(a["Item Date"]));
                    setAdvFilteredResult(sortedData);
                } else {
                    let sortedData = [...documents].sort((a, b) => parseDate(b["Item Date"]) - parseDate(a["Item Date"]));
                    setAdvFilteredResult(sortedData);
                }
            }
        } else if (sortByProperty === "Description") {
            if (isGroupBy) {
                let sortedData = [...documents].sort((a, b) => b["Description"].localeCompare(a["Description"]));
                let data = groupByProperty(sortedData, selectedGroup);
                setGroupByFilterResult(data);
            } else {
                if (advFilteredResult.length > 0) {
                    let sortedData = [...advFilteredResult].sort((a, b) => b["Description"].localeCompare(a["Description"]));
                    setAdvFilteredResult(sortedData);
                } else {
                    let sortedData = [...documents].sort((a, b) => b["Description"].localeCompare(a["Description"]));
                    setAdvFilteredResult(sortedData);
                }
            }
        }
    }

    function groupByProperty(data, property) {
        return data.reduce((acc, obj) => {
            const value = obj[property];
            acc[value] = acc[value] || [];
            acc[value].push(obj);
            return acc;
        }, {});
    }
    function handleSearchBySuggestionList(val) {
        if (val !== "") {
            setSearchByPropertyKey(val);
            if (advFilteredResult.length > 0) {
                let filteredData = advFilteredResult.filter((itm) => {
                    if (itm[val] !== "" && itm[val] !== null && itm[val] !== undefined) {
                        return itm[val];
                    }
                }).map((itm) => String(itm[val]));
                if (filteredData) {
                    let fltData = [...new Set(filteredData)];
                    // console.log("Suggestion List : ", fltData)
                    setSuggestionList(fltData);
                    setSearchByPropertyInput("");
                }
            } else {
                let filteredData = documents.filter((itm) => {
                    if (itm[val] !== "" && itm[val] !== null && itm[val] !== undefined) {
                        return itm[val];
                    }
                }).map((itm) => String(itm[val]));
                if (filteredData) {
                    let fltData = [...new Set(filteredData)];
                    // console.log("Suggestion List : ", fltData)
                    setSuggestionList(fltData);
                    setSearchByPropertyInput("");
                }
            }
            //console.log("Suggestion List : ", filteredData)
        }
    }

    function handleFilterDeletion(target) {
        let obj = Object.keys(filterCriteria).filter(objKey =>
            objKey !== target).reduce((newObj, key) => {
                newObj[key] = filterCriteria[key];
                return newObj;
            }, {}
            );
        setFilterCriteria(obj);
    }

    const handleCallback = (start, end) => {
        // console.log("Start: ",start._d);
        // console.log("End: ",end._d);
        // console.log("Start: ",start._i);
        // console.log("End: ",end._i);
        if (start._i === "All" && end._i === "All") {
            handleFilterDeletion('Item Date');
            // let obj = Object.keys(filterCriteria).filter(objKey =>
            //     objKey !== 'Item Date').reduce((newObj, key) =>
            //     {
            //         newObj[key] = filterCriteria[key];
            //         return newObj;
            //     }, {}
            // );
            // setFilterCriteria(obj);

        } else {
            let startDate = formatDatePickerDate(start._d);
            let endDate = formatDatePickerDate(end._d);
            setFilterCriteria({ ...filterCriteria, "Item Date": [startDate, endDate] });
        }
        setState({ start, end });
    };

    const label =
        start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY');

    function handleDocumentsFilter(docs) {
        let fltData = docs.filter(function (obj) {
            return Object.keys(filterCriteria).every(function (key) {
                if (filterCriteria[key][0].length > 0) {
                    if (obj[key] && obj[key] !== undefined && obj[key] !== "") {
                        if (key === "Item Date") {
                            let d = obj[key].split("/");
                            let df = `${d[2]}-${d[1]}-${d[0]}`
                            // console.log("For Filter Criteria Before",df);
                            let docDate = new Date(df);
                            // console.log("For Filter Criteria",docDate);
                            let d1 = filterCriteria[key][0].split("/");
                            let df1 = `${d1[2]}-${d1[1]}-${d1[0]}`;
                            let fltD1 = new Date(df1);
                            let d2 = filterCriteria[key][1].split("/");
                            let df2 = `${d2[2]}-${d2[1]}-${d2[0]}`;
                            let fltD2 = new Date(df2);

                            return docDate >= fltD1 && docDate <= fltD2;

                            // console.log("For Filter Criteria",df1,"------------",df2);
                            // console.log("For Filter Criteria",fltD1,"------------",fltD2);
                        } else {
                            return obj[key].toString().toLowerCase().includes(filterCriteria[key][0].toString().toLowerCase());
                        }
                        // return obj[key].toString().toLowerCase().includes(my_criteria[key][0].toString().toLowerCase());
                    }
                }
            });
        });
        if (fltData.length === 0) {
            setDataNotFoundBoolean(true);
            return;
        }
        setDataNotFoundBoolean(false);
        setAdvFilteredResult(fltData);
        setIsLoading(false);
    }
    useEffect(() => {
        handleDocumentsFilter(documents);
    }, [filterCriteria]);

    const handleFilterOnClientSelection = (e) => {
        let val = e.target.value;
        setSelectedClient(val);
        if (val === "Reference") {
            setSelectedClient("");
            handleFilterDeletion("Client");
            return;
        } else if (val !== "") {
            setFilterCriteria({ ...filterCriteria, Client: val });
        } else {
            handleFilterDeletion("Client");
        }
    }


    // 
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <>
            {globalSearchDocs.length > 0 && <CustomBreadCrumbs tabs={[{ tabLink: "/dashboard/SearchResult?str=" + strGlobal, tabName: "Search Result" }, { tabLink: "/dashboard/DocumentList", tabName: "Documents List" }]} />}

            {isLoading ? <CustomLoader /> : <>



                <div className='main-client-details-filter'>
                    <Button aria-describedby={id} variant="" className='min-width-auto' onClick={handleClick}>
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
                            <Typography variant="Body2" className='font-14 sembold mb-2 text-black'>
                                View
                            </Typography>

                            <div className='text-center mb-2 client-details-filter-btn d-flex'>
                                <ToggleButton className='w-100' value="left" aria-label="left aligned" onClick={() => setToggleScreen({ singleCardView: true, multipleCardView: false, tableGridView: false })}>
                                    <DnsIcon />
                                </ToggleButton>
                                <ToggleButton className='w-100' value="center" aria-label="centered" onClick={() => setToggleScreen({ singleCardView: false, multipleCardView: true, tableGridView: false })}>
                                    <AppsIcon />
                                </ToggleButton>
                                <ToggleButton className='w-100' value="right" aria-label="right aligned" onClick={() => setToggleScreen({ singleCardView: false, multipleCardView: false, tableGridView: true })}>
                                    <TableRowsIcon />
                                </ToggleButton>
                            </div>

                            <Box className='mb-2'>
                                {/* sadik */}
                                <Box sx={{ m: 1 }}>
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


                                <FormControl sx={{ m: 1, width: '120px' }} size="small" className='select-border'>
                                    <Select
                                        value={selectedSection}
                                        onChange={(e) => {
                                            setSelectedSection(e.target.value);
                                            if (e.target.value === "Section") {
                                                handleFilterDeletion('Section');
                                                setSelectedSection("");
                                                return;
                                            } else if (e.target.value !== '') {
                                                setFilterCriteria({ ...filterCriteria, Section: [e.target.value] })
                                            } else {
                                                handleFilterDeletion('Section');
                                                // let obj = Object.keys(filterCriteria).filter(objKey =>
                                                //     objKey !== 'Section').reduce((newObj, key) =>
                                                //     {
                                                //         newObj[key] = filterCriteria[key];
                                                //         return newObj;
                                                //     }, {}
                                                // );
                                                // setFilterCriteria(obj);
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
                                            return <MenuItem value={itm.Sec}>{itm.Sec}</MenuItem>
                                        })}

                                        {/* <MenuItem value={10}>Section 1</MenuItem>
                                    <MenuItem value={20}>Section 2</MenuItem> */}
                                    </Select>
                                </FormControl>


                                <FormControl sx={{ m: 1, width: '90px' }} size="small" className='select-border'>
                                    <Select
                                        value={selectedFolder}
                                        onChange={(e) => {
                                            setSelectedFolder(e.target.value);
                                            if (e.target.value === "Folder") {
                                                handleFilterDeletion("Folder");
                                                setSelectedFolder("");
                                                return;
                                            } else if (e.target.value !== '') {
                                                setFilterCriteria({ ...filterCriteria, Folder: [e.target.value] });
                                            } else {
                                                handleFilterDeletion('Folder');
                                                // let obj = Object.keys(filterCriteria).filter(objKey =>
                                                //     objKey !== 'Folder').reduce((newObj, key) =>
                                                //     {
                                                //         newObj[key] = filterCriteria[key];
                                                //         return newObj;
                                                //     }, {}
                                                // );
                                                // setFilterCriteria(obj);
                                            }
                                        }}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem value="" style={{ display: "none" }}>Folders</MenuItem>

                                        <MenuItem value="Folder" className='text-danger ps-1'>
                                            <ClearIcon className='font-18 me-1' />
                                            Clear Filters</MenuItem>

                                        {folders.length > 0 && folders.map((itm) => {
                                            return <MenuItem value={itm.Folder} className='ps-1'>
                                                <FormatAlignJustifyIcon className='font-18 me-1' />
                                                {itm.Folder}</MenuItem>
                                        })}
                                        {/* <MenuItem value="">
                                        Select
                                    </MenuItem>
                                    <MenuItem value={10}>Select 1</MenuItem>
                                    <MenuItem value={20}>Select 2</MenuItem> */}
                                    </Select>
                                </FormControl>

                                <Box className='d-flex'>
                                    <FormControl sx={{ m: 1, width: '120px' }} size="small" className='select-border'>
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
                                            {/* <MenuItem className='ps-1' value={"Comments"}>
                                    <CloseIcon className='font-18 me-1' />
                                        Comments</MenuItem> */}
                                            {/* <MenuItem value={20}>Comment</MenuItem> */}
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{ m: 1, width: '120px' }} size="small" className='select-border'>
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
                                            <MenuItem value="None" onClick={() => setAdvFilteredResult([])}><WarningIcon className='pe-1' />  Clear Sortby</MenuItem>
                                            <MenuItem value={"Date"}>
                                                <CalendarMonthIcon className='pe-1' />
                                                By Date</MenuItem>
                                            <MenuItem value={"Description"}><DescriptionIcon className='pe-1' />
                                                By Description</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {sortByProperty !== "" && sortByProperty !== "None" && <Checkbox
                                        {...label}
                                        icon={<UpgradeIcon />}
                                        checkedIcon={<VerticalAlignBottomIcon />}
                                        className='p-0'
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                handleAscendingSort();
                                            } else {
                                                handleDescendingSort();
                                            }
                                        }}
                                    />}
                                </Box>

                                {globalSearchDocs.length > 0 && <FormControl sx={{ m: 1, width: '110px' }} size="small" className='select-border'>
                                    <Select
                                        value={selectedClient}
                                        onChange={handleFilterOnClientSelection}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem value="" style={{ display: "none" }}>
                                            Select Reference
                                        </MenuItem>
                                        {clientList.length > 0 && clientList.map(itm => <MenuItem value={itm}>{itm}</MenuItem>)}
                                    </Select>
                                </FormControl>}


                                {/* <Button className='btn-blue-2 mb-1 ms-1' onClick={() => handleDocumentsFilter("LastMonth")}>Save View</Button> */}

                                {/* <FormControlLabel control={<Switch />} label="Save View" className='ms-2' /> */}

                            </Box>



                        </Box>


                    </Popover>
                </div>





                {toggleScreen.tableGridView ? <Box className='table-responsive table-grid table-grid-2'>
                    <DataGrid
                        id="dataGrid"
                        style={{ width: "100%" }}
                        dataSource={dataNotFoundBoolean ? [] : advFilteredResult.length > 0 ? advFilteredResult : documents}
                        columnAutoWidth={true}
                        showBorders={true}>
                        <Column dataField="Description" dataType="string" caption="Discount" />
                        <Column dataField="Section" dataType="string" caption="Section" />
                        <Column dataField="SubSection" dataType="string" caption="Sub" />
                        <Column dataField="Item Date" dataType="date" caption="Doc. Date" />
                        <Column dataField="Received Date" dataType="date" caption="Received Date" />
                        <Column dataField="Category" dataType="string" caption="Category" />
                        <Column dataField="Client" dataType="string" caption="Reference" />
                        <Column dataField="FileSize" dataType="string" caption="File Size" />
                        <FilterRow visible={true} />
                        <FilterPanel visible={true} />
                        <HeaderFilter visible={true} />
                        <Scrolling mode="standard" />
                        <Selection
                            mode="multiple"
                        />
                        <Paging defaultPageSize={20} />
                        <Pager
                            visible={true} />
                        <SearchPanel
                            visible={true}
                            width={240}
                            placeholder="Search..." />
                    </DataGrid>
                </Box> : <Grid
                    container
                    justifyContent="center"
                    alignItems="center"

                >
                    <Grid item xs={12} sm={10} md={toggleScreen.multipleCardView ? 12 : 6} lg={toggleScreen.multipleCardView ? 12 : 7} className='white-box'>
                        <Box className={toggleScreen.multipleCardView ? 'd-flex m-auto justify-content-start w-100 align-items-end' : 'd-flex m-auto w-100 align-items-en'}>
                            {isAdvFilter === false && <Layout className=''>
                                <AutocompleteWrapper className='mb-2'>
                                    <AutocompleteRoot
                                        sx={{
                                            borderColor: '#D5D5D5',
                                            color: 'success.main',
                                        }}
                                        {...getRootProps()}
                                    // className={focused ? 'Mui-focused' : ''}
                                    >
                                        <span className="material-symbols-outlined search-icon">search</span>
                                        <Input onBlur={() => setIsSearchOpen(false)} onClick={() => handleSearchOpen("InputSearch")} onChange={(e) => handleSearch(e.target.value)} placeholder='Search' className='ps-0'
                                        />
                                    </AutocompleteRoot>
                                    {isSearchOpen ? (groupedOptions.length > 0 && (
                                        <Listbox {...getListboxProps()}>
                                            {filteredDocResult.length === 0 ? groupedOptions.map((option, index) => (
                                                <Option onClick={handleSearchOpen}>{option.Description}</Option>
                                            )) : filteredDocResult.map((option, index) => (
                                                <Option onClick={handleSearchOpen}>{option.Description}</Option>
                                            ))}
                                        </Listbox>
                                    )) : ""}
                                </AutocompleteWrapper>
                            </Layout>}
                            {isAdvFilter && <><Box className={toggleScreen.multipleCardView ? 'row pe-3 d-non' : 'row w-100 pe-3 d-non'}>
                                <Box className='col-md-6'>
                                    <Box className='custom-dropdown-2'>
                                        <FormControl fullWidth size='small'>
                                            <InputLabel id="demo-simple-select-label" className='font-14'>Select Property</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={searchByPropertyKey}
                                                label="Select Property"
                                                onChange={(e) => handleSearchBySuggestionList(e.target.value)}
                                            >
                                                {testDocumentsKey.length > 0 && testDocumentsKey.filter((option) => {
                                                    return !Object.keys(filterCriteria).includes(option.key)
                                                }).map((itm) => {
                                                    return <MenuItem value={itm.key}>{itm.value}</MenuItem>
                                                })}
                                                {/* <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                                <Box className='col-md-6 px-0'>
                                    <Box className='mb-2'>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={suggestionList}
                                            defaultValue={""}
                                            // sx={{ width: 300 }}
                                            size='small'
                                            value={searchByPropertyInput}
                                            onChange={(event, newValue) => {
                                                // console.log("newValue", newValue);
                                                // console.log("event", event.target.value);
                                                setSearchByPropertyInput(newValue !== null ? String(newValue) : "")
                                            }}
                                            renderInput={(params) => <TextField {...params} value={searchByPropertyInput} onChange={(e) => setSearchByPropertyInput(e.target.value)} label="Value" />}
                                        />
                                    </Box>
                                </Box>
                            </Box>

                                <Button disabled={searchByPropertyKey !== "" && searchByPropertyInput !== "" ? false : true} className={searchByPropertyKey !== "" && searchByPropertyInput !== "" ? 'btn-blue-2 mb-2 ms-2' : 'btn-blue-2 btn-grey-2 mb-2 ms-2'} onClick={() => handleSearchByProperty()}>Submit</Button></>}
                            <Button className='btn-blue-2 mb-2 ms-2' onClick={() => setIsAdvFilter(!isAdvFilter)}>{!isAdvFilter ? "Advanced Search" : "Simple"}</Button>
                        </Box>

                        <Box className='d-flex flex-wrap justify-content-between'>
                            <Box className='mt-2'>
                                <Stack direction="row" spacing={1}>
                                    {/* <Chip label="Client: patrick" variant="outlined" onDelete={handleDelete} />
                                        <Chip label="Tell: 65456" variant="outlined" onDelete={handleDelete} /> */}
                                    {Object.keys(filterCriteria).length > 0 && Object.keys(filterCriteria).map((key) => {
                                        if (!["Item Date", "Folder", "Section", "Client"].includes(key)) {
                                            return <Chip label={`${key}: ${filterCriteria[key][0]}`} variant="outlined" onDelete={() => {
                                                handleFilterDeletion(key);
                                            }} />
                                        }
                                    }
                                    )}
                                </Stack>
                            </Box>
                        </Box>

                        <Box className='client-details-scroll' name='client-details-scroll-search'>
                            {/* Es component me document ki list show hoti he details nhi, Iska mujhe naam sahi karna he */}
                            {toggleScreen.singleCardView && <DocumentDetails groupByFilterResult={groupByFilterResult} isGroupBy={isGroupBy} documents={documents} advFilteredResult={advFilteredResult} dataNotFoundBoolean={dataNotFoundBoolean} selectedGroup={selectedGroup}></DocumentDetails>}
                            {toggleScreen.multipleCardView &&
                                <Box className='row'>
                                    {advFilteredResult.length > 0 ? (
                                        advFilteredResult.map((itm) => {
                                            return <>
                                                <Box className='col-xxl-3 col-xl-4 col-md-6'>
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
                                                                        {itm.Description ? itm.Description : "Demo"}
                                                                    </Typography>
                                                                    <Typography variant="body1">
                                                                        {/* Size: {itm["FileSize"] ? itm["FileSize"] : "0.00KB"}  */}
                                                                        Date {itm["Item.Date"] ? itm["Item.Date"] : ""} |
                                                                        Uploaded by <span className='sembold'>Patrick</span>
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </label>
                                                    </Box>
                                                </Box>
                                            </>
                                        })
                                    ) : (documents.length > 0 && documents.map((itm) => {
                                        return <>
                                            <Box className='col-xxl-3 col-xl-4 col-md-6'>
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
                                                                    {itm.Description ? itm.Description : "Demo"}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {/* Size: {itm["FileSize"] ? itm["FileSize"] : ""} |  */}
                                                                    Date {itm["Item.Date"] ? itm["Item.Date"] : ""} |
                                                                    Uploaded by <span className='sembold'>Patrick</span>
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </label>
                                                </Box>
                                            </Box>
                                        </>
                                    }))}
                                </Box>
                            }
                        </Box>
                    </Grid>
                </Grid>}
            </>}
        </>
    );
}