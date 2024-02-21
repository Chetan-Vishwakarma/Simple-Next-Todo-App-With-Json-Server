import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from '@mui/material';
import user from "../images/user.jpg";
import Button from "@mui/material/Button";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// search

import axios from "axios";
import { useNavigate } from 'react-router-dom';





import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';

const options = ['Firefox', 'Google Chrome', 'Microsoft Edge', 'Safari', 'Opera'];


function Client() {

    const navigate = useNavigate();
    // const [value, setValue] = React.useState(options[0]);
    // const [inputValue, setInputValue] = React.useState('');

    // const {
    //     getRootProps,
    //     getInputProps,
    //     getListboxProps,
    //     getOptionProps,
    //     groupedOptions,
    //     focused,
    // } = useAutocomplete({
    //     id: 'controlled-state-demo',
    //     options,
    //     value,
    //     onChange: (event, newValue) => setValue(newValue),
    //     inputValue,
    //     onInputChange: (event, newInputValue) => setInputValue(newInputValue),
    // });

    // const [age, setAge] = React.useState('');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };
    // search end


    //const data = useSelector((state) => state.counter.value);
    //const dispatch = useDispatch();
    const [clients, setClients] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [onlyContacts, setOnlyContacts] = useState(true);
    const [onlyClients, setOnlyClients] = useState(true);
    const [selectedChoice, setSelectedChoice] = useState("All");
    const [isChoice, setIsChoice] = useState(false);
    const [allFolders, setAllFolders] = useState([]);
    const [isFolder, setIsFolder] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState("Clients");
    const [isAdvFilter, setIsAdvFilter] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredClientsForSearchBox, setFilteredClientsForSearchBox] = useState([]);
    const [filteredContactsForSearchBox, setFilteredContactsForSearchBox] = useState([]);

    const apiUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
    let getClientsByFolder = async (folderID = "1") => {
        const response = await axios.post(`${apiUrl}Json_GetClientsByFolder`, {
            agrno: "0261",
            Email: "nabs@docusoft.net",
            password: "ZG9jdXNvZnQ=",
            ProjectId: folderID
        });
        let res = JSON.parse(response?.data?.d);
        //setBothClientContact(res?.Table1);
        console.log("getClientsByFolder", res?.Table1);
        setClients(res?.Table1);
    }
    let getContactsByFolder = async (folderID = "1", obj, clientKeys) => {
        const response = await axios.post(`${apiUrl}Json_GetContactListByFolder`, {
            agrno: "0261",
            Email: "nabs@docusoft.net",
            password: "ZG9jdXNvZnQ=",
            intFolderId: folderID
        });
        if (response?.data?.d !== '') {
            let res = JSON.parse(response?.data?.d);
            // console.log("obj",[...obj,...res?.Table]);
            //setContactKeys(Object.keys(res?.Table[0]));
            //let contactKeys = Object.keys(res?.Table[0]);
            //setAdvanceSearchKeys([...clientKeys,...contactKeys]);
            //setBothClientContact([...obj,...res?.Table]);
            setContacts(res?.Table);
            console.log("getContactsByFolder", res?.Table);
        }
    }
    let getAllFolders = async () => {
        const response = await axios.post(`${apiUrl}Json_GetFolders`, {
            agrno: "0261",
            Email: "nabs@docusoft.net",
            password: "ZG9jdXNvZnQ="
        });
        if (response.data.d !== "") {
            let res = JSON.parse(response.data.d).Table;
            setAllFolders(res);
        }
    }
    useEffect(() => {
        getClientsByFolder();
        getContactsByFolder();
        getAllFolders();
    }, []);
    const basedOnClientContactAndAll = (target) => {
        setSelectedChoice(target);
        if (target === "All") {
            setOnlyClients(true);
            setOnlyContacts(true);
        } else if (target === "Clients") {
            setOnlyClients(true);
            setOnlyContacts(false);
        } else if (target === "Contacts") {
            setOnlyClients(false);
            setOnlyContacts(true);
        }
        setIsChoice(false);
    }
    let handleFolderSelection = (folderID, folderName) => {
        setSelectedFolder(folderName);
        setIsFolder(false);
        getClientsByFolder(folderID);
        getContactsByFolder(folderID);
    }
    const handleSearch = (value) => {
        setSearchInput(value);
        // for clients filter
        let filteredClientData = clients.filter((item) => {
            return Object.entries(item).join('').toLowerCase().includes(searchInput.toLowerCase());
        });
        if (value === "") {
            setFilteredClientsForSearchBox([]);  // when you will face some issue then make an folderId state and pass folderId parameter in this function
        }
        if (filteredClientData.length === 0) {
            setFilteredClientsForSearchBox([]);
        } else {
            setFilteredClientsForSearchBox(filteredClientData);
        }
        // for contacts filter
        let filteredContactData = contacts.filter((item) => {
            return Object.entries(item).join('').toLowerCase().includes(searchInput.toLowerCase());
        });
        if (value === "") {
            setFilteredClientsForSearchBox([]);  // when you will face some issue then make an folderId state and pass folderId parameter in this function
        }
        if (filteredContactData.length === 0) {
            setFilteredContactsForSearchBox([]);
        } else {
            setFilteredContactsForSearchBox(filteredContactData);
        }

    }
    return (
        <Box className='container-fluid'>
            {/* <div className='select-for-clients-contacts-and-both'>
          <select onChange={(e)=>basedOnClientContactAndAll(e.target.value)}>
            {["All","Clients","Contacts"].map((item)=>{
              return <option value={item}>{item}</option>
            })}
          </select>  
        </div> */}
      <Box className='row'>
        <Box className='col-lg-12'>

                    <Box className='d-flex main-search-box'>

                        <Box className="search-box">
                            <Layout>
                                <AutocompleteWrapper>
                                    <AutocompleteRoot
                                        sx={{
                                            borderColor: '#D5D5D5',
                                            color: 'success.main',
                                        }}
                                        className={isSearch?'Mui-focused':''}>
                                        <span className="material-symbols-outlined search-icon">search</span>

                                        <Input onClick={() => setIsSearch(!isSearch)} onChange={(e) => handleSearch(e.target.value)} placeholder='Search' className='ps-0' />
                                    </AutocompleteRoot>

                                        {/* <Listbox>
                                        <Option>Firefox</Option>
                                        <Option>Chrome</Option>
                                        <Option>Safari</Option>
                                        </Listbox> */}

                                    {/* {isSearch && <Listbox>
                                        {filteredClientsForSearchBox.length > 0 ? filteredClientsForSearchBox.map((option, i) => (
                                            <Option key={i} onClick={() => navigate("/clientPage")}><span style={{ marginRight: "10px" }}>Client</span>{option.Client}</Option>
                                        )) : clients.map((option, i) => (
                                            <Option key={i} onClick={() => navigate("/clientPage")}><span style={{ marginRight: "10px" }}>Client</span>{option.Client}</Option>
                                        ))}
                                        {filteredContactsForSearchBox.length > 0 ? filteredContactsForSearchBox.map((option, i) => (
                                            <Option key={i} onClick={() => navigate("/contactPage")}><span style={{ marginRight: "10px" }}>Contact</span>{option["Company Name"]}</Option>
                                        )) : contacts.map((option, i) => (
                                            <Option key={i} onClick={() => navigate("/contactPage")}><span style={{ marginRight: "10px" }}>Contact</span>{option["Company Name"]}</Option>
                                        ))}
                                    </Listbox>} */}
                                </AutocompleteWrapper>
                            </Layout>
                        </Box>

                        <Box className="dropdown-box ms-4">
                            <Button className='btn-select' onClick={() => setIsFolder(!isFolder)}>{selectedFolder}</Button>
                            {isFolder && <Box className="btn-Select">
                                {allFolders.map((item) => {
                                    // pass folder-id in onClick handler
                                    return <Button className='btn-white' onClick={() => handleFolderSelection(item.FolderID, item.Folder)}>{item.Folder}</Button>
                                })}
                            </Box>}
                        </Box>

                        <Box className="dropdown-box ms-4">
                            <Button className='btn-select' onClick={() => setIsChoice(!isChoice)}>{selectedChoice}</Button>
                            {isChoice && <Box className="btn-list-box btn-Select">
                                {["All", "Clients", "Contacts"].map((item) => {
                                    return <Button className='btn-list' onClick={() => basedOnClientContactAndAll(item)}>{item}</Button>
                                })}
                            </Box>}
                        </Box>

                        <Box className="dropdown-box ms-4">
                            <Box>
                                <Fab size="small" className='btn-plus' aria-label="add" onClick={() => setIsAdvFilter(!isAdvFilter)}>
                                    <AddIcon />
                                </Fab>
                            </Box>

                            {isAdvFilter && <Box className="btn-Select color-pic-box">
                                <Box className='clearfix'>

                                    <Box className='clearfix'>
                                        <Typography variant='Body1' className='ps-1'>Filter:</Typography>
                                        <Box className="mb-2">
                                            <Button className='btn-white'>key: value <span className="material-symbols-outlined font-16 text-danger">
                                                close
                                            </span></Button>
                                            <Button className='btn-white'>key: value <span className="material-symbols-outlined font-16 text-danger">
                                                close
                                            </span></Button>

                                            <Fab size="small" className='btn-plus  ms-2' aria-label="add">
                                                <AddIcon />
                                            </Fab>


                                        </Box>


                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='mb-2'>
                                                    <label>Select Property</label>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option selected>Select Property</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-md-4 px-0'>
                                                <div className='mb-2'>
                                                    <label>Value</label>
                                                    <input type="text" className="form-control" placeholder="Type Value" />
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <Box className='clearfix'>
                                                    <Typography variant='Body1' className='mb-1'>Labels</Typography>

                                                    <Box className="color-box">
                                                        <button type='button' className='btn-color selected' style={{ backgroundColor: '#32ceff' }}></button>
                                                        <button type='button' className='btn-color' style={{ backgroundColor: '#ff3da6' }}></button>

                                                    </Box>
                                                </Box>
                                            </div>
                                        </div>

                                        <div className='mt-2'>
                                            <Button variant="contained" size='small' color="success">
                                                <span className="material-symbols-outlined">
                                                    add
                                                </span> Add
                                            </Button>
                                        </div>

                                    </Box>





                                </Box>
                            </Box>}

                        </Box>
                    </Box>


                    <Box className='row'>

                        {
                            onlyClients && clients.map((item) => {
                                return <Box className='client-box-main'>
                                    <Box className='client-box'>
                                        {/* <img src={pin} className='pin-img' /> */}
                                        <Box className='client-img'>
                                            <img src={user} />
                                        </Box>
                                        <Typography title={item.Client} variant="h2">{item.Client.substr(0, 12) + "."}</Typography>
                                        <Typography variant='h4'>Admin</Typography>
                                        <Typography title={item.Email} variant='p' className='mb-0'>{item.Email.substr(0, 22) + "."}</Typography>
                                        <Box className='color-filter-box mt-3'>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            })
                        }

                        {
                            onlyContacts && contacts.map((item) => {
                                return <Box className='client-box-main'>
                                    <Box className='client-box'>
                                        {/* <img src={pin} className='pin-img' /> */}
                                        <Box className='client-img'>
                                            <img src={user} />
                                        </Box>
                                        <Typography title={item["Company Name"]} variant="h2">{item["Company Name"].substr(0, 12) + "."}</Typography>
                                        <Typography variant='h4'>Admin</Typography>
                                        <Typography title={item["E-Mail"]} variant='p' className='mb-0'>{item["E-Mail"].substr(0, 22) + "."}</Typography>
                                        <Box className='color-filter-box mt-3'>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            })
                        }


                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const AutocompleteWrapper = styled('div')`
  position: relative;
`;

const AutocompleteRoot = styled('div')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 320px;

  &.Mui-focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const Input = styled('input')(
    ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`,
);

const Listbox = styled('ul')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  max-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 300px;
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
  `,
);

const Option = styled('li')(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.base--focused,
  &.base--focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.base--focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &[aria-selected=true].base--focused,
  &[aria-selected=true].base--focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const Layout = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;
`;

const Pre = styled('pre')(({ theme }) => ({
    margin: '0.5rem 0',
    fontSize: '0.75rem',
    '& code': {
        backgroundColor: theme.palette.mode === 'light' ? grey[100] : grey[900],
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? grey[300] : grey[700],
        color: theme.palette.mode === 'light' ? '#000' : '#fff',
        padding: '0.125rem 0.25rem',
        borderRadius: 3,
    },
}));



export default Client
