import { SnackbarProvider } from "notistack";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import AppRoutes from "./routes/Routes";
import MainLayout from "./layout/MainLayout";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./components/Spinner";
import { X } from "lucide-react";

const AppInner = () => {
  const { isAuthenticated, loading } = useAppContext();
  const location = useLocation();

  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/dashboard" replace />;
  }

  if (isPublicRoute) {
    return <AppRoutes />;
  }

  if (isAuthenticated) {
    return (
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    );
  }

  return <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={3000}
      action={(snackbarKey) => (
        <button
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("closeSnackbar", { detail: snackbarKey })
            );
          }}
          className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200 text-white hover:text-gray-300 flex items-center justify-center"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    >
      <AppProvider>
        <AppInner />
      </AppProvider>
    </SnackbarProvider>
  );
}
