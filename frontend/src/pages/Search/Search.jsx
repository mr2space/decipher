import React from "react";

import { Images, Vectors } from "../../assets";

import { motion } from "framer-motion";

import SearchHeroSection from "./SearchHeroSection";

import ResultSection from "./ResultSection";


const Search = () => {
    let idx = 0;
    const contents = [<SearchHeroSection key={idx} />];
    idx += 1;
    contents.push(<ResultSection key={idx} />);
    idx += 1
    return <>{contents.map((content) => content)}</>;
};

export default Search;
