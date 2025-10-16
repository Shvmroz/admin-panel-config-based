import React, { useState } from 'react';
import Button from '../Button';
import { Input } from '../Input';

const FilterContent = ({ config, onApply, onClose }) => {
  const [filters, setFilters] = useState({});

  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
    onApply({});
    onClose();
  };

  return (
    <div className="space-y-4">
      {config.fields?.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              value={filters[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              type={field.type}
              value={filters[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}

      <div className="flex gap-2 pt-4">
        <Button
          onClick={handleApply}
          variant="contained"
          color="primary"
          className="flex-1"
        >
          Apply Filters
        </Button>
        <Button
          onClick={handleReset}
          variant="outlined"
          className="flex-1"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterContent;
