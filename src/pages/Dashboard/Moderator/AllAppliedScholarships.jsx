import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllAppliedScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  const { data: applications = [], refetch } = useQuery({
    queryKey: ['all-applications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/applications');
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    await axiosSecure.patch(`/applications/${id}/cancel`);
    Swal.fire('Cancelled!', 'Application has been rejected.', 'success');
    refetch();
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Applied Scholarships</h2>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-purple-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">University</th>
              <th className="p-3">Degree</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b">
                <td className="p-3">{app.name}</td>
                <td className="p-3">{app.universityName}</td>
                <td className="p-3">{app.degree}</td>
                <td className="p-3">{app.subjectCategory}</td>
                <td className="p-3 capitalize">{app.status || 'pending'}</td>
                <td className="p-3 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => setSelectedApp(app)}
                  >
                    Details
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setSelectedApp(app);
                      setFeedbackText(app.feedback || '');
                    }}
                  >
                    Feedback
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
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

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] md:w-[500px] relative shadow-xl">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={() => setSelectedApp(null)}
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-purple-600 mb-4">Application Details</h3>
            <p><strong>Name:</strong> {selectedApp.name}</p>
            <p><strong>University:</strong> {selectedApp.universityName}</p>
            <p><strong>Degree:</strong> {selectedApp.degree}</p>
            <p><strong>Category:</strong> {selectedApp.subjectCategory}</p>
            <p><strong>Status:</strong> {selectedApp.status || 'pending'}</p>
            {selectedApp.feedback && (
              <p><strong>Feedback:</strong> {selectedApp.feedback}</p>
            )}

            <div className="mt-4 space-y-3">
              <textarea
                rows="3"
                placeholder="Enter feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full border rounded p-2"
              ></textarea>
              <button
                onClick={handleFeedbackSubmit}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppliedScholarships;
