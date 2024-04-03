// UNCOMMENT TO READ THIS CODE THIS IS AN EXAMPLE OF HOW TO MANAGE API'S IN REDUX
// import {createSlice} from "@reduxjs/toolkit";
// import axios from "axios";

// const crudSlice = createSlice({
//     name:"crud",
//     initialState: {
//         value:0,
//     },
//     reducers: {
//         getAllUsers: (state,action)=>{
//             state.value = action.payload;
//         },
//         deleteUser: (state, action)=>{
//             // console.log("sdfdsgsdg",action.payload.id);
//             // console.log("sdfdsgsdg",action.payload.obj);
//             let target = action.payload.id;
//             let data = action.payload.obj;
//             let filteredData = data.filter((item)=>{
//                 return item.id != target;
//             });
//             state.value = filteredData;
//         },
//         updateUser: (state, action)=>{
//             let id = action.payload.id;
//             let username = action.payload.username;
//             let email = action.payload.email;
//             let data = action.payload.obj;
//             data.map((item)=>{
//                 if(item.id==id){
//                     item.username = username;
//                     item.email = email;
//                 }
//             });
//             state.value = data;
//         }
//     }
// });

// export const {getAllUsers,deleteUser,updateUser} = crudSlice.actions;

// export const getUsers = () => async (dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch(getAllUsers(response.data))
// }

// export default crudSlice.reducer;