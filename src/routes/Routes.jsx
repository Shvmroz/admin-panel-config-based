import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AdminsPage from "../pages/AdminsPage";
import UsersPage from "../pages/UsersPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/admins" element={<AdminsPage />} />
      <Route path="/users" element={<UsersPage />} />
      
      {/* Placeholder routes */}
      <Route path="/organizations" element={<div className="p-8"><h1 className="text-2xl font-bold">Organizations - Coming Soon</h1></div>} />
      <Route path="/companies" element={<div className="p-8"><h1 className="text-2xl font-bold">Companies - Coming Soon</h1></div>} />
      <Route path="/events" element={<div className="p-8"><h1 className="text-2xl font-bold">Events - Coming Soon</h1></div>} />
      <Route path="/analytics" element={<div className="p-8"><h1 className="text-2xl font-bold">Analytics - Coming Soon</h1></div>} />
      <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<div className="p-8"><h1 className="text-2xl font-bold">404 - Page Not Found</h1></div>} />
    </Routes>
  );
}