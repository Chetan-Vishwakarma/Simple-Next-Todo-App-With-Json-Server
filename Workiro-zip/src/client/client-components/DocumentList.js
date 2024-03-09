import React, { useEffect, useState } from 'react';
import CommanCLS from '../../services/CommanService';
import DescriptionIcon from '@mui/icons-material/Description';
import DataGrid, {
    Column, FilterRow, Search, SearchPanel, Selection,
    HeaderFilter, Scrolling,
    FilterPanel,
    Pager, Paging, DataGridTypes,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import DocumentDetails from '../../components/DocumentDetails';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function DocumentList({ clientId }) {
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    let Cls = new CommanCLS(baseUrl, agrno, Email, password);
    const [documents, setDocuments] = useState([]);
    const [groupedOptions, setgroupedOptions] = useState([]);
    const [toggleScreen, setToggleScreen] = useState(false);
    const [filteredDocResult, setFilteredDocResult] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [advFilteredResult, setAdvFilteredResult] = useState([]);
    const [age, setAge] = React.useState('');



    // 
    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const handleSearchOpen = (text) => {
        if (text === "InputSearch") {
            setIsSearchOpen(!isSearchOpen);
        } else {
            setIsSearchOpen(false);
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
                        setDocuments(docs);
                        let desc = docs.filter((item) => item.Description !== "");
                        console.log("desc", desc);
                        setgroupedOptions(desc);
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
        const lastSixMonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5);
        const month = lastSixMonthsDate.getMonth() + 1; // Adding 1 because January is represented as 0
        const year = lastSixMonthsDate.getFullYear();
        return `${month}/${year}`;
    }
    const handleDocumentsFilter = (target) => {
        if (target === "LastMonth") {
            // console.log(getLastMonth().split("/"));
            let last = getLastMonth().split("/");
            documents.map((itm) => itm["Item Date"] = formatDate(itm["Item Date"]));
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                if (all[1] >= last[0] && all[2] === last[1]) {
                    return itm;
                }
            });
            setAdvFilteredResult(fltData);
        } else if (target === "LastSixMonth") {
            let last = getLastSixMonthsDate().split("/");
            console.log(last);
            documents.map((itm) => itm["Item Date"] = formatDate(itm["Item Date"]));
            // documents.map((itm)=>console.log(itm["Item Date"]));
            let fltData = documents.filter((itm) => {
                let all = itm["Item Date"].split("/");
                console.log(all[1], "--", all[2], "-----", last[0], "--", last[1]);
                // if(all[1]>=last[0] && all[2]===last[1]){
                //     return itm;
                // }
            });
            // setAdvFilteredResult(fltData);
        }
    }




    function getRootProps(params) { }
    function getListboxProps(params) { }



    return (
        <>
            <div style={{ textAlign: "end" }}>{toggleScreen ? <AppsIcon onClick={() => setToggleScreen(!toggleScreen)} /> : <ListIcon onClick={() => setToggleScreen(!toggleScreen)} />}</div>

            {toggleScreen ?
                (documents.length > 0 && <DataGrid
                    id="dataGrid"
                    style={{ width: "1600px" }}
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
                </DataGrid>) :
                (<>


                    {/* <div>
                        <button onClick={() => handleDocumentsFilter("LastMonth")}>LastMonth</button>
                        <button onClick={() => handleDocumentsFilter("LastSixMonth")}>LastSixMonth</button>
                    </div> */}



                    <Box className='d-flex flex-wrap justify-content-between align-items-center'>

                        <Box  sx={{ m: 1, width: 240 }}>
                            <DateRangePicker className='m-0 p-0'>
                                <input type="text" className="form-control col-4" />
                            </DateRangePicker>
                        </Box>

                        <Box className='clearfix'>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Age</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                    </Box>





                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"

                    >

                        <Grid item xs={12} sm={10} md={6} lg={5} className='white-box'>

                            <Box className='d-flex m-auto justify-content-center w-100 align-items-end'>
                                <Layout className='d-flex w-100 d-none'>
                                    <AutocompleteWrapper className='w-100'>
                                        <AutocompleteRoot
                                            className='w-100'
                                            sx={{
                                                borderColor: '#D5D5D5',
                                                color: 'success.main',
                                            }}
                                            {...getRootProps()}
                                        // className={focused ? 'Mui-focused' : ''}
                                        >
                                            <span className="material-symbols-outlined search-icon">search</span>

                                            <Input onClick={() => handleSearchOpen("InputSearch")} onChange={(e) => handleSearch(e.target.value)} placeholder='Search' className='ps-0 w-100' />
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
                                </Layout>

                                <Box className='row w-100 pe-3 d-non'>
                                    <Box className='col-md-6'>
                                        <Box className='mb-2'>
                                            <label>Select Property</label>
                                            <select class="form-select" aria-label="Default select example">
                                                <option>Select</option>
                                            </select>
                                        </Box>
                                    </Box>
                                    <Box className='col-md-6 px-0'>
                                        <Box className='mb-2'>
                                            <label>Value</label>
                                            <input type="text" class="form-control" placeholder="Type Value" />
                                        </Box>
                                    </Box>
                                </Box>

                                <Button className='btn-blue-2' sx={{ ml: '12px' }} onClick={() => handleDocumentsFilter("LastMonth")}>Toggle</Button>

                            </Box>

                            <Box className='mt-2'>
                                <Stack direction="row" spacing={1}>
                                    <Chip label="Client: patrick" variant="outlined" onDelete={handleDelete} />

                                    <Chip label="Tell: 65456" variant="outlined" onDelete={handleDelete} />

                                </Stack>
                            </Box>

                            <Box className='mt-4'>
                                <DocumentDetails></DocumentDetails>
                            </Box>

                        </Grid>
                    </Grid>

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
                </>)
            }
        </>
    );
}
