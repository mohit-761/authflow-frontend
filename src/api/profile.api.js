import { axiosInstance } from "./axios";

export async function getProfile() {
    let response = await axiosInstance.get('/profile');
    return response.data;
}

export async function deleteProfile() {
    await axiosInstance.delete('/profile');
}

export async function updateProfile(data) {
    let response = await axiosInstance.put('/profile', data);
    return response.data;
}

export async function updateProfilePhoto(file) {
    let response = await axiosInstance.put('/profile-photo', file)
    return response.data;
}