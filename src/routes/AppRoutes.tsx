import { Route, Routes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import PrivateRoute from "../Component/PrivateRoute";
import AdminRoute from "../Component/AdminRoute";
import Dashboard from "../Pages/Dashboard";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";
import ActivateAccount from "../Component/Registration/ActivateAccount";
import PasswordResetConfirm from "../Pages/PasswordResetConfirm";
import Profile from "../Pages/Profile";
import AvailableDonors from "../Pages/AvailableDonors";
import DonationRequests from "../Component/Dashboard/DonationRequests";
import DonationHistory from "../Component/Dashboard/DonationHistory";
import BloodRequests from "../Component/Dashboard/BloodRequests";
import PremiumMembership from "../Component/Dashboard/PremiumMembership";
import Donation from "../Pages/Donation";
import DashboardLayout from "../Layout/DashboardLayout";
import PaymentSuccess from "../Pages/PaymentSuccess";
import FundDonationHistory from "../Component/Dashboard/FundDonationHistory";
import AdminDashboard from "../Pages/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/available-donors" element={<AvailableDonors />} />
        <Route
          path="password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />

        {/* Protected Routes */}
        <Route
          path="donation"
          element={
            <PrivateRoute>
              <Donation />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Dashboard Routes */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }>
        <Route index element={<Dashboard />} />
        <Route path="requests" element={<DonationRequests />} />
        <Route path="blood-requests" element={<BloodRequests />} />
        <Route path="history" element={<DonationHistory />} />
        <Route path="fund-history" element={<FundDonationHistory />} />
        <Route path="premium" element={<PremiumMembership />} />
        <Route path="profile" element={<Profile />} />

        {/* Admin Dashboard */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Route>

      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
