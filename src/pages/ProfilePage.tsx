import { MainLayout } from "../shared/layouts/MainLayout";
import { Card } from "../shared/components/Card";
import { useAuthStore } from "../features/auth/stores/authStore";
import { User, Mail, Calendar } from "lucide-react";
import { formatDate } from "../shared/utils/formatDate";

export const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <MainLayout>
        <Card>
          <p className="text-red-600">Failed to load profile data</p>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

        <Card className="space-y-6">
          <div className="flex items-center space-x-4 pb-4 border-b">
            <div className="bg-blue-100 rounded-full p-3">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {user.username}
              </h2>
              <p className="text-gray-600">
                Member since {user.createdAt && formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="text-gray-900">
                  {user.createdAt && formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

