import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import FileCard from '../components/file-system/FileCard';
import { FileItem } from '../types/file';

const mockFile: FileItem = {
  id: 'test-file-1',
  name: 'test-document.pdf',
  type: 'file',
  mimeType: 'application/pdf',
  size: 1024000,
  created: new Date('2023-01-01'),
  modified: new Date('2023-01-15'),
  parent: null,
  tags: ['important', 'work'],
  starred: true,
  thumbnail: '/test-thumbnail.jpg'
};

describe('FileCard', () => {
  const mockOnSelect = jest.fn();
  const mockOnPreview = jest.fn();
  const mockOnContextMenu = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders file information correctly', () => {
    render(
      <FileCard
        file={mockFile}
        onSelect={mockOnSelect}
        onPreview={mockOnPreview}
        onContextMenu={mockOnContextMenu}
        isSelected={false}
      />
    );

    const card = screen.getByRole('button');
    expect(card.getAttribute('aria-label')).toBe('File: test-document.pdf (starred)');
    expect(screen.getByText('test-document.pdf')).toBeTruthy();
    expect(screen.getByText(/1/)).toBeTruthy(); // File size formatting
  });

  it('handles selection on click', () => {
    render(
      <FileCard
        file={mockFile}
        onSelect={mockOnSelect}
        isSelected={false}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnSelect).toHaveBeenCalledWith('test-file-1');
  });

  it('handles keyboard navigation', () => {
    render(
      <FileCard
        file={mockFile}
        onSelect={mockOnSelect}
        isSelected={false}
      />
    );

    const card = screen.getByRole('button');
    
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(mockOnSelect).toHaveBeenCalledWith('test-file-1');

    fireEvent.keyDown(card, { key: ' ' });
    expect(mockOnSelect).toHaveBeenCalledTimes(2);
  });

  it('shows context menu on right click', () => {
    render(
      <FileCard
        file={mockFile}
        onSelect={mockOnSelect}
        onContextMenu={mockOnContextMenu}
        isSelected={false}
      />
    );

    fireEvent.contextMenu(screen.getByRole('button'));
    expect(mockOnContextMenu).toHaveBeenCalledWith(mockFile, expect.any(Object));
  });

  it('triggers preview on hover', () => {
    render(
      <FileCard
        file={mockFile}
        onSelect={mockOnSelect}
        onPreview={mockOnPreview}
        isSelected={false}
      />
    );

    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(mockOnPreview).toHaveBeenCalledWith(mockFile);
  });

  it('applies selected styles when selected', () => {
    render(
      <FileCard
        file={mockFile}
        onSelect={mockOnSelect}
        isSelected={true}
      />
    );

    const card = screen.getByRole('button');
    expect(card.getAttribute('aria-pressed')).toBe('true');
    expect(card.className).toContain('bg-primary-50');
  });

  it('meets accessibility requirements', () => {
    render(
      <FileCard
        file={mockFile}
        onSelect={mockOnSelect}
        isSelected={false}
      />
    );

    const card = screen.getByRole('button');
    expect(card.getAttribute('tabIndex')).toBe('0');
    expect(card.getAttribute('aria-describedby')).toBe('file-details-test-file-1');
    
    // Check for screen reader content
    expect(screen.getByText('File size:')).toBeTruthy();
    expect(screen.getByText('This file is starred')).toBeTruthy();
  });
});
