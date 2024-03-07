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
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';

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

export default function DocumentList({clientId}) {
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
    let Cls = new CommanCLS(baseUrl, agrno, Email, password);
    const [documents, setDocuments] = useState([]);
    const [groupedOptions, setgroupedOptions] = useState([]);
    const [toggleScreen, setToggleScreen] = useState(false);
    const [filteredDocResult,setFilteredDocResult] = useState([]);

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
                    if(json.Table6){
                        let docs = json.Table6.length >= 100 ? json.Table6.slice(0, 80) : json.Table6;
                        setDocuments(docs);
                            // let desc = docs.map((item)=>{
                            //     if(item.Description!==null)
                            // });
                            // console.log("desc",desc);
                            // setgroupedOptions(desc);
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
    const handleSearch=(text)=>{
        if(documents.length>0){
            let filteredDocuments = documents.filter((item)=>{
                return Object.entries(item).join("").toLowerCase().includes(text.toLowerCase());
            });
            setFilteredDocResult(filteredDocuments);
        }
    }


    function getInputProps(params) {

    }
    function getRootProps(params) {

    }
    function getListboxProps(params) {

    }
    function getOptionProps(params) {

    }
    return (
        <>
        <div style={{textAlign:"end"}}>{toggleScreen?<AppsIcon onClick={()=>setToggleScreen(!toggleScreen)}/>:<ListIcon onClick={()=>setToggleScreen(!toggleScreen)}/>}</div>

            { toggleScreen? 
                (documents.length>0 && <DataGrid
                    id="dataGrid"
                    style={{width:"1600px"}}
                    dataSource={documents}
                    columnAutoWidth={true}
                    showBorders={true}>
                    <Column dataField="Description" dataType="string" caption="Discount"/>
                    <Column dataField="Section" dataType="string" caption="Section"/>
                    <Column dataField="SubSection" dataType="string" caption="Sub"/>
                    <Column dataField="Item Date" dataType="date" caption="Doc. Date"/>
                    <Column dataField="Received Date" dataType="date" caption="Received Date"/>
                    <Column dataField="Category" dataType="string" caption="Category"/>
                    <Column dataField="Client" dataType="string" caption="Reference"/>    
                    <Column dataField="FileSize" dataType="string" caption="File Size"/> 
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
                (<><Layout>
                    <AutocompleteWrapper>
                        <AutocompleteRoot
                            sx={{
                                borderColor: '#D5D5D5',
                                color: 'success.main',
                            }}
                            {...getRootProps()}
                        // className={focused ? 'Mui-focused' : ''}
                        >
                            <span className="material-symbols-outlined search-icon">search</span>
    
                            <Input {...getInputProps()} onChange={(e)=>handleSearch(e.target.value)} placeholder='Search' className='ps-0' />
                        </AutocompleteRoot>
                        {groupedOptions.length > 0 && (
                            <Listbox {...getListboxProps()}>
                                {groupedOptions.map((option, index) => (
                                    <Option {...getOptionProps({ option, index })}>{option}</Option>
                                ))}
                            </Listbox>
                        )}
                    </AutocompleteWrapper>
                </Layout>
    
                <Box className='row'>
                    {documents.length > 0 && documents.map((item) => {
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
                            {/* file upload end */}
                        </Box>
                    })}
                </Box></>)
            }

            

            
        </>
    );
}
