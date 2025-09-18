import React from 'react';

export type IconName =
  | 'monitor' | 'refresh' | 'close' | 'settings' | 'warning' | 'error' | 'success' | 'info'
  | 'folder' | 'save' | 'trash' | 'import' | 'export'
  | 'shaded' | 'wireframe' | 'xray' | 'section' | 'fit-view' | 'zoom' | 'hide'
  | 'box' | 'cylinder' | 'sphere' | 'line' | 'revolve' | 'sweep' | 'fillet' | 'chamfer'
  | 'move' | 'rotate' | 'mirror' | 'pattern'
  | 'loader' | 'visibility' | 'x' | 'alert-circle' | 'chevron-up' | 'chevron-down' | 'chevron-right' | 'computing' | 'play';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
}

// Simple SVG icons - lightweight and professional
const IconSVGs: Record<IconName, string> = {
  monitor: '<path stroke="currentColor" stroke-width="2" fill="none" d="M4 6h16v12H4V6zM2 20h20M10 20h4"/>',
  refresh: '<path stroke="currentColor" stroke-width="2" fill="none" d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>',
  close: '<path stroke="currentColor" stroke-width="2" fill="none" d="M18 6 6 18M6 6l12 12"/>',
  settings: '<path stroke="currentColor" stroke-width="2" fill="none" d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',

  warning: '<path stroke="currentColor" stroke-width="2" fill="none" d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01"/>',
  error: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path stroke="currentColor" stroke-width="2" fill="none" d="m15 9-6 6M9 9l6 6"/>',
  success: '<path stroke="currentColor" stroke-width="2" fill="none" d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path stroke="currentColor" stroke-width="2" fill="none" d="m9 11 3 3L22 4"/>',
  info: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path stroke="currentColor" stroke-width="2" fill="none" d="M12 16v-4M12 8h.01"/>',

  folder: '<path stroke="currentColor" stroke-width="2" fill="none" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  save: '<path stroke="currentColor" stroke-width="2" fill="none" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path stroke="currentColor" stroke-width="2" fill="none" d="M17 21v-8H7v8M7 3v5h8"/>',
  trash: '<path stroke="currentColor" stroke-width="2" fill="none" d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>',
  import: '<path stroke="currentColor" stroke-width="2" fill="none" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path stroke="currentColor" stroke-width="2" fill="none" d="M14 2v6h6M16 13H8M12 17l-4-4 4-4"/>',
  export: '<path stroke="currentColor" stroke-width="2" fill="none" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path stroke="currentColor" stroke-width="2" fill="none" d="M14 2v6h6M16 13H8M12 17l4-4-4-4"/>',

  shaded: '<path stroke="currentColor" stroke-width="2" fill="none" d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  wireframe: '<path stroke="currentColor" stroke-width="2" fill="none" d="M12 2L2 7v10l10 5 10-5V7L12 2zM12 2v20M22 7L12 12 2 7"/>',
  xray: '<path stroke="currentColor" stroke-width="2" fill="none" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>',
  section: '<path stroke="currentColor" stroke-width="2" fill="none" d="M9 12 7.31 9.31a4 4 0 0 1 0-5.66L9 2l1.69 1.69a4 4 0 0 0 5.66 0L18 2l1.69 1.69a4 4 0 0 1 0 5.66L18 12l1.69 2.31a4 4 0 0 1 0 5.66L18 22l-1.69-1.69a4 4 0 0 0-5.66 0L9 22l-1.69-1.69a4 4 0 0 1 0-5.66L9 12z"/>',
  'fit-view': '<path stroke="currentColor" stroke-width="2" fill="none" d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  zoom: '<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" fill="none"/><path stroke="currentColor" stroke-width="2" fill="none" d="m21 21-4.35-4.35"/>',
  hide: '<path stroke="currentColor" stroke-width="2" fill="none" d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/>',

  box: '<path stroke="currentColor" stroke-width="2" fill="none" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>',
  cylinder: '<ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="2" fill="none"/><path stroke="currentColor" stroke-width="2" fill="none" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3V5c0-1.66 4-3 9-3s9 1.34 9 3v7z"/>',
  sphere: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path stroke="currentColor" stroke-width="2" fill="none" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  line: '<path stroke="currentColor" stroke-width="2" fill="none" d="M5 12h14"/>',
  revolve: '<path stroke="currentColor" stroke-width="2" fill="none" d="M23 4v6h-6M1 20v-6h6"/><path stroke="currentColor" stroke-width="2" fill="none" d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10M3.5 9a9 9 0 0 1 2.12 9.36L1 14"/>',
  sweep: '<path stroke="currentColor" stroke-width="2" fill="none" d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>',
  fillet: '<path stroke="currentColor" stroke-width="2" fill="none" d="M9 14.5L12 11.5L15 14.5"/>',
  chamfer: '<path stroke="currentColor" stroke-width="2" fill="none" d="M9 15L15 9"/>',

  move: '<path stroke="currentColor" stroke-width="2" fill="none" d="M5 12h14M12 5l7 7-7 7"/>',
  rotate: '<path stroke="currentColor" stroke-width="2" fill="none" d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>',
  mirror: '<path stroke="currentColor" stroke-width="2" fill="none" d="M12 2v20M2 12h20"/>',
  pattern: '<path stroke="currentColor" stroke-width="2" fill="none" d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"/>',

  // Additional UI icons
  loader: '<path stroke="currentColor" stroke-width="2" fill="none" d="M21 12a9 9 0 1 1-6.219-8.56"/>',
  visibility: '<path stroke="currentColor" stroke-width="2" fill="none" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>',
  x: '<path stroke="currentColor" stroke-width="2" fill="none" d="M18 6 6 18M6 6l12 12"/>',
  'alert-circle': '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path stroke="currentColor" stroke-width="2" fill="none" d="M12 8v4M12 16h.01"/>',
  'chevron-up': '<path stroke="currentColor" stroke-width="2" fill="none" d="m18 15-6-6-6 6"/>',
  'chevron-down': '<path stroke="currentColor" stroke-width="2" fill="none" d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path stroke="currentColor" stroke-width="2" fill="none" d="m9 18 6-6-6-6"/>',
  computing: '<path stroke="currentColor" stroke-width="2" fill="none" d="M4 4h16v16H4V4zM8 8h8v8H8V8zM12 12h.01"/>',
  play: '<path stroke="currentColor" stroke-width="2" fill="currentColor" d="M8 5v14l11-7z"/>'
};

export const Icon: React.FC<IconProps> = ({ name, size = 16, className = '', title }) => {
  const svgPath = IconSVGs[name];

  if (!svgPath) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`icon ${className}`}
      aria-hidden={!title}
      role={title ? 'img' : 'presentation'}
    >
      {title && <title>{title}</title>}
      <g dangerouslySetInnerHTML={{ __html: svgPath }} />
    </svg>
  );
};