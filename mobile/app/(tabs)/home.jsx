import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import {
  selectCurrentCredit,
  selectCurrentUser,
} from "../../scripts/authSlice";
import { images } from "../../constants";

import CustomButton from "../../components/CustomButton";
import Selection from "../../components/Selection";
import SearchInput from "../../components/SearchInput";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Home = () => {
  const user = useSelector(selectCurrentUser);
  const credit = useSelector(selectCurrentCredit);

  // use state for plant selection and medicine selection

  const [plant, setPlant] = useState(1);
  const [medicine, setMedicine] = useState(0);
  const handlePlantSubmission = () => {};
  const handleMedicineSubmission = () => {};
  let handleSubmission = () => {};

  const handlePress = (state, fn) => {
    if (state != plant) {
      setPlant(0);
    } else {
      setMedicine(0);
    }
    fn(1);
  };
  if (plant) {
    handleSubmission = handlePlantSubmission;
  } else {
    handleSubmission = handleMedicineSubmission;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full h-full space-y-7 px-4">
          {/* credit and profile view below  */}

          <View className="w-full flex flex-row justify-between items-center mt-5">
            <View className="w-[75px] py-2 border border-black justify-center items-center rounded-full">
              <Text>{credit} C</Text>
            </View>

            <View>
              <Image
                source={images.plant_logo_min}
                className="w-[50px] h-[40px]"
                resizeMode="contain"
              />
            </View>
          </View>

          {/* search box and swipe options were here  */}

          <View>
            <View className="w-full flex flex-row ">
              <Selection
                title="Plant"
                handlePress={() => {
                  handlePress(plant, setPlant);
                }}
                isActive={plant}
              />

              <Selection
                title="Medicine"
                handlePress={() => handlePress(medicine, setMedicine)}
                containerStyles="px-2 py-2 border border-1 bg-secondary-300 mr-4"
                textStyles="text-xs"
                isActive={medicine}
              />
            </View>

            <SearchInput
              containerStyles="mt-4"
              placeholder={
                plant ? "Search any Plant" : "Search for any remedies"
              }
              path={plant ? "/search" : "/solution"}
            />
          </View>

          {/* Camera and file upload */}

          <View className="flex flex-row w-full justify-around">
            <View className="h-[70px] w-1/2 bg-green-200 border border-green-800 rounded-2xl  justify-center items-center">
              <Ionicons name="camera-outline" size={24} color="black" />
            </View>

            <View className="h-[70px] w-1/2 bg-orange-100 border-orange-700 border rounded-xl justify-center items-center text-orange-400">
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={32}
                color="#E85C0D"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
