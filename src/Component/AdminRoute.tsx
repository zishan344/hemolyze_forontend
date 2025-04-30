import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../Hooks/useAuthContext";
import Loading from "../Shared/Loadings";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown for redirect if not authorized
    if (!user || user.role !== "admin") {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [user]);

  // Show loading while checking authentication
  if (loading) {
    return <Loading />;
  }

  // If user is authenticated and has admin role
  if (user && user.role === "admin") {
    return <>{children}</>;
  }

  // If not authenticated or not an admin, redirect to login
  if (countdown === 0) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Show unauthorized message with countdown
  return (
    <div className="text-center p-8">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p className="font-bold">Admin Access Required!</p>
        <p>You must be an admin to access this page.</p>
      </div>
      <div className="text-lg">
        Redirecting to login page in{" "}
        <span className="font-bold text-red-600">{countdown}</span> seconds...
      </div>
    </div>
  );
};

export default AdminRoute;
