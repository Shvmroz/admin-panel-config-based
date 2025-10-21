export const searchData = (data, searchTerm, searchableColumns) => {
    if (!searchTerm?.trim()) return data;
  
    const lowerSearchTerm = searchTerm.toLowerCase();
  
    return data.filter((item) => {
      return searchableColumns.some((columnKey) => {
        const value = item[columnKey];
        if (value == null) return false;
        return value.toString().toLowerCase().includes(lowerSearchTerm);
      });
    });
  };
  
  export const searchDataAPI = async (searchTerm, apiEndpoint, params = {}) => {
    try {
      const queryParams = new URLSearchParams({
        search: searchTerm,
        ...params
      });
  
      const response = await fetch(`${apiEndpoint}?${queryParams}`);
      if (!response.ok) throw new Error('Search failed');
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API search error:', error);
      throw error;
    }
  };
  