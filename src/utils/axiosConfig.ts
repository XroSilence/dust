import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;