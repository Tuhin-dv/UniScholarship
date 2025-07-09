// src/pages/AllScholarships.jsx
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ScholarshipCard from '../../components/ScholarshipCard';

function AllScholarships() {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [], isLoading, isError, error } = useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const res = await axiosSecure.get('/scholarships');
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10 text-blue-500">Loading...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">All Scholarships</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {scholarships.map((scholarship, idx) => (
          <ScholarshipCard key={idx} scholarship={scholarship} />
        ))}
      </div>
    </div>
  );
}

export default AllScholarships;
