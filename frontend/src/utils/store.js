import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../utils/authSlice";
import speciesSlice from "./speciesSlice"
import loadingSlice from "./loadingSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        species: speciesSlice,
        loading: loadingSlice
    },
    devTools: true
});