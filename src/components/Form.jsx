import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import Select from "./Select"; // ✅ import your custom Select

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
    } = field;
    const value = formData[key] || "";
  
    // ✅ If placeholder provided in config, use it; otherwise, use fallback
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
            {field.required && <span className=" ml-1">*</span>}
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
