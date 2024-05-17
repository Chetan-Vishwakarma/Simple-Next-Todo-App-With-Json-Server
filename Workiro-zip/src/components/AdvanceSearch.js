import React, { useEffect, useState } from 'react'
import CommanCLS from '../services/CommanService';
import { Box, Typography, Button, TextField, Autocomplete } from '@mui/material';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useLocation, useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import Popover from '@mui/material/Popover';
import TuneIcon from '@mui/icons-material/Tune';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import BootstrapTooltip from '../utils/BootstrapTooltip';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { setAdvanceSearchResultFromRedux, setIsAdvanceDocSearchRedux } from '../redux/reducers/counterSlice';
import { Json_AdvanceSearchDocFromRedux } from '../redux/reducers/api_helper';

let agrno = localStorage.getItem("agrno");
let password = localStorage.getItem("Password");
let Email = localStorage.getItem("Email");
let folderId = localStorage.getItem("FolderId");

function AdvanceSearch({testFunc}) {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { globalSearchDocs } = location.state ? location.state : { globalSearchDocs: [], strGlobal: "" };
    const baseUrlSms = "https://docusms.uk/dsdesktopwebservice.asmx/";
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    let Cls = new CommanCLS(baseUrl, agrno, Email, password);
    let ClsSms = new CommanCLS(baseUrlSms, agrno, Email, password);
    const [sections, setSections] = useState([]);
    const [folders, setFolders] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});
    const [isClientField, setIsClientField] = useState(false);
    const [isDocIdField, setIsDocIdField] = useState(false);
    const [documentId, setDocumentId] = useState("");
    const [isDateShow, setIsDateShow] = useState(false);
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
        sectionId: "-1",
        udflist: [],
        udfvalueList: []
    });
    // for date datepicker
    const [state, setState] = useState({
        start: moment(),
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
        setDocumentId("");
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
            sectionId: "-1",
            udflist: [],
            udfvalueList: []
        });
        setIsDateShow(false);
    };

    const label =
        start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY');

    const handleCallback = (start, end) => {
        if (start._i === "Clear") {
            setIsDateShow(false);
            return;
        }
        setState({ start, end });
        setIsDateShow(true);
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
                        ;
                        let uniqueSecIDs = {};
                        const filteredArray = res.Table.filter(item => {
                            if (!uniqueSecIDs[item.SecID]) {
                                uniqueSecIDs[item.SecID] = true;
                                return true;
                            }
                            return false;
                        });
                        setSections(filteredArray);
                        // console.log("Json_GetFolderData", res);
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
                        // console.log("Json_GetFolders", tbl);
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
                        // console.log("Json_AdvanceSearchDoc", json.Table6);
                        if (json.Table6 && json.Table6.length > 0) {
                            let fltDouble = [];
                            json.Table6.map((itm) => itm.Description).filter(item => {
                                if (!fltDouble.includes(item)) {
                                    fltDouble.push(item);
                                }
                            });
                            let mappedData = json.Table6;
                            dispatch(setAdvanceSearchResultFromRedux({ docs: mappedData, descriptions: [], isLoading: false }))
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
                                sectionId: "-1",
                                udflist: [],
                                udfvalueList: []
                            });
                            setSelectedClient({});
                            navigate("/dashboard/DocumentList?filter=true&adv=true");
                            testFunc();
                            // handleClose();
                            // dispatch(setIsAdvanceDocSearchRedux(true));
                            // navigate("/dashboard/SearchResult/Doc");
                        } else {
                            toast.error("Documents not found for this criteria");
                            // handleClose();
                        }
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_AdvanceSearchDoc", err);
        }
        handleClose();
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
                        // console.log("Json_SearchDocById", json[""]);
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
            sectionId: "-1",
            udflist: [],
            udfvalueList: []
        });
    }
    return (
        <div style={{ top: globalSearchDocs && globalSearchDocs.length > 0 && "85px", right: globalSearchDocs && globalSearchDocs.length > 0 && "20px" }} className=''>
            <BootstrapTooltip title="Advanced Document Search" arrow
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
                <Button aria-describedby={id} variant="" className='min-width-auto btn-blu px-2' size='small' onClick={handleClick}>
                    <TuneIcon />
                </Button>
            </BootstrapTooltip>
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
                <Box className='client-details-filter p-2'
                    sx={{ maxWidth: '460px', width: '460px' }}
                >
                    <Box className='mb-0'>

                        <Typography variant="Body2" className='font-14 sembold mb-2 d-block text-black ps-2'>
                            Advanced Search
                        </Typography>

                        <Box className='d-flex'>
                            <FormControl sx={{ m: 1, width: '100%' }} size="small" className='select-border mt-0 mb-0'>
                                <span className='custom-tooltip'>Section</span>

                                <Select
                                    value={documentData.sectionId}
                                    name='sectionId'
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        if (e.target.value === "Section") {
                                            setDocumentData({ ...documentData, sectionId: "-1" });
                                            return;
                                        }
                                    }}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='custom-dropdown'
                                    id="sadik"
                                    MenuProps={{ PaperProps: { sx: { maxHeight: '260px !important' } } }}
                                >
                                    <MenuItem value="-1" style={{ display: "none" }}>
                                        {/* <BootstrapTooltip title="Section" arrow
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
                                        > */}

                                        Section

                                        {/* </BootstrapTooltip> */}

                                    </MenuItem>
                                    <MenuItem value="Section" className='text-danger sembold'><ClearIcon className='me-1' /> Clear Filter</MenuItem>
                                    {sections.length > 0 && sections.map((itm) => {
                                        return <MenuItem value={itm.SecID}>
                                            {itm.Sec}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '100%' }} size="small" className='select-border mt-0 mb-0'>

                                <span className='custom-tooltip'>Folders</span>

                                <Select
                                    value={documentData.ProjectId}
                                    name='ProjectId'
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        if (e.target.value === "Folder") {
                                            return;
                                        }
                                    }}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='custom-dropdown'
                                >
                                    <MenuItem value={""} style={{ display: "none" }}>
                                        Client</MenuItem>
                                    <MenuItem value="Folder" className='text-danger sembold ps-1'>
                                        <ClearIcon className='font-18 me-1' />
                                        Clear Filters</MenuItem>
                                    {folders.length > 0 && folders.map((itm) => {
                                        return <MenuItem value={itm.FolderID} className='ps-1'>
                                            <FolderSharedIcon className='font-18 me-1' />
                                            {itm.Folder}</MenuItem>
                                    })}
                                </Select>

                            </FormControl>
                        </Box>

                        <Box className='d-flex mb-3'>

                            <Box className='col-6'>
                                <Box className='btn-select'>
                                    {isClientField ? <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        className='font-12'
                                        onChange={(e, newValue) => {
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
                                        // sx={{ width: 300 }}
                                        renderInput={(params) => <TextField className='font-12' value={selectedClient ? selectedClient["Company Name"] : ""} autoFocus={true} onBlur={() => setIsClientField(false)} {...params} size="small" />}
                                    /> : <Button
                                        className='button-select'
                                        onClick={() => {
                                            setIsClientField(true);
                                        }}>
                                        <BootstrapTooltip title="Reference" arrow
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
                                            {Object.keys(selectedClient).length > 0 ? selectedClient["Company Name"] : "Reference"}
                                        </BootstrapTooltip>
                                    </Button>}
                                </Box>
                            </Box>

                            <div className='col-6'>
                                <Box className='btn-select'>
                                    <FormControl sx={{ width: '100%' }} size="small" className='select-border'>
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
                                            {!isDocIdField ? <Button onClick={handleDocIdField} className='button-select'>
                                                {documentId !== "" ? documentId : "Document ID"}
                                            </Button> : <TextField autoFocus={true} name="Description" type='number' value={documentId} onChange={(e) => setDocumentId(e.target.value)} onBlur={(e) => {
                                                setIsDocIdField(false);
                                            }} id="outlined-basic" placeholder='Document ID...' size="small" variant="outlined" />}
                                        </BootstrapTooltip>
                                    </FormControl>
                                </Box>
                            </div>
                        </Box>
                        <Box className='p-2 pt-0'>
                            <Box className="input-search">
                                <TextField name="Description" onChange={(e) => handleInputChange(e)} id="outlined-basic" placeholder='Description...' size="small" variant="outlined" className='ps-0' />
                                <span className="material-symbols-outlined search-icon">search</span>
                            </Box>

                            <Box sx={{ m: 1 }} className='pt-2'>
                                <DateRangePicker
                                    initialSettings={{
                                        startDate: start.toDate(),
                                        endDate: end.toDate(),
                                        ranges: {
                                            'Clear': [
                                                'Clear', 'Clear'
                                            ],
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
                                        <span className='font-12'>{isDateShow ? label : "Select Date"}</span> <i className="fa fa-caret-down"></i>
                                    </div>
                                </DateRangePicker>
                            </Box>

                            <hr className='mt-1' />

                            <Button variant="contained" className='btn-blue-2' onClick={() => {
                                let formated_start_date = format_YYYY_MM_DD(start._d);
                                let formated_end_date = format_YYYY_MM_DD(end._d);
                                let obj = { ...documentData, ItemFDate: isDateShow ? formated_start_date : "01/01/1900", ItemTDate: isDateShow ? formated_end_date : "01/01/1900" };
                                setDocumentData(obj);
                                Json_AdvanceSearchDoc(obj);
                                // dispatch(setAdvanceSearchResultFromRedux({docs:[], descriptions:[],isLoading:true}));
                                // dispatch(Json_AdvanceSearchDocFromRedux("","test",obj));
                                // navigate("/dashboard/DocumentList?filter=true&adv=true");
                            }}>
                                Apply
                            </Button>
                            {documentId !== "" && <Button variant="contained" size="small" onClick={() => {
                                Json_SearchDocById();
                            }} className='ms-2'>
                                By ID
                            </Button>}
                        </Box>

                    </Box>
                </Box>
            </Popover>
        </div>
    )
}

export default AdvanceSearch