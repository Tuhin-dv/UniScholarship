import React, { useState, useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPlusCircle,
  FaListUl,
  FaClipboardList,
  FaStar,
  FaTimes,
  FaBars,
  FaHome,
  FaBell,
  FaChevronRight,
  FaGraduationCap,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext/AuthContext";
import useUserRole from "../hooks/useUserRole";

const menuItems = [
  // ✅ Common routes for all roles
  {
    roles: ["user", "moderator", "admin"],
    items: [
      {
        to: "/dashboard/my-profile",
        icon: FaUser,
        label: "My Profile",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
    ],
  },

  // ✅ Normal user specific routes
  {
    roles: ["user"],
    items: [
      {
        to: "/dashboard/my-application",
        icon: FaClipboardList,
        label: "My Application",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
      {
        to: "/dashboard/my-reviews",
        icon: FaStar,
        label: "My Reviews",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      },
    ],
  },

  // ✅ Moderator specific routes
  {
    roles: ["moderator"],
    items: [
      {
        to: "/dashboard/manage-scholarships",
        icon: FaListUl,
        label: "Manage Scholarships",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        to: "/dashboard/all-reviews",
        icon: FaStar,
        label: "All Reviews",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      },
      {
        to: "/dashboard/all-applied",
        icon: FaClipboardList,
        label: "All Applied Scholarships",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
      {
        to: "/dashboard/add-scholarship",
        icon: FaPlusCircle,
        label: "Add Scholarship",
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
    ],
  },

  //  Admin specific routes
  {
    roles: ["admin"],
    items: [
      {
        to: "/dashboard/manage-scholarships",
        icon: FaListUl,
        label: "Manage Scholarships",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        to: "/dashboard/all-applied",
        icon: FaClipboardList,
        label: "Manage Applied Applications",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
      {
        to: "/dashboard/manage-users",
        icon: FaListUl,
        label: "Manage Users",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        to: "/dashboard/all-reviews",
        icon: FaStar,
        label: "All Reviews",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      },
      {
        to: "/dashboard/add-scholarship",
        icon: FaPlusCircle,
        label: "Add Scholarship",
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
    ],
  },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
console.log(role)
  if (roleLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center space-y-6">
            {/* Animated Loading Spinner */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
              <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 absolute top-2 left-2 animate-reverse"></div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Applications</h3>
              <p className="text-gray-600">Please wait while we fetch your applications...</p>
            </div>
          </div>
        </div>
      </div>
    );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">
        Please login to access the dashboard.
      </div>
    );
  }

  // Filter menu sections based on user role
  const filteredMenuSections = menuItems.filter((section) => section.roles.includes(role));

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 flex-shrink-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            {isSidebarOpen ? (
              <FaTimes className="w-5 h-5 text-gray-600" />
            ) : (
              <FaBars className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-700 rounded-lg flex items-center justify-center">
              <FaHome className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
              <FaBell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            <button onClick={() => setIsProfileModalOpen(true)}>
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <FaUser className="w-5 h-5 text-white" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed lg:static lg:inset-y-0 inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl lg:shadow-xl
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-gray-200 lg:border-r-2 flex flex-col h-full`}
        >
          {/* Sidebar Header - Fixed */}
          <div className="sticky top-0 z-10 p-[18px] border-b">
            <div className="flex items-center justify-between">
              <Link to="/">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 text-sky-500 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <FaGraduationCap size={28} />
                  </div>
                  <div className="flex items-center space-x-2 text-black font-extrabold text-2xl transition">
                    <span>UniScholar</span>
                  </div>
                </div>
              </Link>
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <FaTimes className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Navigation - Scrollable */}
          <div className="flex-1 overflow-y-auto bg-white p-6 space-y-8">
            {filteredMenuSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <NavLink
                    key={itemIndex}
                    to={item.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                        isActive
                          ? " border-b-4 border-sky-500  text-black shadow-lg"
                          : `hover:${item.bgColor} text-gray-700 font-bold hover:${item.color} hover:shadow-md`
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-white/70 text-sky-500"
                              : `${item.bgColor} ${item.color} group-hover:scale-110`
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <span className="font-semibold text-sm">{item.label}</span>
                        </div>

                        <FaChevronRight
                          className={`w-3 h-3 transition-all duration-300 ${
                            isActive
                              ? "text-white translate-x-1"
                              : "text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1"
                          }`}
                        />

                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200 flex-shrink-0 z-30">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl flex items-center justify-center">
                    <FaHome className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-600">Manage scholarships and applications</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="relative p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
                    <FaBell className="w-5 h-5 text-gray-600" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </button>

                  <button onClick={() => setIsProfileModalOpen(true)}>
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 shadow-sm"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <FaUser className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content - Scrollable */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              aria-label="Close Profile Modal"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center gap-4 mt-4">
              <img
                src={user?.photoURL || "https://i.ibb.co/0Jmshvb/default-profile.jpg"}
                alt="User"
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
              />
              <h3 className="text-lg font-semibold text-purple-800">{user?.displayName || "User"}</h3>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <button
                onClick={() => {
                  logout();
                  setIsProfileModalOpen(false);
                  navigate("/");
                }}
                className="mt-4 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
