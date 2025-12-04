import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Platform, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  source: ImageSourcePropType;
}
const TabIcon = ({ focused, source }: TabIconProps) => {
  return (
    <View
      className={`flex flex-row items-center  rounded-full ${focused ? "bg-general-300" : ""}`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className="w-7 h-7"
        />
      </View>
    </View>
  );
};

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 30,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: Platform.OS === "ios" ? 30 : 50,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          headerShown: false,
          title: "Rides",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
}
