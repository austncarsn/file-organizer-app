'use client';

import React from 'react';
import { FileItem } from '../../types/file';

interface FilePreviewProps {
  file: FileItem;
  onClose: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  const renderPreview = () => {
    if (file.type === 'file' && file.mimeType?.startsWith('image/')) {
      return <img src={file.thumbnail} alt={file.name} className="w-full h-auto" />;
    }
    return <div className="text-center">Preview not available for this file type.</div>;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-2">{file.name}</h2>
        <div className="mb-4">{renderPreview()}</div>
        <p className="text-sm text-gray-600">Type: {file.mimeType || 'N/A'}</p>
        <p className="text-sm text-gray-600">Size: {file.size} bytes</p>
        <p className="text-sm text-gray-600">Modified: {file.modified.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default FilePreview;