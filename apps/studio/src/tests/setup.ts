import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock global objects for testing
beforeAll(() => {
  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock PerformanceObserver
  global.PerformanceObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock requestAnimationFrame
  global.requestAnimationFrame = vi.fn((cb) => {
    setTimeout(cb, 0);
    return 0;
  });

  global.cancelAnimationFrame = vi.fn();

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock scrollTo
  window.scrollTo = vi.fn();

  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  global.localStorage = localStorageMock as any;

  // Mock performance.memory for performance monitoring tests
  Object.defineProperty(performance, 'memory', {
    configurable: true,
    get: () => ({
      usedJSHeapSize: 100000000,
      totalJSHeapSize: 200000000,
      jsHeapSizeLimit: 500000000,
    }),
  });

  // Mock Worker for web worker tests
  class WorkerMock {
    onmessage: ((e: MessageEvent) => void) | null = null;
    postMessage = vi.fn();
    terminate = vi.fn();
    addEventListener = vi.fn();
    removeEventListener = vi.fn();
    dispatchEvent = vi.fn();
  }
  global.Worker = WorkerMock as any;

  // Mock for web worker self
  if (typeof self === 'undefined') {
    (global as any).self = global;
  }

  // Mock console methods to reduce test output noise
  global.console = {
    ...console,
    log: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

// Mock React components that might have issues in test environment
vi.mock('react-confetti', () => ({
  default: vi.fn(() => null),
}));

vi.mock('react-joyride', () => ({
  default: vi.fn(() => null),
}));

vi.mock('three', () => ({
  WebGLRenderer: vi.fn(),
  Scene: vi.fn(),
  PerspectiveCamera: vi.fn(),
  DirectionalLight: vi.fn(),
  AmbientLight: vi.fn(),
  GridHelper: vi.fn(),
  AxesHelper: vi.fn(),
  Vector3: vi.fn(),
  Color: vi.fn(),
}));

// Mock the worker modules to prevent issues in test environment
vi.mock('@brepflow/engine-occt', () => ({
  createOCCTEngine: vi.fn(() => ({
    execute: vi.fn(),
    dispose: vi.fn(),
  })),
  MockOCCTBinding: vi.fn(),
  getGeometryAPI: vi.fn(() => ({
    init: vi.fn().mockResolvedValue(undefined),
    initialize: vi.fn().mockResolvedValue(undefined),
    execute: vi.fn().mockResolvedValue({ success: true }),
    dispose: vi.fn(),
    isReady: vi.fn().mockResolvedValue(true),
  })),
}));

// Mock @brepflow/engine-core
vi.mock('@brepflow/engine-core', () => {
  // Store instances to allow reset between tests
  let graphManagerInstances = [];

  class MockGraphManager {
    constructor() {
      this.graph = {
        version: '0.1.0',
        units: 'mm',
        tolerance: 0.001,
        nodes: [],
        edges: [],
      };
      graphManagerInstances.push(this);
    }

    getGraph() {
      return this.graph;
    }

    setGraph(graph) {
      this.graph = graph;
    }

    addNode(node) {
      const newNode = {
        ...node,
        id: Math.random().toString(36).substr(2, 9),
        dirty: true,
      };
      this.graph.nodes.push(newNode);
      return newNode;
    }

    removeNode(nodeId) {
      this.graph.nodes = this.graph.nodes.filter(n => n.id !== nodeId);
      this.graph.edges = this.graph.edges.filter(
        e => e.source !== nodeId && e.target !== nodeId
      );
    }

    updateNode(nodeId, updates) {
      const node = this.graph.nodes.find(n => n.id === nodeId);
      if (node) {
        Object.assign(node, updates);
        node.dirty = true;
      }
    }

    addEdge(edge) {
      const newEdge = {
        ...edge,
        id: Math.random().toString(36).substr(2, 9),
      };
      this.graph.edges.push(newEdge);
      return newEdge;
    }

    removeEdge(edgeId) {
      this.graph.edges = this.graph.edges.filter(e => e.id !== edgeId);
    }

    clearGraph() {
      this.graph = {
        version: '0.1.0',
        units: 'mm',
        tolerance: 0.001,
        nodes: [],
        edges: [],
      };
    }
    
    fromJSON(json) {
      try {
        const parsed = JSON.parse(json);
        this.graph = parsed;
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    }
    
    toJSON() {
      return JSON.stringify(this.graph);
    }

    validate() {
      return { valid: true, errors: [] };
    }

    getNodesByType(type) {
      return this.graph.nodes.filter(n => n.type === type);
    }

    getConnectedNodes(nodeId) {
      return [];
    }

    markDownstreamDirty(nodeId) {
      // Mock implementation
    }

    static resetAll() {
      graphManagerInstances.forEach(instance => {
        instance.clearGraph();
      });
    }
  }

  class MockDAGEngine {
    async evaluate() {
      return { success: true, results: {} };
    }

    cancel() {}

    dispose() {}
  }

  class MockNodeRegistry {
    static register(node) {}
    static get(type) {
      return { type, evaluate: vi.fn() };
    }
    static getAll() {
      return [];
    }
  }

  class MockComputeCache {
    get(key) {
      return null;
    }
    set(key, value) {}
    clear() {}
  }

  return {
    GraphManager: MockGraphManager,
    DAGEngine: MockDAGEngine,
    NodeRegistry: MockNodeRegistry,
    ComputeCache: MockComputeCache,
  };
});

// Mock @brepflow/nodes-core
vi.mock('@brepflow/nodes-core', () => ({
  registerCoreNodes: vi.fn(),
}));

// Mock lib/undo-redo
vi.mock('../lib/undo-redo', () => {
  class MockUndoRedoManager {
    undoStack = [];
    redoStack = [];

    execute(command) {
      command.execute();
      this.undoStack.push(command);
      this.redoStack = [];
    }

    undo() {
      if (this.undoStack.length > 0) {
        const command = this.undoStack.pop();
        command.undo();
        this.redoStack.push(command);
      }
    }

    redo() {
      if (this.redoStack.length > 0) {
        const command = this.redoStack.pop();
        command.execute();
        this.undoStack.push(command);
      }
    }

    canUndo() {
      return this.undoStack.length > 0;
    }

    canRedo() {
      return this.redoStack.length > 0;
    }

    clear() {
      this.undoStack = [];
      this.redoStack = [];
    }
  }

  class MockAddNodeCommand {
    constructor(node, execute, undo) {
      this.node = node;
      this.executeFunc = execute;
      this.undoFunc = undo;
    }

    execute() {
      if (this.executeFunc) {
        return this.executeFunc(this.node);
      }
    }

    undo() {
      if (this.undoFunc) {
        this.undoFunc(this.node.id);
      }
    }
  }

  class MockRemoveNodeCommand {
    constructor(node, execute, undo) {
      this.node = node;
      this.executeFunc = execute;
      this.undoFunc = undo;
    }

    execute() {
      if (this.undoFunc) {
        this.undoFunc(this.node.id);
      }
    }

    undo() {
      if (this.executeFunc) {
        this.executeFunc(this.node);
      }
    }
  }

  class MockUpdateNodeCommand {
    constructor(nodeId, oldState, updates, apply) {
      this.nodeId = nodeId;
      this.oldState = oldState;
      this.updates = updates;
      this.apply = apply;
    }

    execute() {
      if (this.apply) {
        this.apply(this.nodeId, this.updates);
      }
    }

    undo() {
      if (this.apply) {
        this.apply(this.nodeId, this.oldState);
      }
    }
  }

  class MockAddEdgeCommand {
    constructor(edge, execute, undo) {
      this.edge = edge;
      this.executeFunc = execute;
      this.undoFunc = undo;
    }

    execute() {
      if (this.executeFunc) {
        return this.executeFunc(this.edge);
      }
    }

    undo() {
      if (this.undoFunc) {
        this.undoFunc(this.edge.id);
      }
    }
  }

  class MockRemoveEdgeCommand {
    constructor(edge, execute, undo) {
      this.edge = edge;
      this.executeFunc = execute;
      this.undoFunc = undo;
    }

    execute() {
      if (this.undoFunc) {
        this.undoFunc(this.edge.id);
      }
    }

    undo() {
      if (this.executeFunc) {
        this.executeFunc(this.edge);
      }
    }
  }

  return {
    UndoRedoManager: MockUndoRedoManager,
    AddNodeCommand: MockAddNodeCommand,
    RemoveNodeCommand: MockRemoveNodeCommand,
    UpdateNodeCommand: MockUpdateNodeCommand,
    AddEdgeCommand: MockAddEdgeCommand,
    RemoveEdgeCommand: MockRemoveEdgeCommand,
  };
});

// Mock lib/error-handling
vi.mock('../lib/error-handling/error-manager', () => ({
  ErrorManager: {
    getInstance: vi.fn(() => ({
      reportError: vi.fn(),
      clearErrors: vi.fn(),
    })),
  },
  ErrorCode: {
    GRAPH_INVALID: 'GRAPH_INVALID',
    NODE_NOT_FOUND: 'NODE_NOT_FOUND',
    EDGE_NOT_FOUND: 'EDGE_NOT_FOUND',
  },
}));

// Mock lib/monitoring
vi.mock('../lib/monitoring/metrics-collector', () => ({
  MetricsCollector: {
    getInstance: vi.fn(() => ({
      recordMetric: vi.fn(),
      incrementCounter: vi.fn(),
      recordTiming: vi.fn(),
    })),
  },
}));

// Mock comlink for worker communication
vi.mock('comlink', () => ({
  wrap: vi.fn((worker) => ({
    execute: vi.fn(),
    dispose: vi.fn(),
  })),
  expose: vi.fn(),
  transfer: vi.fn((value) => value),
  transferHandlers: new Map(),
}));