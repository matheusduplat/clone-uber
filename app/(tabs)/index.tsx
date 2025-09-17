import { Text } from "@/components/Themed";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-red">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
