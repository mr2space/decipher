import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const Selection = ({
  title,
  containerStyles,
  textStyles,
  isActive,
  handlePress,
}) => {




  return (
    <View>
        {isActive? <CustomButton
        title={title}
        handlePress={handlePress}
        containerStyles="px-3 py-2 border border-1  bg-primary-300 mr-4"
        textStyles="text-xs"
      />: <CustomButton
      title={title}
      handlePress={handlePress}
      containerStyles="px-3 py-2 bg-secondary-300 border border-1  mr-4"
      textStyles="text-xs"
    />}
      
    </View>
  );
};

export default Selection;
