import React from "react";
import { Images } from "../../assets";

const HeroImage = () => {
    return (
        <>
            <div className="image__box w-[450px] h-[650px] object-fill overflow-hidden rounded-t-full rounded-br-[70em] rounded-bl-full">
                <img src={Images.plant2} alt="plant image" />
            </div>
        </>
    );
};

export default HeroImage;
