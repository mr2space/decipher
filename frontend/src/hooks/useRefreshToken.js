import axios from "../utils/axios"
import useAuth from "./useAuth"
import { URL } from "../data";
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from "../utils/authSlice";

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const dispatch = useDispatch();
    const refresh = async ()=>{
        const response = await axios.post(URL.REFRESH_URL, {}, {
            withCredentials: true,
        });
        response.data = await response.data.data;
        
        await setAuth((prev)=>{
            console.log(response);
            
            dispatch(setCredentials({accessToken : response.data.accessToken, refreshToken : response.data.refreshToken, user : response.data?.user, credit : response.data?.user.credit}))         
            return {...prev, accessToken : response.data.accessToken, refreshToken : response.data.refreshToken, user : response.data.user}
        });
        return response.data.accessToken;
    }
  return refresh;
}

export default useRefreshToken