export const userConfig = {
  title: 'User Management',
  description: 'Manage system users and their accounts',
  
  table: {
    search: { enabled: true, placeholder: 'Search users...' },
    pagination: { enabled: true, pageSize: 10 },
    columns: [
      { key: 'id', title: 'ID' },
      { 
        key: 'avatar', 
        title: 'Avatar', 
        render: (value, row) => (
          <img 
            src={`https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2`} 
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
      { key: 'joinedAt', title: 'Joined Date' },
      { key: 'lastActive', title: 'Last Active' }
    ],
    actions: [
      {
        title: 'Edit User',
        type: 'edit'
      },
      {
        title: 'Delete User',
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
            { value: 'pending', label: 'Pending Verification' }
          ]
        },
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'company', label: 'Company', type: 'text' },
        { key: 'notes', label: 'Notes', type: 'textarea', rows: 3, placeholder: 'Additional notes about this user...' }
      ],
      submitText: 'Create User'
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
            { value: 'pending', label: 'Pending Verification' }
          ]
        },
        { key: 'phone', label: 'Phone Number', type: 'tel' },
        { key: 'company', label: 'Company', type: 'text' },
        { key: 'notes', label: 'Notes', type: 'textarea', rows: 3, placeholder: 'Additional notes about this user...' }
      ],
      submitText: 'Update User'
    }
  },

  mockData: [
    {
      id: 1,
      name: 'Alice Wilson',
      email: 'alice@example.com',
      status: 'active',
      phone: '+1234567890',
      company: 'Tech Corp',
      joinedAt: '2024-01-15',
      lastActive: '2024-01-20',
      notes: 'Premium user with event management access'
    },
    {
      id: 2,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      status: 'active',
      phone: '+1234567891',
      company: 'Design Studio',
      joinedAt: '2024-01-10',
      lastActive: '2024-01-19',
      notes: 'Regular user, organizes monthly meetups'
    },
    {
      id: 3,
      name: 'Diana Prince',
      email: 'diana@example.com',
      status: 'pending',
      phone: '+1234567892',
      company: 'Marketing Inc',
      joinedAt: '2024-01-18',
      lastActive: '2024-01-18',
      notes: 'New user, pending email verification'
    },
    {
      id: 4,
      name: 'Edward Smith',
      email: 'edward@example.com',
      status: 'inactive',
      phone: '+1234567893',
      company: 'Consulting LLC',
      joinedAt: '2023-12-01',
      lastActive: '2024-01-05',
      notes: 'Inactive user, last login over 2 weeks ago'
    }
  ]
};