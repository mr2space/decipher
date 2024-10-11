import React from "react";
import Components from "../components";
import { MdOutlineFileUpload } from "react-icons/md";
import { useRef } from "react";
import { useEffect, useState } from "react";

const HomeSearch = () => {
    const url = ["/search", "/photo_upload"]
    const [value, setValue] = useState("");
    const [text, setText] = useState(false);
    const inputBox = useRef(null);
    const handleFocus = () => {
        if (text && value === "") {
            setText(false);
            return;
        }
        setText(true);
    };

    return (
        <form action="/" method="post">
            <div className="w-[30rem] relative">
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
                    {text ? (
                        <>
                        
                        <Components.GreenButton>
                            Search
                        </Components.GreenButton>

                        </>
                    ) : (
                        <>
                            <Components.YellowButton>
                                Upload
                            </Components.YellowButton>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
};

export default HomeSearch;
