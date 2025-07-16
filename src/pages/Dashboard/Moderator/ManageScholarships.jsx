import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

 const { data: scholarships = [], refetch } = useQuery({
  queryKey: ["scholarships"],
  queryFn: async () => {
    const res = await axiosSecure.get("/scholarships");
    
    return res.data.scholarships; // ✅ fix here
  },
});


  // Filter scholarships
  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.scholarshipName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      scholarship.universityName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      scholarship.subjectCategory
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter = filterBy === "all" || scholarship.degree === filterBy;

    return matchesSearch && matchesFilter;
  });

  const openEditModal = (scholarship) => {
    setSelectedScholarship({ ...scholarship });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/scholarships/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to delete scholarship!", "error");
    }
  };

  const handleUpdate = async () => {
    try {
      const { _id, ...updateFields } = selectedScholarship;
      const res = await axiosSecure.patch(`/scholarships/${_id}`, updateFields);
      if (res.data.modifiedCount > 0) {
        toast.success("✅ Scholarship updated successfully!");
        setShowEditModal(false);
        refetch();
      } else {
        toast("ℹ️ No changes made.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update scholarship!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Manage Scholarships
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              View, edit, and manage all scholarship opportunities in one place
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search scholarships, universities, or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-300 text-lg"
                />
              </div>

              {/* Filter Dropdown */}
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-300 text-lg font-semibold min-w-[200px]"
              >
                <option value="all">All Degrees</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">
                  {scholarships.length}
                </div>
                <div className="text-gray-600">Total Scholarships</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                <div className="text-2xl font-bold text-green-600">
                  {filteredScholarships.length}
                </div>
                <div className="text-gray-600">Filtered Results</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-100">
                <div className="text-2xl font-bold text-orange-600">
                  {new Set(scholarships.map((s) => s.universityName)).size}
                </div>
                <div className="text-gray-600">Universities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Table */}
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Scholarships Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Table Header */}
            <div className="bg-gradient-to-br from-sky-500 to-sky-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white">
                Scholarship Management Table
              </h3>
              <p className="text-purple-200 text-sm">
                Showing {filteredScholarships.length} of {scholarships.length}{" "}
                scholarships
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Head */}
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                      Scholarship Details
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                      University
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                      Subject & Degree
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                      Application Fee
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                  {filteredScholarships.map((scholarship, index) => (
                    <tr
                      key={scholarship._id}
                      className="group hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300"
                    >
                      {/* Index */}
                      <td className="px-6 py-6">
                        <div className="w-10 h-10 shadow-md rounded-xl flex items-center justify-center border font-bold text-black group-hover:scale-110 transition-transform duration-300">
                          {index + 1}
                        </div>
                      </td>

                      {/* Scholarship Details */}
                      <td className="px-6 py-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                            {scholarship.scholarshipName}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-purple-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-600 font-medium">
                              Premium Scholarship
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* University */}
                      <td className="px-6 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                              <path
                                fillRule="evenodd"
                                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-base font-bold text-gray-900">
                              {scholarship.universityName}
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                              Institution
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Subject & Degree */}
                      <td className="px-6 py-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                              </svg>
                            </div>
                            <span className="text-sm font-bold text-gray-900">
                              {scholarship.subjectCategory}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-orange-600"
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
                            <span className="text-sm font-bold text-gray-900">
                              {scholarship.degree}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Application Fee */}
                      <td className="px-6 py-6">
                        <div className="text-center">
                          <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl px-4 py-3 shadow-sm">
                            <svg
                              className="w-5 h-5 text-green-600 mr-2"
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
                            <div>
                              <div className="text-xl font-bold text-green-700">
                                ${scholarship.applicationFees}
                              </div>
                              <div className="text-xs text-green-600">
                                Application Fee
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => openEditModal(scholarship)}
                            className="group/btn relative bg-gradient-to-br from-sky-500 to-sky-700 text-white p-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-110"
                            title="Edit Scholarship"
                          >
                            <svg
                              className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleDelete(scholarship._id)}
                            className="group/btn relative bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-110"
                            title="Delete Scholarship"
                          >
                            <svg
                              className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-bold">
                    {filteredScholarships.length}
                  </span>{" "}
                  of <span className="font-bold">{scholarships.length}</span>{" "}
                  scholarships
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Total Universities:{" "}
                    <span className="font-bold">
                      {new Set(scholarships.map((s) => s.universityName)).size}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-rose-800 to-pink-600 p-6 text-white relative">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Edit Scholarship</h3>
                  <p className="text-purple-200">
                    Update scholarship information
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Scholarship Name
                  </label>
                  <input
                    type="text"
                    value={selectedScholarship.scholarshipName}
                    onChange={(e) =>
                      setSelectedScholarship({
                        ...selectedScholarship,
                        scholarshipName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    University Name
                  </label>
                  <input
                    type="text"
                    value={selectedScholarship.universityName}
                    onChange={(e) =>
                      setSelectedScholarship({
                        ...selectedScholarship,
                        universityName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Subject Category
                  </label> 
                  <input
                    type="text"
                    value={selectedScholarship.subjectCategory}
                    onChange={(e) =>
                      setSelectedScholarship({
                        ...selectedScholarship,
                        subjectCategory: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Degree Level
                  </label>
                  <select
                    value={selectedScholarship.degree}
                    onChange={(e) =>
                      setSelectedScholarship({
                        ...selectedScholarship,
                        degree: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-300"
                  >
                    <option value="">Select Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Application Fees ($)
                  </label>
                  <input
                    type="number"
                    value={selectedScholarship.applicationFees}
                    onChange={(e) =>
                      setSelectedScholarship({
                        ...selectedScholarship,
                        applicationFees: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-700 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;