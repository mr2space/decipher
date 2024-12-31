import { SiTrustpilot } from "react-icons/si";
import { AiOutlineMobile } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";

import { Images } from "../assets";

export const CardsData = [
    {
        id:1,
        title : "Knowledge hub",
        details: "Relaiable and Accurate",
        icon : <SiTrustpilot />,
        image: Images.tree_know_plant
    },
    {
        id:2,
        title : "On Finger Tips",
        details: "Easy and Fas Scanning",
        icon : <AiOutlineMobile />,
        image: Images.app_scan_plant
    },
    {
        id:3,
        title : "Share and Care",
        details: "Share with Friends and Family",
        icon : <FiShare2 />,
        image: Images.app_feature_plant
    },

]