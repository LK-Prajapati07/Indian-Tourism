import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/Store/authSlice";

const AdminLayout = () => {
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
      <aside className="w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col">

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Admin Panel
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/providers"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Providers
          </NavLink>

          <NavLink
            to="/admin/services"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Bookings
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Reviews
          </NavLink>

        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white shadow-sm border-b p-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Welcome, {user?.fullName}
            </h1>
            <p className="text-sm text-gray-500">
              Role: {user?.role}
            </p>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
  