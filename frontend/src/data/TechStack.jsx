import React from "react"

import { FaNodeJs } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { SiTerraform } from "react-icons/si";

export const TechStack = [
    {
        id:1,
        icon: <FaNodeJs />,
        title : "MERN"
    },
    {
        id:2,
        icon: <FaReact />,
        title: "React Native"
    },
    {
        id:3,
        icon: <FaPython />,
        title : "Python"
    },
    {
        id:4,
        icon: <SiGooglegemini />,
        title: "Gemini"
    },
    {
        id:5,
        icon:<SiTerraform />,
        title: "Terraform"
    }

]