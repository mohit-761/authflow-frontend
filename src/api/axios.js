import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    // timeout: 1000, If the server doesn't respond within this time, Axios will cancel the request and throw an error.
})