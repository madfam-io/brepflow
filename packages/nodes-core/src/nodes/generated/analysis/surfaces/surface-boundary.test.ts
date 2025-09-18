
import { describe, it, expect } from 'vitest';
import { SurfaceBoundaryNode } from './surfaceboundary-node';
import { createTestContext } from '../test-utils';

describe('SurfaceBoundaryNode', () => {
  it('should create SurfaceBoundary', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      includeHoles: true,
      simplify: false
    };

    const result = await SurfaceBoundaryNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.outerBoundary).toBeDefined();
    expect(result.innerBoundaries).toBeDefined();
    expect(result.allBoundaries).toBeDefined();
  });

  
});