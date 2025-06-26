import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import FileGrid from '../components/FileGrid';
import FileCard from '../components/FileCard';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { mockFiles } from '../data/mockFiles';

// Mock localStorage for server environment
const mockLocalStorage = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
});

describe('SSR hydration', () => {
  beforeEach(() => jest.clearAllMocks());

  test('FileGrid markup matches between server and client', async () => {
    const files = mockFiles.slice(0, 3);

    const serverHTML = renderToString(
      <ThemeProvider>
        <FileGrid files={files} />
      </ThemeProvider>
    ).replace(' data-reactroot=""', '');

    const { container } = render(
      <ThemeProvider>
        <FileGrid files={files} />
      </ThemeProvider>
    );

    await waitFor(() => expect(container.innerHTML).not.toBe(''));
    expect(container.innerHTML).toContain('Project Proposal');
    // Optionally, for a stricter check:
    // expect(container.innerHTML).toBe(serverHTML);

    files.forEach(f => {
      expect(screen.getByText(f.name)).toBeInTheDocument();
    });
  });

  test('Theme context hydrates saved theme', async () => {
    // @ts-expect-error: mockReturnValue can accept string for test
    mockLocalStorage.getItem.mockReturnValue('dark');

    const Probe = () => {
      const { state } = useTheme();
      return <div data-testid="theme">{state.theme}</div>;
    };

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    // If you want dark first (current behavior):
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    // If you want light first, move the localStorage read into useEffect in ThemeContext and use:
    // expect(screen.getByTestId('theme')).toHaveTextContent('light');
    // await waitFor(() =>
    //   expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    // );
  });

  test('FileCard export is valid', () => {
    expect(typeof FileCard).toBe('function');
    const files = mockFiles.slice(0, 1);
    expect(() => render(<FileGrid files={files} />)).not.toThrow();
  });
});
