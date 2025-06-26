'use client';

import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { SelectionState, SelectionAction } from '../types/selection';

interface SelectionContextProps {
  state: SelectionState;
  dispatch: React.Dispatch<SelectionAction>;
}

const SelectionContext = createContext<SelectionContextProps | undefined>(undefined);

const selectionReducer = (state: SelectionState, action: SelectionAction): SelectionState => {
  switch (action.type) {
    case 'SELECT':
      return { 
        ...state, 
        selectedFiles: new Set([...state.selectedFiles, action.payload])
      };
    case 'DESELECT':
      const newSelectedFiles = new Set(state.selectedFiles);
      newSelectedFiles.delete(action.payload);
      return { ...state, selectedFiles: newSelectedFiles };
    case 'CLEAR_SELECTION':
      return { 
        ...state, 
        selectedFiles: new Set(),
        isSelecting: false,
        selectionStart: null,
        selectionEnd: null
      };
    case 'SET_SELECTION':
      return { ...state, selectedFiles: new Set(action.payload) };
    case 'START_SELECTION':
      return { 
        ...state, 
        isSelecting: true, 
        selectionStart: action.payload 
      };
    case 'END_SELECTION':
      return { 
        ...state, 
        isSelecting: false, 
        selectionEnd: action.payload 
      };
    default:
      return state;
  }
};

export const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: SelectionState = {
    selectedFiles: new Set(),
    isSelecting: false,
    selectionStart: null,
    selectionEnd: null,
  };

  const [state, dispatch] = useReducer(selectionReducer, initialState);

  return (
    <SelectionContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = (): SelectionContextProps => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};