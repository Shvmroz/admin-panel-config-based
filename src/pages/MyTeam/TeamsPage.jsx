import React, { useState, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { Eye, Pencil, Trash2, User } from "lucide-react";
import CrudPage from "../../components/CrudPage";
import { mockData } from "../../data/teams";
import { formatDate } from "../../lib/utils";
import { Icon } from "@iconify/react";
import TeamFilters from "./TeamFilters";
import TeamMemberDetail from "./TeamMemberDetail";

const TeamsPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);
  }, []);

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
        enqueueSnackbar("User updated successfully", { variant: "success" });
      } else {
        const newItem = {
          ...formData,
          id: Math.max(...data.map((d) => d.id), 0) + 1,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setData((prev) => [newItem, ...prev]);
        enqueueSnackbar("User added successfully", { variant: "success" });
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (selectedItem) => {
    setFormLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setData((prev) => prev.filter((item) => item.id !== selectedItem.id));
      enqueueSnackbar("User deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Delete failed", { variant: "error" });
    } finally {
      setFormLoading(false);
    }
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

  const handleSearch = async (searchTerm) => {
    console.log("API search called with:", searchTerm);
  };

  const tableConfig = {
    table_head: [
      { key: "id", title: "#" },
      {
        key: "user",
        title: "Info",
        render: (value, row) => (
          <div className="flex items-center space-x-4">
            {row?.image ? (
              <img
                src={row.image}
                alt={row?.name || "User"}
                className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-600">
                <User className="w-6 h-6 text-gray-400 dark:text-gray-400" />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {row?.first_name + " " + row?.last_name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {row.email || "N/A"}
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "phone",
        title: "Phone Number",
        render: (value, row) => (
          <>
            <span className="">{row.phone}</span>
          </>
        ),
      },
      {
        key: "role",
        title: "Role",
        render: (value) => (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium ${
              value === "admin"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                : value === "moderator"
                ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                : value === "editor"
                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                : value === "viewer"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
            }`}
          >
            {value === "admin"
              ? "Super Admin"
              : value === "moderator"
              ? "Moderator"
              : value === "editor"
              ? "Editor"
              : value === "viewer"
              ? "Viewer"
              : "No Role"}
          </span>
        ),
      },

      {
        key: "createdAt",
        title: "Created Date",
        render: (value) => <span>{formatDate(value)}</span>,
      },
      {
        key: "status",
        title: "Status",
        render: (value) => (
          <span
            className={`inline-flex items-center justify-center px-3 py-1 rounded-sm text-xs font-semibold border uppercase max-h-[24px] min-w-[78px] ${
              value === "active"
                ? "border-green-400 text-green-500 dark:border-green-600 dark:text-green-500"
                : "border-red-400 text-red-500 dark:border-red-600 dark:text-red-500"
            }`}
          >
            {value}
          </span>
        ),
      },
    ],
    actions: [
      {
        title: "Edit",
        type: "edit",
        icon: <Pencil className="w-4 h-4" />,
      },
      {
        title: "View Details",
        type: "view",
        icon: <Eye className="w-4 h-4" />,
      },
      {
        title: "Delete",
        type: "delete",
        variant: "danger",
        icon: <Trash2 className="w-4 h-4" />,
      },
    ],
    search: {
      enabled: true,
      placeholder: "Search...",
      useLocalSearch: true,
    },
    pagination: { enabled: true, pageSize: 10 },
    onSearch: handleSearch,
  };

  const modalConfig = {
    addModal: {
      icon: <Icon icon="material-symbols:add-rounded" className="w-6 h-6" />,
      title: "Add New Team Member",
      size: "lg",
      formFields: {
        gridClass: "grid grid-cols-12 gap-4",
        config: [
          {
            key: "first_name",
            label: "First Name",
            type: "text",
            required: true,
            colClass: "col-span-12 sm:col-span-6",
          },
          {
            key: "last_name",
            label: "Last Name",
            type: "text",
            required: true,
            colClass: "col-span-12 sm:col-span-6",
          },
          {
            key: "email",
            label: "Email",
            type: "email",
            required: true,
            colClass: "col-span-12 sm:col-span-6",
          },
          {
            key: "password",
            label: "Password",
            type: "password",
            required: true,
            colClass: "col-span-12 sm:col-span-6",
          },
          {
            key: "phone",
            label: "Phone",
            type: "text",
            colClass: "col-span-12 sm:col-span-6",
          },
          {
            key: "bio",
            label: "Bio",
            type: "textarea",
            rows: 3,
            colClass: "col-span-12",
          },
        ],
      },
      footer: {
        submitButton: true,
        submitText: "Add Member",
        cancelButton: true,
        cancelText: "Cancel",
      },
    },

    editModal: {
      icon: <Icon icon="circum:edit" className="w-6 h-6" />,
      title: "Edit Member",
      size: "lg",
      formFields: {
        gridClass: "grid grid-cols-12 gap-4",
        config: [
          {
            key: "image",
            label: "Profile Image",
            type: "image",
            required: false,
            colClass: "col-span-12",
          },
          {
            key: "first_name",
            label: "First Name",
            type: "text",
            required: true,
            colClass: "col-span-12 sm:col-span-6",
          },
          {
            key: "last_name",
            label: "Last Name",
            type: "text",
            required: true,
            colClass: "col-span-12 sm:col-span-6",
          },
          {
            key: "email",
            label: "Email Address",
            type: "email",
            required: true,
            colClass: "col-span-12 sm:col-span-6",
          },
          {
            key: "status",
            label: "Status",
            type: "select",
            required: true,
            colClass: "col-span-12 sm:col-span-6",
            options: [
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ],
          },
          {
            key: "role",
            label: "Role",
            type: "select",
            search: true,
            required: true,
            colClass: "col-span-12 sm:col-span-6",
            options: [
              { value: "admin", label: "Super Administrator" },
              { value: "moderator", label: "Moderator" },
              { value: "editor", label: "Editor" },
              { value: "viewer", label: "Viewer" },
            ],
          },
          {
            key: "phone",
            label: "Phone Number",
            type: "text",
            required: true,
            placeholder: "Eg. +923001234567",
            colClass: "col-span-12 sm:col-span-6",
          },
          {
            key: "bio",
            label: "Bio / Notes",
            type: "textarea",
            rows: 3,
            placeholder: "Additional information about this member...",
            colClass: "col-span-12",
          },
        ],
      },
      footer: {
        submitButton: true,
        submitText: "Update Member",
        cancelButton: true,
        cancelText: "Cancel",
      },
    },
    deleteModal: {
      icon: <Icon icon="ph:warning-bold" className="w-6 h-6 text-red-500" />,
      title: "Confirm Delete",
      size: "md",
      confirmText: "Are you sure you want to delete this member?",
      footer: {
        submitButton: true,
        submitText: "Delete",
        cancelButton: true,
        cancelText: "Cancel",
        color: "error",
      },
    },
    viewModal: {
      icon: <Eye className="w-6 h-6" />,
      title: "Team Member Details",
      size: "lg",
      component: TeamMemberDetail,
      footer: {
        cancelButton: true,
        cancelText: "Close",
      },
    },
  };

  const filterConfig = {
    component: TeamFilters,
  };

  const config = {
    title: "Team Management",
    description: "Manage team members and their roles and permissions",
    buttonText: "Add New Member",
    data: filteredData,
    loading,
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    onFilterApply: setFilters,
    tableConfig,
    modalConfig,
    filterConfig,
    formLoading,
  };

  return <CrudPage config={config} />;
};

export default TeamsPage;
