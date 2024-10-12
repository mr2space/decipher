import axios from "../utils/axios"
import useAuth from "./useAuth"
import { URL } from "../data";

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const refresh = async ()=>{
        const response = await axios.post(URL.REFRESH_URL, {}, {
            withCredentials: true,
        });
        response.data = await response.data.data;
        
        await setAuth((prev)=>{
            console.log(response.data , prev);
            
            return {...prev, accessToken : response.data.accessToken, refreshToken : response.data.refreshToken, user : response.data.user}
        });
        return response.data.accessToken;
    }
  return refresh;
}

export default useRefreshToken