import React, {useEffect, useState} from "react";
import Alink from "../Alink/Alink";
import SignUpButton from "../Button/SignUpButton";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentCredit } from "../../utils/authSlice";

const Links = () => {
    const { auth } = useAuth();
    let credit = useSelector(selectCurrentCredit)
    const [localCount, setLocalCount] = useState(credit);
    console.log(credit);
    useEffect(() => {
        // Whenever the Redux state changes, update the local state
        setLocalCount(credit);
      }, [credit]);
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
                    <FaLeaf className="text-primary-500 group-hover:text-whitegray"  /> {credit} {" "} C
                    </Link>
                    </SignUpButton>
                </>
            )}
        </div>
    );
};

export default Links;
