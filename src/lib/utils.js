// ======= Format Date : Jan 15, 2024 =======

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};


// =========== Local Search function ===========
export const searchLocalData = (data, searchTerm) => {
  if (!searchTerm?.trim()) return data;

  const lowerSearchTerm = searchTerm.toLowerCase();

  const extractValues = (obj) => {
    if (obj == null) return [];
    if (typeof obj === "object") {
      return Object.values(obj).flatMap(extractValues);
    }
    return [String(obj)];
  };

  return data.filter((item) => {
    const allValues = extractValues(item);
    return allValues.some((val) =>
      val.toLowerCase().includes(lowerSearchTerm)
    );
  });
};
