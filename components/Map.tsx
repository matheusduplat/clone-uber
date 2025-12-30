import { drivers } from "@/@core/mocks/drivers";
import { icons } from "@/constants";
import { useDriverStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/types";
import { calculateRegion, generateMarkersFromData } from "@/utilities/map";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

export function Map() {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLongitude || !userLatitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarkers);
    }
  }, [drivers]);

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType={Platform.OS === "ios" ? "mutedStandard" : undefined}
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}
    </MapView>
  );
}
