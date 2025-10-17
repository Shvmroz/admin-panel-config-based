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
  const addFormRef = React.useRef(null);
  const editFormRef = React.useRef(null);

  const handleFilterToggle = () => {
    setShowFilterSidebar(prev => !prev);
  };

  const handleMenuAction = (type, item) => {
    const actionHandlers = tableConfig.handlers || {};
    switch (type) {
      case 'edit':
        actionHandlers.onEdit?.(item);
        break;
      case 'view':
        actionHandlers.onView?.(item);
        break;
      case 'delete':
        actionHandlers.onDelete?.(item);
        break;
      default:
        break;
    }
  };

  const handleAddFormSubmit = () => {
    if (addFormRef.current) {
      const formData = addFormRef.current.getData();
      if (addFormRef.current.isValid()) {
        formConfig.handlers?.onSubmit?.(formData);
      }
    }
  };

  const handleEditFormSubmit = () => {
    if (editFormRef.current) {
      const formData = editFormRef.current.getData();
      if (editFormRef.current.isValid()) {
        formConfig.handlers?.onSubmit?.(formData);
      }
    }
  };

  const handleFormSubmit = (type) => {
    const formRef = type === 'add' ? addFormRef : editFormRef;
    if (formRef.current) {
      formRef.current.submit();
    }
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

      <Table config={{
        ...tableConfig,
        data,
        loading,
        menu_actions: tableConfig.menu_actions?.map(action => ({
          ...action,
          onClick: (item) => handleMenuAction(action.type, item)
        }))
      }} />

      {filterConfig && FilterComponent && (
        <FilterSidebar
          isOpen={showFilterSidebar}
          onClose={handleFilterToggle}
        >
          <FilterComponent
            config={filterConfig}
            onApply={filterConfig.handlers?.onApply}
          />
        </FilterSidebar>
      )}

      <Modal
        isOpen={modals.showAdd}
        onClose={() => formConfig.handlers?.onModalClose?.('add')}
        title={`Add New ${title.replace(' Management', '')}`}
        size="lg"
        footerConfig={{
          submitButton: true,
          cancelButton: true,
          submitText: formConfig.add?.submitButtonText || 'Create',
          cancelText: 'Cancel',
          loading: modals.formLoading,
          onSubmit: handleAddFormSubmit,
          onCancel: () => formConfig.handlers?.onModalClose?.('add')
        }}
        showDefaultClose={false}
      >
        <Form
          config={{
            ...formConfig.add,
            ref: addFormRef
          }}
          onSubmit={() => {}} // Empty function since we handle externally
          hideButtons={true}
        />
      </Modal>

      <Modal
        isOpen={modals.showEdit}
        onClose={() => formConfig.handlers?.onModalClose?.('edit')}
        title={`Edit ${title.replace(' Management', '')}`}
        size="lg"
        footerConfig={{
          submitButton: true,
          cancelButton: true,
          submitText: formConfig.edit?.submitButtonText || 'Update',
          cancelText: 'Cancel',
          loading: modals.formLoading,
          onSubmit: handleEditFormSubmit,
          onCancel: () => formConfig.handlers?.onModalClose?.('edit')
        }}
        showDefaultClose={false}
      >
        <Form
          config={{
            ...formConfig.edit,
            ref: editFormRef
          }}
          onSubmit={() => {}} // Empty function since we handle externally
          initialData={modals.selectedItem}
          hideButtons={true}
        />
      </Modal>

      <Modal
        isOpen={modals.showDelete}
        onClose={() => formConfig.handlers?.onModalClose?.('delete')}
        title="Confirm Delete"
        footerConfig={{
          submitButton: true,
          cancelButton: true,
          submitText: 'Delete',
          submitColor: 'error',
          cancelText: 'Cancel',
          loading: modals.formLoading,
          onSubmit: handlers.onDelete,
          onCancel: () => formConfig.handlers?.onModalClose?.('delete')
        }}
        showDefaultClose={false}
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
