import { createBrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PublicRoute } from "@/components/PublicRoute";
import { RoleBasedRoute } from "@/components/RoleBasedRoute";
import { Layout } from "@/components/layout/Layout";
import { LoginForm } from "@/features/auth/LoginForm";
import { RegisterForm } from "@/features/auth/RegisterForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserDashboard } from "@/features/user/UserDashboard";
import { AdminDashboard } from "@/features/admin/AdminDashboard";
import { TimerPage } from "@/features/timer/TimerPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public routes (no auth needed)
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <LoginForm /> },
          { path: "register", element: <RegisterForm /> },
        ],
      },
      // Private routes (authenticated)
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { index: true, element: <Navigate to="/dashboard" replace /> },
              {
                path: "dashboard",
                element: <RoleBasedRoute allowedRoles={["user", "admin"]} />,
                children: [{ index: true, element: <UserDashboard /> }],
              },
              {
                path: "admin",
                element: <RoleBasedRoute allowedRoles={["admin"]} />,
                children: [{ index: true, element: <AdminDashboard /> }],
              },
              { path: "timer", element: <TimerPage /> },
            ],
          },
        ],
      },
      // 404
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
]);
