import axios from 'axios';

const BACKEND_URL = 'https://dg-core-backend-production.up.railway.app/';
// const BACKEND_URL = 'https://test-wb-1f446534f6a9.herokuapp.com/';

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