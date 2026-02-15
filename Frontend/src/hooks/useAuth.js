import { fetchCurrentUser, loginUser } from "@/API/authApi";
import { setUser } from "@/Store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      try {
        const profileResponse = await fetchCurrentUser();

        const user = profileResponse.user; // ✅ FIXED

        dispatch(setUser(user));

        toast.success("Login Successful");

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "serviceProvider") {
          navigate("/provider/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Profile fetch failed", error);
        toast.error("Failed to load user profile");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Invalid Credentials");
    },
  });
};
export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Registration successful! Please login.");
      navigate("/login");
    },
    onError: (err) => {
      console.error("Registration Error:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    },
  });
};
