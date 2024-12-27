import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

const App = () => {

  return (
    <View className="flex-1 bg-gray-900">
      <CameraView className="flex-1" facing={"back"} >
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity className="w-20 px-4 py-2 bg-blue-500 text-white rounded">
            <Text className="text-white">Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default App;
