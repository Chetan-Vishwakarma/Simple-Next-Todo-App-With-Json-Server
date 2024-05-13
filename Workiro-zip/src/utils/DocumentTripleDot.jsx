import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Link, Chip, Stack, ListItemIcon, Radio, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, Checkbox } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ArticleIcon from '@mui/icons-material/Article';
import { useDispatch } from "react-redux";
import { handleOpenModalRedux, setClientAndDocDataForTaskModalRedux } from '../redux/reducers/counterSlice';
import CommanCLS from '../services/CommanService';
import { toast } from "react-toastify"
import DocForDetail from './DocForDetail';

let agrno = localStorage.getItem("agrno");
let password = localStorage.getItem("Password");
let Email = localStorage.getItem("Email");
const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
const Cls = new CommanCLS(baseUrl, agrno, Email, password);

function DocumentTripleDot({ data,handleEdit }) {
    const dispatch = useDispatch();
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState({});
    const [associatedTask, setAssociatedTask] = useState([]);
    const [docForDetails, setDocForDetails] = useState({});
    const [openDocumentDetailsList, setOpenDocumentDetailsList] = React.useState(false);
    const [getAudit, setGetAudit] = useState([]);
    const [getVertion, setGetVertion] = React.useState([]);

    function Json_GetItemBase64DataById(item, tskType) {
        try {
            let filesData = [];
            let obj = {};
            obj.ItemId = item["Registration No."]
            // console.log("handle change fileData1", obj);

            Cls.Json_GetItemBase64DataById(obj, function (sts, base64data) {
                if (sts) {
                    if (base64data !== "No Data Exist") {
                        const fileData = {
                            FileName: item.Description + "." + item.Type,
                            Base64: base64data ? base64data : "", // Base64 data of the file
                            FileSize: "",
                            Preview: "", // Data URL for preview
                            DocId: item["Registration No."],
                            Guid: "",
                            FileType: item["Type"].toLowerCase(),
                            Description: item.Description

                        };
                        filesData.push(fileData);

                        let tempTxtClientData = { Client: item.Client, ClientID: item.SenderId };
                        let tempTxtSectionData = { Sec: item.Section, SecID: item.PostItemTypeID };
                        let tempFolderData = { Folder: item.Folder, FolderID: item.ProjectId };

                        dispatch(setClientAndDocDataForTaskModalRedux({ TaskType: tskType, createNewFileObj: filesData, txtClientData: tempTxtClientData, txtSectionData: tempTxtSectionData, txtFolderData: tempFolderData, }));
                        dispatch(handleOpenModalRedux(tskType));
                    }
                    else {
                        toast.error("Document is blank.")
                    }

                }

            })
        } catch (error) {
            console.log("Json_GetItemBase64DataById error", error)
        }

    }

    const Json_getAssociatedTaskListByDocumentId = (sDoc) => {
        let obj = {
            Email: localStorage.getItem('Email'),
            ItemId: sDoc["Registration No."],
            agrno: localStorage.getItem("agrno"),
            password: localStorage.getItem("Password")
        }
        try {
            Cls.Json_getAssociatedTaskListByDocumentId(obj, (sts, data) => {
                const res = JSON.parse(data);
                if (res.Table.length > 0) {
                    setAssociatedTask(res.Table);
                } else {
                    setAssociatedTask([]);
                }
            })
        } catch (err) {
            console.log("Error while calling Json_getAssociatedTaskListByDocumentId", err);
        }
    }


    const Json_GetAudit = (sDoc) => {
        try {
            let obj = {
                itemid: sDoc["Registration No."],
                password: localStorage.getItem("Password")
            }
            Cls.Json_GetAudit(obj, function (sts, data) {
                if (sts && data) {
                    let parse = JSON.parse(data);
                    let table = parse.Table;
                    if (table.length > 0) {

                        const formattedActivity = table.map(itm => {
                            if (itm["Actioned Date"]) {
                                const timeStamp1 = parseInt(itm["Actioned Date"].match(/\d+/)[0]);
                                itm["Actioned Date"] = new Date(timeStamp1);
                            }
                            return itm;
                        })

                        if (formattedActivity.length > 0) {
                            const filteredArray = formattedActivity.filter(item => item.Comments !== null);

                            setGetAudit(filteredArray);
                        }


                    }
                }
            })
        } catch (error) {
            console.log({ Status: false, mgs: "Data not found", Error: error });
        }
    }

    const call_Json_GetAudit = () => {
        Json_GetAudit(docForDetails);
    }

    function Json_GetVersionByItemId(data) {
        console.log("selected document data obj333", data)
        try {
            let obj = {};
            obj.itemId = data["Registration No."];
            Cls.Json_GetVersionByItemId(obj, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let tbl = js.Table;
                        if (tbl.length > 0) {
                            console.log("Json_GetVersionByItemId", tbl)
                            setGetVertion(tbl)
                        }

                    }

                }

            })
        } catch (error) {
            console.log("Json_GetVersionByItemId error", error)
        }
    }

    function downloadFile(item) {

        try {
            let obj = {};
            obj.ItemId = item["Registration No."]
            console.log("handle change fileData1", obj)

            Cls.Json_GetItemBase64DataById(obj, function (sts, base64data) {
                if (sts) {
                    if (base64data !== "No Data Exist") {
                        let ankr = document.createElement("a");
                        ankr.href = `data:application/octet-stream;base64,${base64data}`;
                        ankr.download = item.Path;
                        ankr.click();
                    }
                    else {
                        console.log("Document is blank")
                    }
                }
            })
        } catch (error) {
            console.log("Json_GetItemBase64DataById error", error)
        }
    }

    const handleClickDocumentList = (event, rowData) => {
        event.stopPropagation();
        const newAnchorElDocumentList = { ...anchorElDocumentList };
        newAnchorElDocumentList[rowData.key] = event.currentTarget;
        setAnchorElDocumentList(newAnchorElDocumentList);
    };
    const handleCloseDocument = (event, rowData) => {
        event.stopPropagation();
        const newAnchorElDocumentList = { ...anchorElDocumentList };
        delete newAnchorElDocumentList[rowData.key];
        setAnchorElDocumentList(newAnchorElDocumentList);
    };
    const handleCloseDocumentCreateTask = (event, rowData) => {
        if (rowData) {
            event.stopPropagation();
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            Json_GetItemBase64DataById(rowData.data, "CRM");
        }
    };
    const handleCloseDocumentPublish = (event, rowData) => {
        if (rowData) {
            console.log("row selected data", rowData)
            event.stopPropagation();
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            let res = Json_GetItemBase64DataById(rowData.data, "Portal");
            if (res) {
                dispatch(handleOpenModalRedux("Portal"));
            }
        }
    };
    const handleClickOpenDocumentDetailsList = (event, sDoc) => {
        Json_getAssociatedTaskListByDocumentId(sDoc);
        const updatedData = {};

        for (const key in sDoc) {
            if (key === "Attach") {
                updatedData["Attachment(s)"] = sDoc[key];
            } else {
                updatedData[key] = sDoc[key];
            }
        }

        setDocForDetails(updatedData);
        event.stopPropagation();
        setOpenDocumentDetailsList(true);
        Json_GetAudit(sDoc);
        Json_GetVersionByItemId(sDoc)
    };
    const handleCloseDocumentOpenDocumentBrowers = (event, rowData) => {
        if (rowData) {
            event.stopPropagation();
            let selectedDocument = rowData.data;
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            var IsApproved = selectedDocument["IsApproved"];
            var PortalDocId = selectedDocument["PortalDocId"];
            let IsApp = "";
            let PortalID = "";
            if (IsApproved === "SIG" && PortalDocId !== "") {
                IsApp = IsApproved;
                PortalID = PortalDocId;
            }
            let ViwerUrl = `https://mydocusoft.com/ViewerNew.aspx?AgreementNo=${localStorage.getItem("agrno")}&ItemId=${selectedDocument["Registration No."]}&ext=${selectedDocument.Type}&ViewerToken=${localStorage.getItem("ViewerToken")}&IsApp=${IsApp}&PortalID=${PortalID}`;
            window.open(ViwerUrl);
        }
    };
    const handleCloseDocumentDownload = (event, rowData) => {
        if (rowData) {
            event.stopPropagation();
            const newAnchorElDocumentList = { ...anchorElDocumentList };
            delete newAnchorElDocumentList[rowData.key];
            setAnchorElDocumentList(newAnchorElDocumentList);
            downloadFile(rowData.data)
        }
    };
    return (
        <>
        <DocForDetail 
          openDocumentDetailsList={openDocumentDetailsList} 
          setOpenDocumentDetailsList={setOpenDocumentDetailsList}
          docForDetails={docForDetails}
          getVertion={getVertion}
          associatedTask={associatedTask}
          getAudit={getAudit}
          call_Json_GetAudit={call_Json_GetAudit}
        />

            <Button
                id={`basic-button-${data.key}`}
                aria-controls={anchorElDocumentList[data.key] ? `basic-menu-${data.key}` : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElDocumentList[data.key])}
                onClick={(event) => {
                    handleClickDocumentList(event, data)
                }}
                className='min-width-auto'
            >
                <MoreVertIcon />
            </Button>
            <Menu
                id={`basic-menu-${data.key}`}
                anchorEl={anchorElDocumentList[data.key]}

                open={Boolean(anchorElDocumentList[data.key])}
                onClose={(event) => handleCloseDocument(event, data)}
                MenuListProps={{
                    'aria-labelledby': `basic-button-${data.key}`,
                }}
                className='custom-dropdown'
            >
                <MenuItem
                    onClick={(event) => handleCloseDocumentCreateTask(event, data)}
                >
                    <ListItemIcon>
                        <PostAddIcon fontSize="medium" />
                    </ListItemIcon>
                    Create Task</MenuItem>
                <MenuItem
                    onClick={(event) => handleCloseDocumentPublish(event, data)}
                >
                    <ListItemIcon>
                        <CloudUploadIcon fontSize="medium" />
                    </ListItemIcon>
                    Publish
                </MenuItem>

                <MenuItem onClick={(event) => {
                    handleCloseDocument(event, data)
                    handleClickOpenDocumentDetailsList(event, data.data)
                }}>
                    <ListItemIcon>
                        <ArticleIcon fontSize="medium" />
                    </ListItemIcon>
                    Document Details</MenuItem>

                <MenuItem
                    onClick={(event) => handleCloseDocument(event, data)}
                >
                    <ListItemIcon>
                        <CloudUploadIcon fontSize="medium" />
                    </ListItemIcon>
                    Upload New Version</MenuItem>
                <MenuItem
                    onClick={(event) => {
                        // handleEditField(event, data.key);
                        handleEdit(data.key, data.data);
                        handleCloseDocument(event, data);
                    }}
                >
                    <ListItemIcon>
                        <DriveFileRenameOutlineIcon fontSize="medium" />
                    </ListItemIcon>
                    Rename Document</MenuItem>
                <MenuItem
                    onClick={(event) => handleCloseDocumentOpenDocumentBrowers(event, data)}
                >
                    <ListItemIcon>
                        <TravelExploreIcon fontSize="medium" />
                    </ListItemIcon>
                    Open in Browser</MenuItem>
                <MenuItem
                    onClick={(event) => handleCloseDocumentDownload(event, data)}
                >
                    <ListItemIcon>
                        <CloudDownloadIcon fontSize="medium" />
                    </ListItemIcon>
                    Download</MenuItem>
            </Menu>
        </>
    )
}

export default DocumentTripleDot
