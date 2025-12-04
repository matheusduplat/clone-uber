// src/providers/AuthProvider.js
import { useMe } from "@/utilities/hook/user/useMe";
import React, { createContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthContext {
  user?: IUser;
  refetchUser: () => void;
  isAuthenticated: boolean;
  hasToken: boolean | null;
}

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  refetchUser: () => {},
  hasToken: false,
});

export function AuthProvider({ children }: IProps) {
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const { user, isLoading, refetch } = useMe();

  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem("@cloneuber.token");
      setHasToken(!!token);
    }
    checkToken();
  }, []);

  // Se ainda está verificando o token, não renderiza nada
  if (hasToken === null) {
    return null;
  }

  // Se tem token, mostra loading enquanto busca os dados do usuário
  if (hasToken && isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        refetchUser: refetch,
        isAuthenticated: user !== undefined,
        hasToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
