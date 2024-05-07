import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CommanCLS from "../../services/CommanService";
import dateForMyTask from "../../utils/dateForMyTask";

const agrno = localStorage.getItem("agrno");
const password = localStorage.getItem("Password");
const Email = localStorage.getItem("Email");
const FolderId = localStorage.getItem("FolderId");
const UserId = localStorage.getItem("UserId");

const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
let ClsSms = new CommanCLS(baseUrl, agrno, Email, password);
const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
let Cls = new CommanCLS(baseUrlPractice, agrno, Email, password);

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
    recentTaskRedux: {
      isLoading: true,
      recentTaskList: [],
    },
    allTask: []
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

export const { setUserDetail, setDataCompanyHouse, setSelectedFolderID, setMyTasks, handleOpenModalRedux, setClientAndDocDataForTaskModalRedux, setOpenDocumentModalByRedux, updateReduxDataSonam, setSetDefaultRoleSonam, clearDefaultRoleSonam, setSetDefaultTitleSonam, setDefaultUserSonam, setMainCountrySonam, setDefaultDateSonam, setIsAdvanceDocSearchRedux, fetchRecentTasks, fetchAllTasks } = counterSlices.actions;

export const fetchRecentTasksRedux = () => dispatch => {
  try {
    ClsSms.Json_getRecentTaskList((sts, data) => {
      if (sts) {
        if (data) {
          let json = JSON.parse(data);
          let tbl = json.Table;
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
              return;
            } else if (target === "MyTask") {
              const formattedTasks = fltTask.map((task) => {
                return dateForMyTask(task);
              });
              formattedTasks.sort((a, b) => b.EndDateTime - a.EndDateTime);
              dispatch(fetchAllTasks(formattedTasks));
              return;
            } else {
              const formattedTasks = fltTask.map((task) => {
                return dateForMyTask(task);
              });
              formattedTasks.sort((a, b) => b.EndDateTime - a.EndDateTime);
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
// export const getUsers = () => async(dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch(users(response.data));
// }

export default counterSlices.reducer;