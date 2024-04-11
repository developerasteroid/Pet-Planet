import axios from 'axios';
import { baseURL } from '../constants';

const sellerAxiosInstance = axios.create({
    baseURL:baseURL,
    timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
});

sellerAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('sellerToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle responses globally
sellerAxiosInstance.interceptors.response.use(
    (response) => {
      // Do something with the response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
);

export default sellerAxiosInstance;