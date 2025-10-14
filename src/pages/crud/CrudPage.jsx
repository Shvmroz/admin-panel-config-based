import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import Layout from '../../components/layout/Layout';
import Table from '../../components/ui/Table';
import FilterSidebar from '../../components/ui/FilterSidebar';
import Modal from '../../components/ui/Modal';
import GenericForm from '../../components/forms/GenericForm';
import Button from '../../components/ui/Button';

const CrudPage = ({ config }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const {
    title = 'Data Management',
    description = 'Manage your data with ease',
    api = {},
    table = {},
    form = {},
    filter = {}
  } = config;

  // Generate mock data if no API is provided
  useEffect(() => {
    if (api.list) {
      fetchData();
    } else {
      const mockData = generateMockData();
      setData(mockData);
    }
  }, []);

  const generateMockData = () => {
    return Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      email: `user${index + 1}@example.com`,
      status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)],
      role: ['admin', 'user', 'moderator'][Math.floor(Math.random() * 3)],
      createdAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
      lastLogin: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0]
    }));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockData();
      setData(mockData);
    } catch (error) {
      enqueueSnackbar('Failed to fetch data', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setShowAddModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedItem) {
        setData(prev => prev.map(item => 
          item.id === selectedItem.id ? { ...item, ...formData } : item
        ));
        enqueueSnackbar('Item updated successfully', { variant: 'success' });
        setShowEditModal(false);
      } else {
        const newItem = {
          ...formData,
          id: Math.max(...data.map(d => d.id)) + 1,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setData(prev => [newItem, ...prev]);
        enqueueSnackbar('Item added successfully', { variant: 'success' });
        setShowAddModal(false);
      }
    } catch (error) {
      enqueueSnackbar('Operation failed', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setFormLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setData(prev => prev.filter(item => item.id !== selectedItem.id));
      enqueueSnackbar('Item deleted successfully', { variant: 'success' });
      setShowDeleteModal(false);
    } catch (error) {
      enqueueSnackbar('Delete failed', { variant: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilterValues(newFilters);
  };

  const handleFilterReset = (resetFilters) => {
    setFilterValues(resetFilters);
  };

  // Filter data based on filter values
  const filteredData = React.useMemo(() => {
    return data.filter(item => {
      return Object.entries(filterValues).every(([key, value]) => {
        if (!value) return true;
        const itemValue = item[key];
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }
        return itemValue === value;
      });
    });
  }, [data, filterValues]);

  // Default table configuration
  const defaultTableConfig = {
    data: filteredData,
    loading,
    sorting: { enabled: false },
    search: { enabled: true, type: 'local', placeholder: 'Search items...' },
    pagination: { enabled: true, pageSize: 10 },
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' },
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
      { key: 'role', title: 'Role' },
      { key: 'createdAt', title: 'Created' }
    ],
    actions: [
      {
        title: 'Edit',
        icon: 'material-symbols:edit-outline',
        onClick: (item) => handleEdit(item)
      },
      {
        title: 'Delete',
        icon: 'material-symbols:delete-outline',
        variant: 'danger',
        onClick: (item) => handleDelete(item)
      }
    ]
  };

  // Default form configuration
  const defaultAddFormConfig = {
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true, icon: 'material-symbols:person-outline' },
      { key: 'email', label: 'Email', type: 'email', required: true, icon: 'material-symbols:email-outline' },
      { 
        key: 'status', 
        label: 'Status', 
        type: 'select', 
        required: true,
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'pending', label: 'Pending' }
        ]
      },
      { 
        key: 'role', 
        label: 'Role', 
        type: 'select', 
        required: true,
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
          { value: 'moderator', label: 'Moderator' }
        ]
      }
    ],
    submitText: 'Add Item'
  };

  const defaultEditFormConfig = {
    ...defaultAddFormConfig,
    submitText: 'Update Item'
  };

  // Default filter configuration
  const defaultFilterConfig = {
    fields: [
      { key: 'name', label: 'Name', type: 'text', placeholder: 'Search by name...', icon: 'material-symbols:search' },
      { key: 'email', label: 'Email', type: 'text', placeholder: 'Search by email...', icon: 'material-symbols:email-outline' },
      { 
        key: 'status', 
        label: 'Status', 
        type: 'select',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'pending', label: 'Pending' }
        ]
      },
      { 
        key: 'role', 
        label: 'Role', 
        type: 'select',
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
          { value: 'moderator', label: 'Moderator' }
        ]
      }
    ],
    values: filterValues,
    buttons: [
    ]
  };

  // Enhanced table config with proper action handling
  const enhancedTableConfig = React.useMemo(() => {
    const baseConfig = table.columns ? { ...table, data: filteredData, loading } : defaultTableConfig;
    
    // Handle action clicks
    if (baseConfig.actions) {
      baseConfig.actions = baseConfig.actions.map(action => ({
        ...action,
        onClick: typeof action.onClick === 'string' 
          ? action.onClick === 'edit' 
            ? handleEdit 
            : action.onClick === 'delete' 
            ? handleDelete 
            : action.onClick
          : action.onClick
      }));
    }
    
    return baseConfig;
  }, [table, filteredData, loading, handleEdit, handleDelete]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-theme-primary">{title}</h1>
            <p className="text-theme-secondary mt-1">{description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowFilters(true)}
              icon="material-symbols:filter-list"
            >
              Filters
            </Button>
            <Button
              onClick={handleAdd}
              icon="material-symbols:add"
            >
              Add New
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table config={enhancedTableConfig} />

        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          config={filter.fields ? filter : defaultFilterConfig}
          onFilterChange={handleFilterChange}
          onReset={handleFilterReset}
        />

        {/* Add Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Item"
          size="lg"
        >
          <GenericForm
            config={form.add || defaultAddFormConfig}
            onSubmit={handleFormSubmit}
            loading={formLoading}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Item"
          size="lg"
        >
          <GenericForm
            config={form.edit || defaultEditFormConfig}
            onSubmit={handleFormSubmit}
            initialData={selectedItem}
            loading={formLoading}
          />
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirm Delete"
          actions={
            <>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
                disabled={formLoading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteConfirm}
                loading={formLoading}
                icon="material-symbols:delete-outline"
              >
                Delete
              </Button>
            </>
          }
        >
          <div className="text-center py-4">
            <Icon icon="material-symbols:warning" className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-theme-primary mb-2">
              Are you sure you want to delete this item?
            </p>
            <p className="text-theme-secondary">
              This action cannot be undone. The item "{selectedItem?.name}" will be permanently removed.
            </p>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default CrudPage;