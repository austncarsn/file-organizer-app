import React from 'react';
import { useSelection } from '../../hooks/useSelection';

const SelectionIndicator: React.FC = () => {
  const { selectedFilesCount } = useSelection();

  return (
    <div className={`fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-lg shadow-lg transition-opacity duration-300 ${selectedFilesCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
      {selectedFilesCount > 0 ? `${selectedFilesCount} file(s) selected` : 'No files selected'}
    </div>
  );
};

export default SelectionIndicator;