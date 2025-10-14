import React, { useState, useMemo } from 'react';
import { MoveHorizontal as MoreHorizontal, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Button from './Button';

const Table = ({ config }) => {
  const {
    data = [],
    columns = [],
    actions = [],
    loading = false,
    search = { enabled: false },
    pagination = { enabled: false, pageSize: 10 },
    emptyMessage = "No data available"
  } = config;

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search.enabled || !searchTerm) return data;
    
    return data.filter(item =>
      columns.some(column => {
        const value = item[column.key];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns, search.enabled]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination.enabled) return filteredData;
    
    const startIndex = (currentPage - 1) * pagination.pageSize;
    return filteredData.slice(startIndex, startIndex + pagination.pageSize);
  }, [filteredData, currentPage, pagination]);

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  const handleActionClick = (action, item, e) => {
    e.stopPropagation();
    setShowActionMenu(null);
    action.onClick(item);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-8 text-center">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-700 border-t-2 border-t-blue-600"></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-full overflow-hidden">
      {/* Search */}
      {search.enabled && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={search.placeholder || "Search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3 text-left"
                >
                  {column.title}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3 text-left">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? (
                        column.render(item[column.key], item)
                      ) : (
                        <span className="text-gray-900 dark:text-white">
                          {item[column.key]}
                        </span>
                      )}
                    </td>
                  ))}
                  
                  {actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowActionMenu(showActionMenu === item.id ? null : item.id);
                        }}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                      
                      {showActionMenu === item.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowActionMenu(null)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-20">
                            {actions.map((action, actionIndex) => (
                              <button
                                key={actionIndex}
                                onClick={(e) => handleActionClick(action, item, e)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 first:rounded-t-md last:rounded-b-md ${
                                  action.variant === 'danger' ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {action.title}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.enabled && filteredData.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {((currentPage - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(currentPage * pagination.pageSize, filteredData.length)} of{' '}
            {filteredData.length} results
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outlined"
              size="sm"
              onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;