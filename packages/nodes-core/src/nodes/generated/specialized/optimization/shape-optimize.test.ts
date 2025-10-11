
import { describe, it, expect } from 'vitest';
import { ShapeOptimizeNode } from './shape-optimize.node';
import { createTestContext } from '../test-utils';

describe('ShapeOptimizeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      initialShape: undefined,
      boundaryConditions: undefined
    } as any;
    const params = {
      objective: "min-weight",
      morphRadius: 5,
      iterations: 50
    } as any;

    const result = await ShapeOptimizeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
