// Accessibility utilities for WCAG compliance

export const focusElement = (element: HTMLElement) => {
    if (element && typeof element.focus === 'function') {
        element.focus();
    }
};

export const setAriaLive = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.className = 'sr-only'; // Screen reader only
    liveRegion.textContent = message;
    document.body.appendChild(liveRegion);
    
    // Remove after announcement
    setTimeout(() => {
        if (document.body.contains(liveRegion)) {
            document.body.removeChild(liveRegion);
        }
    }, 1000);
};

export const handleKeyboardNavigation = (event: KeyboardEvent, items: HTMLElement[]) => {
    if (items.length === 0) return;
    
    const currentIndex = items.findIndex(item => item === document.activeElement);
    let nextIndex = currentIndex;
    
    switch (event.key) {
        case 'ArrowDown':
            nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
            break;
        case 'ArrowUp':
            nextIndex = currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
            break;
        case 'ArrowRight':
            nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
            break;
        case 'ArrowLeft':
            nextIndex = currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
            break;
        case 'Home':
            nextIndex = 0;
            break;
        case 'End':
            nextIndex = items.length - 1;
            break;
        default:
            return;
    }
    
    event.preventDefault();
    focusElement(items[nextIndex]);
};

export const isValidAriaRole = (role: string): boolean => {
    const validRoles = [
        'alert', 'alertdialog', 'application', 'article', 'banner', 'button', 
        'cell', 'checkbox', 'columnheader', 'combobox', 'complementary', 
        'contentinfo', 'definition', 'dialog', 'directory', 'document', 
        'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading', 
        'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main', 
        'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox', 
        'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation', 
        'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup', 
        'rowheader', 'scrollbar', 'search', 'searchbox', 'separator', 
        'slider', 'spinbutton', 'status', 'switch', 'tab', 'table', 
        'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar', 
        'tooltip', 'tree', 'treegrid', 'treeitem'
    ];
    return validRoles.includes(role);
};

export const getContrastRatio = (color1: string, color2: string): number => {
    // Simple contrast ratio calculation (simplified version)
    // In a real implementation, you'd want a more robust color parsing
    const getLuminance = (color: string): number => {
        // This is a simplified version - you'd want proper color parsing
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;
        
        const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        
        return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };
    
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
};

export const meetsWCAGContrastRequirement = (
    color1: string, 
    color2: string, 
    level: 'AA' | 'AAA' = 'AA',
    textSize: 'normal' | 'large' = 'normal'
): boolean => {
    const ratio = getContrastRatio(color1, color2);
    
    if (level === 'AAA') {
        return textSize === 'large' ? ratio >= 4.5 : ratio >= 7;
    } else {
        return textSize === 'large' ? ratio >= 3 : ratio >= 4.5;
    }
};

export const trapFocus = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    };
    
    element.addEventListener('keydown', handleTabKey);
    
    return () => {
        element.removeEventListener('keydown', handleTabKey);
    };
};

export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAriaLive(message, priority);
};

export const getAccessibleName = (element: HTMLElement): string => {
    // Check for aria-label
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;
    
    // Check for aria-labelledby
    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    if (ariaLabelledBy) {
        const labelElement = document.getElementById(ariaLabelledBy);
        if (labelElement) return labelElement.textContent || '';
    }
    
    // Check for associated label
    if (element.id) {
        const label = document.querySelector(`label[for="${element.id}"]`);
        if (label) return label.textContent || '';
    }
    
    // Fall back to text content
    return element.textContent || '';
};

export const hasAccessibleName = (element: HTMLElement): boolean => {
    return getAccessibleName(element).trim().length > 0;
};

export const isKeyboardAccessible = (element: HTMLElement): boolean => {
    const tabIndex = element.getAttribute('tabindex');
    
    // Naturally focusable elements
    const naturallyFocusable = [
        'a', 'button', 'input', 'select', 'textarea', 'iframe', 'audio', 'video'
    ].includes(element.tagName.toLowerCase());
    
    if (naturallyFocusable && tabIndex !== '-1') return true;
    
    // Elements with positive or zero tabindex
    if (tabIndex && parseInt(tabIndex) >= 0) return true;
    
    return false;
};