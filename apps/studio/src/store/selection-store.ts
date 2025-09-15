import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface SelectionState {
  selectedNodes: Set<string>;
  selectedEdges: Set<string>;
  lastSelected: string | null;
  selectionMode: 'single' | 'multi' | 'box' | 'lasso';
  isSelecting: boolean;
  selectionBox?: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };
}

export interface SelectionActions {
  // Node selection
  selectNode: (nodeId: string, multi?: boolean) => void;
  deselectNode: (nodeId: string) => void;
  toggleNodeSelection: (nodeId: string) => void;
  selectMultipleNodes: (nodeIds: string[]) => void;

  // Edge selection
  selectEdge: (edgeId: string, multi?: boolean) => void;
  deselectEdge: (edgeId: string) => void;
  toggleEdgeSelection: (edgeId: string) => void;

  // General selection
  selectAll: () => void;
  clearSelection: () => void;
  invertSelection: (availableNodeIds: string[], availableEdgeIds: string[]) => void;

  // Selection modes
  setSelectionMode: (mode: SelectionState['selectionMode']) => void;

  // Box selection
  startBoxSelection: (x: number, y: number) => void;
  updateBoxSelection: (x: number, y: number) => void;
  endBoxSelection: (nodeIds: string[]) => void;

  // Bulk operations
  selectNodesInRegion: (x: number, y: number, width: number, height: number, nodePositions: { [id: string]: { x: number; y: number } }) => void;
  selectNodesByType: (nodeType: string, availableNodes: { id: string; type: string }[]) => void;
  selectDownstreamNodes: (nodeId: string, edges: { source: string; target: string }[]) => void;
  selectUpstreamNodes: (nodeId: string, edges: { source: string; target: string }[]) => void;

  // History and navigation
  selectNext: (availableNodeIds: string[]) => void;
  selectPrevious: (availableNodeIds: string[]) => void;
}

export const useSelectionStore = create<SelectionState & SelectionActions>()(
  devtools(
    (set, get) => ({
      // Initial state
      selectedNodes: new Set(),
      selectedEdges: new Set(),
      lastSelected: null,
      selectionMode: 'single',
      isSelecting: false,

      // Node selection actions
      selectNode: (nodeId: string, multi = false) => {
        set((state) => {
          const newSelectedNodes = new Set(multi ? state.selectedNodes : []);
          newSelectedNodes.add(nodeId);

          return {
            selectedNodes: newSelectedNodes,
            selectedEdges: multi ? state.selectedEdges : new Set(),
            lastSelected: nodeId,
          };
        });
      },

      deselectNode: (nodeId: string) => {
        set((state) => {
          const newSelectedNodes = new Set(state.selectedNodes);
          newSelectedNodes.delete(nodeId);

          return {
            selectedNodes: newSelectedNodes,
            lastSelected: newSelectedNodes.size > 0 ? Array.from(newSelectedNodes)[newSelectedNodes.size - 1] : null,
          };
        });
      },

      toggleNodeSelection: (nodeId: string) => {
        const { selectedNodes } = get();
        if (selectedNodes.has(nodeId)) {
          get().deselectNode(nodeId);
        } else {
          get().selectNode(nodeId, true);
        }
      },

      selectMultipleNodes: (nodeIds: string[]) => {
        set((state) => ({
          selectedNodes: new Set([...state.selectedNodes, ...nodeIds]),
          lastSelected: nodeIds[nodeIds.length - 1] || state.lastSelected,
        }));
      },

      // Edge selection actions
      selectEdge: (edgeId: string, multi = false) => {
        set((state) => {
          const newSelectedEdges = new Set(multi ? state.selectedEdges : []);
          newSelectedEdges.add(edgeId);

          return {
            selectedEdges: newSelectedEdges,
            selectedNodes: multi ? state.selectedNodes : new Set(),
            lastSelected: edgeId,
          };
        });
      },

      deselectEdge: (edgeId: string) => {
        set((state) => {
          const newSelectedEdges = new Set(state.selectedEdges);
          newSelectedEdges.delete(edgeId);

          return {
            selectedEdges: newSelectedEdges,
          };
        });
      },

      toggleEdgeSelection: (edgeId: string) => {
        const { selectedEdges } = get();
        if (selectedEdges.has(edgeId)) {
          get().deselectEdge(edgeId);
        } else {
          get().selectEdge(edgeId, true);
        }
      },

      // General selection actions
      selectAll: () => {
        // This should be called with all available node and edge IDs
        // Implementation depends on how we get all available items
        console.log('Select all triggered - needs node/edge lists');
      },

      clearSelection: () => {
        set({
          selectedNodes: new Set(),
          selectedEdges: new Set(),
          lastSelected: null,
        });
      },

      invertSelection: (availableNodeIds: string[], availableEdgeIds: string[]) => {
        set((state) => {
          const invertedNodes = new Set(
            availableNodeIds.filter(id => !state.selectedNodes.has(id))
          );
          const invertedEdges = new Set(
            availableEdgeIds.filter(id => !state.selectedEdges.has(id))
          );

          return {
            selectedNodes: invertedNodes,
            selectedEdges: invertedEdges,
            lastSelected: invertedNodes.size > 0 ? Array.from(invertedNodes)[0] : null,
          };
        });
      },

      // Selection mode
      setSelectionMode: (mode: SelectionState['selectionMode']) => {
        set({ selectionMode: mode });
      },

      // Box selection
      startBoxSelection: (x: number, y: number) => {
        set({
          isSelecting: true,
          selectionBox: { startX: x, startY: y, endX: x, endY: y },
        });
      },

      updateBoxSelection: (x: number, y: number) => {
        set((state) => ({
          selectionBox: state.selectionBox ? {\n            ...state.selectionBox,\n            endX: x,\n            endY: y,\n          } : undefined,\n        }));\n      },\n      \n      endBoxSelection: (nodeIds: string[]) => {\n        set((state) => ({\n          selectedNodes: new Set([...state.selectedNodes, ...nodeIds]),\n          isSelecting: false,\n          selectionBox: undefined,\n          lastSelected: nodeIds[nodeIds.length - 1] || state.lastSelected,\n        }));\n      },\n      \n      // Bulk operations\n      selectNodesInRegion: (x: number, y: number, width: number, height: number, nodePositions: { [id: string]: { x: number; y: number } }) => {\n        const nodesInRegion = Object.entries(nodePositions)\n          .filter(([id, pos]) => \n            pos.x >= x && pos.x <= x + width &&\n            pos.y >= y && pos.y <= y + height\n          )\n          .map(([id]) => id);\n          \n        get().selectMultipleNodes(nodesInRegion);\n      },\n      \n      selectNodesByType: (nodeType: string, availableNodes: { id: string; type: string }[]) => {\n        const nodeIds = availableNodes\n          .filter(node => node.type === nodeType)\n          .map(node => node.id);\n          \n        get().selectMultipleNodes(nodeIds);\n      },\n      \n      selectDownstreamNodes: (nodeId: string, edges: { source: string; target: string }[]) => {\n        const visited = new Set<string>();\n        const toVisit = [nodeId];\n        \n        while (toVisit.length > 0) {\n          const currentNode = toVisit.pop()!;\n          if (visited.has(currentNode)) continue;\n          \n          visited.add(currentNode);\n          \n          // Find all edges where this node is the source\n          const outgoingEdges = edges.filter(edge => edge.source === currentNode);\n          for (const edge of outgoingEdges) {\n            if (!visited.has(edge.target)) {\n              toVisit.push(edge.target);\n            }\n          }\n        }\n        \n        get().selectMultipleNodes(Array.from(visited));\n      },\n      \n      selectUpstreamNodes: (nodeId: string, edges: { source: string; target: string }[]) => {\n        const visited = new Set<string>();\n        const toVisit = [nodeId];\n        \n        while (toVisit.length > 0) {\n          const currentNode = toVisit.pop()!;\n          if (visited.has(currentNode)) continue;\n          \n          visited.add(currentNode);\n          \n          // Find all edges where this node is the target\n          const incomingEdges = edges.filter(edge => edge.target === currentNode);\n          for (const edge of incomingEdges) {\n            if (!visited.has(edge.source)) {\n              toVisit.push(edge.source);\n            }\n          }\n        }\n        \n        get().selectMultipleNodes(Array.from(visited));\n      },\n      \n      // History and navigation\n      selectNext: (availableNodeIds: string[]) => {\n        const { lastSelected } = get();\n        if (!lastSelected || availableNodeIds.length === 0) return;\n        \n        const currentIndex = availableNodeIds.indexOf(lastSelected);\n        const nextIndex = (currentIndex + 1) % availableNodeIds.length;\n        \n        get().selectNode(availableNodeIds[nextIndex]);\n      },\n      \n      selectPrevious: (availableNodeIds: string[]) => {\n        const { lastSelected } = get();\n        if (!lastSelected || availableNodeIds.length === 0) return;\n        \n        const currentIndex = availableNodeIds.indexOf(lastSelected);\n        const prevIndex = currentIndex === 0 ? availableNodeIds.length - 1 : currentIndex - 1;\n        \n        get().selectNode(availableNodeIds[prevIndex]);\n      },\n    }),\n    {\n      name: 'selection-store',\n    }\n  )\n);\n\n// Helper functions for external use\nexport const getSelectedNodeIds = (): string[] => {\n  return Array.from(useSelectionStore.getState().selectedNodes);\n};\n\nexport const getSelectedEdgeIds = (): string[] => {\n  return Array.from(useSelectionStore.getState().selectedEdges);\n};\n\nexport const hasSelection = (): boolean => {\n  const state = useSelectionStore.getState();\n  return state.selectedNodes.size > 0 || state.selectedEdges.size > 0;\n};\n\nexport const getSelectionCount = (): { nodes: number; edges: number; total: number } => {\n  const state = useSelectionStore.getState();\n  const nodes = state.selectedNodes.size;\n  const edges = state.selectedEdges.size;\n  return { nodes, edges, total: nodes + edges };\n};