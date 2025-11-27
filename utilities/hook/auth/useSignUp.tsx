import { postRequest } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { AxiosError } from "axios";
import { router } from "expo-router";

async function signUp(payload: ISingUpForm) {
  const data = await postRequest("/customer/store", payload);
  return data;
}

export function useSignUp() {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ISingUpForm) => signUp(payload),
    onSuccess() {
      Toast.success("Cadastro realizado com sucesso!");
      router.replace("/(auth)/sign-in");
    },
    onError(error: AxiosError) {
      Toast.error("Erro ao realizar cadastro!");
      console.log(error.response);
    },
  });

  return {
    signUp: mutate,
    loadingSignUp: isPending,
  };
}
