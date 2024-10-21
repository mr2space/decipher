import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { urls as URL } from "../constants";
import axios from "../scripts/axios";


const storeToken = async (token) => {
  try {
    if (!token){
      throw new Error;
    }
    await SecureStore.setItemAsync("refreshToken", token);
    console.log("Token stored successfully");
  } catch (error) {
    console.log("Error storing the token", error);
  }
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("refreshToken");
    if (token) {
      console.log("Token retrieved:", token);
    } else {
      console.log("No token found");
    }
    return token;
  } catch (error) {
    console.log("Error retrieving the token", error);
    return null;
  }
};

export const refreshTheToken = createAsyncThunk(
  "auth/refresh_token",
  async (value) => {
    const refreshToken = getToken();
    const response = await axios.post(
      URL.REFRESH_URL,
      { refreshToken },
      {
        withCredentials: true,
      }
    );
    response.data = await response.data.data;

    storeToken(response.data?.refreshToken);
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      user: response.data?.user,
      credit: response.data?.user.credit,
    };
  }
);

export const loginTheUser = createAsyncThunk("auth/login", async (form) => {

  
  const response = await axios.post(
    URL.LOGIN_URL,
    {
      username: form.username,
      password: form.password,
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  response.data = response.data.data;
  storeToken(response.data?.refreshToken);
  return {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
    user: response.data?.user,
    credit: response.data?.user.credit,
  };
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    credit: null,
    status: "idle",
    error: null,
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
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshTheToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshTheToken.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.credit = action.payload.credit;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshTheToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginTheUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginTheUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.credit = action.payload.credit;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginTheUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken;
export const selectCurrentCredit = (state) => state.auth.credit;
export const selectCurrentData = (state) => state.auth;
export const selectCurrentStatus = (state) => state.auth.status;
