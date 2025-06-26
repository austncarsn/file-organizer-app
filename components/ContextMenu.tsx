'use client';

import React, { useEffect, useRef } from 'react';
import { FileItem } from '../types/file';

interface ContextMenuProps {
  file: FileItem | null;
  position: { x: number; y: number };
  onClose: () => void;
  onRename: (file: FileItem) => void;
  onMove: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onDuplicate: (file: FileItem) => void;
  onProperties: (file: FileItem) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  file,
  position,
  onClose,
  onRename,
  onMove,
  onDelete,
  onDuplicate,
  onProperties
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!file) return null;

  const menuItems = [
    { label: 'Rename', action: () => onRename(file), icon: '✏️' },
    { label: 'Move', action: () => onMove(file), icon: '📁' },
    { label: 'Duplicate', action: () => onDuplicate(file), icon: '📋' },
    { label: 'Delete', action: () => onDelete(file), icon: '🗑️', destructive: true },
    { label: 'Properties', action: () => onProperties(file), icon: 'ℹ️' }
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-48 py-2 bg-surface border border-surface-200 rounded-lg shadow-xl animate-scale-in"
      style={{
        left: Math.min(position.x, window.innerWidth - 192),
        top: Math.min(position.y, window.innerHeight - (menuItems.length * 40 + 16))
      }}
      role="menu"
      aria-label={`Actions for ${file.name}`}
    >
      {menuItems.map((item, index) => (
        <button
          key={item.label}
          className={`
            w-full px-4 py-2 text-left text-sm flex items-center gap-3
            hover:bg-surface-100 focus:bg-surface-100 focus:outline-none
            ${item.destructive ? 'text-red-600 hover:text-red-700' : 'text-text-primary'}
          `}
          onClick={() => {
            item.action();
            onClose();
          }}
          role="menuitem"
          tabIndex={0}
        >
          <span className="text-base" aria-hidden="true">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
