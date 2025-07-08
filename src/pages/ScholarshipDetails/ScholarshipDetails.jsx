import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ScholarshipDetails = () => {
  const { id } = useParams();
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

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-xl rounded-xl space-y-6">
      <img src={universityImage} alt={universityName} className="w-full h-64 object-cover rounded-md" />
      <h1 className="text-3xl font-bold">{universityName}</h1>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p><strong>Category:</strong> {scholarshipCategory}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Deadline:</strong> {deadline}</p>
        <p><strong>Subject:</strong> {subjectCategory}</p>
        <p><strong>Application Fees:</strong> ${applicationFees}</p>
        <p><strong>Rating:</strong> ⭐ {rating}</p>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
