import React, { useState, useEffect } from 'react';
import { Input } from './Input';
import Button from './Button';

const Form = ({ config, onSubmit, initialData = {}, loading = false, hideButtons = false }) => {
  const { input_fields = [], fields = input_fields, submitButtonText = 'Submit', submitText = submitButtonText } = config;
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach(field => {
      if (field.required && !formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && formData[field.key]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.key])) {
          newErrors[field.key] = 'Please enter a valid email address';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Expose form submission method for external use
  React.useImperativeHandle(config.ref, () => ({
    submit: handleSubmit,
    isValid: () => validateForm(),
    getData: () => formData
  }), [formData]);

  const renderField = (field) => {
    const { key, label, type, required, options, placeholder, rows } = field;
    const value = formData[key] || '';
    const error = errors[key];

    switch (type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full h-10 px-3 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white text-black border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="">Select {label}</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder}
            rows={rows || 3}
            className="w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white text-black border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        );

      default:
        return (
          <Input
            type={type}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <form onSubmit={hideButtons ? undefined : handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
          {errors[field.key] && (
            <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
          )}
        </div>
      ))}

      {!hideButtons && (
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            color="primary"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-2 border-t-white mr-2"></div>
                {submitText}...
              </div>
            ) : (
              submitText
            )}
          </Button>
        </div>
      )}
    </form>
  );
};

export default Form;