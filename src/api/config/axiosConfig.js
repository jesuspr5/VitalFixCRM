import axios from 'axios';
import { getToken } from './tokenUtils';

axios.interceptors.request.use(async config => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});