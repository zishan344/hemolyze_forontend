import { useState } from "react";
import {
  BarChart3,
  Clock,
  Crown,
  Droplet,
  Heart,
  Menu,
  UserRound,
  X,
  AlertCircle,
} from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import useAuthContext from "../Hooks/useAuthContext";

const DashboardLayout = () => {
  const { user } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <div
        className={`bg-base-100 shadow-lg transition-all duration-300 flex flex-col ${
          isSidebarOpen ? "w-64" : "w-20"
        } fixed h-full`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <Link to="/">
            {isSidebarOpen ? (
              <div className="flex items-center">
                <Heart className="h-6 w-6 fill-primary stroke-white mr-2" />
                <span className="text-xl font-bold text-primary">Hemolyze</span>
              </div>
            ) : (
              <Heart className="h-6 w-6 fill-primary stroke-white mx-auto" />
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-base-300">
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-3 rounded-lg hover:bg-base-300 transition-colors ${
                  location.pathname === "/dashboard"
                    ? "bg-primary/10 text-primary"
                    : ""
                }`}>
                <BarChart3
                  size={20}
                  className={
                    location.pathname === "/dashboard" ? "text-primary" : ""
                  }
                />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/requests"
                className={`flex items-center p-3 rounded-lg hover:bg-base-300 transition-colors ${
                  location.pathname === "/dashboard/requests"
                    ? "bg-primary/10 text-primary"
                    : ""
                }`}>
                <Droplet
                  size={20}
                  className={
                    location.pathname === "/dashboard/requests"
                      ? "text-primary"
                      : ""
                  }
                />
                {isSidebarOpen && (
                  <span className="ml-3">Donation Requests</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/blood-requests"
                className={`flex items-center p-3 rounded-lg hover:bg-base-300 transition-colors ${
                  location.pathname === "/dashboard/blood-requests"
                    ? "bg-primary/10 text-primary"
                    : ""
                }`}>
                <AlertCircle
                  size={20}
                  className={
                    location.pathname === "/dashboard/blood-requests"
                      ? "text-primary"
                      : ""
                  }
                />
                {isSidebarOpen && <span className="ml-3">Blood Requests</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/history"
                className={`flex items-center p-3 rounded-lg hover:bg-base-300 transition-colors ${
                  location.pathname === "/dashboard/history"
                    ? "bg-primary/10 text-primary"
                    : ""
                }`}>
                <Clock
                  size={20}
                  className={
                    location.pathname === "/dashboard/history"
                      ? "text-primary"
                      : ""
                  }
                />
                {isSidebarOpen && (
                  <span className="ml-3">Donation History</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/premium"
                className={`flex items-center p-3 rounded-lg hover:bg-base-300 transition-colors ${
                  location.pathname === "/dashboard/premium"
                    ? "bg-primary/10 text-primary"
                    : ""
                }`}>
                <Crown
                  size={20}
                  className={
                    location.pathname === "/dashboard/premium"
                      ? " text-amber-500"
                      : ""
                  }
                />
                {isSidebarOpen && (
                  <span className="ml-3">Premium Membership</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className={`flex items-center p-3 rounded-lg hover:bg-base-300 transition-colors ${
                  location.pathname === "/dashboard/profile"
                    ? "bg-primary/10 text-primary"
                    : ""
                }`}>
                <UserRound
                  size={20}
                  className={
                    location.pathname === "/dashboard/profile"
                      ? "text-primary"
                      : ""
                  }
                />
                {isSidebarOpen && <span className="ml-3">Profile</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Info */}
        {user && isSidebarOpen && (
          <div className="p-4 border-t border-base-300">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <UserRound size={18} className="text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300`}>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
