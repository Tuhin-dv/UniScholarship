import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // fetch all scholarships
  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  const openEditModal = (scholarship) => {
    setSelectedScholarship({ ...scholarship });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/scholarships/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to delete scholarship!", "error");
    }
  };

  const handleUpdate = async () => {
    try {
      const { _id, ...updateFields } = selectedScholarship;
      const res = await axiosSecure.patch(`/scholarships/${_id}`, updateFields);
      if (res.data.modifiedCount > 0) {
        toast.success("✅ Scholarship updated successfully!");
        setShowEditModal(false);
        refetch();
      } else {
        toast("ℹ️ No changes made.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update scholarship!");
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">Manage Scholarships</h2>

      <div className="overflow-x-auto  bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 shadow-lg rounded-xl">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Scholarship</th>
              <th className="px-4 py-3 text-left">University</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Degree</th>
              <th className="px-4 py-3 text-left">Fees ($)</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch, index) => (
              <tr key={sch._id} className="border-b hover:bg-purple-700 transition-all">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{sch.scholarshipName}</td>
                <td className="px-4 py-3">{sch.universityName}</td>
                <td className="px-4 py-3">{sch.subjectCategory}</td>
                <td className="px-4 py-3">{sch.degree}</td>
                <td className="px-4 py-3">${sch.applicationFees}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(sch)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(sch._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              ✖
            </button>

            <h3 className="text-2xl font-semibold text-center text-purple-700">Edit Scholarship</h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-semibold">Scholarship Name</label>
                <input
                  type="text"
                  value={selectedScholarship.scholarshipName}
                  onChange={(e) =>
                    setSelectedScholarship({
                      ...selectedScholarship,
                      scholarshipName: e.target.value,
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">University Name</label>
                <input
                  type="text"
                  value={selectedScholarship.universityName}
                  onChange={(e) =>
                    setSelectedScholarship({
                      ...selectedScholarship,
                      universityName: e.target.value,
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">Subject</label>
                <input
                  type="text"
                  value={selectedScholarship.subjectCategory}
                  onChange={(e) =>
                    setSelectedScholarship({
                      ...selectedScholarship,
                      subjectCategory: e.target.value,
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">Degree</label>
                <select
                  value={selectedScholarship.degree}
                  onChange={(e) =>
                    setSelectedScholarship({
                      ...selectedScholarship,
                      degree: e.target.value,
                    })
                  }
                  className="select select-bordered w-full mt-1"
                >
                  <option value="">Select Degree</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Application Fees</label>
                <input
                  type="number"
                  value={selectedScholarship.applicationFees}
                  onChange={(e) =>
                    setSelectedScholarship({
                      ...selectedScholarship,
                      applicationFees: parseFloat(e.target.value),
                    })
                  }
                  className="input input-bordered w-full mt-1"
                />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
