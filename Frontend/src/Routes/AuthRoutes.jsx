import Home from "@/pages/auth/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
    const { isAuthenticated } = useSelector((store) => store.auth);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default AuthRoutes;
