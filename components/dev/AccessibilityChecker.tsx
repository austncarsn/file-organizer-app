// Development-only accessibility checklist component
'use client';

import React, { useState, useEffect } from 'react';
import { validateAccessibility, checkColorContrast, generateAccessibilityReport } from '../../utils/accessibilityTesting';

const AccessibilityChecker: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [issues, setIssues] = useState<any[]>([]);
  const [colorContrastResults, setColorContrastResults] = useState<any>(null);
  const [report, setReport] = useState<string>('');

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const runCheck = () => {
      const accessibilityIssues = validateAccessibility();
      const contrastCheck = checkColorContrast();
      const accessibilityReport = generateAccessibilityReport();

      setIssues(accessibilityIssues);
      setColorContrastResults(contrastCheck);
      setReport(accessibilityReport);
    };

    // Run initial check
    runCheck();

    // Set up periodic checks
    const interval = setInterval(runCheck, 5000);
    return () => clearInterval(interval);
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') return null;

  const toggleVisibility = () => setIsVisible(!isVisible);

  const totalIssues = issues.length;
  const errors = issues.filter(issue => issue.type === 'error').length;
  const warnings = issues.filter(issue => issue.type === 'warning').length;

  return (
    <>
      {/* Floating accessibility button */}
      <button
        onClick={toggleVisibility}
        className="
          fixed bottom-4 right-4 z-50 w-12 h-12 
          bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
          transition-all duration-200
        "
        aria-label={`Accessibility checker (${totalIssues} issues found)`}
        title="Accessibility Checker"
      >
        <span className="text-xl" aria-hidden="true">♿</span>
        {totalIssues > 0 && (
          <span className="
            absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs 
            rounded-full flex items-center justify-center font-bold
          ">
            {totalIssues > 99 ? '99+' : totalIssues}
          </span>
        )}
      </button>

      {/* Accessibility panel */}
      {isVisible && (
        <div className="
          fixed bottom-20 right-4 z-40 w-96 max-h-96 
          bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
          rounded-lg shadow-2xl overflow-hidden
        ">
          <div className="p-4 bg-purple-600 text-white">
            <div className="flex justify-between items-center">
              <h2 className="sr-only">Accessibility</h2>
              <h3 className="font-bold text-lg">Accessibility Report</h3>
              <button
                onClick={toggleVisibility}
                className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close accessibility checker"
              >
                ✕
              </button>
            </div>
            <div className="text-sm mt-1">
              {totalIssues === 0 ? (
                <span className="text-green-200">✅ No issues found!</span>
              ) : (
                <span>
                  {errors > 0 && <span className="text-red-200">{errors} errors</span>}
                  {errors > 0 && warnings > 0 && <span>, </span>}
                  {warnings > 0 && <span className="text-yellow-200">{warnings} warnings</span>}
                </span>
              )}
            </div>
          </div>

          <div className="p-4 max-h-80 overflow-y-auto">
            {/* Color Contrast Results */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Color Contrast
              </h4>
              <div className={`text-sm ${colorContrastResults?.passes ? 'text-green-600' : 'text-red-600'}`}>
                {colorContrastResults?.passes ? '✅ All elements pass' : '❌ Some elements fail'}
              </div>
            </div>

            {/* Issues List */}
            {issues.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Issues Found
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {issues.map((issue, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-sm ${
                        issue.type === 'error' 
                          ? 'bg-red-50 border-l-4 border-red-400 text-red-800 dark:bg-red-900/20 dark:text-red-200' 
                          : 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                      }`}
                    >
                      <div className="font-medium">
                        {issue.type === 'error' ? '❌' : '⚠️'} {issue.rule}
                      </div>
                      <div className="text-xs mt-1">{issue.message}</div>
                      {issue.wcagReference && (
                        <div className="text-xs mt-1 opacity-75">{issue.wcagReference}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  console.log('Full Accessibility Report:', report);
                  console.log('Color Contrast Details:', colorContrastResults);
                }}
                className="
                  w-full px-3 py-2 text-sm bg-purple-600 hover:bg-purple-700 
                  text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500
                "
              >
                Log Full Report to Console
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityChecker;
