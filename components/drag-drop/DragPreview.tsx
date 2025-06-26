import React from 'react';
import { FileItem } from '../../types/file';

interface DragPreviewProps {
  items: FileItem[];
}

const DragPreview: React.FC<DragPreviewProps> = ({ items }) => {
  return (
    <div className="flex items-center p-2 bg-gray-200 border border-gray-300 rounded shadow-lg">
      {items.map((item) => (
        <div key={item.id} className="flex items-center mr-2">
          <img
            src={item.thumbnail || '/placeholder.png'}
            alt={item.name}
            className="w-10 h-10 object-cover rounded"
          />
          <span className="ml-2 text-sm font-medium">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default DragPreview;