
import { describe, it, expect } from 'vitest';
import { BoundaryNode } from './boundary-node';
import { createTestContext } from '../test-utils';

describe('BoundaryNode', () => {
  it('should create Boundary', async () => {
    const context = createTestContext();
    const inputs = {
      curves: null
    };
    const params = {
      type: "surface",
      tangencyType: "none"
    };

    const result = await BoundaryNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});