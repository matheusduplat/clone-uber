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
import { SingUpSchema } from "@/utilities/schemaValidate/SignUpSchema";
import { useSignUp } from "@/utilities/hook/auth/useSignUp";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISingUpForm>({
    resolver: yupResolver(SingUpSchema),
  });
  const { signUp, loadingSignUp } = useSignUp();

  const onSignUpPress = async (data: ISingUpForm) => {
    signUp(data);
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
              <Text className="absolute bottom-5 left-5 text-2xl text-black font-JakartaSemiBold">
                Criar sua conta
              </Text>
            </View>

            {/* Formulário */}
            <View className="p-5">
              <View>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label="Nome"
                      placeholder="Informe o nome"
                      value={value}
                      onChangeText={onChange}
                      icon={icons.person}
                      error={errors.name?.message}
                    />
                  )}
                />
              </View>
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
              <View>
                <Controller
                  name="password_confirmation"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label="Confirma Senha"
                      placeholder="Confirme a senha"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry
                      icon={icons.lock}
                      error={errors.password_confirmation?.message}
                    />
                  )}
                />
              </View>
              <CustomButton
                title={loadingSignUp ? "Carregando..." : "Criar Conta"}
                onPress={handleSubmit(onSignUpPress)}
                styleContainer="mt-6"
                isLoading={loadingSignUp}
                bgVariant={loadingSignUp ? "disabled" : "primary"}
              />

              <Link
                href="/sign-in"
                className="text-lg text-center text-general-200 mt-10"
              >
                <Text>Já possui uma conta? </Text>
                <Text className="text-primary-500">Entre</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
