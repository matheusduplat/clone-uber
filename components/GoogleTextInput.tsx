import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/types";
import { Image, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlaceAPiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

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
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Para onde você que ir?"
        debounce={200}
        textInputProps={{
          placeholderTextColor: "#9CA3AF",
          clearButtonMode: "never",
          placeholder: initialLocation ?? "Para onde você que ir?",
        }}
        enablePoweredByContainer={false}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: 600,
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 20,
            shadowColor: "d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlaceAPiKey,
          language: "pt-BR",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
}
