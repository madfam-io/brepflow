import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act } from '@testing-library/react';
import { useGraphStore } from './graph-store';
import type { NodeInstance, Edge } from '@brepflow/types';

describe('GraphStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    const store = useGraphStore.getState();
    store.clearGraph();
  });

  describe('Graph Operations', () => {
    it('should initialize with empty graph', () => {
      const store = useGraphStore.getState();
      expect(store.graph.nodes).toHaveLength(0);
      expect(store.graph.edges).toHaveLength(0);
      expect(store.graph.units).toBe('mm');
      expect(store.graph.tolerance).toBe(0.001);
    });

    it('should add a node', () => {
      const store = useGraphStore.getState();

      const nodeData = {
        type: 'Solid::Box',
        position: { x: 100, y: 200 },
        params: { width: 100, height: 100, depth: 100 }
      };

      const node = store.addNode(nodeData);

      expect(node).toBeDefined();
      expect(node.id).toBeTruthy();
      expect(node.type).toBe('Solid::Box');
      expect(node.position).toEqual({ x: 100, y: 200 });
      expect(node.params).toEqual({ width: 100, height: 100, depth: 100 });

      expect(store.graph.nodes).toHaveLength(1);
      expect(store.graph.nodes[0]).toEqual(node);
    });

    it('should remove a node', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Cylinder',
        position: { x: 50, y: 50 },
        params: { radius: 50, height: 100 }
      });

      expect(store.graph.nodes).toHaveLength(1);

      store.removeNode(node.id);

      expect(store.graph.nodes).toHaveLength(0);
    });

    it('should update a node', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Sphere',
        position: { x: 0, y: 0 },
        params: { radius: 25 }
      });

      store.updateNode(node.id, {
        position: { x: 100, y: 100 },
        params: { radius: 50 }
      });

      const updatedNode = store.graph.nodes.find(n => n.id === node.id);
      expect(updatedNode?.position).toEqual({ x: 100, y: 100 });
      expect(updatedNode?.params).toEqual({ radius: 50 });
    });

    it('should add an edge between nodes', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 }
      });

      const node2 = store.addNode({
        type: 'Boolean::Union',
        position: { x: 200, y: 0 }
      });

      const edge = store.addEdge({
        source: node1.id,
        sourceHandle: 'output',
        target: node2.id,
        targetHandle: 'input'
      });

      expect(edge).toBeDefined();
      expect(edge.id).toBeTruthy();
      expect(edge.source).toBe(node1.id);
      expect(edge.target).toBe(node2.id);

      expect(store.graph.edges).toHaveLength(1);
    });

    it('should remove an edge', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Boolean::Union', position: { x: 200, y: 0 } });

      const edge = store.addEdge({
        source: node1.id,
        sourceHandle: 'output',
        target: node2.id,
        targetHandle: 'input'
      });

      expect(store.graph.edges).toHaveLength(1);

      store.removeEdge(edge.id);

      expect(store.graph.edges).toHaveLength(0);
    });

    it('should clear the graph', () => {
      const store = useGraphStore.getState();

      // Add some nodes and edges
      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Solid::Cylinder', position: { x: 100, y: 0 } });
      store.addEdge({
        source: node1.id,
        sourceHandle: 'output',
        target: node2.id,
        targetHandle: 'input'
      });

      expect(store.graph.nodes.length).toBeGreaterThan(0);
      expect(store.graph.edges.length).toBeGreaterThan(0);

      store.clearGraph();

      expect(store.graph.nodes).toHaveLength(0);
      expect(store.graph.edges).toHaveLength(0);
      expect(store.selectedNodes.size).toBe(0);
    });
  });

  describe('Selection Operations', () => {
    it('should select a single node', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 }
      });

      store.selectNode(node.id);

      expect(store.selectedNodes.has(node.id)).toBe(true);
      expect(store.selectedNodes.size).toBe(1);
    });

    it('should select multiple nodes', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Solid::Cylinder', position: { x: 100, y: 0 } });
      const node3 = store.addNode({ type: 'Solid::Sphere', position: { x: 200, y: 0 } });

      store.selectNodes([node1.id, node2.id, node3.id]);

      expect(store.selectedNodes.size).toBe(3);
      expect(store.selectedNodes.has(node1.id)).toBe(true);
      expect(store.selectedNodes.has(node2.id)).toBe(true);
      expect(store.selectedNodes.has(node3.id)).toBe(true);
    });

    it('should deselect a node', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Solid::Cylinder', position: { x: 100, y: 0 } });

      store.selectNodes([node1.id, node2.id]);
      expect(store.selectedNodes.size).toBe(2);

      store.deselectNode(node1.id);

      expect(store.selectedNodes.size).toBe(1);
      expect(store.selectedNodes.has(node1.id)).toBe(false);
      expect(store.selectedNodes.has(node2.id)).toBe(true);
    });

    it('should clear selection', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Solid::Cylinder', position: { x: 100, y: 0 } });

      store.selectNodes([node1.id, node2.id]);
      expect(store.selectedNodes.size).toBe(2);

      store.clearSelection();

      expect(store.selectedNodes.size).toBe(0);
    });

    it('should set hovered node', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 }
      });

      store.setHoveredNode(node.id);
      expect(store.hoveredNode).toBe(node.id);

      store.setHoveredNode(null);
      expect(store.hoveredNode).toBe(null);
    });
  });

  describe('Undo/Redo Operations', () => {
    it('should undo node addition', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Box',
        position: { x: 100, y: 100 },
        params: { width: 100, height: 100, depth: 100 }
      });

      expect(store.graph.nodes).toHaveLength(1);
      expect(store.canUndo()).toBe(true);

      store.undo();

      expect(store.graph.nodes).toHaveLength(0);
      expect(store.canUndo()).toBe(false);
      expect(store.canRedo()).toBe(true);
    });

    it('should redo node addition', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Box',
        position: { x: 100, y: 100 }
      });

      store.undo();
      expect(store.graph.nodes).toHaveLength(0);

      store.redo();

      expect(store.graph.nodes).toHaveLength(1);
      expect(store.graph.nodes[0].type).toBe('Solid::Box');
    });

    it('should undo node removal', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Cylinder',
        position: { x: 50, y: 50 }
      });

      const nodeId = node.id;
      store.removeNode(nodeId);

      expect(store.graph.nodes).toHaveLength(0);

      store.undo();

      expect(store.graph.nodes).toHaveLength(1);
      expect(store.graph.nodes[0].id).toBe(nodeId);
    });

    it('should undo node update', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Sphere',
        position: { x: 0, y: 0 },
        params: { radius: 25 }
      });

      const originalParams = { ...node.params };

      store.updateNode(node.id, {
        params: { radius: 50 }
      });

      expect(store.graph.nodes[0].params).toEqual({ radius: 50 });

      store.undo();

      expect(store.graph.nodes[0].params).toEqual(originalParams);
    });

    it('should undo edge addition', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Boolean::Union', position: { x: 200, y: 0 } });

      const edge = store.addEdge({
        source: node1.id,
        sourceHandle: 'output',
        target: node2.id,
        targetHandle: 'input'
      });

      expect(store.graph.edges).toHaveLength(1);

      store.undo();

      expect(store.graph.edges).toHaveLength(0);
    });

    it('should undo edge removal', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Boolean::Union', position: { x: 200, y: 0 } });

      const edge = store.addEdge({
        source: node1.id,
        sourceHandle: 'output',
        target: node2.id,
        targetHandle: 'input'
      });

      const edgeId = edge.id;
      store.removeEdge(edgeId);

      expect(store.graph.edges).toHaveLength(0);

      store.undo();

      expect(store.graph.edges).toHaveLength(1);
      expect(store.graph.edges[0].id).toBe(edgeId);
    });

    it('should handle multiple undo/redo operations', () => {
      const store = useGraphStore.getState();

      // Perform multiple operations
      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Solid::Cylinder', position: { x: 100, y: 0 } });
      const edge = store.addEdge({
        source: node1.id,
        sourceHandle: 'output',
        target: node2.id,
        targetHandle: 'input'
      });

      expect(store.graph.nodes).toHaveLength(2);
      expect(store.graph.edges).toHaveLength(1);

      // Undo all operations
      store.undo(); // Undo edge
      expect(store.graph.edges).toHaveLength(0);

      store.undo(); // Undo node2
      expect(store.graph.nodes).toHaveLength(1);

      store.undo(); // Undo node1
      expect(store.graph.nodes).toHaveLength(0);

      // Redo all operations
      store.redo(); // Redo node1
      expect(store.graph.nodes).toHaveLength(1);

      store.redo(); // Redo node2
      expect(store.graph.nodes).toHaveLength(2);

      store.redo(); // Redo edge
      expect(store.graph.edges).toHaveLength(1);
    });

    it('should clear undo history when clearing graph', () => {
      const store = useGraphStore.getState();

      store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      expect(store.canUndo()).toBe(true);

      store.clearGraph();

      expect(store.canUndo()).toBe(false);
      expect(store.canRedo()).toBe(false);
    });
  });

  describe('File Operations', () => {
    it('should export and import graph', () => {
      const store = useGraphStore.getState();

      // Create a graph
      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Solid::Cylinder', position: { x: 100, y: 0 } });
      store.addEdge({
        source: node1.id,
        sourceHandle: 'output',
        target: node2.id,
        targetHandle: 'input'
      });

      // Export graph
      const exportedGraph = store.exportGraph();
      expect(exportedGraph.nodes).toHaveLength(2);
      expect(exportedGraph.edges).toHaveLength(1);

      // Clear and import
      store.clearGraph();
      expect(store.graph.nodes).toHaveLength(0);

      store.importGraph(exportedGraph);
      expect(store.graph.nodes).toHaveLength(2);
      expect(store.graph.edges).toHaveLength(1);
    });

    it('should save and load graph as JSON', () => {
      const store = useGraphStore.getState();

      // Create a graph
      store.addNode({ type: 'Solid::Box', position: { x: 50, y: 50 } });
      store.addNode({ type: 'Solid::Sphere', position: { x: 150, y: 150 } });

      // Save as JSON
      const json = store.saveGraph();
      expect(typeof json).toBe('string');

      // Parse and verify
      const parsed = JSON.parse(json);
      expect(parsed.nodes).toHaveLength(2);
      expect(parsed.version).toBe('0.1.0');

      // Clear and load
      store.clearGraph();
      store.loadGraph(json);

      expect(store.graph.nodes).toHaveLength(2);
    });
  });

  describe('Error Handling', () => {
    it('should manage node errors', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });

      store.setError(node.id, 'Invalid parameters');

      expect(store.errors.has(node.id)).toBe(true);
      expect(store.errors.get(node.id)).toBe('Invalid parameters');

      store.clearErrors();

      expect(store.errors.size).toBe(0);
    });

    it('should handle invalid graph loading gracefully', () => {
      const store = useGraphStore.getState();
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      store.loadGraph('invalid json');

      // Should not throw, just log error
      expect(consoleSpy).toHaveBeenCalled();
      expect(store.graph.nodes).toHaveLength(0);

      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    it('should handle removing non-existent node', () => {
      const store = useGraphStore.getState();

      // Should not throw
      expect(() => store.removeNode('non-existent-id')).not.toThrow();
    });

    it('should handle removing non-existent edge', () => {
      const store = useGraphStore.getState();

      // Should not throw
      expect(() => store.removeEdge('non-existent-id')).not.toThrow();
    });

    it('should handle updating non-existent node', () => {
      const store = useGraphStore.getState();

      // Should not throw
      expect(() => store.updateNode('non-existent-id', { position: { x: 0, y: 0 } })).not.toThrow();
    });

    it('should remove connected edges when removing node', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({ type: 'Solid::Box', position: { x: 0, y: 0 } });
      const node2 = store.addNode({ type: 'Solid::Cylinder', position: { x: 100, y: 0 } });
      const node3 = store.addNode({ type: 'Boolean::Union', position: { x: 200, y: 0 } });

      const edge1 = store.addEdge({
        source: node1.id,
        sourceHandle: 'output',
        target: node2.id,
        targetHandle: 'input'
      });

      const edge2 = store.addEdge({
        source: node2.id,
        sourceHandle: 'output',
        target: node3.id,
        targetHandle: 'input'
      });

      expect(store.graph.edges).toHaveLength(2);

      // Remove middle node - should also remove connected edges
      store.removeNode(node2.id);

      expect(store.graph.nodes).toHaveLength(2);
      expect(store.graph.edges).toHaveLength(0); // Both edges should be removed
    });
  });
});