import axios from 'axios';
import { loadState } from './localStorage';

const apiClient = axios.create({
  baseURL: 'https://rent-ur-tech.onrender.com',
});

apiClient.interceptors.request.use((config) => {
  const auth = loadState('auth');
  const newConfig = config;
  newConfig.headers.Authorization = auth ? `Bearer ${auth.token}` : '';
  return newConfig;
});

export default apiClient;
