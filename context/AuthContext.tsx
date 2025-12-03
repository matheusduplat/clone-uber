// src/providers/AuthProvider.js
import { useMe } from "@/utilities/hook/user/useMe";
import React, { createContext } from "react";
import { View, ActivityIndicator } from "react-native";

interface IAuthContext {
  user?: IUser;
  refetchUser: () => void;
  isAuthenticated: boolean;
}

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  refetchUser: () => {},
});

export function AuthProvider({ children }: IProps) {
  const { user, isLoading, refetch } = useMe();

  if (isLoading) {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
