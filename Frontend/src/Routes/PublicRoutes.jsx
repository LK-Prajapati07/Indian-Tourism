import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Destinations from "../pages/public/Destinations";
import DestinationDetails from "../pages/public/DestinationDetails";
import Services from "../pages/public/Services";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/:id" element={<DestinationDetails />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
};

export default PublicRoutes;
