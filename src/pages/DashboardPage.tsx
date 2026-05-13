import { Link } from "react-router-dom";
import { MainLayout } from "../shared/layouts/MainLayout";
import { Card } from "../shared/components/Card";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Target, Award, TrendingUp } from "lucide-react";

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.username}!
          </h1>
          <p className="mt-2 text-gray-600">
            Ready to ace your interview? Let's get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/interviews/new" className="block">
            <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer hover:border-blue-200 border-transparent border">
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Practice Tests</h3>
                  <p className="text-sm text-gray-600">
                    Start your first practice interview
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/interviews" className="block">
            <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer hover:border-green-200 border-transparent border">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">My Reports</h3>
                  <p className="text-sm text-gray-600">Track your reports</p>
                </div>
              </div>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Insights</h3>
                <p className="text-sm text-gray-600">AI-powered feedback</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Start
          </h2>
          <p className="text-gray-600">
            Get ready for your next interview with our AI-powered preparation
            tools. Practice with real interview questions, get instant feedback,
            and track your reports.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};
