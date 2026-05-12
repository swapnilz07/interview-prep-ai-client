import { RouterProvider } from "react-router-dom";
import { router } from "./features/auth/routes/AuthRoutes";
import { useAuthInit } from "./features/auth/hooks/useAuthInit";
import { Spinner } from "./shared/components/Spinner";

function App() {
  const { authReady } = useAuthInit();

  if (!authReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
