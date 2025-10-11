
import { describe, it, expect } from 'vitest';
import { TreeStatisticsNode } from './tree-statistics.node';
import { createTestContext } from '../test-utils';

describe('TreeStatisticsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      tree: undefined
    } as any;
    const params = {

    } as any;

    const result = await TreeStatisticsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
