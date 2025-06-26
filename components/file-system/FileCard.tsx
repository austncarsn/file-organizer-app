'use client';

import React, { useState } from 'react';
import { FileItem } from '../../types/file';
import FileIcon from './FileIcon';
import { formatFileSize } from '../../utils/formatUtils';

interface FileCardProps {
  file: FileItem;
  onSelect: (id: string) => void;
  onPreview?: (file: FileItem) => void;
  onContextMenu?: (file: FileItem, event: React.MouseEvent) => void;
  isSelected: boolean;
  isDragOver?: boolean;
}

const FileCard: React.FC<FileCardProps> = ({ 
  file, 
  onSelect, 
  onPreview, 
  onContextMenu, 
  isSelected,
  isDragOver = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onSelect(file.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    onContextMenu?.(file, event);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onPreview?.(file);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article
      className={`
        group relative flex flex-col items-center p-4 border rounded-lg 
        transition-all duration-200 cursor-pointer animate-fade-in
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
        ${isSelected 
          ? 'bg-primary-50 border-primary-300 shadow-md dark:bg-primary-900/20 dark:border-primary-600' 
          : 'bg-surface border-surface-200 hover:bg-surface-50 dark:bg-surface-800 dark:border-surface-700 dark:hover:bg-surface-700'
        }
        ${isDragOver ? 'ring-2 ring-primary-400 bg-primary-50' : ''}
        ${isHovered ? 'shadow-lg' : ''}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onContextMenu={handleContextMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${file.type === 'folder' ? 'Folder' : 'File'}: ${file.name}${file.starred ? ' (starred)' : ''}`}
      aria-describedby={`file-details-${file.id}`}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-1 rounded-full bg-surface/80 hover:bg-surface text-text-secondary hover:text-text-primary"
          onClick={(e) => {
            e.stopPropagation();
            // Quick action menu trigger
          }}
          aria-label="More actions"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <FileIcon file={file} />
      
      <div className="mt-2 text-center w-full">
        <h2 className="sr-only">File name</h2>
        <h3 className="text-sm font-medium text-text-primary dark:text-text-inverse truncate group-hover:text-primary-600">
          {file.name}
        </h3>
        
        <div id={`file-details-${file.id}`} className="mt-1 text-xs text-text-secondary dark:text-text-tertiary">
          <span className="sr-only">File size: </span>
          {formatFileSize(file.size)}
          {file.modified && (
            <>
              <span className="sr-only">, Modified: </span>
              <span className="block">{new Date(file.modified).toLocaleDateString()}</span>
            </>
          )}
        </div>
        
        {file.starred && (
          <div className="mt-1 animate-pulse-subtle" aria-label="Starred file">
            <span className="text-accent-500 text-sm" aria-hidden="true">⭐</span>
            <span className="sr-only">This file is starred</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default FileCard;