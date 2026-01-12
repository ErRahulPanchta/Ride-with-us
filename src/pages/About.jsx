import { motion } from "framer-motion";
import au from "../assets/au.png"

const About = () => {
  return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src={au}
          alt="About us"
          className="rounded-2xl shadow-xl"
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About RideWithUs</h2>
          <p className="text-gray-600 mb-6">
            We’re redefining urban mobility by connecting riders and drivers through technology.
            Whether you’re heading to work or exploring the city, we make commuting smoother, faster, and more enjoyable.
          </p>
          <p className="text-gray-600">
            Our mission is to bring reliable rides to everyone — no matter where you are.
            We value safety, transparency, and innovation, with a commitment to sustainability.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
