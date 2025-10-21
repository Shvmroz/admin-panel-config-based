import React, { useState } from "react";
import { Plus, Filter } from "lucide-react";
import Table from "./Table";
import Modal from "./Modal";
import Form from "./Form";
import Button from "./Button";
import FilterDrawer from "./Filter/FilterDrawer";

const CrudPage = ({ config, formLoading }) => {
  const {
    title,
    data = [],
    loading = false,
    tableConfig = {},
    formConfig = {},
    filterConfig = null,
    onDelete,
    onView,
    onSubmit,
    onFilterApply,
  } = config;

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuAction = (action, item) => {
    if (action === "edit") {
      setSelectedItem(item);
      setShowEdit(true);
    } else if (action === "view") {
      onView?.(item);
    } else if (action === "delete") {
      setSelectedItem(item);
      setShowDelete(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      await onSubmit?.(formData, selectedItem);
      setShowAdd(false);
      setShowEdit(false);
    } finally {
      setSelectedItem(null);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDelete?.(selectedItem);
      setShowDelete(false);
    } finally {
      setSelectedItem(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <div className="flex items-center space-x-3">
          {filterConfig && (
            <Button onClick={() => setShowFilters(true)} variant="contained">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          )}
          <Button
            onClick={() => setShowAdd(true)}
            variant="contained"
            color="primary"
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
          onMenuAction: handleMenuAction,
        }}
      />

      {/* Filter Drawer */}
      {filterConfig && (
        <FilterDrawer
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
        title={`Add ${title.replace(" Management", "")}`}
        size={formConfig.add?.size}
        footerConfig={{
          submitButton: modalConfig.addModal.footer.submitButton,
          cancelButton: true,
          onSubmit: () => document.querySelector("#addForm")?.requestSubmit(),
          onCancel: () => setShowAdd(false),
          loading: formLoading,
        }}
      >
        <Form
          config={{ ...formConfig.add, id: "addForm" }}
          onSubmit={handleFormSubmit}
          initialData={{}}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        title={`Edit ${title.replace(" Management", "")}`}
        size={formConfig.edit?.size}
        footerConfig={{
          submitButton: true,
          cancelButton: true,
          onSubmit: () => document.querySelector("#editForm")?.requestSubmit(),
          onCancel: () => setShowEdit(false),
          loading: formLoading,
          submitText: "Save Changes",
          cancelText: "Cancel",
        }}
      >
        <Form
          config={{ ...formConfig.edit, id: "editForm" }}
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
        size="sm"
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Are you sure you want to delete this item?
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            "{selectedItem?.name || selectedItem?.email}" will be permanently
            removed.
          </p>
          <div className="flex justify-end space-x-3">
            <Button onClick={() => setShowDelete(false)} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={formLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {formLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CrudPage;
