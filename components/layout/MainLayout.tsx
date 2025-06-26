'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import AccessibilityChecker from '../dev/AccessibilityChecker';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                {/* Mobile sidebar backdrop */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                        role="button"
                        tabIndex={0}
                        aria-label="Close sidebar"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setSidebarOpen(false);
                            }
                        }}
                    />
                )}
                
                {/* Sidebar - Navigation */}
                <nav 
                    className={`
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        fixed lg:relative lg:translate-x-0 z-30 lg:z-0
                        transition-transform duration-300 ease-in-out
                        w-64 h-full
                    `}
                    aria-label="Main navigation"
                    role="navigation"
                >
                    <Sidebar />
                </nav>

                {/* Main content */}
                <main 
                    id="main-content"
                    className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-800"
                    role="main"
                    aria-label="File management area"
                >
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <Toolbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                    </div>
                    <div className="flex-1 p-6 overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
            
            {/* Development-only accessibility checker */}
            <AccessibilityChecker />
        </div>
    );
};

export default MainLayout;