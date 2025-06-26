'use client';

import React from 'react';
import { FileItem as FileItemType } from '../../types/file';
import FileIcon from './FileIcon';
import { formatFileSize, timeAgo } from '../../utils/formatUtils';

interface FileItemProps {
  file: FileItemType;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const FileItem: React.FC<FileItemProps> = ({ file, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(file.id);
  };

  return (
    <div
      className={`flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
        isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'
      }`}
      onClick={handleClick}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="flex-shrink-0">
        <FileIcon file={file} />
      </div>
      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center">
          <span className="font-medium text-gray-900 truncate">{file.name}</span>
          {file.starred && <span className="ml-1 text-yellow-500">⭐</span>}
        </div>
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <span>{formatFileSize(file.size)}</span>
          <span>•</span>
          <span>{timeAgo(file.modified)}</span>
        </div>
      </div>
    </div>
  );
};

export default FileItem;