interface Theme {
  mode: 'light' | 'dark' | 'system';
  highContrast: boolean;
}

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  selectedView: 'grid' | 'list';
  theme: Theme;
}

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

interface SelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

interface ProgressProps {
  progress: number;
  label?: string;
}