import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Eye, Pencil, Trash2, User } from "lucide-react";
import CrudPage from "../components/CrudPage";
import { adminMockData } from "../data/admins";

const AdminsPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(adminMockData);
    } catch (error) {
      enqueueSnackbar('Failed to load data', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleView = (item) => {
    enqueueSnackbar(`Viewing details for ${item.name}`, { variant: 'info' });
  };

  const handleSubmit = async (formData, selectedItem) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (selectedItem) {
        setData(prev => prev.map(item =>
          item.id === selectedItem.id ? { ...item, ...formData } : item
        ));
        enqueueSnackbar('Admin updated successfully', { variant: 'success' });
      } else {
        const newItem = {
          ...formData,
          id: Math.max(...data.map(d => d.id), 0) + 1,
          createdAt: new Date().toISOString().split('T')[0],
          lastLogin: 'Never'
        };
        setData(prev => [newItem, ...prev]);
        enqueueSnackbar('Admin added successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Operation failed', { variant: 'error' });
    }
  };

  const handleDelete = async (selectedItem) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setData(prev => prev.filter(item => item.id !== selectedItem.id));
      enqueueSnackbar('Admin deleted successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Delete failed', { variant: 'error' });
    }
  };

  const filteredData = React.useMemo(() => {
    let result = [...data];

    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }

    if (filters.role) {
      result = result.filter(item => item.role === filters.role);
    }

    if (filters.department) {
      result = result.filter(item =>
        item.department?.toLowerCase().includes(filters.department.toLowerCase())
      );
    }

    return result;
  }, [data, filters]);

  const config = {
    title: "Admin Management",
    description: "Manage system administrators and their permissions",
    data: filteredData,
    loading,
    onView: handleView,
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    onFilterApply: setFilters,
    
    tableConfig: {
      columns: [
        { 
          key: "id", 
          title: "#",
          description: "Unique identifier"
        },
        {
          key: "user",
          title: "User Info",
          description: "Name and email details",
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
          description: "Account status",
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
          description: "Permission level",
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
        { 
          key: "lastLogin", 
          title: "Last Login",
          description: "Last access time"
        },
        { 
          key: "createdAt", 
          title: "Created Date",
          description: "Account creation date"
        },
      ],
      actions: [
        {
          title: "Edit Admin",
          type: "edit",
          icon: <Pencil className="w-4 h-4" />
        },
        {
          title: "View Details",
          type: "view",
          icon: <Eye className="w-4 h-4" />
        },
        {
          title: "Delete Admin",
          type: "delete",
          variant: "danger",
          icon: <Trash2 className="w-4 h-4" />
        },
      ],
      search: { enabled: true, placeholder: "Search admins..." },
      pagination: { enabled: true, pageSize: 10 }
    },

    formConfig: {
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
    },

    filterConfig: {
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
    }
  };

  return <CrudPage config={config} />;
};

export default AdminsPage;
    search: { enabled: true, placeholder: "Search admins..." },
    pagination: { enabled: true, pageSize: 10 },
    handlers: {
      onEdit: handleEdit,
      onView: handleView,
      onDelete: handleDelete
    },
    table_head: [
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
    menu_actions: [
      {
        title: "Edit Admin",
        type: "edit",
        icon: <Pencil className="w-4 h-4" />
      },
      {
        title: "View Details",
        type: "view",
        icon: <Eye className="w-4 h-4" />
      },
      {
        title: "Delete Admin",
        type: "delete",
        variant: "danger",
        icon: <Trash2 className="w-4 h-4" />
      },
    ],
  };

  const formConfig = {
    handlers: {
      onSubmit: handleFormSubmit,
      onModalClose: handleModalClose
    },
    add: {
      input_fields: [
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
      submitButtonText: "Create Admin",
    },
    edit: {
      input_fields: [
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
      submitButtonText: "Update Admin",
    },
  };

  const filterConfig = {
    FilterComponent: AdminFilters,
    handlers: {
      onApply: handleFilterApply
    },
    input_fields: [
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
    description: "Manage system administrators and their permissions",
    tableConfig,
    formConfig,
    data: filteredData,
    loading,
    modals: {
      showAdd,
      showEdit,
      showDelete,
      selectedItem,
      formLoading
    },
    handlers: {
      onAdd: handleAdd,
      onDelete: handleDeleteConfirm
    },
    filterConfig
  };

  return <CrudPage config={config} />;
};

export default AdminsPage;
