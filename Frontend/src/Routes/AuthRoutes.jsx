import Home from "@/auth/Home";
import Login from "@/auth/Login";
import Register from "@/auth/Register";
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
