import { useAuthContext } from "@/utilities/hook/auth/useAuthContext";
import { Redirect } from "expo-router";

export default function Home() {
  const { user } = useAuthContext();

  if (user) return <Redirect href="/(root)/(tabs)/home" />;
  return <Redirect href="/(auth)/welcome" />;
}
