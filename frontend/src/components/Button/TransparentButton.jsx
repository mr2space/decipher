import React from "react";

const TransparentButton = ({handleClick, children}) => {
    return (
        <div
            onClick={handleClick}
            className="px-8 py-2 rounded-full bg-transparent border border-black  text-black cursor-pointer text-xl hover:bg-black hover:text-white transition-all"
        >
            {children}
        </div>
    );
};

export default TransparentButton;
