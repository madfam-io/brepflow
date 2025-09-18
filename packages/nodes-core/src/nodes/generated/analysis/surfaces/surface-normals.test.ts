
import { describe, it, expect } from 'vitest';
import { SurfaceNormalsNode } from './surfacenormals-node';
import { createTestContext } from '../test-utils';

describe('SurfaceNormalsNode', () => {
  it('should create SurfaceNormals', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      density: 20,
      vectorLength: 5,
      showVectors: true
    };

    const result = await SurfaceNormalsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.normalVectors).toBeDefined();
    expect(result.normalLines).toBeDefined();
    expect(result.samplePoints).toBeDefined();
  });

  
});