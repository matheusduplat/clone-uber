import { postRequest } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";

function signUp(payload: ISingUpForm) {
  const data = postRequest("/users", payload);
  return data;
}

export function useSignUp() {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ISingUpForm) => signUp(payload),
    onSuccess(data) {
      Toast.success("Cadastro realizado com sucesso!");
      console.log(data);
    },
  });

  return {
    signUp: mutate,
    loadingSignUp: isPending,
  };
}
