import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Checkbox, FormControlLabel } from '@mui/material';
import CommanCLS from '../../services/CommanService';
import dayjs from 'dayjs';
import CreateNewModalTask from '../../components/CreateNewModal';
//import { red } from '@mui/material/colors';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GetCategory_Redux } from '../../redux/reducers/api_helper';
let originatorNo;
function UploadDocForClient({ 
      openUploadDocument, 
      setOpenUploadDocument
    }) {
    //console.log("location state",localtion.state)
    const localtion = useLocation();
    try {
        originatorNo = localtion.state;
    }

    catch (e) {
        console.log("originatorNo", e)
    }


    const handleCloseDocumentUpload = () => {
        setOpenUploadDocument(false);
    };
    const dispatch = useDispatch();
    let category = useSelector((state) => state.counter.AllCategory?.Table);
    let s_Desc = useSelector((state) => state.counter.AllCategory?.Table1);
    let categoryList = category ? category : [];
    let standarDescription = s_Desc ? s_Desc : [];
    const folderList = useSelector((state) => state.counter.folders);
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [txtFolderId, setTxtFolderId] = useState(localStorage.getItem("ProjectId"));

    const [txtFolderData, setTextFolderData] = useState(null);

    const [createNewFileObj, setCreateNewFileObj] = useState([]);
    const [saveCounter, setSaveCounter] = useState(0);

    const [clientList, setClientList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [udfTable, setUDFTable] = useState([]);
    const [getAllFolderData, setGetAllFolderData] = useState([]);

    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/"; // base url for api
    //   let dt = new LoginDetails();
    let cls = new CommanCLS(baseUrl, agrno, Email, password);

    const [selectedFiles, setSelectedFiles] = useState([]);////////////Set file selected and upload

    const [txtClientId, setTxtClientId] = useState(originatorNo);/////////////////for clientid set

    const [txtClientData, setTxtClientData] = useState(null);/////////////////for clientid set

    const [txtSectionId, setTxtSectionId] = useState(null);//////for sectionid set

    const [txtSectionData, setTxtSectionData] = useState(null);//////for sectionid set

    const [documentDate, setDocumentDate] = useState(null); // Initialize the selected date state

    const [receivedDate, setReceivedDate] = useState(null); // Initialize the selected date state

    // const [standarDescription, setStandarDescription] = useState([]); // Initialize the selected date state

    const [txtStandarDescription, settxtStandarDescription] = useState(""); // Initialize the selected date state

    const [subSectionData, setSubSectionData] = useState([]); // Initialize the selected date state

    const [txtSubSectionData, setTxtSubSectionData] = useState(null); // Initialize the selected date state

    const [subSectionBool, setSubSectionBool] = useState(false); // Initialize the selected date state

    const [categoryid, setCategoryId] = useState(0);

    // const [categoryList, setCategoryList] = useState([])

    const [showModalCreateTask, setshowModalCreateTask] = useState(false);
    const [openModal, setOpenModal] = useState(false);



    const [fileLangth, setFileLength] = useState(0);
    



    const [validation, setValidation] = useState("");

    const [TaskType, setTaskType] = useState("");

    let count = 2;

    const [selectedValueUDF, setSelectedValueUDF] = useState([]);
    const [selectedValueUDFText, setselectedValueUDFText] = useState("");
    const [udfIdWithValue, setUDFidWithValue] = useState([]);

    // const [passButtonHide, setPassButtonHide] = useState(false);

    // Event handler to handle file selection
    const handleFileSelect = async (event) => {
        const files = event.target.files;
        const selectedFilesArray = Array.from(files);
        ///let couter = 0;
        for (let i = 0; i < selectedFilesArray.length; i++) {
            // couter++;
            const file = selectedFilesArray[i];
            const isFileAlreadySelected = selectedFiles.some((selectedFile) => selectedFile.FileName === file.name);

            if (!isFileAlreadySelected) {
                await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        let fileByte = reader.result.split(";")[1].replace("base64,", "");
                        const fileData = {
                            FileName: file.name,
                            Base64: fileByte ? fileByte : "", // Base64 data of the file
                            FileSize: file.size,
                            Preview: reader.result, // Data URL for preview
                            DocId: "",
                            Guid: localStorage.getItem("GUID"),
                            FileType: cls.getFileExtension(file.name).toLowerCase()
                        };
                        setSelectedFiles((prevUploadedFiles) => [...prevUploadedFiles, fileData]);
                        resolve();
                    };
                    reader.readAsDataURL(file); // Read file as data URL (base64)
                });
            }
        }
    };


    useEffect(() => {
        setCreateNewFileObj([]);
        setSaveCounter(0);
        setStep(1);
        setSelectedFiles([]);
        settxtStandarDescription("");
        setCreateTaskChk(false);
        setCreatePublishChk(false)
        setButtonNameText("Submit")
    }, [openUploadDocument]);

    useEffect(() => {
        setTimeout(() => {
            setFileLength(selectedFiles.length);
        }, 2000);
    }, [selectedFiles]);

    const RemoveFiles = (id) => {
        // Filter out the object with the specified ID
        const resutl = selectedFiles.filter(guid => guid.FileName !== id.FileName);
        setSelectedFiles(resutl);
    };





    //////////////////////////Get Foder Data
    function Json_GetFolders() {
        let res = folderList.filter((f) => f.FolderID === parseInt(localStorage.getItem("ProjectId")));
        if (res.length > 0) {
            setTextFolderData(res[0]);
        }
        // let obj = {
        //     agrno: agrno,
        //     Email: Email,
        //     password: password
        // }

        // try {
        //     cls.Json_GetFolders(obj, function (sts, data) {
        //         if (sts) {
        //             if (data) {
        //                 let js = JSON.parse(data);
        //                 let tbl = js.Table;
        //                 let result = tbl.filter((el) => el.FolderID === parseInt(txtFolderId));
        //                 console.log("get folder list", tbl);
        //                 setFolderList(tbl);
        //                 if (result.length > 0) {
        //                     console.log("get folder list", result);
        //                     setTextFolderData(result[0])
        //                     // setTxtFolderData(result[0]);
        //                 }
        //             }
        //         }
        //     });
        // } catch (error) {
        //     console.log({
        //         status: false,
        //         message: "Folder is Blank Try again",
        //         error: error,
        //     });
        // }
    }

    function Json_GetFolderData() {
        // console.log("Json_GetFolderData11", txtFolderId);
        try {
            let o = {};
            o.ProjectId = txtFolderId;
            o.SectionId = "-1";
            o.ClientId = "";
            cls.Json_GetFolderData(o, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);

                    setGetAllFolderData(js);

                    let udfTable2 = js.Table2;
                    if (udfTable2.length > 0) {
                        setUDFTable(udfTable2);
                    }
                }
            });
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }
    }


    const Json_GetSections = (pid) => {
        try {
            let o = { ProjectId: pid }
            cls.Json_GetSections(o, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let sectionList = js.Table;
                        console.log("Json_GetSections", sectionList)
                        if (sectionList.length > 0) {
                            setSectionList(sectionList);
                        }
                    }

                }
            })
        } catch (error) {
            console.log("Json_GetSections", error);
        }

    }

    const Json_GetClientsByFolder = (pid) => {
        try {
            let o = { ProjectId: pid }
            cls.Json_GetClientsByFolder(o, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let clientdata = js.Table1;
                        console.log("Json_GetClientsByFolder", clientdata)
                        if (clientdata.length > 0) {
                            let client_list = clientdata.filter((v, i, a) => a.findIndex(v2 => (v2.Client === v.Client)) === i);
                            setClientList(client_list);
                            if (originatorNo) {
                                let res = clientdata.filter((c) => c.ClientID === originatorNo.originatorNo);
                                if (res.length > 0) {
                                    setTxtClientData(res[0])
                                }
                            }
                        }
                    }
                }
            })
        } catch (error) {
            console.log("Json_GetClientsByFolder", error);
        }

    }


    useEffect(() => {
        Json_GetSections(localStorage.getItem("ProjectId"))
        Json_GetClientsByFolder(localStorage.getItem("ProjectId"))
        Json_GetFolders();
        Json_GetFolderData();
        setDocumentDate(dayjs(cls.GetCurrentDayDate()).format("YYYY/MM/DD")); // Update the selected date state with the new date value
        setReceivedDate(dayjs(cls.GetCurrentDayDate()).format("YYYY/MM/DD")); // Update the selected date state with the new date value
        // console.log("GetCurrentDayDate", dayjs(cls.GetCurrentDayDate()).format("YYYY/MM/DD"));
        // console.log("GetNextDayDate", cls.GetNextDayDate());
        setOpenModal(false);
        setshowModalCreateTask(false)
    }, [])

    const handleOnFolderClick = (data) => {

        if (data) {
            setTxtFolderId(data.FolderID)
            setTextFolderData(data)
            // setTxtFolderData(data);
            Json_GetSections(data.FolderID)
            Json_GetClientsByFolder(data.FolderID)
        }
        Json_GetFolderData()

    }

    const handleClientChange = (data) => {
        if (data !== null) {
            console.log("Get Clietn On click", data);
            setTxtClientId(data.ClientID);
            setTxtClientData(data);
        }

    }

    const handleSectionChange = (data) => {
        if (data !== null) {
            console.log("Get Clietn On click", data);
            setTxtSectionId(data.SecID)
            setTxtSectionData(data)
            dispatch(GetCategory_Redux(data.SecID));
            Json_GetSubSections(data.SecID)
        }

    }




    const handleCategoryChange = (data) => {
        if (data) {
            //console.log("Get Clietn On click", data);
            setCategoryId(data.CatId)
        }

    }
    const handleStandarDescriptionChange = (data) => {
        if (data) {
            //console.log("Get Clietn On click", data);
            settxtStandarDescription(data.Description)
        }

    }

    const handleDescriptionChange = (e) => {
        // console.log("Get Clietn On click", e.target.value);
        settxtStandarDescription(e.target.value)
    }


    function Json_GetSubSections(SectionId) {
        try {
            let o = {};
            o.SectionId = SectionId;
            o.ProjectId = txtFolderId;
            cls.Json_GetSubSections(o, function (sts, data) {
                if (sts) {
                    console.log("Json_GetSubSections", data);
                    let json = JSON.parse(data);
                    let tbl1 = json.Table1;
                    if (tbl1.length > 0) {
                        setSubSectionBool(true);
                        setSubSectionData(tbl1);
                    }
                    else {
                        setSubSectionBool(false);
                    }

                }
            });
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }
    }

    const handleSubSectionChange = (data) => {
        if (data) {
            console.log("Get Clietn On click", data);
            setTxtSubSectionData(data);
        }

    }

    //////////////////////////End Get Foder Data
    /////////////////////////////DAte Set



    const handleDateChangeDocument = (date) => {
       // console.log("Get Clietn On click", dayjs(date).format('YYYY/MM/DD'));
        setDocumentDate(dayjs(date).format('YYYY/MM/DD')); // Update the selected date state
    };

    const handleDateChangeRecieved = (date) => {
        console.log("Get Clietn On click", dayjs(date).format('YYYY/MM/DD'));
        setReceivedDate(dayjs(date).format('YYYY/MM/DD')); // Update the selected date state
    };

    const [createTaskChk, setCreateTaskChk] = useState(false);

    const [createPublishChk, setCreatePublishChk] = useState(false);

    const [typeTaskBool, setTypeTaskBool] = useState(false);

    const [buttonNameText, setButtonNameText] = useState("Submit");



    const handleCheckboxChangeCreateTask = (event) => {

        const isChecked = event.target.checked;
        setCreateTaskChk(isChecked);
        setTypeTaskBool(isChecked)
        setTaskType(isChecked ? "CRM" : "Portal");
        if (isChecked) {
            setButtonNameText(createPublishChk === "Portal" ? "Submit & Create Portal Task" : "Submit & Create Task");
        } else {
            setButtonNameText(createPublishChk === "Portal" ? "Submit" : "Submit");
        }
        setCreatePublishChk(false);
    };

    const handleCheckboxChangeCreatePublish = (event) => {
        const isChecked = event.target.checked;
        setCreatePublishChk(isChecked);
        setTypeTaskBool(isChecked)
        setTaskType(isChecked ? "Portal" : "CRM");
        if (isChecked) {
            setButtonNameText(createTaskChk === "CRM" ? "Submit & Create Task" : "Submit & Create Portal Task");
        } else {
            setButtonNameText(createTaskChk === "CRM" ? "Submit" : "Submit");
        }
        setCreateTaskChk(false);
    };


    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const checkAndLog = (value, errorMessage) => {
        if (value) {
            console.log(value);
        } else {
            toast.error(errorMessage);
        }
    }

   

    const UploadDocumentCreattTask = async () => {
        try {
            setCreateNewFileObj([]);
            if (checkAndLog(txtFolderId, "Please Select a Folder")) return false;
            if (checkAndLog(txtClientId, "Please Select a Client")) return false;
            if (checkAndLog(txtSectionId, "Please Select a Section")) return false;

            if (selectedFiles.length > 0) {
                for (let i of selectedFiles) {
                    await Json_RegisterItem(i)
                }
                // setOpenUploadDocument(false);   
            }
            else {
               // Json_RegisterItem()
                    toast.error("Please select a document",{
                        toastStyle: {zIndex:9999},
                    });
            }

        } catch (error) {
            console.log("Json_RegisterItem", error)
        }

    }

   
    let counter=0;

    function Json_RegisterItem(fileData) {
        try {
            let values;
            let concatenatedString;
            if (udfIdWithValue) {
                values = Object.values(udfIdWithValue);
                concatenatedString = values.join(', ');
            }


            let validationMessage = '';

            if (!txtFolderData || !txtFolderData.FolderID) {
                validationMessage += "Please Select Folder. ";
            }

            if (!txtClientData || !txtClientData.ClientID) {
                validationMessage += "Please Select Reference. ";
            }

            if (!txtSectionData || !txtSectionData.SecID) {
                validationMessage += "Please Select Section. ";
            }
            if (!txtStandarDescription) {
                validationMessage += "Description is blank. ";
            }

            if (validationMessage === '') {

                let obj = {
                    "sectionId": txtSectionData.SecID,
                    "deptId": 0,
                    "folderId": txtFolderData.FolderID,
                    "categoryId": categoryid ? categoryid : 0,
                    "subSectionId": txtSubSectionData ? txtSubSectionData.SubSectionID : 0,
                    "retForMonth": "-1",
                    "deptName": "",
                    "folderName": txtFolderData.Folder,
                    "originatorId": txtClientData.ClientID,
                    "senderId": txtClientData.ClientID,
                    "sectionName": txtSectionData.Sec,
                    "extDescription": txtStandarDescription ? txtStandarDescription : "",
                    "docDirection": "Incoming",
                    "description": txtStandarDescription ? txtStandarDescription : "",
                    "priority": "",
                    "stickyNote": "",
                    "fileName": fileData ? fileData.FileName : "",
                    "forActionList": "",
                    "forInformationList": "",
                    "forGroupList": "",
                    "uDFList": concatenatedString,
                    "sUDFList": "",
                    "clientname": txtClientData.Client,
                    "receiveDate": dayjs(receivedDate).format("YYYY/MM/DD"),
                    "actionByDate": "1990/01/01",
                    "actionDate": dayjs(documentDate).format("YYYY/MM/DD"),
                    "docViewedDate": dayjs(documentDate).format("YYYY/MM/DD"),
                    "strb64": fileData ? fileData.Base64 : "",
                    "strtxt64": "",
                    "EmailMessageId": ""
                }
                console.log("Json_RegisterItem", obj);


                cls.Json_RegisterItem(obj, function (sts, data) {
                    if (sts) {
                        if (data) {
                            let js = JSON.parse(data)
                           
                            if (js.Status === "true") {
                                counter++;
                                console.log("Json_RegisterItem", js,counter)
                                if (fileData) {
                                    fileData.DocId = js.ItemId;
                                    setCreateNewFileObj((Previous) => [...Previous, fileData]);
                                }

                                if(selectedFiles.length===counter){
                                    toast.success(selectedFiles.length + " Document(s) Uploaded!");                      
                                }

                                if (buttonNameText === "Submit & Create Portal Task" || buttonNameText === "Submit & Create Task") {
                                    setshowModalCreateTask(true)
                                    setOpenModal(true);
                                    setOpenUploadDocument(false);
                                    // handleClickOpen("Portal");
                                    // setTimeout(() => {
                                    //     if(openModal){
                                    //         setOpenUploadDocument(false); 
                                    //     }
                                      
                                    // }, 4000);    
                                    
                                    // setOpenModal(true) doring conflict
                                    // setOpenUploadDocument(false);
                                   
                                }
                                else {
                                    setOpenUploadDocument(false);
                                }




                            }
                            else {
                                toast.error("Faild Please Try Again");
                            }
                        }
                        else {
                            toast.error("Faild Please Try Again");
                        }




                    }
                })

            } else {
                // Data is invalid, set the validation message
                setValidation(validationMessage);
                // Hide validation message after 2 seconds
                setTimeout(() => {
                    setValidation('');
                }, 3000);
            }
        } catch (error) {
            console.log("Json_RegisterItem Network issue please try again")
        }





    }



    const handleAutocompleteChangeUdf = (id, newValue, udf) => {
        let setUdf = newValue.UDFID + ":" + newValue[udf];

        setSelectedValueUDF(prevState => ({
            ...prevState,
            [id]: newValue // Update selected value for a specific ComboBox
        }));
        //console.log("newValue",id,newValue,udf)

        setUDFidWithValue(prevState => ({
            ...prevState,
            [id]: setUdf // Update selected value for a specific ComboBox
        }));


        //  const stringRepresentation = JSON.stringify(udfIdWithValue);
        // console.log("newValue11",stringRepresentation);
    };

    const handleAutocompleteChangeUdfText = (id, newValue) => {
        let setUdf = id + ":" + newValue;
        setselectedValueUDFText(prevState => ({
            ...prevState,
            [id]: newValue // Update selected value for a specific ComboBox
        }));

        setUDFidWithValue(prevState => ({
            ...prevState,
            [id]: setUdf // Update selected value for a specific ComboBox
        }));

        
        // console.log("newValue",udfIdWithValue);

    };




    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpenUploadDocument}>
                OpenUploadDocument alert dialog
            </Button> */}


            <Dialog
                open={openUploadDocument}
                onClose={handleCloseDocumentUpload}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
            >
                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold text-black'>
                            Upload Document <span className='bold text-blue'>({fileLangth}) </span>
                        </Typography>
                    </Box>

                    {/*  */}
                    <Button onClick={handleCloseDocumentUpload} autoFocus sx={{ minWidth: 30 }}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>

                <DialogContent className='pb-0'>
                    <DialogContentText id="alert-dialog-description">
                        {/* file upload */}
                        {step === 1 && (<>
                            <Box className="">
                                <Box className='row'>
                                    <Box className='col-lg-8 m-auto'>
                                        <Box className="file-upload-2 mt-4">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                multiple
                                                onChange={handleFileSelect}
                                            />
                                            <label className="file-upload-2-label" for="file-upload">
                                                <Box className="text-center">
                                                    <span className="material-symbols-outlined icon">
                                                        cloud_upload
                                                    </span>
                                                    <Box className="upload-content-2">
                                                        <Typography variant="h4" className='font-18 bold mb-1'>
                                                            Select or drag file here
                                                        </Typography>
                                                        <Typography variant="body1" className='font-14'>
                                                            JPG, PNG or PDF, file size no more than 10MB
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </label>
                                        </Box>

                                    </Box>
                                </Box>

                                <Box className='uploaded-list mt-4'>
                                    {selectedFiles.map((item, index) => {
                                        return <>
                                            <Box className='uploaded-box' key={index}>
                                                <CloseIcon className='close-icon' onClick={() => RemoveFiles(item)} />
                                                <DescriptionIcon className='font-32' />
                                                <Typography variant="body1" className='font-14 uploaded-name'>
                                                    {item.FileName}
                                                </Typography>
                                                <Typography variant="body1" className='font-12'>
                                                    {item.File}
                                                </Typography>
                                            </Box>
                                        </>
                                    })}
                                </Box>
                            </Box>
                        </>)}
                        {/*  */}
                        {step === 2 && (<>
                            <Box className='row'>
                                <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                    <Autocomplete

                                        id="combo-box-demo"
                                        options={folderList}
                                        value={txtFolderData}
                                        getOptionLabel={(option) => option.Folder} // Provide a function to extract the label from each option
                                        onChange={(event, newValue) => handleOnFolderClick(newValue)} // Handle the onChange event
                                        renderInput={(params) => <TextField {...params} label="Folder" />}
                                    />
                                </Box>

                                <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={clientList}
                                        getOptionLabel={(option) => {
                                            // console.log("ldsfljfd",option.Client);
                                            return option.Client;
                                        }} // assuming "Client" is the property you want to display

                                        onChange={(event, newValue) => handleClientChange(newValue)}
                                        renderInput={(params) => <TextField {...params} label="Reference" />}
                                    />
                                </Box>

                                <Box className='col-lg-6 mb-3 col-md-6 col-sm-12 d-flex align-items-end'>
                                    <Autocomplete

                                        id="combo-box-demo"
                                        options={sectionList}

                                        getOptionLabel={(option) => option.Sec}
                                        onChange={(event, newValue) => handleSectionChange(newValue)} // Handle the onChange event
                                        renderInput={(params) => <TextField {...params} label="Section" />}
                                        className='w-100'
                                    />
                                </Box>

                                {subSectionBool && <Box className='col-lg-6 mb-3 col-md-6 col-sm-12 d-flex align-items-end'>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={subSectionData}
                                        getOptionLabel={(option) => option.SubSection}
                                        onChange={(event, newValue) => handleSubSectionChange(newValue)} // Handle the onChange event
                                        renderInput={(params) => <TextField {...params} label="Subsection" />}
                                        className='w-100'
                                    />
                                </Box>}

                                <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                    <label className='font-14 text-black'>Document Date</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker className=" w-100"
                                            format="DD/MM/YYYY"
                                            defaultValue={moment()}
                                            onChange={handleDateChangeDocument} // Handle date changes
                                        />




                                    </LocalizationProvider>
                                </Box>

                                <Box className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                    <label className='font-14 text-black'>Received Date</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker className=" w-100"
                                            format="DD/MM/YYYY"
                                            defaultValue={moment()}
                                            onChange={handleDateChangeRecieved} // Handle date changes
                                        />
                                    </LocalizationProvider>
                                </Box>

                                <Box className='col-lg-6 mb-3 col-md-6 col-sm-12 d-flex align-items-end'>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={standarDescription}
                                        getOptionLabel={(option) => option.Description}
                                        onChange={(event, newValue) => handleStandarDescriptionChange(newValue)} // Handle the onChange event
                                        renderInput={(params) => <TextField {...params} label="Standar Description" />}
                                        className='w-100'

                                    />
                                </Box>
                                <Box className='col-lg-6 mb-3 col-md-6 col-sm-12 d-flex align-items-end'>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={categoryList}
                                        getOptionLabel={(option) => option.CatName}
                                        onChange={(event, newValue) => handleCategoryChange(newValue)} // Handle the onChange event
                                        renderInput={(params) => <TextField {...params} label="Category" />}
                                        className='w-100'
                                    />
                                </Box>

                                <Box className='col-lg-6 mb-3 col-md-6 col-sm-12 pt-2'>
                                    <FormControlLabel control={<Checkbox checked={createTaskChk} onChange={handleCheckboxChangeCreateTask} />} label="Create Task" />
                                    <FormControlLabel control={<Checkbox checked={createPublishChk} onChange={handleCheckboxChangeCreatePublish} />} label="Publish" />
                                </Box>

                                <Box className='col-lg-12'>
                                    <textarea className='textarea w-100' onChange={handleDescriptionChange} value={txtStandarDescription} placeholder='Description'></textarea>
                                </Box>
                                <Box component="section" sx={{ color: '#f44336' }}>
                                    {validation}
                                </Box>

                            </Box>


                            <hr />
                            <Typography variant="body1" className="font-18 bold mb-2 text-black">
                                UDF Form
                            </Typography>
                            <Box className='row'>
                                {udfTable ? udfTable.map((item, index) => {
                                    switch (item.ControlType) {
                                        case "ComboBox":
                                            count++;
                                           // console.log("vlaueeee", count)
                                            let data = getAllFolderData["Table" + count];
                                            if (data && data.length > 0 && item.UDFId === data[0]["UDFID"]) {
                                                return (
                                                    <Box key={index} className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={data}
                                                            value={selectedValueUDF['combo-box-1']}
                                                            onChange={(event, vlaue) => handleAutocompleteChangeUdf(index, vlaue, item.UDF)} // Handle onChange event
                                                            getOptionLabel={(option) => option[item.UDF]} // Adjust this based on your option structure
                                                            renderInput={(params) => <TextField {...params} label={item.UDF} />}
                                                        />
                                                    </Box>
                                                );
                                            }
                                            break;
                                        case "TextBox":
                                            return (
                                                <Box key={index} className='col-lg-6 mb-3 col-md-6 col-sm-12'>
                                                    <TextField value={selectedValueUDFText[item.UDFId] || ""} onChange={(event, vlaue) => handleAutocompleteChangeUdfText(item.UDFId, event.target.value)} id="outlined-basic" label={item.UDF} variant="outlined" className='w-100' />
                                                </Box>
                                            );
                                        default:
                                            return null; // Handle other ControlTypes if necessary
                                    }
                                    return null; // Default return in case no condition is met
                                }) : null}



                            </Box>

                            {/* {showModalCreateTask && openModal && <CreateNewModalTask
                                documentDate={documentDate}
                                receivedDate={receivedDate}
                                createNewFileObj={createNewFileObj}
                                txtFolderData={txtFolderData}
                                txtClientData={txtClientData}
                                txtSectionData={txtSectionData}
                                TaskType={TaskType}
                                // setPassButtonHide={setPassButtonHide}
                                // passButtonHide={passButtonHide}
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                            ></CreateNewModalTask>} */}


                        </>)}



                        {/* row end */}

                        {/* UDF Start */}




                        {/* {step===4 && (<>
                    <CreateNewModalTask openModal={true}></CreateNewModalTask>
                    </>)} */}
                        {/* UDF End */}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box className="d-flex mb-3 pe-3">
                        {step === 2 && (<>
                            <Button variant="text" className="btn-blue-2 me-2" onClick={handlePrevious} disabled={step === 1}>
                                Previous
                            </Button>

                            <Button variant="text" style={{ float: 'right' }} className="btn-blue-2" onClick={UploadDocumentCreattTask}>
                                {buttonNameText}
                            </Button>

                        </>)}

                        {step === 1 && (<>
                            <Button variant="text" className="btn-blue-2 me-2" onClick={handleNext}>
                                Index
                            </Button>
                        </>)}

                        {/* <Button variant="text" className="btn-blue-2" onClick={UploadDocumentCreattTask}>
                            Submit
                        </Button> */}
                    </Box>
                </DialogActions>
            </Dialog>
            {/* <ToastContainer style={{ zIndex: "9999999" }}></ToastContainer> */}
        </React.Fragment>
    )
}

export default UploadDocForClient