import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllAppliedScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  const { data: applications = [], refetch, isLoading } = useQuery({
    queryKey: ['all-applications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/applications');
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'No',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6366f1',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/applications/${id}/cancel`);
        Swal.fire('Cancelled!', 'Application has been rejected.', 'success');
        refetch();
      }
    });
  };

  const handleFeedbackSubmit = async () => {
    await axiosSecure.patch(`/applications/${selectedApp._id}/feedback`, {
      feedback: feedbackText,
    });
    Swal.fire('Success', 'Feedback submitted', 'success');
    setSelectedApp(null);
    setFeedbackText('');
    refetch();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 absolute top-2 left-2 animate-reverse"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Applications</h3>
            <p className="text-gray-600">Please wait while we fetch all applied scholarships...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" md:p-6 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <h2 className="text-xl md:text-2xl text-black font-bold mb-4">All Applied Scholarships</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[400px] w-full border-separate border-spacing-0 rounded-xl shadow-xl bg-white text-xs md:text-base">
          <thead className="bg-gradient-to-r from-purple-200 to-indigo-200">
            <tr>
              {/* Name column removed */}
              <th className="p-2 md:p-4 font-bold text-slate-700">University</th>
              <th className="p-2 md:p-4 font-bold text-slate-700">Degree</th>
              <th className="p-2 md:p-4 font-bold text-slate-700">Category</th>
              <th className="p-2 md:p-4 font-bold text-slate-700">Status</th>
              <th className="p-2 md:p-4 font-bold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, idx) => (
              <tr
                key={app._id}
                className={`transition-all ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'} hover:bg-purple-50`}
                style={{ borderRadius: '0.75rem' }}
              >
                {/* Name cell removed */}
                <td className="p-2 md:p-4 text-slate-700 align-middle">{app.universityName}</td>
                <td className="p-2 md:p-4 text-slate-700 align-middle">{app.degree}</td>
                <td className="p-2 md:p-4 text-slate-700 align-middle">{app.subjectCategory}</td>
                <td className="p-2 md:p-4 align-middle">
                  <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                    app.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : app.status === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'Pending'}
                  </span>
                </td>
                <td className="p-2 md:p-4 space-x-1 md:space-x-2 align-middle">
                  <button
                    className="px-2 md:px-4 py-1 md:py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow hover:scale-105 transition-transform text-xs md:text-base"
                    onClick={() => setSelectedApp(app)}
                  >
                    Details
                  </button>
                  <button
                    className="px-2 md:px-4 py-1 md:py-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold shadow hover:scale-105 transition-transform text-xs md:text-base"
                    onClick={() => {
                      setSelectedApp(app);
                      setFeedbackText(app.feedback || '');
                    }}
                  >
                    Feedback
                  </button>
                  <button
                    className="px-2 md:px-4 py-1 md:py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition-transform text-xs md:text-base"
                    onClick={() => handleCancel(app._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal - Professional Design */}
      {selectedApp && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-2">
          <div className="bg-gradient-to-br from-white via-slate-100 to-slate-200 p-4 md:p-6 rounded-2xl w-full max-w-xs md:max-w-md lg:max-w-lg relative shadow-2xl border border-slate-300">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-slate-500 hover:text-red-500 transition"
              onClick={() => setSelectedApp(null)}
              title="Close"
            >
              &times;
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block text-2xl text-purple-500">📄</span>
              <h3 className="text-lg md:text-xl font-bold text-purple-700">Application Details</h3>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm md:text-base">
                <span className="font-semibold text-slate-700">University:</span>
                <span className="text-slate-800">{selectedApp.universityName}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span className="font-semibold text-slate-700">Degree:</span>
                <span className="text-slate-800">{selectedApp.degree}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span className="font-semibold text-slate-700">Category:</span>
                <span className="text-slate-800">{selectedApp.subjectCategory}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span className="font-semibold text-slate-700">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedApp.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : selectedApp.status === 'rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {selectedApp.status ? selectedApp.status.charAt(0).toUpperCase() + selectedApp.status.slice(1) : 'Pending'}
                </span>
              </div>
              {selectedApp.feedback && (
                <div className="flex justify-between text-sm md:text-base">
                  <span className="font-semibold text-slate-700">Feedback:</span>
                  <span className="text-slate-800">{selectedApp.feedback}</span>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <textarea
                rows="3"
                placeholder="Enter feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-slate-900"
              ></textarea>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <button
                  onClick={handleFeedbackSubmit}
                  className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-3 md:px-4 py-2 rounded font-semibold shadow hover:scale-105 transition-transform w-full md:w-auto"
                >
                  Submit Feedback
                </button>
                <button
                  onClick={() => handleCancel(selectedApp._id)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 md:px-4 py-2 rounded font-semibold shadow hover:scale-105 transition-transform w-full md:w-auto"
                >
                  Cancel Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppliedScholarships;
