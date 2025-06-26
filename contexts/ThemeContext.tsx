'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast';

interface ThemeState {
  theme: Theme;
}

type ThemeAction = 
  | {
      type: 'SET_THEME';
      payload: Theme;
    }
  | {
      type: 'RESET_THEME';
    };

const initialState: ThemeState = {
  theme: 'light', // Default theme
};

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
} | undefined>(undefined);

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'RESET_THEME':
      return { ...state, theme: initialState.theme };
    default:
      return state;
  }
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && ['light', 'dark', 'high-contrast'].includes(savedTheme)) {
        dispatch({ type: 'SET_THEME', payload: savedTheme });
      }
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('theme', state.theme);
    }
  }, [state.theme, isHydrated]);

  // Render with default theme until hydration is complete
  if (!isHydrated && typeof window !== 'undefined') {
    return (
      <ThemeContext.Provider value={{ state: initialState, dispatch }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useClearTheme = () => {
  const { dispatch } = useTheme();
  return () => dispatch({ type: 'RESET_THEME' });
};

// Add default export
export default useTheme;