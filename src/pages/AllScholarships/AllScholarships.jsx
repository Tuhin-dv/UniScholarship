import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "../../components/ScholarshipCard";

function AllScholarships() {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const {
    data: scholarships = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  // Filter and sort scholarships
  const filteredScholarships = useMemo(() => {
    let filtered = scholarships;

    // Search filter
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
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (scholarship) => scholarship.scholarshipCategory === selectedCategory,
      );
    }

    // Sort
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

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(scholarships.map((s) => s.scholarshipCategory)),
    ].filter(Boolean);
    return uniqueCategories;
  }, [scholarships]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-lg w-full border border-white/50">
          <div className="flex flex-col items-center space-y-8">
            {/* Enhanced Loading Animation */}
            <div className="relative">
              <div className="w-24 h-24 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 shadow-lg"></div>
              <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 absolute top-2 left-2 animate-reverse"></div>
              <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600 absolute top-4 left-4"></div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Loading All Scholarships
              </h3>
              <p className="text-gray-600 text-lg">
                Discovering amazing opportunities for you...
              </p>

              {/* Animated Progress Dots */}
              <div className="flex justify-center space-x-2 mt-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-100"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animation-delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-lg w-full border border-red-200">
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-600"
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Something went wrong!
            </h3>
            <p className="text-red-600 text-lg mb-6">{error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
     

      {/* Search and Filter Section */}
      <div className="   text-black  sticky top-0 z-40 ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
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
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 bg-white/80 backdrop-blur-sm transition-all duration-300 text-lg placeholder-gray-500"
              />
            </div>

            {/* Category Filter */}
           
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12 max-w-lg mx-auto border border-gray-200">
              <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
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
              <p className="text-gray-600 mb-6">
                We couldn't find any scholarships matching your search criteria.
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSortBy("name");
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Scholarship Results
                </h2>
                <p className="text-gray-600">
                  Showing {filteredScholarships.length} of {scholarships.length}{" "}
                  scholarships
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Sorted by:</span>
                  <span className="font-semibold text-blue-600">
                    {sortBy === "name"
                      ? "Name"
                      : sortBy === "fees-low"
                        ? "Fees (Low to High)"
                        : sortBy === "fees-high"
                          ? "Fees (High to Low)"
                          : "Rating"}
                  </span>
                </div>
              </div>
            </div>

            {/* Scholarship Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredScholarships.map((scholarship, idx) => (
                <div
                  key={idx}
                  className="transform transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Card Background Effect */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl -z-10 transform scale-110"></div>

                    {/* Enhanced Card Wrapper */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      <ScholarshipCard scholarship={scholarship} />
                    </div>

                    {/* Top Scholarship Badge */}
                    {idx < 5 && (
                      <div className="absolute -top-3 -right-3 z-20">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-lg flex items-center space-x-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>Top {idx + 1}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Section */}
      {/* <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Our scholarship database is constantly updated. Join our waitlist to
            get notified about new opportunities that match your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Join Waitlist
            </button>
            <button className="bg-slate-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border border-slate-600 hover:bg-slate-700 transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div> */}

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default AllScholarships;
