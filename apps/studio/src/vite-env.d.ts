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

// Window console extension for monitoring
declare global {
  interface Window {
    console: Console & {
      table?: (data: any, columns?: string[]) => void;
    };
  }
}