import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import {
  selectCurrentSpeciesStatus,
  photoSpeciesScan,
  selectCurrentData,
  selectSpecies,
  selectCurrentSpecies
} from "../scripts/speciesSlice";

const FilePicker = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const status = useSelector(selectCurrentSpeciesStatus);
  const data = useSelector(selectCurrentSpecies)
  const {error} = useSelector(selectSpecies);
  
  const openPickerAndUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpg", "image/jpeg"],
      multiple:false,
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const photo =  result.assets[0]
      const formData = new FormData();
      formData.append('photo', {
        uri: photo.uri,
        name: photo.name,
        type: photo.mimeType || 'image/jpeg', // Fallback to image/jpeg
      });
      
      await dispatch(
        photoSpeciesScan({ axiosPrivate: axiosPrivate, formData: formData })
      );
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 1000);
    }
    
  };
  console.log("document picker", status);

  return (
    <>
      <TouchableOpacity
        onPress={openPickerAndUpload}
        className="h-[70px] w-1/2 bg-orange-100 border-orange-700 border rounded-xl justify-center items-center text-orange-400"
      >
        {status !== "loading" ? (
          <FontAwesome6 name="folder-open" size={21} color="black" />
        ) : (
          <ActivityIndicator
            animating={status === "loading"}
            color="#000"
            size="small"
            className="ml-2"
          />
        )}

        <Text>
          {data}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default FilePicker;
