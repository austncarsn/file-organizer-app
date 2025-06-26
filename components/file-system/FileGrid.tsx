'use client';

import React from 'react';
import useFileSystem from '../../hooks/useFileSystem';
import FileCard from './FileCard';
import { FileItem } from '../../types/file';

const FileGrid: React.FC = () => {
  const { files, view } = useFileSystem();

  // Simple grid layout based on view
  const gridCols = view === 'grid' ? 'grid-cols-4' : 'grid-cols-3';

  return (
    <section 
      className={`grid ${gridCols} gap-4 p-4`}
      role="region"
      aria-label="File list"
      aria-live="polite"
    >
      {files.length === 0 ? (
        <div 
          className="col-span-full text-center py-8 text-gray-500"
          role="status"
          aria-label="No files available"
        >
          <p>No files found</p>
        </div>
      ) : (
        files.map((file: FileItem, index: number) => (
          <FileCard 
            key={file.id} 
            file={file} 
            onSelect={() => {}} 
            isSelected={false}
          />
        ))
      )}
    </section>
  );
};

export default FileGrid;