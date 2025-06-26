'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FileItem } from '../types/file';

interface SelectionContextType {
  selection: Set<string>;
  setSelection: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

interface SelectionProviderProps {
  children: ReactNode;
}

const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selection, setSelection] = useState(new Set<string>());

  return (
    <SelectionContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectionContext.Provider>
  );
};

const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  const { selection, setSelection } = context;

  const toggleSelection = (file: FileItem) => {
    setSelection((prevSelection) => {
      const newSelection = new Set(prevSelection);
      if (newSelection.has(file.id)) {
        newSelection.delete(file.id);
      } else {
        newSelection.add(file.id);
      }
      return newSelection;
    });
  };

  const selectAll = (files: FileItem[]) => {
    setSelection(new Set(files.map(file => file.id)));
  };

  const clearSelection = () => {
    setSelection(new Set());
  };

  const isSelected = (file: FileItem) => {
    return selection.has(file.id);
  };

  return {
    selection,
    toggleSelection,
    selectAll,
    clearSelection,
    isSelected,
  };
};

export { SelectionContext, SelectionProvider, useSelection };