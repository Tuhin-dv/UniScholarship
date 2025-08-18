import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTopScholarships = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: topScholarships = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["top-scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-scholarships");
       console.log("Fetched Scholarships:", res.data);
      return res.data;
    },
  });

  return { topScholarships, isLoading, isError, error };
};

export default useTopScholarships;
