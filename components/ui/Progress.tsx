import React from 'react';

interface ProgressProps {
  progress: number; // Progress percentage (0-100)
  label?: string; // Optional label for the progress indicator
}

const Progress: React.FC<ProgressProps> = ({ progress, label }) => {
  return (
    <div className="relative w-full h-4 bg-gray-200 rounded">
      <div
        className="absolute top-0 left-0 h-full bg-blue-600 rounded transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
      {label && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
          {label} {progress}%
        </span>
      )}
    </div>
  );
};

export default Progress;