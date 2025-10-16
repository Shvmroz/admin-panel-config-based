import React from "react";
import { Eye, Pencil, Trash2, User } from "lucide-react";
import CrudPage from "./CRUD/CrudPage";

// 🧩 TABLE CONFIG
const adminTableConfig = {
  search: { enabled: true, placeholder: "Search admins..." },
  pagination: { enabled: true, pageSize: 10 },
  columns: [
    { key: "id", title: "ID" },
    {
      key: "user",
      title: "User Info",
      render: (value, row) => (
        <div className="flex items-center space-x-4">
          {row?.image ? (
            <img
              src={row.image}
              alt={row?.name || "User"}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-600">
              <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {row.name || "N/A"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {row.email || "N/A"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value) => (
        <span
          className={`inline-flex items-center justify-center px-3 py-1 rounded-sm text-xs font-semibold border uppercase max-h-[24px] min-w-[78px] ${
            value === "active"
              ? "border-green-400 text-green-500 dark:border-green-600 dark:text-green-500"
              : value === "inactive"
              ? "border-red-400 text-red-500 dark:border-red-600 dark:text-red-500"
              : "border-yellow-400 text-yellow-500 dark:border-yellow-600 dark:text-yellow-500"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "role",
      title: "Admin Level",
      render: (value) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium ${
            value === "admin"
              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
              : value === "moderator"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
          }`}
        >
          {value === "admin"
            ? "Super Admin"
            : value === "moderator"
            ? "Moderator"
            : "User"}
        </span>
      ),
    },
    { key: "lastLogin", title: "Last Login" },
    { key: "createdAt", title: "Created Date" },
  ],
  actions: [
    {
      title: "Edit Admin",
      type: "edit",
      icon: <Pencil className="w-4 h-4" />,
    },
    {
      title: "View Details",
      type: "view",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      title: "Delete Admin",
      type: "delete",
      variant: "danger",
      icon: <Trash2 className="w-4 h-4" />,
    },
  ],
};

// 🧾 FORM CONFIG
const adminFormConfig = {
  add: {
    fields: [
      { key: "name", label: "Full Name", type: "text", required: true },
      { key: "email", label: "Email Address", type: "email", required: true },
      { key: "password", label: "Password", type: "password", required: true },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending Activation" },
        ],
      },
      {
        key: "role",
        label: "Admin Level",
        type: "select",
        required: true,
        options: [
          { value: "admin", label: "Super Administrator" },
          { value: "moderator", label: "Moderator" },
          { value: "user", label: "Limited Admin" },
        ],
      },
      { key: "phone", label: "Phone Number", type: "tel" },
      { key: "department", label: "Department", type: "text" },
      {
        key: "bio",
        label: "Bio / Notes",
        type: "textarea",
        rows: 3,
        placeholder: "Additional information about this admin...",
      },
    ],
    submitText: "Create Admin",
  },
  edit: {
    fields: [
      { key: "name", label: "Full Name", type: "text", required: true },
      { key: "email", label: "Email Address", type: "email", required: true },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending Activation" },
        ],
      },
      {
        key: "role",
        label: "Admin Level",
        type: "select",
        required: true,
        options: [
          { value: "admin", label: "Super Administrator" },
          { value: "moderator", label: "Moderator" },
          { value: "user", label: "Limited Admin" },
        ],
      },
      { key: "phone", label: "Phone Number", type: "tel" },
      { key: "department", label: "Department", type: "text" },
      {
        key: "bio",
        label: "Bio / Notes",
        type: "textarea",
        rows: 3,
        placeholder: "Additional information about this admin...",
      },
    ],
    submitText: "Update Admin",
  },
};

const adminMockData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "admin",
    phone: "+1234567890",
    department: "IT",
    lastLogin: "2024-01-15",
    createdAt: "2024-01-01",
    bio: "Senior administrator with full system access",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    role: "moderator",
    phone: "+1234567891",
    department: "HR",
    lastLogin: "2024-01-14",
    createdAt: "2024-01-02",
    bio: "HR moderator with user management permissions",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    role: "user",
    phone: "+1234567892",
    department: "Sales",
    lastLogin: "2024-01-10",
    createdAt: "2024-01-03",
    bio: "Sales team limited admin access",
  },
  {
    id: 4,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "admin",
    phone: "+1234567890",
    department: "IT",
    lastLogin: "2024-01-15",
    createdAt: "2024-01-01",
    bio: "Senior administrator with full system access",
  },
  {
    id: 5,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    role: "moderator",
    phone: "+1234567891",
    department: "HR",
    lastLogin: "2024-01-14",
    createdAt: "2024-01-02",
    bio: "HR moderator with user management permissions",
  },
  {
    id: 6,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    role: "user",
    phone: "+1234567892",
    department: "Sales",
    lastLogin: "2024-01-10",
    createdAt: "2024-01-03",
    bio: "Sales team limited admin access",
  },
  {
    id: 7,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "admin",
    phone: "+1234567890",
    department: "IT",
    lastLogin: "2024-01-15",
    createdAt: "2024-01-01",
    bio: "Senior administrator with full system access",
  },
  {
    id: 8,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    role: "moderator",
    phone: "+1234567891",
    department: "HR",
    lastLogin: "2024-01-14",
    createdAt: "2024-01-02",
    bio: "HR moderator with user management permissions",
  },
  {
    id: 9,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    role: "user",
    phone: "+1234567892",
    department: "Sales",
    lastLogin: "2024-01-10",
    createdAt: "2024-01-03",
    bio: "Sales team limited admin access",
  },
];

const adminConfig = {
  title: "Admin Management",
  description: "Manage system administrators and their permissions",
  table: adminTableConfig,
  form: adminFormConfig,
  mockData: adminMockData,
};

const AdminsPage = () => {
  return <CrudPage config={adminConfig} />;
};

export default AdminsPage;
