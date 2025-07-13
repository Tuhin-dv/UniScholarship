import React from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function AllReviews() {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch, isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${id}`);
        refetch();
        Swal.fire("Deleted!", "Review has been deleted.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

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
                Please wait for  Reviews...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-black mb-10">All Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 relative"
          >
            {/* University Info */}
            <h3 className="text-xl font-semibold text-indigo-600 mb-1">
              {review.universityName}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              Subject: {review.subjectCategory}
            </p>

            {/* Reviewer */}
            <div className="flex items-center mb-4">
              <img
                src={review.userImage || "https://i.ibb.co/9cF7QJQ/user.png"}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-gray-800 font-medium">{review.userName}</p>
                <p className="text-sm text-gray-500">{review.reviewDate}</p>
              </div>
            </div>

            {/* Rating and Comment */}
            <div className="mb-3">
              <p className="text-yellow-500 font-semibold">⭐ {review.rating}</p>
            </div>
            <p className="text-gray-700 italic">"{review.comment}"</p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-4 text-red-500 font-medium hover:underline absolute bottom-4 right-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllReviews;
