import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { urls as URL } from "../constants";

export const medicineSuggesion = createAsyncThunk(
    "medicine/suggesion",
    async (value) => {
        const axiosPrivate = value.axiosPrivate;
        const suggesion = await axiosPrivate.post(
            URL.SPECIES_SEARCH_URL,
            {
                problem: value.problem,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        suggesion.data = suggesion.data?.data;
        return {
            problem: value.problem,
            data: suggesion.data
        }
    }
);

const medicineSlice = createSlice({
    name: "medicine",
    initialState: {
        data: null,
        problem: null,
        status: "idle",
        error: null,
    },
    reducers: {
        setResponse: (state, action) => {
            const { data, problem } = action.payload;
            state.data = data;
            state.problem = problem;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(medicineSuggesion.pending, (state) => {
                state.status = "loading";
            })
            .addCase(medicineSuggesion.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload.data;
                state.problem = action.payload.problem;
            })
            .addCase(medicineSuggesion.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});



export const { setResponse } = medicineSlice.actions;

export default medicineSlice.reducer;

export const selectCurrentMedicineData = (state) => state.medicine.data;
export const selectCurrentMedicineProblem = (state) => state.medicine.problem;
export const selectCurrentMedicineStatus = (state) => state.medicine.status;