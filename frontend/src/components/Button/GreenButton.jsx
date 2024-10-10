import React from "react";

const GreenButton = ({ children, handleClick }) => {
    return (
        <div
            onClick={handleClick}
            className="px-8 py-2 rounded-full bg-primary-500 hover:bg-primary-600 text-whitegray cursor-pointer text-xl"
        >
            {children}
        </div>
    );
};

export default GreenButton;
