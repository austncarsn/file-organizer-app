interface Operation {
  id: string;
  type: 'move' | 'copy' | 'delete' | 'archive' | 'rename';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  progress: number; // percentage from 0 to 100
  startTime: Date;
  endTime?: Date;
  error?: string; // error message if the operation fails
}

interface OperationState {
  operations: Operation[];
  isProcessing: boolean;
}

type OperationAction =
  | { type: 'START_OPERATION'; payload: Operation }
  | { type: 'COMPLETE_OPERATION'; payload: { id: string } }
  | { type: 'CANCEL_OPERATION'; payload: { id: string } }
  | { type: 'UPDATE_OPERATION'; payload: { id: string; updates: Partial<Operation> } };

interface OperationQueue {
  operations: Operation[];
  addOperation: (operation: Operation) => void;
  removeOperation: (id: string) => void;
  updateOperation: (id: string, updates: Partial<Operation>) => void;
}

export type { Operation, OperationState, OperationAction, OperationQueue };