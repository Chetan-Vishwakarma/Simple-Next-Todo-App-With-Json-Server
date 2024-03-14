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
    const [firstFilterResult, setFirstFilterResult] = useState([]);
    const [secondFilterResult, setSecondFilterResult] = useState([]);
    const [thirdFilterResult, setThirdFilterResult] = useState([]);
    const [fourthFilterResult, setFourthFilterResult] = useState([]);

    const testDocumentsKey = [
        { key: "Registration No.", value: "Registration No" },
        { key: "SenderId", value: "Filled By" },
        { key: "SubSection", value: "Sub Section" },
        { key: "Received Date", value: "Filled On" },
        { key: "Item Date", value: "Document Creation Date" },
        { key: "Description", value: "Document Name" },
        { key: "Category", value: "Category" },
        { key: "Notes", value: "Has Notes" },
        { key: "Attach", value: "Has Attachments" },
        { key: "Type", value: "Document Type" },
        { key: "Comments", value: "Comment" },
        { key: "CommentBy", value: "Comment By" },
        { key: "Section", value: "Section" }
    ];


    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    // 
    const handleFilterBySection = (event) => {
        let target = event.target.value;
        setSelectedSection(event.target.value);
        let filteredData = documents.filter((itm) => {
            return itm["Section"] === target;
        });
        // console.log("filteredData",filteredData);
        setAdvFilteredResult(filteredData);
    };

    // const handleChange2 = (event) => {
    //     setSelect(event.target.value);
    // };
    const handleFilterByFolder = (e) => {
        let target = e.target.value;
        let filteredData = documents.filter((itm) => {
            return itm["Folder"] === target;
        });
        console.log("handleFilterByFolder", filteredData);
        setAdvFilteredResult(filteredData);
    }


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
                    if (json.Table6) {
                        // let docs = json.Table6.length >= 100 ? json.Table6.slice(0, 80) : json.Table6;
                        let docs = json.Table6;
                        if (docs.length > 0) {
                            let docKeys = Object.keys(docs[0]);
                            // console.log("documentKeys",docKeys);
                            setDocumentKeys(docKeys);

                            docs.map((itm) => itm["Item Date"] = formatDate(itm["Item Date"]));
                            //docs.map((itm)=>console.log("check in map",itm["Item Date"]));
                            setDocuments(docs);
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
    function getLastMonth() {
        const currentDate = new Date();
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        const month = lastMonth.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastMonth.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }
    function getLastSixMonthsDate() {
        const currentDate = new Date();
        const lastSixMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6);
        const month = lastSixMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastSixMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }
    function getLastEighteenMonthsDate() {
        const currentDate = new Date();
        const lastEighteenMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 18);
        const month = lastEighteenMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastEighteenMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }
    function getLastTwelveMonthsDate() {
        const currentDate = new Date();
        const lastTwelveMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11);
        const month = lastTwelveMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastTwelveMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }
    function getLastThreeMonthsDate() {
        const currentDate = new Date();
        const lastThreeMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3);
        const month = lastThreeMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastThreeMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
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

    function getLast24Months() {
        const currentDate = new Date();
        const lastTwentyFourMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 24);
        const month = lastTwentyFourMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastTwentyFourMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }

    function getLast30Months() {
        const currentDate = new Date();
        const lastTwentyFourMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 30);
        const month = lastTwentyFourMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastTwentyFourMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }

    function getLast36Months() {
        const currentDate = new Date();
        const lastTwentyFourMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 36);
        const month = lastTwentyFourMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastTwentyFourMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }

    function getLast42Months() {
        const currentDate = new Date();
        const lastTwentyFourMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 42);
        const month = lastTwentyFourMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastTwentyFourMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }

    function getLast48Months() {
        const currentDate = new Date();
        const lastTwentyFourMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 48);
        const month = lastTwentyFourMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastTwentyFourMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }
    function getLast54Months() {
        const currentDate = new Date();
        const lastTwentyFourMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 54);
        const month = lastTwentyFourMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastTwentyFourMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }
    function getLast60Months() {
        const currentDate = new Date();
        const lastTwentyFourMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 60);
        const month = lastTwentyFourMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastTwentyFourMonthsDate.getFullYear();
        return month < 10 ? `0${month}/${year}` : `${month}/${year}`;
    }

    const handleDocumentsFilter = (target) => {
        setSelectedLastFilter(target);
        if (target === "LastMonth") {
            // console.log(getLastMonth().split("/"));
            let last = getLastMonth().split("/");
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                if (all[1] >= last[0] && all[2] === last[1]) {
                    test.push(itm["Item Date"]);
                    return itm;
                }
            });
            // console.log("last indexed data of Last 3 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            setAdvFilteredResult(fltData);
        } else if (target === "LastSixMonth") {
            let last = getLastSixMonthsDate().split("/");
            // console.log(last);
            // if(isLastSixMonth === false){
            //     documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // }
            // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] > last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 6 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            // setIsLastSixMonth(true);
            setAdvFilteredResult(fltData);
        } else if (target === "Last18Month") {
            let last = getLastEighteenMonthsDate().split("/");
            // console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] > last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 18 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            // test.map((item)=>console.log(item));
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "Last12Month") {
            let last = getLastTwelveMonthsDate().split("/");
            // console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] > last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            // test.map((item)=>console.log(item));
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "LastThreeMonth") {
            let last = getLastThreeMonthsDate().split("/");
            // console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                // console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] > last[1]) {
                        //  console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm;
                    }
                }
            });
            // console.log("last indexed data of Last Three Months Filtered Result",test[test.length-1]);
            //console.log(test.length);
            // console.log(fltData.length);
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "LastDay") {
            let last = getLastDay().split("/");
            // console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                // console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[2]) {
                    // if(all[2]>last[2]){
                    //     //  console.log("populated Data: ", itm["Item Date"]);
                    //      test.push(itm["Item Date"])
                    //     return itm;
                    // }else if(all[1]>=last[1]){
                    //     test.push(itm["Item Date"])
                    //     return itm;
                    // }
                    if (all[1] >= last[1]) {
                        if (all[0] >= last[0]) {
                            test.push(itm["Item Date"])
                            return itm;
                        }
                    }
                }
            });
            // console.log("last indexed data of Last Three Months Filtered Result",test[test.length-1]);
            //console.log(test.length);
            // console.log(fltData.length);
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "LastWeek") {
            let last = getLastWeek().split("/");
            console.log(last);
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                // console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[2]) {
                    // if(all[2]>last[2]){
                    //     //  console.log("populated Data: ", itm["Item Date"]);
                    //      test.push(itm["Item Date"])
                    //     return itm;
                    // }else if(all[1]>=last[1]){
                    //     test.push(itm["Item Date"])
                    //     return itm;
                    // }
                    if (all[1] >= last[1]) {
                        if (all[0] >= last[0]) {
                            test.push(itm["Item Date"])
                            return itm;
                        }
                    }
                }
            });
            // console.log("last indexed data of Last Three Months Filtered Result",test[test.length-1]);
            //console.log(test.length);
            // console.log(fltData.length);
            // fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "All") {
            setAdvFilteredResult([]);
        } else if (target === "Last24Months") {
            let last = getLast24Months().split("/");
            // console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] >= last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            // test.map((item)=>console.log(item));
            // fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "Last30Months") {
            let last = getLast30Months().split("/");
            // console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] >= last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            // test.map((item)=>console.log(item));
            // fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "Last36Months") {
            let last = getLast36Months().split("/");
            // console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] >= last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            // test.map((item)=>console.log(item));
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "Last42Months") {
            let last = getLast42Months().split("/");
            console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] >= last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            // test.map((item)=>console.log(item));
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "Last48Months") {
            let last = getLast48Months().split("/");
            console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] >= last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            // test.map((item)=>console.log(item));
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "Last54Months") {
            let last = getLast54Months().split("/");
            console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] >= last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            // test.map((item)=>console.log(item));
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        } else if (target === "Last60Months") {
            let last = getLast60Months().split("/");
            console.log(last);
            // documents.map((itm)=>itm["Item Date"]=formatDate(itm["Item Date"]));
            // // documents.map((itm)=>console.log(itm["Item Date"]));
            let test = [];
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
                if (all[2] >= last[1]) {
                    if (all[2] >= last[1]) {
                        // console.log("populated Data: ", itm["Item Date"]);
                        test.push(itm["Item Date"])
                        return itm;
                    } else if (all[1] >= last[0]) {
                        test.push(itm["Item Date"])
                        return itm
                    }
                }
            });
            // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
            // console.log(test.length);
            // test.map((item)=>console.log(item));
            fltData.map((item) => console.log(item.Description, "----", item["Item Date"]));

            // console.log("fltDatat------",fltData);
            setAdvFilteredResult(fltData);
        }
    }

    const handleFilterByRange = (a, b, c) => {
        console.log(a, b, c);
        let from = fromDate.split("-");
        let to = toDate.split("-");
        // console.log(from);
        // console.log(to);



        let formatFrom = `${from[2]}/${from[1]}/${from[0]}`;
        let formatTo = `${to[2]}/${to[1]}/${to[0]}`;

        const startDateParts = formatFrom.split('/');
        const endDateParts = formatTo.split('/');

        const startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]); // -1 because months are 0-indexed
        const endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]); // -1 because months are 0-indexed

        // Filter data array
        const filteredData = documents.filter(item => {
            // Parse item's docDate into a Date object
            const docDateParts = item["Item Date"].split('/');
            const docDate = new Date(docDateParts[2], docDateParts[1] - 1, docDateParts[0]); // -1 because months are 0-indexed

            // Return true if the docDate is within the range
            return docDate >= startDate && docDate <= endDate;
        });

        filteredData.map((itm) => console.log(itm.Description, "---", itm["Item Date"]));
        setAdvFilteredResult(filteredData);




        // if(from[0]===to[0] && from[1]===to[1] && from[2]===to[2]){
        //     let fltData = documents.filter((itm)=>{
        //         let all = itm["Item Date"].split("/");
        //         if(all[0]===from[2] && all[1]===from[1] && all[2]===from[0]){
        //             return itm
        //         }
        //     });
        //     fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));
        // }else if(from[0]===to[0] && from[1]===to[1]){       // when both month and year are same like : 02/2024 and 02/2024
        //     if(from[2]>to[2]){
        //         let fltData = documents.filter((itm)=>{
        //             let all = itm["Item Date"].split("/");
        //             if(all[1]===from[1] && all[2]===from[0]){
        //                 if(all[0]<=from[2] && all[0]>=to[2]){
        //                     return itm;
        //                 }
        //             }
        //         });
        //         fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));
        //     }else if(to[2]>from[2]){
        //         let fltData = documents.filter((itm)=>{
        //             let all = itm["Item Date"].split("/");
        //             if(all[1]===to[1] && all[2]===to[0]){
        //                 if(all[0]<=to[2] && all[0]>=from[2]){
        //                     return itm;
        //                 }
        //             }
        //         });
        //         fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));
        //     }
        // }else if(from[0]===to[0]){              // when both years are same like 2024 and 2024
        //     if(from[1]>to[1] && from[2]>to[2]){
        //         let fltData = documents.filter((itm)=>{
        //             let all = itm["Item Date"].split("/");
        //             if(all[1]<=from[1] && all[1]>=to[1] && all[0]<=from[2] && all[0]>=to[2]){
        //                 return itm;
        //             }
        //         });
        //         fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));
        //     }else if(from[1]<to[1] && from[2]<to[2]){
        //         let fltData = documents.filter((itm)=>{
        //             let all = itm["Item Date"].split("/");
        //             if(all[1]>=from[1] && all[1]<=to[1] && all[0]>=from[2] && all[0]<=to[2]){
        //                 return itm;
        //             }
        //         });
        //         fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));
        //     }
        // }else if(from[0]>to[0]){
        //     if(to[1]>from[1] && to[2]>from[2]){
        //         let fltData = documents.filter((itm)=>{
        //             let all = itm["Item Date"].split("/");
        //             if(all[1]<=to[1] && all[0]<=to[2] && all[1]>=from[1] && all[0]>=from[2]){
        //                 return itm;
        //             }
        //         });
        //         fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));
        //     }
        // }



        //  -----  working code starts From : 09/03/2024. To: 08/01/2024
        // if(from[0]===to[0]){
        //     if(from[1]>=to[1]){
        //         if(from[2]>=to[1]){
        //             let fltData = documents.filter((itm)=>{
        //                 let all = itm["Item Date"].split("/");
        //                 if(all[2]===from[0] && from[1]>=all[1] && from[2]>=all[0] && to[2]<=all[0]){
        //                     return itm;
        //                 }
        //             });
        //             fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));
        //         }
        //     }
        // }
        // ------- working code end -------


        // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
        // console.log(test.length);
        // test.map((item)=>console.log(item));
        // fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));

        // console.log("fltDatat------",fltData);
        // setAdvFilteredResult(fltData);

        // console.log("From : ",fromDate.split("-"));
        // console.log("To : ",toDate.split("-"));
        // let from = `${fromRawFormat[2]}/${fromRawFormat[1]}/${fromRawFormat[0]}`;
        // let to = `${toRawFormat[2]}/${toRawFormat[1]}/${toRawFormat[0]}`;
        // console.log(from,"-----",to);
        // let test = [];
        // let fltData = documents.filter((itm)=>{
        //     let all = itm["Item Date"].split("/");
        //     //console.log(all[1],"--",all[2],"-----",last[0],"--",last[1]);
        //     if(all[2]>=last[1]){
        //         if(all[2]>=last[1]){
        //             // console.log("populated Data: ", itm["Item Date"]);
        //              test.push(itm["Item Date"])
        //             return itm;
        //         }else if(all[1]>=last[0]){
        //             test.push(itm["Item Date"])
        //             return itm
        //         }
        //     }
        // });
        // // console.log("last indexed data of Last 12 Months Filtered Result",test[test.length-1]);
        // // console.log(test.length);
        // // test.map((item)=>console.log(item));
        // fltData.map((item)=>console.log(item.Description,"----",item["Item Date"]));

        // // console.log("fltDatat------",fltData);
        // setAdvFilteredResult(fltData);

    }
    function getRootProps(params) { }
    function getListboxProps(params) { }

    const handleSearchByProperty = (flitData) => {
        if (flitData && searchByPropertyKey === "" && searchByPropertyInput === "") {
            if (flitData.length === 0) {
                setAdvFilteredResult([]);
            } else {
                let arr = flitData;
                if (arr.length > 1) {
                    if (arr.length === 2) {
                        let flt1 = secondFilterResult.filter((itm) => {
                            return String(itm[arr[1].key]).toLowerCase().includes(String(arr[1].value).toLowerCase())
                        });
                        // console.log("flt1: ", flt1);
                        setAdvFilteredResult(flt1);
                    } else if (arr.length === 3) {
                        let flt2 = thirdFilterResult.filter((itm) => {
                            return String(itm[arr[2].key]).toLowerCase().includes(String(arr[2].value).toLowerCase())
                        });
                        // console.log("flt1: ", flt2);
                        setAdvFilteredResult(flt2);
                    }
                } else {
                    let fltByKeyVal = firstFilterResult.filter((itm) => {
                            return String(itm[arr[0].key]).toLowerCase().includes(String(arr[0].value).toLowerCase());
                    });
                    // console.log(fltByKeyVal);
                    setAdvFilteredResult(fltByKeyVal);
                }
            }
            setBulkSearch(flitData);
        } else {
            let arr = [];
            if (searchByPropertyKey !== "" && searchByPropertyInput !== "") {
                arr = [...bulkSearch, { key: searchByPropertyKey, value: searchByPropertyInput }];
            } else {
                arr = [...bulkSearch];
            }
            // console.log("arr",arr)
            setBulkSearch(arr);
            if (arr.length > 1) {
                if (arr.length === 2) {
                    // console.log(arr[1].key);
                    // console.log(arr[1].value);
                    let flt1 = firstFilterResult.filter((itm) => {
                        return String(itm[arr[1].key]).toLowerCase().includes(String(arr[1].value).toLowerCase());
                    });
                    // console.log("flt1: ", flt1);
                    setSecondFilterResult(flt1);
                    setAdvFilteredResult(flt1);
                } else if (arr.length === 3) {
                    let flt2 = secondFilterResult.filter((itm) => {
                        return String(itm[arr[2].key]).toLowerCase().includes(String(arr[2].value).toLowerCase())
                    });
                    // console.log("flt1: ", flt2);
                    setThirdFilterResult(flt2);
                    setAdvFilteredResult(flt2);
                }else if (arr.length === 4) {
                    let flt3 = secondFilterResult.filter((itm) => {
                        return String(itm[arr[3].key]).toLowerCase().includes(String(arr[3].value).toLowerCase())
                    });
                    // console.log("flt1: ", flt2);
                    setFourthFilterResult(flt3);
                    setAdvFilteredResult(flt3);
                }
            } else {
                let fltByKeyVal = documents.filter((itm) => {
                    if (itm[searchByPropertyKey]) {
                        return String(itm[searchByPropertyKey]).toLowerCase().includes(searchByPropertyInput.toLowerCase());
                    }
                });
                // console.log("First Filter Result",fltByKeyVal);
                setFirstFilterResult(fltByKeyVal);
                setAdvFilteredResult(fltByKeyVal);
            }
        }

        setSearchByPropertyInput("");
        setSearchByPropertyKey("");
    }
    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/');
        return new Date(year, month - 1, day); // month - 1 because month is 0-indexed in Date objects
    }
    function handleAscendingSort() {
        if (sortByProperty === "Date") {
            if (advFilteredResult.length > 0) {
                let sortedData = [...advFilteredResult].sort((a, b) => parseDate(a["Item Date"]) - parseDate(b["Item Date"]));
                setAdvFilteredResult(sortedData);
            } else {
                let sortedData = [...documents].sort((a, b) => parseDate(a["Item Date"]) - parseDate(b["Item Date"]));
                setAdvFilteredResult(sortedData);
            }
        } else if (sortByProperty === "Description") {
            if (advFilteredResult.length > 0) {
                let sortedData = [...advFilteredResult].sort((a, b) => a["Description"].localeCompare(b["Description"]));
                setAdvFilteredResult(sortedData);
            } else {
                let sortedData = [...documents].sort((a, b) => a["Description"].localeCompare(b["Description"]));
                setAdvFilteredResult(sortedData);
            }
        }
    }
    function handleDescendingSort() {
        if (sortByProperty === "Date") {
            if (advFilteredResult.length > 0) {
                let sortedData = [...advFilteredResult].sort((a, b) => parseDate(b["Item Date"]) - parseDate(a["Item Date"]));
                setAdvFilteredResult(sortedData);
            } else {
                let sortedData = [...documents].sort((a, b) => parseDate(b["Item Date"]) - parseDate(a["Item Date"]));
                setAdvFilteredResult(sortedData);
            }
        } else if (sortByProperty === "Description") {
            if (advFilteredResult.length > 0) {
                let sortedData = [...advFilteredResult].sort((a, b) => b["Description"].localeCompare(a["Description"]));
                setAdvFilteredResult(sortedData);
            } else {
                let sortedData = [...documents].sort((a, b) => b["Description"].localeCompare(a["Description"]));
                setAdvFilteredResult(sortedData);
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
    function handleGroupByFilter(e) {
        let target = e.target.value;
        setSelectedGroup(target);
        if (target === "") {
            setIsGroupBy(false);
            return;
        }
        setIsGroupBy(true);
        let data = groupByProperty(documents, target);
        setGroupByFilterResult(data);
    }
    function handleSearchBySuggestionList(val) {
        if (val !== "") {
            setSearchByPropertyKey(val);
            let filteredData = documents.filter((itm) => {
                if (itm[val] !== "" && itm[val] !== null && itm[val] !== undefined) {
                    return itm[val];
                }
            }).map((itm) => itm[val]);
            if (filteredData) {
                let fltData = [...new Set(filteredData)];
                // console.log("Suggestion List : ", fltData)
                setSuggestionList(fltData);
                setSearchByPropertyInput("");
            }
            //console.log("Suggestion List : ", filteredData)
        }
    }
    return (
        <>
            {/* <div style={{ textAlign: "end" }}>{toggleScreen ? <AppsIcon onClick={() => setToggleScreen(!toggleScreen)} /> : <ListIcon onClick={() => setToggleScreen(!toggleScreen)} />}</div> */}

            {/* {toggleScreen.tableGridView ?
                (documents.length > 0 && <>
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
                    <Box className='table-responsive table-grid'>
                        <DataGrid
                            id="dataGrid"
                            style={{ width: "100%" }}
                            dataSource={documents}
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
                    </Box></>) :
                ( */}
            <>

                {/* <div>
                    <button onClick={()=>handleDocumentsFilter("LastMonth")}>LastMonth</button>
                    <button onClick={()=>handleDocumentsFilter("LastSixMonth")}>LastSixMonth</button>
                    <button onClick={()=>handleDocumentsFilter("Last18Month")}>Last18Month</button>
                    <button onClick={()=>handleDocumentsFilter("Last12Month")}>Last12Month</button>
                    <button onClick={()=>handleDocumentsFilter("LastThreeMonth")}>LastThreeMonth</button>
                    <button onClick={()=>handleDocumentsFilter("LastDay")}>LastDay</button>
                    <button onClick={()=>handleDocumentsFilter("LastWeek")}>LastWeek</button>
                    <button onClick={()=>handleDocumentsFilter("All")}>All</button>
                    <select onChange={(e)=>handleDocumentsFilter(e.target.value)}>
                        <option value=""></option>
                        <option value="Last24Months">Last 24 Months</option>
                        <option value="Last30Months">Last 30 Months</option>
                        <option value="Last36Months">Last 36 Months</option>
                        <option value="Last42Months">Last 42 Months</option>
                        <option value="Last48Months">Last 48 Months</option>
                        <option value="Last54Months">Last 54 Months</option>
                        <option value="Last60Months">Last 60 Months</option>
                    </select>
                    <div><input type='date' value={fromDate} onChange={(e)=>setFormDate(e.target.value)}/><input disabled={fromDate===""?true:false} min={fromDate} type='date'value={toDate} onChange={(e)=>setToDate(e.target.value)}/><button onClick={handleFilterByRange}>Search</button></div>
                </div> */}

                {/* <hr /> */}

                <Box className='d-flex flex-wrap align-items-center justify-content-between'>
                    <Box className='d-flex flex-wrap align-items-center mb-4'>
                        {/* sadik */}
                        {isRangeFilter ? (
                            <>
                                <Box className='d-flex me-2'>

                                    <input value={fromDate} onChange={(e) => setFormDate(e.target.value)} id="standard-basic" variant="standard" type="date" className='form-control me-2' />
                                    <input disabled={fromDate === "" ? true : false} min={fromDate} value={toDate} onChange={(e) => setToDate(e.target.value)} id="standard-basic" variant="standard" type="date" className='form-control me-2' />

                                    {
                                        formatDate !== "" && toDate !== "" ? <Button className='btn-blue-2 min-width-auto' onClick={handleFilterByRange}>Submit</Button>
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
                                {/* <Box sx={{ m: 1, width: 240 }}>
                                <DateRangePicker className='m-0 p-0'>
                                    <input type="text" className="form-control col-4" />
                                </DateRangePicker>
                            </Box> */}

                            </>
                        ) :
                            (<Box className='clearfix'>
                                <FormControl sx={{ m: 1, width: '120px', maxHeight: '200px', overflow: 'auto' }} size="small" className='select-border'>
                                    <Select
                                        value={selectedLastFilter}
                                        onChange={(e) => handleDocumentsFilter(e.target.value)}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='custom-dropdown'
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

                                {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-section">Filter By</InputLabel>
                                        <Select
                                            labelId="demo-select-small-section"
                                            id="demo-select-small"
                                            value={selectedLastFilter}
                                            label="Section"
                                            onChange={(e) => handleDocumentsFilter(e.target.value)}
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
                                    </FormControl> */}
                            </Box>)}

                        <FormControl sx={{ m: 1, width: '120px' }} size="small" className='select-border'>
                            <Select
                                value={selectedSection}
                                onChange={handleFilterBySection}
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
                                onChange={handleFilterByFolder}
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

                {/* <hr /> */}


                {/* <div className='text-end mb-3'>

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

                    </div> */}

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
                                        {/* <label>Select Property</label> */}
                                        {/* <select class="form-select" aria-label="Default select example" value={searchByPropertyKey} onChange={(e) => setSearchByPropertyKey(e.target.value)}> */}
                                        {/* <select class="form-select" aria-label="Default select example" value={searchByPropertyKey} onChange={(e) => handleSearchBySuggestionList(e.target.value)}>
                                            <option value={""}></option>
                                            {testDocumentsKey.length > 0 && testDocumentsKey.map((itm) => {
                                                return <option value={itm.key}>{itm.value}</option>
                                            })}
                                        </select> */}
                                        <FormControl fullWidth size='small'>
                                            <InputLabel id="demo-simple-select-label">Select Property</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={searchByPropertyKey}
                                                label="Select Property"
                                                onChange={(e) => handleSearchBySuggestionList(e.target.value)}
                                            >
                                                {testDocumentsKey.length > 0 && testDocumentsKey.map((itm) => {
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
                                        {/* <label>Value</label> */}
                                        {/* <select class="form-select" aria-label="Default select example" value={""} onChange={(e) => { }}>
                                            <option value={""}></option>
                                            <input/>
                                            {suggestionList.length > 0 && suggestionList.map((itm) => (
                                                <option value={itm}>{itm}</option>
                                            ))}
                                        </select> */}
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={suggestionList}
                                            defaultValue={""}
                                            sx={{ width: 300 }}
                                            size='small'
                                            onChange={(event, newValue) => {
                                                // console.log("newValue", newValue);
                                                // console.log("event", event.target.value);
                                                setSearchByPropertyInput(newValue !== null ? newValue : "")
                                            }}
                                            renderInput={(params) => <TextField {...params} value={searchByPropertyInput} onChange={(e) => setSearchByPropertyInput(e.target.value)} label="Value" />}
                                        />
                                        {/* <input type="text" class="form-control" placeholder="Type Value" value={searchByPropertyInput} onChange={(e) => setSearchByPropertyInput(e.target.value)} /> */}
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

                                    {bulkSearch.length > 0 && bulkSearch.map((itm) => <Chip disabled={bulkSearch[bulkSearch.length-1]?false:true} label={`${itm.key}: ${itm.value}`} variant="outlined" onDelete={() => {
                                        let filtData = [...bulkSearch].filter((ins) => {
                                            return ins.key !== itm.key
                                        });
                                        console.log("filtData", filtData);
                                        setBulkSearch(filtData);
                                        handleSearchByProperty(filtData);

                                        // handleSearchByProperty();
                                    }} />)}

                                </Stack>
                            </Box>

                            {/* <Box className='d-flex'>
                                <FormControl sx={{ m: 1, width: '120px' }} size="small" className='select-border'>
                                    <Select
                                        value={select}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem value="">
                                            Group By
                                        </MenuItem>
                                        <MenuItem value={10}>Group Name 1</MenuItem>
                                        <MenuItem value={20}>Group Name 2</MenuItem>
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
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value={"Date"}>By Date</MenuItem>
                                        <MenuItem value={"Description"}>By Description</MenuItem>
                                    </Select>
                                    <button onClick={handleAscendingSort}>Asc</button><button onClick={handleDescendingSort}>Dsc</button>
                                </FormControl>
                            </Box> */}


                            <Box className='d-flex'>
                                <FormControl sx={{ m: 1, width: '120px' }} size="small" className='select-border'>
                                    <Select
                                        value={selectedGroup}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className='custom-dropdown'
                                        onChange={handleGroupByFilter}
                                    >
                                        <MenuItem value="">
                                            Group By
                                        </MenuItem>
                                        <MenuItem value="Description">
                                            Description
                                        </MenuItem>
                                        <MenuItem value={"CommentBy"}>Comment By</MenuItem>
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
                            {toggleScreen.singleCardView && <DocumentDetails groupByFilterResult={groupByFilterResult} isGroupBy={isGroupBy} documents={documents} advFilteredResult={advFilteredResult}></DocumentDetails>}
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
            {/* ) */}
            {/* } */}
        </>
    );
}