import { Navigate, Outlet } from "react-router-dom";

import { MainLoader } from "@/assets/loaders/main-loader";
import { useAuthStatus } from "@/services/auth/hooks/useAuthStatus";

export const ProtectedRoutes = () => {
  const { checkingStatus, loggedIn } = useAuthStatus();

  if (checkingStatus) {
    return <MainLoader />;
  }

  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};
