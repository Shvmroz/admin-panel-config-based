import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import TeamsPage from "../pages/MyTeam/TeamsPage";
import ProfileSettingsPage from "../pages/ProfileSettings/ProfileSettingsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/profile-settings" element={<ProfileSettingsPage />} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<div className="p-8"><h1 className="text-2xl font-bold">404 - Page Not Found</h1></div>} />
    </Routes>
  );
}