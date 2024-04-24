import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Popover, Tabs, Tab, Checkbox, Grid, Autocomplete, TextField, } from '@mui/material';

import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import CommanCLS from '../../services/CommanService';
import TuneIcon from '@mui/icons-material/Tune';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DownloadIcon from '@mui/icons-material/Download';
import ToggleButton from '@mui/material/ToggleButton';
import DnsIcon from '@mui/icons-material/Dns';
import AppsIcon from '@mui/icons-material/Apps';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import WarningIcon from '@mui/icons-material/Warning';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import PersonIcon from '@mui/icons-material/Person';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ToastContainer, toast } from 'react-toastify';
import Activitygrid from './Activitygrid';

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        //   color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        //   backgroundColor: theme.palette.common.black,
    },
}));


// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';


// const options = ['Document Registered', 'Track Document 1064109', 'Document Description Edited', 'Patrick has invoked task ID', 'Patrick has invoked task ID'];

let temp= [];
function Activity({getAudit,selectedDocument,call_Json_GetAudit}) {
    // let { getAudit } = props;
    // const [open, setOpen] = React.useState(false);
    console.log(getAudit,`ActivityselectedDocument`,selectedDocument);
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [getUserComment, setgetUserComment] = useState([]);
    const [getCateGory, setgetCateGory] = useState([]);
    const [FilterActivity, setFilterActivity] = useState([]);
    const [Auditcomments, setAuditcomments] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [UniqueUser, setUniqueUser] = useState([]);
    const [ForwardUser, setForwardUser] = useState("");
    const [selectedComments, setSelectedComments] = React.useState('');
    const [sortByProperty, setSortByProperty] = useState("");
    const [selectedDocudata, setselectedDocument] = useState({});
    const [userAddComment, setAddComment] = useState({
        CommentId: "",
        CategoryId: "",
        TextAddComment: "",
      });
      const [toggleScreen, setToggleScreen] = useState({ singleCardView: true, tableGridView: false });
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/"; // base url for api
    //   let dt = new LoginDetails();
    let cls = new CommanCLS(baseUrl, agrno, Email, password);
    const Json_GetUserComments =()=>{
        let requestBody = {
            agrno: agrno,
            Email: Email,
            password: password,
          };
          try {
            cls.Json_GetUserComments(requestBody, (sts, data) => {
              if (sts) {
                if (data) {
                  let json = JSON.parse(data);
                  console.log("Json_GetUserComments", json.Table);
                  setgetUserComment(json.Table);
                }
              }
            });
          } catch (err) {
            console.log("Error while calling Json_GetClientCardDetails", err);
          }
    }
    const Json_GetCategory =()=>{
        let requestBody = {
            agrno: agrno,
            Email: Email,
            password: password,
            SectionId: selectedDocument ? selectedDocument.PostItemTypeID : ""
          };
          try {
            cls.Json_GetCategory(requestBody, (sts, data) => {
              if (sts) {
                if (data) {
                  let json = JSON.parse(data);
                  console.log("Json_GetCategory", json.Table);
                  setgetCateGory(json.Table);
                }
              }
            });
          } catch (err) {
            console.log("Error while calling Json_GetClientCardDetails", err);
          }
    }
    const onChangeStandardCate = (event, value) => {
        event.preventDefault();
        if (value) {
          let data = { ...userAddComment };
          data = { ...data, ["CommentId"]: value.Comment };
          
          setAddComment(data);
        } else {
        }
      };

      const onChangeStandardComment = (event, value) => {
        event.preventDefault();
        if (value) {
          let data = { ...userAddComment };
          data = { ...data, ["CategoryId"]: value.CatId };
        
          setAddComment(data);
        } else {
        }
      };
      const handleChangeTextArea = (e) => {
        e.preventDefault();
        let data = { ...userAddComment };
        data = { ...data, ["TextAddComment"]: e.target.value };
        setAddComment(data);
      }
    function addToWorkTable() {
       
        let obj = {  agrno: agrno, Email: Email, password: password,ItemId: selectedDocudata["Registration No."] ? selectedDocudata["Registration No."] : "", comment:userAddComment.TextAddComment};
        console.log(selectedDocudata["Registration No."],"addToWorkTable111", obj);
        cls.Json_AddToWork(obj, function (status, data) {
          if (status) {
            if (data) {
              //let json = JSON.parse(data);
              console.log("getitemid", data);
              toast.success("Activity added !");
              call_Json_GetAudit();
            }
          }
        });
      }
    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        console.log("getAudit", getAudit);
        setFilterActivity(getAudit);
        setAuditcomments(getAudit);
        const uniqueForwardedBy = [];
        const forwardedBySet = new Set();
        if(getAudit && getAudit.length > 0) {
        getAudit.forEach(item => {
        if (!forwardedBySet.has(item.ForwardedBy)) {
        forwardedBySet.add(item.ForwardedBy);
        uniqueForwardedBy.push(item);
         }
        });
        console.log(uniqueForwardedBy,"uniqueForwardedBy");
        setUniqueUser(uniqueForwardedBy);
    }
        setselectedDocument(selectedDocument);
        Json_GetUserComments();
        Json_GetCategory();
    }, [getAudit])


    // 
    const [value, setValue] = React.useState();
    const [inputValue, setInputValue] = React.useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = (documentToSearch) => {
     
        const newFilteredData = getAudit.filter(item => {
            for (const key in documentToSearch) {
                if (documentToSearch.hasOwnProperty(key) && item.hasOwnProperty(key)) {
                    if (documentToSearch[key] !== item[key]) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        });

        // Append the new filtered data to the existing array
        setFilterActivity(newFilteredData);
    };
    console.log(getAudit,`ActivityselectedDocument`,filteredData);
    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        focused,
    } = useAutocomplete({
        id: 'controlled-state-demo',
        options: [], 
        getOptionLabel: (option) => option.Comments,
        value,
        onChange: (event, newValue) => {
            setValue(newValue);
            console.log(getAudit,"getAuditsonam",newValue);
            if (newValue && !selectedOptions.some(option => option['Activity ID'] === newValue['Activity ID'])) {
                const filteredOptions =  filterSelectedOptionsByKeywords(newValue.Comments);
                console.log(filteredOptions,"filteredOptions");

                setSelectedOptions([...selectedOptions, newValue]);
            }
            // handleSearch(newValue);
          },
        inputValue,
        onInputChange: (event, newInputValue) => setInputValue(newInputValue),
    });
    // const filterSelectedOptionsByKeyword = (keyword) => {
    //     return getAudit.filter(option => option.Comments.toLowerCase().includes(keyword.toLowerCase()));
    // };
    // const filterSelectedOptionsByKeywords = (keywords) => {
    //     let filteredOptions = getAudit;
    //     for (const keyword of keywords) {
    //         filteredOptions = filteredOptions.filter(option => option.Comments.toLowerCase().includes(keyword.toLowerCase()));
    //     }
    //     return filteredOptions;
    // };
    const filterSelectedOptionsByKeywords = (keywords) => {
        if (!Array.isArray(keywords)) {
            // If keywords is not an array, convert it into an array with a single element
            keywords = [keywords];
        }
    
        return getAudit.filter(option => {
            return keywords.every(keyword => option.Comments.toLowerCase().includes(keyword.toLowerCase()));
        });
    };
    
    
    
    

    // modal add comment
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };
    const [openAddComment, setOpenAddComment] = React.useState(false);
    const handleClickOpenAddComment = () => {
        setOpenAddComment(true);
    };
    const AddCommenthandleClose = () => {
        setOpenAddComment(false);
        // addToWorkTable();

    };
    const AddCommenthandleCloseSubmit = () => {
        setOpenAddComment(false);
        addToWorkTable();

    };
    
    // popover
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    // sort dropdown
    const [anchorElSort, setAnchorElSort] = React.useState(null);
    const openSort = Boolean(anchorElSort);
    const handleClickSort = (event) => {
        setAnchorElSort(event.currentTarget);
    };
    const handleCloseSort = () => {
        setAnchorElSort(null);
    };


    // 
    const [age, setAge] = React.useState('');
    const [searchValues, setsearchValues] = React.useState('');
    const [searchValuesArr, setsearchValuesArr] = React.useState([]);
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleOptionSelect = (e) => {
    console.log('Selectedsonamoption:',e.target.value);
    setsearchValues(e.target.value);
    // setSelectedOptions([...selectedOptions, selectedOption]);
    // // Perform any other actions you want with the selected option
    // if (!selectedOptions.some(option => option['Activity ID'] === selectedOption['Activity ID'])) {
    //     // Add the selected option to selectedOptions
    //     setSelectedOptions([...selectedOptions, selectedOption]);
    // }
   };
   const filterComments = (array, searchString) => {
    const words = searchString.toLowerCase().split(" ");
    return array.filter(obj => {
        const commentWords = obj.Comments.toLowerCase().split(" ");
        return words.every(word => commentWords.includes(word));
    });
};

const [tempdata, setTemp] = useState([]);

const [tempdatafilter, setTempdatafilter] = useState([]);
const [IsActivity, setIsActivity] = useState(false);
const handleEnterKeyPress = (event) => {
    let dataFilter = [];
   
    if (event.key === 'Enter') {
        if(event.target.value){ 
        //    temp.push(event.target.value)
        let tempStr = [...tempdata,event.target.value];
        setTemp(tempStr);
        console.log("tempStr",tempStr)
        
            // setTemp((prevTemp) => [...prevTemp,event.target.value]); // Push the value of event.target.value into the temp array
             console.log('handleEnterKeyPress:', temp.join(' '));
            // let words = temp.join(' ').toLowerCase().split(" ");
            let filteredArr = getAudit.filter(obj => {
                let commentWords = obj.Comments.toLowerCase().split(" ");
                return tempStr.every(word => commentWords.includes(word.toLowerCase()));

            });
            
            if(filteredArr && filteredArr.length > 0){
                setTempdatafilter(filteredArr);
            }
          
            setsearchValues("");
        }

        // const concatenatedString = tempdata.join(' ');
        // const keyword = event.target.value.toLowerCase();
        // const filteredArray = getAudit.filter(item => item.Comments && item.Comments.toLowerCase().includes(keyword));

        // dataFilter.push(...filteredArray);
      
       
       
        // if (filteredArray.length > 0) {
        //     setsearchValuesArr(prevSearchValuesArr => [...prevSearchValuesArr, ...filteredArray]);
        // }
    }
};
const handleMenuItemClick = (selectedValue) => {
    // Here you can handle the selected value
    setForwardUser(selectedValue);
    console.log("Selected valuemenu:", selectedValue);
    const filteredArr = getAudit.filter(item => {
        // Check if the selected value is found in the Comments property of each object
        return item.ForwardedBy.toLowerCase().includes(selectedValue.toLowerCase());
    });
    
   
    if(filteredArr && filteredArr.length > 0) {
        setTempdatafilter(filteredArr);
    }
   
    setAnchorElSort(null);
};

const handleMenuItemByDate = () => {
    // Sort the getAudit array based on the Actioned Date
    const sortedData = getAudit.slice().sort((a, b) => {
        const dateA = new Date(a["Actioned Date"]);
        const dateB = new Date(b["Actioned Date"]);
        return dateA - dateB;
    });

    // Set the sorted data to tempdatafilter state
    setTempdatafilter(sortedData);

    // Close the menu
    setAnchorElSort(null);
};
function parseDate(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute, second] = timePart.split(':');
    return new Date(year, month - 1, day, hour, minute, second);
}
function handleAscendingSort() {
    console.log(sortByProperty, "ascending11");
    if (sortByProperty === "Date") {
        console.log(sortByProperty, "ascending22");
        // Sort by Actioned Date in ascending order
        const sortedArr = [...getAudit].sort((a, b) => {
            // Convert Actioned Date strings to date objects for comparison
            const dateA = parseDate(a["Actioned Date"]);
            const dateB = parseDate(b["Actioned Date"]);
            return dateA - dateB;
        });
        console.log(sortedArr, "Sorted by Date ascending");

        // Set the sorted array to tempdatafilter state variable
        setTempdatafilter(sortedArr);
    } else if (sortByProperty === "Description") {
        console.log(sortByProperty, "ascendingDescriptions");
        // Sort by Comments in ascending order
        const sortedArr = [...getAudit].sort((a, b) => {
            // Compare Comments lexicographically
            return a.Comments.localeCompare(b.Comments);
        });
        console.log(sortedArr, "Sorted by Description ascending");

        // Set the sorted array to tempdatafilter state variable
        setTempdatafilter(sortedArr);
    }
}


function handleDescendingSort() {
    if (sortByProperty === "Date") {
        console.log(sortByProperty, "descending22");
        // Sort by Actioned Date in descending order
        const sortedArr = [...getAudit].sort((a, b) => {
            // Convert Actioned Date strings to date objects for comparison
            const dateA = parseDate(a["Actioned Date"]);
            const dateB = parseDate(b["Actioned Date"]);
            return dateB - dateA; // Compare in descending order
        });
        console.log(sortedArr, "Sorted by Date descending");

        // Set the sorted array to tempdatafilter state variable
        setTempdatafilter(sortedArr);
    } else if (sortByProperty === "Description") {
        console.log(sortByProperty, "descending22");
        // Sort by Comments in descending order
        const sortedArr = [...getAudit].sort((a, b) => {
            // Compare Comments lexicographically in descending order
            return b.Comments.localeCompare(a.Comments);
        });
        console.log(sortedArr, "Sorted by Description descending");

        // Set the sorted array to tempdatafilter state variable
        setTempdatafilter(sortedArr);
    }
}


const handleMenuItemByDes = (selectedValue) => {
    // Here you can handle the selected value
    console.log("handleMenuItemByDes:", selectedValue);
    const filteredArr = getAudit.filter(item => {
        // Check if the selected value is found in the Comments property of each object
        return item.Comments.toLowerCase().includes(selectedValue.toLowerCase());
    });
    
    console.log(filteredArr,"menufilteredArr");
    setTempdatafilter(filteredArr);
    setAnchorElSort(null);
};
const handleRemoveOption = (optionToRemove) => {
    // Filter out the option to remove from tempdata
    // const updatedTempdata = tempdata.filter(option => option !== optionToRemove);
    // setTemp(updatedTempdata);
    // const updatedSearchValuesArr = tempdatafilter.filter(item => item['Activity ID'] !== optionToRemove['Activity ID']);
    // setTempdatafilter(updatedSearchValuesArr);
    const remianData = tempdata.filter(option => option !== optionToRemove);
    setTemp(remianData);

    let filteredArr = getAudit.filter(obj => {
        let commentWords = obj.Comments.toLowerCase().split(" ");
        return remianData.every(word => commentWords.includes(word.toLowerCase()));

    });

    setTempdatafilter(filteredArr);

};

    console.log(searchValuesArr,"groupedOptions");
    return (
        <>
            <Box class="ml-auto mr-auto">

                <Box className='d-flex justify-content-between my-1 mb-2 align-items-start'>
                    <Box className="search-box m-auto">
                        <Layout>
                            <AutocompleteWrapper>
                                <AutocompleteRoot
                                    {...getRootProps()}
                                    className={focused ? 'Mui-focused' : ''}
                                >
                                    <span className="material-symbols-outlined search-icon">search</span>
                                    <Input  {...getInputProps()}
                                        placeholder='Search'
                                        className='ps-0'
                                        value={searchValues}
                                        onKeyDown= {handleEnterKeyPress}
                                            
                                        onChange={handleOptionSelect}
                                    />
                                </AutocompleteRoot>
                                
                                {groupedOptions.length > 0 && (
                                    <Listbox {...getListboxProps()}>
                                        {groupedOptions.slice(0, 3).map((option, index) => (
                                            <Option {...getOptionProps({ option, index })}>{option.Comments} </Option>
                                        ))}
                                    </Listbox>
                                )}
                            </AutocompleteWrapper>
                        </Layout>


                        <Box className='mt-2'>
                        {tempdata && tempdata.map((option, index) => (
                           
                            <Button className='btn-arrow' sx={{ background: '#4780FF' }}><span className='text-white me-1'>{option}</span>
                                <span className="material-symbols-outlined font-16 text-white close" onClick={() => handleRemoveOption(option)}>
                                    close
                                </span>
                                <PlayArrowIcon className='arrow-icon' sx={{ color: '#4780FF' }} />
                            </Button>
                            ))}
                            {/* {selectedOptions && selectedOptions
    .filter(option => option !== null && option !== undefined) // Filter out null or undefined options
    .map((option, index) => (
        <Button key={index} className='btn-arrow' sx={{ background: '#4780FF' }}>
            <span className='text-white me-1'>{option.Comments}</span>
            <span className="material-symbols-outlined font-16 text-white close" onClick={() => handleRemoveOption(option)}>
                close
            </span>
            <PlayArrowIcon className='arrow-icon' sx={{ color: '#4780FF' }} />
        </Button>
))} */}

                        </Box>
                    </Box>

                    <Box className='d-flex'>
                        <ToggleButton
                            size='small'
                            value="check"
                            onClick={handleClickOpenAddComment}
                        >
                            <PostAddIcon />
                        </ToggleButton>
                        <ToggleButton
                            size='small'
                            value="check" className='mx-2'>
                            <DownloadIcon />
                        </ToggleButton>

                        <Box>
                            <ToggleButton
                                size='small'
                                value="check"
                                aria-describedby={id} variant="contained" onClick={handleClick}
                            >
                                <TuneIcon />
                            </ToggleButton>

                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                className='p-5'
                            >
                                <Box className='client-details-filter p-2' sx={{ width: '180px' }}>
                                    <Typography variant="Body2" className='font-14 sembold mb-2 text-black'>
                                        View
                                    </Typography>

                                    <div className='text-center mb-2 client-details-filter-btn d-flex'>
                                        {/* <ToggleButton className='w-100 active' value="left" aria-label="left aligned">
                                            <DnsIcon />
                                        </ToggleButton> */}
                                        <ToggleButton className='w-100' value="left" aria-label="left aligned" onClick={() => setToggleScreen({ singleCardView: false, tableGridView: true })}>
                                            <AppsIcon />
                                        </ToggleButton>
                                        <ToggleButton className='w-100' value="left" aria-label="left aligned" onClick={() => setToggleScreen({ singleCardView: true, tableGridView: false })}>
                                            <TableRowsIcon />
                                        </ToggleButton>
                                    </div>

                                    <Box className='p-1'>
                                        <Typography variant="Body2" className='font-12 sembold mb-1 text-black ps-2 d-block'>
                                            Activity Type
                                        </Typography>
                                        <Box className='d-flex'>
                                            <FormControl sx={{ m: 1, minWidth: 80 }} className='select-border mt-0'>
                                                <BootstrapTooltip title="Sort By" arrow
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
                                                    <Select
                                                        // value={age}
                                                        // onChange={handleChange}
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
                                                        label="Sort By"
                                                    >
                                                        <MenuItem value="" style={{ display: "none" }}>
                                                            <SwapVertIcon className='pe-1' /> Sort By
                                                        </MenuItem>
                                                        <MenuItem className='ps-1' value="None"><WarningIcon className='ps-1' />  Clear Sortby</MenuItem>
                                                        <MenuItem value={"Date"} className='ps-1' >
                                                            <CalendarMonthIcon className='pe-1' />
                                                            By Date</MenuItem>
                                                        <MenuItem value={"Description"} className='ps-1' ><DescriptionIcon className='pe-1' />
                                                            By Activity</MenuItem>
                                                    </Select>
                                                </BootstrapTooltip>
                                            </FormControl>
                                            {/* <UpgradeIcon />
                                            <VerticalAlignBottomIcon /> */}
                                            {sortByProperty !== "" && sortByProperty !== "None" && <Checkbox
                                        // {...label}
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

                                    <Box className='p-1'>
                                        <Typography variant="Body2" className='font-12 sembold mb-1 text-black ps-2 d-block'>
                                            User(s)
                                        </Typography>

                                        <div>
                                            <BootstrapTooltip title="User(s)" arrow
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

                                                <Button
                                                    id="basic-button"
                                                    aria-controls={openSort ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openSort ? 'true' : undefined}
                                                    onClick={handleClickSort}
                                                    className='min-width-auto'
                                                >
                                                  {(ForwardUser && ForwardUser!="Clear Filter") ? ForwardUser : "All"}  
                                                </Button>
                                            </BootstrapTooltip>
                                            {/* <Menu
                                                id="basic-menu"
                                                anchorEl={anchorElSort}
                                                open={openSort}
                                                onClose={handleCloseSort}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                                className='custom-dropdown'
                                            > */}
                                             <Menu
                                                id="basic-menu"
                                            
                                                anchorEl={anchorElSort}
                                                open={openSort}
                                                onClose={handleCloseSort}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                              
                                                className='custom-dropdown'
                                            >
                                               <MenuItem value="Section" onClick={() => handleMenuItemClick("Clear Filter")}>Clear Filter</MenuItem>
                                                {UniqueUser && UniqueUser.length > 0 && UniqueUser.map((itm) => {
                                                    return <MenuItem key={itm.ForwardedBy} value={itm.ForwardedBy} onClick={() => handleMenuItemClick(itm.ForwardedBy)}>{itm.ForwardedBy}</MenuItem>
                                                })}
                                                
                                                {/* <MenuItem onClick={handleCloseSort}>Dropdown List 2</MenuItem>
                                                <MenuItem onClick={handleCloseSort}>Dropdown List 3</MenuItem> */}
                                            </Menu>
                                        </div>
                                    </Box>
                                </Box>
                            </Popover>
                        </Box>
                    </Box>
                </Box>

                <hr className='mt-0' />
                {toggleScreen.singleCardView ?
                <Box class="activity-timeline activity-timeline-2">
                    <ul class="timeline-ul">
                    {(() => {
        try {
            if (tempdatafilter && tempdatafilter.length > 0) {
                return tempdatafilter.map((item, index) => (
                    <li key={index}>
                        <Box class="datetime">
                            <span>{item["Actioned Date"]}</span>
                            <span>{ }</span>
                        </Box>
                        <Box class="line-dotted">
                            <Box class="line-time"></Box>
                            <Box class="circle-time"></Box>
                            <Box class="circle-border"></Box>
                        </Box>
                        <Box class="timeline-details">
                            <Box class="icon-time-status"></Box>
                            <Box class="content-time">
                                <h5>{item.Comments}</h5>
                                <Box className='user-name pt-2 mt-2 d-flex align-items-center'>
                                    <PersonIcon className='me-1' /> <p className='mb-0'>{item["ForwardedBy"]}</p>
                                </Box>
                            </Box>
                        </Box>
                    </li>
                ))
            } else {
                return getAudit.map((item, index) => (
                    <li key={index}>
                        <Box class="datetime">
                            <span>{item["Actioned Date"]}</span>
                            <span>{ }</span>
                        </Box>
                        <Box class="line-dotted">
                            <Box class="line-time"></Box>
                            <Box class="circle-time"></Box>
                            <Box class="circle-border"></Box>
                        </Box>
                        <Box class="timeline-details">
                            <Box class="icon-time-status"></Box>
                            <Box class="content-time">
                                <h5>{item.Comments}</h5>
                                <Box className='user-name pt-2 mt-2 d-flex align-items-center'>
                                    <PersonIcon className='me-1' /> <p className='mb-0'>{item["ForwardedBy"]}</p>
                                </Box>
                            </Box>
                        </Box>
                    </li>
                ))
            }
        } catch (error) {
            console.error(error);
            return null; // or display an error message
        }
    })()}
                   

                        {/* {selectedOptions ? selectedOptions.map((item, index) => {
                            return (
                                <>
                                    <li key={index}>
                                        <Box class="datetime">
                                            <span>{item["Actioned Date"]}</span>
                                            <span>{ }</span>
                                        </Box>
                                        <Box class="line-dotted">
                                            <Box class="line-time"></Box>
                                            <Box class="circle-time"></Box>

                                            <Box class="circle-border"></Box>
                                        </Box>
                                        <Box class="timeline-details">
                                            <Box class="icon-time-status"></Box>
                                            <Box class="content-time">
                                                <h5>{item.Comments}</h5>
                                                <Box className='user-name pt-2 mt-2 d-flex align-items-center'>
                                                    <PersonIcon className='me-1' /> <p className='mb-0'>{item["ForwardedBy"]}</p>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </li>
                                </>
                            )

                        }) : ""} */}
                    </ul>
                    
                </Box>
                 :(
                    <div><Activitygrid getAudit={getAudit} selectedDocument={selectedDocument} call_Json_GetAudit={call_Json_GetAudit} tempdatafilter={tempdatafilter}/></div>
                 )}
            </Box>

            <Dialog
                open={openAddComment}
                onClose={AddCommenthandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
            >

                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold text-black mb-0'>
                            Add Comment
                        </Typography>
                    </Box>

                    {/*  */}
                    <Button onClick={AddCommenthandleClose}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>


                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Grid container spacing={3} className='mb-2'>
                            <Grid item xs={6} md={6}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo-comment"
                                    key="comment"
                                    options={getUserComment}
                                    getOptionLabel={(option) => option.Comment}
                                    onChange={onChangeStandardComment}
                                    renderInput={(params) => <TextField {...params} label="Standard Comment(s):" />}
                                />
                            </Grid>

                            <Grid item xs={6} md={6}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={getCateGory}
                                    getOptionLabel={(option) => option.CatName}
                                    onChange={onChangeStandardCate}
                                    renderInput={(params) => <TextField {...params} label="Category List:" />}
                                />
                            </Grid>

                        </Grid>

                        <Box className='w-100 mt-3 mb-4'>
                            <textarea className='textarea textarea-2 w-100' placeholder='Enter Your Comment..'
                            name='TextComment'
                            onChange={handleChangeTextArea}
                            ></textarea>
                        </Box>


                    </DialogContentText>

                    <DialogActions className='justify-content-between'>
                        <Typography variant="h4" className='font-18 bold text-black mb-0'>
                            Doc ID: {selectedDocudata && selectedDocudata["Registration No."] ? selectedDocudata["Registration No."] : ""}
                        </Typography>

                        <Box>
                            <Button onClick={AddCommenthandleClose} className='btn-red me-2'>Cancle</Button>
                            <Button onClick={AddCommenthandleCloseSubmit} className='btn-blue-2' autoFocus>
                                Submit
                            </Button>
                        </Box>


                    </DialogActions>

                </DialogContent>

            </Dialog>

        </>
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
  
    &.Mui-focused,
    &.Mui-focusVisible {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.Mui-focusVisible {
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    &[aria-selected=true].Mui-focused,
    &[aria-selected=true].Mui-focusVisible {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
    `,
);

const Layout = styled('div')`
    // display: flex;
    // flex-flow: column nowrap;
    // gap: 4px;
  `;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Comment = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }
];

export default Activity