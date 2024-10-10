import React from "react";
import { Images } from "../../assets";

const HeroImage = () => {
    return (
        <>
            <div className="image__box w-[475px] h-[625px] object-fill overflow-hidden rounded-t-full rounded-br-md rounded-bl-full">
                <img src={Images.plant2} alt="plant image" />
            </div>
        </>
    );
};

export default HeroImage;
