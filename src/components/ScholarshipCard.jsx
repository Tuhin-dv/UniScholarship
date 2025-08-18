import React from "react";
import { Link } from "react-router-dom";

const ScholarshipCard = ({ scholarship }) => {
  const {
    title,
    universityName,
    universityImage,
    scholarshipCategory,
    location,
    deadline,
    subjectCategory,
    applicationFees,
    rating,
    _id,
  } = scholarship;

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining(deadline);
  const isUrgent = daysRemaining <= 30 && daysRemaining > 0;
  const isExpired = daysRemaining < 0;

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {/* Image */}
      <div className="relative h-52 md:h-60 overflow-hidden rounded-t-3xl">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Category */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-purple-700 shadow-md">
            {scholarshipCategory}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
            ⭐ {rating}
          </div>
        </div>

        {/* Deadline */}
        <div className="absolute bottom-4 left-4">
          {!isExpired ? (
            <div
              className={`flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                isUrgent
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                  : "bg-gradient-to-r from-green-500 to-green-600 text-white"
              }`}
            >
              ⏳ {daysRemaining} days left
            </div>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-500 text-white shadow-md">
              Expired
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
          {universityName}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Location */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-7 h-7 bg-blue-100 rounded-lg">
              📍
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Location</p>
              <p className="text-sm font-semibold text-gray-900">{location}</p>
            </div>
          </div>

          {/* Subject */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-7 h-7 bg-green-100 rounded-lg">
              📚
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Subject</p>
              <p className="text-sm font-semibold text-gray-900">
                {subjectCategory}
              </p>
            </div>
          </div>

          {/* Fee */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-7 h-7 bg-purple-100 rounded-lg">
              💰
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Fee</p>
              <p className="text-sm font-semibold text-gray-900">
                ${applicationFees}
              </p>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-7 h-7 bg-orange-100 rounded-lg">
              🗓️
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Due</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatDeadline(deadline)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/scholarship/${_id}`}
          className="w-full inline-flex items-center justify-center bg-gradient-to-br from-sky-500 to-sky-700 px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-sky-600 transition-all duration-300 transform hover:scale-105"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
