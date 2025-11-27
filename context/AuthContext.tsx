// src/providers/AuthProvider.js
import { useMe } from "@/utilities/hook/user/useMe";
import React, { createContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

interface IAuthContext {
  user?: IUser;
  status: string;
  refetchUser: () => void;
  isAuthenticated: boolean;
}

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  status: "loading",
  refetchUser: () => {},
});

export function AuthProvider({ children }: IProps) {
  const { user, error, isLoading, refetch } = useMe();
  const [status, setStatus] = useState("loading"); // 'loading' | 'authenticated' | 'unauthenticated'
  useEffect(() => {
    if (isLoading) {
      setStatus("loading");
      return;
    }
    if (user) {
      setStatus("authenticated");
      return;
    }
    setStatus("unauthenticated");
  }, [user, error, isLoading]);

  if (status === "loading") {
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
        status,
        refetchUser: refetch,
        isAuthenticated: status === "authenticated",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
