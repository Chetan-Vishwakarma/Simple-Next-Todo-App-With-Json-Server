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

    // for date datepicker
    const [state, setState] = useState({
        start: moment().subtract(29, 'days'),
        end: moment(),
    });
    const { start, end } = state;
    
    const formatDatePickerDate = (dateString) =>{
        const dateObject = new Date(dateString);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 to adjust for zero-based index
        const year = dateObject.getFullYear();
        
        return `${day}/${month}/${year}`;
    }

    // for filter criteria
    const [filterCriteria,setFilterCriteria] = useState({
        "Item Date": [formatDatePickerDate(start._d),formatDatePickerDate(end._d)]
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
            Cls.Json_ExplorerSearchDoc(obj, function (sts, data) {
                if (sts && data) {
                    console.log("ExplorerSearchDoc", JSON.parse(data));
                    let json = JSON.parse(data);
                    if (json?.Table6?.length > 0) {
                        // let docs = json.Table6.length >= 100 ? json.Table6.slice(0, 80) : json.Table6;
                        let docs = json.Table6;
                        if (docs?.length > 0) {
                            let docKeys = Object.keys(docs[0]);
                            // console.log("documentKeys",docKeys);
                            setDocumentKeys(docKeys);

                            docs.map((itm) => itm["Item Date"] = formatDate(itm["Item Date"]));
                            //docs.map((itm)=>console.log("check in map",itm["Item Date"]));
                            setDocuments(docs);
                            handleDocumentsFilter(docs);
                            let desc = docs.filter((item) => item.Description !== "");
                            // console.log("desc", desc);
                            setgroupedOptions(desc);
                            Json_GetFolderData();
                        }
                    }
                }
            })
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

    function getLastDay() {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = currentDate.getFullYear();

        return day < 10 && month < 10 ? `0${day}/0${month}/${year}` : day < 10 && month >= 10 ? `0${day}/${month}/${year}` : day >= 10 && month < 10 ? `${day}/0${month}/${year}` : `${day}/${month}/${year}`;
    }

    function getLastWeek() {
        const currentDate = new Date();
        const sevenDaysAgoDate = new Date(currentDate);
        sevenDaysAgoDate.setDate(currentDate.getDate() - 7);

        const day = sevenDaysAgoDate.getDate();
        const month = sevenDaysAgoDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = sevenDaysAgoDate.getFullYear();

        return day < 10 && month < 10 ? `0${day}/0${month}/${year}` : day < 10 && month >= 10 ? `0${day}/${month}/${year}` : day >= 10 && month < 10 ? `${day}/0${month}/${year}` : `${day}/${month}/${year}`;
    }

    function getRootProps(params) { }
    function getListboxProps(params) { }

    const handleSearchByProperty = (flitData) => {
        console.log(searchByPropertyKey,"--------",searchByPropertyInput);
        setFilterCriteria({...filterCriteria,[searchByPropertyKey]:[searchByPropertyInput]});
        // if (flitData && searchByPropertyKey === "" && searchByPropertyInput === "") {
        //     if (flitData.length === 0) {
        //         setAdvFilteredResult([]);
        //     }
        //     setBulkSearch(flitData);
        // } else {
        //     let arr = [];
        //     if (searchByPropertyKey !== "" && searchByPropertyInput !== "") {
        //         // arr = [...bulkSearch, { key: searchByPropertyKey, value: searchByPropertyInput }];
        //     } else {
        //         // arr = [...bulkSearch];
        //     }
        //     // console.log("arr",arr)
        //     setBulkSearch(arr);
        // }

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
            if(advFilteredResult.length>0){
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
            }else{
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

    function handleFilterDeletion(target){
        let obj = Object.keys(filterCriteria).filter(objKey =>
            objKey !== target).reduce((newObj, key) =>
            {
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
        if(start._i==="All"&&end._i==="All"){
            handleFilterDeletion('Item Date');
            // let obj = Object.keys(filterCriteria).filter(objKey =>
            //     objKey !== 'Item Date').reduce((newObj, key) =>
            //     {
            //         newObj[key] = filterCriteria[key];
            //         return newObj;
            //     }, {}
            // );
            // setFilterCriteria(obj);

        }else{
            let startDate = formatDatePickerDate(start._d);
            let endDate = formatDatePickerDate(end._d);
            setFilterCriteria({...filterCriteria, "Item Date": [startDate, endDate]});
        }
        setState({ start, end });
    };
    
    const label =
        start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');

    function handleDocumentsFilter(docs){
        let fltData =  docs.filter(function (obj) {
            return Object.keys(filterCriteria).every(function (key) {
                if (filterCriteria[key][0].length > 0) {
                    if (obj[key] && obj[key] !== undefined && obj[key] !== "") {
                        if(key === "Item Date"){
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
                        }else{
                            return obj[key].toString().toLowerCase().includes(filterCriteria[key][0].toString().toLowerCase()); 
                        }
                        // return obj[key].toString().toLowerCase().includes(my_criteria[key][0].toString().toLowerCase());
                    }
                }
            });
        });

        console.log("For Filter Criteria", fltData.length);
        console.log("For Filter Criteria", fltData[0]?.Description);
        console.log("For Filter Criteria", fltData[fltData.length-1]?.Description);
        if(fltData.length===0){
            setDataNotFoundBoolean(true);
            return;
        }
        setDataNotFoundBoolean(false);
        setAdvFilteredResult(fltData);
    }
    useEffect(()=>{
        handleDocumentsFilter(documents);
    },[filterCriteria]);

    console.log("FilterCriteria; ",filterCriteria);
    console.log("start", start._i);
    console.log("end",end._i);
    return (
        <>
            <Box className='d-flex flex-wrap align-items-center justify-content-between'>
                <Box className='d-flex flex-wrap align-items-center mb-4'>
                    {/* sadik */}
                    <Box sx={{ m: 1, width: 240 }}>
                        <DateRangePicker
                            initialSettings={{
                                startDate: start.toDate(),
                                endDate: end.toDate(),
                                ranges: {
                                    'All':[
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
                            <div
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
                                <span>{label==="Invalid date - Invalid date"?"All":label}</span> <i className="fa fa-caret-down"></i>
                            </div>
                        </DateRangePicker>
                        {/* <DateRangePicker className='m-0 p-0'>
                                    <input type="text" className="form-control col-4" />
                                </DateRangePicker> */}
                    </Box>
                    {/* {isRangeFilter ? (
                            <>
                                <Box className='d-flex me-2'>

                                    <input value={fromDate} onChange={(e) => setFormDate(e.target.value)} id="standard-basic" variant="standard" type="date" className='form-control me-2' />
                                    <input disabled={fromDate === "" ? true : false} min={fromDate} value={toDate} onChange={(e) => setToDate(e.target.value)} id="standard-basic" variant="standard" type="date" className='form-control me-2' />

                                    {
                                        formatDate !== "" && toDate !== "" ? <Button className='btn-blue-2 min-width-auto' onClick={()=>{}}>Submit</Button>
                                            : <CloseIcon onClick={() => {
                                                setIsRangeFilter(false);
                                                setSelectedLastFilter("");
                                            }}
                                                className='pointer mt-1 pt-1' />
                                    }

                                    {formatDate !== "" && toDate !== "" && <CloseIcon onClick={() => {
                                        setIsRangeFilter(false)
                                        setSelectedLastFilter("");
                                    }}
                                        className='pointer mt-1 pt-1 ms-1' />
                                    }

                                </Box>
                            </>
                        ) :
                            (<Box className='clearfix'>
                                <FormControl sx={{ m: 1, width: '120px', maxHeight: '200px', overflow: 'auto' }} size="small" className='select-border'>
                                    <Select
                                        value={selectedLastFilter}
                                        onChange={(e) => {}}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='custom-dropdown'
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value={"All"}>All</MenuItem>
                                        <MenuItem value={"LastDay"}>Last Day</MenuItem>
                                        <MenuItem value={"LastWeek"}>Last Week</MenuItem>
                                        <MenuItem value={"LastMonth"}>Last Month</MenuItem>
                                        <MenuItem value={"LastThreeMonth"}>Last 3 Month</MenuItem>
                                        <MenuItem value={"LastSixMonth"}>Last 6 Month</MenuItem>
                                        <MenuItem value={"Last12Month"}>Last 12 Month</MenuItem>
                                        <MenuItem value={"Last18Month"}>Last 18 Month</MenuItem>
                                        <MenuItem value={"Last24Months"}>Last 24 Months</MenuItem>
                                        <MenuItem value={"Last30Months"}>Last 30 Months</MenuItem>
                                        <MenuItem value={"Last36Months"}>Last 36 Months</MenuItem>
                                        <MenuItem value={"Last42Months"}>Last 42 Months</MenuItem>
                                        <MenuItem value={"Last48Months"}>Last 48 Months</MenuItem>
                                        <MenuItem value={"Last54Months"}>Last 54 Months</MenuItem>
                                        <MenuItem value={"Last60Months"}>Last 60 Months</MenuItem>
                                        <MenuItem value={""} onClick={() => setIsRangeFilter(true)}>Full Range</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>)} */}

                    <FormControl sx={{ m: 1, width: '120px' }} size="small" className='select-border'>
                        <Select
                            value={selectedSection}
                            onChange={(e) => {
                                setSelectedSection(e.target.value);
                                if(e.target.value!==''){
                                    setFilterCriteria({...filterCriteria,Section:[e.target.value]})
                                }else{
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
                            <MenuItem value="">
                                Sections
                            </MenuItem>
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
                                if(e.target.value!==''){
                                    setFilterCriteria({...filterCriteria,Folder:[e.target.value]});
                                }else{
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
                            <MenuItem value="">
                                Folders
                            </MenuItem>
                            {folders.length > 0 && folders.map((itm) => {
                                return <MenuItem value={itm.Folder}>{itm.Folder}</MenuItem>
                            })}
                            {/* <MenuItem value="">
                                        Select
                                    </MenuItem>
                                    <MenuItem value={10}>Select 1</MenuItem>
                                    <MenuItem value={20}>Select 2</MenuItem> */}
                        </Select>
                    </FormControl>

                    {/* <FormControl sx={{ m: 1, width: '110px' }} size="small" className='select-border'>
                                <Select
                                    value={select}
                                    onChange={handleChange2}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='custom-dropdown'
                                >
                                    <MenuItem value="">
                                        Select View
                                    </MenuItem>
                                    <MenuItem value={10}>Select View</MenuItem>
                                    <MenuItem value={20}>Select View</MenuItem>
                                    <MenuItem value={30}>Select View</MenuItem>
                                </Select>
                            </FormControl> */}


                    {/* <Button className='btn-blue-2 mb-1 ms-1' onClick={() => handleDocumentsFilter("LastMonth")}>Save View</Button> */}

                    {/* <FormControlLabel control={<Switch />} label="Save View" className='ms-2' /> */}

                </Box>

                <div className='text-end mb-3'>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="left" aria-label="left aligned" onClick={() => setToggleScreen({ singleCardView: true, multipleCardView: false, tableGridView: false })}>
                            <DnsIcon />
                        </ToggleButton>
                        <ToggleButton value="center" aria-label="centered" onClick={() => setToggleScreen({ singleCardView: false, multipleCardView: true, tableGridView: false })}>
                            <AppsIcon />
                        </ToggleButton>
                        <ToggleButton value="right" aria-label="right aligned" onClick={() => setToggleScreen({ singleCardView: false, multipleCardView: false, tableGridView: true })}>
                            <TableRowsIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

            </Box>

            {toggleScreen.tableGridView ? <Box className='table-responsive table-grid'>
                <DataGrid
                    id="dataGrid"
                    style={{ width: "100%" }}
                    dataSource={advFilteredResult.length > 0 ? advFilteredResult : documents}
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
                <Grid item xs={12} sm={10} md={toggleScreen.multipleCardView ? 12 : 6} lg={toggleScreen.multipleCardView ? 12 : 6} className='white-box'>
                    <Box className={toggleScreen.multipleCardView ? 'd-flex m-auto justify-content-start w-100 align-items-end' : 'd-flex m-auto w-100 align-items-end'}>
                        {isAdvFilter === false && <Layout className=''>
                            <AutocompleteWrapper className='mb-2'>
                                <AutocompleteRoot
                                    className=''
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
                                <Box className='mb-2'>
                                    <FormControl fullWidth size='small'>
                                        <InputLabel id="demo-simple-select-label">Select Property</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={searchByPropertyKey}
                                            label="Select Property"
                                            onChange={(e) => handleSearchBySuggestionList(e.target.value)}
                                        >
                                            {testDocumentsKey.length > 0 && testDocumentsKey.filter((option)=>{
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
                                        sx={{ width: 300 }}
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
                        <Button className='btn-blue-2 mb-2 ms-2' onClick={() => setIsAdvFilter(!isAdvFilter)}>Toggle</Button>
                    </Box>

                    <Box className='d-flex flex-wrap justify-content-between'>
                        <Box className='mt-2'>
                            <Stack direction="row" spacing={1}>
                                {/* <Chip label="Client: patrick" variant="outlined" onDelete={handleDelete} />
                                        <Chip label="Tell: 65456" variant="outlined" onDelete={handleDelete} /> */}
                                
                                {Object.keys(filterCriteria).length > 0 && Object.keys(filterCriteria).map((key)=>{
                                    if(!["Item Date","Folder","Section"].includes(key)){
                                        return <Chip label={`${key}: ${filterCriteria[key][0]}`} variant="outlined" onDelete={() => {
                                            handleFilterDeletion(key);
                                        }} />
                                    }
                                } 
                                )}

                            </Stack>
                        </Box>


                        <Box className='d-flex'>
                            <FormControl sx={{ m: 1, width: '120px' }} size="small" className='select-border'>
                                <Select
                                    value={selectedGroup}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='custom-dropdown'
                                    onChange={(e) => setSelectedGroup(e.target.value)}
                                >
                                    <MenuItem value="">
                                        Group By
                                    </MenuItem>
                                    <MenuItem value="Description">
                                        Description
                                    </MenuItem>
                                    <MenuItem value={"CommentBy"}>Comment By</MenuItem>
                                    <MenuItem value={"Type"}>Type</MenuItem>
                                    <MenuItem value={"Comments"}>Comments</MenuItem>
                                    {/* <MenuItem value={20}>Comment</MenuItem> */}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: '120px' }} size="small" className='select-border'>
                                <Select
                                    value={sortByProperty}
                                    onChange={(e) => setSortByProperty(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='custom-dropdown'
                                >
                                    <MenuItem value="">
                                        Sort By
                                    </MenuItem>
                                    <MenuItem value="None" onClick={() => setAdvFilteredResult([])}>None</MenuItem>
                                    <MenuItem value={"Date"}>By Date</MenuItem>
                                    <MenuItem value={"Description"}>By Description</MenuItem>
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
                    </Box>

                    <Box className='mt-4 client-details-scroll'>
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
                                                                    Size: {itm["FileSize"] ? itm["FileSize"] : "0.00KB"} | Date {itm["Item.Date"] ? itm["Item.Date"] : ""}
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
                                                                Size: {itm["FileSize"] ? itm["FileSize"] : ""} | Date {itm["Item.Date"] ? itm["Item.Date"] : ""}
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

            {/* <Box className='row'>
                        {advFilteredResult.length > 0 ? (advFilteredResult.map((item) => {
                            return <Box className='col-xl-4 col-md-6'>
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
                                                    {item.Description ? item.Description : "Demo"}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {item["Item Date"] ? item["Item Date"] : ""} | {item["FileSize"] ? item["FileSize"] : ""}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </label>
                                </Box>
                            </Box>
                        })) : (documents.length > 0 && documents.map((item) => {
                            return <Box className='col-xl-4 col-md-6'>
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
                                                    {item.Description ? item.Description : "Demo"}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {item["Item Date"] ? formatDate(item["Item Date"]) : ""} | {item["FileSize"] ? item["FileSize"] : ""}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </label>
                                </Box>
                                
                            </Box>
                        }))}
                    </Box> */}
        </>
    );
}