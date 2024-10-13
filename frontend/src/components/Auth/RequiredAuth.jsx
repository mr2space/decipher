import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser } from "../../utils/authSlice";
import { URL } from "../../data";


const RequiredAuth = ()=>{
    const user = useSelector(selectCurrentUser)
    const location = useLocation();
    
    return (
        (user)? <Outlet /> : <Navigate to={URL.LOGIN_URL} state={{from : location}} replace/>
    )
}

export default RequiredAuth;