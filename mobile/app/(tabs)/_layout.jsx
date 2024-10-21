import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import  Loader  from "../../components/Loader";

import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentStatus } from "../../scripts/authSlice";

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const TabIcon = ({ inactive_icon, active_icon, color, name, focused }) => {
  
  return (
    <View className="flex items-center justify-center gap-2">
      {focused? active_icon: inactive_icon}
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const user = useSelector(selectCurrentUser);
  const status = useSelector(selectCurrentStatus);
  if (!user) return <Redirect href="/sign-in" />;
  const loading = status === "loading";
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FAFAFA",
            borderTopWidth: 1,
            borderTopColor: "#388E3C",
            height: 64,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                inactive_icon={<Ionicons name="home-outline" size={24} color="black" />}
                active_icon={<Ionicons name="home" size={24} color="black" />}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="camera"
          options={{
            title: "camera",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                inactive_icon={<Ionicons name="camera-outline" size={24} color="black" />}
                active_icon={<Ionicons name="camera" size={24} color="black" />}
                color={color}
                name="camera"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                inactive_icon={<MaterialCommunityIcons name="account-circle-outline" size={24} color="black" />}
                active_icon={<MaterialCommunityIcons name="account-circle" size={24} color="black" />}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;