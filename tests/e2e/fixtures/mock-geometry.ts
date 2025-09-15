/**
 * Mock Geometry Data for Reproducible Testing
 * Provides predictable geometry responses for WASM-independent testing
 */

export interface MockGeometryResult {
  success: boolean;
  geometry?: {
    id: string;
    type: string;
    vertices: number;
    faces: number;
    edges: number;
    volume: number;
    boundingBox: {
      min: { x: number; y: number; z: number };
      max: { x: number; y: number; z: number };
    };
    meshData?: {
      vertices: Float32Array;
      indices: Uint32Array;
      normals: Float32Array;
    };
  };
  error?: {
    code: string;
    message: string;
  };
  computeTime: number;
  memoryUsage: number;
}

export interface MockGeometryOperation {
  nodeType: string;
  parameters: Record<string, any>;
  expectedResult: MockGeometryResult;
}

/**
 * Predefined Mock Geometry Results
 */
export const MockGeometryData: Record<string, MockGeometryOperation> = {
  // Box Geometries
  'box-100x50x25': {
    nodeType: 'Solid::Box',
    parameters: { width: 100, height: 50, depth: 25 },
    expectedResult: {
      success: true,
      geometry: {
        id: 'box-1',
        type: 'Box',
        vertices: 8,
        faces: 6,
        edges: 12,
        volume: 125000,
        boundingBox: {
          min: { x: -50, y: -25, z: -12.5 },
          max: { x: 50, y: 25, z: 12.5 }
        },
        meshData: {
          vertices: new Float32Array([
            -50, -25, -12.5,  50, -25, -12.5,  50,  25, -12.5, -50,  25, -12.5,
            -50, -25,  12.5,  50, -25,  12.5,  50,  25,  12.5, -50,  25,  12.5
          ]),
          indices: new Uint32Array([
            0,1,2, 0,2,3, 4,7,6, 4,6,5, 0,4,5, 0,5,1,
            2,6,7, 2,7,3, 0,3,7, 0,7,4, 1,5,6, 1,6,2
          ]),
          normals: new Float32Array([
            0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
            0,0,1, 0,0,1, 0,0,1, 0,0,1
          ])
        }
      },
      computeTime: 15.5,
      memoryUsage: 2048
    }
  },

  'box-50x50x50': {
    nodeType: 'Solid::Box',
    parameters: { width: 50, height: 50, depth: 50 },
    expectedResult: {
      success: true,
      geometry: {
        id: 'box-2',
        type: 'Box',
        vertices: 8,
        faces: 6,
        edges: 12,
        volume: 125000,
        boundingBox: {
          min: { x: -25, y: -25, z: -25 },
          max: { x: 25, y: 25, z: 25 }
        }
      },
      computeTime: 12.3,
      memoryUsage: 2048
    }
  },

  'box-invalid-negative': {
    nodeType: 'Solid::Box',
    parameters: { width: -10, height: 50, depth: 25 },
    expectedResult: {
      success: false,
      error: {
        code: 'INVALID_GEOMETRY_PARAMETERS',
        message: 'Width parameter must be positive'
      },
      computeTime: 1.2,
      memoryUsage: 512
    }
  },

  // Cylinder Geometries
  'cylinder-25r-100h': {
    nodeType: 'Solid::Cylinder',
    parameters: { radius: 25, height: 100 },
    expectedResult: {
      success: true,
      geometry: {
        id: 'cylinder-1',
        type: 'Cylinder',
        vertices: 64,
        faces: 34,
        edges: 96,
        volume: Math.PI * 25 * 25 * 100,
        boundingBox: {
          min: { x: -25, y: -25, z: -50 },
          max: { x: 25, y: 25, z: 50 }
        }
      },
      computeTime: 28.7,
      memoryUsage: 4096
    }
  },

  'cylinder-10r-200h': {
    nodeType: 'Solid::Cylinder',
    parameters: { radius: 10, height: 200 },
    expectedResult: {
      success: true,
      geometry: {
        id: 'cylinder-2',
        type: 'Cylinder',
        vertices: 64,
        faces: 34,
        edges: 96,
        volume: Math.PI * 10 * 10 * 200,
        boundingBox: {
          min: { x: -10, y: -10, z: -100 },
          max: { x: 10, y: 10, z: 100 }
        }
      },
      computeTime: 31.2,
      memoryUsage: 4096
    }
  },

  'cylinder-invalid-zero-radius': {
    nodeType: 'Solid::Cylinder',
    parameters: { radius: 0, height: 100 },
    expectedResult: {
      success: false,
      error: {
        code: 'INVALID_GEOMETRY_PARAMETERS',
        message: 'Radius parameter must be greater than zero'
      },
      computeTime: 0.8,
      memoryUsage: 512
    }
  }
};

/**
 * Performance Mock Data for Different Scenarios
 */
export const MockPerformanceData = {
  lightLoad: {
    nodeCount: 1,
    totalComputeTime: 15.5,
    totalMemoryUsage: 2048,
    averageNodeTime: 15.5,
    peakMemory: 2048
  },

  mediumLoad: {
    nodeCount: 5,
    totalComputeTime: 89.3,
    totalMemoryUsage: 12288,
    averageNodeTime: 17.86,
    peakMemory: 4096
  },

  heavyLoad: {
    nodeCount: 20,
    totalComputeTime: 412.7,
    totalMemoryUsage: 65536,
    averageNodeTime: 20.635,
    peakMemory: 8192
  }
};

/**
 * Mock WASM Engine Response Generator
 */
export class MockGeometryEngine {
  private static instance: MockGeometryEngine | null = null;
  private responseDelay: number = 50; // Simulate computation delay

  private constructor() {}

  public static getInstance(): MockGeometryEngine {
    if (!MockGeometryEngine.instance) {
      MockGeometryEngine.instance = new MockGeometryEngine();
    }
    return MockGeometryEngine.instance;
  }

  /**
   * Mock geometry creation
   */
  public async createGeometry(nodeType: string, parameters: Record<string, any>): Promise<MockGeometryResult> {
    // Simulate computation delay
    await this.delay(this.responseDelay);

    // Generate lookup key
    const key = this.generateLookupKey(nodeType, parameters);

    // Return predefined result if available
    if (MockGeometryData[key]) {
      return MockGeometryData[key].expectedResult;
    }

    // Generate dynamic result for unknown parameters
    return this.generateDynamicResult(nodeType, parameters);
  }

  /**
   * Mock batch geometry operations
   */
  public async createMultipleGeometries(operations: Array<{nodeType: string, parameters: Record<string, any>}>): Promise<MockGeometryResult[]> {
    const results: MockGeometryResult[] = [];

    for (const op of operations) {
      const result = await this.createGeometry(op.nodeType, op.parameters);
      results.push(result);
    }

    return results;
  }

  /**
   * Set response delay for performance testing
   */
  public setResponseDelay(ms: number): void {
    this.responseDelay = ms;
  }

  /**
   * Get mock performance metrics
   */
  public getPerformanceMetrics(nodeCount: number): {
    fps: number;
    renderTime: number;
    triangleCount: number;
  } {
    // Simulate performance degradation with more nodes
    const baseFPS = 60;
    const baseRenderTime = 16.67; // 60 FPS = ~16.67ms per frame

    const fps = Math.max(20, baseFPS - (nodeCount * 2));
    const renderTime = Math.min(50, baseRenderTime + (nodeCount * 0.5));
    const triangleCount = nodeCount * 12; // Approximate triangles per box

    return { fps, renderTime, triangleCount };
  }

  private generateLookupKey(nodeType: string, parameters: Record<string, any>): string {
    const sortedParams = Object.keys(parameters)
      .sort()
      .map(key => `${key}=${parameters[key]}`)
      .join('&');

    return `${nodeType.toLowerCase().replace('::', '-')}-${sortedParams}`;
  }

  private generateDynamicResult(nodeType: string, parameters: Record<string, any>): MockGeometryResult {
    // Validate parameters
    const validation = this.validateParameters(nodeType, parameters);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error!,
        computeTime: Math.random() * 5,
        memoryUsage: 512
      };
    }

    // Generate geometry data based on type
    if (nodeType === 'Solid::Box') {
      return this.generateBoxResult(parameters);
    } else if (nodeType === 'Solid::Cylinder') {
      return this.generateCylinderResult(parameters);
    }

    // Default fallback
    return {
      success: true,
      geometry: {
        id: `generated-${Date.now()}`,
        type: nodeType.split('::')[1] || 'Unknown',
        vertices: 8,
        faces: 6,
        edges: 12,
        volume: 1000,
        boundingBox: {
          min: { x: -1, y: -1, z: -1 },
          max: { x: 1, y: 1, z: 1 }
        }
      },
      computeTime: 10 + Math.random() * 20,
      memoryUsage: 2048
    };
  }

  private validateParameters(nodeType: string, parameters: Record<string, any>): {
    valid: boolean;
    error?: { code: string; message: string };
  } {
    if (nodeType === 'Solid::Box') {
      const { width, height, depth } = parameters;
      if (width <= 0) return { valid: false, error: { code: 'INVALID_GEOMETRY_PARAMETERS', message: 'Width must be positive' } };
      if (height <= 0) return { valid: false, error: { code: 'INVALID_GEOMETRY_PARAMETERS', message: 'Height must be positive' } };
      if (depth <= 0) return { valid: false, error: { code: 'INVALID_GEOMETRY_PARAMETERS', message: 'Depth must be positive' } };
    } else if (nodeType === 'Solid::Cylinder') {
      const { radius, height } = parameters;
      if (radius <= 0) return { valid: false, error: { code: 'INVALID_GEOMETRY_PARAMETERS', message: 'Radius must be positive' } };
      if (height <= 0) return { valid: false, error: { code: 'INVALID_GEOMETRY_PARAMETERS', message: 'Height must be positive' } };
    }

    return { valid: true };
  }

  private generateBoxResult(parameters: Record<string, any>): MockGeometryResult {
    const { width, height, depth } = parameters;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const halfDepth = depth / 2;

    return {
      success: true,
      geometry: {
        id: `box-${Date.now()}`,
        type: 'Box',
        vertices: 8,
        faces: 6,
        edges: 12,
        volume: width * height * depth,
        boundingBox: {
          min: { x: -halfWidth, y: -halfHeight, z: -halfDepth },
          max: { x: halfWidth, y: halfHeight, z: halfDepth }
        }
      },
      computeTime: 10 + (width * height * depth) / 100000, // Simulate complexity-based timing
      memoryUsage: 2048 + Math.floor((width * height * depth) / 50000) // Simulate size-based memory
    };
  }

  private generateCylinderResult(parameters: Record<string, any>): MockGeometryResult {
    const { radius, height } = parameters;
    const halfHeight = height / 2;

    return {
      success: true,
      geometry: {
        id: `cylinder-${Date.now()}`,
        type: 'Cylinder',
        vertices: 64,
        faces: 34,
        edges: 96,
        volume: Math.PI * radius * radius * height,
        boundingBox: {
          min: { x: -radius, y: -radius, z: -halfHeight },
          max: { x: radius, y: radius, z: halfHeight }
        }
      },
      computeTime: 15 + (Math.PI * radius * radius * height) / 100000,
      memoryUsage: 4096 + Math.floor((Math.PI * radius * radius * height) / 50000)
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Test Data Generator for Parametric Testing
 */
export class TestDataGenerator {
  /**
   * Generate test parameters for boundary testing
   */
  public static generateBoundaryParameters(nodeType: string): Array<{
    name: string;
    parameters: Record<string, any>;
    expectSuccess: boolean;
  }> {
    const tests: Array<{name: string; parameters: Record<string, any>; expectSuccess: boolean}> = [];

    if (nodeType === 'Solid::Box') {
      tests.push(
        { name: 'minimum-valid', parameters: { width: 0.001, height: 0.001, depth: 0.001 }, expectSuccess: true },
        { name: 'zero-width', parameters: { width: 0, height: 50, depth: 25 }, expectSuccess: false },
        { name: 'negative-height', parameters: { width: 100, height: -10, depth: 25 }, expectSuccess: false },
        { name: 'maximum-practical', parameters: { width: 10000, height: 10000, depth: 10000 }, expectSuccess: true }
      );
    } else if (nodeType === 'Solid::Cylinder') {
      tests.push(
        { name: 'minimum-valid', parameters: { radius: 0.001, height: 0.001 }, expectSuccess: true },
        { name: 'zero-radius', parameters: { radius: 0, height: 100 }, expectSuccess: false },
        { name: 'negative-height', parameters: { radius: 25, height: -50 }, expectSuccess: false },
        { name: 'maximum-practical', parameters: { radius: 5000, height: 10000 }, expectSuccess: true }
      );
    }

    return tests;
  }

  /**
   * Generate performance test scenarios
   */
  public static generatePerformanceScenarios(): Array<{
    name: string;
    nodeCount: number;
    expectedMaxTime: number;
    expectedMaxMemory: number;
  }> {
    return [
      { name: 'single-node', nodeCount: 1, expectedMaxTime: 100, expectedMaxMemory: 5 * 1024 * 1024 },
      { name: 'few-nodes', nodeCount: 5, expectedMaxTime: 500, expectedMaxMemory: 20 * 1024 * 1024 },
      { name: 'many-nodes', nodeCount: 20, expectedMaxTime: 2000, expectedMaxMemory: 100 * 1024 * 1024 },
      { name: 'stress-test', nodeCount: 50, expectedMaxTime: 10000, expectedMaxMemory: 300 * 1024 * 1024 }
    ];
  }
}