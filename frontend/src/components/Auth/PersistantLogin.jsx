import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../../hooks/useRefreshToken'

import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser } from "../../utils/authSlice";

const PersistantLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const user = useSelector(selectCurrentUser)

    useEffect(()=>{
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try{
                await refresh()
            }catch(error){
                console.error(error)
            }finally{
                isMounted && setIsLoading(false);
            }
        }
        !user ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])

  return (
    <>
        {
            isLoading?
                <p> Loading </p>: //TODO: UPDATE TO BETTER LOADER
                <Outlet/>
        }
    </>
  )
}

export default PersistantLogin