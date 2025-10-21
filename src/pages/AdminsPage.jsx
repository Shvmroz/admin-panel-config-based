import React, { useState, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { Eye, Pencil, Trash2, User } from "lucide-react";
import CrudPage from "../components/CrudPage";
import { adminMockData } from "../data/admins";

const AdminsPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(adminMockData);
      setLoading(false);
    }, 500);
  }, []);

  const handleView = (item) => {
    enqueueSnackbar(`Viewing details for ${item.name}`, { variant: "info" });
  };

  const handleSubmit = async (formData, selectedItem) => {
    setFormLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (selectedItem) {
        setData((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id ? { ...item, ...formData } : item
          )
        );
        enqueueSnackbar("Admin updated successfully", { variant: "success" });
      } else {
        const newItem = {
          ...formData,
          id: Math.max(...data.map((d) => d.id), 0) + 1,
          createdAt: new Date().toISOString().split("T")[0],
          lastLogin: "Never",
        };
        setData((prev) => [newItem, ...prev]);
        enqueueSnackbar("Admin added successfully", { variant: "success" });
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = (selectedItem) => {
    setData((prev) => prev.filter((item) => item.id !== selectedItem.id));
    enqueueSnackbar("Admin deleted successfully", { variant: "success" });
  };

  const filteredData = useMemo(() => {
    let result = [...data];
    if (filters.status)
      result = result.filter((item) => item.status === filters.status);
    if (filters.role)
      result = result.filter((item) => item.role === filters.role);
    if (filters.department)
      result = result.filter((item) =>
        item.department
          ?.toLowerCase()
          .includes(filters.department.toLowerCase())
      );
    return result;
  }, [data, filters]);

  const tableConfig = {
    columns: [
      { key: "id", title: "#" },
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
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                : value === "moderator"
                ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
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
    search: {
      enabled: true,
      placeholder: "Search admins...",
      mode: "local",
      searchableColumns: ["name", "email", "department", "status", "role"],
    },
    pagination: { enabled: true, pageSize: 10 },
  };

  const modalConfig = {
    addModal: {
      title: "Add New Admin",
      formFields: {
        config: [
          { key: "name", label: "Full Name", type: "text", required: true },
          {
            key: "email",
            label: "Email Address",
            type: "email",
            required: true,
          },
          {
            key: "password",
            label: "Password",
            type: "password",
            required: true,
          },
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
      },
      footer: {
        submitButton: true,
        submitText: "Create Admin",
        cancelButton: true,
        cancelText: "Cancel",
      },
    },
    editModal: {
      title: "Edit Admin",
      formFields: {
        config: [
          { key: "name", label: "Full Name", type: "text", required: true },
          {
            key: "email",
            label: "Email Address",
            type: "email",
            required: true,
          },
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
      },
      footer: {
        submitButton: true,
        submitText: "Update Admin",
        cancelButton: true,
        cancelText: "Cancel",
      },
    },
  };

  const filterConfig = {
    fields: [
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending" },
        ],
      },
      {
        key: "role",
        label: "Role",
        type: "select",
        options: [
          { value: "admin", label: "Super Administrator" },
          { value: "moderator", label: "Moderator" },
          { value: "user", label: "Limited Admin" },
        ],
      },
      {
        key: "department",
        label: "Department",
        type: "text",
        placeholder: "Search by department...",
      },
    ],
  };

  const config = {
    title: "Admin Management",
    data: filteredData,
    loading,
    onView: handleView,
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    onFilterApply: setFilters,
    tableConfig,
    modalConfig,
    filterConfig,
  };

  return <CrudPage config={config} formLoading={formLoading} />;
};

export default AdminsPage;
