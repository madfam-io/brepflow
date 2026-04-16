/**
 * User-friendly error display component
 */

import React, { useState, useEffect } from 'react';
import { Sim4DError, ErrorSeverity, RecoveryAction } from '../../lib/error-handling/types';
import { ErrorManager } from '../../lib/error-handling/error-manager';

interface ErrorDisplayProps {
  errorId: string | null;
  error: Error | null;
  onReset: () => void;
  isolated?: boolean;
  specializedFor?: 'wasm' | 'geometry' | 'network';
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorId,
  error,
  onReset,
  isolated = false,
  specializedFor,
}) => {
  const [sim4dError, setSim4DError] = useState<Sim4DError | null>(null);
  const [isExecutingRecovery, setIsExecutingRecovery] = useState<string | null>(null);

  useEffect(() => {
    if (errorId) {
      const errorManager = ErrorManager.getInstance();
      const errors = errorManager.getErrors();
      const foundError = errors.find((e) => e.id === errorId);
      setSim4DError(foundError || null);
    }
  }, [errorId]);

  const handleRecoveryAction = async (action: RecoveryAction) => {
    if (!errorId) return;

    if (action.requiresConfirmation) {
      const confirmed = window.confirm(
        `Are you sure you want to ${action.label}?\n\n${action.description}${
          action.destructive ? '\n\nThis action cannot be undone.' : ''
        }`
      );

      if (!confirmed) return;
    }

    setIsExecutingRecovery(action.id);

    try {
      const errorManager = ErrorManager.getInstance();
      const success = await errorManager.executeRecoveryAction(errorId, action.id);

      if (success) {
        onReset();
      } else {
        alert('Recovery action failed. Please try another option or contact support.');
      }
    } catch (error) {
      alert('Recovery action failed with an error. Please try another option or contact support.');
    } finally {
      setIsExecutingRecovery(null);
    }
  };

  const getSeverityTextClass = (severity: ErrorSeverity): string => {
    switch (severity) {
      case ErrorSeverity.LOW:
        return 'text-emerald-500';
      case ErrorSeverity.MEDIUM:
        return 'text-amber-500';
      case ErrorSeverity.HIGH:
        return 'text-red-500';
      case ErrorSeverity.CRITICAL:
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getSeverityBorderClass = (severity: ErrorSeverity): string => {
    switch (severity) {
      case ErrorSeverity.LOW:
        return 'border-emerald-500';
      case ErrorSeverity.MEDIUM:
        return 'border-amber-500';
      case ErrorSeverity.HIGH:
        return 'border-red-500';
      case ErrorSeverity.CRITICAL:
        return 'border-red-600';
      default:
        return 'border-gray-500';
    }
  };

  const getSeverityIcon = (severity: ErrorSeverity): string => {
    switch (severity) {
      case ErrorSeverity.LOW:
        return '⚠️';
      case ErrorSeverity.MEDIUM:
        return '⚠️';
      case ErrorSeverity.HIGH:
        return '❌';
      case ErrorSeverity.CRITICAL:
        return '🚨';
      default:
        return '❓';
    }
  };

  const getSpecializedMessage = (): React.ReactNode => {
    switch (specializedFor) {
      case 'wasm':
        return (
          <div className="specialized-message wasm">
            <h4>🔧 WASM Engine Issue</h4>
            <p>The WebAssembly geometry engine encountered an error. This might be due to:</p>
            <ul>
              <li>Complex geometry operations exceeding memory limits</li>
              <li>Invalid parameters passed to geometry functions</li>
              <li>Browser compatibility issues with SharedArrayBuffer</li>
            </ul>
          </div>
        );

      case 'geometry':
        return (
          <div className="specialized-message geometry">
            <h4>📐 Geometry Computation Error</h4>
            <p>Unable to compute the requested geometry operation. Common causes:</p>
            <ul>
              <li>Invalid or contradictory geometric parameters</li>
              <li>Degenerate geometry (zero-area surfaces, zero-length curves)</li>
              <li>Numeric precision issues with very small or large values</li>
            </ul>
          </div>
        );

      case 'network':
        return (
          <div className="specialized-message network">
            <h4>🌐 Network Connection Error</h4>
            <p>Unable to communicate with the server. This might be due to:</p>
            <ul>
              <li>Network connectivity issues</li>
              <li>Server maintenance or downtime</li>
              <li>Firewall or proxy blocking the request</li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  const displayError = sim4dError || {
    id: 'unknown',
    code: 'UNKNOWN_ERROR' as any,
    category: 'runtime' as any,
    severity: ErrorSeverity.MEDIUM,
    message: error?.message || 'An unexpected error occurred',
    technicalDetails: error?.stack,
    userMessage: 'Something went wrong. Please try refreshing the page.',
    context: {
      timestamp: Date.now(),
      sessionId: 'unknown',
      buildVersion: 'unknown',
    },
    recoverable: true,
    recoveryActions: [
      {
        id: 'reset',
        label: 'Try Again',
        description: 'Attempt to recover from this error',
        action: () => true,
        destructive: false,
        requiresConfirmation: false,
      },
    ],
    reportedToService: false,
    occurredAt: new Date(),
  };

  return (
    <div
      className={`error-display ${isolated ? 'isolated' : 'full'} severity-${displayError.severity} p-8 ${isolated ? 'm-4' : 'm-0'} border-2 ${getSeverityBorderClass(displayError.severity)} rounded-lg bg-red-50 font-sans ${isolated ? 'max-w-[500px]' : 'w-full'}`}
    >
      <div className="error-header mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{getSeverityIcon(displayError.severity)}</span>
          <h3
            className={`m-0 text-xl ${getSeverityTextClass(displayError.severity)}`}
          >
            {displayError.severity === ErrorSeverity.CRITICAL
              ? 'Critical Error'
              : displayError.severity === ErrorSeverity.HIGH
                ? 'Error'
                : displayError.severity === ErrorSeverity.MEDIUM
                  ? 'Warning'
                  : 'Notice'}
          </h3>
        </div>

        <p className="m-0 text-base text-gray-700 font-medium">
          {displayError.userMessage}
        </p>
      </div>

      {getSpecializedMessage()}

      {/* Technical details (collapsible) */}
      <details className="mb-6">
        <summary className="cursor-pointer text-gray-500 text-sm mb-2">
          Technical Details
        </summary>
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-700 font-mono">
          <p>
            <strong>Error Code:</strong> {displayError.code}
          </p>
          <p>
            <strong>Category:</strong> {displayError.category}
          </p>
          <p>
            <strong>Time:</strong> {displayError.occurredAt.toLocaleString()}
          </p>
          {displayError.message !== displayError.userMessage && (
            <p>
              <strong>Technical Message:</strong> {displayError.message}
            </p>
          )}
          {displayError.technicalDetails && (
            <details>
              <summary>Stack Trace</summary>
              <pre className="whitespace-pre-wrap text-xs mt-2">
                {displayError.technicalDetails}
              </pre>
            </details>
          )}
        </div>
      </details>

      {/* Recovery actions */}
      {displayError.recoverable &&
        displayError.recoveryActions &&
        displayError.recoveryActions.length > 0 && (
          <div className="recovery-actions mb-4">
            <h4 className="mt-0 mb-3 text-base text-gray-700">
              What would you like to do?
            </h4>

            <div className="flex flex-wrap gap-2">
              {displayError.recoveryActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleRecoveryAction(action)}
                  disabled={isExecutingRecovery === action.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    (action.destructive ?? false)
                      ? 'border border-red-500 bg-red-50 text-red-600'
                      : 'border border-gray-300 bg-white text-gray-700'
                  } ${isExecutingRecovery ? 'cursor-not-allowed' : 'cursor-pointer'} ${
                    isExecutingRecovery && isExecutingRecovery !== action.id ? 'opacity-50' : 'opacity-100'
                  }`}
                  title={action.description}
                >
                  {isExecutingRecovery === action.id ? '...' : action.label}
                </button>
              ))}
            </div>
          </div>
        )}

      {/* Default reset button if no recovery actions */}
      {(!displayError.recoveryActions || displayError.recoveryActions.length === 0) && (
        <button
          onClick={onReset}
          className="px-6 py-3 border-none rounded-md bg-blue-500 text-white cursor-pointer text-sm font-medium"
        >
          Try Again
        </button>
      )}

      {/* Error reporting status */}
      <div className="mt-4 text-xs text-gray-500 border-t border-gray-200 pt-3">
        {displayError.reportedToService ? (
          <span>✅ Error has been automatically reported</span>
        ) : (
          <span>ℹ️ This error will be used to improve the application</span>
        )}
      </div>
    </div>
  );
};
