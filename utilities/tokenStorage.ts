import AsyncStorage from "@react-native-async-storage/async-storage";

let tokenCache: string | null = null;

export async function initToken() {
  tokenCache = await AsyncStorage.getItem("@cloneuber.token");
}

export function getTokenSync() {
  return tokenCache;
}

export async function setToken(token: string) {
  tokenCache = token;
  await AsyncStorage.setItem("@cloneuber.token", token);
}

export async function removeToken() {
  tokenCache = null;
  await AsyncStorage.removeItem("@cloneuber.token");
}
