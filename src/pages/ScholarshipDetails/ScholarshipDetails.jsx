import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: scholarship, isLoading, error } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Something went wrong!</div>;
  if (!scholarship) return <div className="text-center">No scholarship found!</div>;

  const {
    universityName,
    universityImage,
    scholarshipCategory,
    location,
    deadline,
    subjectCategory,
    applicationFees,
    rating,
  } = scholarship;

  const handleApplyClick = () => {
    navigate(`/dashboard/apply/${scholarship._id}`);

  };

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

      <button
        onClick={handleApplyClick}
        className="mt-6 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:scale-105 transition-transform"
      >
        Apply Scholarship
      </button>
    </div>
  );
};

export default ScholarshipDetails;
