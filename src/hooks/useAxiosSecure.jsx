// src/hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://uni-scholar-server-side.vercel.app/",
  withCredentials: true, // 🔥 This is IMPORTANT!
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
