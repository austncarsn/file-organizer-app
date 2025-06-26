import React from 'react';
import { FileSystemProvider } from '../contexts/FileSystemContext';
import { SelectionProvider } from '../contexts/SelectionContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { OperationProvider } from '../contexts/OperationContext';
import './globals.css';

export const metadata = {
  title: 'File Organizer App',
  description: 'A modern file organization application built with Next.js 15 and React 19',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A modern file organization application built with Next.js 15 and React 19" />
      </head>
      <body className="h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Skip to main content link for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <FileSystemProvider>
          <SelectionProvider>
            <ThemeProvider>
              <OperationProvider>
                <div className="min-h-full">
                  {children}
                </div>
              </OperationProvider>
            </ThemeProvider>
          </SelectionProvider>
        </FileSystemProvider>
      </body>
    </html>
  );
}