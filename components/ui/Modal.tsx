'use client';

import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className = '' }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      modalRef.current?.focus();
      
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore background scroll
      document.body.style.overflow = '';
      
      // Restore focus to previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4 ${className}`}
        tabIndex={-1}
        role="document"
      >
        {title && (
          <h2 
            id="modal-title" 
            className="text-lg font-semibold mb-4 text-gray-900 dark:text-white"
          >
            {title}
          </h2>
        )}
        
        <div className="mb-4">
          {children}
        </div>
        
        <button
          className="
            mt-4 px-4 py-2 bg-blue-500 text-white rounded 
            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
            transition-colors duration-200
          "
          onClick={onClose}
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;