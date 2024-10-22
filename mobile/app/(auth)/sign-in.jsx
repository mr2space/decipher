import { useState } from "react";
import { Link, router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { loginTheUser, selectCurrentUser } from "../../scripts/authSlice";
import { useAxiosPrivate } from "../../hook/useAxiosPrivate";
const SignIn = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await dispatch(loginTheUser(form));
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    return router.replace("/home");
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.plant_logo_min}
            resizeMode="contain"
            className="w-[115px] h-[115px]"
          />
          <View className="flex flex-row mt-10 ">
            <Text className="text-2xl font-semibold text-black font-psemibold">
              Log in to
            </Text>
            <Text className="text-2xl font-semibold text-primary-400 font-psemibold">
              {" "}
              Sanjeevani
            </Text>
          </View>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 py-3 bg-primary-500 shadow-lg shadow-primary-500 "
            textStyles="text-whitegray"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-700 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
