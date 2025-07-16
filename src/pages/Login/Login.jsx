"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios"; // axios instance hooked with baseURL and interceptors

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxios(); // axios instance for secure requests

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to get JWT token from backend and store in localStorage
  const fetchAndStoreJwt = async (email) => {
    try {
      // Call backend JWT token generation route
      const response = await axiosSecure.post("/jwt", { email });
      const token = response.data.token;
      // Store token in localStorage
      localStorage.setItem("uniScholar-token", token);
    } catch (err) {
      toast.error("Failed to get authorization token.");
    }
  };

  // Handler for email/password login
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn(data.email, data.password);
      console.log("User logged in:", result.user);

      // After login success, fetch JWT token & store it
      await fetchAndStoreJwt(result.user.email);

      toast.success("Login successful! 🎉");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for Google social login
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Prepare user info for database
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // Check if user exists, if not create new user in DB
      const checkRes = await axiosSecure.get(`/users?email=${user.email}`);
      if (!checkRes.data.exists) {
        await axiosSecure.post("/users", userInfo);
      }

      // After Google login success, fetch JWT token & store it
      await fetchAndStoreJwt(user.email);

      toast.success("Login successful! 🎉");
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error.message);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl w-full border border-white/20 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <FaLock className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your UniScholar account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-4 border-2 text-black border-gray-200 rounded-xl bg-gray-50 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-500 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500 bg-white">or continue with</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
        >
          {isGoogleLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
              Signing in with Google...
            </>
          ) : (
            <>
              <FaGoogle className="text-red-500 text-lg" />
              Sign in with Google
            </>
          )}
        </button>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
