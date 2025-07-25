import React, { useState } from 'react';
import './SearchFilter.css';

interface FilterValues {
  search: string;
  date: string;
  category: string;
  source: string;
}

interface Props {
  onFilterChange: (filters: FilterValues) => void;
  availableCategories: string[];
  availableSources: string[];
}

const SearchFilter: React.FC<Props> = ({ onFilterChange, availableCategories, availableSources }) => {
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    date: '',
    category: '',
    source: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        name="search"
        placeholder="Search articles..."
        value={filters.search}
        onChange={handleChange}
        className="filter-input"
      />

      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="filter-input"
      />

      <select name="category" value={filters.category} onChange={handleChange} className="filter-select">
        <option value="">All Categories</option>
        {availableCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select name="source" value={filters.source} onChange={handleChange} className="filter-select">
        <option value="">All Sources</option>
        {availableSources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
