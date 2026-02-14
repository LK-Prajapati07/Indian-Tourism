import axios from "axios";

const API = axios.create({
    
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});


export const loginUser = async (payload) => {
    const response = await API.post("/auth/login", payload);
    return response.data; 
};

export const registerUser = async (payload) => {
    const response = await API.post("/auth/register", payload);
    return response.data;
};

export const fetchCurrentUser = async () => {
    const response = await API.get("/auth/userProfile");
    return response.data;
};

export const logoutUser = async () => {
    const response = await API.post("/auth/logout");
    return response.data;
};