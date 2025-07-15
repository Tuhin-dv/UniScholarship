import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const ForbiddenAccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-purple-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center relative overflow-hidden">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-purple-500 text-white flex items-center justify-center rounded-full shadow-lg animate-pulse">
          <FaLock className="text-3xl" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Forbidden Access
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-lg mb-6">
          You don’t have permission to view this page. Please contact the admin or return to the homepage.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Back to Home
        </Link>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-red-200 rounded-full blur-2xl opacity-20 animate-bounce" />

        {/* Custom Animation */}
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            .animate-bounce {
              animation: bounce 4s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ForbiddenAccess;
