import { axiosInstance } from "./axios";

export async function loginUser(data){
   let response = await axiosInstance.post('/login', data);
   return response.data;
}

export async function registerUser(data){
  let response = await axiosInstance.post('/register', data);
  return response.data;
}