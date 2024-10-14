import React from "react";
import { Images } from "../../assets";
import { components } from "../../components";

import { FaDownload } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { GiCurledLeaf } from "react-icons/gi";

import { motion } from "framer-motion";

const AppSection = () => {
    return (
        <section className="flex justify-center items-center relative h-screen">
            <div className="flex__box flex flex-row items-center justify-between w-full h-[calc(100%-80px)] px-24">
                <div className="wrapper w-2/10 h-full flex justify-center items-center relative">
                    <div className="image_box w-full h-4/5 rounded-b-full rounded-tr-[70em] rounded-tl-full bg-primary-100 overflow-hidden">
                        <img
                            src={Images.plant2}
                            alt="plant image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute top-[10%] left-[110%]">
                        <motion.div
                            drag
                            dragConstraints={{
                                top: -0,
                                left: -0,
                                right: 0,
                                bottom: 0,
                            }}
                            alt="leaf plant"
                            className="w-[70px] cursor-grab text-[4rem] text-secondary-400 drop-shadow-2xl"
                        >
                            <GiCurledLeaf />
                        </motion.div>
                    </div>
                </div>
                <div className="wrapper w-3/4 h-4/5 pl-24 py-16 flex flex-col justify-start gap-32">
                    <div className="wrapper">
                        <motion.div className="title text-[4rem] font-semibold font-poppins">
                            One App for All herbs <br /> knowledge{" "}
                            <div className="  inline-block translate-y-5 text-primary-400 text-[5rem] cursor-grab">
                                <motion.div
                                    drag
                                    dragConstraints={{
                                        top: -0,
                                        left: -0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <BiLogoPlayStore />
                                </motion.div>
                            </div>
                        </motion.div>
                        <div className="subheading text-2xl mt-4">
                            Download our App on Android
                        </div>
                    </div>

                    <div className="wrapper flex flex-row w-full gap-48">
                        <components.YellowButton>
                            Download <FaDownload />
                        </components.YellowButton>

                        <components.TransparentButton>
                            Know More
                        </components.TransparentButton>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    delay: 0.7,
                }}
                className="absolute w-full h-full -z-10"
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
                    className="Bg_yellow bg-primary-200 absolute top-[12%] w-[400px] h-[400px] blur-[100px] right-[-100px] -z-10"
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
                    className="Bg_yellow bg-primary-500 absolute top-[18%]  w-[200px] h-[200px] right-[-150px] blur-[80px] -z-10"
                ></motion.div>
            </motion.div>
        </section>
    );
};

export default AppSection;
