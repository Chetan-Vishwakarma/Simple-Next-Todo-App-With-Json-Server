
import AllService from "./AllService";



export default class CommanCLS extends AllService {
    constructor(APIUrl,agrno, Email, password) {
        super(APIUrl,agrno, Email, password);
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

    Json_GetFolders(callBack) {       
        super.CreateNewServiceParamObject("Json_GetFolders");       
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

}