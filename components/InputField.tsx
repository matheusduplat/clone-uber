import { InputFieldProps } from "@/types/types";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export function InputField({
  labelStyle,
  label,
  containerStyle,
  icon,
  inputStyle,
  iconStyle,
  secureTextEntry = false,
  ...props
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView className="flex-1" behavior={"padding"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center p-4">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row items-center bg-neutral-100 rounded-full border border-neutral-100 px-4 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 mr-2 ${iconStyle}`} />
            )}
            <TextInput
              className={`flex-1 py-3 text-[15px] font-JakartaSemiBold ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              placeholderTextColor="#9CA3AF"
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
