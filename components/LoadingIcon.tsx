import { AntDesign } from "@expo/vector-icons";
import { Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

export default function LoadingIcon() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <AntDesign name="loading-3-quarters" size={24} color="white" />
    </Animated.View>
  );
}
