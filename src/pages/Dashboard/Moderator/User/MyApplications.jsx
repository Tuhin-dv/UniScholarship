import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

const MyApplications = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {
        data: applications = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["myApplications", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/user/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading)
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
                                Loading Applications
                            </h3>
                            <p className="text-gray-600">
                                Please wait while we fetch your applications...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Something went wrong!
                    </h3>
                    <p className="text-gray-600">
                        We couldn't load your applications. Please try again.
                    </p>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
                        <svg
                            className="w-8 h-8 text-white"
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
                    <h1 className="text-4xl font-bold text-white">My Applications</h1>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                        Track and manage all your scholarship applications in one place.
                        Monitor status updates and take actions as needed.
                    </p>
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">Total: {applications.length}</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">
                                Pending:{" "}
                                {applications.filter((app) => app.status === "Pending").length}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3  bg-green-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">
                                Completed:{" "}
                                {
                                    applications.filter((app) => app.status === "Completed")
                                        .length
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* Applications Content */}
                {applications.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                        <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6">
                            <svg
                                className="w-12 h-12 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            No Applications Found
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            You haven't submitted any scholarship applications yet. Start
                            exploring available scholarships and submit your first
                            application.
                        </p>
                        <Link to='/all-scholarships'>
                            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Browse Scholarships
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Applications Grid */}
                        <div className="grid gap-6">
                            {applications.map((app, index) => (
                                <div
                                    key={app._id}
                                    className="group relative bg-white/20 border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden  border-gray-100 hover:border-purple-200"
                                >
                                    {/* Card Header------------------------------ */}
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold text-lg">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                                                        {app.universityName}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Application #{app._id.slice(-6).toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Status Badge */}
                                            <div>
                                                <span
                                                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${app.status === "Pending"
                                                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                                                        : app.status === "Processing"
                                                            ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                                                            : app.status === "Completed"
                                                                ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                                                                : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                                                        }`}
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        {app.status === "Pending" && (
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                                clipRule="evenodd"
                                                            />
                                                        )}
                                                        {app.status === "Processing" && (
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                                                clipRule="evenodd"
                                                            />
                                                        )}
                                                        {app.status === "Completed" && (
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        )}
                                                        {app.status === "Rejected" && (
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                                clipRule="evenodd"
                                                            />
                                                        )}
                                                    </svg>
                                                    {app.status || "Pending"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                            {/* Subject */}
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <svg
                                                            className="w-4 h-4 text-blue-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                                                        Address
                                                    </h4>
                                                </div>
                                                <p className="text-lg font-bold text-white">
                                                    {app.userAddress || "N/A"}

                                                </p>
                                            </div>

                                            {/* Degree---------------------------------------- */}
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <svg
                                                            className="w-4 h-4 text-green-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                                                        Degree
                                                    </h4>
                                                </div>
                                                <p className="text-lg text-white font-bold ">
                                                    {app.degree}
                                                </p>
                                            </div>

                                            {/* Application Fees---------------------------------- */}
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                        <svg
                                                            className="w-4 h-4 text-purple-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <h4 className="text-sm text-white font-semibold  uppercase tracking-wide">
                                                        Fees
                                                    </h4>
                                                </div>
                                                <p className="text-lg text-white font-bold">
                                                    ${app.applicationFees || 0}
                                                </p>
                                            </div>

                                            {/* Feedback */}
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                        <svg
                                                            className="w-4 h-4 text-orange-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                                        Feedback
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border">
                                                    {app.feedback || "No feedback available"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                                            <Link
                                                to={`/dashboard/application-details/${app._id}`}
                                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Details
                                            </Link>

                                            {app.status === "Pending" ? (
                                                <Link
                                                    to={`/dashboard/edit-application/${app._id}`}
                                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                    Edit
                                                </Link>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed opacity-60"
                                                >
                                                    <svg
                                                        className="w-4 h-4 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                            )}


                                        </div>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-600/5 to-blue-600/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
