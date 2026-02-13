import { Routes, Route } from "react-router-dom"
import { RequiredActiveAccount, RequiredAuth, RequiredRole } from "./RouteGuards"
import Dashboard from "@/pages/provider/Dashboard"
import MyServices from "@/pages/provider/MyServices"
import CreateService from "@/pages/provider/CreateService"
const ProviderRoute=()=>{
    return(
        <Routes>
            <Route element={<RequiredAuth/>}>
                <Route element={<RequiredRole allowedRole={["serviceProvider"]}/>}>
                <Route element={<RequiredActiveAccount/>}>
                <Route path="/provider/dashboard" element={<Dashboard/>}/>
                <Route path="/provider/services" element={<MyServices/>}/>
                <Route path="/provider/service/create" element={<CreateService/>}/>
                </Route>
                </Route>
            </Route>
        </Routes>
    )
}
export default ProviderRoute