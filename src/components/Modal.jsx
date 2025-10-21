import React from "react";
import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  actions,
  showDefaultClose = true,
  footerConfig = null,
  hideFooter = false,
  onFormSubmit,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;

  // 👇 Tailwind max-width based on size prop
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full", // optional if you ever want full width
  };

  // Handle footer configuration internally
  const handleFooterConfig = () => {
    if (!footerConfig) return null;

    return {
      submitButton: footerConfig.submitButton !== false,
      submitText: footerConfig.submitText || "Submit",
      cancelButton: footerConfig.cancelButton !== false,
      cancelText: footerConfig.cancelText || "Cancel",
      onSubmit: onFormSubmit,
      onCancel: onCancel || onClose,
      loading: loading,
    };
  };

  const processedFooterConfig = handleFooterConfig();
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal container */}
        <div
          className={`relative bg-white rounded-lg shadow-xl w-full ${
            sizeClasses[size] || sizeClasses.md
          } 
            max-h-[90vh] flex flex-col dark:bg-gray-800`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>

          {/* Footer */}
          {!hideFooter && (actions || processedFooterConfig || showDefaultClose) && (
            <div className="px-4 py-3 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
              {actions}
              {processedFooterConfig && (
                <>
                  {processedFooterConfig.cancelButton && (
                    <Button
                      onClick={processedFooterConfig.onCancel}
                      disabled={processedFooterConfig.loading}
                      variant="contained"
                      color="default"
                    >
                      {processedFooterConfig.cancelText}
                    </Button>
                  )}

                  {processedFooterConfig.submitButton && (
                    <Button
                      onClick={processedFooterConfig.onSubmit}
                      disabled={processedFooterConfig.loading}
                      variant="contained"
                      color="primary"
                      className="min-w-[100px]"
                    >
                      {processedFooterConfig.loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-2 border-t-white mr-2"></div>
                          {processedFooterConfig.submitText}...
                        </div>
                      ) : (
                        processedFooterConfig.submitText
                      )}
                    </Button>
                  )}
                </>
              )}
              {showDefaultClose && !actions && !processedFooterConfig && (
                <Button onClick={onClose} variant="outlined">
                  Close
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
