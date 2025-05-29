import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'https://task-4-backend-six.vercel.app//api',
  timeout: 10000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error.message)
);

export default apiClient;