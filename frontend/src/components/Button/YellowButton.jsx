import React from "react";

const YellowButton = ({ children, handleClick }) => {
    return (
        <div
            onClick={handleClick}
            className="px-10 w-auto py-2 rounded-full bg-secondary-500 hover:bg-secondary-400 text-black cursor-pointer text-xl flex justify-center items-center"
        >
            {children}
        </div>
    );
};

export default YellowButton;
