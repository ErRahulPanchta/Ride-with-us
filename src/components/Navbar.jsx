import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Rides", path: "/rides" },
        { name: "Drivers", path: "/drivers" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const handleLogin = () => navigate("/login");
    const handleSignup = () => navigate("/signup");

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                {/* Brand */}
                <div
                    onClick={() => navigate("/")}
                    className="text-2xl font-bold tracking-tight cursor-pointer text-indigo-600"
                >
                    Ride<span className="text-gray-800">WithUs</span>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                                            : "text-gray-700 hover:text-indigo-600"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={handleLogin}
                        className="px-4 py-2 text-sm font-medium border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition"
                    >
                        Login
                    </button>
                    <button
                        onClick={handleSignup}
                        className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                    >
                        Sign Up
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md border-t">
                    <ul className="flex flex-col space-y-1 py-2">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-6 py-2 text-sm font-medium ${
                                            isActive
                                                ? "text-indigo-600 bg-indigo-50"
                                                : "text-gray-700 hover:text-indigo-600"
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                        <li className="flex space-x-3 px-6 pt-2">
                            <button
                                onClick={() => {
                                    handleLogin();
                                    setIsOpen(false);
                                }}
                                className="w-1/2 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    handleSignup();
                                    setIsOpen(false);
                                }}
                                className="w-1/2 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Sign Up
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
