import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../data";
import {axiosPrivate} from "../utils/axios";

// async thunk for callback to server after gooogle oauth login using axios
export const googleOAuthAsync = createAsyncThunk(
    "auth/googleOAuth",
    async (googleToken) => {
        const response = await axiosPrivate.post(URL.GOOGLE_OAUTH_CALLBACK_URL, {
            token: googleToken,
        });
        document.cookie = `accessToken=${response.data.data.accessToken}; path=/; secure; HttpOnly; SameSite=Strict;`;
        document.cookie = `refreshToken=${response.data.data.refreshToken}; path=/; secure; HttpOnly; SameSite=Strict;`;
        return response.data.data;
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
                state.status = "success";
                state.user = action.payload.user;
                state.credit = action.payload.user.credit;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(googleOAuthAsync.rejected, (state, action) => {
                state.status = "failed";
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
