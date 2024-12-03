import { axiosPrivate } from "../scripts/axios";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { refreshTheToken, selectCurrentUser, selectCurrentAccessToken } from "../scripts/authSlice";


const useAxiosPrivate = () => {
    const auth = useSelector(selectCurrentUser);
    const accessToken = useSelector(selectCurrentAccessToken);
    let refresh = null
        refresh = useDispatch(refreshTheToken({}));

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;

                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.request.eject(responseIntercept);
        };
    }, [auth, refresh]);
    return axiosPrivate;
};

//?? Edited area check for bugs

export default useAxiosPrivate;
