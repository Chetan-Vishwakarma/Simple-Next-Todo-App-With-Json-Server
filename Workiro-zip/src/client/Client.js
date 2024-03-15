import React, { useEffect, useState } from 'react'
import { Box, TextField, Typography } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CardView from './client-components/CardView';
import CommanCLS from '../services/CommanService';
import ClientGrid from '../components/ClientGrid';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Button from "@mui/material/Button";
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const CommonFilters = [
    {key:"Company Name",val:"Company Name"},    {key:"Address 1",val:"Address Line 1"},
    {key:"Address 2",val:"Address Line 2"},    {key:"Address 3",val:"Address Line 3"},
    {key:"County",val:"County"},    {key:"Postcode",val:"Postcode"},
    {key:"Country",val:"Country"},    {key:"ContactNo",val:"Contact Number"},
    {key:"Mobile",val:"Mobile Number"},    {key:"E-Mail",val:"E-Mail"},
    {key:"Status",val:"StatusName"},    {key:"SourceName",val:"Source"},
    {key:"First Name",val:"First Name"},    {key:"Last Name",val:"Last Name"},
    {key:"Title",val:"Title"}
];

const ContactFilters = [
    {key:"Active",val:"Active"},    {key:"Address 1",val:"Address 1"},
    {key:"Address 2",val:"Address 2"},    {key:"Address 3",val:"Address 3"},
    {key:"Assigned Manager",val:"Assigned Manager"},    {key:"Company Name",val:"Company Name"},
    {key:"ContactNo",val:"ContactNo"},    {key:"Country",val:"Country"},
    {key:"County",val:"County"},    {key:"Date Of Birth",val:"Date Of Birth"},
    {key:"E-Mail",val:"E-Mail"},    {key:"First Name",val:"First Name"},
    {key:"Last Name",val:"Last Name"},    {key:"Main Contact",val:"Main Contact"},
    {key:"ManagerName",val:"ManagerName"},   {key:"Mobile",val:"Mobile"},
    {key:"Note",val:"Note"},    {key:"Date Of Birth",val:"Date Of Birth"},
    {key:"E-Mail",val:"E-Mail"},    {key:"OriginatorNo",val:"OriginatorNo"},
    {key:"Portal User",val:"Portal User"},    {key:"Postcode",val:"Postcode"},
    {key:"Preferred Name",val:"Preferred Name"},{key:"Role",val:"Role"},
    {key:"SourceName",val:"SourceName"},    {key:"StatusName",val:"StatusName"},
    {key:"Tel",val:"Tel"},    {key:"Title",val:"Title"},
    {key:"Town",val:"Town"},
];

const ClientFilters = [
    {key:"OriginatorNo",val:"OriginatorNo"},    {key:"Company Name",val:"Company Name"},
    {key:"Contact Number",val:"Contact Number"},    {key:"Mobile Number",val:"Mobile Number"},
    {key:"Assigned Manager",val:"Assigned Manager"},    {key:"Company Name",val:"Company Name"},
    {key:"Mobile Number",val:"Mobile Number"},    {key:"Address Line 1",val:"Address Line 1"},
    {key:"Address Line 2",val:"Address Line 2"},    {key:"Address Line 3",val:"Address Line 3"},
    {key:"Town",val:"Town"},    {key:"County",val:"County"},
    {key:"Postcode",val:"Postcode"},    {key:"Country",val:"Country"},
    {key:"Active Status",val:"Active Status"},   {key:"Business",val:"Business"},
    {key:"Source",val:"Source"},    {key:"Status",val:"Status"},
    {key:"First Name",val:"First Name"},    {key:"Last Name",val:"Last Name"},
    {key:"Title",val:"Title"},    {key:"E-Mail",val:"E-Mail"},
    {key:"Manager",val:"Manager"},
    {key:"CompanyNo",val:"CompanyNo"}
];


function Client() {

    const navigate = useNavigate();

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));

    //const data = useSelector((state) => state.counter.value);
    //const dispatch = useDispatch();
    const [clients, setClients] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [onlyContacts, setOnlyContacts] = useState(true);
    const [onlyClients, setOnlyClients] = useState(true);
    const [selectedChoice, setSelectedChoice] = useState("All");
    const [isChoice, setIsChoice] = useState(false);
    // Folders state start
    const [allFolders, setAllFolders] = useState([]);
    const [isFolder, setIsFolder] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState("Clients");
    const [filteredFoldersList,setFilteredFoldersList] = useState([]);
    // Folders state ends
    // advance filter states start
    const [isAdvFilter, setIsAdvFilter] = useState(false);
    const [clientKeys, setClientKeys] = useState([]);
    const [contactKeys, setContactKeys] = useState([]);
    const [advSearchKeyValue, setAdvSearchKeyValue] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState("");
    const [selectedPropertyValue, setSelectedPropertyValue] = useState("");
    const colorArr = ["#e26124", "#20aedb", "#075adb", "#be1de8", "#00983b", "#ed32b3"];
    const [selectedColor, setSelectedColor] = useState(advSearchKeyValue.length===1?colorArr[2]:advSearchKeyValue.length===2?colorArr[4]:colorArr[0]);
    const [isFirstColorSelected,setIsFirstColorSelected] = useState(true);
    const [firstAdvFilterResult,setFirstAdvFilterResult] = useState([]);
    const [secondAdvFilterResult,setSecondAdvFilterResult] = useState([]);
    const [thirdAdvFilterResult,setThirdAdvFilterResult] = useState([]);
    // advance filter states ends
    // search box states start
    const [isSearch, setIsSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredClientsForSearchBox, setFilteredClientsForSearchBox] = useState([]);
    const [filteredContactsForSearchBox, setFilteredContactsForSearchBox] = useState([]);
    // search box states ends

    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
    const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";

    let Cls = new CommanCLS(baseUrl, agrno, Email, password);
    let practiceCls = new CommanCLS(baseUrlPractice, agrno, Email, password);

    const Json_GetFolders = () => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password
        };
        try {
            Cls.Json_GetFolders(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_GetFolders", json);
                        setAllFolders(json.Table);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetFolders", err);
        }
    }

    const Json_GetContactListByFolder = (folderId = folderId) => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            intFolderId: folderId
        };
        try {
            Cls.Json_GetContactListByFolder(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_GetContactListByFolder", json);
                        setContacts(formateDate(json?.Table));  // ye date formate ke liye use kiya he
                        setContactKeys(Object.keys(json.Table[0]));
                        Json_GetFolders();
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetContactListByFolder", err);
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
            practiceCls.Json_GetSupplierListByProject(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        console.log("Json_GetSupplierListByProject", json);
                        setClients(json?.Table);
                        setClientKeys(Object.keys(json.Table[0]));
                        Json_GetContactListByFolder(folder_id);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetSupplierListByProject", err);
        }
    }

    function startFormattingDate(dt) {
        const timestamp = parseInt(/-\d+/.exec(dt));
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        return formattedDate;
    }
    let formateDate = (data) => {
        let key = "Date Of Birth"
        data.map((item, i) => {
            if (item[key] !== null) {
                item[key] = startFormattingDate(item[key]);
            }
        })
        return data;
    }
    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        Json_GetSupplierListByProject();
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
        Json_GetSupplierListByProject(folderID);
        Json_GetContactListByFolder(folderID);
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
    let handleAdvanceFilterAgain = () => {
        if (selectedProperty !== "" && selectedPropertyValue !== "" && selectedColor) {
            //console.log("Success");
            setAdvSearchKeyValue([...advSearchKeyValue, { key: selectedProperty, value: selectedPropertyValue, color: selectedColor }]);
            setSelectedProperty("");
            setSelectedPropertyValue("");
            setSelectedColor("");
        } else {
            alert("All Fields Are Required Including Colors");
        }
    }

    useEffect(() => {
        //console.log("advSearchKeyValue",advSearchKeyValue);
        if (advSearchKeyValue.length === 1) {
            let key = advSearchKeyValue[0].key;
            let value = advSearchKeyValue[0].value;
            if (clientKeys.includes(key)) {
                let filteredClient = clients.filter((item) => {
                    return Object.values(item).join('').toLowerCase().includes(value.toLowerCase());
                });
                //console.log("filteredCient", filteredClient);
                if (filteredClient.length !== 0) {
                    setFilteredClients(filteredClient);
                    setOnlyClients(true);
                    setOnlyContacts(false);
                }
            } else if (contactKeys.includes(key)) {
                let filteredContact = contacts.filter((item) => {
                    console.log(item[key]);
                    return Object.values(item).join('').toLowerCase().includes(value.toLowerCase());
                });
                //console.log("filteredContact", filteredContact);
                if (filteredContact.length !== 0) {
                    setFilteredContacts(filteredContact);
                    setOnlyClients(false);
                    setOnlyContacts(true);
                }
            }
        } else if (advSearchKeyValue.length > 1) {
            let isCLientKey = advSearchKeyValue.map((item) => {
                return clientKeys.includes(item.key);
            }).every((item) => item === true);

            let isContactKey = advSearchKeyValue.map((item) => {
                return contactKeys.includes(item.key);
            }).every((item) => item === true);

            // console.log("isClientKey", isCLientKey);
            // console.log("isContactKey", isContactKey);

            if (isCLientKey) {
                // console.log("isClientKey");
                let advResult = advSearchKeyValue.map((item) => {
                    return clients.filter((data) => {
                        return data[item.key].toLowerCase().includes(item.value.toLowerCase());
                    });
                });
                //console.log("advResult",advResult);
                let isEmpty = advResult.slice(0, advResult.length - 1).some((item) => item.length === 0);
                // console.log("isEmpty", isEmpty);
                if (!isEmpty) {
                    setFilteredClients(advResult[1]);
                    setOnlyContacts(false);
                    setOnlyClients(true);
                }
                //setFilteredClients(advResult[1]);
            } else if (isContactKey) {
                // console.log("isContactKey");
                let advContactResult = advSearchKeyValue.map((item) => {
                    return contacts.filter((data) => {
                        return data[item.key].toLowerCase().includes(item.value.toLowerCase());
                    });
                });
                // console.log("advContactResult",advContactResult[1]);
                let isEmpty = advContactResult.slice(0, advContactResult.length - 1).some((item) => item.length === 0);
                if (!isEmpty) {
                    setFilteredContacts(advContactResult[1]);
                    setOnlyContacts(true);
                    setOnlyClients(false);
                }
            }
        } else {
            setFilteredClients([]);
            setFilteredContacts([]);
        }
    }, [advSearchKeyValue]);




    function filterData(data, filters) {
        return data.filter(item => {
          // Check if item satisfies all filters
          return filters.every(filter => {
            // Check each filter criterion
            return Object.entries(filter).every(([key, value]) => {
              return item[key] === value;
            });
          });
        });
      }
    useEffect(() => {
        
        filterData(clients,advSearchKeyValue);
    }, [advSearchKeyValue]);





    let handleFilterRemove = (filterForRemove) => {
        let target = filterForRemove.key;
        if (advSearchKeyValue.length === 1) {
            setAdvSearchKeyValue([]);
        } else {
            setAdvSearchKeyValue(advSearchKeyValue.filter((item) => item.key !== target));
        }
    }
    let handleDialogsOpen = (e, toOpen) => {
        e.stopPropagation();
        if (toOpen === "Folder") {
            setFilteredFoldersList([]);
            setIsFolder(!isFolder);
            setIsChoice(false);
            setIsAdvFilter(false);
            setIsSearch(false);
        } else if (toOpen === "Choice") {
            setIsFolder(false);
            setIsChoice(!isChoice);
            setIsAdvFilter(false);
            setIsSearch(false);
        } else if (toOpen === "AdvFilter") {
            setIsFolder(false);
            setIsChoice(false);
            setIsAdvFilter(!isAdvFilter);
            setIsSearch(false);
        } else if (toOpen === "Search") {
            setIsFolder(false);
            setIsChoice(false);
            setIsAdvFilter(false);
            setIsSearch(!isSearch);
        }
    }
    function handleClick(event) {
        event.preventDefault();
        setIsFolder(false);
        setIsAdvFilter(false);
        setIsChoice(false);
        setIsSearch(false);
    }
    const handleContactNavigattion = (originator_no, contact_no) => {
        navigate('/dashboard/ContactDetails', {
            state: {
                agrno: agrno,
                Email: Email,
                password: password,
                folderId: folderId,
                originatorNo: originator_no,
                contactNo: contact_no
            }
        })
    }
    const handleClientNavigation = (clientId) => {
        navigate('/dashboard/clientDetails', {
            state: {
                agrno: agrno,
                Email: Email,
                password: password,
                folderId: folderId,
                originatorNo: clientId
            }
        })
    }
    const [isGridView, setIsGridView] = useState(false);
    const [isCardView, setIsCardView] = useState(true);
    return (
        <Box className='container-fluid p-0' onClick={handleClick}>

            {isGridView && <div style={{ textAlign: "end" }}><AppsIcon onClick={() => {
                setIsCardView(!isCardView);
                setIsGridView(!isGridView);
            }} /></div>}

            {isCardView && <div style={{ textAlign: "end" }}><ListIcon onClick={() => {
                setIsCardView(!isCardView);
                setIsGridView(!isGridView);
            }} /></div>}
            {/* <div role="presentation" className='mb-2 mb-3 '>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Clients
                    </Link>
                    <Typography color="text.primary">Client Details</Typography>
                </Breadcrumbs>
            </div> */}



            <Box className='row'>
                <Box className='col-lg-12'>
                    <Box className='d-flex main-search-box mb-2'>
                        <Box className="search-box">
                            <Layout>
                                <AutocompleteWrapper>
                                    <AutocompleteRoot
                                        sx={{
                                            borderColor: '#D5D5D5',
                                            color: 'success.main',
                                        }}
                                        className={isSearch ? 'Mui-focused' : ''}>
                                        <span className="material-symbols-outlined search-icon">search</span>

                                        <Input onClick={(e) => handleDialogsOpen(e, "Search")} onChange={(e) => handleSearch(e.target.value)} placeholder='Search' className='ps-0' />
                                    </AutocompleteRoot>

                                    {isSearch && <Listbox sx={{zIndex:1}}>
                                        {filteredClientsForSearchBox.length > 0 ? filteredClientsForSearchBox.map((option, i) => (
                                            <Option key={i} onClick={() => handleClientNavigation(option.OriginatorNo)}>
                                                <ApartmentIcon className='me-1' />
                                                {option["Company Name"]}</Option>
                                        )) : clients.map((option, i) => (
                                            <Option key={i} onClick={() => handleClientNavigation(option.OriginatorNo)}><ApartmentIcon className='me-1' />{option["Company Name"]}</Option>
                                        ))}
                                        {filteredContactsForSearchBox.length > 0 ? filteredContactsForSearchBox.map((option, i) => (
                                            <Option key={i} onClick={() => handleContactNavigattion(option.OriginatorNo, option.ContactNo)}><PersonIcon className='me-1' />{option["First Name"]} {option["Last Name"]}</Option>
                                        )) : contacts.map((option, i) => (
                                            <Option key={i} onClick={() => handleContactNavigattion(option.OriginatorNo, option.ContactNo)}><PersonIcon className='me-1' />{option["First Name"]} {option["Last Name"]}</Option>
                                        ))}
                                    </Listbox>}

                                </AutocompleteWrapper>
                            </Layout>
                        </Box>

                        <Box className="dropdown-box ms-4 d-flex align-items-center">
                            <Button className='btn-select' onClick={(e) => handleDialogsOpen(e, "Folder")}>{selectedFolder}</Button>
                            {isFolder && <Box className="btn-Select">
                                <TextField placeholder='Search...' size='small' sx={{display:"block"}} onChange={(e)=>{
                                    e.stopPropagation();
                                    let val = e.target.value;
                                    let fltFolders = allFolders.filter((fld)=>fld.Folder.toLowerCase().includes(val.toLowerCase()));
                                    setFilteredFoldersList(fltFolders);
                                }} onClick={(e)=>e.stopPropagation()}/>
                                {filteredFoldersList.length>0?filteredFoldersList.map((item) => {
                                    // pass folder-id in onClick handler
                                    return <Button className='btn-white' onClick={() => handleFolderSelection(item.FolderID, item.Folder)}>{item.Folder}</Button>;
                                }):allFolders.map((item) => {
                                    // pass folder-id in onClick handler
                                    return <Button className='btn-white' onClick={() => handleFolderSelection(item.FolderID, item.Folder)}>{item.Folder}</Button>;
                                })}
                            </Box>}
                        </Box>

                        {isGridView && <Box className="dropdown-box ms-4 d-flex align-items-center">
                            <Button className='btn-select' onClick={(e) => handleDialogsOpen(e, "Choice")}>{selectedChoice==="All"?"Contacts":selectedChoice}</Button>
                            {isChoice && <Box className="btn-list-box btn-Select">
                                {["Clients", "Contacts"].map((item) => {
                                    return <Button className='btn-list' onClick={() => basedOnClientContactAndAll(item)}>{item}</Button>
                                })}
                            </Box>}
                        </Box>}

                        {isCardView && <><Box className="dropdown-box ms-4 d-flex align-items-center">
                            <Button className='btn-select' onClick={(e) => handleDialogsOpen(e, "Choice")}>{selectedChoice}</Button>
                            {isChoice && <Box className="btn-list-box btn-Select">
                                {["All", "Clients", "Contacts"].map((item) => {
                                    return <Button className='btn-list' onClick={() => basedOnClientContactAndAll(item)}>{item}</Button>
                                })}
                            </Box>}
                        </Box>

                        <Box className="dropdown-box ms-4 d-flex align-items-center">
                            <Box>
                                <Fab size="small" className='btn-plus' aria-label="add" onClick={(e) => handleDialogsOpen(e, "AdvFilter")}>
                                    <AddIcon />
                                </Fab>
                            </Box>

                            {isAdvFilter && <Box className="btn-Select color-pic-box" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}>
                                <Box className='clearfix'>

                                    <Box className='clearfix'>
                                        <Typography variant='Body1' className='mb-2 d-block  bold'>Filter:</Typography>
                                        {/* <Box className="mb-2">
                                            {advSearchKeyValue.map((item) => {
                                                return <Button sx={{ backgroundColor: item.color }} className='btn-white'>{item.key}: {item.value}
                                                    <span onClick={() => handleFilterRemove(item)} className="material-symbols-outlined font-16 text-danger">
                                                        close
                                                    </span></Button>
                                            })}

                                            <Fab size="small" className='btn-plus  ms-2' aria-label="add">
                                                <AddIcon />
                                            </Fab>
                                        </Box> */}

                                        <Box className='row'>
                                            <Box className='col-md-4'>
                                                <Box className='mb-2'>
                                                    <label>Select Property</label>
                                                    <select value={selectedProperty} onChange={(e) => { setSelectedProperty(e.target.value) }} class="form-select" aria-label="Default select example">
                                                        <option value={""}>Select</option>
                                                        {/* {!onlyContacts&&clientKeys.map((item, i) => {
                                                            return <option key={i} value={item}>{item}</option>
                                                        })}
                                                        {!onlyClients&&contactKeys.map((item, i) => {
                                                            return <option key={i} value={item}>{item}</option>
                                                        })} */}
                                                        {/* {(onlyContacts&&onlyClients)&&clientKeys.map((item, i) => {
                                                            return <option key={i} value={item}>{item}</option>
                                                        })} */}
                                                        {/* {(onlyClients&&onlyContacts)&&contactKeys.map((item, i) => {
                                                            return <option key={i} value={item}>{item}</option>
                                                        })} */}
                                                        {!onlyContacts&&ClientFilters.map((item, i) => {
                                                            return <option key={i} value={item.key}>{item.val}</option>
                                                        })}
                                                        {!onlyClients&&ContactFilters.map((item, i) => {
                                                            return <option key={i} value={item.key}>{item.val}</option>
                                                        })}
                                                        {(onlyContacts&&onlyClients)&&CommonFilters.map((item, i) => {
                                                            return <option key={i} value={item.key}>{item.val}</option>
                                                        })}
                                                    </select>
                                                </Box>
                                            </Box>
                                            <Box className='col-md-4 px-0'>
                                                <Box className='mb-2'>
                                                    <label>Value</label>
                                                    <input value={selectedPropertyValue} onChange={(e) => { setSelectedPropertyValue(e.target.value) }} type="text" class="form-control" placeholder="Type Value" />
                                                </Box>
                                            </Box>
                                            <Box className='col-md-4'>
                                                <Box className='clearfix'>
                                                    <Typography variant='Body1' className='mb-1'>Labels</Typography>

                                                    <Box className="color-box">
                                                        {
                                                            advSearchKeyValue.length === 0 && <><button onClick={(e) => {
                                                                setSelectedColor(colorArr[0]);
                                                                setIsFirstColorSelected(true);
                                                            }} type='button' className={isFirstColorSelected?'btn-color selected':'btn-color'} style={{ backgroundColor: colorArr[0] }}></button>
                                                                <button onClick={() => {
                                                                    setSelectedColor(colorArr[1]);
                                                                    setIsFirstColorSelected(false);
                                                                }} type='button' className={isFirstColorSelected?'btn-color':'btn-color selected'} style={{ backgroundColor: colorArr[1] }}></button></>
                                                        }
                                                        {
                                                            advSearchKeyValue.length === 1 && <><button onClick={(e) => {
                                                                setSelectedColor(colorArr[2]);
                                                                setIsFirstColorSelected(true);
                                                            }} type='button' className={isFirstColorSelected?'btn-color selected':'btn-color'} style={{ backgroundColor: colorArr[2] }}></button>
                                                                <button onClick={() => {
                                                                    setSelectedColor(colorArr[3]);
                                                                    setIsFirstColorSelected(false);
                                                                }} type='button' className={isFirstColorSelected?'btn-color':'btn-color selected'} style={{ backgroundColor: colorArr[3] }}></button></>
                                                        }
                                                        {
                                                            advSearchKeyValue.length === 2 && <><button onClick={(e) => {
                                                                setSelectedColor(colorArr[4]);
                                                                setIsFirstColorSelected(true);
                                                            }} type='button' className={isFirstColorSelected?'btn-color selected':'btn-color'} style={{ backgroundColor: colorArr[4] }}></button>
                                                                <button onClick={() => {
                                                                    setSelectedColor(colorArr[4]);
                                                                    setIsFirstColorSelected(false);
                                                                }} type='button' className={isFirstColorSelected?'btn-color':'btn-color selected'} style={{ backgroundColor: colorArr[5] }}></button></>
                                                        }
                                                        {/* {
                                                            advSearchKeyValue.length === 1 && <><button onClick={() => setSelectedColor(colorArr[2])} type='button' className='btn-color selected' style={{ backgroundColor: colorArr[2] }}></button>
                                                                <button onClick={() => setSelectedColor(colorArr[3])} type='button' className='btn-color' style={{ backgroundColor: colorArr[3] }}></button></>
                                                        }
                                                        {
                                                            advSearchKeyValue.length === 2 && <><button onClick={() => setSelectedColor(colorArr[4])} type='button' className='btn-color selected' style={{ backgroundColor: colorArr[4] }}></button>
                                                                <button onClick={() => setSelectedColor(colorArr[5])} type='button' className='btn-color' style={{ backgroundColor: colorArr[5] }}></button></>
                                                        } */}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>


                                        <Box className='mt-2'>
                                            <Button onClick={handleAdvanceFilterAgain} variant="contained" size='small' color="success">
                                                <span class="material-symbols-outlined">
                                                    add
                                                </span> Add
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>}
                        </Box>
                        {/*  */}

                        <Box className="mb-2 ms-3">
                            {advSearchKeyValue.map((item) => {
                                return <Button sx={{ backgroundColor: item.color }} className='btn-white text-white'><span className='text-white'>{item.key}: {item.value}</span>
                                    <span onClick={() => handleFilterRemove(item)} className="material-symbols-outlined font-16 text-white">
                                        close
                                    </span></Button>
                            })}

                            {/* <Fab size="small" className='btn-plus  ms-2' aria-label="add">
                                <AddIcon />
                            </Fab> */}
                        </Box></>}


                    </Box>

                    <Box className='row'>
                        {isGridView && <ClientGrid onlyContacts={onlyClients} data={onlyContacts? contacts: clients}/>}

                        {isCardView && <CardView
                            isSearch={isSearch}
                            handleDialogsOpen={handleDialogsOpen}
                            handleSearch={handleSearch}
                            filteredClientsForSearchBox={filteredClientsForSearchBox}
                            handleClientNavigation={handleClientNavigation}
                            filteredContactsForSearchBox={filteredContactsForSearchBox}
                            handleContactNavigattion={handleContactNavigattion}
                            handleFolderSelection={handleFolderSelection}
                            isFolder={isFolder}
                            allFolders={allFolders}
                            isChoice={isChoice}
                            isAdvFilter={isAdvFilter}
                            selectedProperty={selectedProperty}
                            setSelectedProperty={setSelectedProperty}
                            clientKeys={clientKeys}
                            contactKeys={contactKeys}
                            selectedPropertyValue={selectedPropertyValue}
                            setSelectedPropertyValue={setSelectedPropertyValue}
                            advSearchKeyValue={advSearchKeyValue}
                            setSelectedColor={setSelectedColor}
                            colorArr={colorArr}
                            handleAdvanceFilterAgain={handleAdvanceFilterAgain}
                            handleFilterRemove={handleFilterRemove}
                            onlyClients={onlyClients}
                            filteredClients={filteredClients}
                            clients={clients}
                            onlyContacts={onlyContacts}
                            filteredContacts={filteredContacts}
                            contacts={contacts}
                            selectedFolder={selectedFolder}
                            selectedChoice={selectedChoice}
                            basedOnClientContactAndAll={basedOnClientContactAndAll}
                        />}
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
