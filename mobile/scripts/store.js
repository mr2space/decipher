import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice";
import speciesSlice from "./speciesSlice"
import loadingSlice from "./loadingSlice"
import medicineSlice from "./medicineSlice"
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        species: speciesSlice,
        medicine: medicineSlice,
        loading: loadingSlice
    },
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
});