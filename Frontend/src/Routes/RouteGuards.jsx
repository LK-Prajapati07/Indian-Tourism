import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const RequiredAuth = () => {
    const { isAuthicated } = useSelector((store) => store.auth);
    if (!isAuthicated) {
        return <Navigate to='/login' replace />;
    }
    return <Outlet/>

}
export const RequiredRole=({allowedRole})=>{
    const {user}=useSelector((store)=>store.auth)
    if(!allowedRole.include(user?.role)){
        return <Navigate to="/unauthorized" replace/>
    }
    return <Outlet/>
}

export const RequiredActiveAccount=()=>{
    const {user}=useSelector((store)=>store.auth)
    if(user?.accountStatus !=="active"){
        return <Navigate to="/pending-approval" replace/>
    }
    return <Outlet/>
}