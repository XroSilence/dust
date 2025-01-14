import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/', // Use the proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;