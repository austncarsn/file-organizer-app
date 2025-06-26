'use client';

import React, { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onCommandPalette: () => void;
  onSelectAll: () => void;
  onDelete: () => void;
  onRename: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onNewFolder: () => void;
  onSearch: () => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onCommandPalette,
  onSelectAll,
  onDelete,
  onRename,
  onCopy,
  onPaste,
  onNewFolder,
  onSearch
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // Prevent default behavior for our shortcuts
      if (ctrlOrCmd || e.key === 'Delete' || e.key === 'F2') {
        switch (e.key.toLowerCase()) {
          case 'k':
            if (ctrlOrCmd) {
              e.preventDefault();
              onCommandPalette();
            }
            break;
          case 'a':
            if (ctrlOrCmd) {
              e.preventDefault();
              onSelectAll();
            }
            break;
          case 'c':
            if (ctrlOrCmd) {
              e.preventDefault();
              onCopy();
            }
            break;
          case 'v':
            if (ctrlOrCmd) {
              e.preventDefault();
              onPaste();
            }
            break;
          case 'f':
            if (ctrlOrCmd) {
              e.preventDefault();
              onSearch();
            }
            break;
          case 'n':
            if (ctrlOrCmd && e.shiftKey) {
              e.preventDefault();
              onNewFolder();
            }
            break;
          case 'delete':
          case 'backspace':
            if (!ctrlOrCmd && e.target === document.body) {
              e.preventDefault();
              onDelete();
            }
            break;
          case 'f2':
            e.preventDefault();
            onRename();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    onCommandPalette,
    onSelectAll,
    onDelete,
    onRename,
    onCopy,
    onPaste,
    onNewFolder,
    onSearch
  ]);

  return null; // This component only handles keyboard events
};

export default KeyboardShortcuts;
