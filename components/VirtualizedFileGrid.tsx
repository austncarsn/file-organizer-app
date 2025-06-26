'use client';

import React, { useMemo } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { FileItem } from '../types/file';
import FileCard from './file-system/FileCard';

interface VirtualizedFileGridProps {
  files: FileItem[];
  onFileSelect: (id: string) => void;
  selectedFiles: Set<string>;
  containerWidth: number;
  containerHeight: number;
  onPreview?: (file: FileItem) => void;
  onContextMenu?: (file: FileItem, event: React.MouseEvent) => void;
}

const CARD_WIDTH = 200;
const CARD_HEIGHT = 220;
const GAP = 16;

const VirtualizedFileGrid: React.FC<VirtualizedFileGridProps> = ({
  files,
  onFileSelect,
  selectedFiles,
  containerWidth,
  containerHeight,
  onPreview,
  onContextMenu
}) => {
  const { columnCount, rowCount } = useMemo(() => {
    const cols = Math.floor((containerWidth + GAP) / (CARD_WIDTH + GAP));
    const rows = Math.ceil(files.length / cols);
    return { columnCount: Math.max(1, cols), rowCount: rows };
  }, [containerWidth, files.length]);

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const fileIndex = rowIndex * columnCount + columnIndex;
    const file = files[fileIndex];

    if (!file) return null;

    return (
      <div
        style={{
          ...style,
          padding: GAP / 2,
          left: (style.left as number) + GAP / 2,
          top: (style.top as number) + GAP / 2,
          width: (style.width as number) - GAP,
          height: (style.height as number) - GAP
        }}
      >
        <FileCard
          file={file}
          onSelect={onFileSelect}
          onPreview={onPreview}
          onContextMenu={onContextMenu}
          isSelected={selectedFiles.has(file.id)}
        />
      </div>
    );
  };

  return (
    <Grid
      columnCount={columnCount}
      columnWidth={CARD_WIDTH + GAP}
      height={containerHeight}
      rowCount={rowCount}
      rowHeight={CARD_HEIGHT + GAP}
      width={containerWidth}
      itemData={{ files, selectedFiles }}
    >
      {Cell}
    </Grid>
  );
};

export default React.memo(VirtualizedFileGrid);
