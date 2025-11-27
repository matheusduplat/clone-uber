import { postRequest } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { router } from "expo-router";
import { TSingInForm } from "@/types/signIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomAxiosError } from "@/types/axios";
interface IResponse extends IMutationResponseSuccess, IAuth {}

async function signIn(payload: TSingInForm) {
  const data = await postRequest("/customer/login", payload);
  return data as IResponse;
}

export function useSignIn() {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: TSingInForm) => signIn(payload),
    onSuccess(data) {
      Toast.success(data.message);
      AsyncStorage.setItem("@cloneuber.token", data.token);
      router.replace("/(auth)/sign-in");
    },
    onError(error: CustomAxiosError) {
      const message =
        error?.response?.data?.message || "Erro ao realizar cadastro";
      Toast.error(message);
      console.log(error.response);
    },
  });

  return {
    signIn: mutate,
    loadingSignIn: isPending,
  };
}
