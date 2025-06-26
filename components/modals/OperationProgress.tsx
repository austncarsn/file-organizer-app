import React from 'react';
import { useOperationContext } from '../../contexts/OperationContext';
import Progress from '../ui/Progress';

const OperationProgress: React.FC = () => {
  const { operations } = useOperationContext();

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Operation Progress</h2>
        {operations.map((operation) => (
          <div key={operation.id} className="mb-4">
            <p className="text-sm">{operation.name}</p>
            <Progress progress={operation.progress} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationProgress;