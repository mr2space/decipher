import React from 'react'
import { View } from 'react-native'
import {Stack} from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="camera" options={{ title: 'Camera' }} />
    </Stack>
  )
}

export default RootLayout