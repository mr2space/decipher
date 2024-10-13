import React from "react";
import Alink from "../Alink/Alink";
import SignUpButton from "../Button/SignUpButton";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Links = () => {
    const { auth } = useAuth();
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
            {!auth.user ? (
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
                    <FaLeaf className="text-primary-500 group-hover:text-whitegray"  /> {auth?.user?.credit} {" "} C
                    </Link>
                    </SignUpButton>
                </>
            )}
        </div>
    );
};

export default Links;
