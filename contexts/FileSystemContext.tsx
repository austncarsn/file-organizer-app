'use client';

import React, { createContext, useReducer, ReactNode } from 'react';
import { FileItem } from '../types/file';

interface FileSystemState {
  files: FileItem[];
  loading: boolean;
  error: string | null;
}

type FileSystemAction =
  | { type: 'LOAD_FILES'; payload: FileItem[] }
  | { type: 'ADD_FILE'; payload: FileItem }
  | { type: 'DELETE_FILE'; payload: string }
  | { type: 'MOVE_FILE'; payload: { fileId: string; newParentId: string } }
  | { type: 'RENAME_FILE'; payload: { fileId: string; newName: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: FileSystemState = {
  files: [],
  loading: false,
  error: null,
};

const FileSystemContext = createContext<{
  state: FileSystemState;
  dispatch: React.Dispatch<FileSystemAction>;
}>({ state: initialState, dispatch: () => null });

const fileSystemReducer = (state: FileSystemState, action: FileSystemAction): FileSystemState => {
  switch (action.type) {
    case 'LOAD_FILES':
      return { ...state, files: action.payload, loading: false, error: null };
    case 'ADD_FILE':
      return { ...state, files: [...state.files, action.payload] };
    case 'DELETE_FILE':
      return { ...state, files: state.files.filter(file => file.id !== action.payload) };
    case 'MOVE_FILE':
      return {
        ...state,
        files: state.files.map(file =>
          file.id === action.payload.fileId
            ? { ...file, parent: action.payload.newParentId }
            : file
        )
      };
    case 'RENAME_FILE':
      return {
        ...state,
        files: state.files.map(file =>
          file.id === action.payload.fileId
            ? { ...file, name: action.payload.newName }
            : file
        )
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const FileSystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(fileSystemReducer, initialState);

  // Load mock data on component mount
  React.useEffect(() => {
    const loadMockData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { mockFiles } = await import('../data/mockFiles');
        dispatch({ type: 'LOAD_FILES', payload: mockFiles });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load files' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadMockData();
  }, []);

  return (
    <FileSystemContext.Provider value={{ state, dispatch }}>
      {children}
    </FileSystemContext.Provider>
  );
};

export { FileSystemContext, FileSystemProvider };