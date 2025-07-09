import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaUser,
  FaPlusCircle,
  FaListUl,
  FaClipboardList,
  FaStar,
  FaArrowLeft,
  FaBars,
  FaTimes,
  FaHome,
  FaCog,
  FaBell,
  FaChevronRight,
  FaGraduationCap,
} from "react-icons/fa";
import { FiFolder } from "react-icons/fi";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      // moderator route-------------------------------------------
      items: [
        {
          to: "/dashboard/my-profile",
          icon: FaUser,
          label: "My Profile",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          to: "/dashboard/manage-scholarships",
          icon: FaListUl,
          label: "Manage Scholarships",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
        {
          to: "/dashboard/add-scholarship",
          icon: FaPlusCircle,
          label: "Add Scholarship",
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          to: "/dashboard/all-applied",
          icon: FaClipboardList,
          label: "All Applied Scholarships",
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          to: "/dashboard/all-reviews",
          icon: FaStar,
          label: "All Reviews",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
        },
      ],
    },
    {
    //user route----------------------------
      items: [
        {
          to: "/dashboard/my-application",
          icon: FiFolder,
          label: "My Application",
          color: "text-indigo-600",
          bgColor: "bg-indigo-50",
        },
      ],
    },
  ];

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
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <FaHome className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Moderator Dashboard
            </h1>
          </div>

          <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
            <FaBell className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
            fixed lg:static lg:inset-y-0 inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl lg:shadow-xl
            transform transition-transform duration-300 ease-in-out lg:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            border-r border-gray-200 lg:border-r-2 flex flex-col h-full
          `}
        >
          {/* Sidebar Header - Fixed */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-700 p-6 border-b border-purple-500 shadow-lg">
            <div className="flex items-center justify-between">
              <Link to='/'>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <FaGraduationCap size={28} />
                  </div>
                  <div className="flex items-center space-x-2 text-white font-extrabold text-2xl  transition">
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
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-6 space-y-8">
              {menuItems.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  {/* Section Title */}
                  <div className="flex items-center space-x-2 px-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                      {section.title}
                    </h3>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <NavLink
                        key={itemIndex}
                        to={item.to}
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                          `group relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${isActive
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                            : `hover:${item.bgColor} text-gray-700 hover:${item.color} hover:shadow-md`
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${isActive
                                ? "bg-white/20 text-white"
                                : `${item.bgColor} ${item.color} group-hover:scale-110`
                                }`}
                            >
                              <item.icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1">
                              <span className="font-semibold text-sm">
                                {item.label}
                              </span>
                            </div>

                            <FaChevronRight
                              className={`w-3 h-3 transition-all duration-300 ${isActive
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
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-200 pt-6">
                <NavLink
                  to="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className="group flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-200 text-gray-600 group-hover:bg-gray-300 group-hover:scale-110 transition-all duration-300">
                    <FaArrowLeft className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">Back to Home</span>
                  <FaChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                </NavLink>
              </div>

              {/* Bottom Decoration */}
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <FaStar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Admin Panel
                    </p>
                    <p className="text-xs text-gray-600">Premium Access</p>
                  </div>
                </div>
              </div>
            </div>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <FaHome className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Moderator Dashboard
                    </h1>
                    <p className="text-sm text-gray-600">
                      Manage scholarships and applications
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="relative p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
                    <FaBell className="w-5 h-5 text-gray-600" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </button>

                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <FaUser className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content - Scrollable */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
