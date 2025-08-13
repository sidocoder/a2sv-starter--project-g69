import axios, { AxiosInstance } from "axios";
import type { AppDispatch } from "../store";
import { setTokens, resetAuthState } from "../store/authSlice";

const API_URL = "https://a2sv-application-platform-backend-team12.onrender.com";

export const createAxiosInstance = (dispatch: AppDispatch): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const tokenString = localStorage.getItem("token");
        if (tokenString) {
          try {
            const tokenObj = JSON.parse(tokenString);
            if (tokenObj.access) {
              config.headers = config.headers || {};
              config.headers.Authorization = `Bearer ${tokenObj.access}`;
            }
          } catch {
            // ignore parse errors
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
      const originalRequest = error.config;
      
      //error handling for 401 Unauthorized 
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        typeof window !== "undefined"
      ) {
        originalRequest._retry = true;
        try {
          const tokenString = localStorage.getItem("token");
          if (!tokenString) throw new Error("No token");

          const tokenObj = JSON.parse(tokenString);
          const refreshToken = tokenObj.refresh;
          const role = tokenObj.role; // keep role from old token
          if (!refreshToken) throw new Error("No refresh token");

          const response = await axios.post(`${API_URL}/auth/token/refresh`, {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.data.access;
          if (!newAccessToken) throw new Error("No new access token");

          // update Redux + localStorage, keep role
          dispatch(setTokens({ access: newAccessToken, refresh: refreshToken, role }));

          // update header and retry
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // clear tokens on failure
          localStorage.removeItem("token");
          dispatch(resetAuthState());

          // Redirect to login page on refresh token failure
        //window.location.href = "../app/auth/login";

          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};