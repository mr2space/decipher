import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectSpecies } from "../../utils/speciesSlice";
import LoadingSkeleton from "../../components/Loading/CardLoading";
import TextLoading from "../../components/Loading/TextLoading";
import { Images, Vectors } from "../../assets";
import Footer from "../../components/Footer/Footer";

const ResultSection = () => {
    const { data, species, status, locations, photoURL, error, score } =
        useSelector(selectSpecies);
    console.log({ data, species, status, locations, photoURL, error });

    return (
        <>
        <section className="w-full h-screen flex flex-col gap-10 justify-center items-center z-10 font-poppins">
            <div className="wrapper mt-[80px] h-full w-full">
                <div className="flex flex-row-reverse gap-16 items-center justify-between w-full px-24 h-full ">
                    <div className="left__box w-3/4 h-full flex flex-col justify-evenly items-start">
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
                            <div className="subtitle_hero font-poppins font-medium text-[26px] pl-2">
                                Species
                            </div>
                            <div className="flex title_hero font-semibold font-poppins text-[80px]">
                                {/* Ensure loading effect works for species */}
                                {status === "loading" ? (
                                    <TextLoading
                                            width="w-[15rem]"
                                            height="h-10"
                                            margin="mt-2 mb-4"
                                        />
                                ) : status === "400" ? (
                                    "Tulsi"
                                ) : (
                                    species || "Network Error"
                                )}
                                <motion.img
                                    drag
                                    dragConstraints={{
                                        top: -0,
                                        left: -0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    src={Vectors.plant1}
                                    className="inline-block ml-5 cursor-grab"
                                    alt="plant vector"
                                />
                            </div>
                            <div className="font-medium text-[22px] ml-4">
                                {"   "}
                                <span>Score:</span>
                                <div className="inline-block subtitle_hero font-poppins font-medium text-[22px] pl-2">
                                    {status === "loading" ? (
                                        <div className="pt-4 justify-center items-center">
                                        <TextLoading
                                            width="w-[15rem]"
                                            height="h-8"
                                            margin="mx-2"
                                        />
                                        </div>
                                    ) : (
                                        score || "N/A"
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        <div className="w-4/5 flex flex-col justify-center items-start gap-4">
                            <div className="wrapper">
                                <div className="heading text-[1.8rem] font-medium">
                                    Description
                                </div>
                                <p className="pl-2">
                                    {status === "loading" ? (
                                        <TextLoading
                                            width="w-[35rem]"
                                            height="h-8"
                                            margin="mt-2 mb-4"
                                        />
                                    ) : status === "400" ? (
                                        "demo"
                                    ) : (
                                        data?.description || "N/A"
                                    )}
                                </p>
                            </div>
                            <div className="wrapper">
                                <div className="heading text-[1.8rem] font-medium">
                                    Properties
                                </div>
                                <p className="pl-2">
                                    {status === "loading" ? (
                                        <TextLoading
                                            width="w-[28rem]"
                                            height="h-8"
                                            margin="mt-2 mb-4"
                                        />
                                    ) : status === "400" ? (
                                        "demo2"
                                    ) : (
                                        data?.properties || "N/A"
                                    )}
                                </p>
                            </div>
                            <div className="wrapper">
                                <div className="heading text-[1.8rem] font-medium">
                                    Helps in
                                </div>
                                <p className="pl-2">
                                    {status === "loading" ? (
                                        <TextLoading
                                            width="w-[35rem]"
                                            height="h-8"
                                            margin="mt-2 mb-4"
                                        />
                                    ) : status === "400" ? (
                                        "demo2"
                                    ) : (
                                        data?.helpful_in || "N/A"
                                    )}
                                </p>
                            </div>
                            <div className="wrapper">
                                <div className="heading text-[1.8rem] font-medium">
                                    Benefits
                                </div>
                                <p className="pl-2">
                                    {status === "loading" ? (
                                        <TextLoading
                                            width="w-[28rem]"
                                            height="h-8"
                                            margin="mt-2 mb-4"
                                        />
                                    ) : status === "400" ? (
                                        "demo2"
                                    ) : (
                                        data?.benefits || "N/A"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="right__box w-1.5/3 relative h-full flex justify-center items-center">
                        {status === "loading" ? (
                            <LoadingSkeleton />
                        ) : (
                            <div className="image_box w-full h-4/5 rounded-[2rem] bg-primary-100 overflow-hidden">
                                <img
                                    src={
                                        status === "400"
                                            ? Images.plant1
                                            : photoURL || Images.plant1
                                    }
                                    alt="plant image"
                                    className="w-full h-full aspect-[3/4] object-cover"
                                />
                            </div>
                        )}
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
                    initial={{ width: "400px", height: "400px" }}
                    animate={{ width: "300px", height: "300px" }}
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
                    initial={{ width: "200px", height: "200px" }}
                    animate={{ width: "100px", height: "100px" }}
                    transition={{
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2,
                    }}
                    className="Bg_yellow bg-primary-500 absolute top-[18%] w-[200px] h-[200px] right-[-150px] blur-[80px] -z-10"
                ></motion.div>
            </motion.div>
        </section>
        <Footer/>
        </>
    );
};

export default ResultSection;
