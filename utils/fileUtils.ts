import { FileItem } from '../types/file';

// Utility function to move files
export const moveFiles = (files: FileItem[], destination: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate moving files
      console.log(`Moved ${files.length} files to ${destination}`);
      resolve();
    }, Math.random() * (2000 - 500) + 500); // Simulate delay between 500ms to 2000ms
  });
};

// Utility function to copy files
export const copyFiles = (files: FileItem[], destination: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate copying files
      console.log(`Copied ${files.length} files to ${destination}`);
      resolve();
    }, Math.random() * (3000 - 1000) + 1000); // Simulate delay between 1000ms to 3000ms
  });
};

// Utility function to delete files
export const deleteFiles = (files: FileItem[]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate deleting files
      console.log(`Deleted ${files.length} files`);
      resolve();
    }, Math.random() * (1000 - 300) + 300); // Simulate delay between 300ms to 1000ms
  });
};

// Utility function to archive files
export const archiveFiles = (files: FileItem[]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate archiving files
      console.log(`Archived ${files.length} files`);
      resolve();
    }, Math.random() * (2000 - 800) + 800); // Simulate delay between 800ms to 2000ms
  });
};

// Utility function to bulk rename files
export const bulkRenameFiles = (files: FileItem[], newNamePattern: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate renaming files
      console.log(`Renamed ${files.length} files with pattern: ${newNamePattern}`);
      resolve();
    }, Math.random() * (1500 - 500) + 500); // Simulate delay between 500ms to 1500ms
  });
};