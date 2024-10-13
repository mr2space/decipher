import React  from "react";
import Components from "../components";
import { MdOutlineFileUpload } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const HomeSearch = () => {
    const url = ["/search", "/photo_upload"];
    const uploadRef = useRef(null);

    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();

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

    const handleTextSubmit = async () => {
        try {
            const response = await axiosPrivate.post(
                "/search",
                { species: value },
                {
                    withCredentials: true,
                }
            );
            // navigate()
            //TODO: work to navigate
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpload = async ()=>{
        try {
            const ele = uploadRef.current
            const file = ele.files[0];
            if (file){
                const formData = new FormData();
                formData.append("photo", file);
                const response = await axiosPrivate.post("/upload", formData, {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(response);
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleButtonUploadClick = ()=>{
        const ele = uploadRef.current
        ele.click();        
        ele.addEventListener('change', async ()=>{
            handleUpload()
        })
    }



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
                {text ? (
                    <>
                        <div onClick={handleTextSubmit}>
                            <Components.GreenButton>
                                Search
                            </Components.GreenButton>
                        </div>
                    </>
                ) : (
                    <>
                        <form action="" method="post">
                            <input type="file" name="photo" id="photo" className=" hidden" ref={uploadRef} />
                            <Components.YellowButton handleClick={handleButtonUploadClick}>
                                    Upload
                            </Components.YellowButton>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomeSearch;
