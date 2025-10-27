import React from "react";
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const dashboardData = {
  data: {
    total_users: 1200,
    total_admins: 24,
    total_revenue: 985000,
    monthly_revenue: 78500,
    active_subscriptions: 480,
  },
};

const MetricCard = ({ title, value, icon, color, bgColor, onClick, bg }) => (
  <div
    onClick={onClick}
    className={`${bgColor} dark:bg-gray-900 rounded-xl p-0 shadow-sm hover:shadow-lg cursor-pointer overflow-hidden group transition-all duration-300`}
  >
    {/* Top header bar */}
    <div className="">
      <div className={`flex items-center gap-2 p-1 px-2 ${bg}`}>
        <div className={`${color}`}>{icon}</div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </p>
      </div>
    </div>

    {/* Main value section */}
    <div className="p-5 relative">
      <div className="absolute top-1 right-1 w-16 h-16 opacity-10 dark:opacity-20">
        {React.cloneElement(icon, {
          className: `w-full h-full ${color}`,
        })}
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  </div>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data } = dashboardData;

  const metrics = [
    {
      title: "Total Users",
      value: data.total_users,
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-sky-50 dark:bg-sky-900/30",
      bg: "bg-sky-100 dark:bg-sky-900/50",
      path: "/users",
    },
    {
      title: "Total Admins",
      value: data.total_admins,
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      bg: "bg-purple-100 dark:bg-purple-900/50",
      path: "/admins",
    },
    {
      title: "Active Subscriptions",
      value: data.active_subscriptions,
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/30",
      bg: "bg-indigo-100 dark:bg-indigo-900/50",
      path: "/subscriptions",
    },
    {
      title: "Monthly Revenue",
      value: `$${data.monthly_revenue.toLocaleString()}`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
      bg: "bg-orange-100 dark:bg-orange-900/50",
      path: "/reports",
    },
    {
      title: "Total Revenue",
      value: `$${data.total_revenue.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
      bg: "bg-emerald-100 dark:bg-emerald-900/50",
      path: "/reports",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor your platform performance and key insights
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, i) => (
          <MetricCard
            key={i}
            {...metric}
            onClick={() => navigate(metric.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
