// lib/api.ts
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://a2sv-application-platform-backend-team12.onrender.com',
  // other config like withCredentials if needed
});

export default api;
