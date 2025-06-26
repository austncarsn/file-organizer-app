import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { FileItem } from '../../types/file';
import { useDragDrop } from '../../hooks/useDragDrop';

const DropZone: React.FC = () => {
  const { handleDrop, isOver, canDrop } = useDragDrop();

  const [{ isActive }, drop] = useDrop({
    accept: 'file',
    drop: (item: FileItem) => handleDrop(item),
    collect: (monitor) => ({
      isActive: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const dropZoneClass = `border-2 border-dashed rounded-lg p-4 transition-all ${
    isActive ? 'border-blue-500 bg-blue-100' : canDrop ? 'border-green-500' : 'border-gray-300'
  }`;

  return (
    <div ref={drop} className={dropZoneClass}>
      {isActive ? 'Release to drop' : 'Drag files here'}
    </div>
  );
};

export default DropZone;