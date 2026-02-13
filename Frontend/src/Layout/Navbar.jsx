import { useDispatch } from "react-redux";

import { logoutUserApi } from "../API/authApi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/Store/authSlice";

const handleLogout = async () => {
  await logoutUserApi();
  dispatch(logoutUser());
  navigate("/");
};
