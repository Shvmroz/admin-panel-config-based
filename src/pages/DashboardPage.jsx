import React from "react";
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  ChevronRight,
  User,
  UserCog,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const dashboardData = {
  data: {
    total_organizations: 150,
    total_companies: 300,
    total_revenue: 250000,
    monthly_revenue: 45000,
    total_users: 300,
    active_subscriptions: 145,

  },
};

const MetricCard = ({ title, value, icon, color, bgColor, onClick }) => (
  <div
    onClick={onClick}
    className={`${bgColor} dark:bg-gray-800 rounded-xl px-6 py-3 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer relative overflow-hidden group`}
  >
    <div className="absolute top-1 right-1 w-20 h-20 opacity-10 transform rotate-12">
      {React.cloneElement(icon, {
        className: `w-full h-full ${color}`,
      })}
    </div>

    <div className="flex items-start justify-between relative z-10">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-4">
          <div className={color}>{icon}</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            {title}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
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
      icon: <User className="w-5 h-5" />,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      path: "/users",
    },
    {
      title: "Total Admins",
      value: 15,
      icon: <UserCog className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      path: "/admins",
    },
    {
      title: "Active Subscriptions",
      value: data.active_subscriptions,
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      path: "/dashboard",
    },
    {
      title: "Monthly Revenue",
      value: `$${data.monthly_revenue.toLocaleString()}`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      path: "/dashboard",
    },
    {
      title: "Total Revenue",
      value: `$${data.total_revenue.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      path: "/dashboard",
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
            Monitor your platform performance and key metrics
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