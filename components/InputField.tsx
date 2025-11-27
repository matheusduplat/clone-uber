import { InputFieldProps } from "@/types/types";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
export function InputField({
  labelStyle,
  label,
  containerStyle,
  icon,
  inputStyle,
  iconStyle,
  secureTextEntry = false,
  error,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View className="w-full mb-3">
      <Text className={`text-lg font-JakartaSemiBold mb-1 ml-2 ${labelStyle}`}>
        {label}
      </Text>
      <View
        className={`flex flex-row items-center bg-neutral-100 rounded-full border  px-4 ${error ? "border-red-500" : "border-neutral-100"} ${containerStyle}`}
      >
        {icon && (
          <Image source={icon} className={`w-6 h-6 mr-2 ${iconStyle}`} />
        )}
        <TextInput
          className={`flex-1 py-3 text-[15px] font-JakartaSemiBold ${inputStyle} `}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <Feather name="eye-off" size={20} color="#6B7280" />
            ) : (
              <Feather name="eye" size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-sm ml-4">{error}</Text>}
    </View>
  );
}
