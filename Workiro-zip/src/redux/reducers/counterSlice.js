import { createSlice } from "@reduxjs/toolkit";

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
    GetActivitySonam:"",
    GetActivityDataSonam:"",
    recentTaskRedux: {
      isLoading: true,
      recentTaskList: [],
    },
    allTask: [],
    actualData: [],
    isTaskLoadingFromRedux: true,
    recentDocument:[],
    connectionsState: {
      clients: [],
      contacts: [],
      isLoading: true,
      allFolders: [],
    },
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
      state.allTask = action.payload;
      state.isTaskLoadingFromRedux = false;
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
  }
});

export const { setUserDetail, setDataCompanyHouse, setSelectedFolderID, setMyTasks, handleOpenModalRedux, setClientAndDocDataForTaskModalRedux, setOpenDocumentModalByRedux, updateReduxDataSonam, setSetDefaultRoleSonam, clearDefaultRoleSonam, setSetDefaultTitleSonam, setDefaultUserSonam, setMainCountrySonam, setDefaultDateSonam, setIsAdvanceDocSearchRedux, fetchRecentTasks, fetchAllTasks, fetchRecentDocuments,setGetActivitySonam ,setGetActivityDataSonam, setClientFromRedux, setContactsFromRedux, setAllFoldersFromRedux, setAllTaskFromRedux } = counterSlices.actions;

// export const getUsers = () => async(dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch(users(response.data));
// }

export default counterSlices.reducer;