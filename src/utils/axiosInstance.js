import axios from 'axios';

const BACKEND_URL = 'https://silly-fox-snaps.cyclic.app';

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