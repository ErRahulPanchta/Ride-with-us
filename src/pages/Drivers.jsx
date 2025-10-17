import { motion } from "framer-motion";

const Drivers = () => {
    const drivers = [
        { name: "Rahul Singh", rating: 4.9, img: "https://randomuser.me/api/portraits/men/12.jpg" },
        { name: "Amit Kumar", rating: 4.8, img: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Priya Sharma", rating: 4.7, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    ];

    return (
        <section className="min-h-screen bg-white py-16 px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Meet Our Top Drivers</h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                {drivers.map((d, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-indigo-50 rounded-2xl shadow-lg text-center p-6 hover:bg-indigo-100 transition"
                    >
                        <img src={d.img} alt={d.name} className="w-28 h-28 mx-auto rounded-full mb-4 object-cover shadow-md" />
                        <h3 className="text-lg font-semibold text-gray-800">{d.name}</h3>
                        <p className="text-yellow-500 font-medium mt-1">⭐ {d.rating}</p>
                        <p className="text-gray-500 mt-2 text-sm">Safe & Reliable Driver</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Drivers;
