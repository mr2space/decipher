import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "../../data";

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

    // Handle gender checkbox
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
            } else {
                toast.error(res.data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Registration error response:", error.response);
            toast.error(error.response?.data?.message || "Registration failed");
        }
        setUser({
            fullname: "",
            username: "",
            password: "",
            email: "",
            phone: "",
            geolocation: "",
            gender: "",
        });
    };

    return (
        <div className="wrapper w-screen h-screen z-10 flex justify-center items-center relative bg-url bg-gradient-to-r from-cyan-500 to-blue-500'">
            <div></div>
            <div className="form__box w-1/4 py-8 bg-whitegray rounded-lg px-5 flex flex-col gap-12 shadow-md shadow-gray-800">
                <h1 className="heading text-4xl text-center">Signup</h1>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">
                                Full Name
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered h-10"
                            type="text"
                            placeholder="Enter Full Name"
                            value={user.fullname}
                            onChange={(e) =>
                                setUser({ ...user, fullname: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">
                                Username
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered h-10"
                            type="text"
                            placeholder="Enter Username"
                            value={user.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">
                                Password
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered h-10"
                            type="password"
                            placeholder="Enter Password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">
                                Email
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered h-10"
                            type="text"
                            placeholder="Enter Email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">
                                Phone
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered h-10"
                            type="text"
                            placeholder="Phone Number"
                            value={user.phone}
                            onChange={(e) =>
                                setUser({ ...user, phone: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">
                                Location
                            </span>
                        </label>
                        <input
                            className="w-full input input-bordered h-10"
                            type="text"
                            placeholder="Current Location"
                            value={user.geolocation}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    geolocation: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex items-center my-4">
                        <div className="flex items-center">
                            <p className="text-black">Male</p>
                            <input
                                type="checkbox"
                                className="checkbox mx-2"
                                checked={user.gender === "male"}
                                onChange={() => handleCheckbox("male")}
                            />
                        </div>
                        <div className="flex items-center mx-4">
                            <p className="text-black">Female</p>
                            <input
                                type="checkbox"
                                className="checkbox mx-2"
                                checked={user.gender === "female"}
                                onChange={() => handleCheckbox("female")}
                            />
                        </div>
                    </div>
                    <p className="text-black text-center my-2">
                        Already have an account?{" "}
                        <Link to={URL.LOGIN_URL}>Login</Link>
                    </p>
                    <div>
                        <button
                            className="w-full px-6 py-2 text-lg rounded-full bg-primary-500 text-center hover:bg-primary-600 text-whitegray shadow-md shadow-primary-200"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
