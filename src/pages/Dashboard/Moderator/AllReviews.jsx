'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

function AllReviews() {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch, isLoading } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#6366f1',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${id}`);
        refetch();
        Swal.fire('Deleted!', 'Review has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
              <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 absolute top-2 left-2 animate-reverse"></div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Loading Reviews...
              </h3>
              <p className="text-gray-600">Please wait while we fetch data.</p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">
        All Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-gradient-to-br from-sky-200 via-white to-purple-200 backdrop-blur-md border border-slate-200 rounded-3xl shadow-lg p-6 relative hover:shadow-2xl transition-all duration-300"
          >
            {/* University Info */}
            <h3 className="text-xl font-bold text-indigo-600 mb-1">
              {review.universityName}
            </h3>
            <p className="text-sm text-slate-500 mb-3">
              Subject: {review.subjectCategory}
            </p>

            {/* Reviewer Info */}
            <div className="flex items-center mb-4">
              <img
                src={review.userImage || 'https://i.ibb.co/9cF7QJQ/user.png'}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover mr-4 border border-slate-300 shadow-sm"
              />
              <div>
                <p className="text-slate-800 font-semibold">{review.userName}</p>
                <p className="text-sm text-slate-500">{review.reviewDate}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-3">
              <div className="flex items-center gap-1 text-yellow-500 text-lg font-semibold">
                {'⭐'.repeat(Math.round(review.rating))}{' '}
                <span className="ml-1 text-sm text-slate-600">({review.rating})</span>
              </div>
            </div>

            {/* Comment */}
            <p className="text-slate-700 italic border-l-4 border-indigo-300 pl-3">
              "{review.comment}"
            </p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(review._id)}
              className="absolute bottom-4 right-4 text-red-500 font-medium hover:underline hover:scale-105 transition"
              title="Delete this review"
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllReviews;
