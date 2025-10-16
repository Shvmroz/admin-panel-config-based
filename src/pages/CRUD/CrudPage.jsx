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
    tableConfig = {},
    formConfig = {},
    data = [],
    loading = false,
    modals = {},
    handlers = {},
    filterConfig = null
  } = config;

  const FilterComponent = filterConfig?.FilterComponent;
  const [showFilterSidebar, setShowFilterSidebar] = React.useState(false);

  const handleFilterToggle = () => {
    setShowFilterSidebar(prev => !prev);
    handlers.onFilterToggle?.();
  };

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
              onClick={handleFilterToggle}
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

      <Table config={{ ...tableConfig, data, loading }} />

      {filterConfig && FilterComponent && (
        <FilterSidebar
          isOpen={showFilterSidebar}
          onClose={handleFilterToggle}
        >
          <FilterComponent
            config={filterConfig}
            onApply={handlers.onFilterApply}
          />
        </FilterSidebar>
      )}

      <Modal
        isOpen={modals.showAdd}
        onClose={() => handlers.onModalClose?.('add')}
        title={`Add New ${title.replace(' Management', '')}`}
        size="lg"
      >
        <Form
          config={formConfig.add}
          onSubmit={handlers.onSubmit}
          loading={modals.formLoading}
        />
      </Modal>

      <Modal
        isOpen={modals.showEdit}
        onClose={() => handlers.onModalClose?.('edit')}
        title={`Edit ${title.replace(' Management', '')}`}
        size="lg"
      >
        <Form
          config={formConfig.edit}
          onSubmit={handlers.onSubmit}
          initialData={modals.selectedItem}
          loading={modals.formLoading}
        />
      </Modal>

      <Modal
        isOpen={modals.showDelete}
        onClose={() => handlers.onModalClose?.('delete')}
        title="Confirm Delete"
        actions={
          <>
            <Button
              variant="outlined"
              onClick={() => handlers.onModalClose?.('delete')}
              disabled={modals.formLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handlers.onDelete}
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
