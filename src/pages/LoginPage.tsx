import { AuthLayout } from "../shared/layouts/AuthLayout";
import { LoginForm } from "../features/auth/components/LoginForm";

export const LoginPage = () => {
  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      <LoginForm />
    </AuthLayout>
  );
};
