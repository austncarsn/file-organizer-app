import { useEffect, useRef } from 'react';

const useVirtualization = (items: any[], itemHeight: number, containerHeight: number) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startIndexRef = useRef(0);
  const endIndexRef = useRef(0);
  const visibleItems = items.slice(startIndexRef.current, endIndexRef.current + 1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      startIndexRef.current = Math.floor(scrollTop / itemHeight);
      endIndexRef.current = Math.min(
        items.length - 1,
        Math.floor((scrollTop + containerHeight) / itemHeight)
      );
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize indices on mount

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [items.length, itemHeight, containerHeight]);

  return { containerRef, visibleItems };
};

export default useVirtualization;