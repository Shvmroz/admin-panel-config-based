import React from "react";
import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  icon,
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

  // Size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full",
  };

  return (
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
        } max-h-[90vh] flex flex-col dark:bg-gray-800`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-1">
            {icon && <span>{icon}</span>}
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          
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
        {!hideFooter && (actions || footerConfig || showDefaultClose) && (
          <div className="px-4 py-3 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
            {actions}

            {footerConfig && (
              <>
                {footerConfig.cancelButton && (
                  <Button
                    onClick={onCancel || onClose}
                    disabled={loading}
                    variant="contained"
                    color="default"
                  >
                    {footerConfig.cancelText || "Cancel"}
                  </Button>
                )}

                {footerConfig.submitButton && (
                  <Button
                    onClick={onFormSubmit}
                    disabled={loading}
                    variant="contained"
                    color={footerConfig.color || "primary"}
                    className="min-w-[100px]"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-2 border-t-white mr-2"></div>
                        {footerConfig.submitText || "Submit"}...
                      </div>
                    ) : (
                      footerConfig.submitText || "Submit"
                    )}
                  </Button>
                )}
              </>
            )}

            {showDefaultClose && !actions && !footerConfig && (
              <Button onClick={onClose} variant="outlined">
                Close
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
