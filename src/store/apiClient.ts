import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { store } from "./index";
import { setTokens, resetAuthState } from "./authSlice";

const API_BASE = "https://a2sv-application-platform-backend-team12.onrender.com";

const apiClient = axios.create({
  baseURL: API_BASE,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.token?.access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError & {
      config: AxiosRequestConfig & { _retry?: boolean };
    }
  ) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = "Bearer " + token;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const state = store.getState();
        const refreshToken = state.auth.token?.refresh;

        if (!refreshToken) {
          store.dispatch(resetAuthState());
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_BASE}/auth/refresh`, {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data.data;
        store.dispatch(setTokens({ access, refresh }));

        apiClient.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access}`;
        }

        processQueue(null, access);
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(resetAuthState());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
