import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // You will add your own:
  // const [formData, setFormData] = useState({ email: "", password: "" });
  // const handleChange = (e) => { ... }
  // const handleSubmit = (e) => { ... }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <LogIn className="text-indigo-600" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to access your dashboard
          </p>
        </div>

        <form onSubmit={() => {}} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
              // onChange={handleChange}
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Email address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
              // onChange={handleChange}
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition transform hover:scale-[1.01]"
          >
            Login
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
