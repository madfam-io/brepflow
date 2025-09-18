
import { describe, it, expect } from 'vitest';
import { ConicalSlicingNode } from './conicalslicing-node';
import { createTestContext } from '../test-utils';

describe('ConicalSlicingNode', () => {
  it('should create ConicalSlicing', async () => {
    const context = createTestContext();
    const inputs = {
      model: /* test value */
    };
    const params = {
      axis: "[0, 0, 1]"
    };

    const result = await ConicalSlicingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.conicalSlices).toBeDefined();
  });

  
});