# File Organizer App

Modern Next.js tool for fast, accessible file management.

## Tech stack
Next.js 15, React 18, Tailwind CSS, shadcn ui, Zustand

## Features
✨ **Enhanced UI/UX**
- Command palette (Cmd+K) for instant access to files and actions
- Context menus with right-click file operations
- Inline preview on hover with smart positioning
- Smooth animations and micro-interactions
- WCAG AA accessibility compliance

⚡ **Performance Optimized**
- Virtualized file grid handles 10,000+ files smoothly
- Memoized components and efficient re-rendering
- Progressive loading and lazy image optimization

⌨️ **Keyboard Navigation**
- Full keyboard accessibility with arrow key navigation
- Comprehensive shortcuts (select all, copy, paste, delete)
- Focus management and visual indicators

🎨 **Modern Design System**
- Semantic color tokens with dark/light mode support
- Consistent spacing and typography scales
- Responsive grid layouts and mobile-friendly interactions

## Quick start
```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts
- `dev` - Local development server
- `build` - Production build
- `lint` - ESLint checks
- `test` - Jest + React Testing Library

## Architecture
```
components/
├── file-system/          # Core file components
├── ui/                   # Reusable UI components
├── CommandPalette.tsx    # Global search & actions
├── ContextMenu.tsx       # Right-click operations
├── InlinePreview.tsx     # Hover file previews
└── VirtualizedFileGrid.tsx # Performance-optimized grid

hooks/
├── useKeyboardShortcuts.ts # Global hotkeys
├── useSelection.ts         # Multi-select logic
└── useVirtualization.ts    # Grid virtualization

contexts/
├── FileSystemContext.tsx  # File state management
├── SelectionContext.tsx   # Selection state
└── ThemeContext.tsx       # Theme switching
```

## Performance Targets
- **Lighthouse Performance**: ≥90
- **Lighthouse Accessibility**: ≥95
- **File Handling**: 10,000+ files with smooth 60fps
- **Bundle Size**: <500kb gzipped

## Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License
MIT
- **Search & Filter**: Real-time search with debouncing and advanced filtering options.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/file-organizer-app.git
   cd file-organizer-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Development
The application is structured using a feature-based folder organization, ensuring clear separation of concerns. Key components include:

- **Components**: Reusable UI components located in the `components` directory.
- **Hooks**: Custom hooks for shared logic in the `hooks` directory.
- **Contexts**: Context providers for state management in the `contexts` directory.
- **Utilities**: Helper functions for various operations in the `utils` directory.
- **Types**: TypeScript interfaces for strong typing in the `types` directory.

## Performance
The application is optimized for performance with features like:
- Virtualization for large datasets.
- Code splitting and lazy loading for improved load times.
- Responsive design for mobile and desktop views.

## Accessibility
The File Organizer App adheres to WCAG 2.1 AA standards, ensuring:
- Full keyboard navigation.
- Screen reader support.
- Proper ARIA roles and labels.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
Special thanks to the open-source community for their contributions and support.