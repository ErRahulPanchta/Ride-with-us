import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import economyImg from "../assets/economy.webp";
import premiumImg from "../assets/premium.webp";
import sharedImg from "../assets/shared.webp";
import { useState } from "react";

const Rides = () => {
  const navigate = useNavigate();
  const [selectedRide, setSelectedRide] = useState(null);
  const [formData, setFormData] = useState({
    pickup_address: "",
    dropoff_address: ""
  });

  const rides = [
    { type: "Economy", title: "Economy Ride", fare: 200, img: economyImg },
    { type: "Premium", title: "Premium Ride", fare: 500, img: premiumImg },
    { type: "Shared", title: "Shared Ride", fare: 100, img: sharedImg }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        ...summaryApi.requestRide,
        data: {
          pickup_address: formData.pickup_address,
          dropoff_address: formData.dropoff_address,
          pickup_lat: 31.1048,
          pickup_lng: 77.1734,
          dropoff_lat: 31.1045,
          dropoff_lng: 77.1731,
          fare_amount: selectedRide.fare,
          ride_type: selectedRide.type
        }
      });

      toast.success("Ride requested");
      navigate(`/ride/${res.data.data.id}`);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Ride request failed");
    }
  };


  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">Choose Your Ride</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {rides.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow rounded-2xl overflow-hidden"
          >
            <img src={r.img} className="h-52 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="text-indigo-600 mt-2">₹{r.fare}</p>
              <button
                onClick={() => setSelectedRide(r)}
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedRide && (
        <div className="max-w-xl mx-auto mt-12 bg-white shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Book {selectedRide.title}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Pickup Address"
              className="w-full border px-4 py-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, pickup_address: e.target.value })
              }
            />

            <input
              required
              placeholder="Dropoff Address"
              className="w-full border px-4 py-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, dropoff_address: e.target.value })
              }
            />

            <button className="w-full py-2 bg-indigo-600 text-white rounded">
              Confirm Ride • ₹{selectedRide.fare}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Rides;
