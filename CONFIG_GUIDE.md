# Simplified Config-Based Admin Panel Guide

This guide explains the streamlined configuration structure for the admin panel.

## Overview

The admin panel uses separate configuration objects that merge into one main config. Everything is managed from the parent page component, making it easy to create new admin pages.

## Primary Color System

The app uses CSS custom properties for consistent theming:

```css
/* Available classes */
.primary-bg          /* Primary background color */
.primary-bg-light    /* Light primary background */
.primary-bg-dark     /* Dark primary background */
.primary-text        /* Primary text color */
.primary-border      /* Primary border color */
.primary-hover:hover /* Primary hover state */
```

To change the app's primary color, update the CSS variables in `src/index.css`:

```css
:root {
  --primary-500: #3b82f6; /* Change this to your desired color */
  --primary-600: #2563eb; /* Darker shade */
  --primary-700: #1d4ed8; /* Even darker shade */
  /* etc... */
}
```

## Configuration Structure - Separate Configs

Instead of one large config object, we now use separate configs that merge together:

```javascript
// Table Configuration
const tableConfig = {
  columns: [...],
  actions: [...],
  search: { enabled: true, placeholder: "Search..." },
  pagination: { enabled: true, pageSize: 10 }
};

// Form Configuration
const formConfig = {
  add: { fields: [...], submitText: "Create" },
  edit: { fields: [...], submitText: "Update" }
};

// Filter Configuration (optional)
const filterConfig = {
  fields: [...]
};

// Main Configuration - Merge all configs
const config = {
  title: "Admin Management",
  data: filteredData,
  loading: false,
  onView: handleView,
  onSubmit: handleSubmit,
  onDelete: handleDelete,
  onFilterApply: setFilters,
  tableConfig,
  formConfig,
  filterConfig
};
```

## Table Configuration

### Columns
Each column is simple and clean:
- `key`: Data property key
- `title`: Column header
- `render`: Optional custom render function

```javascript
columns: [
  {
    key: "name",
    title: "Full Name"
  },
  {
    key: "status",
    title: "Status",
    render: (value) => <StatusBadge status={value} />
  }
]
```

### Actions
Menu actions for each row:

```javascript
actions: [
  {
    title: "Edit",
    type: "edit",
    icon: <EditIcon />
  },
  {
    title: "Delete",
    type: "delete",
    variant: "danger",
    icon: <DeleteIcon />
  }
]
```

## Form Configuration

Forms are configured separately for add and edit operations:

```javascript
formConfig: {
  add: {
    fields: [
      {
        key: "name",
        label: "Full Name",
        type: "text",
        required: true
      },
      {
        key: "role",
        label: "Role",
        type: "select",
        options: [
          { value: "admin", label: "Administrator" },
          { value: "user", label: "User" }
        ]
      }
    ],
    submitText: "Create User"
  },
  edit: {
    fields: [...], // Same structure
    submitText: "Update User"
  }
}
```

### Field Types
- `text`, `email`, `password`, `tel`, `number`
- `select` (requires `options` array)
- `textarea` (supports `rows` property)

## Filter Configuration

Optional filtering sidebar:

```javascript
filterConfig: {
  fields: [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" }
      ]
    },
    {
      key: "department",
      label: "Department",
      type: "text",
      placeholder: "Search departments..."
    }
  ]
}
```

## Event Handlers

All handlers are defined in the parent component:

```javascript
// View handler (optional)
const handleView = (item) => {
  console.log('Viewing:', item);
};

// Form submission (handles both add and edit)
const handleSubmit = async (formData, selectedItem) => {
  if (selectedItem) {
    // Update existing item
    updateItem(selectedItem.id, formData);
  } else {
    // Create new item
    createItem(formData);
  }
};

// Delete handler
const handleDelete = async (selectedItem) => {
  await deleteItem(selectedItem.id);
};

// Filter handler
const handleFilterApply = (filters) => {
  setFilters(filters);
};
```

## Complete Example

```javascript
// AdminsPage.jsx
import React, { useState, useEffect } from 'react';
import CrudPage from '../components/CrudPage';

const AdminsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const handleSubmit = async (formData, selectedItem) => {
    if (selectedItem) {
      // Update logic
    } else {
      // Create logic
    }
  };

  const handleDelete = async (selectedItem) => {
    // Delete logic
  };

  // Table Configuration
  const tableConfig = {
    columns: [
      { key: "name", title: "Name" },
      { key: "email", title: "Email" }
    ],
    actions: [
      { title: "Edit", type: "edit", icon: <EditIcon /> },
      { title: "Delete", type: "delete", icon: <DeleteIcon /> }
    ],
    search: { enabled: true },
    pagination: { enabled: true, pageSize: 10 }
  };
  
  // Form Configuration
  const formConfig = {
    add: {
      fields: [
        { key: "name", label: "Name", type: "text", required: true },
        { key: "email", label: "Email", type: "email", required: true }
      ],
      submitText: "Create Admin"
    },
    edit: {
      fields: [
        { key: "name", label: "Name", type: "text", required: true },
        { key: "email", label: "Email", type: "email", required: true }
      ],
      submitText: "Update Admin"
    }
  };
  
  // Filter Configuration
  const filterConfig = {
    fields: [
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" }
        ]
      }
    ]
  };

  // Main Configuration - Merge all configs
  const config = {
    title: "Admin Management",
    data: filteredData,
    loading,
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    onFilterApply: setFilters,
    tableConfig,
    formConfig,
    filterConfig
  };

  return <CrudPage config={config} />;
};
```

## Benefits

1. **Simple**: One config object handles everything
2. **Consistent**: Same structure for all admin pages
3. **Maintainable**: All logic in parent component
4. **Flexible**: Easy to customize colors and behavior
5. **Reusable**: Create new pages by just configuring the object
6. **Clear**: Column descriptions help users understand data

## Creating New Pages

To create a new admin page:

1. Copy the AdminsPage structure
2. Update the config object with your data structure
3. Implement the handler functions
4. Add the route to your router

That's it! The CrudPage component handles all the UI and interactions automatically.