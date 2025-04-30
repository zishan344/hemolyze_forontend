import { useState, useEffect } from "react";
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
  DollarSign,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../Hooks/useAuthContext";

import { Toaster } from "react-hot-toast";

import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { user, logoutUser } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);

      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure signout account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, signout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        Swal.fire({
          title: "Done!",
          text: "Your account signing out.",
          icon: "success",
        });
        navigate("/login");
      }
    });
  };

  // Define type for navigation items
  type NavItem = {
    path: string;
    icon: React.ReactElement;
    label: string;
    adminOnly?: boolean;
  };

  // Base navigation items
  const baseNavItems: NavItem[] = [
    { path: "/dashboard", icon: <BarChart3 size={20} />, label: "Dashboard" },
    {
      path: "/dashboard/requests",
      icon: <Droplet size={20} />,
      label: "Donation Requests",
    },
    {
      path: "/dashboard/blood-requests",
      icon: <AlertCircle size={20} />,
      label: "Blood Requests",
    },
    {
      path: "/dashboard/history",
      icon: <Clock size={20} />,
      label: "Donation History",
    },
    {
      path: "/dashboard/fund-history",
      icon: <DollarSign size={20} />,
      label: "Fund Donation",
    },
    { path: "/dashboard/premium", icon: <Crown size={20} />, label: "Premium" },
    {
      path: "/dashboard/profile",
      icon: <UserRound size={20} />,
      label: "Profile",
    },
  ];

  // Add admin dashboard link for admin users
  const adminNavItem: NavItem = {
    path: "/dashboard/admin",
    icon: <ShieldCheck size={20} />,
    label: "Admin Dashboard",
    adminOnly: true,
  };

  // Combine navigation items based on user role
  const navItems: NavItem[] =
    user?.role === "admin" ? [...baseNavItems, adminNavItem] : baseNavItems;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-base-200">
      {/* Mobile Top Navigation */}
      {isMobile && (
        <div className="bg-base-100 w-full p-2 shadow-lg z-10 fixed top-0 left-0">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-6 w-6 fill-primary stroke-white mr-2" />
              <span className="text-xl font-bold text-primary">Hemolyze</span>
            </Link>

            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-base-300">
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile Horizontal Navigation */}
          {isSidebarOpen && (
            <div className="overflow-x-auto pb-2 pt-4">
              <div className="flex space-x-4 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center p-2 rounded-lg hover:bg-base-300 transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : ""
                    }`}>
                    <span
                      className={
                        location.pathname === item.path ? "text-primary" : ""
                      }>
                      {item.path === "/dashboard/premium" &&
                      location.pathname === "/dashboard/premium" ? (
                        <Crown size={20} className="text-amber-500" />
                      ) : (
                        item.icon
                      )}
                    </span>
                    <span className="text-xs mt-1">{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center p-2 rounded-lg hover:bg-red-100 text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                  <span className="text-xs mt-1">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`bg-base-100 shadow-lg transition-all duration-300 flex flex-col ${
          isSidebarOpen ? "md:w-64" : "md:w-20"
        } ${isMobile ? "hidden" : "fixed h-full"}`}>
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
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg hover:bg-base-300 transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : ""
                  } ${item?.adminOnly ? "text-success font-medium" : ""}`}>
                  <span
                    className={
                      item.path === "/dashboard/premium" &&
                      location.pathname === "/dashboard/premium"
                        ? "text-amber-500"
                        : item.path === "/dashboard/admin"
                        ? "text-success"
                        : location.pathname === item.path
                        ? "text-primary"
                        : ""
                    }>
                    {item.icon}
                  </span>
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}

            {!isSidebarOpen && (
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 transition-colors p-2 mt-4"
                title="Logout">
                <LogOut size={18} />
              </button>
            )}
          </ul>
        </nav>

        {/* User Info */}
        {user && isSidebarOpen && (
          <div className="p-4 border-t border-base-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <UserRound size={18} className="text-primary" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  {user.role === "admin" && (
                    <p className="text-xs text-success">Administrator</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 transition-colors p-2"
                title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isMobile ? "mt-[100px]" : isSidebarOpen ? "md:ml-64" : "md:ml-20"
        } transition-all duration-300`}>
        <div className="p-6 bg-base-200">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
