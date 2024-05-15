import React, { useState } from "react";
import { Box, Typography } from '@mui/material';
import DocumentsVewModal from "../client/utils/DocumentsVewModal";
import { toast } from 'react-toastify';
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Selection,
    Scrolling,
    Sorting
} from 'devextreme-react/data-grid';
import DataNotFound from "./DataNotFound";
import CommanCLS from "../services/CommanService";
import TaskDetailModal from "./TaskDetailModal";
import { useDispatch } from "react-redux";
import GetFileType from "./FileType";
import DocumentTripleDot from "../utils/DocumentTripleDot";

// sadik code end
const agrno = localStorage.getItem("agrno");
const Email = localStorage.getItem("Email");
const password = localStorage.getItem("Password");
const folderId = localStorage.getItem("FolderId");
const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
//const baseUrlDocuSms = "https://docusms.uk/dsdesktopwebservice.asmx/";

function DocumentDetails({ documents, advFilteredResult, dataNotFoundBoolean, selectedGroup }) {
    const dispatch = useDispatch();
    const Cls = new CommanCLS(baseUrl, agrno, Email, password);
    const ClsPractice = new CommanCLS(baseUrlPractice, agrno, Email, password);

    const [openPDFView, setOpenPDFView] = React.useState(false);
    const [selectedDocument, setSelectedDocument] = React.useState(null);
    const [selectedTask, setSelectedTask] = useState({});
    const [isApi, setIsApi] = useState(false);

    // modal
    const [openModal, setOpen] = React.useState(false);
    const [isLoadingDoc, setIsLoadingDoc] = useState(true);

    const handleClickDetailOpen = () => {
        setOpen(true);
    };

    const handleClickOpenPDFView = (event, data) => {
        //console.log("fjdsfdlsjfljfllj main function");
        // event.preventDefault();
        event.stopPropagation();
        setSelectedDocument(data);
        setOpenPDFView(true);
        setIsLoadingDoc(true);
    };

    // details dropdown
    const [anchorElDocumentList, setAnchorElDocumentList] = React.useState({});

    const handleCloseDocument = (event, rowData) => {
        event.stopPropagation();
        const newAnchorElDocumentList = { ...anchorElDocumentList };
        delete newAnchorElDocumentList[rowData.key];
        setAnchorElDocumentList(newAnchorElDocumentList);
    };

    const [editingIndex, setEditingIndex] = useState(null);
    const [updatedSubject, setUpdatedSubject] = useState('');
    const [test, setTest] = useState({});

    const handleEdit = (index, data) => {
        setEditingIndex(index);
        setUpdatedSubject(data.Description);
    };

    const handleEditChange = (event) => {
        setUpdatedSubject(event.target.value);
    };

    const Json_RenameDocument = (doc, newDesc, index) => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            ItemId: doc["Registration No."] ? doc["Registration No."] : "",
            Description: newDesc,
            FolderId: folderId
        };
        Cls.Json_RenameDocument(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    if (json.Status === "Success") {
                        // Json_getRecentDocumentList();
                        toast.success(json.Message);
                        setEditingIndex(null);
                        setTest({ ...test, [index]: newDesc });
                    } else {
                        toast.error("Unable to rename this document");
                    }
                }
            }
        });
    }

    const handleSave = (newDesc, oldDesc, doc, index) => {
        if (oldDesc === newDesc) return;
        Json_RenameDocument(doc, newDesc, index);
    };

    const Json_CRM_GetOutlookTask = (event, sTask) => {
        event.preventDefault();
        let obj = {
            Email: localStorage.getItem('Email'),
            agrno: localStorage.getItem("agrno"),
            password: localStorage.getItem("Password")
        };
        try {
            Cls.Json_CRM_GetOutlookTask_ForTask((sts, data) => {
                const res = JSON.parse(data);
                if (res.Table) {

                    const fltTask = res.Table.filter(itm => itm.ID === sTask.Taskid);
                    // res.Table.filter(itm =>console.log(`ertiretufjhjfg ${itm.ID}`,itm.ID))
                    // console.log(`ertiretufjhjfg taskID`,sTask.Taskid);
                    const formattedTasks = fltTask.map((task) => {
                        let timestamp, timestamp2;
                        if (task.EndDateTime) {
                            timestamp = parseInt(task.EndDateTime.slice(6, -2));
                        }
                        if (task.CreationDate) {
                            timestamp2 = parseInt(task.CreationDate.slice(6, -2));
                        }

                        const date = new Date(timestamp);
                        const date2 = new Date(timestamp2);

                        return { ...task, EndDateTime: date, CreationDate: date2 };
                    });
                    // console.log("ertiretufjhjfg",formattedTasks);
                    if (formattedTasks.length > 0) {
                        setSelectedTask(formattedTasks[0]);
                        handleClickDetailOpen(formattedTasks[0]);
                    } else if (formattedTasks.length === 0) {
                        toast.error("Unable to open this task due to internal issue");
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_CRM_GetOutlookTask", err);
        }
    }

    return (
        <>
            <Box>

                <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal}></TaskDetailModal>

                <DocumentsVewModal isLoadingDoc={isLoadingDoc} setIsLoadingDoc={setIsLoadingDoc} openPDFView={openPDFView} setOpenPDFView={setOpenPDFView} selectedDocument={selectedDocument} Json_CRM_GetOutlookTask={Json_CRM_GetOutlookTask}></DocumentsVewModal>
                {console.log("slkfjsdljfg",documents)}
                {dataNotFoundBoolean ? <DataNotFound /> : <DataGrid
                    dataSource={advFilteredResult.length > 0 ? advFilteredResult : documents}
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
                            let rd = data.data;
                            return <Box className="file-uploads">
                                <label className="file-uploads-label file-uploads-document" onClick={(event) => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    handleCloseDocument(event, data);
                                }} onDoubleClick={(event) => {
                                    handleClickOpenPDFView(event, data.data);
                                    handleCloseDocument(event, data);
                                }}>
                                    <Box className="d-flex align-items-center">

                                        <GetFileType Type={rd.Type ? rd.Type.toLowerCase() : null}></GetFileType>

                                        <Box className="upload-content pe-3">
                                            {editingIndex === data.data["Registration No."] ? <input
                                                type="text"
                                                defaultValue={data.data.Description}
                                                value={updatedSubject}
                                                onChange={handleEditChange}
                                                autoFocus
                                                onBlur={(e) => handleSave(e.target.value, data.data.Description, data.data, data.key)}
                                                className='edit-input'
                                            /> : <Typography variant="h4" >
                                                {test[data.key] ? test[data.key] : data.data.Description ? data.data.Description : "Demo"}
                                            </Typography>}
                                            <Typography variant="body1">
                                                {/* Size:  <span className='sembold'>{data.data["FileSize"] ? data.data["FileSize"] : ""}</span>  */}
                                                Date <span className='sembold'>{data.data["Item Date"] ? data.data["Item Date"] : ""}</span> |
                                                Uploaded by <span className='sembold'>Patrick</span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <DocumentTripleDot data={data} handleEdit={handleEdit}/>
                                    </Box>
                                </label>
                            </Box>
                        }}
                    />
                </DataGrid>}
            </Box >
        </>

    )
}

export default DocumentDetails