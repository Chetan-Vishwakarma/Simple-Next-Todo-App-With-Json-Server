import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const counterSlices = createSlice({
    name: "counter",
    initialState: {
        userDetail: null,
        dataCompanyHouse: null,
        selectedFolderID: null,
        myTasks:[]   
    },
    reducers: {
        //sonam state
        setUserDetail: (state, action) => {
            state.userDetail = action.payload;
          },
          setDataCompanyHouse: (state, action) => {
            state.dataCompanyHouse = action.payload;
          },
          setSelectedFolderID: (state, action) => {
            state.selectedFolderID = action.payload;
          },
          setMyTasks: (state, action) => {
            state.myTasks = action.payload;
          }
    }
});

export const { setUserDetail, setDataCompanyHouse, setSelectedFolderID, setMyTasks } = counterSlices.actions;

// export const getUsers = () => async(dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch(users(response.data));
// }

export default counterSlices.reducer;