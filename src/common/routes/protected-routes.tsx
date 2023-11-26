import { Navigate, Outlet } from "react-router-dom";

import { useAuthStatus } from "@/services/auth/hooks/useAuthStatus";

export const ProtectedRoutes = () => {
  const { checkingStatus, loggedIn } = useAuthStatus();

  if (checkingStatus) {
    return <div>...Loading</div>;
  }

  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};
