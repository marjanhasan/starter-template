import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

interface RoleBasedRouteProps {
  allowedRoles: Array<"admin" | "user">;
  redirectPath?: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  allowedRoles,
  redirectPath = "/",
}) => {
  const { user, token } = useAppSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;
  if (!user || !allowedRoles.includes(user.role))
    return <Navigate to={redirectPath} replace />;

  return <Outlet />;
};
