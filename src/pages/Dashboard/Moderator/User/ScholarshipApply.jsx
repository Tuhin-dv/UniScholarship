import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

const ScholarshipApply = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // Fetch scholarship detail by id
  const {
    data: scholarship,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    phone: "",
    photoUrl: "",
    address: "",
    gender: "",
    degree: "",
    sscResult: "",
    hscResult: "",
    studyGap: "No",
  });

  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLoading)
    return (
      <div className="min-h-screen  p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center space-y-6">
            {/* Animated Loading Spinner */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
              <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 absolute top-2 left-2 animate-reverse"></div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Loading Scholarship
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch scholarship details...
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
            Failed to load scholarship
          </h3>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );

  if (!scholarship)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
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
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Scholarship not found
          </h3>
          <p className="text-gray-600">
            The scholarship you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    setIsPaid(true);
    toast.success("Payment successful! Now submit your application.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPaid) {
      toast.error("Please complete payment before submitting.");
      return;
    }

    setLoading(true);

    const applicationData = {
      scholarshipId: id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      userPhone: formData.phone,
      userPhoto: formData.photoUrl,
      userAddress: formData.address,
      gender: formData.gender,
      degree: formData.degree,
      sscResult: formData.sscResult,
      hscResult: formData.hscResult,
      studyGap: formData.studyGap,
      applicationDate: new Date().toISOString(),
      userName: user?.displayName || user?.name || "Anonymous",
      userEmail: user?.email || "NoEmail",
      status: "Pending",
    };

    try {
      const res = await axiosSecure.post("/applications", applicationData);
      if (res.data.insertedId) {
        toast.success("Application submitted successfully!");
        setLoading(false);
        setFormData({
          phone: "",
          photoUrl: "",
          address: "",
          gender: "",
          degree: "",
          sscResult: "",
          hscResult: "",
          studyGap: "No",
        });
        setIsPaid(false);
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-white"
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
          <h1 className="text-4xl font-bold text-gray-900">
            Scholarship Application
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete your application for{" "}
            <span className="text-white font-semibold">
              {scholarship.scholarshipName}
            </span>
          </p>
        </div>

        {/* Scholarship Info Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Scholarship Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-purple-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-purple-200">
                    University
                  </span>
                </div>
                <p className="text-lg font-bold">
                  {scholarship.universityName}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-purple-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-purple-200">
                    Category
                  </span>
                </div>
                <p className="text-lg font-bold">
                  {scholarship.scholarshipCategory}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-purple-200"
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
                  <span className="text-sm font-medium text-purple-200">
                    Application Fee
                  </span>
                </div>
                <p className="text-2xl font-bold">
                  ${scholarship.applicationFees}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          {!isPaid && (
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Payment Required
                  </h3>
                  <p className="text-gray-600">
                    Complete the payment to unlock the application form
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Amount to pay</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${scholarship.applicationFees}
                  </p>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Pay ${scholarship.applicationFees} to Apply</span>
              </button>
            </div>
          )}

          {/* Payment Success Banner */}
          {isPaid && (
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600"
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
                <div>
                  <h3 className="text-lg font-bold text-green-800">
                    Payment Successful!
                  </h3>
                  <p className="text-green-700">
                    You can now complete your application form below.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Application Form */}
        <div className="bg-white/10 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Form
            </h2>
            <p className="text-gray-600">
              Please fill out all required information carefully
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Personal Information
                  </h3>
                  <p className="text-sm text-white">
                    Basic personal details for your application
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="text-white">Phone Number *</span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      disabled={!isPaid}
                      className={`w-full px-4 text-black py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                        !isPaid
                          ? "bg-gray-100 border-gray-200 text-black cursor-not-allowed"
                          : "border-gray-200 focus:border-purple-500 bg-white"
                      }`}
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-black">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white">Gender *</span>
                    </label>
                    <select
                      required
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!isPaid}
                      className={`w-full text-black px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                        !isPaid
                          ? "bg-gray-100 border-gray-200 text-black cursor-not-allowed"
                          : "border-gray-200 focus:border-purple-500 bg-white"
                      }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white">Photo URL *</span>
                  </label>
                  <input
                    required
                    type="url"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    placeholder="Paste your photo URL here"
                    disabled={!isPaid}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                      !isPaid
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 focus:border-purple-500 bg-white"
                    }`}
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white">Address *</span>
                  </label>
                  <textarea
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Village, District, Country"
                    rows="3"
                    disabled={!isPaid}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 resize-none ${
                      !isPaid
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 focus:border-purple-500 bg-white"
                    }`}
                  />
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Academic Information
                  </h3>
                  <p className="text-sm text-white">
                    Your educational background and achievements
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Degree */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      <span className="text-white">Degree Level *</span>
                    </label>
                    <select
                      required
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      disabled={!isPaid}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                        !isPaid
                          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-gray-200 focus:border-blue-500 bg-white"
                      }`}
                    >
                      <option value="">Select Degree</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="Masters">Masters</option>
                    </select>
                  </div>

                  {/* Study Gap */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white">Study Gap</span>
                    </label>
                    <select
                      name="studyGap"
                      value={formData.studyGap}
                      onChange={handleChange}
                      disabled={!isPaid}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                        !isPaid
                          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-gray-200 focus:border-blue-500 bg-white"
                      }`}
                    >
                      <option value="No">No Study Gap</option>
                      <option value="Yes">Yes, I have study gap</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SSC Result */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white">SSC Result *</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="sscResult"
                      value={formData.sscResult}
                      onChange={handleChange}
                      placeholder="e.g., 5.00 or A+"
                      disabled={!isPaid}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                        !isPaid
                          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-gray-200 focus:border-green-500 bg-white"
                      }`}
                    />
                  </div>

                  {/* HSC Result */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white">HSC Result *</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="hscResult"
                      value={formData.hscResult}
                      onChange={handleChange}
                      placeholder="e.g., 4.80 or A"
                      disabled={!isPaid}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                        !isPaid
                          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          : "border-gray-200 focus:border-green-500 bg-white"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={!isPaid || loading}
                  className={`w-full py-4 px-6 rounded-xl text-lg font-bold shadow-lg transition-all duration-300 transform ${
                    !isPaid || loading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:shadow-xl hover:scale-[1.02]"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting Application...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Submit Application</span>
                    </div>
                  )}
                </button>

                {!isPaid && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Complete payment to unlock the submit button
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApply;
