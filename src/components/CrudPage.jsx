import React, { useState } from "react";
import { Plus, Filter, AlertTriangle } from "lucide-react";
import Table from "./Table";
import Modal from "./Modal";
import Form from "./Form";
import Button from "./Button";
import FilterDrawer from "./Filter/FilterDrawer";
import { Icon } from "@iconify/react";

const CrudPage = ({ config }) => {
  const {
    title,
    data = [],
    loading = false,
    formLoading = false,
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
  const [showView, setShowView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuAction = (action, item) => {
    if (action === "edit") {
      setSelectedItem(item);
      setShowEdit(true);
    } else if (action === "view") {
      if (modalConfig.viewModal?.showModal) {
        setSelectedItem(item);
        setShowView(true);
      } else {
        onView?.(item);
      }
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-400 mt-2">
            {config?.description}
          </p>
        </div>
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
            {config.buttonText || "Add New"}
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
        icon={modalConfig.addModal?.icon}
        title={
          modalConfig.addModal?.title ||
          `Add ${title.replace(" Management", "")}`
        }
        size={modalConfig.addModal?.size || "md"}
        footerConfig={modalConfig.addModal?.footer}
        onFormSubmit={() => document.querySelector("#addForm")?.requestSubmit()}
        onCancel={() => setShowAdd(false)}
        loading={formLoading}
      >
        <Form
          config={{
            fields:
              modalConfig.addModal?.formFields?.config ||
              formConfig.add?.fields ||
              [],
            id: "addForm",
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
        icon={modalConfig.editModal?.icon}
        title={
          modalConfig.editModal?.title ||
          `Edit ${title.replace(" Management", "")}`
        }
        size={modalConfig.editModal?.size || "md"}
        footerConfig={modalConfig.editModal?.footer}
        onFormSubmit={() =>
          document.querySelector("#editForm")?.requestSubmit()
        }
        onCancel={() => setShowEdit(false)}
        loading={formLoading}
      >
        <Form
          config={{
            fields:
              modalConfig.editModal?.formFields?.config ||
              formConfig.edit?.fields ||
              [],
            id: "editForm",
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
        icon={modalConfig.deleteModal?.icon}
        title={modalConfig.deleteModal?.title || "Confirm Delete"}
        size={modalConfig.deleteModal?.size || "md"}
        footerConfig={modalConfig.deleteModal?.footer}
        onFormSubmit={handleDeleteConfirm}
        onCancel={() => setShowDelete(false)}
        loading={formLoading}
      >
        <div className="flex items-center space-x-2 py-3">
          <div>
            <p className="text-md text-gray-700 dark:text-white">
              {modalConfig.deleteModal?.confirmText ||
                "Are you sure you want to delete this item?"}
            </p>
          </div>
        </div>
      </Modal>

      {/* View Detail Modal */}
      {modalConfig.viewModal?.showModal && (
        <Modal
          isOpen={showView}
          onClose={() => {
            setShowView(false);
            setSelectedItem(null);
          }}
          icon={modalConfig.viewModal?.icon}
          title={modalConfig.viewModal?.title || "View Details"}
          size={modalConfig.viewModal?.size || "lg"}
          hideFooter={modalConfig.viewModal?.hideFooter ?? false}
          showDefaultClose={!modalConfig.viewModal?.hideFooter}
        >
          {modalConfig.viewModal?.component && (
            <modalConfig.viewModal.component data={selectedItem} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default CrudPage;
