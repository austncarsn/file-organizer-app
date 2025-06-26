import React, { useContext } from 'react';
import { FileSystemContext } from '../../contexts/FileSystemContext';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

const FilterPanel: React.FC = () => {
  const { filters, setFilters } = useContext(FileSystemContext);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, type: event.target.value });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, size: event.target.value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, date: event.target.value });
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const updatedTags = filters.tags.includes(value)
      ? filters.tags.filter(tag => tag !== value)
      : [...filters.tags, value];
    setFilters({ ...filters, tags: updatedTags });
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold">Filters</h2>
      <div className="mt-4">
        <label className="block mb-2">File Type</label>
        <Select value={filters.type} onChange={handleTypeChange}>
          <option value="">All</option>
          <option value="file">Files</option>
          <option value="folder">Folders</option>
        </Select>
      </div>
      <div className="mt-4">
        <label className="block mb-2">File Size</label>
        <Select value={filters.size} onChange={handleSizeChange}>
          <option value="">Any Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </Select>
      </div>
      <div className="mt-4">
        <label className="block mb-2">Date Modified</label>
        <Select value={filters.date} onChange={handleDateChange}>
          <option value="">Any Date</option>
          <option value="last24hours">Last 24 Hours</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </Select>
      </div>
      <div className="mt-4">
        <label className="block mb-2">Tags</label>
        <div className="flex flex-wrap">
          {['work', 'personal', 'important'].map(tag => (
            <div key={tag} className="mr-2">
              <Input
                type="checkbox"
                id={tag}
                checked={filters.tags.includes(tag)}
                onChange={handleTagChange}
              />
              <label htmlFor={tag} className="ml-1">{tag}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;