import { recentRides } from "@/@core/mocks/recentRides";
import { GoogleTextInput } from "@/components/GoogleTextInput";
import { Map } from "@/components/Map";
import { RidesCard } from "@/components/RidesCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import { useAuthContext } from "@/utilities/hook/auth/useAuthContext";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

export default function Home() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useAuthContext();
  const [hasPermission, setHasPermission] = useState(false);

  const isLoading = true;
  const handleSingOut = () => {
    console.log("logout");
  };

  const handleDestinationPress = () => {
    console.log("Destination pressed");
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
        address:
          address.length > 0
            ? `${address[0].city ?? ""}, ${address[0].region ?? ""}`
            : "Localização desconhecida",
      });
    };

    requestLocation();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RidesCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 10 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!isLoading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="Nenhuma corrida encontrada"
                  resizeMode="contain"
                />
                <Text className="text-sm ">Nenhuma corrida encontrada</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row capitalize items-center justify-between my-5">
              <Text className="text-xl  font-JakartaExtraBold ">
                Bem vindo, {user?.name}
              </Text>
              <TouchableOpacity
                onPress={handleSingOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" alt="logout" />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Sua localização atual
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recentes corridas
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
