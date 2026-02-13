import { Routes, Route } from "react-router-dom";
import { RequiredAuth, RequiredRole, RequireRole } from "./RouteGuards.jsx";
import Dashboard from "@/pages/admin/Dashboard";
import { Provider } from "react-redux";
import Providers from "@/pages/admin/Providers";
import Services from "@/pages/admin/Services";
import Bookings from "@/pages/admin/Bookings";
import Reviews from "@/pages/admin/Reviews";

const AdminRoute=()=>{
    return(
        <Routes>
            <Route element={<RequiredAuth/>}>
            <Route element={<RequiredRole allowedRole={["admin"]}/>}>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/provider" element={<Providers/>}/>
            <Route path="/admin/services" element={<Services/>}/>
            <Route path="/admin/bookings" element={<Bookings/>}/>
            <Route path='/admin/review' element={<Reviews/>}/>
            
            </Route>
            </Route>
        </Routes>
    )
}
export default AdminRoute