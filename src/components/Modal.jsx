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
  hideFooter = false
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-gray-500 opacity-75"
          onClick={onClose}
        ></div>

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col dark:bg-gray-800">
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

          <div className="flex-1 overflow-y-auto p-4">{children}</div>

          {!hideFooter && (actions || footerConfig || showDefaultClose) && (
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700 flex-shrink-0 gap-3">
              {actions}
              {footerConfig && (
                <>
                  {footerConfig.submitButton && (
                    <Button
                      onClick={footerConfig.onSubmit}
                      disabled={footerConfig.loading}
                      variant="contained"
                      color={footerConfig.submitColor || "primary"}
                    >
                      {footerConfig.loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-2 border-t-white mr-2"></div>
                          {footerConfig.submitText || 'Submit'}...
                        </div>
                      ) : (
                        footerConfig.submitText || 'Submit'
                      )}
                    </Button>
                  )}
                  {footerConfig.cancelButton && (
                    <Button
                      onClick={footerConfig.onCancel || onClose}
                      disabled={footerConfig.loading}
                      variant={footerConfig.cancelVariant || "outlined"}
                      color={footerConfig.cancelColor || "default"}
                    >
                      {footerConfig.cancelText || 'Cancel'}
                    </Button>
                  )}
                </>
              )}
              {showDefaultClose && !actions && !footerConfig && (
                <Button
                  onClick={onClose}
                  variant="outlined"
                >
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
