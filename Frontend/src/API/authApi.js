import axios from "axios";
const API=axios.create({
    baseURL:import.meta.env.VITE_Base_URL,
    withCredentials:true
})
export const loginUser=(payload)=>{
    API.post("/auth/login",payload)
}
export const registerUser=(payload)=>{
    API.post("/auth/register",payload)
}
export const fetchCurrentUser=()=>{
    API.get("/auth/me");
}
export const logoutUser=()=>{
    API.post("/auth/logout")
}