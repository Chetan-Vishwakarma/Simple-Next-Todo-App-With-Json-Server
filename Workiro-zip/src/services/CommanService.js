
import AllService from "./AllService";



export default class CommanCLS extends AllService {
    constructor(APIUrl,agrno, Email, password) {
        super(APIUrl,agrno, Email, password);
    }

    Json_GetStandardLetterData(obj,callBack){   
        super.CreateNewServiceParamObject("Json_GetStandardLetterData",obj,false);
        super.CallNewService("Json_GetStandardLetterData",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

    Json_GetHtmlFromRtf(obj,callBack){   
        super.CreateNewServiceParamObject("Json_GetHtmlFromRtf",obj,true);
        super.CallNewService("Json_GetHtmlFromRtf",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
    Json_GetTemplateData(obj,callBack){   
        super.CreateNewServiceParamObject("Json_GetTemplateData",obj,false);
        super.CallNewService("Json_GetTemplateData",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
     
     Json_GetWebTemplatesList(callBack){   
        super.CreateNewServiceParamObject("Json_GetWebTemplates");
        super.CallNewService("Json_GetWebTemplates",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

    Json_ExplorerSearchDoc(obj,callBack){   
        super.CreateNewServiceParamObject("Json_ExplorerSearchDoc",obj,true);
        super.CallNewService("Json_ExplorerSearchDoc",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
     Json_GetClientCardDetails(obj,callBack){   
        super.CreateNewServiceParamObject("Json_GetClientCardDetails",obj,false);
        super.CallNewService("Json_GetClientCardDetails",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
    Json_Get_CRM_Task_ActivityByTaskId(obj,callBack){   
        super.CreateNewServiceParamObject("Json_Get_CRM_Task_ActivityByTaskId",obj,true);
        super.CallNewService("Json_Get_CRM_Task_ActivityByTaskId",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }


    Json_GetSections(obj,callBack){   
       super.CreateNewServiceParamObject("Json_GetSections",obj,true);
       super.CallNewService("Json_GetSections",function(status,Data){
           if(status){
               return callBack(true,Data);
           }
           else{
               return callBack(false,[]);
           }
       })
    }
    
    Json_GetClientCardDetails(obj,callBack){   
       super.CreateNewServiceParamObject("Json_GetClientCardDetails",obj,false);
       super.CallNewService("Json_GetClientCardDetails",function(status,Data){
           if(status){
               return callBack(true,Data);
           }
           else{
               return callBack(false,[]);
           }
       })
    }

    Json_GetFolders(obj,callBack) {       
        super.CreateNewServiceParamObject("Json_GetFolders",obj,false);       
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

    Json_GetContactListByFolder(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_GetContactListByFolder",obj,true);   
        super.CallNewService("Json_GetContactListByFolder", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    ListEditableTemplates(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_ListEditableTemplates",obj,true);   
        super.CallNewService("Json_ListEditableTemplates", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }
    
    Json_CRM_GetOutlookTask(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_CRM_GetOutlookTask",obj,true);   
        super.CallNewService("Json_CRM_GetOutlookTask", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_AddSupplierActivity(obj,callBack){   
        super.CreateNewServiceParamObject("Json_AddSupplierActivity",obj,true);
        super.CallNewService("Json_AddSupplierActivity",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }
    Json_GetAllContactsByClientID(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_GetAllContactsByClientID",obj,true);   
        super.CallNewService("Json_GetAllContactsByClientID", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_ExplorerSearchDoc(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_ExplorerSearchDoc",obj,true);   
        super.CallNewService("Json_ExplorerSearchDoc", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_GetToFavourites(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_GetToFavourites",obj,true);   
        super.CallNewService("Json_GetToFavourites", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_AddToFavourite(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_AddToFavourite",obj,true);   
        super.CallNewService("Json_AddToFavourite", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_RemoveToFavourite(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_RemoveToFavourite",obj,true);   
        super.CallNewService("Json_RemoveToFavourite", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }
    
    Json_GetConfiguration(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_GetConfiguration",obj,true);   
        super.CallNewService("Json_GetConfiguration", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_GetClientsByFolder(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_GetClientsByFolder",obj,true);   
        super.CallNewService("Json_GetClientsByFolder", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_Get_CRM_UserByProjectId(obj,callBack) { 
        super.CreateNewServiceParamObject("Json_Get_CRM_UserByProjectId",obj,true);   
        super.CallNewService("Json_Get_CRM_UserByProjectId", function (status, Data) {
            if (status) {
                callBack(true, Data);
            }
            else {
                callBack(false, []);
            }
        })
    }

    Json_GetForwardUserList(obj,callBack){   
        super.CreateNewServiceParamObject("Json_GetForwardUserList",obj,true);
        super.CallNewService("Json_GetForwardUserList",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     Json_GetFolderData(obj,callBack){   
        super.CreateNewServiceParamObject("Json_GetFolderData",obj,true);
        super.CallNewService("Json_GetFolderData",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     Json_CRM_Task_Save(obj,callBack){   
        super.CreateNewServiceParamObject("Json_CRM_Task_Save",obj,true);
        super.CallNewService("Json_CRM_Task_Save",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     SaveTaskAttachments(obj,callBack){   
        super.CreateNewServiceParamObject("SaveTaskAttachments",obj,true);
        super.CallNewService("SaveTaskAttachments",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     Json_GetSupplierListByProject(obj,callBack){   
        super.CreateNewServiceParamObject("Json_GetSupplierListByProject",obj,true);
        super.CallNewService("Json_GetSupplierListByProject",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     Json_getViewerToken(obj,callBack){   
        super.CreateNewServiceParamObject("Json_getViewerToken",obj,true);
        super.CallNewService("Json_getViewerToken",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     Json_UpdateContactVerify(obj,callBack){   
        super.CreateNewServiceParamObject("Json_UpdateContactVerify",obj,true);
        super.CallNewService("Json_UpdateContactVerify",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     Json_VerifyDrivingLicence(obj,callBack){   
        super.CreateNewServiceParamObject("Json_VerifyDrivingLicence",obj,true);
        super.CallNewService("Json_VerifyDrivingLicence",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

     Json_Get_CRM_SavedTask_ByTaskId(obj,callBack){   
        super.CreateNewServiceParamObject("Json_Get_CRM_SavedTask_ByTaskId",obj,true);
        super.CallNewService("Json_Get_CRM_SavedTask_ByTaskId",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
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

      Json_CRM_Task_Update(obj,callBack){   
        super.CreateNewServiceParamObject("Json_CRM_Task_Update",obj,true);
        super.CallNewService("Json_CRM_Task_Update",function(status,Data){
            if(status){
                return callBack(true,Data);
            }
            else{
                return callBack(false,[]);
            }
        })
     }

}