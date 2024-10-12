import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = "/auth/login"

const RequiredAuth = ()=>{
    const {auth} = useAuth();
    const location = useLocation();
    return (
        auth?.user ? <Outlet /> : <Navigate to={LOGIN_URL} state={{from : location}} replace/>
    )
}

export default RequiredAuth;