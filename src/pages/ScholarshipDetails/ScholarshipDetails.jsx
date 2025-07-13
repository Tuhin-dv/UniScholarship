import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {user} =useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const { data: scholarship, isLoading, error } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  const {
    universityName,
    universityImage,
    scholarshipCategory,
    location,
    deadline,
    subjectCategory,
    applicationFees,
    rating,
    scholarshipName,
    _id: scholarshipId
  } = scholarship || {};

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const reviewInfo = {
      scholarshipId,
      scholarshipName,
      universityName,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      rating: parseInt(data.rating),
      comment: data.comment,
      reviewDate: new Date().toISOString().slice(0, 10),
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewInfo);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Review Submitted!',
          text: 'Thank you for your feedback.',
          confirmButtonColor: '#8b5cf6',
        });
        reset();
        setIsOpen(false);
        setHasReviewed(true);
      }
    } catch (err) {
      Swal.fire({
        icon: 'error', 
        title: 'Failed to submit review',
        text: 'Please try again later.',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Something went wrong!</div>;
  if (!scholarship) return <div className="text-center">No scholarship found!</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-xl rounded-xl space-y-6">
      <img src={universityImage} alt={universityName} className="w-full h-64 object-cover rounded-md" />
      <h1 className="text-3xl text-black font-bold">{universityName}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <p><strong>Category:</strong> {scholarshipCategory}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Deadline:</strong> {deadline}</p>
        <p><strong>Subject:</strong> {subjectCategory}</p>
        <p><strong>Application Fees:</strong> ${applicationFees}</p>
        <p><strong>Rating:</strong> ⭐ {rating}</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => navigate(`/dashboard/apply/${scholarshipId}`)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:scale-105 transition-transform"
        >
          Apply Scholarship
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-md hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={hasReviewed}
        >
          Add Review
        </button>
      </div>

      {/* Modal - Professional Design */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-2xl p-8 rounded-2xl w-full max-w-md border border-slate-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block text-2xl text-rose-500">📝</span>
              <Dialog.Title className="text-2xl font-bold text-slate-800">Submit a Review</Dialog.Title>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className='block text-slate-700 font-medium mb-1'>Rating <span className="text-xs text-gray-400">(1-5)</span></label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  {...register("rating", { required: true })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all bg-white text-slate-900"
                  placeholder="Enter rating"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Comment</label>
                <textarea
                  {...register("comment", { required: true })}
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all bg-white text-slate-900"
                  placeholder="Write your review..."
                />
              </div>

              {/* Error message placeholder (optional) */}
              {/* <p className="text-red-500 text-sm">Error message here</p> */}

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-2 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:scale-105 transition-transform">Submit</button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ScholarshipDetails;
