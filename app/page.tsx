import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import FileGrid from '../components/file-system/FileGrid';

const Page: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-full">
        {/* Page header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Files
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage and organize your files with our modern file management system
          </p>
        </header>

        {/* Main content area */}
        <section aria-label="File management">
          <FileGrid />
        </section>
      </div>
    </MainLayout>
  );
};

export default Page;