import { createSlice } from "@reduxjs/toolkit"

const loadingSlice = createSlice({
    name: 'loading',
    initialState: { isLoading: false, msg: "" },
    reducers: {
        setLoading: (state, action) => {
            const { isLoading , msg } = action.payload
            state.isLoading = isLoading
            state.msg = msg
        },
    },
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer

export const selectCurrentLoading = (state) => state.loading.isLoading
export const selectCurrentMsg = (state) => state.loading.msg