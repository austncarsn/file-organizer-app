'use client';

import React from 'react';
import { FileItem } from '../types/file';
import { formatFileSize } from '../utils/formatUtils';

interface InlinePreviewProps {
  file: FileItem | null;
  position: { x: number; y: number };
}

const InlinePreview: React.FC<InlinePreviewProps> = ({ file, position }) => {
  if (!file) return null;

  const isImage = file.mimeType?.startsWith('image/');
  const isDocument = file.mimeType?.includes('pdf') || file.mimeType?.includes('document');

  return (
    <aside
      className="fixed z-50 w-80 p-4 bg-surface border border-surface-200 rounded-lg shadow-xl animate-scale-in pointer-events-none"
      style={{
        left: Math.min(position.x + 10, window.innerWidth - 320),
        top: Math.min(position.y - 100, window.innerHeight - 200)
      }}
      role="tooltip"
      aria-label={`Preview of ${file.name}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {isImage && file.thumbnail ? (
            <img
              src={file.thumbnail}
              alt={file.name}
              className="w-16 h-16 object-cover rounded border"
            />
          ) : (
            <div className="w-16 h-16 bg-surface-100 rounded border flex items-center justify-center">
              <span className="text-2xl">
                {file.type === 'folder' ? '📁' : '📄'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text-primary truncate">{file.name}</h3>
          <p className="text-sm text-text-secondary mt-1">
            {formatFileSize(file.size)}
          </p>
          <p className="text-xs text-text-tertiary mt-1">
            Modified {new Date(file.modified).toLocaleDateString()}
          </p>
          
          {file.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {file.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {file.tags.length > 3 && (
                <span className="text-xs text-text-tertiary">+{file.tags.length - 3} more</span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {isDocument && (
        <div className="mt-3 p-2 bg-surface-50 rounded text-xs text-text-secondary">
          Preview available on click
        </div>
      )}
    </aside>
  );
};

export default InlinePreview;
