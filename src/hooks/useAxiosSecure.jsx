// src/hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true, // 🔥 This is IMPORTANT!
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
