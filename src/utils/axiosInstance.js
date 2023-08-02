import axios from 'axios';

// const BACKEND_URL = 'https://41c0-196-27-128-5.ngrok-free.app/';
const BACKEND_URL = 'https://dark-teal-scorpion-ring.cyclic.app/';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30 * 60 * 1000
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken');

    if (accessToken)
      config.headers['Authorization'] = `Bearer ${accessToken}`

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;