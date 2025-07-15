import React, { useContext, useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext); 
  const [isOpen, setIsOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // Fetch user reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['my-reviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user?.email}`);
      return res.data;
    },
  });

  // Delete review
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-reviews']);
      Swal.fire('Deleted!', 'Review has been deleted.', 'success');
    },
  });

  // Update review
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.patch(`/reviews/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-reviews']);
      Swal.fire('Updated!', 'Review updated successfully.', 'success');
      closeModal();
    },
  });

  const openEditModal = (review) => {
    setEditingReview(review);
    reset({
      scholarshipName: review.scholarshipName,
      universityName: review.universityName,
      comment: review.comment,
      rating: review.rating,
      date: review.date,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingReview(null);
  };

  const onSubmit = (data) => {
    updateMutation.mutate({ id: editingReview._id, updatedData: data });
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
                                Please wait while we fetch your applications...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );


  return (
    <div className="p-6 text-black"> {/* Apply text-black globally */}
  <h2 className="text-4xl text-center font-bold mb-4">My Reviews</h2>
  <div className="overflow-x-auto">
    {reviews.length === 0 ? (
      <div className="flex justify-center items-center py-16">
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 border border-purple-200 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h3 className="text-2xl font-bold text-purple-700 mb-2">No Reviews Yet</h3>
          <p className="text-blue-700 mb-4">You haven't posted any reviews. Once you review a scholarship, it will show up here!</p>
          <span className="text-4xl">📝</span>
        </div>
      </div>
    ) : (
      <table className="table-auto w-full border rounded shadow text-black">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Scholarship</th>
            <th className="px-4 py-2">University</th>
            <th className="px-4 py-2">Comment</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="text-center text-black">
              <td className="border px-4 py-2">{review.scholarshipName}</td>
              <td className="border px-4 py-2">{review.universityName}</td>
              <td className="border px-4 py-2">{review.comment}</td>
              <td className="border px-4 py-2">{review.date}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => openEditModal(review)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    Swal.fire({
                      title: 'Are you sure?',
                      text: 'You won’t be able to revert this!',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Yes, delete it!',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteMutation.mutate(review._id);
                      }
                    })
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>

  {/* Edit Modal - Professional Design */}
  <Dialog open={isOpen} onClose={closeModal} className="relative z-50 text-black">
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="w-full max-w-lg bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-2xl p-8 rounded-2xl border border-slate-300">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block text-2xl text-blue-500">✏️</span>
          <Dialog.Title className="text-2xl font-bold text-slate-800">Edit Review</Dialog.Title>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-slate-700 font-medium mb-1">Scholarship</label>
            <input {...register('scholarshipName')} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-gray-100 text-slate-900" readOnly />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">University</label>
            <input {...register('universityName')} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-gray-100 text-slate-900" readOnly />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Date</label>
            <input {...register('date')} type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-900" required />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Rating <span className="text-xs text-gray-400">(1-5)</span></label>
            <input {...register('rating')} type="number" min="1" max="5" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-slate-900" required />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Comment</label>
            <textarea {...register('comment')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-slate-900" required />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={closeModal} className="px-5 py-2 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow hover:scale-105 transition-transform">Update</button>
          </div>
        </form>
      </Dialog.Panel>
    </div>
  </Dialog>
</div>

  );
};

export default MyReviews;
