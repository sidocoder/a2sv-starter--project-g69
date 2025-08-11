import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import type { AppDispatch } from "../store";
import { setTokens, resetAuthState } from "../store/authSlice";

const API_URL = "https://a2sv-application-platform-backend-team12.onrender.com";

export const createAxiosInstance = (dispatch: AppDispatch): AxiosInstance => {
  const axiosInstance = axios.create({ baseURL: API_URL });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (typeof window !== "undefined") {
        const tokenString = localStorage.getItem("token");
        if (tokenString) {
          try {
            const tokenObj: { access: string; refresh: string } = JSON.parse(tokenString);
            if (tokenObj.access) {
              if (!config.headers) {
                config.headers = {} as AxiosRequestHeaders;
              }
              config.headers.Authorization = `Bearer ${tokenObj.access}`;
            }
          } catch {
            // Ignore parse errors
          }
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        typeof window !== "undefined"
      ) {
        originalRequest._retry = true;
        try {
          const tokenString = localStorage.getItem("token");
          if (!tokenString) throw new Error("No token");

          const tokenObj: { access: string; refresh: string } = JSON.parse(tokenString);
          const refreshToken = tokenObj.refresh;
          if (!refreshToken) throw new Error("No refresh token");

          const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken: string = response.data.data.access;
          if (!newAccessToken) throw new Error("No new access token");

          dispatch(setTokens({ access: newAccessToken, refresh: refreshToken }));

          if (!originalRequest.headers) {
            originalRequest.headers = {} as AxiosRequestHeaders;
          }
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("token");
          dispatch(resetAuthState());
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
