import React from "react";
import Components from "../components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { detailsSpeciesText, photoSpeciesScan } from "../../utils/speciesSlice";
import { URL } from "../../data";

const HomeSearch = () => {
    const url = ["/search", "/photo_upload"];
    const uploadRef = useRef(null);
    const variants = {
        openGreen: { opacity: 1, y: "0" },
        closedGreen: { opacity: 0, y: 0 },
        openYellow: { opacity: 1, y: 0 },
        closedYellow: { opacity: 0, y: "10px" },
    };

    const [isText, setIsText] = useState(false);

    const dispatch = useDispatch();

    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();

    const [value, setValue] = useState("");

    const inputBox = useRef(null);

    const handleFocus = () => {
        if (isText && value === "") {
            setIsText(false);
            return;
        }
        setIsText(true);
    };

    const handleTextSubmit =() => {
        try {
            dispatch(detailsSpeciesText({axiosPrivate: axiosPrivate, species:value, location:null}));
            setValue("");
            navigate(URL.SPECIES_SEARCH_URL, { from: location, replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpload = async () => {
        try {
            const ele = uploadRef.current;
            const file = ele.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("photo", file);
                dispatch(photoSpeciesScan({axiosPrivate:axiosPrivate, formData:formData}))
                navigate(URL.SPECIES_REACT_URL, { from: location, replace: true });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleButtonUploadClick = () => {
        const ele = uploadRef.current;
        ele.click();
        ele.addEventListener("change", async () => {
            handleUpload();
        });
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                ref={inputBox}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onFocus={handleFocus}
                onBlur={handleFocus}
                placeholder="search for any herb"
                className="w-full h-11 rounded-full shadow-md shadow-gray-500 focus:border-0 outline-none px-6 py-2"
            />
            <div className="button_box absolute right-0 top-0">
                <AnimatePresence>
                    {isText ? (
                        <>
                            <motion.div
                                onClick={handleTextSubmit}
                                initial={{ y: "10px" }}
                                animate={isText ? "openGreen" : "closedGreen"}
                                variants={variants}
                                exit={{ opacity: 0 }}
                            >
                                <Components.GreenButton>
                                    Search
                                </Components.GreenButton>
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <form
                                action=""
                                method="post"
                                initial={{ y: "0px" }}
                                animate={!isText ? "closedYellow" : "openYellow"}
                                variants={variants}
                                exit={{ opacity: 0 }}
                            >
                                <input
                                    type="file"
                                    name="photo"
                                    id="photo"
                                    className=" hidden"
                                    ref={uploadRef}
                                />
                                <Components.YellowButton
                                    handleClick={handleButtonUploadClick}
                                >
                                    Upload
                                </Components.YellowButton>
                            </form>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HomeSearch;
