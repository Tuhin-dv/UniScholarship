import { updateProfile } from "firebase/auth"; // make sure this is imported
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();


  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const result = await createUser(data.email, data.password);

      // 🛠️ Update Firebase profile with name
      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: "",
      });

      const createdUser = result.user;

      const userInfo = {
        name: data.name, // now this will work
        email: createdUser.email,
        photoURL: "",
        role: "user",
        createdAt: new Date().toISOString(),
        lastLogIn: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/users", userInfo);

      if (res.status === 200 || res.status === 201) {
        toast.success("Account created Successfully! 🎉");
        navigate("/");
      } else {
        toast.error("User created but failed to save in DB.");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      const result = await googleSignIn();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        createdAt: new Date().toISOString(),
        lastLogIn: new Date().toISOString(),
      };

      const checkRes = await axiosSecure.get(`/users?email=${user.email}`);
      if (!checkRes.data.exists) {
        await axiosSecure.post("/users", userInfo);
      }

      toast.success("Login successful! 🎉");
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error.message);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const password = watch("password", "");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-xl  border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <FaUser className="text-white text-xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Join UniScholar</h2>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your full name"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

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
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
                  minLength: { value: 6, message: "Minimum 6 characters required" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    message: "Must include 1 uppercase & 1 special character",
                  },
                })}
                placeholder="Create a strong password"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              <>
                <FaUser className="text-sm" />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500 bg-white">or continue with</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isGoogleLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
              Connecting...
            </>
          ) : (
            <>
              <FaGoogle className="text-red-500 text-lg" />
              Continue with Google
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
