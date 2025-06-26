'use client';

import React from 'react';
import useFileSystem from '../../hooks/useFileSystem';
import { useTheme } from '../../hooks/useTheme';
import { FileItem } from '../../types/file';

const Sidebar: React.FC = () => {
  const { files, filters, setFilters } = useFileSystem();
  const { state: themeState } = useTheme();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === '') {
      setFilters({ ...filters, type: [] });
    } else {
      setFilters({ ...filters, type: [value] });
    }
  };

  return (
    <aside className={`w-64 bg-white dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700`}>
      <h2 className="text-lg font-semibold">File Filters</h2>
      <div className="mt-4">
        <label htmlFor="file-type" className="block text-sm font-medium text-gray-700">
          Filter by Type
        </label>
        <select
          id="file-type"
          value={filters.type.length > 0 ? filters.type[0] : ''}
          onChange={handleFilterChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        >
          <option value="">All</option>
          <option value="file">Files</option>
          <option value="folder">Folders</option>
        </select>
      </div>
      <div className="mt-4">
        <h2 className="sr-only">Recent Files</h2>
        <h3 className="text-md font-medium">Recent Files</h3>
        <ul className="mt-2">
          {files.slice(0, 5).map((file: FileItem) => (
            <li key={file.id} className="text-sm text-gray-600">
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;