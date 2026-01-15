import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import image1 from "../assets/map.png";
import apImg from "../assets/ap.png";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        <motion.div className="flex-1">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome {isAuthenticated ? user?.full_name : "Guest"}
          </h1>

          <button
            onClick={() => navigate(isAuthenticated ? "/rides" : "/signup")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            Get Started <ArrowRight />
          </button>
        </motion.div>

        <img src={image1} className="rounded-2xl shadow-xl flex-1" />
      </div>

      <div className="py-16 bg-white">
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[
            { title: "Fast Booking", img: apImg },
            { title: "Trusted Drivers", img: apImg },
            { title: "Affordable Prices", img: apImg }
          ].map((f, i) => (
            <div key={i} className="rounded-2xl shadow-lg overflow-hidden">
              <img src={f.img} className="h-48 w-full object-cover" />
              <div className="p-6 font-semibold">{f.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
