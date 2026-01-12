import { motion } from "framer-motion";
import economyImg from "../assets/economy.webp"
import premiumImg from "../assets/premium.webp"
import sharedImg from "../assets/shared.webp" 

const Rides = () => {
  const rides = [
    { title: "Economy Ride", price: "₹100 - ₹300", img: economyImg },
    { title: "Premium Ride", price: "₹300 - ₹800", img: premiumImg },
    { title: "Shared Ride", price: "₹50 - ₹150", img: sharedImg },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Choose Your Ride</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {rides.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition"
          >
            <img src={`${r.img}?auto=format&fit=crop&w=600&q=80`} alt={r.title} className="h-52 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">{r.title}</h3>
              <p className="text-indigo-600 font-medium mt-2">{r.price}</p>
              <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Rides;
