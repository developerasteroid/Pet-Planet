import axios from "axios";
import { BASE_URL } from "../constants";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:15000,
    headers:{
        'Content-Type': 'application/json',
    }
})


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export default axiosInstance;