import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../data";


// async thunk for callback to server after gooogle oauth login using axios
export const googleOAuthAsync = createAsyncThunk(
    "auth/googleOAuth",
    async (googleToken, thunkAPI) => {
        try {
            const response = await axios.post(URL.GOOGLE_OAUTH_CALLBACK_URL, { googleToken });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
        credit: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken, credit } = action.payload;
            state.user = user;
            state.credit = credit;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        logOut: (state, action) => {
            state.user = null;
            state.credit = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
    //extra reducer to handle async thunk
    extraReducers: (builder) => {
        builder
            .addCase(googleOAuthAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(googleOAuthAsync.fulfilled, (state, action) => {
                state.user = user;
                state.credit = credit;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
            })
            .addCase(googleOAuthAsync.rejected, (state, action) => {
                state.user = null;
                state.credit = null;
                state.accessToken = null;
                state.refreshToken = null;
            });
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken;
export const selectCurrentCredit = (state) => state.auth.credit;
