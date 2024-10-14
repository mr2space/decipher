import React from "react";

import { TechStack } from "../../data/TechStack.jsx";

const TechStackSection = () => {
    const renderStack = (tech) => {
        return (
            <div
                key={tech.id}
                className=" flex flex-row justify-evenly items-center gap-1"
                
            >
                {tech.icon} {tech.title}
            </div>
        );
    };
    return (
        <>
            <section className="w-full flex flex-col gap-6 px-24 my-8">
                <h2 className=" text-center text-2xl font-poppins">
                    Reliable, Scalable and Trusted Tech stack
                </h2>
                <div className=" flex flex-row justify-evenly items-center text-3xl font-medium text-slategray"
                >
                    {TechStack.map(renderStack)}
                </div>
            </section>
        </>
    );
};

export default TechStackSection;
