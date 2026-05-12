import { AuthLayout } from "../shared/layouts/AuthLayout";
import { RegisterForm } from "../features/auth/components/RegisterForm";

export const RegisterPage = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the AI Interview Platform"
    >
      <RegisterForm />
    </AuthLayout>
  );
};
