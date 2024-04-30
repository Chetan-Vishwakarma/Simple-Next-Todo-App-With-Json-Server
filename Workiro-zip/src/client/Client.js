import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, TextField, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
import ClearIcon from '@mui/icons-material/Clear';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CustomLoader from '../components/CustomLoader';
import SyncIcon from '@mui/icons-material/Sync';
import Tooltip from '@mui/material/Tooltip';

const CommonFilters = [
    { key: "Company Name", val: "Company Name" }, { key: "Address 1", val: "Address Line 1" },
    { key: "Address 2", val: "Address Line 2" }, { key: "Address 3", val: "Address Line 3" },
    { key: "County", val: "County" }, { key: "Postcode", val: "Postcode" },
    { key: "Country", val: "Country" }, { key: "ContactNo", val: "Contact Number" },
    { key: "Mobile", val: "Mobile Number" }, { key: "E-Mail", val: "E-Mail" },
    { key: "StatusName", val: "Status" }, { key: "SourceName", val: "Source" },
    { key: "First Name", val: "First Name" }, { key: "Last Name", val: "Last Name" },
    { key: "Title", val: "Title" }
];

const ContactFilters = [
    { key: "Active", val: "Active" }, { key: "Address 1", val: "Address 1" },
    { key: "Address 2", val: "Address 2" }, { key: "Address 3", val: "Address 3" },
    { key: "Assigned Manager", val: "Assigned Manager" }, { key: "Company Name", val: "Company Name" },
    { key: "ContactNo", val: "ContactNo" }, { key: "Country", val: "Country" },
    { key: "County", val: "County" }, { key: "Date Of Birth", val: "Date Of Birth" },
    { key: "E-Mail", val: "E-Mail" }, { key: "First Name", val: "First Name" },
    { key: "Last Name", val: "Last Name" }, { key: "Main Contact", val: "Main Contact" },
    { key: "ManagerName", val: "ManagerName" }, { key: "Mobile", val: "Mobile" },
    { key: "Note", val: "Note" }, { key: "Date Of Birth", val: "Date Of Birth" },
    { key: "E-Mail", val: "E-Mail" }, { key: "OriginatorNo", val: "OriginatorNo" },
    { key: "Portal User", val: "Portal User" }, { key: "Postcode", val: "Postcode" },
    { key: "Preferred Name", val: "Preferred Name" }, { key: "Role", val: "Role" },
    { key: "SourceName", val: "SourceName" }, { key: "StatusName", val: "StatusName" },
    { key: "Tel", val: "Tel" }, { key: "Title", val: "Title" },
    { key: "Town", val: "Town" },
];

const ClientFilters = [
    { key: "OriginatorNo", val: "OriginatorNo" }, { key: "Company Name", val: "Company Name" },
    { key: "Contact Number", val: "Contact Number" }, { key: "Mobile Number", val: "Mobile Number" },
    { key: "Assigned Manager", val: "Assigned Manager" }, { key: "Company Name", val: "Company Name" },
    { key: "Mobile Number", val: "Mobile Number" }, { key: "Address Line 1", val: "Address Line 1" },
    { key: "Address Line 2", val: "Address Line 2" }, { key: "Address Line 3", val: "Address Line 3" },
    { key: "Town", val: "Town" }, { key: "County", val: "County" },
    { key: "Postcode", val: "Postcode" }, { key: "Country", val: "Country" },
    { key: "Active Status", val: "Active Status" }, { key: "Business", val: "Business" },
    { key: "Source", val: "Source" }, { key: "Status", val: "Status" },
    { key: "First Name", val: "First Name" }, { key: "Last Name", val: "Last Name" },
    { key: "Title", val: "Title" }, { key: "E-Mail", val: "E-Mail" },
    { key: "Manager", val: "Manager" },
    { key: "CompanyNo", val: "CompanyNo" }
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
    const [filteredFoldersList, setFilteredFoldersList] = useState([]);
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

    const [isLoading, setIsLoading] = useState(true);
    const colorArr = ["#e26124", "#20aedb", "#075adb", "#be1de8", "#00983b", "#ed32b3"];


    // new functionality for colors start
    const [exclusionArr, setExclusionArr] = useState([]);
    const filteredColors = colorArr.filter(color => !exclusionArr.includes(color));
    // const [actualColors, setActualColors] = useState(filteredColors);
    const getRandomColors = (arr, num) => {
        const result = [];
        for (let i = 0; i < num; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            result.push(arr[randomIndex]);
            arr.splice(randomIndex, 1); // Remove the selected color from the array to prevent duplicates
        }
        return result;
    }
    const TwoColors = getRandomColors(filteredColors, 2);
    const [actualColors, setActualColors] = useState(TwoColors);
    // new functionality for colors start


    const [isFirstColorSelected, setIsFirstColorSelected] = useState(true);
    // advance filter states ends
    // search box states start
    const [isSearch, setIsSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredClientsForSearchBox, setFilteredClientsForSearchBox] = useState([]);
    const [clientsForSearchBoxNotFound, setClientsForSearchBoxNotFound] = useState(false);
    const [filteredContactsForSearchBox, setFilteredContactsForSearchBox] = useState([]);
    const [contactsForSearchBoxNotFound, setContactsForSearchBoxNotFound] = useState(false);
    // search box states ends
    const [objFilter, setObjFilter] = useState({});
    const [objFilterClient, setObjFilterClient] = useState({});
    const [objFilterColor, setObjFilterColor] = useState({});

    const [selectedColor, setSelectedColor] = useState(actualColors[0]);

    const [selectedPropertyForClient, setSelectedPropertyForClient] = useState("");
    const [isDataNotFoundInClient, setIsDataNotFoundInClient] = useState(false);
    const [isDataNotFoundInContact, setIsDataNotFoundInContact] = useState(false);
    const [isDataNotFoundInBoth, setIsDataNotFoundInBoth] = useState(false);
    const [loadMore, setLoadMore] = useState(20);


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
                        setIsLoading(false);
                        Json_GetFolders();
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetContactListByFolder", err);
        }
    }

    const Json_GetSupplierListByProject = (folder_id = folderId, favouriteClients = favourites) => {
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
                        const clients_data = json?.Table;

                        // sorting functionality start
                        const fvClient = favouriteClients.map(itm => itm.OriginatorNo);   // getting favourite clients org number
                        const filterFvClient = [...new Set(fvClient)];  // filtering duplicate favourite client
                        const dddd = [...clients_data].filter(itm => itm["Company Name"] !== '').sort((a, b) => a["Company Name"].localeCompare(b["Company Name"]));
                        let dtaa = [...dddd].sort((a, b) => {
                            let cpm = 0;
                            if (filterFvClient.includes(a.OriginatorNo)) {
                                cpm = -1;
                            } else {
                                cpm = 1;
                            }
                            return cpm;
                        });
                        // sorting functionality completed

                        console.log("Json_GetSupplierListByProject", json);
                        // setClients(json?.Table);  // old code 
                        setClients(dtaa);
                        setClientKeys(Object.keys(json.Table[0]));
                        setIsLoading(false);
                        Json_GetContactListByFolder(folder_id);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetSupplierListByProject", err);
        }
    }

    function startFormattingDate(dt) {
        const timestamp = parseInt(/\d+/.exec(dt));
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
    const eventHandler = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            setLoadMore((preValue) => preValue + 20);
        }
    }
    const Json_GetToFavourites = () => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password
        };
        try {
            Cls.Json_GetToFavourites(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        Json_GetSupplierListByProject(folderId, json.Table);
                        setFavourites(json.Table);
                        console.log("Json_GetToFavourites", json.Table);
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_GetToFavourites", err);
        }
    }
    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(localStorage.getItem("FolderId"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        // Json_GetSupplierListByProject();
        Json_GetToFavourites();
        window.addEventListener('scroll', eventHandler)
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
            return item["Company Name"] !== "" && item["Company Name"].toLowerCase().includes(searchInput.toLowerCase());
        });
        if (value === "") {
            setClientsForSearchBoxNotFound(false);
            setFilteredClientsForSearchBox([]);  // when you will face some issue then make an folderId state and pass folderId parameter in this function
        }
        if (filteredClientData.length === 0) {
            setFilteredClientsForSearchBox([]);
            setClientsForSearchBoxNotFound(true);
        } else {
            setClientsForSearchBoxNotFound(false);
            setFilteredClientsForSearchBox(filteredClientData);
        }
        // for contacts filter
        let filteredContactData = contacts.filter((item) => {
            return (item["First Name"] !== "" || item["Last Name"]) && `${item["First Name"]} ${item["Last Name"]}`.toLowerCase().includes(searchInput.toLowerCase());
        });
        if (value === "") {
            setContactsForSearchBoxNotFound(false);
            setFilteredClientsForSearchBox([]);  // when you will face some issue then make an folderId state and pass folderId parameter in this function
        }
        if (filteredContactData.length === 0) {
            setFilteredContactsForSearchBox([]);
            setContactsForSearchBoxNotFound(true);
        } else {
            setContactsForSearchBoxNotFound(false);
            setFilteredContactsForSearchBox(filteredContactData);
        }
    }
    function handleSearchBy(my_array, my_criteria) {
        return my_array.filter(function (obj) {
            return Object.keys(my_criteria).every(function (key) {
                if (my_criteria[key][0].length > 0) {
                    if (obj[key] && obj[key] !== undefined && obj[key] !== "") {
                        return obj[key].toString().toLowerCase().includes(my_criteria[key][0].toString().toLowerCase());
                    }
                }


                //   return (Array.isArray(my_criteria[key]) &&

                // (my_criteria[key].some(function(criteria) {
                //   return (typeof obj[key] === 'string' && obj[key].indexOf(criteria) === -1)
                // })) || my_criteria[key].length === 0);
            });
        });
    }
    let handleAdvanceFilterAgain = () => {


        let test = [...exclusionArr, selectedColor];
        setExclusionArr([...exclusionArr, selectedColor]);
        const filteredColors = colorArr.filter(color => !test.includes(color));
        const TwoColors = getRandomColors(filteredColors, 2);
        setActualColors(TwoColors);
        setSelectedColor(TwoColors[0]);


        if (selectedProperty !== "" && selectedPropertyValue !== "") {
            if (selectedChoice === "Clients") {

                let obj = { ...objFilter, [selectedProperty]: [selectedPropertyValue] };
                setObjFilter(obj);
                // let color = Object.keys(obj).length === 1 ? colorArr[0] : Object.keys(obj).length === 2 ? colorArr[2] : colorArr[4]
                // let obj2 = { ...objFilterColor, [selectedProperty]: [selectedColor] };
                let obj2 = { ...objFilterColor, [selectedProperty]: [selectedColor] };
                setObjFilterColor(obj2);
                // setSelectedColor(Object.keys(obj).length === 1 ? colorArr[2] : Object.keys(obj).length === 2 ? colorArr[4] : colorArr[5]);
                setIsFirstColorSelected(true);
                let fltData = handleSearchBy(clients, obj);
                setFilteredClients(fltData);
                // console.log("Filtered Clients: ",fltData.length);
                if (fltData.length === 0) {
                    setIsDataNotFoundInClient(true);
                }
                setSelectedProperty("");
                setSelectedPropertyValue("");
                return;
            } else if (selectedChoice === "Contacts") {
                let obj = { ...objFilter, [selectedProperty]: [selectedPropertyValue] };
                setObjFilter(obj);
                // let color = Object.keys(obj).length === 1 ? colorArr[0] : Object.keys(obj).length === 2 ? colorArr[2] : colorArr[4]
                let obj2 = { ...objFilterColor, [selectedProperty]: [selectedColor] };
                setObjFilterColor(obj2);
                // setSelectedColor(Object.keys(obj).length === 1 ? colorArr[2] : Object.keys(obj).length === 2 ? colorArr[4] : colorArr[5]);
                setIsFirstColorSelected(true);
                let fltData = handleSearchBy(contacts, obj);
                setFilteredContacts(fltData);
                // console.log("Filtered Clients: ",fltData.length);
                if (fltData.length === 0) {
                    setIsDataNotFoundInContact(true);
                }
                setSelectedProperty("");
                setSelectedPropertyValue("");
                return;
            } else if (selectedChoice === "All") {
                let obj = { ...objFilter, [selectedProperty]: [selectedPropertyValue] };
                setObjFilter(obj);
                // let color = Object.keys(obj).length === 1 ? colorArr[0] : Object.keys(obj).length === 2 ? colorArr[2] : colorArr[4]
                let obj2 = { ...objFilterColor, [selectedProperty]: [selectedColor] };
                setObjFilterColor(obj2);
                // setSelectedColor(Object.keys(obj).length === 1 ? colorArr[2] : Object.keys(obj).length === 2 ? colorArr[4] : colorArr[5]);
                setIsFirstColorSelected(true);

                // if (onlyClients) {
                let obj4 = { ...objFilterClient, [selectedPropertyForClient]: [selectedPropertyValue] };
                setObjFilterClient(obj4);
                console.log("object for client: ", obj4);
                let fltClients = handleSearchBy(clients, obj4);
                let fltContacts = handleSearchBy(contacts, obj);
                setFilteredClients(fltClients);
                setFilteredContacts(fltContacts);
                console.log("Filtered Clients: ", fltClients);
                console.log("Filtered Contacts: ", fltContacts);
                if (fltClients.length === 0 && fltContacts.length === 0) {
                    setIsDataNotFoundInBoth(true);
                } else if (fltClients.length > 0 && fltContacts.length === 0) {
                    setOnlyClients(true);
                    setOnlyContacts(false);
                } else if (fltClients.length === 0 && fltContacts.length > 0) {
                    setOnlyClients(false);
                    setOnlyContacts(true);
                }
                setSelectedProperty("");
                setSelectedPropertyValue("");
                return;
            }
            setSelectedProperty("");
            setSelectedPropertyValue("");
        }
    }

    let handleFilterDeletion = (target, colorForRemove) => {
        // console.log("target", target);
        let obj = Object.keys(objFilter).filter(objKey =>
            objKey !== target).reduce((newObj, key) => {
                newObj[key] = objFilter[key];
                return newObj;
            }, {}
            );
        // console.log("obj",obj);

        // for new color changing functionality start
        let fltColor = exclusionArr.filter(icol => icol !== colorForRemove);
        setExclusionArr(fltColor);
        const filteredColors = colorArr.filter(color => !fltColor.includes(color));
        const TwoColors = getRandomColors(filteredColors, 2);
        setActualColors(TwoColors);
        setSelectedColor(TwoColors[0]);
        // for new color changing functionality end


        if (selectedChoice === "Clients") {
            let fltData = handleSearchBy(clients, obj);
            // setFilteredClients(fltData);
            if (Object.keys(obj).length === 0) {
                setIsDataNotFoundInClient(false);
            } else {
                if (fltData.length === 0) {
                    setIsDataNotFoundInClient(true);
                } else {
                    setIsDataNotFoundInClient(false);
                }
            }
            setFilteredClients(fltData);
            setObjFilter(obj);
            return;
        } else if (selectedChoice === "Contacts") {
            let fltData = handleSearchBy(contacts, obj);
            // setFilteredClients(fltData);
            if (Object.keys(obj).length === 0) {
                setIsDataNotFoundInContact(false);
            } else {
                if (fltData.length === 0) {
                    setIsDataNotFoundInContact(true);
                } else {
                    setIsDataNotFoundInContact(false);
                }
            }
            setFilteredContacts(fltData);
            setObjFilter(obj);
            return;
        } else if (selectedChoice === "All") {

            const mappingObj = CommonFilters.reduce((obj1, item) => {
                obj1[item.key] = item.val;
                return obj1;
            }, {});

            const updatedData = {};
            for (const key in obj) {
                if (mappingObj.hasOwnProperty(key)) {
                    updatedData[mappingObj[key]] = obj[key];
                } else {
                    updatedData[key] = obj[key];
                }
            }


            // let fltClients = handleSearchBy(clients, obj);
            let fltClients = handleSearchBy(clients, updatedData);
            let fltContacts = handleSearchBy(contacts, obj);

            setFilteredClients(fltClients);
            setFilteredContacts(fltContacts);
            if (Object.keys(obj).length === 0) {
                setIsDataNotFoundInBoth(false);
                // setOnlyClients(true);
                // setOnlyContacts(true);
            } else if (fltClients.length === 0 && fltContacts.length === 0) {
                setIsDataNotFoundInBoth(true);
            } else if (fltClients.length > 0 && fltContacts.length === 0) {
                setOnlyClients(true);
                setOnlyContacts(false);
                setIsDataNotFoundInBoth(false);
            } else if (fltClients.length === 0 && fltContacts.length > 0) {
                setOnlyClients(false);
                setOnlyContacts(true);
                setIsDataNotFoundInBoth(false);
            } else if (fltClients.length > 0 && fltContacts.length > 0) {
                setOnlyClients(true);
                setOnlyContacts(true);
                setIsDataNotFoundInBoth(false);
            }
            setObjFilter(obj);
            return;
        }

        setObjFilter(obj);
    }

    const handleClearAll = () => {
        if (selectedChoice === "All") {
            setIsDataNotFoundInBoth(false);
            setOnlyClients(true);
            setOnlyContacts(true);
            setFilteredClients([]);
            setFilteredContacts([]);
        } else if (selectedChoice === "Contacts") {
            setIsDataNotFoundInContact(false);
            setOnlyContacts(true);
            // setFilteredClients([]);
            setFilteredContacts([]);
        } else if (selectedChoice === "Clients") {
            setIsDataNotFoundInClient(false);
            setOnlyClients(true);
            setFilteredClients([]);
            // setFilteredContacts([]);
        }
        setObjFilter({});
        setObjFilterClient({});
        setSelectedColor(actualColors[0]);
        setExclusionArr([]);
    }


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
        filterData(clients, advSearchKeyValue);
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
        // navigate(`/dashboard/ContactDetails?originatorNo=${originator_no}&contactNo=${contact_no}`);
        navigate(`/dashboard/ContactDetails?originatorNo=${originator_no}&contactNo=${contact_no}`, {
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
        navigate(`/dashboard/clientDetails?OrgNo=${clientId}`, {
            state: {
                agrno: agrno,
                Email: Email,
                password: password,
                folderId: folderId,
                originatorNo: clientId,
                globalSearchDocs: []
            }
        })
    }
    const [isGridView, setIsGridView] = useState(false);
    const [isCardView, setIsCardView] = useState(true);
    const [suggestionList, setSuggestionList] = useState([]);
    const [favourites, setFavourites] = useState([]);


    const createSuggestionList = (value, data) => {
        let fltRepeatData = [];
        data.map((itm) => {
            if (itm[value] && itm[value] !== "" && itm[value] !== null && itm[value] !== undefined && itm[value] !== "null" && itm[value] !== "undefined") {
                return String(itm[value]);
            }
        }).filter((flt) => {
            if (flt && flt !== "undefined" && flt !== undefined) {
                if (!fltRepeatData.includes(flt)) {
                    fltRepeatData.push(flt)
                }
            }
        });
        return fltRepeatData;
    }

    function handleSuggestionList(value, label) {
        if (selectedChoice === "Contacts") {
            if (filteredContacts.length > 0) {
                let fltRepeatData = createSuggestionList(value, filteredContacts);
                setSuggestionList(fltRepeatData);
                return;
            } else {
                let fltRepeatData = createSuggestionList(value, contacts);
                setSuggestionList(fltRepeatData);
                return;
            }
            //console.log("Contacts's Property suggestion list",fltRepeatData);

        } else if (selectedChoice === "Clients") {
            if (filteredClients.length > 0) {
                let fltRepeatData = createSuggestionList(value, filteredClients);
                setSuggestionList(fltRepeatData);
                return;
            } else {
                let fltRepeatData = createSuggestionList(value, clients);
                setSuggestionList(fltRepeatData);
                return;
            }


        } else if (selectedChoice === "All") {


            if (filteredClients.length > 0 && filteredContacts.length > 0) {
                let list1 = createSuggestionList(label, filteredClients);
                let list2 = createSuggestionList(value, filteredContacts);
                let fltRepeatData = [...list1];

                list2.filter((itm) => {
                    if (!fltRepeatData.includes(itm)) {
                        fltRepeatData.push(itm);
                    }
                });
                setSuggestionList(fltRepeatData);
                return;
            } else if (filteredClients.length > 0 && filteredContacts.length === 0) {
                let list1 = createSuggestionList(label, filteredClients);

                let fltRepeatData = [...list1];

                setSuggestionList(fltRepeatData);
                return;
            } else if (filteredClients.length === 0 && filteredContacts.length > 0) {
                let list2 = createSuggestionList(value, filteredContacts);

                let fltRepeatData = [...list2];

                setSuggestionList(fltRepeatData);
                return;
            }


            let list1 = createSuggestionList(label, clients);
            let list2 = createSuggestionList(value, contacts);
            let fltRepeatData = [...list1];

            list2.filter((itm) => {
                if (!fltRepeatData.includes(itm)) {
                    fltRepeatData.push(itm);
                }
            });
            setSuggestionList(fltRepeatData);
        }
    }


    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const SyncFunctionData = () => {
        console.log('SyncFunctionData');
        let obj = {};
        obj.agrno = agrno;
        obj.Email = Email;
        obj.password = password;

        try {
            Cls.TeamSolution(obj, function (sts, data) {
                if (sts && data) {
                    console.log({ status: true, messages: "Success", res: data });

                }
            });
        } catch (error) {
            console.log({ status: false, messages: "Faild Please Try again" });
        }
    }


    return (
        <Box className='container-fluid p-0' onClick={handleClick}>

            {isLoading ? <CustomLoader /> : <Box className='row'>
                <Box className='col-lg-12'>
                    <Box className='d-flex main-search-box mb-2 align-items-center justify-content-between'>
                        <Box className='d-flex'>
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

                                            <Input
                                                onClick={(e) => handleDialogsOpen(e, "Search")}
                                                onChange={(e) => handleSearch(e.target.value)}
                                                placeholder='Search'
                                                className='ps-0' />
                                        </AutocompleteRoot>

                                        {isSearch && <Listbox sx={{ zIndex: 1 }}>
                                            {filteredClientsForSearchBox.length > 0 ? filteredClientsForSearchBox.map((option, i) => (
                                                <Option key={i} onClick={() => handleClientNavigation(option.OriginatorNo)}>
                                                    <ApartmentIcon className='me-1' />
                                                    {option["Company Name"]}</Option>
                                            )) : clientsForSearchBoxNotFound ? <></> : clients.map((option, i) => (
                                                <Option key={i} onClick={() => handleClientNavigation(option.OriginatorNo)}><ApartmentIcon className='me-1' />{option["Company Name"]}</Option>
                                            ))}
                                            {filteredContactsForSearchBox.length > 0 ? filteredContactsForSearchBox.map((option, i) => (
                                                <Option key={i} onClick={() => handleContactNavigattion(option.OriginatorNo, option.ContactNo)}><PersonIcon className='me-1' />{option["First Name"]} {option["Last Name"]}</Option>
                                            )) : contactsForSearchBoxNotFound ? <></> : contacts.map((option, i) => (
                                                <Option key={i} onClick={() => handleContactNavigattion(option.OriginatorNo, option.ContactNo)}><PersonIcon className='me-1' />{option["First Name"]} {option["Last Name"]}</Option>
                                            ))}
                                        </Listbox>}

                                    </AutocompleteWrapper>
                                </Layout>
                            </Box>

                            <Box className="dropdown-box ms-4 d-flex align-items-center">
                                <Button disabled={Object.keys(objFilter).length > 0 ? true : false} className='btn-select' onClick={(e) => handleDialogsOpen(e, "Folder")}>{selectedFolder}</Button>
                                {isFolder && <Box className="btn-Select">
                                    <TextField placeholder='Search...' size='small' sx={{ display: "block" }} onChange={(e) => {
                                        e.stopPropagation();
                                        let val = e.target.value;
                                        let fltFolders = allFolders.filter((fld) => fld.Folder.toLowerCase().includes(val.toLowerCase()));
                                        setFilteredFoldersList(fltFolders);
                                    }} onClick={(e) => e.stopPropagation()} />
                                    {filteredFoldersList.length > 0 ? filteredFoldersList.map((item) => {
                                        // pass folder-id in onClick handler
                                        return <Button className='btn-white' onClick={() => handleFolderSelection(item.FolderID, item.Folder)}>{item.Folder}</Button>;
                                    }) : allFolders.map((item) => {
                                        // pass folder-id in onClick handler
                                        return <Button className='btn-white' onClick={() => handleFolderSelection(item.FolderID, item.Folder)}>{item.Folder}</Button>;
                                    })}
                                </Box>}
                            </Box>

                            {isGridView && <Box className="dropdown-box ms-4 d-flex align-items-center">
                                <Button className='btn-select' onClick={(e) => handleDialogsOpen(e, "Choice")}>{selectedChoice === "All" ? "Contacts" : selectedChoice}</Button>
                                {isChoice && <Box className="btn-list-box btn-Select">
                                    {["Clients", "Contacts"].map((item) => {
                                        return <Button className='btn-list' onClick={() => basedOnClientContactAndAll(item)}>{item}</Button>
                                    })}
                                </Box>}
                            </Box>}

                            {isCardView && <><Box className="dropdown-box ms-4 d-flex align-items-center">
                                <Button disabled={Object.keys(objFilter).length > 0 ? true : false} className='btn-select' onClick={(e) => handleDialogsOpen(e, "Choice")}>{selectedChoice}</Button>
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
                                                <Typography variant='Body1' className='mb-2 d-block  bold'>Filter: {Object.keys(objFilter).length}/3</Typography>

                                                <Box className='d-flex justify-content-between'>
                                                    <Box className='row w-100 pe-3'>
                                                        <Box className='col-md-6'>
                                                            <Box className='mb-2'>

                                                                {selectedChoice === "All" && <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    value={selectedProperty}
                                                                    size='small'
                                                                    onChange={(event, newValue) => {
                                                                        event.preventDefault();
                                                                        event.stopPropagation();
                                                                        if (newValue !== null) {
                                                                            setSelectedProperty(newValue.value);
                                                                            setSelectedPropertyForClient(newValue.label);
                                                                            handleSuggestionList(newValue.value, newValue.label);
                                                                        }
                                                                    }}
                                                                    options={CommonFilters.filter((itm) => {
                                                                        return !Object.keys(objFilter).includes(itm.key)
                                                                    }).map(option => ({ value: option.key, label: option.val }))}
                                                                    sx={{ width: '100%' }}
                                                                    renderInput={(params) => <TextField {...params} value={selectedProperty} label="Select Property" />}
                                                                />}

                                                                {selectedChoice === "Contacts" && <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    value={selectedProperty}
                                                                    size='small'
                                                                    onChange={(event, newValue) => {
                                                                        event.preventDefault();
                                                                        event.stopPropagation();
                                                                        // console.log(event.target, newValue);
                                                                        if (newValue !== null) {
                                                                            setSelectedProperty(newValue.value);
                                                                            handleSuggestionList(newValue.value);
                                                                        }
                                                                    }}
                                                                    options={ContactFilters.filter((itm) => {
                                                                        return !Object.keys(objFilter).includes(itm.key)
                                                                    }).map(option => ({ value: option.key, label: option.val }))}
                                                                    sx={{ width: '100%' }}
                                                                    renderInput={(params) => <TextField {...params} value={selectedProperty} label="Select Property" />}
                                                                />}

                                                                {/* Only For Clients */}
                                                                {selectedChoice === "Clients" && <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    value={selectedProperty}
                                                                    size='small'
                                                                    onChange={(event, newValue) => {
                                                                        event.preventDefault();
                                                                        event.stopPropagation();
                                                                        if (newValue !== null) {
                                                                            setSelectedProperty(newValue.value);
                                                                            handleSuggestionList(newValue.value);
                                                                        }
                                                                    }}
                                                                    // options={ClientFilters.map(option => ({ value: option.key, label: option.val }))}
                                                                    options={ClientFilters.filter((itm) => {
                                                                        return !Object.keys(objFilter).includes(itm.key)
                                                                    }).map(option => ({ value: option.key, label: option.val }))}
                                                                    sx={{ width: '100%' }}
                                                                    renderInput={(params) => <TextField {...params} value={selectedProperty} label="Select Property" />}
                                                                />}
                                                            </Box>
                                                        </Box>
                                                        <Box className='col-md-6 px-0'>
                                                            <Box className='mb-2'>
                                                                <div>
                                                                    <Autocomplete
                                                                        disablePortal
                                                                        id="combo-box-demo"
                                                                        value={selectedPropertyValue}
                                                                        onChange={(event, newValue) => {
                                                                            event.preventDefault();
                                                                            event.stopPropagation();
                                                                            //console.log(newValue);
                                                                            setSelectedPropertyValue(newValue);
                                                                        }}
                                                                        options={suggestionList}
                                                                        sx={{ width: '100%' }}
                                                                        size='small'
                                                                        renderInput={(params) => <TextField {...params} value={selectedPropertyValue} onChange={(e) => setSelectedPropertyValue(e.target.value)} label="Select Property" />}
                                                                    />
                                                                </div>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <Box className='ps-1'>
                                                        {/* <Typography variant='Body1' className='mb-1 bold' sx={{ lineHeight: '12px' }}>Labels</Typography> */}

                                                        <Box className="color-box">
                                                            {
                                                                actualColors.map((itmColor, i) => <button onClick={(e) => {
                                                                    setSelectedColor(itmColor);
                                                                    setIsFirstColorSelected(i == 0 ? true : false);
                                                                }} type='button' className={i == 0 ? (isFirstColorSelected ? 'btn-color selected' : 'btn-color') : (isFirstColorSelected ? 'btn-color' : 'btn-color selected')} style={{ backgroundColor: itmColor }}></button>)
                                                            }
                                                            {/* {
                                                                Object.keys(objFilter).length === 0 && <><button onClick={(e) => {
                                                                    setSelectedColor(colorArr[0]);
                                                                    setIsFirstColorSelected(true);
                                                                }} type='button' className={isFirstColorSelected ? 'btn-color selected' : 'btn-color'} style={{ backgroundColor: colorArr[0] }}></button>
                                                                    <button onClick={() => {
                                                                        setSelectedColor(colorArr[1]);
                                                                        setIsFirstColorSelected(false);
                                                                    }} type='button' className={isFirstColorSelected ? 'btn-color' : 'btn-color selected'} style={{ backgroundColor: colorArr[1] }}></button></>
                                                            }
                                                            {
                                                                Object.keys(objFilter).length === 1 && <><button onClick={(e) => {
                                                                    setSelectedColor(colorArr[2]);
                                                                    setIsFirstColorSelected(true);
                                                                }} type='button' className={isFirstColorSelected ? 'btn-color selected' : 'btn-color'} style={{ backgroundColor: colorArr[2] }}></button>
                                                                    <button onClick={() => {
                                                                        setSelectedColor(colorArr[3]);
                                                                        setIsFirstColorSelected(false);
                                                                    }} type='button' className={isFirstColorSelected ? 'btn-color' : 'btn-color selected'} style={{ backgroundColor: colorArr[3] }}></button></>
                                                            }
                                                            {
                                                                Object.keys(objFilter).length === 2 && <><button onClick={(e) => {
                                                                    setSelectedColor(colorArr[4]);
                                                                    setIsFirstColorSelected(true);
                                                                }} type='button' className={isFirstColorSelected ? 'btn-color selected' : 'btn-color'} style={{ backgroundColor: colorArr[4] }}></button>
                                                                    <button onClick={() => {
                                                                        setSelectedColor(colorArr[5]);
                                                                        setIsFirstColorSelected(false);
                                                                    }} type='button' className={isFirstColorSelected ? 'btn-color' : 'btn-color selected'} style={{ backgroundColor: colorArr[5] }}></button></>
                                                            } */}
                                                        </Box>
                                                    </Box>
                                                </Box>


                                                <Box className='mt-2'>
                                                    <Button onClick={handleAdvanceFilterAgain} disabled={Object.keys(objFilter).length < 3 ? false : true} variant="contained" size='small' color="success">
                                                        <span class="material-symbols-outlined">
                                                            add
                                                        </span>
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>}
                                </Box>
                                {/*  */}

                            </>}
                        </Box>

                        <Box className='d-flex'>

                            {/* <Button variant="text" onClick={SyncFunctionData}>Sync</Button> */}

                            <ToggleButtonGroup
                                value={alignment}
                                exclusive
                            // onChange={handleAlignment}
                            >
                                <Tooltip title="Sync">
                                    <ToggleButton value="left" aria-label="left aligned"
                                        onClick={SyncFunctionData}
                                    >
                                        <SyncIcon />
                                    </ToggleButton></Tooltip>

                                {isGridView &&
                                    <ToggleButton value="left" aria-label="left aligned"
                                        onClick={() => {
                                            setIsCardView(!isCardView);
                                            setIsGridView(!isGridView);
                                        }}>
                                        <AppsIcon />
                                    </ToggleButton>
                                }

                                {isCardView &&
                                    <ToggleButton value="center" aria-label="centered"
                                        onClick={() => {
                                            setIsCardView(!isCardView);
                                            setIsGridView(!isGridView);
                                        }}>
                                        <ListIcon />
                                    </ToggleButton>
                                }


                            </ToggleButtonGroup>

                        </Box>


                        {/* {isGridView &&
                            <div style={{ textAlign: "end" }}><AppsIcon onClick={() => {
                                setIsCardView(!isCardView);
                                setIsGridView(!isGridView);
                            }} />
                            </div>}

                        {isCardView &&
                            <div style={{ textAlign: "end" }}><ListIcon onClick={() => {
                                setIsCardView(!isCardView);
                                setIsGridView(!isGridView);
                            }} />
                            </div>} */}
                    </Box>

                    <Box className="">
                        {Object.keys(objFilter).map((item) => {
                            return <Button sx={{ backgroundColor: objFilterColor[item][0] }} className='btn-arrow'><span className='text-white me-1'>{item}: {objFilter[item][0]}</span>
                                <span onClick={() => handleFilterDeletion(item, objFilterColor[item][0])} className="material-symbols-outlined font-16 text-white close">
                                    close
                                </span>
                                <PlayArrowIcon className='arrow-icon' sx={{ color: objFilterColor[item][0] }} />
                            </Button>
                        })}

                        {Object.keys(objFilter).length > 0 && <span className='pointer text-danger ms-2' onClick={handleClearAll}>
                            <ClearIcon className='font-26' />
                        </span>}

                        {/* <Fab size="small" className='btn-plus  ms-2' aria-label="add">
                                <AddIcon />
                            </Fab> */}
                    </Box>

                    {isGridView && <Box className='mt-3'><ClientGrid selectedChoice={selectedChoice} data={selectedChoice === "All" || selectedChoice === "Contacts" ? contacts : clients} handleContactNavigattion={handleContactNavigattion} handleClientNavigation={handleClientNavigation} /></Box>}

                    <Box className='row'>
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
                            objFilter={objFilter}
                            isDataNotFoundInClient={isDataNotFoundInClient}
                            isDataNotFoundInContact={isDataNotFoundInContact}
                            isDataNotFoundInBoth={isDataNotFoundInBoth}
                            objFilterColor={objFilterColor}
                            objFilterClient={objFilterClient}
                            loadMore={loadMore}
                        />}
                    </Box>
                </Box>
            </Box>}
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
