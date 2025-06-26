import React from 'react';
import FileCard from './FileCard';
import { FileItem } from '../types/file';

interface FileGridProps {
  files: FileItem[];
}

const FileGrid: React.FC<FileGridProps> = ({ files }) => {
  // Provide no-op handlers and selection state for compatibility with file-system/FileCard
  const handleSelect = () => {};
  const isSelected = false;
  return (
    <div className="grid">
      {files.map((file) => (
        <FileCard key={file.id} file={file} onSelect={handleSelect} isSelected={isSelected} />
      ))}
    </div>
  );
};

export default FileGrid;
