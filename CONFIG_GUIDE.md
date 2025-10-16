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
    table_head: [...],
    menu_actions: [...]
  },

  // Form configuration (for add/edit modals)
  formConfig: {
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

  // Event handlers
  handlers: {
    onAdd,
    onSubmit,
    onDelete,
    onModalClose,
    onFilterToggle,
    onFilterApply
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

## Filter Configuration

Filters are now simplified into a single object:

```javascript
const filterConfig = {
  FilterComponent: YourFilterComponent,  // The component to render
  input_fields: [                        // Filter fields (same structure as form fields)
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

## Example Usage

```javascript
// In your page component (e.g., AdminsPage.jsx)
const filterConfig = {
  FilterComponent: AdminFilters,
  input_fields: [
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
      placeholder: "Search by department..."
    }
  ]
};

const config = {
  title: "Admin Management",
  tableConfig,
  formConfig,
  filterConfig,  // Just pass this - filters will work automatically
  data,
  modals,
  handlers
};

return <CrudPage config={config} />;
```

## Developer Notes

1. **Consistency**: All configurations use `input_fields` for field definitions
2. **Simplicity**: Filter integration is automatic when `filterConfig` is provided
3. **Reusability**: Filter components receive the same config structure as forms
4. **Type Safety**: Use the same field types across forms and filters
5. **Extensibility**: Easy to add new field types or configurations

## Migration from Old Structure

If you have existing code using the old structure:

**Before:**
```javascript
filterConfig: {
  fields: [...]  // Old naming
}

config = {
  FilterComponent: AdminFilters,
  filterConfig,
  showFilterSidebar  // Manual state management
}
```

**After:**
```javascript
filterConfig: {
  FilterComponent: AdminFilters,
  input_fields: [...]  // New naming
}

config = {
  filterConfig  // Automatic filter handling
}
```
