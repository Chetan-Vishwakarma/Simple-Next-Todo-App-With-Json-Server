import { createSlice } from "@reduxjs/toolkit";

const counterSlices = createSlice({
    name: "counter",
    initialState: {
        userDetail: null,
        dataCompanyHouse: null,
        selectedFolderID: null,
        myTasks:[],
        openTaskModal:false,
        clientAndDocDataForTaskModal: null,
        openDocumentModalByRedux: false,
        reduxDataSonam: []
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
          }, // chetan state end
          updateReduxDataSonam: (state, action) => {
            state.reduxData = action.payload;
          }
    }
});

export const { setUserDetail, setDataCompanyHouse, setSelectedFolderID, setMyTasks, handleOpenModalRedux, setClientAndDocDataForTaskModalRedux, setOpenDocumentModalByRedux,updateReduxDataSonam } = counterSlices.actions;

// export const getUsers = () => async(dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch(users(response.data));
// }

export default counterSlices.reducer;