import axios from "axios";
import { getToken } from "./tokenHelper";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SHORT_LINK_DOMAIN || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
