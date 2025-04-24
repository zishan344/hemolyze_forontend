import { Route, Routes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import PrivateRoute from "../Component/PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";
import ActivateAccount from "../Component/Registration/ActivateAccount";
import PasswordResetConfirm from "../Pages/PasswordResetConfirm";
import Profile from "../Pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
        {/* Add more routes here as needed */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
