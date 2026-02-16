import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});
// Public Anyone Access
export const getAllDestinations=async()=>{
    const {data}=await API.get("/destinations/")
    return data
}
export const GetDestinationById=async (id)=>{
    const {data}=await API.get(`destinations/${id}`)
    return data
}
//admin  router
export const createDestination=async (payload)=>{
    const {data}=await API.post('/destinations/providers/',payload)
    return data
}
export const updateDestination=async (payload,id)=>{
    const {data}=await API.put(`/destinations/providers/${id}`,payload)
    return data
}
export const deleteDestination=async (id)=>{
    const {data}=await API.delete(`/destinations/providers/${id}`)
    return data
}