
import { describe, it, expect } from 'vitest';
import { DecisionTreeNode } from './decision-tree.node';
import { createTestContext } from '../test-utils';

describe('DecisionTreeNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      trainingData: undefined,
      features: undefined,
      target: undefined
    } as any;
    const params = {
      maxDepth: 5,
      minSamplesSplit: 2,
      criterion: "gini"
    } as any;

    const result = await DecisionTreeNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
