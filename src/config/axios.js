import axios from 'axios'
import { useUser } from '../context/userContext';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
});

axiosInstance.interceptors.request.use(config => {
    const userContext = useUser()
    config.headers.Authorization = `Bearer ${userContext}`
    config.headers.Accept = 'application/json'
    return config;
})

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },

    async function (error) {
        return Promise.reject(error)
    }
);
export const axiosHttp = axiosInstance