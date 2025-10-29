import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import Select from "./Select";
import { X } from "lucide-react";

const Form = ({ config, onSubmit, initialData = {}, loading = false }) => {
  const {
    formFields: {
      config: fields = [],
      gridClass = "grid grid-cols-12 gap-4",
    } = {},
  } = config || {};

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleFileChange = (key, files) => {
    const file = files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      [key]: { file, preview },
    }));

    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleRemoveImage = (key) => {
    setFormData((prev) => ({ ...prev, [key]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`;
      }
      if (field.type === "email" && formData[field.key]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.key])) {
          newErrors[field.key] = "Please enter a valid email address";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  const renderField = (field) => {
    const {
      key,
      label,
      type,
      options,
      placeholder,
      rows,
      inputClass,
      search,
      accept,
      
    } = field;
    const value = formData[key] || "";

    const finalPlaceholder =
      placeholder || (type === "select" ? `Select ${label}` : `Enter ${label}`);

    const baseClass =
      "w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white text-black border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600";

    switch (type) {
      case "select":
        return (
          <Select
            options={options || []}
            value={value}
            onChange={(val) => handleChange(key, val)}
            placeholder={finalPlaceholder}
            className={`${inputClass || ""}`}
            disabled={loading}
            search={search}
          />
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={finalPlaceholder}
            rows={rows || 3}
            className={`${baseClass} ${inputClass || ""}`}
            disabled={loading}
          />
        );

      case "file":
      case "image":
        const image = formData[key];

        return (

          <div className="flex flex-col items-center justify-center space-y-2">
            {!image ? (
              <label className="flex flex-col items-center justify-center h-28 w-full border border-dashed border-gray-300 dark:border-gray-500 rounded-md text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 transition">
                <input
                  type="file"
                  accept={accept || "image/*"}
                  className="hidden"
                  onChange={(e) => handleFileChange(key, e.target.files)}
                  disabled={loading}
                />
                <span className="text-center text-xs">
                  Click to upload image
                </span>
              </label>
            ) : (
              <div className="relative w-28 h-28 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                <img
                  src={image.preview || image}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(key)}
                  className="absolute top-0 right-0 bg-red-600/70 hover:bg-red-700/70 text-white text-xs rounded-md w-5 h-5 flex items-center justify-center "
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        );

      default:
        return (
          <Input
            type={type}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={finalPlaceholder}
            className={`${baseClass} ${inputClass || ""}`}
            disabled={loading}
          />
        );
    }
  };

  return (
    <form
      id={config.title?.toLowerCase().includes("edit") ? "editForm" : "addForm"}
      onSubmit={handleSubmit}
      className={gridClass}
    >
      {fields.map((field) => (
        <div key={field.key} className={field.colClass || "col-span-12"}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {field.label}
            {field.required && <span className="ml-1">*</span>}
          </label>
          {renderField(field)}
          {errors[field.key] && (
            <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
          )}
        </div>
      ))}
    </form>
  );
};

export default Form;
