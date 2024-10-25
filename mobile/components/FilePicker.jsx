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

const FilePicker = ({onPress, status}) => {
  console.log("document", status)
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
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
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default FilePicker;
