# Configuration Guide

This guide explains the standardized configuration structure used across the application.

## Configuration Structure

All CRUD pages use a unified configuration object with the following structure:

```javascript
const config = {
  // Page metadata
  title: "Page Title",
  description: "Page description",

  // Table configuration
  tableConfig: {
    search: { enabled: true, placeholder: "Search..." },
    pagination: { enabled: true, pageSize: 10 },
    handlers: {
      onEdit: handleEdit,    // Handler for edit action
      onView: handleView,    // Handler for view action
      onDelete: handleDelete // Handler for delete action
    },
    table_head: [...],
    menu_actions: [...]      // Actions now use types instead of inline handlers
  },

  // Form configuration (for add/edit modals)
  formConfig: {
    handlers: {
      onSubmit: handleFormSubmit,        // Handler for form submission
      onModalClose: handleModalClose     // Handler for modal close
    },
    add: {
      input_fields: [...],
      submitButtonText: "Create"
    },
    edit: {
      input_fields: [...],
      submitButtonText: "Update"
    }
  },

  // Filter configuration (optional)
  filterConfig: {
    FilterComponent: YourFilterComponent,
    handlers: {
      onApply: handleFilterApply        // Handler for applying filters
    },
    input_fields: [...]
  },

  // Data and loading state
  data: [],
  loading: false,

  // Modal states
  modals: {
    showAdd,
    showEdit,
    showDelete,
    selectedItem,
    formLoading
  },

  // Global handlers (only for actions not tied to specific configs)
  handlers: {
    onAdd: handleAdd,           // Handler for add button
    onDelete: handleDeleteConfirm // Handler for delete confirmation
  }
};
```

## Key Naming Conventions

### input_fields
All field definitions use `input_fields` consistently:
- `formConfig.add.input_fields`
- `formConfig.edit.input_fields`
- `filterConfig.input_fields`

### Field Structure
Each field in `input_fields` follows this structure:

```javascript
{
  key: "fieldName",           // Database/state key
  label: "Field Label",       // Display label
  type: "text",              // Input type: text, email, password, select, textarea, etc.
  required: true,            // Optional: validation
  placeholder: "...",        // Optional: input placeholder
  options: [                 // For select fields
    { value: "val1", label: "Label 1" },
    { value: "val2", label: "Label 2" }
  ]
}
```

## Handler Organization

Each configuration now contains its own handlers for better clarity and maintainability:

### Table Handlers
Located in `tableConfig.handlers`:
- `onEdit`: Called when edit action is clicked
- `onView`: Called when view action is clicked
- `onDelete`: Called when delete action is clicked

### Form Handlers
Located in `formConfig.handlers`:
- `onSubmit`: Called when form is submitted (used for both add and edit)
- `onModalClose`: Called when modal is closed

### Filter Handlers
Located in `filterConfig.handlers`:
- `onApply`: Called when filters are applied

### Global Handlers
Located in `config.handlers` (for cross-config actions):
- `onAdd`: Called when add button is clicked
- `onDelete`: Called for delete confirmation

## Filter Configuration

Filters are now simplified into a single object with their own handlers:

```javascript
const filterConfig = {
  FilterComponent: YourFilterComponent,
  handlers: {
    onApply: handleFilterApply  // Handler specific to filters
  },
  input_fields: [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [...]
    }
  ]
};
```

**Benefits:**
- If `filterConfig` is present, filters are automatically enabled
- No need to pass separate `showFilterSidebar` prop
- Filter sidebar state is managed internally by CrudPage
- Consistent naming with form configurations
- Handlers are grouped with their related config

## Complete Example Usage

```javascript
// In your page component (e.g., AdminsPage.jsx)

// Table configuration with handlers
const tableConfig = {
  search: { enabled: true, placeholder: "Search admins..." },
  pagination: { enabled: true, pageSize: 10 },
  handlers: {
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDelete
  },
  table_head: [...],
  menu_actions: [
    { title: "Edit", type: "edit", icon: <EditIcon /> },
    { title: "View", type: "view", icon: <ViewIcon /> },
    { title: "Delete", type: "delete", icon: <DeleteIcon /> }
  ]
};

// Form configuration with handlers
const formConfig = {
  handlers: {
    onSubmit: handleFormSubmit,
    onModalClose: handleModalClose
  },
  add: {
    input_fields: [...]
  },
  edit: {
    input_fields: [...]
  }
};

// Filter configuration with handlers
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
        { value: "inactive", label: "Inactive" }
      ]
    }
  ]
};

// Main config
const config = {
  title: "Admin Management",
  tableConfig,
  formConfig,
  filterConfig,
  data: filteredData,
  loading,
  modals: { showAdd, showEdit, showDelete, selectedItem, formLoading },
  handlers: {
    onAdd: handleAdd,
    onDelete: handleDeleteConfirm
  }
};

return <CrudPage config={config} />;
```

## Developer Notes

1. **Consistency**: All configurations use `input_fields` for field definitions
2. **Simplicity**: Filter integration is automatic when `filterConfig` is provided
3. **Separation of Concerns**: Each config has its own handlers - easy to find and maintain
4. **Reusability**: Configs are self-contained and can be easily reused
5. **Type Safety**: Use the same field types across forms and filters
6. **Extensibility**: Easy to add new field types or configurations
7. **Developer-Friendly**: Clear structure makes it easy for new developers to understand

## Migration from Old Structure

If you have existing code using the old structure:

**Before:**
```javascript
// Handlers spread across config and inline in menu_actions
const tableConfig = {
  menu_actions: [
    { title: "Edit", onClick: handleEdit },  // Inline handler
    { title: "Delete", onClick: handleDelete }
  ]
};

const filterConfig = {
  fields: [...]  // Old naming
};

const config = {
  FilterComponent: AdminFilters,
  filterConfig,
  showFilterSidebar,  // Manual state management
  handlers: {
    onEdit: handleEdit,
    onSubmit: handleFormSubmit,
    onDelete: handleDeleteConfirm,
    onModalClose: handleModalClose,
    onFilterApply: handleFilterApply
  }
};
```

**After:**
```javascript
// Handlers organized within their respective configs
const tableConfig = {
  handlers: {
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDelete
  },
  menu_actions: [
    { title: "Edit", type: "edit" },  // Just type, no inline handler
    { title: "Delete", type: "delete" }
  ]
};

const formConfig = {
  handlers: {
    onSubmit: handleFormSubmit,
    onModalClose: handleModalClose
  },
  add: { input_fields: [...] },
  edit: { input_fields: [...] }
};

const filterConfig = {
  FilterComponent: AdminFilters,
  handlers: {
    onApply: handleFilterApply
  },
  input_fields: [...]  // Renamed from "fields"
};

const config = {
  tableConfig,
  formConfig,
  filterConfig,  // Automatic filter handling, no showFilterSidebar needed
  handlers: {
    onAdd: handleAdd,
    onDelete: handleDeleteConfirm
  }
};
```

**Key Improvements:**
1. Handlers are now co-located with their related config
2. Menu actions use `type` instead of inline `onClick`
3. Consistent `input_fields` naming across all configs
4. Automatic filter sidebar management
5. Clearer separation of concerns
