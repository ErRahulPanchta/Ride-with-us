import { useState } from "react";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState(null); // "rider" | "driver"
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    license_number: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const api =
      role === "driver"
        ? summaryApi.registerDriver
        : summaryApi.registerRider;

    const payload =
      role === "driver"
        ? formData
        : {
            full_name: formData.full_name,
            email: formData.email,
            phone_number: formData.phone_number,
            password: formData.password
          };

    await Axios({
      ...api,
      data: payload
    });

    toast.success("Account created successfully");

    navigate("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Signup failed");
  }
};


  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <UserPlus className="mx-auto text-indigo-600" size={40} />
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Create Account
          </h2>
        </div>

        {/* ROLE SELECTION */}
        {!role && (
          <div className="space-y-4">
            <button
              onClick={() => setRole("rider")}
              className="w-full py-3 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition"
            >
              Sign up as Rider
            </button>
            <button
              onClick={() => setRole("driver")}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Sign up as Driver
            </button>
          </div>
        )}

        {/* FORM */}
        {role && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            {role === "driver" && (
              <input
                type="text"
                name="license_number"
                placeholder="License Number"
                required
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Create {role === "driver" ? "Driver" : "Rider"} Account
            </button>

            <button
              type="button"
              onClick={() => setRole(null)}
              className="w-full text-sm text-gray-500 hover:underline"
            >
              Go back
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Signup;
