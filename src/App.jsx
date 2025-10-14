import { SnackbarProvider } from 'notistack';
import { AppProvider, useAppContext } from "./contexts/AppContext";
import AppRoutes from "./routes/Routes";
import MainLayout from "./layout/MainLayout";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./components/ui/Spinner";

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
    >
      <AppProvider>
        <AppInner />
      </AppProvider>
    </SnackbarProvider>
  );
}