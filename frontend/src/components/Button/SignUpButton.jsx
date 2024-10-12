import React from 'react'

const SignUpButton = ({children, handleClick}) => {
    return (
        <div
            onClick={handleClick}
            className="px-5 py-1 text-black bg-transparent border border-black rounded-full flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-all "
        >
            {children}
        </div>
    );
}

export default SignUpButton;