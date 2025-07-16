// src/hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://uni-scholar-server.vercel.app/", 
 
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
