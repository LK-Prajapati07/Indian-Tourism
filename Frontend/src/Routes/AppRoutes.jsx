import { Routes, Route } from "react-router-dom";
import { RequireAuth, RequireRole, RequireActiveAccount } from "./RouteGuards";
import Home from "../pages/public/Home";
import Destinations from "../pages/public/Destinations";
import DestinationDetails from "../pages/public/DestinationDetails";
import PublicServices from "../pages/public/Services";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/admin/Dashboard";
import Providers from "../pages/admin/Providers";
import Services from "../pages/admin/Services";
import Bookings from "../pages/admin/Bookings";
import Reviews from "../pages/admin/Reviews";
import ProviderDashboard from "../pages/provider/Dashboard";
import CreateService from "../pages/provider/CreateService";
import MyServices from "../pages/provider/MyServices";
import MyBookings from "../pages/tourist/MyBookings";
import BookingDetails from "../pages/tourist/BookingDetails";
import WriteReview from "../pages/tourist/WriteReview";

const AppRoutes = () => {
  return (
    <Routes>
     
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/:id" element={<DestinationDetails />} />
      <Route path="/services" element={<PublicServices />} />

      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      
      <Route element={<RequireAuth />}>
        <Route element={<RequireRole allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/providers" element={<Providers />} />
          <Route path="/admin/services" element={<Services />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/reviews" element={<Reviews />} />
        </Route>
      </Route>

      
      <Route element={<RequireAuth />}>
        <Route element={<RequireRole allowedRoles={["serviceProvider"]} />}>
          <Route element={<RequireActiveAccount />}>
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/provider/services" element={<MyServices />} />
            <Route path="/provider/services/create" element={<CreateService />} />
          </Route>
        </Route>
      </Route>

     
      <Route element={<RequireAuth />}>
        <Route element={<RequireRole allowedRoles={["tourist"]} />}>
          <Route element={<RequireActiveAccount />}>
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            <Route path="/review/:bookingId" element={<WriteReview />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;


