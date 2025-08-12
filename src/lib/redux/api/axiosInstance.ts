import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://a2sv-application-platform-backend-team12.onrender.com", // your backend API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
