'use client';

import React from 'react';
import useFileSystem from '../../hooks/useFileSystem';
import { useSelection } from '../../contexts/SelectionContext';
import FileItem from './FileItem';
import { FileItem as FileItemType } from '../../types/file';

const FileList: React.FC = () => {
  const { files } = useFileSystem();
  const { state, dispatch } = useSelection();

  const handleFileSelect = (id: string) => {
    if (state.selectedFiles.has(id)) {
      dispatch({ type: 'DESELECT', payload: id });
    } else {
      dispatch({ type: 'SELECT', payload: id });
    }
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Modified Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {files.map((file: FileItemType) => (
            <FileItem 
              key={file.id} 
              file={file}
              onSelect={handleFileSelect}
              isSelected={state.selectedFiles.has(file.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;