import { useEffect } from 'react';

interface KeyboardShortcutHandlers {
  onSelectAll: () => void;
  onDelete: () => void;
  onRename: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onCommandPalette?: () => void;
}

const useKeyboardShortcuts = ({
  onSelectAll,
  onDelete,
  onRename,
  onCopy,
  onPaste,
  onCommandPalette
}: KeyboardShortcutHandlers) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

      switch (event.key) {
        case 'a':
          if (ctrlOrCmd) {
            event.preventDefault();
            onSelectAll();
          }
          break;
        case 'k':
          if (ctrlOrCmd && onCommandPalette) {
            event.preventDefault();
            onCommandPalette();
          }
          break;
        case 'c':
          if (ctrlOrCmd && onCopy) {
            event.preventDefault();
            onCopy();
          }
          break;
        case 'v':
          if (ctrlOrCmd && onPaste) {
            event.preventDefault();
            onPaste();
          }
          break;
        case 'Delete':
          event.preventDefault();
          onDelete();
          break;
        case 'F2':
          event.preventDefault();
          onRename();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSelectAll, onDelete, onRename, onCopy, onPaste, onCommandPalette]);
};

export default useKeyboardShortcuts;