import axios from "axios";
const API=axios.create({
    baseURL:import.meta.env.VITE_Base_URL,
    withCredentials:true
})
export const loginUser=(payload)=>{
    API.post()
}