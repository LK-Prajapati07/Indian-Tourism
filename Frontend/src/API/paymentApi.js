import axios from "axios";

const API = axios.create({
    
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});
export const WebHooks=async(payload)=>{
    const {data}=await API.apply(`/payments/webhook`.payload)
    return data
}
export const CheckoutSession=async(payload)=>{
 const {data}=await API.post("/payments/checkout",payload)
 return data
}
export const paymentDetails=async (bookingId)=>{
    const {data}=await API.get(`/payments/${bookingId}`)
    return data
}
export const refundPayment=async ()=>{
    const {data}=await API.get(`/payments/refund`)
    return data
}


