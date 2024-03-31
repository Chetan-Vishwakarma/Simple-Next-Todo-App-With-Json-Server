import React, { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, Link, Chip, Stack, ListItemIcon, Radio, useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import DocumentsVewModal from "../client/utils/DocumentsVewModal";
import Activity from "../client/utils/Activity";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
    DataGridTypes,
    Selection,
    Scrolling,
    RemoteOperations,
    Sorting
} from 'devextreme-react/data-grid';
import DataNotFound from "./DataNotFound";


// sadik code start
function createData(document, details) {
    return { document, details };
}
const rows = [
    createData('Folder', 'Client'),
    createData('Client', '212121Test'),
    createData('Section', '01. General Correspondence'),
    createData('Received Date', '02/03/2024'),
    createData('Doc. Date', '02/03/2024'),
    createData('Description', 'General Letter'),
    createData('Notes', 'Yes'),
    createData('Category', '1. Received'),
    createData('DocDirection', 'Incoming'),
    createData('ItemId', 998301),
    createData('Tax Year', '18/19'),
    createData('Financial Year', '2020'),
    createData('From Email', 'test@gmail.com'),
    createData('to Email', 'test@gmail.com'),
    createData('CC', 'test@gmail.com')
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// sadik code end

function DocumentDetails({ groupByFilterResult, isGroupBy, documents, advFilteredResult, dataNotFoundBoolean, selectedGroup }) {

    // sadik js start
    console.log("Selected Document", documents)

    const [openPDFView, setOpenPDFView] = React.useState(false);

    const [selectedDocument, setSelectedDocument] = React.useState(null);
    const handleClickOpenPDFView = (event, data) => {
        event.preventDefault();
        event.stopPropagation();
        setSelectedDocument(data);
        setOpenPDFView(true);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // const handleClose = () => {
    //     // setAnchorEl(null);
    //     setOpen(false)
    // };


    // document details modal
    const [documentLis, setOpenDocumentList] = React.useState(false);
    const handleClickOpen = () => {
        setOpenDocumentList(true);
    };
    const handleCloseDocumentList = () => {
        setOpenDocumentList(false);
    };

    // details dropdown
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState({});
    const DocumentList = (index) => Boolean(anchorElDocumentList[index]);
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


    // Document details List
    const [openDocumentDetailsList, setOpenDocumentDetailsList] = React.useState(false);
    const handleClickOpenDocumentDetailsList = (event) => {
        event.stopPropagation();
        setOpenDocumentDetailsList(true);
    };
    const handleCloseDocumentDetailsList = (event) => {
        event.stopPropagation();
        setOpenDocumentDetailsList(false);
    };

    // accordian
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // end
    const customSortingMethod = (a, b) => {
        console.log("dffdsf", a, b);
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
    };


    return (
        <>


            <Box>

                <DocumentsVewModal openPDFView={openPDFView} setOpenPDFView={setOpenPDFView} selectedDocument={selectedDocument}></DocumentsVewModal>
                {/* <Box className='d-flex mb-3 mt-2'>
                    {/* <FormControlLabel control={<Checkbox />} className="p-0 m-0 ms-2 ps-1" size="small"/> 

                    <Checkbox {...label} defaultChecked size="small" />

                    <Button className="btn-blue-2 ms-2 py-1" size="small" variant="outlined"> Delete</Button>

                </Box> */}

                {dataNotFoundBoolean ? <DataNotFound /> : <DataGrid
                    dataSource={dataNotFoundBoolean ? [] : advFilteredResult.length > 0 ? advFilteredResult : documents}
                    keyExpr="Guid"
                    allowColumnReordering={true}
                    rowAlternationEnabled={true}
                    showBorders={true}
                    width="100%"
                    wordWrapEnabled={true}
                    className="table-view-files"
                >
                    <Grouping autoExpandAll={false} />
                    <GroupPanel visible={true} />
                    <Sorting mode="single" />
                    <Scrolling mode="virtual" />
                    <Selection mode="multiple" />
                    {selectedGroup === "Type" && <Column dataField="Type" groupIndex={0} dataType="Type" width={75} />}
                    {selectedGroup === "Comments" && <Column dataField="Comments" groupIndex={0} dataType="Comments" width={75} visible={false} />}
                    {selectedGroup === "Description" && <Column dataField="Description" groupIndex={0} dataType="Description" width={75} visible={false} />}
                    {selectedGroup === "CommentBy" && <Column dataField="CommentBy" groupIndex={0} dataType="CommentBy" width={75} visible={false} />}
                    <Column
                        dataField="Description"
                        caption="Description"

                        // Set the groupIndex to 0 to enable grouping by this column
                        dataType="string"  // Set the data type to "string" for proper grouping
                        cellRender={(data) => {
                            return <Box className="file-uploads">
                                <label className="file-uploads-label file-uploads-document" onClick={(event) => handleClickOpenPDFView(event, data.data)}>
                                    <Box className="d-flex align-items-center">

                                        {/* <Checkbox {...label} onClick={(event)=>event.stopPropagation()} className="hover-checkbox p-0 ms-0" size="small" />  */}

                                        <DescriptionIcon
                                            sx={{
                                                fontSize: 32,
                                            }}
                                            className='me-2 ms-0'
                                        />
                                        <Box className="upload-content pe-3">
                                            <Typography variant="h4" >
                                                {data.data.Description ? data.data.Description : "Demo"}
                                            </Typography>
                                            <Typography variant="body1">
                                                {/* Size:  <span className='sembold'>{data.data["FileSize"] ? data.data["FileSize"] : ""}</span>  */}
                                                Date <span className='sembold'>{data.data["Item Date"] ? data.data["Item Date"] : ""}</span> |
                                                Uploaded by <span className='sembold'>Patrick</span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Button
                                            id={`basic-button-${data.key}`}
                                            aria-controls={anchorElDocumentList[data.key] ? `basic-menu-${data.key}` : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={Boolean(anchorElDocumentList[data.key])}
                                            onClick={(event) => handleClickDocumentList(event, data)}
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
                                            <MenuItem onClick={(event) => {
                                                handleCloseDocument(event, data)
                                                handleClickOpenDocumentDetailsList(event)
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
                                                onClick={(event) => handleCloseDocument(event, data)}
                                            >
                                                <ListItemIcon>
                                                    <DriveFileRenameOutlineIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Rename Document</MenuItem>
                                            <MenuItem
                                                onClick={(event) => handleCloseDocument(event, data)}
                                            >
                                                <ListItemIcon>
                                                    <TravelExploreIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Open in Browser</MenuItem>
                                            <MenuItem
                                                onClick={(event) => handleCloseDocument(event, data)}
                                            >
                                                <ListItemIcon>
                                                    <CloudDownloadIcon fontSize="medium" />
                                                </ListItemIcon>
                                                Download</MenuItem>
                                        </Menu>
                                    </Box>
                                </label>
                            </Box>
                        }}
                    />
                </DataGrid>}


                {/* {!isGroupBy&&advFilteredResult.length>0 ? (advFilteredResult.map((item) => {
                    return <>
                        <Box className="file-uploads">
                            <label className="file-uploads-label file-uploads-document" onClick={() => handleClickOpenPDFView(item)}>
                                <Box className="d-flex align-items-center">

                                    <Checkbox {...label} onClick={(event)=>event.stopPropagation()} className="hover-checkbox p-0 ms-0" size="small" />

                                    <DescriptionIcon
                                        sx={{
                                            fontSize: 32,
                                        }}
                                        className='me-2 ms-0'
                                    />
                                    <Box className="upload-content pe-3">
                                        <Typography variant="h4" >
                                        {item.Description ? item.Description : "Demo"}
                                        </Typography>
                                        <Typography variant="body1">
                                            Size:  <span className='sembold'>{item["FileSize"] ? item["FileSize"] : ""}</span> | Date <span className='sembold'>{item["Item Date"] ? item["Item Date"] : ""}</span>
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button
                                        id="basic-button"
                                        aria-controls={DocumentList ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={DocumentList ? 'true' : undefined}
                                        onClick={handleClickDocumentList}
                                        className='min-width-auto'
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    {/* <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElDocumentList}
                                        open={DocumentList}
                                        onClose={handleCloseDocument}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={() => {
                                            handleCloseDocument()
                                            handleClickOpenDocumentDetailsList()
                                        }}>
                                            <ListItemIcon>
                                                <ArticleIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Document Details</MenuItem>

                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Upload New Version</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Rename Document</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <TravelExploreIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Open in Browser</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudDownloadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Download</MenuItem>
                                    </Menu> }
                                </Box>
                            </label>
                        </Box>
                        {/* file upload end }
                    </>
                })):isGroupBy?(
                    <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                >
                    {Object.entries(groupByFilterResult).length>0 && Object.keys(groupByFilterResult).map((key)=>{
                        return <TreeItem key={key} nodeId={key} label={key!==""?key:"Demo"}>
                        {groupByFilterResult[key].map((item, index) => (
                        //   <TreeItem key={index} nodeId={`${key}-${index}`} label={item["Description"]}>
                            <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">

                                                <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" />

                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2 ms-0'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        {item["Description"]!=="" ? item["Description"]: "Demo"}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Size:  <span className='sembold'>{item["FileSize"]!==""?item["FileSize"]:""}</span> | Date <span className='sembold'>{item["Item Date"]!==""?item["Item Date"]:""}</span>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={DocumentList ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={DocumentList ? 'true' : undefined}
                                                    onClick={handleClickDocumentList}
                                                    className='min-width-auto'
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorElDocumentList}
                                                    open={DocumentList}
                                                    onClose={handleCloseDocument}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                    className='custom-dropdown'
                                                >
                                                    <MenuItem onClick={() => {
                                                        handleCloseDocument()
                                                        handleClickOpenDocumentDetailsList()
                                                    }}>
                                                        <ListItemIcon>
                                                            <ArticleIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Document Details</MenuItem>

                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudUploadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Upload New Version</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <DriveFileRenameOutlineIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Rename Document</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <TravelExploreIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Open in Browser</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudDownloadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Download</MenuItem>
                                                </Menu>
                                            </Box>
                                        </label>
                                    </Box>
                        //   </TreeItem>
                        ))}
                      </TreeItem>
                    })}
                    {/* <TreeItem nodeId="1" label="Applications">
                        <TreeItem nodeId="2" label="CLient Group A" />
                        <TreeItem nodeId="3" label="CLient Group B" />
                        <TreeItem nodeId="4" label="CLient Group C" />
                    </TreeItem> */}

                {/* <TreeItem nodeId="5" label="Documents">
                        <TreeItem nodeId="6" label="CLient Group">

                            {Array(4).fill("").map(() => {
                                return <>
                                    <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">

                                                <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" />

                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2 ms-0'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        thisisTest.pdf iu
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={DocumentList ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={DocumentList ? 'true' : undefined}
                                                    onClick={handleClickDocumentList}
                                                    className='min-width-auto'
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorElDocumentList}
                                                    open={DocumentList}
                                                    onClose={handleCloseDocument}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                    className='custom-dropdown'
                                                >
                                                    <MenuItem onClick={() => {
                                                        handleCloseDocument()
                                                        handleClickOpenDocumentDetailsList()
                                                    }}>
                                                        <ListItemIcon>
                                                            <ArticleIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Document Details</MenuItem>

                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudUploadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Upload New Version</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <DriveFileRenameOutlineIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Rename Document</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <TravelExploreIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Open in Browser</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudDownloadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Download</MenuItem>
                                                </Menu>
                                            </Box>
                                        </label>
                                    </Box>
                                    {/* file upload end 
                                </>
                            })}

                        </TreeItem>
                    </TreeItem> }
                </TreeView> 
                ):(documents.length>0 && documents.map((item) => {
                    return <>
                        <Box className="file-uploads">
                            <label className="file-uploads-label file-uploads-document" onClick={() => handleClickOpenPDFView(item)}>
                                <Box className="d-flex align-items-center">

                                    <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" />

                                    <DescriptionIcon
                                        sx={{
                                            fontSize: 32,
                                        }}
                                        className='me-2 ms-0'
                                    />
                                    <Box className="upload-content pe-3">
                                        <Typography variant="h4" >
                                        {item.Description ? item.Description : "Demo"}
                                        </Typography>
                                        <Typography variant="body1">
                                            Size:  <span className='sembold'>{item["FileSize"] ? item["FileSize"] : ""}</span> | Date <span className='sembold'>{item["Item Date"] ? item["Item Date"] : "Demo"}</span>
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button
                                        id="basic-button"
                                        aria-controls={DocumentList ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={DocumentList ? 'true' : undefined}
                                        onClick={handleClickDocumentList}
                                        className='min-width-auto'
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElDocumentList}
                                        open={DocumentList}
                                        onClose={handleCloseDocument}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        className='custom-dropdown'
                                    >
                                        <MenuItem onClick={() => {
                                            handleCloseDocument()
                                            handleClickOpenDocumentDetailsList()
                                        }}>
                                            <ListItemIcon>
                                                <ArticleIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Document Details</MenuItem>

                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudUploadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Upload New Version</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <DriveFileRenameOutlineIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Rename Document</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <TravelExploreIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Open in Browser</MenuItem>
                                        <MenuItem onClick={handleCloseDocument}>
                                            <ListItemIcon>
                                                <CloudDownloadIcon fontSize="medium" />
                                            </ListItemIcon>
                                            Download</MenuItem>
                                    </Menu>
                                </Box>
                            </label>
                        </Box>
                        {/* file upload end }
                    </>
                }))} */}






                {/* loop end */}


                {/* when data is grouped by */}
                {/* <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                >
                    <TreeItem nodeId="1" label="Applications">
                        <TreeItem nodeId="2" label="CLient Group A" />
                        <TreeItem nodeId="3" label="CLient Group B" />
                        <TreeItem nodeId="4" label="CLient Group C" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                        <TreeItem nodeId="6" label="CLient Group">

                            {Array(4).fill("").map(() => {
                                return <>
                                    <Box className="file-uploads">
                                        <label className="file-uploads-label file-uploads-document">
                                            <Box className="d-flex align-items-center">

                                                <Checkbox {...label} className="hover-checkbox p-0 ms-0" size="small" />

                                                <DescriptionIcon
                                                    sx={{
                                                        fontSize: 32,
                                                    }}
                                                    className='me-2 ms-0'
                                                />
                                                <Box className="upload-content pe-3">
                                                    <Typography variant="h4" >
                                                        thisisTest.pdf iu
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={DocumentList ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={DocumentList ? 'true' : undefined}
                                                    onClick={handleClickDocumentList}
                                                    className='min-width-auto'
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorElDocumentList}
                                                    open={DocumentList}
                                                    onClose={handleCloseDocument}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                    className='custom-dropdown'
                                                >
                                                    <MenuItem onClick={() => {
                                                        handleCloseDocument()
                                                        handleClickOpenDocumentDetailsList()
                                                    }}>
                                                        <ListItemIcon>
                                                            <ArticleIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Document Details</MenuItem>

                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudUploadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Upload New Version</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <DriveFileRenameOutlineIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Rename Document</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <TravelExploreIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Open in Browser</MenuItem>
                                                    <MenuItem onClick={handleCloseDocument}>
                                                        <ListItemIcon>
                                                            <CloudDownloadIcon fontSize="medium" />
                                                        </ListItemIcon>
                                                        Download</MenuItem>
                                                </Menu>
                                            </Box>
                                        </label>
                                    </Box>
                                    {/* file upload end 
                                </>
                            })}

                        </TreeItem>
                    </TreeItem>
                </TreeView> */}
            </Box >



            {/* sadik new modal start  */}
            {/* // document list modal */}

            <Dialog
                open={documentLis}
                onClose={handleCloseDocumentList}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'

                sx={{
                    maxWidth: 640,
                    margin: '0 auto'
                }}
            >
                {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="dropdown-box">
                                <Typography variant="h4" className='font-18 bold mb-2 text-black'>
                                    Document List
                                </Typography>
                                {/* <Box className="btn-Select">
                                    <Button className='btn-white'>Action</Button>
                                    <Button className='btn-white'>Ser</Button>
                                    <Button className='btn-white'>Custom</Button>

                                    <hr />

                                    <Button className='btn-blue-2' size="small">Apply Now</Button>
                                </Box> */}
                            </Box>

                            {/*  */}
                            <Button onClick={handleCloseDocumentList} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>


                        {Array(5).fill("").map(() => {
                            return <>
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
                                                    thisisTest.pdf
                                                </Typography>
                                                <Typography variant="body1">
                                                    Size:  <span className='sembold'>10MB</span> | Uploaded by <span className='sembold'>Patrick</span>
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Button
                                                id="basic-button"
                                                aria-controls={DocumentList ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={DocumentList ? 'true' : undefined}
                                                onClick={handleClickDocumentList}
                                                className='min-width-auto'
                                            >
                                                <MoreVertIcon />
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorElDocumentList}
                                                open={DocumentList}
                                                onClose={handleCloseDocument}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                                className='custom-dropdown'
                                            >
                                                <MenuItem onClick={() => {
                                                    handleCloseDocument()
                                                    handleClickOpenDocumentDetailsList()
                                                }}>
                                                    <ListItemIcon>
                                                        <ArticleIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Document Details</MenuItem>

                                                <MenuItem onClick={handleCloseDocument}>
                                                    <ListItemIcon>
                                                        <CloudUploadIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Upload New Version</MenuItem>
                                                <MenuItem onClick={handleCloseDocument}>
                                                    <ListItemIcon>
                                                        <DriveFileRenameOutlineIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Rename Document</MenuItem>
                                                <MenuItem onClick={handleCloseDocument}>
                                                    <ListItemIcon>
                                                        <TravelExploreIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Open in Browser</MenuItem>
                                                <MenuItem onClick={handleCloseDocument}>
                                                    <ListItemIcon>
                                                        <CloudDownloadIcon fontSize="medium" />
                                                    </ListItemIcon>
                                                    Download</MenuItem>
                                            </Menu>
                                        </Box>
                                    </label>
                                </Box>
                                {/* file upload end */}
                            </>
                        })}

                    </DialogContentText>
                </DialogContent>
            </Dialog>


            {/* document modal list details */}
            <Dialog
                open={openDocumentDetailsList}
                onClose={(event) => handleCloseDocumentDetailsList(event)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
                sx={{
                    maxWidth: 640,
                    margin: '0 auto'
                }}
            >
                <DialogContent>
                    <DialogContentText>

                        <Box className="d-flex align-items-center justify-content-between">
                            <Box className="dropdown-box">
                                <Typography variant="h4" className='font-18 bold mb-0 text-black'>
                                    Document Details
                                </Typography>
                            </Box>

                            {/*  */}
                            <Button onClick={(event) => handleCloseDocumentDetailsList(event)} autoFocus sx={{ minWidth: 30 }}>
                                <span className="material-symbols-outlined text-black">
                                    cancel
                                </span>
                            </Button>
                        </Box>

                        <hr />

                        <Box className='main-accordian main-accordian-single-row'>
                            <Accordion className='accordian-box' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Document Details
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: '100%' }} aria-label="simple table" size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className='bold'>Document</TableCell>
                                                    <TableCell className='bold' align="right">Details</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="left" className='bold'>{row.document}</TableCell>
                                                        <TableCell align="left">{row.details}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    Document Versions
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box className='table-responsive'>

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
                                                            This File is Test Files.pdf 2
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            12:36PM 28/12/2023 | File uploaded by Patrick
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </label>
                                        </Box>
                                        {/* file upload end */}

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
                                                            test doc file.doc
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            11:16PM 09/012/2024 | File uploaded by Patrick
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </label>
                                        </Box>
                                        {/* file upload end */}

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
                                                            loremipsomedolorsite.pdf
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            02:36PM 06/05/2023 | File uploaded by Patrick
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </label>
                                        </Box>
                                        {/* file upload end */}

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
                                                            This File is Test Files.pdf
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            02:36PM 06/05/2023 | File uploaded by Patrick
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </label>
                                        </Box>
                                        {/* file upload end */}


                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            {/* end */}



                            <Accordion className='accordian-box' expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    Attached To
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box className='mt-3'>

                                        {Array(5).fill("").map(() => {
                                            return <>
                                                <Link href="#" className="text-decoration-none d-inline-flex align-content-center me-3 mb-3 flex"><RadioButtonUncheckedIcon className="me-1" />Contact agreement</Link>
                                            </>
                                        })}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='accordian-box' expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4-content"
                                    id="panel4-header"
                                >
                                    Activity
                                </AccordionSummary>
                                <AccordionDetails>

                                    <Activity></Activity>


                                    {/* {Array(5).fill("").map(() => {
                                        return <> */}
                                    {/* <Box className='mb-3'>
                                                <Typography variant="body1" className="text-black sembold font-16">
                                                    New version uploaded
                                                </Typography>

                                                <Typography variant="body1" className="font-12 sembold text-gray">
                                                    02:36PM 06/05/2023 | by Me
                                                </Typography>

                                            </Box> */}
                                    {/* </>
                                    })} */}
                                </AccordionDetails>
                            </Accordion>

                        </Box>

                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>

    )
}

export default DocumentDetails