import React from 'react';
import { FileItem } from '../../types/file';

interface FileIconProps {
  file: FileItem;
}

const FileIcon: React.FC<FileIconProps> = ({ file }) => {
  // You can extend this to render different icons based on file.type or file.mimeType
  return <span role="img" aria-label={file.type === 'folder' ? 'folder' : 'file'}>{file.type === 'folder' ? '📁' : '📄'}</span>;
};

export default FileIcon;
