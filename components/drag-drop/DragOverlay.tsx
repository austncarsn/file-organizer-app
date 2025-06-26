import React from 'react';
import { useDragDrop } from '../../hooks/useDragDrop';

const DragOverlay: React.FC = () => {
  const { isDragging, dragPosition } = useDragDrop();

  if (!isDragging) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 pointer-events-none"
      style={{
        top: dragPosition.y,
        left: dragPosition.x,
        width: '100%',
        height: '100%',
      }}
    >
      <div className="absolute bg-white rounded-lg shadow-lg p-4">
        <p className="text-center text-gray-700">Drop your files here</p>
      </div>
    </div>
  );
};

export default DragOverlay;