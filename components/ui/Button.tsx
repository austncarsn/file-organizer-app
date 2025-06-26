'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 
    transition-all duration-200 
    inline-flex items-center justify-center
    font-medium
    disabled:opacity-60 disabled:cursor-not-allowed
    min-h-[44px] min-w-[44px]
  `;
  
  const variantStyles = {
    primary: `
      bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500
      disabled:bg-blue-400
    `,
    secondary: `
      bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500
      disabled:bg-gray-400
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-700 focus:ring-red-500
      disabled:bg-red-400
    `,
    outline: `
      border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500
      dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700
      disabled:border-gray-200 disabled:text-gray-400
    `,
  };
  
  const sizeStyles = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="sr-only">Loading...</span>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;