import { formatDistanceToNow, format } from 'date-fns';

export const formatFileSize = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  let formattedSize = size;

  while (formattedSize >= 1024 && index < units.length - 1) {
    formattedSize /= 1024;
    index++;
  }

  return `${formattedSize.toFixed(2)} ${units[index]}`;
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMMM dd, yyyy');
};

export const timeAgo = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};