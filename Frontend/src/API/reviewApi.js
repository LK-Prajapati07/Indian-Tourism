import axios from "axios";

const API = axios.create({
    
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});
export const createReview=async (payload)=>{
    const {data}=await API.post('/reviews',payload)
    return data
}
export const getMyReviews=async ()=>{
    const {data}=await API.get('/reviews/my')
    return data
}
export const getServiceReviews=async(id)=>{
    const {data}=await API.get(`/reviews/service/${id}`)
    return data
}
export const getAllReviews=async()=>{
    const {data}=await API.get('/reviews')
    return data
}
export const updateReviewStatus=async(payload,id)=>{
    const {data}=await API.put(`/reviews/${id}`,payload)
    return data
}