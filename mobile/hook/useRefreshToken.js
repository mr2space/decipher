import axios from "../scripts/axios";
import { urls as URL } from "../constants";
import { useDispatch } from "react-redux";
import { setCredentials } from "../scripts/authSlice";
import * as SecureStore from "expo-secure-store";

const storeToken = async (token) => {
  try {
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

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refreshToken = getToken();
  const refresh = async () => {
    const response = await axios.post(
      URL.REFRESH_URL,
      { refreshToken },
      {
        withCredentials: true,
      }
    );
    response.data = await response.data.data;
    dispatch(
      setCredentials({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data?.user,
        credit: response.data?.user.credit,
      })
    );
    return response.data.accessToken; // ?? MIGHT NEED TO UPDATE
  };
  return refresh;
};

export default useRefreshToken;
