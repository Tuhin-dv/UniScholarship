import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  console.log('from frontend',user)
  const axiosSecure = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data?.role || "user"; // directly access role from response data
     
    },
  });

  return { role: data, roleLoading: isLoading };
};

export default useUserRole;
