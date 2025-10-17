import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions, feedback, or support requests? Fill out the form and we’ll get back to you shortly.
          </p>

          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500" />
            <input type="email" placeholder="Email" className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500" />
            <textarea placeholder="Your Message" rows="4" className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"></textarea>
            <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">Send Message</button>
          </form>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
          alt="Contact"
          className="rounded-2xl shadow-xl"
        />
      </div>
    </section>
  );
};

export default Contact;
