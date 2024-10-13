import axios from "../utils/axios";
import { URL } from "../data";
import { useDispatch } from "react-redux";
import { setCredentials } from "../utils/authSlice";

const useRefreshToken = () => {
    const dispatch = useDispatch();
    const refresh = async () => {
        const response = await axios.post(
            URL.REFRESH_URL,
            {},
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
