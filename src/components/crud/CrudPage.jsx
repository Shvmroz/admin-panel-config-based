import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Plus, Filter } from 'lucide-react';
import Table from '../ui/Table';
import Modal from '../ui/Modal';
import Form from '../ui/Form';
import Button from '../ui/Button';

const CrudPage = ({ config }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const {
    title = 'Data Management',
    description = 'Manage your data with ease',
    table = {},
    form = {},
    mockData = []
  } = config;

  useEffect(() => {
    if (mockData.length > 0) {
      setData(mockData);
    }
  }, [mockData]);

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
          id: Math.max(...data.map(d => d.id), 0) + 1,
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

  // Enhanced table config with action handlers
  const enhancedTableConfig = {
    ...table,
    data,
    loading,
    actions: table.actions?.map(action => ({
      ...action,
      onClick: action.type === 'edit' ? handleEdit : 
               action.type === 'delete' ? handleDelete : 
               action.onClick
    })) || []
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleAdd}
            variant="contained"
            color="primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table config={enhancedTableConfig} />

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={`Add New ${title.replace(' Management', '')}`}
        size="lg"
      >
        <Form
          config={form.add}
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit ${title.replace(' Management', '')}`}
        size="lg"
      >
        <Form
          config={form.edit}
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
              variant="outlined"
              onClick={() => setShowDeleteModal(false)}
              disabled={formLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
              disabled={formLoading}
            >
              {formLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </>
        }
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Are you sure you want to delete this item?
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            This action cannot be undone. The item "{selectedItem?.name || selectedItem?.email}" will be permanently removed.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CrudPage;