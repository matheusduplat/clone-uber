import { recentRides } from "@/@core/mocks/recentRides";
import { RidesCard } from "@/components/RidesCard";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RidesCard ride={item} />}
      />
    </SafeAreaView>
  );
}
