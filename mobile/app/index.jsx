import React, {useEffect} from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import useRefreshToken from "../hook/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentData } from "../scripts/authSlice";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import BlurBackground from "../components/BlurBackground";


const App = () => {
  const refresh = useRefreshToken();
  const {user} = useSelector(selectCurrentData);
  useEffect(()=>{
    let isMounted = true;
    const verifyRefreshToken = async ()=>{
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      }
    };
    verifyRefreshToken();
    return ()=>(isMounted=false);
  }, [])

  if (user){
    return <Redirect href="/home" />
  }
  return (
    <SafeAreaView className=" bg-whitegray h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.plant_logo}
            className="w-[80px] h-[80px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-darkgray font-bold text-center">
              Indulge in Herbal{"\n"}
              Tech with <Text className="text-secondary-500">Sanjeevani</Text>
            </Text>
          </View>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full py-3 mt-10 bg-primary-400"
            textStyles="text-whitegray"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#FAFAFA" style="light" />
    </SafeAreaView>
  );
};

export default App;
