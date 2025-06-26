'use client';

import React, { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeApplier: React.FC = () => {
  const { state } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(state.theme);
    
    // Handle dark mode for Tailwind
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  return null;
};

export default ThemeApplier;
