import axios, { AxiosError, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({ baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api` });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@cloneuber.token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (resp) => resp,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default api;

export function getRequest(URL: string, config?: AxiosRequestConfig) {
  return api.get(`${URL}`, config).then((response) => response.data);
}

export function postRequest(
  URL: string,
  payload: any,
  config?: AxiosRequestConfig,
) {
  return api.post(`${URL}`, payload, config).then((response) => response.data);
}
export function postRequestMultiPart(
  URL: string,
  payload: any,
  config?: AxiosRequestConfig,
) {
  return api
    .post(`${URL}`, payload, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}
export function patchRequest(
  URL: string,
  payload: any,
  config?: AxiosRequestConfig,
) {
  return api.patch(`${URL}`, payload, config).then((response) => response.data);
}
export function putRequest(
  URL: string,
  payload?: any,
  config?: AxiosRequestConfig,
) {
  return api.put(`${URL}`, payload, config).then((response) => response.data);
}
export function deleteRequest(URL: string, config?: AxiosRequestConfig) {
  return api.delete(`${URL}`, config).then((response) => response.data);
}
