import { useEffect, useRef } from 'react';

export const useFadeIn = (duration: number = 300) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.style.opacity = '0';
      element.style.transition = `opacity ${duration}ms ease-in-out`;
      requestAnimationFrame(() => {
        element.style.opacity = '1';
      });
    }
  }, [duration]);

  return elementRef;
};

export const useSlideIn = (duration: number = 300) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.style.transform = 'translateY(-20px)';
      element.style.opacity = '0';
      element.style.transition = `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;
      requestAnimationFrame(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
      });
    }
  }, [duration]);

  return elementRef;
};

export const useScaleIn = (duration: number = 300) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.style.transform = 'scale(0.9)';
      element.style.opacity = '0';
      element.style.transition = `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;
      requestAnimationFrame(() => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
      });
    }
  }, [duration]);

  return elementRef;
};