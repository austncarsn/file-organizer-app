// Hook for accessibility features and utilities
import { useEffect, useRef, useCallback } from 'react';
import { announceToScreenReader, trapFocus } from '../utils/accessibilityUtils';

export const useAccessibility = () => {
  // Announce messages to screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority);
  }, []);

  return { announce };
};

export const useFocusTrap = (isActive: boolean = true) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const cleanup = trapFocus(containerRef.current);
    return cleanup;
  }, [isActive]);

  return containerRef;
};

export const useKeyboardNavigation = (
  items: HTMLElement[],
  onSelectionChange?: (index: number) => void
) => {
  const currentIndex = useRef<number>(-1);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (items.length === 0) return;

    let newIndex = currentIndex.current;
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = currentIndex.current === -1 ? 0 : (currentIndex.current + 1) % items.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex.current === -1 ? items.length - 1 : (currentIndex.current - 1 + items.length) % items.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    currentIndex.current = newIndex;
    items[newIndex].focus();
    onSelectionChange?.(newIndex);
  }, [items, onSelectionChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { currentIndex: currentIndex.current };
};

export const useAriaLive = () => {
  const regionRef = useRef<HTMLDivElement>(null);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (regionRef.current) {
      regionRef.current.setAttribute('aria-live', priority);
      regionRef.current.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  return { regionRef, announce };
};

export const useSkipLink = (targetId: string) => {
  const skipToTarget = useCallback(() => {
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [targetId]);

  return skipToTarget;
};
