import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'


const PersistantLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

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
        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])

  return (
    <>
        {
            isLoading?
                <p> Loading </p>:
                <Outlet/>
        }
    </>
  )
}

export default PersistantLogin