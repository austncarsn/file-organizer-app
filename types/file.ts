interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  mimeType?: string;
  size: number;
  created: Date;
  modified: Date;
  parent: string | null;
  tags: string[];
  starred: boolean;
  thumbnail?: string;
}

interface FilterState {
  type: string[];
  size: { min: number; max: number };
  date: { from: Date | null; to: Date | null };
  tags: string[];
}

interface SortConfig {
  key: keyof FileItem;
  direction: 'asc' | 'desc';
}

type ViewMode = 'grid' | 'list';

interface OperationQueue {
  operations: Array<{
    id: string;
    type: 'move' | 'copy' | 'delete' | 'archive' | 'rename';
    progress: number;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
  }>;
}

interface UIState {
  theme: 'light' | 'dark' | 'high-contrast';
  isLoading: boolean;
  error: string | null;
}

export type {
  FileItem,
  FilterState,
  SortConfig,
  ViewMode,
  OperationQueue,
  UIState
};