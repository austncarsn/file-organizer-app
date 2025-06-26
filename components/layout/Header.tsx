'use client';

import React from 'react';
import useTheme from '../../hooks/useTheme';
import SearchBar from '../search/SearchBar';

const Header: React.FC = () => {
  const { state, dispatch } = useTheme();

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  return (
    <header 
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm"
      role="banner"
    >
      <h1 className="text-gray-900 dark:text-white text-xl font-bold">
        File Organizer
      </h1>
      
      <div className="flex-1 max-w-lg mx-8">
        <SearchBar />
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-lg bg-gray-200 dark:bg-gray-700 
            hover:bg-gray-300 dark:hover:bg-gray-600 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-colors duration-200
            min-h-[44px] min-w-[44px]
          "
          aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} theme`}
        >
          <span role="img" aria-hidden="true">
            {state.theme === 'light' ? '🌙' : '☀️'}
          </span>
        </button>
        
        <button
          className="
            w-10 h-10 rounded-full bg-blue-500 
            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
            flex items-center justify-center text-white font-semibold
            transition-colors duration-200
          "
          aria-label="User menu"
          title="User menu"
        >
          <span aria-hidden="true">U</span>
        </button>
      </div>
    </header>
  );
};

export default Header;