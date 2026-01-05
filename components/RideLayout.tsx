import { ReactNode, useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Image,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { icons } from "@/constants";
import { Map } from "@/components/Map";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

interface Props {
  title?: string;
  children: ReactNode;
  snapPoints?: string[];
}

export function RideLayout({ children, title, snapPoints }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        bottomSheetRef.current?.snapToIndex(2);
      },
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        bottomSheetRef.current?.snapToIndex(1);
      },
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-5 items-center justify-start px-5">
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text
              className={`text-xl font-JakartaSemiBold ml-5 ${Platform.OS === "ios" ? "text-black" : "text-white"}`}
            >
              {title || "Voltar"}
            </Text>
          </View>
          <Map />
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints || ["45%", "85%"]}
            index={1}
          >
            <BottomSheetView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetView>
          </BottomSheet>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
