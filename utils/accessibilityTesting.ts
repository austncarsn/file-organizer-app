// Accessibility testing and validation utilities

import { 
    hasAccessibleName, 
    isKeyboardAccessible, 
    meetsWCAGContrastRequirement,
    isValidAriaRole 
} from './accessibilityUtils';

interface AccessibilityIssue {
    element: HTMLElement;
    type: 'error' | 'warning';
    rule: string;
    message: string;
    wcagReference?: string;
}

export const validateAccessibility = (container: HTMLElement = document.body): AccessibilityIssue[] => {
    const issues: AccessibilityIssue[] = [];

    // Check for images without alt text
    const images = container.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    images.forEach(img => {
        if (!img.alt && !img.getAttribute('aria-label') && img.getAttribute('role') !== 'presentation') {
            issues.push({
                element: img,
                type: 'error',
                rule: 'img-alt',
                message: 'Image is missing alternative text',
                wcagReference: 'WCAG 1.1.1 Non-text Content'
            });
        }
    });

    // Check for buttons and links without accessible names
    const interactiveElements = container.querySelectorAll('button, a, [role="button"], [role="link"]') as NodeListOf<HTMLElement>;
    interactiveElements.forEach(element => {
        if (!hasAccessibleName(element)) {
            issues.push({
                element,
                type: 'error',
                rule: 'accessible-name',
                message: `${element.tagName.toLowerCase()} is missing an accessible name`,
                wcagReference: 'WCAG 4.1.2 Name, Role, Value'
            });
        }
    });

    // Check for form controls without labels
    const formControls = container.querySelectorAll('input, select, textarea') as NodeListOf<HTMLElement>;
    formControls.forEach(control => {
        const input = control as HTMLInputElement;
        if (input.type !== 'hidden' && !hasAccessibleName(control)) {
            issues.push({
                element: control,
                type: 'error',
                rule: 'form-label',
                message: 'Form control is missing a label',
                wcagReference: 'WCAG 3.3.2 Labels or Instructions'
            });
        }
    });

    // Check for non-keyboard accessible elements with click handlers
    const clickableElements = container.querySelectorAll('[onclick], [onmousedown], [onmouseup]') as NodeListOf<HTMLElement>;
    clickableElements.forEach(element => {
        if (!isKeyboardAccessible(element)) {
            issues.push({
                element,
                type: 'warning',
                rule: 'keyboard-accessible',
                message: 'Clickable element is not keyboard accessible',
                wcagReference: 'WCAG 2.1.1 Keyboard'
            });
        }
    });

    // Check for invalid ARIA roles
    const elementsWithRoles = container.querySelectorAll('[role]') as NodeListOf<HTMLElement>;
    elementsWithRoles.forEach(element => {
        const role = element.getAttribute('role');
        if (role && !isValidAriaRole(role)) {
            issues.push({
                element,
                type: 'error',
                rule: 'valid-aria-role',
                message: `Invalid ARIA role: ${role}`,
                wcagReference: 'WCAG 4.1.2 Name, Role, Value'
            });
        }
    });

    // Check for headings in order
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6') as NodeListOf<HTMLHeadingElement>;
    let previousLevel = 0;
    headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > previousLevel + 1) {
            issues.push({
                element: heading,
                type: 'warning',
                rule: 'heading-order',
                message: `Heading level ${level} follows heading level ${previousLevel}, skipping levels`,
                wcagReference: 'WCAG 1.3.1 Info and Relationships'
            });
        }
        previousLevel = level;
    });

    // Check for missing main landmark
    const mainElements = container.querySelectorAll('main, [role="main"]');
    if (mainElements.length === 0 && container === document.body) {
        issues.push({
            element: container,
            type: 'warning',
            rule: 'main-landmark',
            message: 'Page is missing a main landmark',
            wcagReference: 'WCAG 1.3.1 Info and Relationships'
        });
    } else if (mainElements.length > 1) {
        mainElements.forEach((element, index) => {
            if (index > 0) {
                issues.push({
                    element: element as HTMLElement,
                    type: 'warning',
                    rule: 'main-landmark',
                    message: 'Multiple main landmarks found on page',
                    wcagReference: 'WCAG 1.3.1 Info and Relationships'
                });
            }
        });
    }

    return issues;
};

export const generateAccessibilityReport = (container: HTMLElement = document.body): string => {
    const issues = validateAccessibility(container);
    const errors = issues.filter(issue => issue.type === 'error');
    const warnings = issues.filter(issue => issue.type === 'warning');

    let report = '# Accessibility Report\n\n';
    
    if (issues.length === 0) {
        report += '✅ No accessibility issues found!\n\n';
    } else {
        report += `Found ${issues.length} accessibility issues:\n`;
        report += `- ${errors.length} errors\n`;
        report += `- ${warnings.length} warnings\n\n`;

        if (errors.length > 0) {
            report += '## Errors\n\n';
            errors.forEach((issue, index) => {
                report += `${index + 1}. **${issue.rule}**: ${issue.message}\n`;
                if (issue.wcagReference) {
                    report += `   - Reference: ${issue.wcagReference}\n`;
                }
                report += `   - Element: ${issue.element.tagName.toLowerCase()}`;
                if (issue.element.id) report += `#${issue.element.id}`;
                if (issue.element.className) report += `.${issue.element.className.split(' ').join('.')}`;
                report += '\n\n';
            });
        }

        if (warnings.length > 0) {
            report += '## Warnings\n\n';
            warnings.forEach((issue, index) => {
                report += `${index + 1}. **${issue.rule}**: ${issue.message}\n`;
                if (issue.wcagReference) {
                    report += `   - Reference: ${issue.wcagReference}\n`;
                }
                report += `   - Element: ${issue.element.tagName.toLowerCase()}`;
                if (issue.element.id) report += `#${issue.element.id}`;
                if (issue.element.className) report += `.${issue.element.className.split(' ').join('.')}`;
                report += '\n\n';
            });
        }
    }

    return report;
};

export const checkColorContrast = (): { passes: boolean; details: Array<{ element: HTMLElement; ratio: number; passes: boolean }> } => {
    const textElements = document.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6, li, td, th') as NodeListOf<HTMLElement>;
    const results: Array<{ element: HTMLElement; ratio: number; passes: boolean }> = [];
    let allPass = true;

    textElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const textColor = styles.color;
        const backgroundColor = styles.backgroundColor;
        
        // Only check if we have both colors (simplified check)
        if (textColor && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            try {
                const ratio = getContrastRatioFromComputedStyles(textColor, backgroundColor);
                const fontSize = parseFloat(styles.fontSize);
                const fontWeight = styles.fontWeight;
                const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700));
                
                const passes = meetsWCAGContrastRequirement(
                    textColor,
                    backgroundColor,
                    'AA',
                    isLargeText ? 'large' : 'normal'
                );
                
                results.push({ element, ratio, passes });
                if (!passes) allPass = false;
            } catch (error) {
                // Skip elements we can't analyze
            }
        }
    });

    return { passes: allPass, details: results };
};

// Helper function to convert computed styles to hex for contrast checking
const getContrastRatioFromComputedStyles = (color1: string, color2: string): number => {
    // This is a simplified implementation
    // In a real application, you'd want a more robust color parsing library
    const rgbToHex = (rgb: string): string => {
        const match = rgb.match(/\d+/g);
        if (!match) return '#000000';
        
        const [r, g, b] = match.map(num => parseInt(num));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    const hex1 = color1.startsWith('#') ? color1 : rgbToHex(color1);
    const hex2 = color2.startsWith('#') ? color2 : rgbToHex(color2);
    
    return getContrastRatio(hex1, hex2);
};

// For backward compatibility
import { getContrastRatio } from './accessibilityUtils';

export const runAccessibilityAudit = (): void => {
    console.group('🔍 Accessibility Audit');
    
    const issues = validateAccessibility();
    const contrastCheck = checkColorContrast();
    
    console.log('📋 Report:', generateAccessibilityReport());
    console.log('🎨 Color Contrast:', contrastCheck.passes ? '✅ Passed' : '❌ Failed');
    
    if (!contrastCheck.passes) {
        console.table(contrastCheck.details.filter(detail => !detail.passes));
    }
    
    console.groupEnd();
};
