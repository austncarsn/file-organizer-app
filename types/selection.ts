interface SelectionState {
  selectedFiles: Set<string>;
  isSelecting: boolean;
  selectionStart: string | null;
  selectionEnd: string | null;
}

type SelectionAction =
  | { type: 'SELECT'; payload: string }
  | { type: 'DESELECT'; payload: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_SELECTION'; payload: string[] }
  | { type: 'START_SELECTION'; payload: string }
  | { type: 'END_SELECTION'; payload: string }
  | { type: 'TOGGLE_SELECT_ALL'; payload: string[] };

interface SelectionActions {
  selectFile: (fileId: string) => void;
  deselectFile: (fileId: string) => void;
  clearSelection: () => void;
  startSelection: (fileId: string) => void;
  endSelection: (fileId: string) => void;
  toggleSelectAll: (files: string[]) => void;
}

export type { SelectionState, SelectionAction, SelectionActions };