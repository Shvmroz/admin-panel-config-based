import React from 'react';
import CrudPage from './crud/CrudPage';

const Admins = () => {
  const config = {
    title: 'Admin Management',
    description: 'Manage system administrators and their permissions',
    api: {
      list: '/api/admins',
      create: '/api/admins',
      update: '/api/admins/:id',
      delete: '/api/admins/:id'
    },
    table: {
      sorting: { enabled: false },
      search: { enabled: true, type: 'local', placeholder: 'Search admins...' },
      pagination: { enabled: true, pageSize: 10 },
      columns: [
        { key: 'id', title: 'ID', sortable: true },
        { 
          key: 'avatar', 
          title: 'Avatar', 
          render: (value, row) => (
            <img 
              src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2`} 
              alt={row.name} 
              className="w-8 h-8 rounded-full"
            />
          )
        },
        { key: 'name', title: 'Full Name', sortable: true },
        { key: 'email', title: 'Email Address', sortable: true },
        { 
          key: 'status', 
          title: 'Status', 
          render: (value) => (
            <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
              value === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : value === 'inactive'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
            }`}>
              {value}
            </span>
          )
        },
        { 
          key: 'role', 
          title: 'Admin Level', 
          render: (value) => (
            <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
              value === 'admin' 
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                : value === 'moderator'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
            }`}>
              {value === 'admin' ? 'Super Admin' : value === 'moderator' ? 'Moderator' : 'User'}
            </span>
          )
        },
        { key: 'lastLogin', title: 'Last Login' },
        { key: 'createdAt', title: 'Created Date' }
      ],
      actions: [
        {
          title: 'View Details',
          icon: 'material-symbols:visibility-outline',
          onClick: (item) => {
            console.log('View details for:', item);
          }
        },
        {
          title: 'Edit Admin',
          icon: 'material-symbols:edit-outline',
          onClick: 'edit'
        },
        {
          title: 'Reset Password',
          icon: 'material-symbols:lock-reset',
          onClick: (item) => {
            console.log('Reset password for:', item);
          }
        },
        {
          title: 'Delete Admin',
          icon: 'material-symbols:delete-outline',
          variant: 'danger',
          onClick: 'delete'
        }
      ]
    },
    form: {
      add: {
        fields: [
          { key: 'name', label: 'Full Name', type: 'text', required: true, icon: 'material-symbols:person-outline' },
          { key: 'email', label: 'Email Address', type: 'email', required: true, icon: 'material-symbols:email-outline' },
          { key: 'password', label: 'Password', type: 'password', required: true, icon: 'material-symbols:lock-outline' },
          { key: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true, icon: 'material-symbols:lock-outline' },
          { 
            key: 'status', 
            label: 'Status', 
            type: 'select', 
            required: true,
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'pending', label: 'Pending Activation' }
            ]
          },
          { 
            key: 'role', 
            label: 'Admin Level', 
            type: 'select', 
            required: true,
            options: [
              { value: 'admin', label: 'Super Administrator' },
              { value: 'moderator', label: 'Moderator' },
              { value: 'user', label: 'Limited Admin' }
            ]
          },
          { key: 'phone', label: 'Phone Number', type: 'tel', icon: 'material-symbols:phone-outline' },
          { key: 'department', label: 'Department', type: 'text', icon: 'material-symbols:business-outline' },
          { key: 'bio', label: 'Bio / Notes', type: 'textarea', rows: 3, fullWidth: true, placeholder: 'Additional information about this admin...' }
        ],
        submitText: 'Create Admin'
      },
      edit: {
        fields: [
          { key: 'name', label: 'Full Name', type: 'text', required: true, icon: 'material-symbols:person-outline' },
          { key: 'email', label: 'Email Address', type: 'email', required: true, icon: 'material-symbols:email-outline' },
          { 
            key: 'status', 
            label: 'Status', 
            type: 'select', 
            required: true,
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'pending', label: 'Pending Activation' }
            ]
          },
          { 
            key: 'role', 
            label: 'Admin Level', 
            type: 'select', 
            required: true,
            options: [
              { value: 'admin', label: 'Super Administrator' },
              { value: 'moderator', label: 'Moderator' },
              { value: 'user', label: 'Limited Admin' }
            ]
          },
          { key: 'phone', label: 'Phone Number', type: 'tel', icon: 'material-symbols:phone-outline' },
          { key: 'department', label: 'Department', type: 'text', icon: 'material-symbols:business-outline' },
          { key: 'bio', label: 'Bio / Notes', type: 'textarea', rows: 3, fullWidth: true, placeholder: 'Additional information about this admin...' }
        ],
        submitText: 'Update Admin'
      }
    },
    filter: {
      fields: [
        { key: 'name', label: 'Name', type: 'text', placeholder: 'Search by name...', icon: 'material-symbols:search' },
        { key: 'email', label: 'Email', type: 'text', placeholder: 'Search by email...', icon: 'material-symbols:email-outline' },
        { key: 'department', label: 'Department', type: 'text', placeholder: 'Search by department...', icon: 'material-symbols:business-outline' },
        { 
          key: 'status', 
          label: 'Status', 
          type: 'select',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'pending', label: 'Pending Activation' }
          ]
        },
        { 
          key: 'role', 
          label: 'Admin Level', 
          type: 'select',
          options: [
            { value: 'admin', label: 'Super Administrator' },
            { value: 'moderator', label: 'Moderator' },
            { value: 'user', label: 'Limited Admin' }
          ]
        },
        { key: 'createdAt', label: 'Created Date', type: 'date' },
        { key: 'lastLogin', label: 'Last Login Date', type: 'date' }
      ],
      buttons: []
    }
  };

  return <CrudPage config={config} />;
};

export default Admins;