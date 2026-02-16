import axios from "axios";

const API = axios.create({
    
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});
export const getAllServices=async()=>{
    const {data}=await API.get("/services")
    return data
}
export const getServiceById=async(id)=>{
    const {data}=await API.get(`/services/${id}`)
        return data
}
export const createService=async(payload)=>{
    const {data}=await API.post('/services',payload)
    return data
}
export const deleteService=async (id)=>{
    const {data}=await API.delete(`/services/${id}`)
    return data
}
export const updataServiceStatus =async(payload)=>{
    const {data}=await API.put('/services/approvedAdminService',payload)
    return data
}
export const updateService=async(id,payload)=>{
  const {data}=await API.put(`/services/${id}`,payload)
  return data

}
export const getMyServices = async () => {
  const res = await API.get("/services/my");
  return res.data;
};