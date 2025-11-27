import CustomButton from "@/components/CustomButton";
import { InputField } from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSignIn } from "@/utilities/hook/auth/useSignIn";
import { SignInSchema } from "@/utilities/schemaValidate/SignInSchema";
import { TSingInForm } from "@/types/signIn";

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSingInForm>({
    resolver: yupResolver(SignInSchema),
  });
  const { signIn, loadingSignIn } = useSignIn();

  const onSignInPress = async (data: TSingInForm) => {
    signIn(data);
  };
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="flex-1 bg-white"
        >
          <View className="flex-1 justify-start">
            {/* Banner */}
            <View className="relative w-full h-[250px]">
              <Image source={images.signUpCar} className="w-full h-[250px]" />
              <Text className="absolute bottom-6 left-5 text-2xl text-black font-JakartaSemiBold">
                Bem-vindo
              </Text>
            </View>

            {/* Formulário */}
            <View className="p-5">
              <View>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label="Email"
                      placeholder="Informe o email"
                      value={value}
                      onChangeText={onChange}
                      icon={icons.email}
                      error={errors.email?.message}
                    />
                  )}
                />
              </View>
              <View>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label="Senha"
                      placeholder="Informe a senha"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry
                      icon={icons.lock}
                      error={errors.password?.message}
                    />
                  )}
                />
              </View>
              <CustomButton
                title={loadingSignIn ? "Acessando..." : "Acessar"}
                onPress={handleSubmit(onSignInPress)}
                styleContainer="mt-6"
                isLoading={loadingSignIn}
                bgVariant={loadingSignIn ? "disabled" : "primary"}
              />

              <Link
                href="/sign-up"
                className="text-lg text-center text-general-200 mt-10"
              >
                <Text>Ainda não possui uma conta? </Text>
                <Text className="text-primary-500">Cadastre-se</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
