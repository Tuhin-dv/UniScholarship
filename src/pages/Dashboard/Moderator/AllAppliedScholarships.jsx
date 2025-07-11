import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'


const AllAppliedScholarships = () => {
  const axios = useAxiosSecure()
  const queryClient = useQueryClient()

  // Fetch all applications
  const { data: applications = [], isLoading, isError } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const res = await axios.get('/applications')
      return res.data
    }
  })

  // Mutation to delete an application
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`/applications/${id}`)
    },
    onSuccess: () => {
      // Refetch applications after deletion
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    }
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) return <p>Loading applications...</p>
  if (isError) return <p>Failed to load applications.</p>

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Applied Scholarships</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Applicant Name</th>
              <th className="p-3 border-b border-gray-300 text-left">Scholarship Name</th>
              <th className="p-3 border-b border-gray-300 text-left">Status</th>
              <th className="p-3 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{app.applicantName || 'N/A'}</td>
                <td className="p-3 border-b border-gray-300">{app.scholarshipName || 'N/A'}</td>
                <td className="p-3 border-b border-gray-300">{app.status || 'Pending'}</td>
                <td className="p-3 border-b border-gray-300">
                  <button
                    onClick={() => handleDelete(app._id)}
                    disabled={deleteMutation.isLoading}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AllAppliedScholarships
