import React from "react";
import { components } from "../../components";
import { Images, Vectors } from "../../assets";
import { FaCanadianMapleLeaf } from "react-icons/fa6";


const Home = () => {
    return (
        <>
            <components.Navbar />
            <section className="w-full h-screen overflow-x-hidden flex flex-col gap-10 justify-center items-center z-10 font-poppins">
                <div className="wrapper mt-[80px] h-full w-full">
                    <div className="flex flex-row items-center justify-between w-full px-24 h-full ">
                        <div className="left__box flex-1 h-full">
                            <div className="heading__content mt-40">
                                <div className="title_hero font-semibold font-poppins text-[80px] ">
                                    Indulge In Herbal Technology
                                    <img
                                        src={Vectors.plant1}
                                        className=" inline-block ml-5"
                                        alt="plant vector"
                                    />
                                </div>
                                <div className="subtitle_hero font-poppins text-[26px] pl-2 mt-4">
                                    We believe future of Aurveda is here
                                </div>
                            </div>

                            <div className="button__group flex flex-row justify-between px-2 w-[425px] mt-[50px]">
                                <components.GreenButton>
                                    Sign up!
                                </components.GreenButton>

                                <components.TransparentButton>
                                    Docs
                                </components.TransparentButton>
                            </div>

                            <div className="team__box flex justify-center items-center flex-row w-[400px]  mt-16">
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
                        </div>
                        <div className="wrapper relative">
                            <components.HeroImage />
                            <div className="hero__logo absolute bottom-[20%] left-[-75px] bg-secondary-500 w-[150px] h-[150px] rounded-full"></div>
                            <div className="absolute top-[10%] left-[-10%]">
                                <img
                                    src={Images.leaf1}
                                    alt="leaf plant"
                                    className="w-[70px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Bg_yellow bg-secondary-500 rotate-45 absolute top-[16%] left-[-3%] transf w-52 h-32 blur-[75px] -z-10"></div>
                <div className="Bg_yellow bg-secondary-500 rotate-45 absolute top-[28%] left-[-3%] transf w-56 h-32 blur-[85px] -z-10"></div>
            </section>
        </>
    );
};

export default Home;
