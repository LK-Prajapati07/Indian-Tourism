import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        Indian Tourism
      </Link>

      <div className="space-x-4">
        <Link to="/destinations">Destinations</Link>
        <Link to="/services">Services</Link>

        {user ? (
          <Link to="/profile">{user.fullName}</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
