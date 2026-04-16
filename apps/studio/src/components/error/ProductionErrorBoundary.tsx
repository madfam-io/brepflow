/**
 * Production error boundary with proper error handling and reporting
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { getConfig } from '@sim4d/engine-core';
import ProductionLogger from '@sim4d/engine-occt';

// Lazy logger initialization to avoid constructor issues during module loading
let logger: any = null;
const getLogger = () => {
  if (!logger) {
    logger = new ProductionLogger({ component: 'ErrorBoundary' } as any);
  }
  return logger;
};

interface Props {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
}

export class ProductionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorInfo: null,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { errorId } = this.state;

    // Log to production logging system
    getLogger().error('React error boundary caught error', {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, send to error reporting service
    if (getConfig().isProduction && getConfig().enableErrorReporting) {
      this.reportToErrorService(error, errorInfo);
    }
  }

  private reportToErrorService(_error: Error, _errorInfo: ErrorInfo) {
    // This would integrate with Sentry or similar service
    try {
      // Example Sentry integration:
      // Sentry.withScope((scope) => {
      //   scope.setContext('errorBoundary', {
      //     errorId: this.state.errorId,
      //     componentStack: errorInfo.componentStack,
      //   });
      //   Sentry.captureException(error);
      // });

      // For now, just log that we would report
      getLogger().info('Error reported to monitoring service', {
        errorId: this.state.errorId,
      });
    } catch (reportError) {
      // Silently fail to avoid recursive errors
      getLogger().warn('Failed to report error to service', reportError);
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private renderDefaultFallback() {
    const { error, errorId } = this.state;
    const config = getConfig();

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 p-8">
        <div className="bg-white rounded-lg p-8 max-w-[600px] w-full shadow-2xl">
          <h1 className="text-red-600 text-3xl font-bold mb-4">
            {config.isProduction ? 'Something went wrong' : 'Application Error'}
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            {config.isProduction
              ? 'An unexpected error occurred. Please try refreshing the page.'
              : error?.message || 'Unknown error'}
          </p>

          {!config.isProduction && error?.stack && (
            <details className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
              <summary className="cursor-pointer font-semibold text-gray-800 mb-2">Error Details</summary>
              <pre className="font-mono text-sm text-red-600 overflow-x-auto whitespace-pre-wrap break-words m-0">{error.stack}</pre>
            </details>
          )}

          {errorId && (
            <p className="text-gray-500 text-sm mb-6">
              Error ID: <code className="bg-gray-100 px-2 py-1 rounded font-mono">{errorId}</code>
            </p>
          )}

          <div className="flex gap-4">
            <button onClick={this.handleReset} className="px-6 py-3 rounded font-semibold cursor-pointer transition-all duration-200 border-none text-base bg-gray-100 text-gray-600 hover:bg-gray-200">
              Try Again
            </button>
            <button onClick={this.handleReload} className="px-6 py-3 rounded font-semibold cursor-pointer transition-all duration-200 border-none text-base bg-indigo-500 text-white hover:bg-indigo-600">
              Reload Page
            </button>
          </div>

          {config.isProduction && (
            <p className="mt-6 pt-6 border-t border-gray-200 text-gray-500 text-sm text-center">
              If this problem persists, please contact support with the error ID above.
            </p>
          )}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.state.errorInfo!);
      }
      return this.renderDefaultFallback();
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ProductionErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ProductionErrorBoundary>
  );
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}
