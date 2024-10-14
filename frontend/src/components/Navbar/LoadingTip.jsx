import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const LoadingTip = () => {
    return (
        <div className="fixed flex justify-start gap-5 items-center bottom-2 right-5 w-1/4 h-14 bg-sky-200 border-2 border-sky-600 rounded-xl">
            <InfinitySpin
                visible={true}
                width="100"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
            />{" "}
            LoadingTip
        </div>
    );
};

export default LoadingTip;
