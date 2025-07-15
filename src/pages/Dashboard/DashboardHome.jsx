import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/applications?email=${user.email}`)
        .then((res) => {
          setApplications(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

  const pendingCount = applications.filter(
    (a) => a.status === "Pending",
  ).length;
  const approvedCount = applications.filter(
    (a) => a.status === "Completed",
  ).length;
  const rejectedCount = applications.filter(
    (a) => a.status === "Rejected",
  ).length;

  if (loading) {
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Loading Dashboard
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch your data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-blue-700 rounded-3xl shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                  Welcome to Your Dashboard,
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    {user?.displayName || user?.name || "User"}!
                  </span>
                </h1>
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <div className="flex items-center bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                    <svg
                      className="w-4 h-4 text-yellow-300 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white font-semibold text-sm">
                      Role: {user?.role || "User"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Preview */}
              <div className="flex space-x-4">
                <div className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[80px]">
                  <div className="text-2xl font-bold text-white">
                    {applications.length}
                  </div>
                  <div className="text-xs text-purple-100">Total</div>
                </div>
                <div className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[80px]">
                  <div className="text-2xl font-bold text-white">
                    {pendingCount}
                  </div>
                  <div className="text-xs text-purple-100">Pending</div>
                </div>
                <div className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[80px]">
                  <div className="text-2xl font-bold text-white">
                    {approvedCount}
                  </div>
                  <div className="text-xs text-purple-100">Approved</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Applications Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                    {applications.length}
                  </div>
                  <div className="text-xs text-purple-600 group-hover:text-purple-200 font-semibold transition-colors duration-300">
                    +{applications.length > 0 ? "12%" : "0%"} this month
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                Total Applications
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-purple-100 transition-colors duration-300">
                All submitted applications
              </p>
              <div className="mt-4 w-full bg-purple-100 group-hover:bg-white/20 rounded-full h-2 transition-colors duration-300">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Pending Applications Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                    {pendingCount}
                  </div>
                  <div className="text-xs text-orange-600 group-hover:text-orange-200 font-semibold transition-colors duration-300">
                    Awaiting review
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                Pending Review
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-orange-100 transition-colors duration-300">
                Applications under review
              </p>
              <div className="mt-4 w-full bg-orange-100 group-hover:bg-white/20 rounded-full h-2 transition-colors duration-300">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${applications.length > 0 ? (pendingCount / applications.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Approved Applications Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                    {approvedCount}
                  </div>
                  <div className="text-xs text-green-600 group-hover:text-green-200 font-semibold transition-colors duration-300">
                    Successfully approved
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                Approved
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-green-100 transition-colors duration-300">
                Successfully completed
              </p>
              <div className="mt-4 w-full bg-green-100 group-hover:bg-white/20 rounded-full h-2 transition-colors duration-300">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${applications.length > 0 ? (approvedCount / applications.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Rejected Applications Card */}
          <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                    {rejectedCount}
                  </div>
                  <div className="text-xs text-red-600 group-hover:text-red-200 font-semibold transition-colors duration-300">
                    Need improvement
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                Rejected
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-red-100 transition-colors duration-300">
                Applications declined
              </p>
              <div className="mt-4 w-full bg-red-100 group-hover:bg-white/20 rounded-full h-2 transition-colors duration-300">
                <div
                  className="bg-gradient-to-r from-red-500 to-rose-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${applications.length > 0 ? (rejectedCount / applications.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="group flex items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl hover:from-purple-100 hover:to-blue-100 transition-all duration-300 border border-purple-100 hover:border-purple-200">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">New Application</h3>
                <p className="text-sm text-gray-600">
                  Submit a new scholarship application
                </p>
              </div>
            </button>

            <button className="group flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-100 hover:border-green-200">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 4a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">
                  View All Applications
                </h3>
                <p className="text-sm text-gray-600">
                  Browse all your applications
                </p>
              </div>
            </button>

            <button className="group flex items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl hover:from-orange-100 hover:to-yellow-100 transition-all duration-300 border border-orange-100 hover:border-orange-200">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Help & Support</h3>
                <p className="text-sm text-gray-600">
                  Get assistance with applications
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
