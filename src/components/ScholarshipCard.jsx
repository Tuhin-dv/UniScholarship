
import React from 'react';
import { Link } from 'react-router';

const ScholarshipCard = ({ scholarship }) => {
  const {
    universityName,
    universityImage,
    scholarshipCategory,
    location,
    deadline,
    subjectCategory,
    applicationFees,
    rating,
    _id
  } = scholarship;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300">
      <img
        src={universityImage}
        alt={universityName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{universityName}</h3>
        <p className="text-sm text-gray-600 mt-1"><strong>Category:</strong> {scholarshipCategory}</p>
        <p className="text-sm text-gray-600"><strong>Location:</strong> {location}</p>
        <p className="text-sm text-gray-600"><strong>Subject:</strong> {subjectCategory}</p>
        <p className="text-sm text-gray-600"><strong>Fees:</strong> ${applicationFees}</p>
        <p className="text-sm text-gray-600"><strong>Deadline:</strong> {deadline}</p>
        <p className="text-sm text-gray-600"><strong>Rating:</strong> ⭐ {rating}</p>
         <Link
          to={`/scholarship/${_id}`}
          className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
