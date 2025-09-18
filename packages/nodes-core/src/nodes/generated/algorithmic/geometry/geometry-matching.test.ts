
import { describe, it, expect } from 'vitest';
import { GeometryMatchingNode } from './geometrymatching-node';
import { createTestContext } from '../test-utils';

describe('GeometryMatchingNode', () => {
  it('should create GeometryMatching', async () => {
    const context = createTestContext();
    const inputs = {
      source: null,
      target: null
    };
    const params = {
      algorithm: "icp",
      tolerance: 0.01,
      iterations: 50
    };

    const result = await GeometryMatchingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.transform).toBeDefined();
    expect(result.aligned).toBeDefined();
    expect(result.error).toBeDefined();
    expect(result.correspondences).toBeDefined();
  });

  
});