import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import PhotoPreview from "../../components/PhotoPreview";
import { SafeAreaView } from "react-native-safe-area-context";

import * as DocumentPicker from "expo-document-picker";
import { router, useRouter } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hook/useAxiosPrivate";
import {
  selectCurrentSpeciesStatus,
  photoSpeciesScan,
  selectCurrentData,
  selectSpecies,
  selectCurrentSpecies,
} from "../../scripts/speciesSlice";

export default function Camera() {
  const dispatch = useDispatch();
  const {error} =  useSelector(selectSpecies)
  const species = useSelector(selectCurrentSpecies);
  const axiosPrivate = useAxiosPrivate();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  console.log("camera - ", error);
  
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const onPressTakePhoto = async () => {
    const options = {
      exif: false,
      quality: 0.5,
    };
    const image = await cameraRef.current.takePictureAsync(options);
    setPhoto(image);
  };
  const handleSubmit = async () => {
    if (!photo){
      console.error("no photo after camera")
    }
    const formData = new FormData();
    formData.append('photo', {
      uri: photo.uri,
      name: `photo_${Date.now()}.jpg`, // Give the file a unique name
      type: 'image/jpeg',  // Set the MIME type
    });

    await dispatch(
      photoSpeciesScan({ axiosPrivate: axiosPrivate, formData: formData })
    );

    setPhoto(null);
    router.replace(`/search/${species}`)
  };
  const handleRetake = () => {
    setPhoto(null);
  };
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (photo) {
    return (
      <PhotoPreview
        photo={photo}
        setPhoto={setPhoto}
        handleRetake={handleRetake}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPressTakePhoto}>
            <Entypo name="circle" size={55} color="#fff" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
