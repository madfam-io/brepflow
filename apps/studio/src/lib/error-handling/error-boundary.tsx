/**
 * React Error Boundaries for graceful error handling
 */

import React, { Component, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState, ErrorCode, ErrorSeverity } from './types';
import { ErrorManager } from './error-manager';
import { ErrorDisplay } from '../../components/error/ErrorDisplay';

/**
 * Generic Error Boundary with comprehensive error handling
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private errorManager: ErrorManager;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null
    };

    this.errorManager = ErrorManager.getInstance();
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorId: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Create error through ErrorManager
    const brepFlowError = this.errorManager.fromJavaScriptError(
      error,
      ErrorCode.COMPONENT_RENDER_ERROR,
      {
        severity: ErrorSeverity.HIGH,
        category: 'ui' as any,
        context: {
          componentStack: errorInfo.componentStack,
          errorBoundary: this.constructor.name
        }
      }
    );

    this.setState({ errorId: brepFlowError.id ?? null });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    if (this.state.errorId) {
      this.errorManager.resolveError(this.state.errorId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorId: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.handleReset} />;
      }

      // Use default error display
      return (
        <ErrorDisplay
          errorId={this.state.errorId}
          error={this.state.error}
          onReset={this.handleReset}
          isolated={this.props.isolate}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * HOC for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

/**
 * Specialized Error Boundary for WASM operations
 */
export class WASMErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private errorManager: ErrorManager;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null
    };

    this.errorManager = ErrorManager.getInstance();
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorId: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Check if it's a WASM-related error
    const isWASMError = error.message.includes('wasm') ||
                       error.message.includes('WebAssembly') ||
                       error.stack?.includes('wasm') ||
                       false;

    const errorCode = isWASMError
      ? ErrorCode.WASM_EXECUTION_ERROR
      : ErrorCode.COMPONENT_RENDER_ERROR;

    const brepFlowError = this.errorManager.fromJavaScriptError(
      error,
      errorCode,
      {
        severity: isWASMError ? ErrorSeverity.CRITICAL : ErrorSeverity.HIGH,
        context: {
          componentStack: errorInfo.componentStack,
          wasmRelated: isWASMError
        }
      }
    );

    this.setState({ errorId: brepFlowError.id ?? null });
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    if (this.state.errorId) {
      this.errorManager.resolveError(this.state.errorId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorId: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          errorId={this.state.errorId}
          error={this.state.error}
          onReset={this.handleReset}
          isolated={this.props.isolate}
          specializedFor="wasm"
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Specialized Error Boundary for Geometry operations
 */
export class GeometryErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private errorManager: ErrorManager;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null
    };

    this.errorManager = ErrorManager.getInstance();
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorId: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const brepFlowError = this.errorManager.fromJavaScriptError(
      error,
      ErrorCode.GEOMETRY_COMPUTATION_FAILED,
      {
        severity: ErrorSeverity.MEDIUM,
        context: {
          componentStack: errorInfo.componentStack,
          geometryOperation: true
        }
      }
    );

    this.setState({ errorId: brepFlowError.id ?? null });
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    if (this.state.errorId) {
      this.errorManager.resolveError(this.state.errorId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorId: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          errorId={this.state.errorId}
          error={this.state.error}
          onReset={this.handleReset}
          isolated={this.props.isolate}
          specializedFor="geometry"
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Hook for handling async errors in functional components
 */
export function useAsyncError() {
  const errorManager = ErrorManager.getInstance();

  return React.useCallback((error: Error, context?: any) => {
    errorManager.fromJavaScriptError(error, ErrorCode.RUNTIME, {
      context: {
        ...context,
        asyncError: true
      }
    });
  }, [errorManager]);
}