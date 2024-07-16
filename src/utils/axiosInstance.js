import axios from "axios";

const BACKEND_URL = "https://dg-backend-9082438dccf0.herokuapp.com/";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30 * 60 * 1000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("accessToken");

    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
