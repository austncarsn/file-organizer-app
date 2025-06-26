'use client';

import React from 'react';
import useFileSystem from '../../hooks/useFileSystem';
import { useSelection } from '../../contexts/SelectionContext';
import Button from '../ui/Button';

interface ToolbarProps {
  onToggleSidebar?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onToggleSidebar }) => {
  const { view, setView, sortFiles } = useFileSystem();
  const { state: selectionState, dispatch: selectionDispatch } = useSelection();

  const clearSelection = () => {
    selectionDispatch({ type: 'CLEAR_SELECTION' });
  };

  const handleViewToggle = (newView: 'grid' | 'list') => {
    setView(newView);
  };

  const handleSort = (sortKey: keyof import('../../types/file').FileItem) => {
    sortFiles(sortKey);
  };

  const handleClearSelection = () => {
    clearSelection();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        {/* Mobile sidebar toggle */}
        {onToggleSidebar && (
          <Button
            onClick={onToggleSidebar}
            variant="outline"
            size="small"
            className="lg:hidden"
            aria-label="Toggle sidebar"
          >
            ☰
          </Button>
        )}
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => handleViewToggle('grid')} 
            variant={view === 'grid' ? 'primary' : 'outline'}
          >
            Grid View
          </Button>
          <Button 
            onClick={() => handleViewToggle('list')} 
            variant={view === 'list' ? 'primary' : 'outline'}
          >
            List View
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button onClick={() => handleSort('name')} variant="outline">
          Sort by Name
        </Button>
        <Button onClick={() => handleSort('modified')} variant="outline">
          Sort by Date
        </Button>
        <Button 
          onClick={handleClearSelection} 
          disabled={selectionState.selectedFiles.size === 0}
          variant="outline"
        >
          Clear Selection ({selectionState.selectedFiles.size})
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;