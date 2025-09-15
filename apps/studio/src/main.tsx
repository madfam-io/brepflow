import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './design-system/tokens.css';
import './index.css';

// Check for SharedArrayBuffer support (required for WASM threads)
if (!crossOriginIsolated) {
  console.warn(
    'SharedArrayBuffer is not available. WASM threads will be disabled.\n' +
    'Make sure the server sends proper COOP/COEP headers.'
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);