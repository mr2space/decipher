import React, { useState, useEffect } from "react";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import SignUpButton from "../Button/SignUpButton";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentCredit } from "../../utils/authSlice";
import { useRef } from "react";

const Alink = ({ text, url }) => {
    return (
        <div className="font-poppins font-semibold text-darkgray text hover:text-black transition-all">
            <Link to={url}> {text} </Link>
        </div>
    );
};

const Links = () => {
    let credit = useSelector(selectCurrentCredit);
    const [localCount, setLocalCount] = useState(credit);
    const data = [
        { url: "/", text: "Home" },
        { url: "/about", text: "About" },
        { url: "/secure", text: "Search" },
    ];
    return (
        <div className="font-medium flex gap-10 items-center">
            {data.map(({ url, text }) => (
                <Alink url={url} text={text} key={text} />
            ))}
            {!credit ? (
                <SignUpButton>
                    <Link
                        to="/auth/login"
                        className="flex flex-row gap-2 items-center justify-center"
                    >
                        <FaLeaf /> Join Us!{" "}
                    </Link>
                </SignUpButton>
            ) : (
                <>
                    <SignUpButton>
                        <Link
                            to="/"
                            className="flex flex-row gap-2 items-center justify-center"
                        >
                            <FaLeaf className="text-primary-500 group-hover:text-whitegray" />{" "}
                            {credit} C
                        </Link>
                    </SignUpButton>
                </>
            )}
        </div>
    );
};

const LogoText = ({ text }) => {
    return (
        <div className="font-semibold text-2xl uppercase font-daysone">
            <Link to={"/"}> {text} </Link>
        </div>
    );
};

const Navbar = () => {
    const navbarRef = useRef(null);
    const [transparent, setTransparent] = useState(true)
    //TODO: ADD SCROLL NAVBAR COLOR CHANGE
    useEffect(()=>{
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            console.log(scrollPosition)
            if (scrollPosition > 1) {
                setTransparent(false);
            } else {
                setTransparent(true);
            }
        });
    }, [])


    return (
        <div className={`${(transparent)? "bg-transparent": "bg-whitegray"} fixed top-0 left-0 w-screen flex gap-5 items-center justify-between px-24 py-6 z-50`} ref={navbarRef}>
            <LogoText text="sanjeevani" />
            <Links />
        </div>
    );
};
export { Links, LogoText };
export default Navbar;
