import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act } from '@testing-library/react';
import { useGraphStore } from './graph-store';
import type { NodeInstance, Edge } from '@brepflow/types';

describe('GraphStore', () => {
  beforeEach(() => {
    // Get a fresh store instance
    const store = useGraphStore.getState();

    // Use the store's clearGraph method if it exists
    if (store.clearGraph) {
      store.clearGraph();
    }
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
        params: { width: 100, height: 100, depth: 100 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } }
      };

      const node = store.addNode(nodeData);

      expect(node).toBeDefined();
      expect(node.id).toBeTruthy();
      expect(node.type).toBe('Solid::Box');
      expect(node.position).toEqual({ x: 100, y: 200 });
      expect(node.params).toEqual({ width: 100, height: 100, depth: 100 });

      // Update the state and check again
      const updatedStore = useGraphStore.getState();
      expect(updatedStore.graph.nodes).toHaveLength(1);
      expect(updatedStore.graph.nodes[0]).toEqual(node);
    });

    it('should remove a node', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Cylinder',
        position: { x: 50, y: 50 },
        params: { radius: 50, height: 100 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } }
      });

      // Get fresh state after adding
      let currentStore = useGraphStore.getState();
      expect(currentStore.graph.nodes).toHaveLength(1);

      store.removeNode(node.id);

      // Get fresh state after removing
      currentStore = useGraphStore.getState();
      expect(currentStore.graph.nodes).toHaveLength(0);
    });

    it('should update a node', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Sphere',
        position: { x: 0, y: 0 },
        params: { radius: 25 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } }
      });

      store.updateNode(node.id, {
        position: { x: 100, y: 100 },
        params: { radius: 50 }
      });

      const currentStore = useGraphStore.getState();
      const updatedNode = currentStore.graph.nodes.find(n => n.id === node.id);
      expect(updatedNode?.position).toEqual({ x: 100, y: 100 });
      expect(updatedNode?.params).toEqual({ radius: 50 });
    });

    it('should add an edge between nodes', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: { width: 100, height: 100, depth: 100 }
      });

      const node2 = store.addNode({
        type: 'Boolean::Union',
        position: { x: 200, y: 0 },
        inputs: { a: { type: 'Shape' }, b: { type: 'Shape' } },
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      const edge = store.addEdge({
        source: node1.id,
        sourceHandle: 'shape',
        target: node2.id,
        targetHandle: 'a'
      });

      expect(edge).toBeDefined();
      expect(edge.id).toBeTruthy();
      expect(edge.source).toBe(node1.id);
      expect(edge.target).toBe(node2.id);

      const currentStore = useGraphStore.getState();
      expect(currentStore.graph.edges).toHaveLength(1);
    });

    it('should remove an edge', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      const node2 = store.addNode({
        type: 'Boolean::Union',
        position: { x: 200, y: 0 },
        inputs: { a: { type: 'Shape' }, b: { type: 'Shape' } },
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      const edge = store.addEdge({
        source: node1.id,
        sourceHandle: 'shape',
        target: node2.id,
        targetHandle: 'a'
      });

      let currentStore = useGraphStore.getState();
      expect(currentStore.graph.edges).toHaveLength(1);

      store.removeEdge(edge.id);

      currentStore = useGraphStore.getState();
      expect(currentStore.graph.edges).toHaveLength(0);
    });

    it('should clear the graph', () => {
      const store = useGraphStore.getState();

      // Add some nodes and edges
      const node1 = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      const node2 = store.addNode({
        type: 'Boolean::Union',
        position: { x: 100, y: 0 },
        inputs: { a: { type: 'Shape' }, b: { type: 'Shape' } },
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      store.addEdge({
        source: node1.id,
        sourceHandle: 'shape',
        target: node2.id,
        targetHandle: 'a'
      });

      let currentStore = useGraphStore.getState();
      expect(currentStore.graph.nodes.length).toBeGreaterThan(0);
      expect(currentStore.graph.edges.length).toBeGreaterThan(0);

      store.clearGraph();

      currentStore = useGraphStore.getState();
      expect(currentStore.graph.nodes).toHaveLength(0);
      expect(currentStore.graph.edges).toHaveLength(0);
      expect(currentStore.selectedNodes.size).toBe(0);
    });
  });

  describe('Selection Operations', () => {
    it('should select a single node', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      store.selectNode(node.id);

      const currentStore = useGraphStore.getState();
      expect(currentStore.selectedNodes.has(node.id)).toBe(true);
      expect(currentStore.selectedNodes.size).toBe(1);
    });

    it('should select multiple nodes', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      const node2 = store.addNode({
        type: 'Solid::Cylinder',
        position: { x: 100, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      const node3 = store.addNode({
        type: 'Solid::Sphere',
        position: { x: 200, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      store.selectNodes([node1.id, node2.id, node3.id]);

      const currentStore = useGraphStore.getState();
      expect(currentStore.selectedNodes.size).toBe(3);
      expect(currentStore.selectedNodes.has(node1.id)).toBe(true);
      expect(currentStore.selectedNodes.has(node2.id)).toBe(true);
      expect(currentStore.selectedNodes.has(node3.id)).toBe(true);
    });

    it('should deselect a node', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      const node2 = store.addNode({
        type: 'Solid::Cylinder',
        position: { x: 100, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      store.selectNodes([node1.id, node2.id]);

      let currentStore = useGraphStore.getState();
      expect(currentStore.selectedNodes.size).toBe(2);

      store.deselectNode(node1.id);

      currentStore = useGraphStore.getState();
      expect(currentStore.selectedNodes.size).toBe(1);
      expect(currentStore.selectedNodes.has(node1.id)).toBe(false);
      expect(currentStore.selectedNodes.has(node2.id)).toBe(true);
    });

    it('should clear selection', () => {
      const store = useGraphStore.getState();

      const node1 = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      const node2 = store.addNode({
        type: 'Solid::Cylinder',
        position: { x: 100, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      store.selectNodes([node1.id, node2.id]);

      let currentStore = useGraphStore.getState();
      expect(currentStore.selectedNodes.size).toBe(2);

      store.clearSelection();

      currentStore = useGraphStore.getState();
      expect(currentStore.selectedNodes.size).toBe(0);
    });

    it('should set hovered node', () => {
      const store = useGraphStore.getState();

      const node = store.addNode({
        type: 'Solid::Box',
        position: { x: 0, y: 0 },
        inputs: {},
        outputs: { shape: { type: 'Shape' } },
        params: {}
      });

      store.setHoveredNode(node.id);

      let currentStore = useGraphStore.getState();
      expect(currentStore.hoveredNode).toBe(node.id);

      store.setHoveredNode(null);

      currentStore = useGraphStore.getState();
      expect(currentStore.hoveredNode).toBe(null);
    });
  });
});