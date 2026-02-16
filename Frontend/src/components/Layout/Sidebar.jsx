import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      {user?.role === "admin" && (
        <>
          <Link className="block mb-3" to="/admin/dashboard">Dashboard</Link>
          <Link className="block mb-3" to="/admin/providers">Providers</Link>
          <Link className="block mb-3" to="/admin/services">Services</Link>
          <Link className="block mb-3" to="/admin/bookings">Bookings</Link>
          <Link className="block mb-3" to="/admin/reviews">Reviews</Link>
        </>
      )}

      {user?.role === "serviceProvider" && (
        <>
          <Link className="block mb-3" to="/provider/dashboard">Dashboard</Link>
          <Link className="block mb-3" to="/provider/services">My Services</Link>
          <Link className="block mb-3" to="/provider/services/create">Create Service</Link>
          <Link className="block mb-3" to="/provider/profile">Profile</Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
