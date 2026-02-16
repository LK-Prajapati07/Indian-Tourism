import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

/* ==============================
   APPLY AS SERVICE PROVIDER
================================ */
export const applyProvider = async (payload) => {
  const response = await API.post("/serviceProvider/apply", payload);
  return response.data;
};

/* ==============================
   GET ALL PROVIDERS (ADMIN)
================================ */
export const getAllProviders = async () => {
  const response = await API.get("/serviceProvider");
  return response.data;
};

/* ==============================
   GET MY PROVIDER PROFILE
================================ */
export const getMyProviderProfile = async () => {
  const response = await API.get("/serviceProvider/me");
  return response.data;
};

/* ==============================
   APPROVE PROVIDER (ADMIN)
================================ */
export const approveProvider = async (id) => {
  const response = await API.patch(`/serviceProvider/approve/${id}`);
  return response.data;
};

/* ==============================
   REJECT PROVIDER (ADMIN)
================================ */
export const rejectProvider = async (id) => {
  const response = await API.patch(`/serviceProvider/reject/${id}`);
  return response.data;
};
