import React from "react";
import { components } from "../../components";
import { FaLeaf } from "react-icons/fa";

export const ComponentsPage = () => {
    return (
        <section className="w-full h-screen bg-whitegray flex flex-col gap-10 justify-center items-center">
                <components.Navbar />
                <components.HeroImage />
        </section>
    );
};