import { createSlice } from "@reduxjs/toolkit";

const counterSlices = createSlice({
    name: "counter",
    initialState: {
        userDetail: null,
        dataCompanyHouse: null,
        selectedFolderID: null,
        myTasks:[]
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
          }, // chetan state end
    }
});

export const { setUserDetail, setDataCompanyHouse, setSelectedFolderID, setMyTasks } = counterSlices.actions;

// export const getUsers = () => async(dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch(users(response.data));
// }

export default counterSlices.reducer;