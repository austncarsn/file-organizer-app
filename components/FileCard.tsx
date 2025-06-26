import React from 'react';
import { FileItem } from '../types/file';

interface FileCardProps {
  file: FileItem;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const FileCard: React.FC<FileCardProps> = ({ file, onSelect, isSelected }) => {
  return <div>{file.name}</div>;
};

export default FileCard;
