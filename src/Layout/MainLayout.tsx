import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
