import CustomButton from "@/components/CustomButton";
import { InputField } from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {};
  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={"padding"}>
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
              <InputField
                label="Nome"
                placeholder="Informe o nome"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                icon={icons.person}
              />
              <InputField
                label="Email"
                placeholder="Informe o email"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                icon={icons.email}
              />
              <InputField
                label="Senha"
                placeholder="Informe a senha"
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                secureTextEntry
                icon={icons.lock}
              />

              <CustomButton
                title="Criar Conta"
                onPress={onSignUpPress}
                styleContainer="mt-6"
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
