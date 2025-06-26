import React, { useContext } from 'react';
import { SelectionContext } from '../../contexts/SelectionContext';
import Button from '../ui/Button';

const SelectionToolbar: React.FC = () => {
  const { selectedFiles, clearSelection, performBatchOperation } = useContext(SelectionContext);

  const handleDelete = () => {
    performBatchOperation('delete', selectedFiles);
  };

  const handleMove = () => {
    performBatchOperation('move', selectedFiles);
  };

  const handleCopy = () => {
    performBatchOperation('copy', selectedFiles);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-t border-gray-300">
      <span className="text-sm text-gray-700">
        {selectedFiles.length} item{selectedFiles.length !== 1 ? 's' : ''} selected
      </span>
      <div className="flex space-x-2">
        <Button onClick={handleCopy} disabled={selectedFiles.length === 0}>
          Copy
        </Button>
        <Button onClick={handleMove} disabled={selectedFiles.length === 0}>
          Move
        </Button>
        <Button onClick={handleDelete} disabled={selectedFiles.length === 0}>
          Delete
        </Button>
        <Button onClick={clearSelection}>
          Clear Selection
        </Button>
      </div>
    </div>
  );
};

export default SelectionToolbar;