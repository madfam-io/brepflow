import React from 'react';
import { useGraphStore } from '../store/graph-store';
import { Button } from './ui/Button';
import { exportGeometry, downloadFile, isExportAvailable } from '../services/wasm-export';
import './Toolbar.css';

export function Toolbar() {
  const {
    evaluateGraph,
    clearGraph,
    exportGraph,
    importGraph,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useGraphStore();

  const [exportFormat, setExportFormat] = React.useState<'bflow' | 'step' | 'stl' | 'iges'>('bflow');
  const [showExportMenu, setShowExportMenu] = React.useState(false);

  const handleEvaluate = () => {
    evaluateGraph();
  };

  const handleClear = () => {
    if (window.confirm('Clear all nodes and edges? This cannot be undone.')) {
      clearGraph();
    }
  };

  const handleExportBflow = () => {
    const graph = useGraphStore.getState().graph;
    const json = JSON.stringify(graph, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-${Date.now()}.bflow.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCAD = async (format: 'step' | 'stl' | 'iges') => {
    try {
      const graph = useGraphStore.getState().graph;
      const dagEngine = useGraphStore.getState().dagEngine;

      // Find geometry outputs from DAG engine evaluation
      const geometryOutputs = dagEngine ?
        Array.from((dagEngine as any).evaluationCache?.values() || [])
          .filter((result: any) => result?.outputs?.shape || result?.outputs?.shapes)
          .map((result: any) => result.outputs.shape || result.outputs.shapes)
          .flat()
          .filter(Boolean) : [];

      if (geometryOutputs.length === 0) {
        alert('No geometry to export. Please evaluate the graph first.');
        return;
      }

      // Check if real geometry is available
      const exportAvailable = await isExportAvailable();
      if (!exportAvailable) {
        // Show helpful message while WASM loads
        const formatName = format.toUpperCase();
        alert(`${formatName} export requires the geometry engine to be initialized.\n\nPlease wait a moment and try again, or refresh the page.`);
        return;
      }

      // Show exporting status
      const toast = document.createElement('div');
      toast.className = 'toolbar-toast';
      toast.textContent = `Exporting to ${format.toUpperCase()}...`;
      document.body.appendChild(toast);

      try {
        // Export geometry using WASM
        const blob = await exportGeometry(geometryOutputs, {
          format,
          binary: format === 'stl', // Use binary for STL
          precision: 0.1
        });

        // Download the file
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `brepflow-export-${timestamp}.${format}`;
        downloadFile(blob, filename);

        // Update toast to success
        toast.textContent = `✅ Exported to ${format.toUpperCase()}`;
        toast.style.background = 'var(--color-success)';
        setTimeout(() => toast.remove(), 3000);

      } catch (exportError) {
        toast.remove();
        console.error(`Export to ${format} failed:`, exportError);
        
        // Provide helpful error message
        if (exportError.message?.includes('not yet implemented')) {
          alert(`${format.toUpperCase()} export is coming soon!\n\nThe geometry engine is loaded but this specific format is still being implemented.`);
        } else if (exportError.message?.includes('not initialized')) {
          alert(`The geometry engine is still initializing. Please wait a moment and try again.`);
        } else {
          alert(`Export failed: ${exportError.message}`);
        }
      }

    } catch (err) {
      console.error(`Export to ${format} failed:`, err);
      alert(`Export failed: ${err.message}`);
    }
  };;

  const handleExport = () => {
    setShowExportMenu(!showExportMenu);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.bflow.json,.step,.stp,.iges,.igs,.stl';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const extension = file.name.split('.').pop()?.toLowerCase();
        
        if (extension === 'json' || extension === 'bflow') {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const graph = JSON.parse(e.target?.result as string);
              importGraph(graph);
            } catch (err) {
              alert('Invalid graph file');
            }
          };
          reader.readAsText(file);
        } else if (['step', 'stp', 'iges', 'igs', 'stl'].includes(extension || '')) {
          alert(`Import of ${extension?.toUpperCase()} files will be available once WASM geometry core is integrated.`);
          // TODO: When WASM is ready:
          // const geometry = await window.occtWorker.importGeometry(file);
          // createImportNode(geometry);
        }
      }
    };
    input.click();
  };

  const handleSave = () => {
    const graph = useGraphStore.getState().graph;
    localStorage.setItem('brepflow_autosave', JSON.stringify(graph));
    localStorage.setItem('brepflow_autosave_time', Date.now().toString());
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'toolbar-toast';
    toast.textContent = 'Project saved locally';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('brepflow_autosave');
    if (saved) {
      try {
        const graph = JSON.parse(saved);
        const time = localStorage.getItem('brepflow_autosave_time');
        const date = time ? new Date(parseInt(time)).toLocaleString() : 'unknown';
        
        if (window.confirm(`Load autosaved project from ${date}?`)) {
          importGraph(graph);
        }
      } catch (err) {
        alert('Failed to load saved project');
      }
    } else {
      alert('No saved project found');
    }
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Z: Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) undo();
      }
      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y: Redo
      if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
          ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault();
        if (canRedo()) redo();
      }
      // Ctrl/Cmd + S: Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      // Ctrl/Cmd + O: Open
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        handleImport();
      }
      // Ctrl/Cmd + E: Evaluate
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        handleEvaluate();
      }
      // Delete: Clear selection
      if (e.key === 'Delete' && !e.ctrlKey && !e.metaKey) {
        // TODO: Delete selected nodes
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo]);

  // Auto-save every 30 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      handleSave();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <Button
          onClick={handleEvaluate}
          variant="primary"
          icon="play"
          size="md"
          title="Evaluate Graph (Ctrl+E)"
        >
          Evaluate
        </Button>
      </div>

      <div className="toolbar-group">
        <Button
          onClick={() => undo()}
          variant="secondary"
          icon="undo"
          size="md"
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          Undo
        </Button>
        <Button
          onClick={() => redo()}
          variant="secondary"
          icon="redo"
          size="md"
          disabled={!canRedo}
          title="Redo (Ctrl+Shift+Z)"
        >
          Redo
        </Button>
      </div>

      <div className="toolbar-group">
        <Button
          onClick={handleSave}
          variant="secondary"
          icon="save"
          size="md"
          title="Save to Browser (Ctrl+S)"
        >
          Save
        </Button>
        <Button
          onClick={handleLoad}
          variant="secondary"
          icon="folder-open"
          size="md"
          title="Load from Browser"
        >
          Load
        </Button>
      </div>

      <div className="toolbar-group">
        <Button
          onClick={handleImport}
          variant="secondary"
          icon="upload"
          size="md"
          title="Import File (Ctrl+O)"
        >
          Import
        </Button>
        <div className="toolbar-dropdown">
          <Button
            onClick={handleExport}
            variant="secondary"
            icon="download"
            size="md"
            title="Export File"
          >
            Export ▼
          </Button>
          {showExportMenu && (
            <div className="toolbar-dropdown-menu">
              <button onClick={() => { handleExportBflow(); setShowExportMenu(false); }}>
                BrepFlow (.bflow.json)
              </button>
              <button onClick={() => { handleExportCAD('step'); setShowExportMenu(false); }}>
                STEP (.step)
              </button>
              <button onClick={() => { handleExportCAD('stl'); setShowExportMenu(false); }}>
                STL (.stl)
              </button>
              <button onClick={() => { handleExportCAD('iges'); setShowExportMenu(false); }}>
                IGES (.iges)
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="toolbar-group">
        <Button
          onClick={handleClear}
          variant="danger"
          icon="trash-2"
          size="md"
          title="Clear All"
        >
          Clear
        </Button>
      </div>

      <div className="toolbar-info">
        <span className="toolbar-shortcuts" title="Press '?' for keyboard shortcuts">
          ⌨️ Shortcuts
        </span>
        <span>BrepFlow Studio v0.1.0</span>
      </div>
    </div>
  );
}