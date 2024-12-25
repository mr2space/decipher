import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleOAuthAsync } from "../../utils/authSlice";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const OAuthGoogle = () => {
    // redux thunk to do callback to server after google oauth login

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const CLIENT_ID =
        "996406063341-u17i5ik0loncqnbi4visjdt7kqk3fja6.apps.googleusercontent.com";
    const handleClick = (googleToken) => {
        dispatch(googleOAuthAsync(googleToken));
        console.log(googleToken);
        navigate("/");
    };
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    handleClick(credentialResponse.credential);
                }}
                onError={() => {
                    toast.error("Error in login via Google");
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default OAuthGoogle;
