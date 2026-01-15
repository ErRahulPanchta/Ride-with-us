import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

const Login = () => {
  const [role, setRole] = useState(null); // "rider" | "driver"
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        ? summaryApi.loginDriver
        : summaryApi.loginRider;

    const response = await Axios({
      ...api,
      data: formData
    });

    const { user, token } = response.data.data;

    dispatch(
      loginSuccess({
        user,
        token
      })
    );

    toast.success("Login successful");

    navigate(role === "driver" ? "/driver/dashboard" : "/rides");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed");
  }
};


  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <LogIn className="mx-auto text-indigo-600" size={40} />
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Login
          </h2>
        </div>

        {/* ROLE SELECTION */}
        {!role && (
          <div className="space-y-4">
            <button
              onClick={() => setRole("rider")}
              className="w-full py-3 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition"
            >
              Login as Rider
            </button>

            <button
              onClick={() => setRole("driver")}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Login as Driver
            </button>
          </div>
        )}

        {/* LOGIN FORM */}
        {role && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

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
              Login as {role === "driver" ? "Driver" : "Rider"}
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

export default Login;
