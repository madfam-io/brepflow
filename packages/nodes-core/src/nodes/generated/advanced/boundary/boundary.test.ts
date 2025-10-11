
import { describe, it, expect } from 'vitest';
import { BoundaryNode } from './boundary.node';
import { createTestContext } from '../test-utils';

describe('BoundaryNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      curves: undefined
    } as any;
    const params = {
      type: "surface",
      tangencyType: "none"
    } as any;

    const result = await BoundaryNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
