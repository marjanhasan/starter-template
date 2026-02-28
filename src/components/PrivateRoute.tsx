import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

export const PrivateRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
