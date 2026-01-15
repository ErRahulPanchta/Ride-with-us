import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Car } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(state => state.auth);

  const navItems =
    user?.user_type === "driver"
      ? [{ name: "Dashboard", path: "/driver/dashboard" }]
      : [
          { name: "Home", path: "/" },
          { name: "Rides", path: "/rides" }
        ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <div
          className="text-xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          RideWithUs
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              className="font-medium text-gray-700 hover:text-indigo-600"
            >
              {item.name}
            </NavLink>
          ))}

          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              {/* USER ICON */}
              <button
                onClick={() => setShowUserMenu(prev => !prev)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <User className="text-gray-700" size={20} />
              </button>

              {/* DROPDOWN */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-800">
                      {user?.full_name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.user_type}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate("/current-ride");
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <Car size={16} />
                    Current Ride
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
