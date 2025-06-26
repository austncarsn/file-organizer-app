'use client';

import React, { useState, useId } from 'react';
import useFileSystem from '../../hooks/useFileSystem';
import Input from '../ui/Input';

const SearchBar: React.FC = () => {
  const { searchFiles } = useFileSystem();
  const [query, setQuery] = useState('');
  const uid = useId();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    searchFiles(value);
  };

  return (
    <div className="flex items-center">
      <Input
        id={`search-${uid}`}
        type="text"
        placeholder="Search files..."
        value={query}
        onChange={handleSearchChange}
        className="flex-1"
        aria-label="Search files"
      />
    </div>
  );
};

export default SearchBar;