import { axiosInstance } from "./axios";

export async function changePassword(data) {
    const response = await axiosInstance.put('/change-password', data);
    return response.data;
}

export async function forgetPassword(data) {
    const response = await axiosInstance.put('/forget-password', data);
    return response.data;
}