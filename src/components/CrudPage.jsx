import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import Table from './Table';
import Modal from './Modal';
import Form from './Form';
import Button from './Button';
import FilterSidebar from './Filter/FilterSidebar';

const CrudPage = ({ config }) => {
  const {
    title,
    description,
    data = [],
    loading = false,
    tableConfig = {},
    formConfig = {},
    filterConfig = null,
    onAdd,
    onEdit,
    onDelete,
    onView,
    onSubmit,
    onFilterApply
  } = config;

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Handle menu actions
  const handleMenuAction = (action, item) => {
    switch (action) {
      case 'edit':
        setSelectedItem(item);
        setShowEdit(true);
        onEdit?.(item);
        break;
      case 'view':
        onView?.(item);
        break;
      case 'delete':
        setSelectedItem(item);
        setShowDelete(true);
        break;
    }
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      await onSubmit?.(formData, selectedItem);
      setShowAdd(false);
      setShowEdit(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    setFormLoading(true);
    try {
      await onDelete?.(selectedItem);
      setShowDelete(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle add button
  const handleAddClick = () => {
    setSelectedItem(null);
    setShowAdd(true);
    onAdd?.();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
        <div className="flex items-center space-x-3">
          {filterConfig && (
            <Button
              onClick={() => setShowFilters(true)}
              variant="outlined"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          )}
          <Button
            onClick={handleAddClick}
            className="primary-bg primary-hover text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table 
        config={{
          ...tableConfig,
          data,
          loading,
          onMenuAction: handleMenuAction
        }} 
      />

      {/* Filter Sidebar */}
      {filterConfig && (
        <FilterSidebar
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          config={filterConfig}
          onApply={onFilterApply}
        />
      )}

      {/* Add Modal */}
      <Modal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        title={`Add ${title.replace(' Management', '')}`}
        size="lg"
      >
        <Form
          config={formConfig.add}
          onSubmit={handleFormSubmit}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        title={`Edit ${title.replace(' Management', '')}`}
        size="lg"
      >
        <Form
          config={formConfig.edit}
          onSubmit={handleFormSubmit}
          initialData={selectedItem}
          loading={formLoading}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        title="Confirm Delete"
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Are you sure you want to delete this item?
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            "{selectedItem?.name || selectedItem?.email}" will be permanently removed.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => setShowDelete(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={formLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {formLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CrudPage;