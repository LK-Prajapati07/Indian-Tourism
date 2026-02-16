import axios from "axios";

const API = axios.create({
    
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});
export const createBooking=async(payload)=>{
    const {data}=await API.post("/booking",payload)
    return data
}
export const getBooking=async ()=>{
    const {data}=API.get("/booking/my")
    return data
}
export const getBookingById=async(id)=>{
    const {data}=await API.get(`/booking/${id}`);
    return data
}
// admin API
export const cancelBooking=async(payload,id)=>{
    const {data}=await API.put(`/bookings/cancel/${id}`)
    return data
}
export const getAllBookings=async()=>{
    const {data}=await API.get("/bookings")
    return data
}
export const UpdataBooking=async(payload)=>{
    const {data}=await API.get("/bookings/approvedAdmin")
    return data
}
