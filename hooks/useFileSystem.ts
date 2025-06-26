'use client';

import { useContext, useState } from 'react';
import { FileSystemContext } from '../contexts/FileSystemContext';
import { FileItem, ViewMode, FilterState } from '../types/file';

const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  const [view, setView] = useState<ViewMode>('grid');
  const [sortConfig, setSortConfig] = useState<{ key: keyof FileItem; direction: 'asc' | 'desc' }>({ 
    key: 'name', 
    direction: 'asc' 
  });
  const [filters, setFilters] = useState<FilterState>({
    type: [] as string[],
    size: { min: 0, max: Infinity },
    date: { from: null, to: null },
    tags: [] as string[]
  });
  
  if (!context) {
    throw new Error('useFileSystem must be used within a FileSystemProvider');
  }
  
  const { state, dispatch } = context;

  const addFile = (file: FileItem) => {
    dispatch({ type: 'ADD_FILE', payload: file });
  };

  const deleteFile = (fileId: string) => {
    dispatch({ type: 'DELETE_FILE', payload: fileId });
  };

  const moveFile = (fileId: string, newParentId: string) => {
    dispatch({ type: 'MOVE_FILE', payload: { fileId, newParentId } });
  };

  const renameFile = (fileId: string, newName: string) => {
    dispatch({ type: 'RENAME_FILE', payload: { fileId, newName } });
  };

  const searchFiles = (query: string) => {
    // Simple search implementation - filter files by name
    const filtered = state.files.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  };

  const sortFiles = (key: keyof FileItem, direction: 'asc' | 'desc' = 'asc') => {
    setSortConfig({ key, direction });
  };

  // Sort files based on current sort config
  const sortedFiles = [...state.files].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (!aValue && !bValue) return 0;
    if (!aValue) return sortConfig.direction === 'asc' ? 1 : -1;
    if (!bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return {
    files: sortedFiles,
    loading: state.loading,
    error: state.error,
    view,
    setView,
    viewMode: 'grid' as const, // For backward compatibility
    filters,
    setFilters,
    addFile,
    deleteFile,
    moveFile,
    renameFile,
    searchFiles,
    sortFiles,
  };
};

export default useFileSystem;