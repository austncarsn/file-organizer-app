import { useEffect } from 'react';

export const useKeyboardShortcuts = (handlers: { [key: string]: () => void }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (handlers[key]) {
        event.preventDefault();
        handlers[key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]);
};

export const isModifierKey = (event: KeyboardEvent) => {
  return event.ctrlKey || event.metaKey || event.altKey || event.shiftKey;
};

export const getKeyCombination = (event: KeyboardEvent) => {
  const keys = [];
  if (event.ctrlKey || event.metaKey) keys.push('Ctrl');
  if (event.shiftKey) keys.push('Shift');
  if (event.altKey) keys.push('Alt');
  keys.push(event.key);
  return keys.join('+');
};