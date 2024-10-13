import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../utils/authSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer
    },
    devTools: true
});