import axios from "axios";

// Dynamically get baseURL from .env or fallback to localhost
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
