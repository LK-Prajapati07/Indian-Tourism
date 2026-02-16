import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/Store/authSlice";
import { useNavigate } from "react-router-dom";

const ProviderLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">
          Provider Panel
        </h2>

        <nav className="space-y-3">
          <NavLink
            to="/provider"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/provider/services"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            My Services
          </NavLink>

          <NavLink
            to="/provider/services/create"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Create Service
          </NavLink>

          <NavLink
            to="/provider/profile"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Profile
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            Welcome, {user?.fullName}
          </h1>

          <span className="text-sm text-gray-500">
            Status: {user?.accountStatus}
          </span>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProviderLayout;
