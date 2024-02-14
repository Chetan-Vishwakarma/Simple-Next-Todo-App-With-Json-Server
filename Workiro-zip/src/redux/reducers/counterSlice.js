import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const counterSlices = createSlice({
    name: "counter",
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state,action)=>{
            state.value+=1;
        },
        decrement: (state,action)=>{
            state.value-=1;
        },
        // users: (state, action)=>{
        //     console.log(action.payload);
        // }
    }
});

export const {increment, decrement } = counterSlices.actions;

// export const getUsers = () => async(dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch(users(response.data));
// }

export default counterSlices.reducer;