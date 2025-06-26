'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FileItem } from '../types/file';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onCommand: (command: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  files,
  onFileSelect,
  onCommand
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { id: 'new-folder', label: 'New Folder', icon: '📁', action: () => onCommand('new-folder') },
    { id: 'new-file', label: 'New File', icon: '📄', action: () => onCommand('new-file') },
    { id: 'toggle-view', label: 'Toggle View', icon: '⊞', action: () => onCommand('toggle-view') },
    { id: 'toggle-theme', label: 'Toggle Theme', icon: '🌓', action: () => onCommand('toggle-theme') },
    { id: 'search', label: 'Search Files', icon: '🔍', action: () => onCommand('search') }
  ];

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const allItems = [...filteredCommands, ...filteredFiles.map(file => ({
    id: file.id,
    label: file.name,
    icon: file.type === 'folder' ? '📁' : '📄',
    action: () => onFileSelect(file)
  }))];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setQuery('');
    setSelectedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, allItems.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (allItems[selectedIndex]) {
            allItems[selectedIndex].action();
            onClose();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allItems, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="flex items-start justify-center pt-20">
        <div className="w-full max-w-lg bg-surface rounded-lg shadow-2xl animate-scale-in">
          <div className="p-4 border-b border-surface-200">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search for files..."
              className="w-full px-0 py-2 bg-transparent border-0 text-lg placeholder-text-tertiary focus:outline-none"
            />
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {allItems.length === 0 ? (
              <div className="p-4 text-center text-text-secondary">
                No results found
              </div>
            ) : (
              allItems.map((item, index) => (
                <button
                  key={item.id}
                  className={`
                    w-full px-4 py-3 text-left flex items-center gap-3
                    hover:bg-surface-100 focus:bg-surface-100 focus:outline-none
                    ${index === selectedIndex ? 'bg-primary-50 text-primary-700' : 'text-text-primary'}
                  `}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                >
                  <span className="text-lg" aria-hidden="true">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {index === selectedIndex && (
                    <span className="text-xs text-text-tertiary">↵</span>
                  )}
                </button>
              ))
            )}
          </div>
          
          <div className="p-3 border-t border-surface-200 text-xs text-text-tertiary">
            Use <kbd className="px-1 py-0.5 bg-surface-200 rounded">↑↓</kbd> to navigate, 
            <kbd className="px-1 py-0.5 bg-surface-200 rounded">↵</kbd> to select, 
            <kbd className="px-1 py-0.5 bg-surface-200 rounded">Esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
