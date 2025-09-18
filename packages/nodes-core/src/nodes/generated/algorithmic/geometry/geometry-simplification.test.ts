
import { describe, it, expect } from 'vitest';
import { GeometrySimplificationNode } from './geometrysimplification-node';
import { createTestContext } from '../test-utils';

describe('GeometrySimplificationNode', () => {
  it('should create GeometrySimplification', async () => {
    const context = createTestContext();
    const inputs = {
      geometry: null
    };
    const params = {
      algorithm: "quadric",
      reduction: 0.5,
      preserveBoundary: true
    };

    const result = await GeometrySimplificationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.simplified).toBeDefined();
    expect(result.reductionRatio).toBeDefined();
    expect(result.error).toBeDefined();
  });

  
});