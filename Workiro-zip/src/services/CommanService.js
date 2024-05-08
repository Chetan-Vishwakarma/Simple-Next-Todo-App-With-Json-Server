
import Swal from "sweetalert2";
import AllService from "./AllService";



export default class CommanCLS extends AllService {

    constructor(APIUrl, agrno, Email, password) {
        super(APIUrl, agrno, Email, password);
    }
///////////////////all contact
Json_GetContactListByFolder(obj,callBack) {
    super.CreateNewServiceParamObject("Json_GetContactListByFolder",obj,true);
    super.CallNewService("Json_GetContactListByFolder", function (status, Data) {
        if (status) {
            return callBack(true, Data);
        }
        else {
            return callBack(false, []);
        }
    })
}

 getFileExtension = (fileName) => {
    // Split the file name by the dot (.)
    const parts = fileName.split('.');
    // Return the last part, which is the extension
    return parts[parts.length - 1];
};

getFileName(x){
    let parts = x.split(".");
   return parts[0];
}
///////////////////end all contact
     ConfirmMessage(txt,callBack) {
        Swal.fire({
            // title: "Are you sure you want to delete this item?",
            text: txt,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes !"
        }).then((result) => {
            if (result.isConfirmed) {
              return callBack(true)
            }
            else{
                return callBack(false)
            }

        });
    }

   

    ////////////////////////////////////////Portal Methods
   
    Json_GetVersionByItemId(obj,callBack) {
        try {
            super.CreateNewServiceParamObject("Json_GetVersionByItemId",obj,true);
            super.CallNewService("Json_GetVersionByItemId", function (status, Data) {
                if (status) {
                    return callBack(true, Data);
                }
                else {
                    return callBack(false, []);
                }
            })
        } catch (error) {
            console.log("network error",error)
        }
       
    }
    Json_ExplorerSearchDoc(obj,callBack) {
        super.CreateNewServiceParamObject("Json_ExplorerSearchDoc",obj,true);
        super.CallNewService("Json_ExplorerSearchDoc", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_SearchDocById(obj,callBack) {
        super.CreateNewServiceParamObject("Json_SearchDocById",obj,true);
        super.CallNewService("Json_SearchDocById", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    GetComments_Json(obj,callBack) {
        super.CreateNewServiceParamObject("GetComments_Json",obj,false);
        super.CallNewService("GetComments_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    AddTaskComment_Json(obj,callBack) {
        super.CreateNewServiceParamObject("AddTaskComment_Json",obj,false);
        super.CallNewService("AddTaskComment_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    SendReminder_Json(obj,callBack) {
        super.CreateNewServiceParamObject("SendReminder_Json",obj,false);
        super.CallNewService("SendReminder_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

   

    Json_getRecentDocumentList(callBack) {
        super.CreateNewServiceParamObject("Json_getRecentDocumentList");
        super.CallNewService("Json_getRecentDocumentList", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_getRecentTaskList(callBack) {
        super.CreateNewServiceParamObject("Json_getRecentTaskList");
        super.CallNewService("Json_getRecentTaskList", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_RegisterItem(obj, callBack) {
        super.CreateNewServiceParamObject("Json_RegisterItem", obj, true);
        super.CallNewService("Json_RegisterItem", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    ApprovalStatusChanged_Json(obj, callBack) {
        super.CreateNewServiceParamObject("ApprovalStatusChanged_Json", obj, false);
        super.CallNewService("ApprovalStatusChanged_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    GetSignedAttachment_Json(obj, callBack) {
        super.CreateNewServiceParamObject("GetSignedAttachment_Json", obj, false);
        super.CallNewService("GetSignedAttachment_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    GetMessageViewHistory_Json(obj, callBack) {
        super.CreateNewServiceParamObject("GetMessageViewHistory_Json", obj, false);
        super.CallNewService("GetMessageViewHistory_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    GetAttachment_Json(obj, callBack) {
        super.CreateNewServiceParamObject("GetAttachment_Json", obj, false);
        super.CallNewService("GetAttachment_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    GetDocumentStatus_Json(obj, callBack) {
        super.CreateNewServiceParamObject("GetDocumentStatus_Json", obj, false);
        super.CallNewService("GetDocumentStatus_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    GetCertificate_Json(obj, callBack) {
        super.CreateNewServiceParamObject("GetCertificate_Json", obj, false);
        super.CallNewService("GetCertificate_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    GetMessageHtml_Json(obj, callBack) {
        super.CreateNewServiceParamObject("GetMessageHtml_Json", obj, false);
        super.CallNewService("GetMessageHtml_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    GetMessageAttachments_Json(obj, callBack) {
        super.CreateNewServiceParamObject("GetMessageAttachments_Json", obj, false);
        super.CallNewService("GetMessageAttachments_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    GetMessageDocuments_Json(obj, callBack) {
        super.CreateNewServiceParamObject("GetMessageDocuments_Json", obj, false);
        super.CallNewService("GetMessageDocuments_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    ////////////////////////////////////////End Portal Methods

    UploadPortalTaskRelation_Json(obj, callBack) {
        super.CreateNewServiceParamObject("UploadPortalTaskRelation_Json", obj, false);
        super.CallNewService("UploadPortalTaskRelation_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    DeleteTasksAttachment(obj, callBack) {
        super.CreateNewServiceParamObject("DeleteTasksAttachment", obj, true);
        super.CallNewService("DeleteTasksAttachment", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    DeleteTasksAttachment_useCreateTask(obj, callBack) {
        super.CreateNewServiceParamObject("DeleteTasksAttachment", obj, false);
        super.CallNewService("DeleteTasksAttachment", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_UpdateTaskField(obj, callBack) {
        super.CreateNewServiceParamObject("Json_UpdateTaskField", obj, false);
        super.CallNewService("Json_UpdateTaskField", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_GetTaskAttachmentList(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetTaskAttachmentList", obj, false);
        super.CallNewService("Json_GetTaskAttachmentList", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    FileType(fileName) {
        // for (var i = 0; i < fileName.length; i++) {
        let Typest = fileName.lastIndexOf(".");
        var Type = fileName.slice(Typest + 1);
        var type = Type.toUpperCase();
        return type;
    }
    GetBase64FromFilePath(obj, callBack) {
        super.CreateNewServiceParamObject("GetBase64FromFilePath", obj, true);
        super.CallNewService("GetBase64FromFilePath", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_getAssociatedTaskListByDocumentId(obj, callBack) {
        super.CreateNewServiceParamObject("Json_getAssociatedTaskListByDocumentId", obj, true);
        super.CallNewService("Json_getAssociatedTaskListByDocumentId", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_CRM_TaskDMSAttachmentInsert(obj, callBack) {
        super.CreateNewServiceParamObject("Json_CRM_TaskDMSAttachmentInsert", obj, true);
        super.CallNewService("Json_CRM_TaskDMSAttachmentInsert", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    GetNextDayDate() {
        const currentDate = new Date();
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1); // Increment the day by 1 to get the next day's date

        const day = nextDate.getDate().toString().padStart(2, '0'); // Get the day and pad with 0 if needed
        const month = (nextDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0)
        const year = nextDate.getFullYear(); // Get the full year

        // Construct the date string in "yyyy/mm/dd" format
        const formattedDate = `${year}/${month}/${day}`;
console.log("formattedDate",formattedDate)
        return formattedDate;
    }
    GetCurrentDayDate() {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and pad with 0 if needed
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0)
        const year = currentDate.getFullYear(); // Get the full year

        // Construct the date string in "dd/mm/yyyy" format
        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    }

    DateForMate(jsonDate) {
        // alert(jsonDate);
        if (jsonDate != null && jsonDate !== "") {
            var fullDate = new Date(parseInt(jsonDate.substr(6)));

            var twoDigitMonth = (fullDate.getMonth() + 1) + "";

            if (twoDigitMonth.length === 1) twoDigitMonth = "0" + twoDigitMonth;

            var twoDigitDate = fullDate.getDate() + "";

            if (twoDigitDate.length === 1)

                twoDigitDate = "0" + twoDigitDate;
            var hh = fullDate.getHours();
            var mm = fullDate.getMinutes();
            var ss = fullDate.getSeconds();
            //let fulldate =twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
            //let times =hh + ":" + mm + ":" + ss;
            // return callBack(fulldate,times);

            var currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear() + " " + hh + ":" + mm + ":" + ss;
            return currentDate;
        }
        else {
            return "";
        }

    };


    DateFormateDate(jsonDate) {
        // alert(jsonDate);
        if (jsonDate != null && jsonDate !== "") {
            var fullDate = new Date(parseInt(jsonDate.substr(6)));

            var twoDigitMonth = (fullDate.getMonth() + 1) + "";

            if (twoDigitMonth.length === 1) twoDigitMonth = "0" + twoDigitMonth;

            var twoDigitDate = fullDate.getDate() + "";

            if (twoDigitDate.length === 1)

                twoDigitDate = "0" + twoDigitDate;
           

            var currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear() ;
            return currentDate;
        }
        else {
            return "";
        }

    };

    Json_DeleteAttachment(obj, callBack) {
        super.CreateNewServiceParamObject("Json_DeleteAttachment", obj, true);
        super.CallNewService("Json_DeleteAttachment", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_AddAttachment(obj, callBack) {
        super.CreateNewServiceParamObject("Json_AddAttachment", obj, true);
        super.CallNewService("Json_AddAttachment", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_GetItemStickyNotes(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetItemStickyNotes", obj, true);
        super.CallNewService("Json_GetItemStickyNotes", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_SetItemStickyNotes(obj, callBack) {
        super.CreateNewServiceParamObject("Json_SetItemStickyNotes", obj, true);
        super.CallNewService("Json_SetItemStickyNotes", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_GetAttachmentsByItemId(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetAttachmentsByItemId", obj, true);
        super.CallNewService("Json_GetAttachmentsByItemId", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_DownloadZip(obj, callBack) {
        super.CreateNewServiceParamObject("Json_DownloadZip", obj, true);
        super.CallNewService("Json_DownloadZip", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_GetAudit(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetAudit", obj, true);
        super.CallNewService("Json_GetAudit", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_CheckoutItem(obj, callBack) {
        super.CreateNewServiceParamObject("Json_CheckoutItem", obj, true);
        super.CallNewService("Json_CheckoutItem", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    
    Json_GetCategory(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetCategory", obj, true);
        super.CallNewService("Json_GetCategory", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_GetSubSections(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetSubSections", obj, true);
        super.CallNewService("Json_GetSubSections", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    RemoveFilesForUpload_Json(obj, callBack) {
        super.CreateNewServiceParamObject("RemoveFilesForUpload_Json", obj, false);
        super.CallNewService("RemoveFilesForUpload_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    ConvertToPdf_Json(obj, callBack) {
        super.CreateNewServiceParamObject("ConvertToPdf_Json", obj, false);
        super.CallNewService("ConvertToPdf_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    PrepareDocumentsForPublish_Json(obj, callBack) {
        super.CreateNewServiceParamObject("PrepareDocumentsForPublish_Json", obj, false);
        super.CallNewService("PrepareDocumentsForPublish_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    MessagePublishedPortalTask_Json(obj, callBack) {
        super.CreateNewServiceParamObject("MessagePublishedPortalTask_Json", obj, false);
        super.CallNewService("MessagePublishedPortalTask_Json", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_GetStandardLetterData(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetStandardLetterData", obj, false);
        super.CallNewService("Json_GetStandardLetterData", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_GetHtmlFromRtf(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetHtmlFromRtf", obj, true);
        super.CallNewService("Json_GetHtmlFromRtf", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_GetTemplateData(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetTemplateData", obj, false);
        super.CallNewService("Json_GetTemplateData", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_GetWebTemplatesList(callBack) {
        super.CreateNewServiceParamObject("Json_GetWebTemplates");
        super.CallNewService("Json_GetWebTemplates", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    
    Json_GetClientCardDetails(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetClientCardDetails", obj, false);
        super.CallNewService("Json_GetClientCardDetails", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_Get_CRM_Task_ActivityByTaskId(obj, callBack) {
        super.CreateNewServiceParamObject("Json_Get_CRM_Task_ActivityByTaskId", obj, true);
        super.CallNewService("Json_Get_CRM_Task_ActivityByTaskId", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }


    Json_GetSections(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetSections", obj, true);
        super.CallNewService("Json_GetSections", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    

    Json_GetFolders(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetFolders", obj, false);
        super.CallNewService("Json_GetFolders", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_Get_DS_TaskManager(callBack) {
        super.CreateNewServiceParamObject("Json_Get_DS_TaskManager");
        super.CallNewService("Json_Get_DS_TaskManager", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    

    ListEditableTemplates(obj, callBack) {
        super.CreateNewServiceParamObject("Json_ListEditableTemplates", obj, true);
        super.CallNewService("Json_ListEditableTemplates", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_CRM_GetOutlookTask(obj, callBack) {
        super.CreateNewServiceParamObject("Json_CRM_GetOutlookTask", obj, true);
        super.CallNewService("Json_CRM_GetOutlookTask", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_CRM_GetOutlookTask_ForTask(callBack) {
        super.CreateNewServiceParamObject("Json_CRM_GetOutlookTask");
        super.CallNewService("Json_CRM_GetOutlookTask", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }


    Json_GetItemBase64DataById(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetItemBase64DataById", obj, true);
        super.CallNewService("Json_GetItemBase64DataById", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_AddSupplierActivity(obj, callBack) {
        super.CreateNewServiceParamObject("Json_AddSupplierActivity", obj, true);
        super.CallNewService("Json_AddSupplierActivity", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_GetAllContactsByClientID(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetAllContactsByClientID", obj, true);
        super.CallNewService("Json_GetAllContactsByClientID", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }



    Json_GetToFavourites(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetToFavourites", obj, true);
        super.CallNewService("Json_GetToFavourites", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_AddToFavourite(obj, callBack) {
        super.CreateNewServiceParamObject("Json_AddToFavourite", obj, true);
        super.CallNewService("Json_AddToFavourite", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_RemoveToFavourite(obj, callBack) {
        super.CreateNewServiceParamObject("Json_RemoveToFavourite", obj, true);
        super.CallNewService("Json_RemoveToFavourite", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_GetConfiguration(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetConfiguration", obj, true);
        super.CallNewService("Json_GetConfiguration", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_GetClientsByFolder(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetClientsByFolder", obj, true);
        super.CallNewService("Json_GetClientsByFolder", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_Get_CRM_UserByProjectId(obj, callBack) {
        super.CreateNewServiceParamObject("Json_Get_CRM_UserByProjectId", obj, true);
        super.CallNewService("Json_Get_CRM_UserByProjectId", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    GetInternalUserList(o,callBack) {
        super.CreateNewServiceParamObject("GetInternalUserList",o,false);
        super.CallNewService("GetInternalUserList", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }
    Json_GetForwardUserList(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetForwardUserList", obj, true);
        super.CallNewService("Json_GetForwardUserList", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_GetFolderData(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetFolderData", obj, true);
        super.CallNewService("Json_GetFolderData", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_CRM_Task_Save(obj, callBack) {
        super.CreateNewServiceParamObject("Json_CRM_Task_Save", obj, true);
        super.CallNewService("Json_CRM_Task_Save", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    SaveTaskAttachments(obj, callBack) {
        super.CreateNewServiceParamObject("SaveTaskAttachments", obj, true);
        super.CallNewService("SaveTaskAttachments", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_GetSupplierListByProject(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetSupplierListByProject", obj, true);
        super.CallNewService("Json_GetSupplierListByProject", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_getViewerToken(obj, callBack) {
        super.CreateNewServiceParamObject("Json_getViewerToken", obj, true);
        super.CallNewService("Json_getViewerToken", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_UpdateContactVerify(obj, callBack) {
        super.CreateNewServiceParamObject("Json_UpdateContactVerify", obj, true);
        super.CallNewService("Json_UpdateContactVerify", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_VerifyDrivingLicence(obj, callBack) {
        super.CreateNewServiceParamObject("Json_VerifyDrivingLicence", obj, true);
        super.CallNewService("Json_VerifyDrivingLicence", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_Get_CRM_SavedTask_ByTaskId(obj, callBack) {
        super.CreateNewServiceParamObject("Json_Get_CRM_SavedTask_ByTaskId", obj, true);
        super.CallNewService("Json_Get_CRM_SavedTask_ByTaskId", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    getCurrentDate() {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and pad with 0 if needed
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: January is 0)
        const year = currentDate.getFullYear(); // Get the full year

        // Construct the date string in "dd/mm/yyyy" format
        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    }

    Json_CRM_Task_Update(obj, callBack) {
        super.CreateNewServiceParamObject("Json_CRM_Task_Update", obj, true);
        super.CallNewService("Json_CRM_Task_Update", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }



    Json_GetUserFolderList(obj, callBack) {
        super.CreateNewServiceParamObject("Json_GetUserFolderList", obj, true);
        super.CallNewService("Json_GetUserFolderList", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

     Json_AdvanceSearchDoc(obj,callBack){   
        super.CreateNewServiceParamObject("Json_AdvanceSearchDoc",obj,true);
        super.CallNewService("Json_AdvanceSearchDoc",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
     Json_InsertContact(obj,callBack){   
        super.CreateNewServiceParamObject("Json_InsertContact",obj,true);
        super.CallNewService("Json_InsertContact",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
      
     Json_AddClient(obj,callBack){   
        super.CreateNewServiceParamObject("Json_AddClient",obj,true);
        super.CallNewService("Json_AddClient",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     PortalUserAccountCreated_Json(obj,callBack){   
        super.CreateNewServiceParamObject("PortalUserAccountCreated_Json",obj,false);
        super.CallNewService("PortalUserAccountCreated_Json",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     PortalUserAccountUpdated_Json(obj,callBack){   
        super.CreateNewServiceParamObject("PortalUserAccountUpdated_Json",obj,false);
        super.CallNewService("PortalUserAccountUpdated_Json",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     Json_CRMSaveUDFValues(obj,callBack){   
        super.CreateNewServiceParamObject("Json_CRMSaveUDFValues",obj,true);
        super.CallNewService("Json_CRMSaveUDFValues",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
     AddContact(obj,callBack){   
        super.CreateNewServiceParamObject("Json_AddContact",obj,true);
        super.CallNewService("Json_AddContact",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
     UpdateContact(obj,callBack){   
        super.CreateNewServiceParamObject("Json_UpdateContact",obj,true);
        super.CallNewService("Json_UpdateContact",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
     Json_SetClientAddress(obj,callBack){   
        super.CreateNewServiceParamObject("Json_SetClientAddress",obj,true);
        super.CallNewService("Json_SetClientAddress",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     Json_GetAllContacts(obj,callback) {
        super.CreateNewServiceParamObject("Json_GetAllContacts",obj,true);
        super.CallNewService("Json_GetAllContacts", function (status, Data) {
            if (status) {
                if (Data !=="") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }

    Json_CompanyHouseDetails(obj,callback) {
        super.CreateNewServiceParamObject("Json_CompanyHouseDetails",obj,false);
        super.CallNewService("Json_CompanyHouseDetails", function (status, Data) {
            // console.log("errordataget111111111111111111111",status,Data);
            if (status) {
                if (Data !=="") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }
    
    Json_GetCRMContactUDFValues(obj,callBack){   
        super.CreateNewServiceParamObject("Json_GetCRMContactUDFValues",obj,true);
        super.CallNewService("Json_GetCRMContactUDFValues",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
     
     Json_GetContactNumber(obj,callBack){   
        super.CreateNewServiceParamObject("Json_GetContactNumber",obj,true);
        super.CallNewService("Json_GetContactNumber",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
     Json_UpdateContactField(obj,callBack){   
        super.CreateNewServiceParamObject("Json_UpdateContactField",obj,true);
        super.CallNewService("Json_UpdateContactField",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
   

    Json_GetClientAddresses(obj,callback) {
        super.CreateNewServiceParamObject("Json_GetClientAddresses",obj,false);
        super.CallNewService("Json_GetClientAddresses", function (status, Data) {
            if (status) {
                if (Data !== "") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }
    Json_GetClientAddressesAdd(obj,callback) {
        super.CreateNewServiceParamObject("Json_GetClientAddresses",obj,true);
        super.CallNewService("Json_GetClientAddresses", function (status, Data) {
            if (status) {
                if (Data !== "") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }

    Json_GetClientAssignedUnassignedFolderList(obj,callback) {
        super.CreateNewServiceParamObject("Json_GetClientAssignedUnassignedFolderList",obj,false);
        super.CallNewService("Json_GetClientAssignedUnassignedFolderList", function (status, Data) {
            if (status) {
                if (Data !=="") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }
    Json_UpdateClient(obj,callback) {
        super.CreateNewServiceParamObject("Json_UpdateClient",obj,false);
        super.CallNewService("Json_UpdateClient", function (status, Data) {
            if (status) {
                if (Data !=="") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }
    Json_UpdateClientField(obj,callback) {
        super.CreateNewServiceParamObject("Json_UpdateClientField",obj,false);
        super.CallNewService("Json_UpdateClientField", function (status, Data) {
            if (status) {
                if (Data !== "") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }
    Json_ChangeClientID(obj,callback) {
        super.CreateNewServiceParamObject("Json_ChangeClientID",obj,false);
        super.CallNewService("Json_ChangeClientID", function (status, Data) {
            if (status) {
                if (Data !=="") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }
    Json_AssignProjectsToClient(obj,callback) {
        super.CreateNewServiceParamObject("Json_AssignProjectsToClient",obj,false);
        super.CallNewService("Json_AssignProjectsToClient", function (status, Data) {
            if (status) {
                if (Data !=="") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }

    Json_GetAllSentMessages(obj,callback) {
        super.CreateNewServiceParamObject("Json_GetAllSentMessages",obj,false);
        super.CallNewService("Json_GetAllSentMessages", function (status, Data) {
            if (status) {
                if (Data !=="") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }

    Json_GetAllReceivedMessages(obj,callback) {
        super.CreateNewServiceParamObject("Json_GetAllReceivedMessages",obj,false);
        super.CallNewService("Json_GetAllReceivedMessages", function (status, Data) {
            if (status) {
                if (Data !== "") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }

    Json_GetAllClientList(obj,callback) {
        super.CreateNewServiceParamObject("Json_GetAllClientList",obj,false);
        super.CallNewService("Json_GetAllClientList", function (status, Data) {
            if (status) {
                if (Data != "") {
                    return callback(true, Data);
                }
                else {
                    return callback(false, []);
                }
            }
        })
    }

    Json_RenameDocument(obj, callBack) {
        super.CreateNewServiceParamObject("Json_RenameDocument", obj, true);
        super.CallNewService("Json_RenameDocument", function (status, Data) {
            if (status) {
                return callBack(true, Data);
            }
            else {
                return callBack(false, []);
            }
        })
    }

    Json_AddToWork(obj, callBack) {
        //let o = { ProjectId: FolderId,SectionId: };
        super.CreateNewServiceParamObject("Json_AddToWork", obj, true);
        super.CallNewService("Json_AddToWork", function (status, Data) {
          if (status) {
            if (Data != "") {
              return callBack(true, Data);
            } else {
              return callBack(false, []);
            }
          } else {
            // console.log("status", status);
          }
        });
      }

      TeamSolution(obj, callBack) {
        //let o = { ProjectId: FolderId,SectionId: };
        super.CreateNewServiceParamObject("TeamSolution", obj, true);
        super.CallNewService("TeamSolution", function (status, Data) {
          if (status) {
            if (Data != "") {
              return callBack(true, Data);
            } else {
              return callBack(false, []);
            }
          } else {
            // console.log("status", status);
          }
        });
      }


      Json_GetUserComments(obj, callBack) {
        //let o = { ProjectId: FolderId,SectionId: };
        super.CreateNewServiceParamObject("Json_GetUserComments", obj, true);
        super.CallNewService("Json_GetUserComments", function (status, Data) {
          if (status) {
            if (Data != "") {
              return callBack(true, Data);
            } else {
              return callBack(false, []);
            }
          } else {
            // console.log("status", status);
          }
        });
      }

}