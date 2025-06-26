import React from 'react';
import { FileItem } from '../../types/file';
import FileItemComponent from '../file-system/FileItem';

interface SearchResultsProps {
  results: FileItem[];
  onSelect: (id: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return <div className="text-center text-gray-500">No results found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((file) => (
        <FileItemComponent key={file.id} file={file} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default SearchResults;