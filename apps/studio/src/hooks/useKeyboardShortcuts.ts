import { useEffect, useState, useCallback, useRef } from 'react';
import { useLayoutStore } from '../store/layout-store';
import { PanelId } from '../types/layout';
import { useGraphStore } from '../store/graph-store';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  description: string;
  category: string;
  action: () => void;
  global?: boolean;
}

export interface ShortcutContext {
  name: string;
  shortcuts: KeyboardShortcut[];
  priority: number;
}

class KeyboardShortcutManager {
  private contexts: Map<string, ShortcutContext> = new Map();
  private globalShortcuts: Map<string, KeyboardShortcut> = new Map();
  private activeContext: string | null = null;
  private listeners: Set<(shortcuts: KeyboardShortcut[]) => void> = new Set();
  private actionCallbacks: Map<string, () => void> = new Map();

  constructor() {
    this.initializeGlobalShortcuts();
    this.bindEvents();
  }

  private initializeGlobalShortcuts(): void {
    const globalShortcuts: KeyboardShortcut[] = [
      {
        key: 'z',
        ctrl: true,
        description: 'Undo last action',
        category: 'Edit',
        action: () => this.triggerGlobalAction('undo'),
        global: true,
      },
      {
        key: 'y',
        ctrl: true,
        description: 'Redo last action',
        category: 'Edit',
        action: () => this.triggerGlobalAction('redo'),
        global: true,
      },
      {
        key: 'a',
        ctrl: true,
        description: 'Select all',
        category: 'Selection',
        action: () => this.triggerGlobalAction('selectAll'),
        global: true,
      },
      {
        key: 'c',
        ctrl: true,
        description: 'Copy selection',
        category: 'Edit',
        action: () => this.triggerGlobalAction('copy'),
        global: true,
      },
      {
        key: 'v',
        ctrl: true,
        description: 'Paste',
        category: 'Edit',
        action: () => this.triggerGlobalAction('paste'),
        global: true,
      },
      {
        key: 'Delete',
        description: 'Delete selection',
        category: 'Edit',
        action: () => this.triggerGlobalAction('delete'),
        global: true,
      },
      {
        key: 'Escape',
        description: 'Cancel current operation',
        category: 'Navigation',
        action: () => this.triggerGlobalAction('cancel'),
        global: true,
      },
    ];

    for (const shortcut of globalShortcuts) {
      this.globalShortcuts.set(this.getShortcutKey(shortcut), shortcut);
    }
  }

  private bindEvents(): void {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.isTypingContext(event.target as Element)) {
      return;
    }

    const shortcutKey = this.getEventKey(event);

    // Check active context first
    if (this.activeContext) {
      const context = this.contexts.get(this.activeContext);
      if (context) {
        const contextShortcut = context.shortcuts.find(s =>
          this.getShortcutKey(s) === shortcutKey
        );
        if (contextShortcut) {
          event.preventDefault();
          event.stopPropagation();
          contextShortcut.action();
          return;
        }
      }
    }

    // Check global shortcuts
    const globalShortcut = this.globalShortcuts.get(shortcutKey);
    if (globalShortcut) {
      event.preventDefault();
      event.stopPropagation();
      globalShortcut.action();
    }
  }

  private isTypingContext(target: Element | null): boolean {
    if (!target) return false;

    const tagName = target.tagName.toLowerCase();
    const contentEditable = (target as HTMLElement).contentEditable;

    return (
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      contentEditable === 'true' ||
      target.closest('[contenteditable="true"]') !== null
    );
  }

  private getEventKey(event: KeyboardEvent): string {
    const modifiers = [];
    if (event.ctrlKey || event.metaKey) modifiers.push('ctrl');
    if (event.shiftKey) modifiers.push('shift');
    if (event.altKey) modifiers.push('alt');

    return [...modifiers, event.key].join('+');
  }

  private getShortcutKey(shortcut: KeyboardShortcut): string {
    const modifiers = [];
    if (shortcut.ctrl || shortcut.meta) modifiers.push('ctrl');
    if (shortcut.shift) modifiers.push('shift');
    if (shortcut.alt) modifiers.push('alt');

    return [...modifiers, shortcut.key].join('+');
  }

  private triggerGlobalAction(action: string): void {
    const callback = this.actionCallbacks.get(action);
    if (callback) {
      callback();
    }
  }

  registerActionCallback(action: string, callback: () => void): void {
    this.actionCallbacks.set(action, callback);
  }

  unregisterActionCallback(action: string): void {
    this.actionCallbacks.delete(action);
  }

  registerContext(context: ShortcutContext): void {
    this.contexts.set(context.name, context);
    this.notifyListeners();
  }

  unregisterContext(name: string): void {
    this.contexts.delete(name);
    if (this.activeContext === name) {
      this.activeContext = null;
    }
    this.notifyListeners();
  }

  setActiveContext(name: string | null): void {
    this.activeContext = name;
    this.notifyListeners();
  }

  getActiveShortcuts(): KeyboardShortcut[] {
    const shortcuts: KeyboardShortcut[] = [];

    shortcuts.push(...Array.from(this.globalShortcuts.values()));

    if (this.activeContext) {
      const context = this.contexts.get(this.activeContext);
      if (context) {
        shortcuts.push(...context.shortcuts);
      }
    }

    return shortcuts;
  }

  getAllShortcuts(): { [category: string]: KeyboardShortcut[] } {
    const shortcuts = this.getActiveShortcuts();
    const grouped: { [category: string]: KeyboardShortcut[] } = {};

    for (const shortcut of shortcuts) {
      if (!grouped[shortcut.category]) {
        grouped[shortcut.category] = [];
      }
      grouped[shortcut.category].push(shortcut);
    }

    return grouped;
  }

  subscribe(listener: (shortcuts: KeyboardShortcut[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const shortcuts = this.getActiveShortcuts();
    for (const listener of this.listeners) {
      listener(shortcuts);
    }
  }
}

// Global instance
export const shortcutManager = new KeyboardShortcutManager();

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

  const {
    evaluateGraph,
    clearGraph,
    selectedNodes,
    removeNode,
    removeEdge,
    graph,
    undo,
    redo
  } = useGraphStore();

  // Register global actions
  useEffect(() => {
    shortcutManager.registerActionCallback('undo', () => {
      undo();
      console.log('Undo action triggered');
    });

    shortcutManager.registerActionCallback('redo', () => {
      redo();
      console.log('Redo action triggered');
    });

    shortcutManager.registerActionCallback('selectAll', () => {
      // TODO: Implement select all nodes
      console.log('Select all action triggered');
    });

    shortcutManager.registerActionCallback('copy', () => {
      // TODO: Implement copy selected nodes
      console.log('Copy action triggered');
    });

    shortcutManager.registerActionCallback('paste', () => {
      // TODO: Implement paste nodes
      console.log('Paste action triggered');
    });

    shortcutManager.registerActionCallback('delete', () => {
      // Delete selected nodes and their connected edges
      if (selectedNodes.size > 0) {
        // First, find and remove edges connected to selected nodes
        const edgesToRemove = graph.edges.filter(edge =>
          selectedNodes.has(edge.source) || selectedNodes.has(edge.target)
        );

        edgesToRemove.forEach(edge => removeEdge(edge.id));

        // Then remove the nodes
        selectedNodes.forEach(nodeId => removeNode(nodeId));

        console.log(`Deleted ${selectedNodes.size} nodes and ${edgesToRemove.length} edges`);
      }
    });

    shortcutManager.registerActionCallback('cancel', () => {
      if (focusMode.focusedPanel) {
        exitFocusMode();
      }
    });

    return () => {
      shortcutManager.unregisterActionCallback('undo');
      shortcutManager.unregisterActionCallback('redo');
      shortcutManager.unregisterActionCallback('selectAll');
      shortcutManager.unregisterActionCallback('copy');
      shortcutManager.unregisterActionCallback('paste');
      shortcutManager.unregisterActionCallback('delete');
      shortcutManager.unregisterActionCallback('cancel');
    };
  }, [focusMode, exitFocusMode, selectedNodes, removeNode, removeEdge, graph, undo, redo]);

  useEffect(() => {
    // Register layout shortcuts context
    const layoutShortcuts: KeyboardShortcut[] = [
      {
        key: '1',
        ctrl: true,
        shift: true,
        description: 'Toggle Node Panel',
        category: 'Panels',
        action: () => togglePanelVisibility('nodePanel'),
      },
      {
        key: '2',
        ctrl: true,
        shift: true,
        description: 'Toggle Node Editor',
        category: 'Panels',
        action: () => togglePanelVisibility('nodeEditor'),
      },
      {
        key: '3',
        ctrl: true,
        shift: true,
        description: 'Toggle 3D Viewport',
        category: 'Panels',
        action: () => togglePanelVisibility('viewport3d'),
      },
      {
        key: '4',
        ctrl: true,
        shift: true,
        description: 'Toggle Inspector',
        category: 'Panels',
        action: () => togglePanelVisibility('inspector'),
      },
      {
        key: '5',
        ctrl: true,
        shift: true,
        description: 'Toggle Console',
        category: 'Panels',
        action: () => togglePanelVisibility('console'),
      },
      {
        key: 'F5',
        description: 'Evaluate Graph',
        category: 'Graph',
        action: () => evaluateGraph(),
      },
      {
        key: 'f',
        description: 'Toggle Focus Mode',
        category: 'View',
        action: () => {
          if (focusMode.focusedPanel) {
            exitFocusMode();
          } else {
            const visiblePanels = Object.entries(currentLayout.panels)
              .filter(([_, panel]) => panel.visible)
              .sort(([_, a], [__, b]) => a.order - b.order)
              .map(([id]) => id as PanelId);

            if (visiblePanels.length > 0 && visiblePanels[0]) {
              enterFocusMode(visiblePanels[0]);
            }
          }
        },
      },
    ];

    const layoutContext: ShortcutContext = {
      name: 'layout',
      shortcuts: layoutShortcuts,
      priority: 1,
    };

    shortcutManager.registerContext(layoutContext);
    shortcutManager.setActiveContext('layout');

    return () => {
      shortcutManager.unregisterContext('layout');
    };

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
  }, [
    togglePanelVisibility,
    minimizePanel,
    maximizePanel,
    enterFocusMode,
    exitFocusMode,
    loadPreset,
    resetToDefault,
    currentLayout,
    focusMode,
    evaluateGraph,
    clearGraph
  ]);

  const [currentShortcuts, setCurrentShortcuts] = useState<KeyboardShortcut[]>([]);

  useEffect(() => {
    const unsubscribe = shortcutManager.subscribe(setCurrentShortcuts);
    return unsubscribe;
  }, []);

  return {
    shortcuts: shortcutManager.getAllShortcuts(),
    currentShortcuts,
    manager: shortcutManager
  };
};

/**
 * Hook for using keyboard shortcuts in specific contexts
 */
export function useContextualShortcuts(
  shortcuts: KeyboardShortcut[] = [],
  contextName?: string
): {
  shortcuts: KeyboardShortcut[];
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  setContext: (name: string | null) => void;
} {
  const contextRef = useRef<string | null>(null);

  useEffect(() => {
    if (contextName && shortcuts.length > 0) {
      const context: ShortcutContext = {
        name: contextName,
        shortcuts,
        priority: 1,
      };

      shortcutManager.registerContext(context);
      contextRef.current = contextName;

      return () => {
        shortcutManager.unregisterContext(contextName);
      };
    }
  }, [contextName, shortcuts]);

  const registerShortcut = useCallback((shortcut: KeyboardShortcut) => {
    if (contextRef.current) {
      const context = shortcutManager.contexts.get(contextRef.current);
      if (context) {
        context.shortcuts.push(shortcut);
      }
    }
  }, []);

  const setContext = useCallback((name: string | null) => {
    shortcutManager.setActiveContext(name);
  }, []);

  const [currentShortcuts, setCurrentShortcuts] = useState<KeyboardShortcut[]>([]);

  useEffect(() => {
    const unsubscribe = shortcutManager.subscribe(setCurrentShortcuts);
    return unsubscribe;
  }, []);

  return {
    shortcuts: currentShortcuts,
    registerShortcut,
    setContext,
  };
};