// hooks/useScholarships.jsx
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useScholarships = () => {
  const axiosSecure = useAxiosSecure()

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const res = await axiosSecure.get('/scholarships')
      return res.data
    },
  })

  return { scholarships, isLoading }
}

export default useScholarships
