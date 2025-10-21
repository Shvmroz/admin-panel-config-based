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
    modalConfig = {},
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
        title={modalConfig.addModal?.title || `Add ${title.replace(" Management", "")}`}
        size={modalConfig.addModal?.size || "md"}
        footerConfig={{
          submitButton: modalConfig.addModal?.footer?.submitButton !== false,
          submitText: modalConfig.addModal?.footer?.submitText || "Submit",
          cancelButton: modalConfig.addModal?.footer?.cancelButton !== false,
          cancelText: modalConfig.addModal?.footer?.cancelText || "Cancel",
          onSubmit: () => document.querySelector("#addForm")?.requestSubmit(),
          onCancel: () => setShowAdd(false),
          loading: formLoading,
        }}
      >
        <Form
          config={{ 
            fields: modalConfig.addModal?.formFields?.config || formConfig.add?.fields || [],
            id: "addForm" 
          }}
          onSubmit={handleFormSubmit}
          initialData={{}}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        title={modalConfig.editModal?.title || `Edit ${title.replace(" Management", "")}`}
        size={modalConfig.editModal?.size || "md"}
        footerConfig={{
          submitButton: modalConfig.editModal?.footer?.submitButton !== false,
          submitText: modalConfig.editModal?.footer?.submitText || "Update",
          cancelButton: modalConfig.editModal?.footer?.cancelButton !== false,
          cancelText: modalConfig.editModal?.footer?.cancelText || "Cancel",
          onSubmit: () => document.querySelector("#editForm")?.requestSubmit(),
          onCancel: () => setShowEdit(false),
          loading: formLoading,
        }}
      >
        <Form
          config={{ 
            fields: modalConfig.editModal?.formFields?.config || formConfig.edit?.fields || [],
            id: "editForm" 
          }}
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
