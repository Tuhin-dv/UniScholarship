import axios from "axios";

// Dynamically get baseURL from .env or fallback to localhost
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://uni-scholar-server.vercel.app/",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
