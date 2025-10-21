import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

import { Chrome as Home, UserCog } from "lucide-react";

const menuItems = [
  {
    text: "Dashboard",
    icon: Home,
    path: "/dashboard",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    text: "My Team",
    icon: UserCog,
    path: "/teams",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

const Sidebar = ({ open, onClose, variant = "temporary" }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700">
      <Link to="/dashboard">
        <div className="cursor-pointer h-16 pl-8 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
          {/* <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="w-8 h-8 object-contain"
          /> */}
          <h1 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight mt-1">
            Admin Portal
          </h1>
        </div>
      </Link>

      <div className="flex-1 py-4 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.text}
              to={item.path}
              onClick={variant === "temporary" ? onClose : undefined}
              className={cn(
                "flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-blue-100 dark:bg-gray-800 text-sky-900 dark:text-sky-200 shadow-sm"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-102"
              )}
            >
              <div
                className={`p-1.5 rounded-md transition-colors duration-200 ${
                  isActive
                    ? `${item.bgColor} dark:bg-gray-700`
                    : `${item.bgColor} dark:bg-gray-700 group-hover:${item.bgColor}`
                }`}
              >
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span
                className={`text-sm ${
                  isActive ? "font-semibold" : "font-normal"
                }`}
              >
                {item.text}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  if (variant === "permanent") {
    return <div className="w-80 flex-shrink-0">{sidebarContent}</div>;
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 w-80 z-50 lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
