import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequireAuth = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const RequireRole = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export const RequireActiveAccount = () => {
  const { user } = useSelector((state) => state.auth);

  if (user?.accountStatus !== "active") {
    return <Navigate to="/pending-approval" replace />;
  }

  return <Outlet />;
};
