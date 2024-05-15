import { createSlice } from "@reduxjs/toolkit";

function applyTaskFilters(data, criteria) {
  if (data && data.length > 0) {
    return data.filter(function (obj) {
      return Object.keys(criteria).every(function (key, index) {
        if (criteria[key][0].length > 0 || typeof criteria[key][0] === "object") {
          if (obj[key] && obj[key] !== undefined && obj[key] !== "") {
            if (key === "CreationDate") {
              let docDate = obj[key];
              let sDate = criteria[key][0];
              let eDate = criteria[key][1];
              return docDate >= sDate && docDate <= eDate;
            } else {
              if(criteria[key].length===1){
                return obj[key].toString().toLowerCase().includes(criteria[key][0].toString().toLowerCase());
              }else{
                return obj[key].toString().toLowerCase().includes(criteria[key][0].toString().toLowerCase()) ||obj[key].toString().toLowerCase().includes(criteria[key][1].toString().toLowerCase()) || obj[key].toString().toLowerCase().includes(criteria[key][2].toString().toLowerCase());
              }
            }
          }
        }
      });
    });
  }
}

function filterSubjects(tasks) {
  const task_subjects = [];
  tasks.map(itm => {
    if (itm.Subject && !task_subjects.includes(itm.Subject)) {
      task_subjects.push(itm.Subject);
    }
  });
  return task_subjects;
}

const counterSlices = createSlice({
  name: "counter",
  initialState: {
    userDetail: null,
    dataCompanyHouse: null,
    selectedFolderID: null,
    myTasks: [],
    openTaskModal: false,
    clientAndDocDataForTaskModal: null,
    openDocumentModalByRedux: false,
    reduxDataSonam: [],
    SetDefaultRoleSonam: "",
    SetDefaultTitleSonam: "",
    defaultUserSonam: null,
    mainCountrySonam: "",
    defaultDateSonam: null,
    isAdvanceDocSearchRedux: false,
    GetActivitySonam: "",
    GetActivityDataSonam: "",

    recentTaskRedux: {
      isLoading: true,
      recentTaskList: [],
    },
    sections: [],
    folders: [],
    allTask: [],
    actualData: [],
    taskSubjects: [],
    isTaskLoadingFromRedux: true,
    recentDocument: [],
    connectionsState: {
      clients: [],
      contacts: [],
      isLoading: true,
      allFolders: [],
      searchByItemId: [],
      allSections: [],
      allClientsList: []
    },
    refile: {
      opentReIndex: false,
    },
    explorerSearchDocRedux: {
      allDocuments: [],
      documents: [],
      isLoading: true
    },
    selectedDocumentRedux: {},
    AllCategory: [],
    advanceSearchResult: {
      result: [],
      isLoading: true,
      docDescriptions: []
    }
  },
  reducers: {
    //sonam state start
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    setDataCompanyHouse: (state, action) => {
      state.dataCompanyHouse = action.payload;
    },
    setSelectedFolderID: (state, action) => {
      state.selectedFolderID = action.payload;
    },//sonam state end
    //chetan state start
    setMyTasks: (state, action) => {
      state.myTasks = action.payload;
    },
    handleOpenModalRedux: (state, action) => {
      state.openTaskModal = action.payload;
    },
    setClientAndDocDataForTaskModalRedux: (state, action) => {
      state.clientAndDocDataForTaskModal = action.payload;
    },
    setOpenDocumentModalByRedux: (state, action) => {
      state.openDocumentModalByRedux = action.payload;
    },
    setIsAdvanceDocSearchRedux: (state, action) => {
      state.isAdvanceDocSearchRedux = action.payload;
    },
    fetchRecentTasks: (state, action) => {
      state.recentTaskRedux.isLoading = false;
      state.recentTaskRedux.recentTaskList = action.payload;
    },
    fetchAllTasks: (state, action) => {
      state.allTask = action.payload;
      state.actualData = action.payload;
      state.isTaskLoadingFromRedux = false;
    },
    setAllTaskFromRedux: (state, action) => {
      let data = action.payload.data;
      let criteria = action.payload.taskFilter;
      let fltData = applyTaskFilters(data, criteria);
      let taskSubjects = filterSubjects(data);
      state.taskSubjects = taskSubjects.length > 0 ? taskSubjects : [];
      state.allTask = (fltData && fltData.length > 0) ? fltData : data;
      state.isTaskLoadingFromRedux = false;
    },
    setAllTaskFromReduxOrderWise: (state, action) => {
      state.allTask = action.payload;
    },
    fetchRecentDocuments: (state, action) => {
      state.recentDocument = action.payload;
    },
    setClientFromRedux: (state, action) => {
      state.connectionsState.clients = action.payload;
      state.connectionsState.isLoading = false;
    },
    setContactsFromRedux: (state, action) => {
      state.connectionsState.contacts = action.payload;
      state.connectionsState.isLoading = false;
    },
    setAllFoldersFromRedux: (state, action) => {
      state.connectionsState.allFolders = action.payload;
    },
    setSearchDocByIdFromRedux: (state, action) => {
      state.connectionsState.searchByItemId = action.payload;
    },
    setSectionListFromRedux: (state, action) => {
      state.connectionsState.allSections = action.payload;
    },
    setClientListByFolderIdFromRedux: (state, action) => {
      state.connectionsState.allClientsList = action.payload;
    },
    setAdvanceSearchResultFromRedux: (state, action) => {
      let { docs, descriptions } = action.payload
      state.advanceSearchResult.result = docs;
      state.advanceSearchResult.docDescriptions = descriptions;
      state.advanceSearchResult.isLoading = false;
    },
    setSectionDataInredux: (state, action) => {
      state.sections = action.payload;
    },
    setFoldersInRedux: (state, action) => {
      state.folders = action.payload;
    },
    // chetan state end
    updateReduxDataSonam: (state, action) => {
      state.reduxData = action.payload;
    },
    setSetDefaultRoleSonam: (state, action) => {
      state.SetDefaultRoleSonam = action.payload;
    },
    setSetDefaultTitleSonam: (state, action) => {
      state.SetDefaultTitleSonam = action.payload;
    },
    setGetActivitySonam: (state, action) => {
      state.GetActivitySonam = action.payload;
    },
    setGetActivityDataSonam: (state, action) => {
      state.GetActivityDataSonam = action.payload;
    },
    setDefaultUserSonam: (state, action) => {
      state.defaultUserSonam = action.payload;
    },
    setMainCountrySonam: (state, action) => {
      state.mainCountrySonam = action.payload;
    },
    setDefaultDateSonam: (state, action) => {
      state.defaultDateSonam = action.payload;
    },
    clearDefaultRoleSonam: (state) => {
      state.SetDefaultRoleSonam = null;
      state.SetDefaultTitleSonam = null;
      state.defaultUserSonam = null;
      state.mainCountrySonam = null;
      state.defaultDateSonam = null;
    },
    setOpenReIndex: (state, action) => {
      state.refile.opentReIndex = action.payload;
    },
    setSelectedDocumentRedux: (state, action) => {
      state.selectedDocumentRedux = action.payload;
    },
    setExplorerSearchDocRedux: (state, action) => {
      state.explorerSearchDocRedux.allDocuments = action.payload;
      state.explorerSearchDocRedux.documents = action.payload;
      state.explorerSearchDocRedux.isLoading = false;
    },
    clearExplorerSearchDocRedux: (state, action) => {
      state.explorerSearchDocRedux.allDocuments = [];
      state.explorerSearchDocRedux.documents = [];
      state.explorerSearchDocRedux.isLoading = true;
    },
    setCateGoryApi: (state, action) => {
      state.AllCategory = action.payload;
    }
  }
});

export const {
  setUserDetail,
  setDataCompanyHouse,
  setSelectedFolderID,
  setMyTasks,
  handleOpenModalRedux,
  setClientAndDocDataForTaskModalRedux,
  setOpenDocumentModalByRedux,
  updateReduxDataSonam,
  setSetDefaultRoleSonam,
  clearDefaultRoleSonam,
  setSetDefaultTitleSonam,
  setDefaultUserSonam,
  setMainCountrySonam,
  setDefaultDateSonam,
  setIsAdvanceDocSearchRedux,
  fetchRecentTasks,
  fetchAllTasks,
  fetchRecentDocuments,
  setGetActivitySonam,
  setGetActivityDataSonam,
  setClientFromRedux,
  setContactsFromRedux,
  setAllFoldersFromRedux,
  setAllTaskFromRedux,
  setAllTaskFromReduxOrderWise,
  setSearchDocByIdFromRedux,
  setSectionListFromRedux,
  setClientListByFolderIdFromRedux,
  setOpenReIndex,
  setSelectedDocumentRedux,
  setExplorerSearchDocRedux,
  setAdvanceSearchResultFromRedux,
  setCateGoryApi,
  clearExplorerSearchDocRedux,
  setSectionDataInredux,
  setFoldersInRedux
} = counterSlices.actions;

// export const getUsers = () => async(dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch(users(response.data));
// }

export default counterSlices.reducer;