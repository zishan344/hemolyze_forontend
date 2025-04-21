import { Route, Routes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
