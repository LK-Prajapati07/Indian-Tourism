import { Routes, Route } from "react-router-dom";
import { RequireAuth, RequireRole, RequireActiveAccount, RequiredRole, RequiredAuth } from "./RouteGuards";
import BookingDetails from "@/tourist/BookingDetails";
import MyBookings from "@/tourist/MyBookings";
import WriteReview from "@/tourist/WriteReview";

const TouristRoutes=()=>{
    return(
        <Routes>
            <Route element={<RequiredAuth/>}>
              <Route element={<RequiredRole allowedRoles={["tourist"]} />}>
                <Route path="bookings" element={<MyBookings/>}/>
                <Route path="/bookings/:id" element={<BookingDetails/>}/>
                <Route path="/review/:bookingId" element={<WriteReview/>}/>
              </Route>
            </Route>
        </Routes>
    )
}
export default TouristRoutes