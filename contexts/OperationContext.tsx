'use client';

import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { OperationState, OperationAction } from '../types/operation';

interface OperationContextProps {
  state: OperationState;
  dispatch: React.Dispatch<OperationAction>;
}

const OperationContext = createContext<OperationContextProps | undefined>(undefined);

const initialState: OperationState = {
  operations: [],
  isProcessing: false,
};

const operationReducer = (state: OperationState, action: OperationAction): OperationState => {
  switch (action.type) {
    case 'START_OPERATION':
      return { ...state, isProcessing: true, operations: [...state.operations, action.payload] };
    case 'COMPLETE_OPERATION':
      return { ...state, isProcessing: false, operations: state.operations.filter(op => op.id !== action.payload.id) };
    case 'CANCEL_OPERATION':
      return { ...state, operations: state.operations.filter(op => op.id !== action.payload.id) };
    default:
      return state;
  }
};

export const OperationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(operationReducer, initialState);

  return (
    <OperationContext.Provider value={{ state, dispatch }}>
      {children}
    </OperationContext.Provider>
  );
};

export const useOperation = (): OperationContextProps => {
  const context = useContext(OperationContext);
  if (!context) {
    throw new Error('useOperation must be used within an OperationProvider');
  }
  return context;
};