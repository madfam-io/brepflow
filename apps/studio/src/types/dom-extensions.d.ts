// DOM API extensions for BrepFlow Studio

// Performance Timing API compatibility
interface PerformanceNavigationTiming {
  readonly navigationStart?: number; // Deprecated but still used in monitoring
  readonly connectEnd: number;
  readonly connectStart: number;
  readonly domainLookupEnd: number;
  readonly domainLookupStart: number;
  readonly fetchStart: number;
  readonly loadEventEnd: number;
  readonly loadEventStart: number;
  readonly redirectEnd: number;
  readonly redirectStart: number;
  readonly requestStart: number;
  readonly responseEnd: number;
  readonly responseStart: number;
  readonly unloadEventEnd: number;
  readonly unloadEventStart: number;
}

// React/JSX extensions
declare module 'react' {
  interface StyleHTMLAttributes<T> {
    jsx?: boolean;
  }

  interface FormEventHandler<T = Element> {
    (event: React.FormEvent<T>): void | Promise<void>;
  }

  // Fix for ErrorBoundary component inheritance
  namespace JSX {
    interface ElementClass {
      render(): ReactNode | null;
    }
  }
}

// Set utility types
interface Set<T> {
  readonly size: number;
}

// Timeout/Interval types for Node.js compatibility
type Timeout = ReturnType<typeof setTimeout>;
type Interval = ReturnType<typeof setInterval>;