/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
  readonly VITE_PORT?: string;
  readonly VITE_MONITORING_ENDPOINT?: string;
  readonly VITE_MONITORING_API_KEY?: string;
  readonly VITE_ERROR_REPORTING_ENDPOINT?: string;
  readonly VITE_ERROR_REPORTING_API_KEY?: string;
  readonly VITE_ANALYTICS_ENDPOINT?: string;
  readonly VITE_ANALYTICS_API_KEY?: string;
  readonly VITE_PERFORMANCE_MONITORING?: string;
  readonly VITE_LOG_LEVEL?: string;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// React namespace extensions and fixes
declare module 'react' {
  // Ensure all React hooks and components are available
  export const useCallback: typeof React.useCallback;
  export const useEffect: typeof React.useEffect;
  export const useState: typeof React.useState;
  export const useMemo: typeof React.useMemo;
  export const useRef: typeof React.useRef;
  export const useContext: typeof React.useContext;
  export const useReducer: typeof React.useReducer;
  export const StrictMode: typeof React.StrictMode;

  // Event types
  export type MouseEvent<T = Element> = React.MouseEvent<T>;
  export type DragEvent<T = Element> = React.DragEvent<T>;
  export type FormEvent<T = Element> = React.FormEvent<T>;
  export type ChangeEvent<T = Element> = React.ChangeEvent<T>;

  // Component types
  export type FC<P = {}> = React.FC<P>;
  export type Component<P = {}, S = {}> = React.Component<P, S>;
  export type ReactNode = React.ReactNode;
  export type ErrorInfo = React.ErrorInfo;

  // Form handler compatibility
  interface FormEventHandler<T = Element> {
    (event: React.FormEvent<T>): void | Promise<void>;
  }

  // Style attributes extension
  interface StyleHTMLAttributes<T> {
    jsx?: boolean;
  }

  // Component compatibility fix
  namespace JSX {
    interface ElementClass {
      render(): ReactNode | null;
    }
    interface ElementConstructor {
      (props: any): React.Component<any, any>;
    }
  }
}

// Window console extension for monitoring
declare global {
  interface Window {
    console: Console & {
      table?: (data: any, columns?: string[]) => void;
    };
  }
}