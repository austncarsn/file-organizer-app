'use client';

import React, { useState, useMemo } from 'react';
import { FileItem } from '../types/file';
import VirtualizedFileGrid from './VirtualizedFileGrid';
import InlinePreview from './InlinePreview';
import ContextMenu from './ContextMenu';
import CommandPalette from './CommandPalette';
import KeyboardShortcuts from './KeyboardShortcuts';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

interface EnhancedFileManagerProps {
  files: FileItem[];
  containerWidth?: number;
  containerHeight?: number;
}

const EnhancedFileManager: React.FC<EnhancedFileManagerProps> = ({
  files,
  containerWidth = 800,
  containerHeight = 600
}) => {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState<{
    file: FileItem;
    position: { x: number; y: number };
  } | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Handle file selection
  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(fileId)) {
        newSelection.delete(fileId);
      } else {
        newSelection.add(fileId);
      }
      return newSelection;
    });
  };

  // Handle file preview
  const handleFilePreview = (file: FileItem) => {
    setPreviewFile(file);
    // Get mouse position for preview positioning
    const handleMouseMove = (e: MouseEvent) => {
      setPreviewPosition({ x: e.clientX, y: e.clientY });
      document.removeEventListener('mousemove', handleMouseMove);
    };
    document.addEventListener('mousemove', handleMouseMove);
  };

  // Handle context menu
  const handleContextMenu = (file: FileItem, event: React.MouseEvent) => {
    setContextMenu({
      file,
      position: { x: event.clientX, y: event.clientY }
    });
  };

  // Keyboard shortcut handlers
  const keyboardHandlers = useMemo(() => ({
    onSelectAll: () => {
      setSelectedFiles(new Set(files.map(f => f.id)));
    },
    onDelete: () => {
      if (selectedFiles.size > 0) {
        console.log('Delete files:', Array.from(selectedFiles));
        // Implement delete logic
      }
    },
    onRename: () => {
      if (selectedFiles.size === 1) {
        const fileId = Array.from(selectedFiles)[0];
        console.log('Rename file:', fileId);
        // Implement rename logic
      }
    },
    onCopy: () => {
      if (selectedFiles.size > 0) {
        console.log('Copy files:', Array.from(selectedFiles));
        // Implement copy logic
      }
    },
    onPaste: () => {
      console.log('Paste files');
      // Implement paste logic
    },
    onCommandPalette: () => {
      setCommandPaletteOpen(true);
    },
    onNewFolder: () => {
      console.log('Create new folder');
      // Implement new folder logic
    },
    onSearch: () => {
      console.log('Focus search');
      // Implement search focus logic
    }
  }), [files, selectedFiles]);

  // Command palette handlers
  const handleCommand = (command: string) => {
    switch (command) {
      case 'new-folder':
        keyboardHandlers.onNewFolder();
        break;
      case 'new-file':
        console.log('Create new file');
        break;
      case 'toggle-view':
        console.log('Toggle view mode');
        break;
      case 'toggle-theme':
        console.log('Toggle theme');
        break;
      case 'search':
        keyboardHandlers.onSearch();
        break;
    }
  };

  // Context menu handlers
  const contextMenuHandlers = {
    onRename: (file: FileItem) => {
      console.log('Rename:', file.name);
      setContextMenu(null);
    },
    onMove: (file: FileItem) => {
      console.log('Move:', file.name);
      setContextMenu(null);
    },
    onDelete: (file: FileItem) => {
      console.log('Delete:', file.name);
      setContextMenu(null);
    },
    onDuplicate: (file: FileItem) => {
      console.log('Duplicate:', file.name);
      setContextMenu(null);
    },
    onProperties: (file: FileItem) => {
      console.log('Properties:', file.name);
      setContextMenu(null);
    }
  };

  return (
    <div className="relative w-full h-full bg-surface">
      {/* Keyboard Shortcuts Handler */}
      <KeyboardShortcuts {...keyboardHandlers} />
      
      {/* Enhanced keyboard shortcuts hook */}
      {/*
      <div style={{ display: 'none' }}>
        {useKeyboardShortcuts(keyboardHandlers)}
      </div>
      */}

      {/* Main File Grid */}
      <VirtualizedFileGrid
        files={files}
        onFileSelect={handleFileSelect}
        selectedFiles={selectedFiles}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        onPreview={handleFilePreview}
        onContextMenu={handleContextMenu}
      />

      {/* Inline Preview */}
      <InlinePreview
        file={previewFile}
        position={previewPosition}
      />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          file={contextMenu.file}
          position={contextMenu.position}
          onClose={() => setContextMenu(null)}
          {...contextMenuHandlers}
        />
      )}

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        files={files}
        onFileSelect={(file) => {
          handleFileSelect(file.id);
          setCommandPaletteOpen(false);
        }}
        onCommand={handleCommand}
      />

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-surface-100 border-t border-surface-200 px-4 py-2 text-sm text-text-secondary">
        <div className="flex items-center justify-between">
          <span>{files.length} items</span>
          {selectedFiles.size > 0 && (
            <span className="text-primary-600 font-medium">
              {selectedFiles.size} selected
            </span>
          )}
          <span className="text-xs">
            Press <kbd className="px-1 py-0.5 bg-surface-200 rounded text-xs">⌘K</kbd> for commands
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFileManager;
