import axios from 'axios';
import { baseURL } from '../constants';

const adminAxiosInstance = axios.create({
    baseURL:baseURL,
    timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
});

adminAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
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
adminAxiosInstance.interceptors.response.use(
    (response) => {
      // Do something with the response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );

export default adminAxiosInstance;