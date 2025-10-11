
import { describe, it, expect } from 'vitest';
import { SplitNode } from './split.node';
import { createTestContext } from '../test-utils';

describe('SplitNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: undefined,
      tools: undefined
    } as any;
    const params = {
      keepAll: true
    } as any;

    const result = await SplitNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
