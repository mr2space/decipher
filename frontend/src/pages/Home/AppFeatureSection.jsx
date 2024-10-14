import React from "react";

import { motion } from "framer-motion";
import { Images } from "../../assets";

import { CardsData } from "../../data/AppFeatures";

const Card = ({ id, title, icon, details }) => {
    return (
        <motion.div
            className=" relative w-1/4 h-[500px] overflow-hidden bg-red-400 rounded-2xl"
            initial={{ opacity: 0, y: "4%" }}
            whileInView={{ opacity: 1, y: "0" }}
            viewport={{ once: false }}
            transition={{
                ease: "easeInOut",
                duration: 1,
                delay: id / 2 ,
            }}
        >
            <img
                src={Images.plant1}
                alt="plant 1"
                className=" w-full h-full object-cover"
            />
            <div className="card_detail_box absolute w-full h-1/2 bottom-0 left-0 text-whitegray flex flex-col justify-end gap-4 p-5">
                <div className="title text-2xl font-medium flex items-center gap-3">
                    {title}{" "}
                    <motion.div
                        drag
                        dragConstraints={{
                            top: -0,
                            left: -0,
                            right: 0,
                            bottom: 0,
                        }}
                        className="inline-block cursor-grab"
                    >
                        {icon}
                    </motion.div>
                </div>
                <div className="details text-lg">{details}</div>
            </div>
        </motion.div>
    );
};

const AppFeatureSection = () => {
    return (
        <section id="app-feaure " className="relative h-screen px-24">
            <div className="title text-[3rem] font-medium text-center">
                App Feature
            </div>
            <div className="subheading text-xl mt-1 text-center">
                Know, Recognize, Share
            </div>
            <div className="wrapper relative h-[550px] w-full mt-10">
                <div className="wrapper w-full flex justify-around items-center">
                    {CardsData.map((items) => (
                        <Card key={items.id} {...items} />
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    delay: 0.7,
                }}
                className=" absolute top-[15%] -z-10"
            >
                <motion.div
                    initial={{ width: "400px", height: "400px" }} // Tailwind's bg-red-400
                    animate={{ width: "300px", height: "300px" }} // Tailwind's bg-green-400
                    transition={{
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2,
                    }}
                    className="Bg_yellow bg-secondary-200 relative w-[400px] h-[400px] blur-[100px] left-[-100px] -z-10"
                ></motion.div>
                <motion.div
                    initial={{ width: "200px", height: "200px" }} // Tailwind's bg-red-400
                    animate={{ width: "100px", height: "100px" }} // Tailwind's bg-green-400
                    transition={{
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2,
                    }}
                    className="Bg_yellow bg-secondary-500 relative  w-[200px] h-[200px] left-[-150px] blur-[90px] -z-10"
                ></motion.div>
            </motion.div>
        </section>
    );
};

export default AppFeatureSection;
