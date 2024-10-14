import React from "react";
import { Images } from "../../assets";

const HeroImage = () => {
    return (
        <>
            <div className="image__box w-full h-4/5 object-fill overflow-hidden rounded-t-full rounded-br-[70em] rounded-bl-full bg-primary-100">
                <img src={Images.plant2} alt="plant image" className="w-full h-full object-cover" />
            </div>
        </>
    );
};

export default HeroImage;
