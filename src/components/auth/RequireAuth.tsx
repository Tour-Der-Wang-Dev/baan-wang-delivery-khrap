
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

const RequireAuth = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh] sm:h-screen">
        <div className="text-center">
          <Loader className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-thai-highlight mx-auto" />
          <span className="block mt-2 text-base sm:text-lg">กำลังโหลด...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected route
  return <Outlet />;
};

export default RequireAuth;
