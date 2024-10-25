import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AntDesign from "@expo/vector-icons/AntDesign";

const PhotoPreview = ({ photo, setPhoto, handleSubmit, handleRetake }) => {

  return (
    <SafeAreaView>
      <View className="w-full h-full  px-5 space-y-6 pt-5">
        <View className="w-full pl-2">
          <Text className="text-2xl text-black font-pmedium">
            Confirm Before Submission
          </Text>
        </View>
        <View className="w-full flex flex-row justify-center items-center">
          <View className="w-[95%] h-[55vh] ">
            <Image
              source={{ uri: photo.uri }}
              className="w-full h-full rounded-3xl overflow-hidden"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="w-full flex flex-row justify-around items-center ">
          <View className="">
            <TouchableOpacity onPress={handleRetake}>
              <AntDesign name="reload1" size={40} color="#EB5353" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={handleSubmit}>
              <AntDesign name="checkcircle" size={40} color="#36AE7C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PhotoPreview;
