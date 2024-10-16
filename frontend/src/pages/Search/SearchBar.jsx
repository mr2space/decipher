import React from "react";

import { components } from "../../components";

import { IoSearch } from "react-icons/io5";

const SpecialYellowBtn = ({children, handleClick}) => {
    return (
        <div
            onClick={handleClick}
            className="px-10 w-auto py-2 rounded-full border border-secondary-500 bg-secondary-500 hover:bg-secondary-400 text-black cursor-pointer text-xl flex justify-center items-center gap-4 "
        >
            {children}
        </div>
    );
};


const SpecialTransparentBtn = ({children, handleClick})=>{
    return (
        <div
            onClick={handleClick}
            className="px-10 py-2 rounded-full bg-transparent border border-black  text-black cursor-pointer text-xl hover:bg-black hover:text-white transition-all"
        >
            {children}
        </div>
    )
}


const SpecialGreenBtn = ({children, handleClick})=>{
    return (
        <div
            onClick={handleClick}
            className="px-10 w-auto py-2 rounded-full bg-primary-500 hover:bg-primary-600 text-whitegray cursor-pointer text-xl flex justify-center items-center"
        >
            {children}
        </div>
    )
}




const SearchBar = () => {
    return (
        <div className=" w-3/5">
            <div className="search-box w-full text-lg relative font-medium text-gray-900">
                <input
                    className=" w-full h-full py-3 pl-14 rounded-full shadow-md shadow-gray-500 outline-none"
                    type="text"
                    placeholder="Search for Herb, Remedies and Location"
                />
                <div className="icon absolute top-[25%] left-4 text-[1.7rem] text-darkgray ">
                    <IoSearch />
                </div>
            </div>
            <div className="btn-box flex flex-row gap-4 mt-5 ml-4">
                <SpecialGreenBtn>Medical</SpecialGreenBtn>
                <SpecialYellowBtn>Location</SpecialYellowBtn>
                <SpecialTransparentBtn>Species</SpecialTransparentBtn>
            </div>
        </div>
    );
};

export default SearchBar;
