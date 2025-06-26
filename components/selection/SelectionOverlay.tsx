import React from 'react';
import { useSelection } from '../../hooks/useSelection';

const SelectionOverlay: React.FC = () => {
  const { selectedItems } = useSelection();

  if (selectedItems.size === 0) {
    return null; // No selection, do not render overlay
  }

  return (
    <div className="fixed inset-0 bg-black opacity-30 z-10" aria-hidden="true">
      {/* Overlay for visual cue of selected items */}
    </div>
  );
};

export default SelectionOverlay;