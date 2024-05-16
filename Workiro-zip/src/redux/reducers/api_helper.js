import CommanCLS from "../../services/CommanService";
import dateForMyTask from "../../utils/dateForMyTask";
import { formateDate } from "../../utils/fomatDateForConnectionsContacts";
import { toast } from 'react-toastify';
import {
    fetchAllTasks,
    fetchRecentDocuments,
    fetchRecentTasks,
    setAllFoldersFromRedux,
    setClientFromRedux,
    setContactsFromRedux,
    setSearchDocByIdFromRedux,
    setSectionListFromRedux,
    setClientListByFolderIdFromRedux,
    setAllTaskFromRedux,
    setExplorerSearchDocRedux,
    setCateGoryApi,
    setAdvanceSearchResultFromRedux,
    setSectionDataInredux,
    setFoldersInRedux
} from "./counterSlice";

const agrno = localStorage.getItem("agrno");
const password = localStorage.getItem("Password");
const Email = localStorage.getItem("Email");
const FolderId = localStorage.getItem("FolderId");
const UserId = localStorage.getItem("UserId");

const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
let ClsSms = new CommanCLS(baseUrl, agrno, Email, password);
const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
let Cls = new CommanCLS(baseUrlPractice, agrno, Email, password);


export const fetchRecentTasksRedux = () => dispatch => {
    try {
        ClsSms.Json_getRecentTaskList((sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    let tbl = json.Table;
                    //   console.log("Json_getRecentTaskList", tbl);
                    if (tbl.length > 0) {
                        dispatch(fetchRecentTasks(tbl));
                        return tbl;
                    }
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_CRM_GetOutlookTask", err);
    }
};

export const fetchAllTasksRedux = (target) => dispatch => {
    try {
        Cls.Json_CRM_GetOutlookTask_ForTask((sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    if (json.Table.length > 0) {
                        const fltTask = json.Table.filter(itm => itm.AssignedToID.split(",").includes(UserId) && ["Portal", "CRM"].includes(itm.Source));
                        if (target === "Todo") {
                            const formattedTasks = fltTask.map((task) => {
                                return dateForMyTask(task);
                            });
                            formattedTasks.sort((a, b) => b.CreationDate - a.CreationDate);
                            dispatch(fetchAllTasks(formattedTasks));
                            dispatch(setAllTaskFromRedux({ data: formattedTasks, taskFilter: { mstatus: ["Not Started", "On Hold", "In Progress"] } }))
                            return;
                        } else if (target === "MyTask") {
                            const formattedTasks = fltTask.map((task) => {
                                return dateForMyTask(task);
                            });
                            formattedTasks.sort((a, b) => b.CreationDate - a.CreationDate);

                            dispatch(fetchAllTasks(formattedTasks));
                            return;
                        } else {
                            const formattedTasks = fltTask.map((task) => {
                                return dateForMyTask(task);
                            });
                            formattedTasks.sort((a, b) => b.CreationDate - a.CreationDate);

                            dispatch(fetchAllTasks(formattedTasks));
                            return;
                        }
                    }
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_CRM_GetOutlookTask", err);
    }
};

export const fetchRecentDocumentsRedux = () => dispatch => {
    try {
        ClsSms.Json_getRecentDocumentList((sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    let tbl = json.Table;
                    if (tbl.length > 0) {
                        const mapMethod = tbl.map(el => {
                            let date = "";
                            if (el["RecentDate"]) {
                                const dateString = el["RecentDate"].slice(6, -2); // Extract the date part
                                const timestamp = parseInt(dateString); // Convert to timestamp
                                if (!isNaN(timestamp)) {
                                    date = new Date(timestamp); // Create Date object using timestamp
                                } else {
                                    console.error("Invalid timestamp:", dateString);
                                }
                            } else {
                                date = el["RecentDate"];
                            }
                            return { ...el, ["RecentDate"]: date, ["Registration No."]: el.ItemId, ["Description"]: el.Subject, ["Type"]: el.type };
                        });
                        dispatch(fetchRecentDocuments(mapMethod));
                    }
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_getRecentDocumentList", err);
    }
};

const Json_GetSupplierListByProject = (folder_id = "", favouriteClients = []) => dispatch => {
    let obj = {
        agrno: agrno,
        Email: Email,
        password: password,
        ProjectId: folder_id ? folder_id : FolderId
    };
    try {
        Cls.Json_GetSupplierListByProject(obj, (sts, data) => {
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
                    dispatch(setClientFromRedux(dtaa));
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_GetSupplierListByProject", err);
    }
}

export const fetchSupplierListOrderByFavourite = (folder_id) => dispatch => {
    let obj = {
        agrno: agrno,
        Email: Email,
        password: password
    };
    try {
        ClsSms.Json_GetToFavourites(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    dispatch(Json_GetSupplierListByProject(folder_id, json.Table));
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_GetToFavourites", err);
    }
}

export const fetchContactListByFolderRedux = (folder_id) => dispatch => {
    let obj = {
        agrno: agrno,
        Email: Email,
        password: password,
        intFolderId: folder_id ? folder_id : FolderId
    };
    try {
        Cls.Json_GetContactListByFolder(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    if (json.Table.length > 0) {
                        dispatch(setContactsFromRedux(json.Table));
                    }
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_GetContactListByFolder", err);
    }
}

export const getFolders_Redux = () => dispatch => {
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
                    if (json.Table.length > 0) dispatch(setAllFoldersFromRedux(json.Table));
                    //console.log("document view modal33",json)
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_GetFolders", err);
    }
}
////////////////DocuSoft
export const Json_SearchDocById_Redux = (ItemId) => dispatch => {
    let obj = {
        ItemId: ItemId
    };
    try {
        ClsSms.Json_SearchDocById(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    if (json[""].length > 0) dispatch(setSearchDocByIdFromRedux(json[""]));
                    //console.log("document view modal33",json)
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_SearchDocById", err);
    }
}

export const Json_GetSections_Redux = (pid) => dispatch => {
    try {
        let o = { ProjectId: pid }
        ClsSms.Json_GetSections(o, function (sts, data) {
            if (sts) {
                if (data) {
                    let js = JSON.parse(data);
                    //  let sectionList = js.Table;
                    // console.log("Json_GetSections", sectionList)
                    if (js.Table.length > 0) dispatch(setSectionListFromRedux(js.Table));
                }

            }
        })
    } catch (error) {
        console.log("Error while calling Json_GetSections", error);
    }

}

export const Json_GetSupplierListByProject_Redux = (folder_id = "") => dispatch => {
    let obj = {
        ProjectId: folder_id ? folder_id : FolderId
    };
    try {
        Cls.Json_GetSupplierListByProject(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    const clients_data = json?.Table;
                    if (clients_data.length > 0) dispatch(setClientListByFolderIdFromRedux(clients_data));

                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_GetSupplierListByProject", err);
    }
}

export const addSupplierActivityFromRedux = (e) => dispatch => {
    let obj = {};
    obj.OriginatorNo = e.ClientNo;
    obj.ActionReminder = "";
    obj.Notes = "Completed by " + e["Forwarded By"];
    obj.Status = "sys"; //selectedTask.Status;
    obj.TaskId = e.ID;
    obj.TaskName = "";
    obj.ActivityLevelID = "";
    obj.ItemId = "";

    try {
        ClsSms.Json_AddSupplierActivity(obj, function (sts, data) {
            if (sts && data) {
                // console.log({ status: true, messages: "Success", res: data });
                // Json_CRM_GetOutlookTask()
            }
        });
    } catch (error) {
        console.log({ status: false, messages: "Faild Please Try again" });
    }
}

export const updateTaskFieldFromRedux = (FieldName, FieldValue, e) => dispatch => {
    let o = {
        agrno: agrno,
        strEmail: Email,
        password: password,
        TaskId: e.ID,
        FieldName: FieldName,
        FieldValue: FieldValue
    }

    ClsSms.Json_UpdateTaskField(o, function (sts, data) {
        if (sts && data) {
            if (data === "Success") {
                toast.success(FieldName === "EndDateTime" ? "Due Date Changed" : "Completed")
                dispatch(fetchAllTasksRedux("Todo"));
                dispatch(addSupplierActivityFromRedux(e));
            }
            // console.log("Json_UpdateTaskField", data)
        }
    })
}

export const Json_ExplorerSearchDoc_Redux = (obj) => dispatch => {
    try {
        ClsSms.Json_ExplorerSearchDoc(obj, function (sts, data) {
            
            // if (data === "" || JSON.parse(data)?.Table[0]?.Message) {  // for data loading issue (api response issue)
            //     Json_ExplorerSearchDoc_Redux(obj);
            //     return;
            // }else 
            // if(JSON.parse(data)?.Table6[0]?.Message){
            //     console.log("sdfjjkhreefs executed");
            //     Json_ExplorerSearchDoc_Redux(obj);
            // }
            if (sts && data) {
                let json = JSON.parse(data);
                // console.log("ExplorerSearchDoc", json);
                let tbl6 = json.Table6;
                if (tbl6 && tbl6.length > 0) {
                    tbl6.map((itm) => itm["Item Date"] = formatDate(itm["Item Date"]));
                    tbl6.map((itm) => itm["Received Date"] = formatDate(itm["Received Date"]));
                    if (tbl6.length > 0) dispatch(setExplorerSearchDocRedux(tbl6));
                }else{
                    dispatch(setExplorerSearchDocRedux([]));
                }
            }
        })
    } catch (error) {
        console.log("Network Error Json_ExplorerSearchDoc", error)
    }
}


export const GetCategory_Redux = (o) => dispatch => {
    try {

        ClsSms.Json_GetCategory(o, function (sts, data) {
            console.log("Json_GetCategory22", data);
            if (sts && data) {
                let js = JSON.parse(data);
                if (js) dispatch(setCateGoryApi(js))
            }

        })
    } catch (error) {
        console.log("Network Error Json_GetCategory", error)
    }
}



function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0, so add 1 to get the correct month
    const year = date.getFullYear();
    const paddedDay = day < 10 ? `0${day}` : day;
    const paddedMonth = month < 10 ? `0${month}` : month;
    return `${paddedDay}/${paddedMonth}/${year}`;
}


export const Json_AdvanceSearchDocFromRedux = (f_id, description) => dispatch => {
    if (description !== "") {
        let obj = {
            ClientId: "",
            Description: description ? description : "",
            Email: Email,
            IsUDF: "F",
            ItemFDate: "01/01/1900",
            ItemTDate: "01/01/1900",
            ItemrecFDate: "01/01/1900",
            ItemrecTDate: "01/01/1900",
            ProjectId: f_id ? f_id : FolderId,
            agrno: agrno,
            password: password,
            sectionId: "-1",
            udflist: [],
            udfvalueList: []
        };
        try {
            ClsSms.Json_AdvanceSearchDoc(obj, (sts, data) => {
                if (sts) {
                    if (data) {
                        let json = JSON.parse(data);
                        if (json.Table6.length > 0) {
                            let fltDouble = [];
                            json.Table6.map((itm) => itm.Description).filter(item => {
                                if (!fltDouble.includes(item)) {
                                    fltDouble.push(item);
                                }
                            });
                            json.Table6.map(itm => {
                                itm["Item Date"] = formatDate(itm["Item Date"]);
                                itm["Received Date"] = formatDate(itm["Received Date"]);
                                itm["CommentDate"] = Cls.DateForMate(itm["CommentDate"]);
                            });
                            dispatch(setAdvanceSearchResultFromRedux({ docs: json.Table6, descriptions: fltDouble }))
                            // setDocumentsDescription(fltDouble);
                            // setMyDocuments(json.Table6);
                        }
                    }
                }
            });
        } catch (err) {
            console.log("Error while calling Json_AdvanceSearchDoc", err);
        }
    }
}

export const fetchAllSection = (folder_id, section_id) => dispatch => {
    let obj = {
        ClientId: "", Email: Email, ProjectId: folder_id ? folder_id : FolderId, SectionId: section_id ? section_id : "-1", agrno: agrno, password: password
    };
    try {
        Cls.Json_GetFolderData(obj, function (sts, data) {
            if (sts && data) {
                let res = JSON.parse(data);
                if (res.Table) {;
                    let uniqueSecIDs = {};
                    const filteredArray = res.Table.filter(item => {
                        if (!uniqueSecIDs[item.SecID]) {
                            uniqueSecIDs[item.SecID] = true;
                            return true;
                        }
                        return false;
                    });
                    dispatch(setSectionDataInredux(filteredArray));
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_GetFolderData", err);
    }
}

export const fetchFolders=()=>dispatch=>{
    let obj = {
        agrno: agrno,
        Email: Email,
        password: password
    }
    try {
        Cls.Json_GetFolders(obj, function (sts, data) {
            if (sts) {
                if (data) {
                    let js = JSON.parse(data);
                    let tbl = js.Table;
                    dispatch(setFoldersInRedux(tbl));
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_GetFolders", err);
    }
}


////////////////End DocuSoft 
