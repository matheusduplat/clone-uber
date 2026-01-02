import { drivers } from "@/@core/mocks/drivers";
import { DriverCard } from "@/components/DriverCard";
import { RideLayout } from "@/components/RideLayout";
import { FlatList } from "react-native";

export default function ConfirmRide() {
  return (
    <RideLayout title="Escolha um carro" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => <DriverCard item={item} />}
      />
    </RideLayout>
  );
}
