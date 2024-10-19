import React from "react";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { URL } from "../../data";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../utils/authSlice";
import { Icons, Images } from "../../assets";
import toast from "react-hot-toast";

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
            toast.error("All fields are required!");
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
            toast.success("Login Successful");
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="min-h-screen py-24 bg-whitegray ">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-2xl overflow-hidden">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-8 bg-no-repeat ">
                        <div className="flex  h-25 ml-3.5">
                            <img
                                src={Images.plant3}
                                className=" inline-block ml-1 rounded-lg"
                                alt="plant vector"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 pt-16 pb-8 px-12">
                        <h2 className="relative items-center text-center text-4xl mb-8 font-bold">
                            Login
                        </h2>
                        <form
                            action="http://127.0.0.1:7000/auth/login"
                            onSubmit={handleSubmit}
                            method="post"
                            className="flex flex-col gap-7"
                        >
                            <div className="mt-5 -mb-4">
                                <input
                                    type="text"
                                    placeholder="username"
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    name="username"
                                    className="border h-11 border-gray-400 py-1 px-2 w-full rounded-md"
                                />
                            </div>
                            <div className="mt-5">
                                <input
                                    className="border h-11 border-gray-400 py-1 px-2 w-full rounded-md -mb-4"
                                    put
                                    type="password"
                                    placeholder="password"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    name="password"
                                />
                            </div>

                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 py-3 text-center text-white rounded-xl hover:bg-green-700 mb-3"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <p className="text-black text-center my-2 mb-4">
                            Already have an account?{" "}
                            <Link to={URL.LOGIN_URL}>Login</Link>
                        </p>
                        <div className="flex">
                            <div className=" border-t-2 w-1/3 mt-2 mr-4"></div>
                            <div className=" text-sm">Or login with</div>
                            <div className=" border-t-2 w-1/3 mt-2 ml-4"></div>
                        </div>
                        <button className="border-2 border-gray-600 h-12 w-full mt-4 rounded-xl bg-red-600 flex items-center justify-center gap-2 text-white hover:bg-red-700">
                            <img
                                src={Icons.icon1}
                                alt="Error"
                                className="h-5"
                            />
                            <span>Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
