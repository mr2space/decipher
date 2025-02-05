import React from "react";

import { Images, Vectors } from "../../assets";

import { motion } from "framer-motion";

import SearchHeroSection from "./SearchHeroSection";

import ResultSection from "./ResultSection";

import { useSelector } from "react-redux";
import { selectCurrentMedicineData } from "../../utils/medicineSlice";
import { selectSpecies } from "../../utils/speciesSlice";

import MedicineSection from "./MedicineSection";

const Search = () => {
    const { status } =
            useSelector(selectSpecies);
    const data = useSelector(selectCurrentMedicineData);
    let idx = 0;
    const contents = [<SearchHeroSection key={idx} />];
    idx += 1;
    if (status){
        contents.push(<ResultSection key={idx} />);
    }
    if(data){
        contents.push(<MedicineSection key={idx} />);
    }
    idx += 1
    return <>{contents.map((content) => content)}</>;
};

export default Search;
