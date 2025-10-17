// /src/components/Footer.jsx
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Ride<span className="text-indigo-500">WithUs</span>
          </h2>
          <p className="text-sm text-gray-400">
            Connecting riders and drivers seamlessly across the city — safe,
            fast, and reliable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link to="/rides" className="hover:text-indigo-400">Rides</Link></li>
            <li><Link to="/drivers" className="hover:text-indigo-400">Drivers</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-indigo-400">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-indigo-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-indigo-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-indigo-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-indigo-400"><Github size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RideWithUs — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
