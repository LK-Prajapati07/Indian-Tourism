import { Routes, Route } from "react-router-dom";
import { RequireAuth, RequireRole, RequireActiveAccount } from "./RouteGuards";

// Public Pages
import Home from "../pages/public/Home";
import Destinations from "../pages/public/Destinations";
import DestinationDetails from "../pages/public/DestinationDetails";
import PublicServices from "../pages/public/Services";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Pages
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Providers from "../pages/admin/Providers";
import Services from "../pages/admin/Services";
import Bookings from "../pages/admin/Bookings";
import Reviews from "../pages/admin/Reviews";

// Provider Pages
import ProviderLayout from "../pages/provider/ProviderLayout";
import ProviderDashboard from "../pages/provider/Dashboard";
import CreateService from "../pages/provider/CreateService";
import MyServices from "../pages/provider/MyServices";

// Tourist Pages
import MyBookings from "../pages/tourist/MyBookings";
import BookingDetails from "../pages/tourist/BookingDetails";
import WriteReview from "../pages/tourist/WriteReview";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/:id" element={<DestinationDetails />} />
      <Route path="/services" element={<PublicServices />} />

      {/* ================= AUTH ROUTES ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route element={<RequireAuth />}>
        <Route element={<RequireRole allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>

            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="providers" element={<Providers />} />
            <Route path="services" element={<Services />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="reviews" element={<Reviews />} />

          </Route>
        </Route>
      </Route>

      {/* ================= PROVIDER ROUTES ================= */}
      <Route element={<RequireAuth />}>
        <Route element={<RequireRole allowedRoles={["serviceProvider"]} />}>
          <Route element={<RequireActiveAccount />}>
            <Route path="/provider" element={<ProviderLayout />}>

              <Route index element={<ProviderDashboard />} />
              <Route path="dashboard" element={<ProviderDashboard />} />
              <Route path="services" element={<MyServices />} />
              <Route path="services/create" element={<CreateService />} />

            </Route>
          </Route>
        </Route>
      </Route>

      {/* ================= TOURIST ROUTES ================= */}
      <Route element={<RequireAuth />}>
        <Route element={<RequireRole allowedRoles={["tourist"]} />}>
          <Route element={<RequireActiveAccount />}>
            <Route path="/tourist">

              <Route path="bookings" element={<MyBookings />} />
              <Route path="bookings/:id" element={<BookingDetails />} />
              <Route path="review/:bookingId" element={<WriteReview />} />

            </Route>
          </Route>
        </Route>
      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<h1>404 Not Found</h1>} />

    </Routes>
  );
};

export default AppRoutes;
