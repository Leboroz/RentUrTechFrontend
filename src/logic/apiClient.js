import axios from 'axios';
import { loadState } from './localStorage';

const apiClient = axios.create({
  baseURL: 'https://lazy-tuna-pocket.cyclic.app/',
});

apiClient.interceptors.request.use((config) => {
  const auth = loadState('auth');
  const newConfig = config;
  newConfig.headers.Authorization = auth ? `Bearer ${auth.token}` : '';
  return newConfig;
});

export default apiClient;
