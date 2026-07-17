import { axiosInstance } from "./axios";

export async function getProfile() {
    let response = await axiosInstance.get('/profile');
    return response.data;
}

export async function deleteProfile() {
    await axiosInstance.delete('/profile');
}