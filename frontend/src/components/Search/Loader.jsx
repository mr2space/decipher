import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="loader w-full h-screen fixed top-0 left-0 flex justify-center items-center">
            <div>
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <div className=" text-2xl font-semibold font-poppins">
                    Loading ...{" "}
                </div>
            </div>
        </div>
    );
};

export default Loader;
