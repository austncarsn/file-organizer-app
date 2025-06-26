'use client';

import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const UserSettings: React.FC = () => {
  const { state, dispatch } = useTheme();

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle theme"
      >
        {state.theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
        U
      </div>
    </div>
  );
};

export default UserSettings;
