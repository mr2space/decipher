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
} from "../scripts/speciesSlice";

const FilePicker = () => {
  const [form, setForm] = useState({ photo: null });
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const status = useSelector(selectCurrentSpeciesStatus);
  console.log("document picker", status);
  const openPickerAndUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });

    if (!result.canceled) {
      setForm({
        ...form,
        photo: result.assets[0],
      });
      const formData = new FormData();
      formData.append("photo", form.photo?.uri);
      console.log(form.photo?.uri);
      
      await dispatch(
        photoSpeciesScan({ axiosPrivate: axiosPrivate, formData: formData })
      );
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 1000);
    }
  };

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
      </TouchableOpacity>
    </>
  );
};

export default FilePicker;
