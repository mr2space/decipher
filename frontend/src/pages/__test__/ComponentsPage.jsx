import React from "react";
import { components } from "../../components";
import { FaLeaf } from "react-icons/fa";

export const ComponentsPage = () => {
    return (
        <section className="w-full h-screen bg-whitegray flex flex-col gap-10 justify-center items-center">
            <div className="flex gap-20">
                <components.GreenButton>
                    Sign Up
                </components.GreenButton>
                <components.TransparentButton>
                    Docs
                </components.TransparentButton>
                <components.SignUpButton>
                <FaLeaf /> <p>Join Us!</p>
                </components.SignUpButton>
            </div>
        </section>
    );
};
