import CommanCLS from "../../services/CommanService";
import dateForMyTask from "../../utils/dateForMyTask";
import { formateDate } from "../../utils/fomatDateForConnectionsContacts";
import { fetchAllTasks,
     fetchRecentDocuments, 
     fetchRecentTasks,
      setAllFoldersFromRedux, 
      setClientFromRedux,
       setContactsFromRedux,
       setSearchDocByIdFromRedux,
       setSectionListFromRedux,
       setClientListByFolderIdFromRedux,
       setAllTaskFromRedux
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
                            console.log("formattedTasks11",formattedTasks)
                            dispatch(fetchAllTasks(formattedTasks));
                            dispatch(setAllTaskFromRedux({data:formattedTasks, taskFilter: { mstatus: ["Not Started", "On Hold", "In Progress"] } }))
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
                    console.log("Json_getRecentDocumentList", tbl);
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

export const Json_GetSections_Redux = (pid) => dispatch=> {
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
                    if(clients_data.length>0)dispatch(setClientListByFolderIdFromRedux(clients_data));
                   
                }
            }
        });
    } catch (err) {
        console.log("Error while calling Json_GetSupplierListByProject", err);
    }
}

////////////////End DocuSoft 
