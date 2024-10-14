import { createSlice } from "@reduxjs/toolkit"

const speciesSlice = createSlice({
    name: 'species',
    initialState: { data: null, species: null },
    reducers: {
        setResponse: (state, action) => {
            const { data , species } = action.payload
            state.data = data
            state.species = species
        },
    },
})

export const { setResponse } = speciesSlice.actions

export default speciesSlice.reducer

export const selectCurrentData = (state) => state.species.data
export const selectCurrentSpecies = (state) => state.species.species