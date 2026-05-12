import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../../../pages/LoginPage";
import { RegisterPage } from "../../../pages/RegisterPage";
import { DashboardPage } from "../../../pages/DashboardPage";
import { ProfilePage } from "../../../pages/ProfilePage";
import { NotFoundPage } from "../../../pages/NotFoundPage";
import { ProtectedRoute, PublicRoute } from "./RouteGuards";
import { InterviewRoutes } from "../../interview/routes/InterviewRoutes";

export const router = createBrowserRouter([
  ...InterviewRoutes,
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
