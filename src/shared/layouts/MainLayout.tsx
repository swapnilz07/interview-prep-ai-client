import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LogOut, User, Home, Brain } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Button } from "../components/Button";
import { useLogout } from "../../features/auth/hooks/useLogout";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl text-gray-900">
                  AI Interview
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                title="Dashboard"
              >
                <Home className="h-5 w-5" />
              </Link>
              <Link
                to="/interviews"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                title="Interviews"
              >
                <Brain className="h-5 w-5" />
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                title="Profile"
              >
                <User className="h-5 w-5" />
              </Link>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.username}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};
