export const adminConfig = {
  title: 'Admin Management',
  description: 'Manage system administrators and their permissions',
  
  table: {
    search: { enabled: true, placeholder: 'Search admins...' },
    pagination: { enabled: true, pageSize: 10 },
    columns: [
      { key: 'id', title: 'ID' },
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
      { key: 'name', title: 'Full Name' },
      { key: 'email', title: 'Email Address' },
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
        title: 'Edit Admin',
        type: 'edit'
      },
      {
        title: 'Delete Admin',
        type: 'delete',
        variant: 'danger'
      }
    ]
  },

  form: {
    add: {
      fields: [
        { key: 'name', label: 'Full Name', type: 'text', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
        { key: 'password', label: 'Password', type: 'password', required: true },
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
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'department', label: 'Department', type: 'text' },
        { key: 'bio', label: 'Bio / Notes', type: 'textarea', rows: 3, placeholder: 'Additional information about this admin...' }
      ],
      submitText: 'Create Admin'
    },
    edit: {
      fields: [
        { key: 'name', label: 'Full Name', type: 'text', required: true },
        { key: 'email', label: 'Email Address', type: 'email', required: true },
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
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'department', label: 'Department', type: 'text' },
        { key: 'bio', label: 'Bio / Notes', type: 'textarea', rows: 3, placeholder: 'Additional information about this admin...' }
      ],
      submitText: 'Update Admin'
    }
  },

  mockData: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      role: 'admin',
      phone: '+1234567890',
      department: 'IT',
      lastLogin: '2024-01-15',
      createdAt: '2024-01-01',
      bio: 'Senior administrator with full system access'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      role: 'moderator',
      phone: '+1234567891',
      department: 'HR',
      lastLogin: '2024-01-14',
      createdAt: '2024-01-02',
      bio: 'HR moderator with user management permissions'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'inactive',
      role: 'user',
      phone: '+1234567892',
      department: 'Sales',
      lastLogin: '2024-01-10',
      createdAt: '2024-01-03',
      bio: 'Sales team limited admin access'
    }
  ]
};