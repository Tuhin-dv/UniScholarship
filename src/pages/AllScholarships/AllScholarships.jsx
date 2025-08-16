import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "../../components/ScholarshipCard";

const limit = 6;

function AllScholarships() {
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["scholarships", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarships?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const scholarships = data?.scholarships || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const filteredScholarships = useMemo(() => {
    let filtered = [...scholarships];

    if (searchTerm) {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.universityName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.scholarshipCategory
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.subjectCategory
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (scholarship) => scholarship.scholarshipCategory === selectedCategory
      );
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "fees-low":
          return a.applicationFees - b.applicationFees;
        case "fees-high":
          return b.applicationFees - a.applicationFees;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.universityName?.localeCompare(b.universityName);
      }
    });

    return filtered;
  }, [scholarships, searchTerm, selectedCategory, sortBy]);

  const categories = useMemo(() => {
    return [...new Set(scholarships.map((s) => s.scholarshipCategory))].filter(
      Boolean
    );
  }, [scholarships]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 absolute top-2 left-2 animate-reverse"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Loading Applications
            </h3>
            <p className="text-gray-600">
              Please wait while we fetch all applied scholarships...
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (isError)
    return <p className="text-red-500 text-center mt-12">{error.message}</p>;

  return (
    <div className="p-6 bg-sky-50">
      <div className="max-w-[1700px] mx-auto">
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white p-4 rounded-2xl shadow-md gap-4 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by university or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-xl px-4 py-2 text-black bg-white focus:border-purple-500 w-full"
          />

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-xl px-4 py-2 bg-white text-black w-full"
          >
            <option value="all">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-xl px-4 py-2 bg-white text-black w-full"
          >
            <option value="name">Sort by Name</option>
            <option value="fees-low">Fees (Low to High)</option>
            <option value="fees-high">Fees (High to Low)</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Scholarships Grid */}
        {filteredScholarships.length === 0 ? (
          <div className="text-center text-gray-500">No scholarships found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-rose-700 text-white rounded-md disabled:opacity-50"
            disabled={page === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-3 py-1 rounded-md ${
                page === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-400 text-black"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-rose-700 text-white rounded-md disabled:opacity-50"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllScholarships;
