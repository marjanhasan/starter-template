import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

export const PublicRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <Navigate to="/" replace /> : <Outlet />;
};
