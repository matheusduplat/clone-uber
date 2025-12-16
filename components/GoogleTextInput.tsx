import { GoogleInputProps } from "@/types/types";
import { Text, View } from "react-native";

export function GoogleTextInput({
  icon,
  containerStyle,
  handlePress,
  initialLocation,
  textInputBackgroundColor,
}: GoogleInputProps) {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <Text>search</Text>
    </View>
  );
}
