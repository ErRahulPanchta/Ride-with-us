import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/map.png"
import apImg from "../assets/ap.png"


const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
            Your <span className="text-indigo-600">Ride</span> Awaits — Anytime, Anywhere.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Fast, safe, and affordable rides. Experience convenience at your fingertips.
          </p>
          <button
            onClick={() => navigate("/rides")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-medium flex items-center gap-2 hover:bg-indigo-700 transition"
          >
            Book a Ride <ArrowRight size={20} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <img
            src={image1}
            alt="Ride Illustration"
            className="rounded-2xl shadow-xl w-full"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[
            { title: "Fast Booking", img: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51", desc: "Book rides instantly with our intuitive app experience." },
            { title: "Trusted Drivers", img: "https://images.unsplash.com/photo-1549924231-f129b911e442", desc: "All our drivers are verified for safety and reliability." },
            { title: "Affordable Prices", img: apImg, desc: "Transparent pricing and no hidden fees — ever." }
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={/^https?:\/\//.test(f.img) ? `${f.img}?auto=format&fit=crop&w=600&q=80` : f.img}
                alt={f.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">{f.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
