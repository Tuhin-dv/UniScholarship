import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { FaBars, FaGraduationCap, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl",
        confirmButton:
          "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl px-6 py-2",
        cancelButton:
          "bg-gray-200 text-gray-700 font-bold rounded-xl px-6 py-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            toast.success("Logout successful!");
          })
          .catch(() => {
            toast.error("Logout failed!");
          });
      }
    });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              isActive
                ? "border-b-4 border-[#990f2d] text-[#990f2d] "
                : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-scholarships"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              isActive
                ? "border-b-4 border-[#990f2d] text-[#990f2d] "
                : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            }`
          }
        >
          All Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              isActive
                ? "border-b-4 border-[#990f2d] text-[#990f2d] "
                : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>
      {!user && (
        <li className="pl-8">
          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="relative px-6 py-3 border border-purple-700  text-purple-600 font-bold rounded-xl shadow-lg  transform  overflow-hidden group"
          >
            <span className="relative z-10">Login</span>
           
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg">
      <div className="max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-[#990f2d] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <FaGraduationCap className="text-white text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-black ">
                UniScholar
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Education Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav + User */}
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="flex items-center space-x-4">{navLinks}</ul>

            {/* Profile Modal Toggle */}
            {user && (
              <button
                onClick={() => setUserModalOpen(true)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {user?.displayName?.charAt(0) ||
                    user.email?.charAt(0) ||
                    "U"}
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              {menuOpen ? (
                <FaTimes className="text-gray-700 text-lg" />
              ) : (
                <FaBars className="text-gray-700 text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {user && (
              <button
                onClick={() => {
                  setUserModalOpen(true);
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-4 w-full p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100 hover:from-purple-100 hover:to-blue-100 transition-all duration-300"
              >
                <div className="w-12 h-12  rounded-full flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-r from-purple-600 to-blue-600">
                  {user.displayName?.charAt(0) ||
                    user.email?.charAt(0) ||
                    "U"}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-600">View Profile</p>
                </div>
              </button>
            )}
            <ul className="space-y-3">{navLinks}</ul>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* User Modal */}
      {userModalOpen && (
        <div className="fixed inset-0 z-[60] flex mt-[350px] items-center justify-center p-4 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white relative">
              <button
                onClick={() => setUserModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30"
              >
                <FaTimes className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">User Profile</h2>
                  <p className="text-purple-100">Account Information</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Full Name
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {user?.displayName || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Email Address
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Account Type
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {user?.role || "Student"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setUserModalOpen(false)}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setUserModalOpen(false);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    setUserModalOpen(false);
                    handleLogout();
                  }}
                  className="w-full  px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
