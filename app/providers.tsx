import React from 'react';
import { FileSystemProvider } from '../contexts/FileSystemContext';
import { SelectionProvider } from '../contexts/SelectionContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { OperationProvider } from '../contexts/OperationContext';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <FileSystemProvider>
      <SelectionProvider>
        <ThemeProvider>
          <OperationProvider>
            {children}
          </OperationProvider>
        </ThemeProvider>
      </SelectionProvider>
    </FileSystemProvider>
  );
};

export default Providers;