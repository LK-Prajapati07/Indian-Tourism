import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
