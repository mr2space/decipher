import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectCurrentMedicine } from "../../utils/medicineSlice";
import TextLoading from "../../components/Loading/TextLoading";
import { Vectors } from "../../assets";
import Footer from "../../components/Footer/Footer";

const MedicineSection = () => {
    const { data, problem, status } = useSelector(selectCurrentMedicine);
    console.log(data, problem, status);

    return (
        <>
            <section className="w-full h-min-screen flex flex-col gap-10 justify-center items-center z-10 font-poppins">
                <div className="wrapper mt-[80px] h-full w-full">
                    <div className="mx-24 ">
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
                                    Problem
                                </div>
                                <div className="flex title_hero font-semibold font-poppins text-[80px]">
                                    {status === "loading" ? (
                                        <TextLoading
                                            width="w-[15rem]"
                                            height="h-10"
                                            margin="mt-2 mb-4"
                                        />
                                    ) : status === "400" ? (
                                        "NetError"
                                    ) : (
                                        problem || "NetError"
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
                            </motion.div>

                            {/* Single Merged Box for all details */}
                            {data.remedies.map((remedy, index) => (
                                <div
                                    key={index}
                                    className="bg-white bg-opacity-50 p-6 rounded-lg shadow-xl w-4/5 flex flex-col gap-4 mb-8"
                                >
                                    {/* Name Section */}
                                    <div className="heading text-[1.8rem] font-medium text-green-700">
                                        {status === "loading" ? (
                                            <TextLoading
                                                width="w-[35rem]"
                                                height="h-8"
                                                margin="mt-2 mb-4"
                                            />
                                        ) : status === "400" ? (
                                            "NA"
                                        ) : (
                                            remedy.name || "NA"
                                        )}
                                    </div>

                                    {/* Properties Section */}
                                    <div className="text-[1.2rem] font-medium">
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
                                            "NA"
                                        ) : (
                                            remedy.description || "NA"
                                        )}
                                    </p>

                                    {/* Benefits Section */}
                                    <div className="text-[1.2rem] font-medium">
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
                                            "NA"
                                        ) : (
                                            remedy.benefits || "NA"
                                        )}
                                    </p>

                                    {/* Notes Section */}
                                    <div className="text-[1.2rem] font-medium">
                                        Note
                                    </div>
                                    <p className="pl-2">
                                        {status === "loading" ? (
                                            <TextLoading
                                                width="w-[28rem]"
                                                height="h-8"
                                                margin="mt-2 mb-4"
                                            />
                                        ) : status === "400" ? (
                                            "NA"
                                        ) : (
                                            remedy.notes || "NA"
                                        )}
                                    </p>
                                </div>
                            ))}
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
            <Footer />
        </>
    );
};

export default MedicineSection;
