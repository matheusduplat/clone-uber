import { Tabs } from "expo-router";
import { Image, View } from "react-native";

const TabIcon = () => {
  return (
    <View>
      <View>
        <Image />
      </View>
    </View>
  );
};

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{ tabBarActiveTintColor: "white" }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: () => <TabIcon />,
        }}
      />
    </Tabs>
  );
}
