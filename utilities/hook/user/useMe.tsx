import { getRequest } from "@/services/api";
import { CustomAxiosError } from "@/types/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Toast } from "toastify-react-native";

const fetchMe = async () => {
  try {
    const data = await getRequest("/me");
    return data as IUser;
  } catch (err: any) {
    const error: CustomAxiosError = err;
    const message = error?.response?.data?.message || "";
    const status = error?.response?.status;
    const token = await AsyncStorage.getItem("token");

    if (status === 403 && message === "Unauthorized" && token) {
      // sessão expirada ou token inválido
      await AsyncStorage.removeItem("token");
      Toast.error("Sessão expirada! Faça login novamente.");
      router.replace("/(auth)/sign-in");
      throw error;
    }

    throw error;
  }
};

export function useMe() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 60 * 5, // 5 horas de cache
    refetchInterval: 1000 * 60 * 60 * 5,
    gcTime: 1000 * 60 * 30, // guarda o cache por 30 minutos após sair da tela
    refetchIntervalInBackground: true,
  });
  return {
    user: data,
    isLoading,
    error,
    refetch,
  };
}
