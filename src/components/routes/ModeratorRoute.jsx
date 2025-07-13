// src/routes/ModeratorRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole";
import { AuthContext } from "../../context/AuthContext/AuthContext";


const ModeratorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <div className="text-center py-20 text-xl font-semibold text-purple-600">Loading...</div>;
  }

  if (!user || role !== "moderator") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ModeratorRoute;
