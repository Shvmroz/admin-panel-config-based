import React, { useState, useMemo, useRef, useEffect } from "react";
import { MoreVertical, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Table = ({ config }) => {
  const {
    data = [],
    columns = [],
    actions = [],
    loading = false,
    search = { enabled: false },
    pagination = { enabled: false, pageSize: 10 },
    emptyMessage = "No data available",
  } = config;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({});
  const menuRef = useRef(null);
  const buttonRefs = useRef({});

  const filteredData = useMemo(() => {
    if (!search.enabled || !searchTerm) return data;
    return data.filter((item) =>
      columns.some((col) => {
        const value = item[col.key];
        return (
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [data, searchTerm, columns, search.enabled]);

  const paginatedData = useMemo(() => {
    if (!pagination.enabled) return filteredData;
    const start = (currentPage - 1) * pagination.pageSize;
    return filteredData.slice(start, start + pagination.pageSize);
  }, [filteredData, currentPage, pagination]);

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  const handleActionClick = (action, item, e) => {
    e.stopPropagation();
    setActiveMenu(null);
    action.onClick(item);
  };

  const handleMenuToggle = (itemId, e) => {
    e.stopPropagation();
  
    const button = e.currentTarget;
    buttonRefs.current[itemId] = button;
    const rect = button.getBoundingClientRect();
  
    const menuWidth = 192; // 48 * 4 (w-48 = 192px)
    const menuHeight = actions.length * 40; // Approximate height per item
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    // Calculate available space
    const spaceRight = viewportWidth - rect.right;
    const spaceLeft = rect.left;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
  
    // Determine horizontal position (prefer opening to the left if not enough space on right)
    const openLeft = spaceRight < menuWidth;
    const left = openLeft ? rect.left - menuWidth + rect.width : rect.left;
  
    // Determine vertical position (prefer opening upward if not enough space below)
    const openUp = spaceBelow < menuHeight && spaceAbove > menuHeight;
    const top = openUp ? rect.top - menuHeight - 8 : rect.bottom + 8;
  
    // Ensure menu stays within viewport bounds
    const adjustedLeft = Math.max(8, Math.min(left, viewportWidth - menuWidth - 8));
    const adjustedTop = Math.max(8, Math.min(top, viewportHeight - menuHeight - 8));
  
    setMenuPosition({ 
      top: adjustedTop, 
      left: adjustedLeft 
    });
    setActiveMenu(activeMenu === itemId ? null : itemId);
  };

  // Update menu position on scroll and resize
  useEffect(() => {
    const updatePosition = () => {
      if (activeMenu && buttonRefs.current[activeMenu]) {
        const button = buttonRefs.current[activeMenu];
        const rect = button.getBoundingClientRect();
        
        const menuWidth = 192;
        const menuHeight = actions.length * 40;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const spaceRight = viewportWidth - rect.right;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        const openLeft = spaceRight < menuWidth;
        const left = openLeft ? rect.left - menuWidth + rect.width : rect.left;

        const openUp = spaceBelow < menuHeight && spaceAbove > menuHeight;
        const top = openUp ? rect.top - menuHeight - 8 : rect.bottom + 8;

        const adjustedLeft = Math.max(8, Math.min(left, viewportWidth - menuWidth - 8));
        const adjustedTop = Math.max(8, Math.min(top, viewportHeight - menuHeight - 8));

        setMenuPosition({ 
          top: adjustedTop, 
          left: adjustedLeft 
        });
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [activeMenu, actions.length]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (activeMenu) {
      // Store the current scroll position
      const scrollX = window.pageXOffset;
      const scrollY = window.pageYOffset;
      
      // Add styles to prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = `-${scrollX}px`;
      document.body.style.width = '100%';

      return () => {
        // Restore scrolling and position
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(scrollX, scrollY);
      };
    }
  }, [activeMenu]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (activeMenu) {
      const scrollY = window.scrollY;
  
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "hidden";
  
      const preventScroll = (e) => e.preventDefault();
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
  
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";
  
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
  
        window.scrollTo(0, scrollY);
      };
    }
  }, [activeMenu]);
  

  if (loading)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center">
        <div className="animate-spin h-8 w-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full"></div>
        <p className="text-gray-500 dark:text-gray-400 mt-4">Loading...</p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Search Bar */}
      {search.enabled && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={search.placeholder || "Search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/60">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  {col.title}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-5 text-sm text-gray-900 dark:text-gray-100"
                    >
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="px-6 py-5 text-right">
                      <button
                        ref={el => buttonRefs.current[item.id] = el}
                        onClick={(e) => handleMenuToggle(item.id, e)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition"
                      >
                        <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </button>
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
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {(currentPage - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(currentPage * pagination.pageSize, filteredData.length)}{" "}
            of {filteredData.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-800 dark:text-gray-200">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Portal Menu */}
      {activeMenu &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              zIndex: 9999,
            }}
            className="w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600"
          >
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={(e) =>
                  handleActionClick(
                    action,
                    data.find((d) => d.id === activeMenu),
                    e
                  )
                }
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  action.variant === "danger"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {action.icon && <span className="shrink-0">{action.icon}</span>}
                {action.title}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Table;