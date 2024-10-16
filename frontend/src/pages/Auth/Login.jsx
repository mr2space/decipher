import React from "react";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { URL } from "../../data";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../utils/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const from = location.state?.from?.pathname || "/";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username && !password) {
            return;
        }
        try {
            const response = await axios.post(
                URL.LOGIN_URL,
                {
                    username: username,
                    password: password.toString(),
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            response.data = response.data.data;
            dispatch(
                setCredentials({
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                    user: response.data?.user,
                    credit: response.data?.user?.credit,
                })
            );
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="wrapper w-screen h-screen z-10 flex justify-center items-center relative bg-url bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="close text-4xl bg-gray-500 hover:bg-gray-700 text-whitegray relative bottom-[13%] left-[calc(25%+38px)] font-poppins cursor-pointer">
                <MdClose />
            </div>
            <div className="form__box w-1/4 py-8 bg-whitegray rounded-lg px-5 flex flex-col gap-12 shadow-md shadow-gray-800">
                <div className="heading text-4xl text-center">Sign in</div>
                <div className="form">
                    <form
                        action="http://127.0.0.1:7000/auth/login"
                        onSubmit={handleSubmit}
                        method="post"
                        className="flex flex-col gap-7"
                    >
                        <input
                            type="text"
                            placeholder="username"
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            name="username"
                            className="w-full px-6 py-2 text-lg rounded-full shadow-md shadow-gray-400"
                        />
                        <input
                            type="password"
                            placeholder="password"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            name="password"
                            className="w-full px-6 py-2 text-lg rounded-full shadow-md shadow-gray-400"
                        />
                        <button
                            type="submit"
                            className="w-full px-6 py-2 text-lg rounded-full bg-primary-500 text-center hover:bg-primary-600 text-whitegray shadow-md shadow-primary-200"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;