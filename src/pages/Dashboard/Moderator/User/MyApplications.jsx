import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading, error } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Something went wrong!</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">My Applications</h2>
      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>University</th>
                <th>Subject</th>
                <th>Degree</th>
                <th>Fees</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td>{app.universityName}</td>
                  <td>{app.subjectCategory || "N/A"}</td>
                  <td>{app.degree}</td>
                  <td>${app.applicationFees || 0}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded text-white text-sm ${
                        app.status === "Pending"
                          ? "bg-yellow-500"
                          : app.status === "Processing"
                          ? "bg-blue-500"
                          : app.status === "Completed"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td>{app.feedback || "--"}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/dashboard/application-details/${app._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Details
                    </Link>
                    {app.status === "Pending" ? (
                      <Link
                        to={`/dashboard/edit-application/${app._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="btn btn-sm btn-disabled"
                      >
                        Edit
                      </button>
                    )}
                    <button className="btn btn-sm btn-error">Cancel</button>
                    <button className="btn btn-sm btn-success">Add Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
