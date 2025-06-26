'use client';

import { useEffect, useState } from 'react';
import FileGrid from './FileGrid';
import { FileItem } from '../types/file';

interface ClientOnlyFileGridProps {
  files: FileItem[];
}

const ClientOnlyFileGrid: React.FC<ClientOnlyFileGridProps> = ({ files }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return skeleton that matches the expected structure
    return (
      <div className="grid">
        {files.map((file) => (
          <div key={file.id} className="animate-pulse bg-gray-200 h-20 rounded">
            {/* Skeleton placeholder */}
          </div>
        ))}
      </div>
    );
  }

  return <FileGrid files={files} />;
};

export default ClientOnlyFileGrid;
