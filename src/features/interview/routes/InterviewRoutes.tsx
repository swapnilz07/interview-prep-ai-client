import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../../auth/routes/RouteGuards";
import { GenerateInterviewPage } from "../pages/GenerateInterviewPage";
import { InterviewReportsPage } from "../pages/InterviewReportsPage";
import { InterviewDetailsPage } from "../pages/InterviewDetailsPage";

export const InterviewRoutes: RouteObject[] = [
  {
    path: "/interviews",
    element: (
      <ProtectedRoute>
        <InterviewReportsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/interviews/new",
    element: (
      <ProtectedRoute>
        <GenerateInterviewPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/interviews/:id",
    element: (
      <ProtectedRoute>
        <InterviewDetailsPage />
      </ProtectedRoute>
    ),
  },
];
