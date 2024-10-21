import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";  // Added useDispatch import
import { URL } from "../../data";
import { Images, Icons } from "../../assets";
import { motion } from "framer-motion";

function Signup() {
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        geolocation: "",
        gender: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const oauthSuccess = queryParams.get("oauthSuccess");
        const accessToken = queryParams.get("accessToken");
        const user = queryParams.get("user");

        if (oauthSuccess && accessToken && user) {
            const parsedUser = JSON.parse(decodeURIComponent(user));

            // Dispatch credentials to the Redux store
            dispatch(
                setCredentials({
                    accessToken,
                    user: parsedUser,
                })
            );
            toast.success("OAuth login successful!");
            navigate("/", { replace: true }); // Redirect to homepage
        }
    }, [location.search, navigate, dispatch]);

    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleCheckbox = (gender) => {
        setUser({ ...user, gender });
    };

    const validateFields = () => {
        const {
            fullname,
            username,
            password,
            email,
            phone,
            geolocation,
            gender,
        } = user;
        let valid = true;

        if (!fullname) {
            toast.error("Full Name is required.");
            valid = false;
        }
        if (!username) {
            toast.error("Username is required.");
            valid = false;
        }
        if (!password) {
            toast.error("Password is required.");
            valid = false;
        } else if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            valid = false;
        }
        if (!email) {
            toast.error("Email is required.");
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Email format is invalid.");
            valid = false;
        }
        if (!phone) {
            toast.error("Phone Number is required.");
            valid = false;
        } else if (!/^\d{10}$/.test(phone)) {
            toast.error("Phone Number must be 10 digits.");
            valid = false;
        }
        if (!geolocation) {
            toast.error("Location is required.");
            valid = false;
        }
        if (!gender) {
            toast.error("Gender is required.");
            valid = false;
        }
        if (!termsAccepted) {
            toast.error("You must accept the Terms and Conditions.");
            valid = false;
        }

        return valid;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            const res = await axios.post(
                "http://127.0.0.1:7000/auth/register",
                user,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log("Server response:", res.data);
            if (res.data.success) {
                toast.success("Successfully registered!");
                setUser({
                    fullname: "",
                    username: "",
                    password: "",
                    email: "",
                    phone: "",
                    geolocation: "",
                    gender: "",
                });
            } else {
                toast.error(res.data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Registration error response:", error.response);
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    const oauthHandler = (e) => {
        e.preventDefault();
        window.location.href = "http://127.0.0.1:7000/auth/oauth";
    };

    return (
        <>
        <div className="min-h-screen py-24 bg-whitegray ">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-2xl overflow-hidden">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-8 bg-no-repeat bg-cover bg-cente">
                        <div className="flex bg-cover h-full ml-3.5">
                            <img
                                src={Images.plant3}
                                className=" inline-block ml-5 rounded-lg"
                                alt="plant vector"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 py-16 px-12">
                        <h2 className="relative items-center text-center text-4xl mb-4 font-bold">
                            Create an account
                        </h2>
                        <form onSubmit={onSubmitHandler}>
                            <div className="grid grid-cols-2 gap-5">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="border h-11 border-gray-400 py-1 px-2 w-full rounded-md"
                                    value={user.fullname}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            fullname: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="border h-11 border-gray-400 py-1 px-2 w-full rounded-md"
                                    value={user.username}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mt-5">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="border h-11 border-gray-400 py-1 px-2 w-full rounded-md"
                                    value={user.email}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mt-5">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="border h-11 border-gray-400 py-1 px-2 w-full rounded-md"
                                    value={user.password}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mt-5">
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="border h-11 border-gray-400 py-1 px-2 w-full rounded-md"
                                    value={user.phone}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mt-5">
                                <input
                                    type="text"
                                    placeholder="Current Location"
                                    className="border h-11 border-gray-400 py-1 px-2 w-full rounded-md"
                                    value={user.geolocation}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            geolocation: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mt-5 flex items-center">
                                <p className="text-black mr-2">Male</p>
                                <input
                                    type="checkbox"
                                    className="border border-gray-400 mr-2 rounded-md"
                                    checked={user.gender === "male"}
                                    onChange={() => handleCheckbox("male")}
                                />
                                <p className="text-black mr-2">Female</p>
                                <input
                                    type="checkbox"
                                    className="border border-gray-400 mr-2 rounded-md"
                                    checked={user.gender === "female"}
                                    onChange={() => handleCheckbox("female")}
                                />
                            </div>
                            <div className="mt-5 flex items-center">
                                <input
                                    type="checkbox"
                                    className="border border-gray-600 mr-2 rounded-md"
                                    checked={termsAccepted}
                                    onChange={(e) =>
                                        setTermsAccepted(e.target.checked)
                                    }
                                />
                                <span>
                                    I accept the{" "}
                                    <a href="#" className=" font-bold">
                                        Terms of Use
                                    </a>{" "}
                                    &{" "}
                                    <a href="#" className="font-bold">
                                        Privacy Policy
                                    </a>
                                </span>
                            </div>
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 py-3 text-center text-white rounded-xl hover:bg-green-700"
                                >
                                    Register Now
                                </button>
                            </div>
                        </form>
                        <p className="text-black text-center my-2">
                            Already have an account?{" "}
                            <Link to={URL.LOGIN_URL}>Login</Link>
                        </p>
                        <div className="flex">
                            <div className=" border-t-2 w-1/3 mt-2 mr-3"></div>
                            <div className=" text-sm">Or register with</div>
                            <div className=" border-t-2 w-1/3 mt-2 ml-3"></div>
                        </div>
                        <button
                            className="border-2 border-gray-600 h-12 w-full mt-4 rounded-xl bg-red-600 flex items-center justify-center gap-2 text-white hover:bg-red-700"
                            onClick={oauthHandler}
                        >
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
        
        </>
    );
}

export default Signup;
