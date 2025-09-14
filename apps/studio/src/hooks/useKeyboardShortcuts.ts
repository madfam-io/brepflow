import { useEffect } from 'react';
import { useLayoutStore } from '../store/layout-store';
import { PanelId } from '../types/layout';

interface KeyboardShortcuts {
  [key: string]: () => void;
}

export const useKeyboardShortcuts = () => {
  const {
    togglePanelVisibility,
    minimizePanel,
    maximizePanel,
    enterFocusMode,
    exitFocusMode,
    loadPreset,
    resetToDefault,
    currentLayout,
    focusMode
  } = useLayoutStore();

  useEffect(() => {
    const shortcuts: KeyboardShortcuts = {
      // Panel visibility toggles
      'ctrl+shift+1': () => togglePanelVisibility('nodePanel'),
      'ctrl+shift+2': () => togglePanelVisibility('nodeEditor'),
      'ctrl+shift+3': () => togglePanelVisibility('viewport3d'),
      'ctrl+shift+4': () => togglePanelVisibility('inspector'),
      'ctrl+shift+5': () => togglePanelVisibility('console'),

      // Panel focus mode
      'f': () => {
        if (focusMode.focusedPanel) {
          exitFocusMode();
        } else {
          // Focus the first visible panel
          const visiblePanels = Object.entries(currentLayout.panels)
            .filter(([_, panel]) => panel.visible)
            .sort(([_, a], [__, b]) => a.order - b.order)
            .map(([id]) => id as PanelId);

          if (visiblePanels.length > 0 && visiblePanels[0]) {
            enterFocusMode(visiblePanels[0]);
          }
        }
      },

      // Quick focus shortcuts for specific panels
      'ctrl+f+1': () => enterFocusMode('nodePanel'),
      'ctrl+f+2': () => enterFocusMode('nodeEditor'),
      'ctrl+f+3': () => enterFocusMode('viewport3d'),
      'ctrl+f+4': () => enterFocusMode('inspector'),
      'ctrl+f+5': () => enterFocusMode('console'),

      // Minimize/maximize panels
      'ctrl+m+1': () => {
        const panel = currentLayout.panels.nodePanel;
        if (panel.minimized) maximizePanel('nodePanel');
        else minimizePanel('nodePanel');
      },
      'ctrl+m+2': () => {
        const panel = currentLayout.panels.nodeEditor;
        if (panel.minimized) maximizePanel('nodeEditor');
        else minimizePanel('nodeEditor');
      },
      'ctrl+m+3': () => {
        const panel = currentLayout.panels.viewport3d;
        if (panel.minimized) maximizePanel('viewport3d');
        else minimizePanel('viewport3d');
      },
      'ctrl+m+4': () => {
        const panel = currentLayout.panels.inspector;
        if (panel.minimized) maximizePanel('inspector');
        else minimizePanel('inspector');
      },
      'ctrl+m+5': () => {
        const panel = currentLayout.panels.console;
        if (panel.minimized) maximizePanel('console');
        else minimizePanel('console');
      },

      // Layout presets
      'ctrl+alt+1': () => loadPreset('guided'),
      'ctrl+alt+2': () => loadPreset('professional'),
      'ctrl+alt+3': () => loadPreset('modeling'),
      'ctrl+alt+4': () => loadPreset('nodeFocused'),

      // Reset layout
      'ctrl+alt+0': () => resetToDefault(),

      // Exit focus mode
      'escape': () => {
        if (focusMode.focusedPanel) {
          exitFocusMode();
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement ||
          (event.target as HTMLElement).contentEditable === 'true') {
        return;
      }

      // Build shortcut key string
      const parts: string[] = [];
      if (event.ctrlKey) parts.push('ctrl');
      if (event.altKey) parts.push('alt');
      if (event.shiftKey) parts.push('shift');
      if (event.metaKey) parts.push('meta');

      // Add the main key
      const key = event.key.toLowerCase();
      parts.push(key);

      const shortcut = parts.join('+');

      if (shortcuts[shortcut]) {
        event.preventDefault();
        shortcuts[shortcut]();
      }
    };

    // Add global shortcut listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    togglePanelVisibility,
    minimizePanel,
    maximizePanel,
    enterFocusMode,
    exitFocusMode,
    loadPreset,
    resetToDefault,
    currentLayout,
    focusMode
  ]);

  // Return shortcut info for help display
  return {
    shortcuts: {
      panel_visibility: {
        description: 'Toggle panel visibility',
        shortcuts: [
          'Ctrl+Shift+1 - Node Panel',
          'Ctrl+Shift+2 - Node Editor',
          'Ctrl+Shift+3 - 3D Viewport',
          'Ctrl+Shift+4 - Inspector',
          'Ctrl+Shift+5 - Console'
        ]
      },
      panel_focus: {
        description: 'Focus panels',
        shortcuts: [
          'F - Toggle focus mode',
          'Ctrl+F+1-5 - Focus specific panel',
          'Escape - Exit focus mode'
        ]
      },
      panel_minimize: {
        description: 'Minimize/maximize panels',
        shortcuts: [
          'Ctrl+M+1-5 - Toggle panel minimize'
        ]
      },
      layout_presets: {
        description: 'Switch layout presets',
        shortcuts: [
          'Ctrl+Alt+1 - Guided layout',
          'Ctrl+Alt+2 - Professional layout',
          'Ctrl+Alt+3 - Modeling layout',
          'Ctrl+Alt+4 - Node-focused layout',
          'Ctrl+Alt+0 - Reset to default'
        ]
      }
    }
  };
};