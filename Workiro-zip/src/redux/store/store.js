import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterSlice.js";
import crudReducer from "../reducers/crudSlice.js";

export default configureStore({
    reducer: {
        counter: counterReducer,
        users: crudReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});