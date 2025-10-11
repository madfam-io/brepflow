
import { describe, it, expect } from 'vitest';
import { ConicalSlicingNode } from './conical-slicing.node';
import { createTestContext } from '../test-utils';

describe('ConicalSlicingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      model: undefined
    } as any;
    const params = {
      axis: "[0, 0, 1]"
    } as any;

    const result = await ConicalSlicingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
