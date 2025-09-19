import React from 'react';
import { useGraphStore } from '../store/graph-store';
import { Button } from './ui/Button';
import './Toolbar.css';

export function Toolbar() {
  const {
    evaluateGraph,
    clearGraph,
    exportGraph,
    importGraph,
  } = useGraphStore();

  const handleEvaluate = () => {
    evaluateGraph();
  };

  const handleClear = () => {
    if (window.confirm('Clear all nodes and edges?')) {
      clearGraph();
    }
  };

  const handleExport = () => {
    const graph = useGraphStore.getState().graph;
    const json = JSON.stringify(graph, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'graph.bflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.bflow.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
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
      }
    };
    input.click();
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <Button
          onClick={handleEvaluate}
          variant="primary"
          icon="play"
          size="md"
        >
          Evaluate
        </Button>
      </div>

      <div className="toolbar-group">
        <Button
          onClick={handleImport}
          variant="secondary"
          icon="upload"
          size="md"
        >
          Import
        </Button>
        <Button
          onClick={handleExport}
          variant="secondary"
          icon="download"
          size="md"
        >
          Export
        </Button>
      </div>

      <div className="toolbar-group">
        <Button
          onClick={handleClear}
          variant="danger"
          icon="trash-2"
          size="md"
        >
          Clear
        </Button>
      </div>

      <div className="toolbar-info">
        <span>BrepFlow Studio v0.1.0</span>
      </div>
    </div>
  );
}