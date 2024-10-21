import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { URL } from "../data";

export const detailsSpeciesText = createAsyncThunk(
    "species/text_search",
    async (value) => {
        const axiosPrivate = value.axiosPrivate;
        if (!axiosPrivate) {
            throw new Error("require to pass axiosPrivate Element");
        }
        const detailResponse = await axiosPrivate.post(
            URL.SPECIES_SEARCH_URL,
            { species: value?.species },
            {
                withCredentials: true,
            }
        );
        const locationResponse = await axiosPrivate.get(
            URL.LOCATION_SEARCH_URL,
            {
                params: {
                    species: value.species,
                },
            },
            {
                withCredentials: true,
            }
        );
        locationResponse.data = locationResponse.data.data;
        detailResponse.data = detailResponse.data?.data;
        return {
            species: value.species,
            data: detailResponse.data,
            locations: locationResponse.data,
            photoURL: detailResponse.data?.photoURL,
        };
    }
);

export const photoSpeciesScan = createAsyncThunk(
    "species/photo_search",
    async (value) => {
        const axiosPrivate = value.axiosPrivate;
        const formData = value.formData;
        const speciesResponse = await axiosPrivate.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials:true
        });
        speciesResponse.data = speciesResponse.data.data;
        const detailResponse = await axiosPrivate.get(
            URL.SPECIES_SEARCH_URL,
            {
                withCredentials: true,
                params: { species: speciesResponse.data.species[1] },
            }
        );
        console.log(detailResponse)
        const locationResponse = await axiosPrivate.get(
            URL.LOCATION_SEARCH_URL,
            {
                params: {
                    species: speciesResponse.data.species[1],
                },
            },
            {
                withCredentials: true,
            }
        );
        locationResponse.data = locationResponse.data?.data;
        detailResponse.data = detailResponse.data?.data;
        return {
            species: speciesResponse.data.species[1],
            data: detailResponse.data,
            score:speciesResponse.data.score,
            locations: locationResponse.data,
            photoURL: speciesResponse.data?.photoURL,
        };
    }
);

const speciesSlice = createSlice({
    name: "species",
    initialState: {
        data: null,
        species: null,
        status: "idle",
        score:null,
        locations: null,
        photoURL: null,
        error: null,
    },
    reducers: {
        setResponse: (state, action) => {
            const { data, species } = action.payload;
            state.data = data;
            state.species = species;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(detailsSpeciesText.pending, (state) => {
                state.status = "loading";
            })
            .addCase(detailsSpeciesText.fulfilled, (state, action) => {
                state.status = "success";
                
                state.data = action.payload.data;
                state.species = action.payload.species;
                state.locations = action.payload.locations;
                state.photoURL = action.payload.photoURL;
            })
            .addCase(detailsSpeciesText.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(photoSpeciesScan.pending, (state) => {
                state.status = "loading";
            })
            .addCase(photoSpeciesScan.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload.data;
                state.score = action.payload.score;
                state.species = action.payload.species;
                state.locations = action.payload.locations;
                state.photoURL = action.payload.photoURL;
            })
            .addCase(photoSpeciesScan.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setResponse } = speciesSlice.actions;

export default speciesSlice.reducer;

export const selectCurrentData = (state) => state.species.data;
export const selectCurrentSpecies = (state) => state.species.species;
export const selectCurrentSpeciesStatus = (state) => state.species.status;
export const selectSpecies = (state) => state.species;
