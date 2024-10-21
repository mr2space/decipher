import { View, Text } from "react-native";
import React, { useEffect } from "react";
import useRefreshToken from "../../hook/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../scripts/authSlice";
import Loader from "../../components/Loader";
import { StatusBar } from "expo-status-bar";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {

  const refresh = useRefreshToken();
  const user = useSelector(selectCurrentUser);
  
  useEffect(()=>{
    refresh();
  }, [])
  let loading = user && 1;

  if (user) {
    return <Redirect href="/home" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-out"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#FAFAFA" style="light" />

    </>
  );
};

export default AuthLayout;
