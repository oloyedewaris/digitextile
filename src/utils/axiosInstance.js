import axios from 'axios';

const BACKEND_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5050/api' : 'https://oau-healthcenter-backend.onrender.com/api'

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30 * 60 * 1000
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken');

    if (accessToken)
      config.headers['x-auth-token'] = accessToken

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;