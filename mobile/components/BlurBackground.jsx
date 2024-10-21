import { View, Text, Image } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { images } from "../constants";

const BlurBackground = ({}) => {
  return (
    <View>
        <Image source={images.yellow} className="w-10 h-10 shadow-black shadow-xl" />
    </View>
  );
};

export default BlurBackground;
