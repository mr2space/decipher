import React from "react";
import { components } from "../../components";

const Home = () => {
    return (
        <>
            <components.Navbar />
            <section className="w-full h-screen flex flex-col gap-10 justify-center items-center z-10">
                <div className="wraaper mt-[80px] h-full w-full">
                    <div className="flex flex-row items-center justify-between w-full px-24 h-full ">
                        <div className="left__box h-full">
                            <div className="heading__content mt-28">
                                <div className="title_hero font-semibold font-poppins text-[80px] ">
                                    Indulge In Herbal Technology
                                </div>
                                <div className="subtitle_hero font-poppins text-[26px] pl-2 mt-4">
                                    We believe future of Aurveda is here
                                </div>
                            </div>

                            <div className="button__group flex flex-row justify-between px-2 w-[425px] mt-[50px]">
                                <components.GreenButton>
                                    <p>Sign Up</p>
                                </components.GreenButton>

                                <components.TransparentButton>
                                    Docs
                                </components.TransparentButton>
                            </div>
                        </div>
                        <components.HeroImage />
                    </div>
                </div>
                <div className="Bg_yellow bg-secondary-500 rotate-45 absolute top-[16%] left-[-3%] transf w-52 h-32 blur-[75px] -z-10"></div>
                <div className="Bg_yellow bg-secondary-500 rotate-45 absolute top-[28%] left-[-3%] transf w-56 h-32 blur-[85px] -z-10"></div>
            </section>
        </>
    );
};

export default Home;
