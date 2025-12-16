import { Platform, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

export function Map() {
  // const region = {

  // }
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType={Platform.OS === "ios" ? "mutedStandard" : undefined}
      showsPointsOfInterest={false}
      // initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      <Text>Map</Text>
    </MapView>
  );
}
