import React, {useState} from "react";
import { components } from "../../components";
import { Images, Vectors } from "../../assets";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../utils/authSlice";
import HomeSearch from "../../components/Search/HomeSearch";
import { motion } from "framer-motion";

const HomeSection = () => {

    const user = useSelector(selectCurrentUser);
    return (
        <>
            <section className=" w-full h-screen overflow-y-hidden flex flex-col gap-10 justify-center items-center z-10 font-poppins">
                <div className="wrapper mt-[80px] h-full w-full">
                    <div className="flex flex-row items-center justify-between w-full px-24 h-full ">
                        <div className="left__box w-3/4 h-full flex flex-col justify-evenly items-start">
                            <div className="heading__content flex flex-col gap-5">
                                <motion.div
                                    initial={{ opacity: 0, y: "10%" }}
                                    whileInView={{ opacity: 1, y: "0" }}
                                    viewport={{ once: true }}
                                    transition={{
                                        ease: "easeInOut",
                                        duration: 1,
                                        delay: 0.5,
                                    }}
                                >
                                    <div className="title_hero font-semibold font-poppins text-[80px] ">
                                        Indulge In Herbal Technology
                                        <motion.img
                                            drag
                                            dragConstraints={{
                                                top: -0,
                                                left: -0,
                                                right: 0,
                                                bottom: 0,
                                            }}
                                            src={Vectors.plant1}
                                            className=" inline-block ml-5 cursor-grab"
                                            alt="plant vector"
                                        />
                                    </div>
                                    <div className="subtitle_hero font-poppins text-[26px] pl-2">
                                        We believe future of Aurveda is here
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: "10%" }}
                                    whileInView={{ opacity: 1, y: "0" }}
                                    viewport={{ once: true }}
                                    transition={{
                                        ease: "easeInOut",
                                        duration: 1,
                                        delay: 1,
                                    }}
                                >
                                    <div className="button__group flex flex-row justify-between mt-5 w-[425px]">
                                        {user ? (
                                            <HomeSearch />
                                        ) : (
                                            <>
                                                <components.GreenButton>
                                                    Sign up!
                                                </components.GreenButton>

                                                <components.TransparentButton>
                                                    Docs
                                                </components.TransparentButton>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: "10%" }}
                                whileInView={{ opacity: 1, y: "0" }}
                                viewport={{ once: true }}
                                transition={{
                                    ease: "easeInOut",
                                    duration: 1,
                                    delay: 1.5,
                                }}
                            >
                                <div className="team__box flex justify-center items-center flex-row w-[400px]  transform translate-y-8">
                                    <div className="profile_img_box">
                                        <components.TeamCircle
                                            imageUrl={Images.plant1}
                                        />
                                        <components.TeamCircle
                                            imageUrl={Images.plant1}
                                            left={"-40%"}
                                        />
                                        <components.TeamCircle
                                            imageUrl={Images.plant1}
                                            left={"-80%"}
                                        />
                                    </div>
                                    <div className="content_box flex gap-[1rem] transform translate-x-[-2rem]">
                                        <div className="wrapper text-[3.3rem] text-primary-500">
                                            <FaCanadianMapleLeaf />
                                        </div>
                                        <div className="team_info">
                                            <div className="subheading font-normal text-sm">
                                                Our Contributor
                                            </div>
                                            <div className="team_name font-medium text-lg">
                                                Team Initiate
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: "4%" }}
                            whileInView={{ opacity: 1, y: "0" }}
                            viewport={{ once: true }}
                            transition={{
                                ease: "easeInOut",
                                duration: 1,
                                delay: 0.7,
                            }}
                            className="wrapper relative w-2/10 h-full flex justify-center items-center "
                        >
                            <components.HeroImage />
                            <div className="hero__logo absolute bottom-[20%] left-[-75px] bg-secondary-500 w-[150px] h-[150px] rounded-full"></div>
                            <div className="absolute top-[10%] left-[-10%]">
                                <motion.img
                                    drag
                                    dragConstraints={{
                                        top: -0,
                                        left: -0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    src={Images.leaf1}
                                    alt="leaf plant"
                                    className="w-[70px] cursor-grab"
                                />
                            </div>
                        </motion.div>
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
                        className="Bg_yellow bg-secondary-200 absolute top-[12%] w-[400px] h-[400px] blur-[100px] left-[-100px] -z-10"
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
                        className="Bg_yellow bg-secondary-500 absolute top-[18%]  w-[200px] h-[200px] left-[-150px] blur-[80px] -z-10"
                    ></motion.div>
                </motion.div>
                {/* <components.LoadingTip /> */}
            </section>
        </>
    );
};

export default HomeSection;
