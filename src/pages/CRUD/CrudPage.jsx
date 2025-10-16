import React from 'react';
import { Plus, Filter } from 'lucide-react';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import Button from '../../components/Button';
import FilterSidebar from '../../components/Filter/FilterSidebar';

const CrudPage = ({ config }) => {
  const {
    title = 'Data Management',
    description = 'Manage your data with ease',
    table = {},
    form = {},
    data = [],
    loading = false,
    modals = {},
    handlers = {},
    filterConfig = null,
    showFilterSidebar = false
  } = config;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
        <div className="flex items-center space-x-3">
          {filterConfig && (
            <Button
              onClick={handlers.onFilterOpen}
              variant="outlined"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          )}
          <Button
            onClick={handlers.onAdd}
            variant="contained"
            color="primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      <Table config={{ ...table, data, loading }} />

      {filterConfig && (
        <FilterSidebar
          isOpen={showFilterSidebar}
          onClose={handlers.onFilterClose}
          config={filterConfig}
          onApply={handlers.onFilterApply}
        />
      )}

      <Modal
        isOpen={modals.showAddModal}
        onClose={handlers.onAddModalClose}
        title={`Add New ${title.replace(' Management', '')}`}
        size="lg"
      >
        <Form
          config={form.add}
          onSubmit={handlers.onSubmit}
          loading={modals.formLoading}
        />
      </Modal>

      <Modal
        isOpen={modals.showEditModal}
        onClose={handlers.onEditModalClose}
        title={`Edit ${title.replace(' Management', '')}`}
        size="lg"
      >
        <Form
          config={form.edit}
          onSubmit={handlers.onSubmit}
          initialData={modals.selectedItem}
          loading={modals.formLoading}
        />
      </Modal>

      <Modal
        isOpen={modals.showDeleteModal}
        onClose={handlers.onDeleteModalClose}
        title="Confirm Delete"
        actions={
          <>
            <Button
              variant="outlined"
              onClick={handlers.onDeleteModalClose}
              disabled={modals.formLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handlers.onDeleteConfirm}
              disabled={modals.formLoading}
            >
              {modals.formLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </>
        }
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Are you sure you want to delete this item?
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            This action cannot be undone. The item "{modals.selectedItem?.name || modals.selectedItem?.email}" will be permanently removed.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CrudPage;
