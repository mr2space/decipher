import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../utils/authSlice";
import speciesSlice from "./speciesSlice"
import loadingSlice from "./loadingSlice"
import medicineSlice from "./medicineSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        species: speciesSlice,
        medicine: medicineSlice,
        loading: loadingSlice
    },
    devTools: true
});