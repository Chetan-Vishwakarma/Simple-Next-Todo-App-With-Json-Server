import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CardView from './client-components/CardView';


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
    const [selectedColor, setSelectedColor] = useState("");
    // advance filter states ends
    // search box states start
    const [isSearch, setIsSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredClientsForSearchBox, setFilteredClientsForSearchBox] = useState([]);
    const [filteredContactsForSearchBox, setFilteredContactsForSearchBox] = useState([]);
    // search box states ends

    const apiUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
    let getClientsByFolder = async (folder_id=folderId) => {
        const response = await axios.post(`${apiUrl}Json_GetClientsByFolder`, {
            agrno: agrno,
            Email: Email,
            password: password,
            ProjectId: folder_id
        });
        let res = JSON.parse(response?.data?.d);
        //setBothClientContact(res?.Table1);
        console.log("getClientsByFolder", res?.Table1);
        setClients(res?.Table1);
        setClientKeys(Object.keys(res.Table1[0]));
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
    let getContactsByFolder = async () => {
        const response = await axios.post(`${apiUrl}Json_GetContactListByFolder`, {
            agrno: agrno,
            Email: Email,
            password: password,
            intFolderId: folderId
        });
        if (response?.data?.d !== '') {
            let res = JSON.parse(response?.data?.d);

            setContacts(formateDate(res?.Table));  // ye date formate ke liye use kiya he

            setContactKeys(Object.keys(res.Table[0]));
            console.log("getContactsByFolder", res?.Table);
        }
    }
    let getAllFolders = async () => {
        const response = await axios.post(`${apiUrl}Json_GetFolders`, {
            agrno: agrno,
            Email: Email,
            password: password
        });
        if (response.data.d !== "") {
            let res = JSON.parse(response.data.d).Table;
            setAllFolders(res);
        }
    }
    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
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
    let handleFilterRemove = (filterForRemove) => {
        let target = filterForRemove.key;
        if (advSearchKeyValue.length === 1) {
            setAdvSearchKeyValue([]);
        } else {
            setAdvSearchKeyValue(advSearchKeyValue.filter((item) => item.key !== target));
        }
    }
    let handleDialogsOpen = (e,toOpen) => {
        e.stopPropagation();
        if (toOpen === "Folder") {
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
    const handleContactNavigattion=(originator_no,contact_no)=>{
        navigate('/dashboard/ContactDetails',{
            state:{
                agrno: agrno,
                Email: Email,
                password: password,
                folderId: folderId,
                originatorNo: originator_no,
                contactNo: contact_no   
            }
        })
    }
    const handleClientNavigation=(clientId)=>{
        navigate('/dashboard/clientDetails',{
            state:{
                agrno: agrno,
                Email: Email,
                password: password,
                folderId: folderId,
                originatorNo: clientId 
            }
        })
    }
    return (
        <Box className='container-fluid p-0' onClick={handleClick}>

            <div role="presentation" className='mb-2 mb-3 '>
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
            </div>

            <CardView 
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
            />
        </Box>
    )
}

export default Client
