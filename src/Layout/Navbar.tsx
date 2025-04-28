import { Link, useLocation } from "react-router";
import DarkMode from "../Component/DarkMode";
import { Heart, Users } from "lucide-react";
import useAuthContext from "../Hooks/useAuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const currentLocation = useLocation();

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {user && (
                <li>
                  <Link to="/dashboard" className="">
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <Link to="/available-donors" className="flex items-center">
                  <Users size={16} className="mr-2" />
                  Available Donors
                </Link>
              </li>

              {currentLocation.pathname == "/" && (
                <>
                  <li>
                    <a href="#benefits">Benefits</a>
                  </li>
                  <li>
                    <a href="#statistics">Statistics</a>
                  </li>
                  <li>
                    <a href="#testimonials">Testimonials</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl text-primary">
            <Heart className="h-6 w-6 fill-primary stroke-white mr-2" />
            Hemolyze
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user && (
              <li>
                <Link to="/dashboard" className="">
                  Dashboard
                </Link>
              </li>
            )}

            <li>
              <Link to="/available-donors" className="flex items-center">
                <Users size={16} className="mr-2" />
                Available Donors
              </Link>
            </li>

            {currentLocation.pathname == "/" && (
              <>
                <li>
                  <a href="#benefits">Benefits</a>
                </li>
                <li>
                  <a href="#statistics">Statistics</a>
                </li>
                <li>
                  <a href="#testimonials">Testimonials</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <DarkMode />
                  <Link to={"/dashboard/profile"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-center">
              <DarkMode />
              <Link to="/login" className="btn btn-primary text-white">
                Login
              </Link>{" "}
            </div>
          )}
        </div>
      </div>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
