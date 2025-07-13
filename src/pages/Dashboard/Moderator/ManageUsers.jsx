"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import useAxios from "../../../hooks/useAxios";


const ManageUsers = () => {
  const axiosSecure = useAxios();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/all");
      return res.data;
    },
  });

  const [selectedRole, setSelectedRole] = useState("all");

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        toast.success("Role updated successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/users/${userId}`);
      if (res.data.deletedCount > 0) {
        toast.success("User deleted");
        refetch();
      }
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers =
    selectedRole === "all" ? users : users.filter((u) => u.role === selectedRole);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Filter by role */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Role:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table - Beautiful Design */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-purple-100">
        <table className="min-w-full divide-y divide-purple-100">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-t-2xl shadow">
              <th className="py-3 px-4 font-bold text-center rounded-tl-2xl">#</th>
              <th className="py-3 px-4 font-bold text-left">Name</th>
              <th className="py-3 px-4 font-bold text-left">Email</th>
              <th className="py-3 px-4 font-bold text-center">Role</th>
              <th className="py-3 px-4 font-bold text-center rounded-tr-2xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`transition-all duration-200 hover:bg-purple-50 ${index % 2 === 0 ? 'bg-white' : 'bg-purple-50'} border-b border-purple-100`}
              >
                <td className="py-3 px-4 text-center font-semibold text-purple-700">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </td>
                <td className="py-3 px-4 text-gray-700">{user.email}</td>
                <td className="py-3 px-4 text-center">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className={`px-3 py-1 rounded-full font-semibold shadow border-0 focus:ring-2 focus:ring-purple-400 transition-all duration-200 ${user.role === 'admin' ? 'bg-gradient-to-r from-red-400 to-red-600 text-white' : user.role === 'moderator' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' : 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700'}`}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full shadow hover:scale-105 hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center gap-1"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {!filteredUsers.length && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400 font-semibold bg-purple-50 rounded-b-2xl">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
