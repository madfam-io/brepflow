
import { describe, it, expect } from 'vitest';
import { TreeSupportsNode } from './treesupports-node';
import { createTestContext } from '../test-utils';

describe('TreeSupportsNode', () => {
  it('should create TreeSupports', async () => {
    const context = createTestContext();
    const inputs = {
      model: null
    };
    const params = {
      branchAngle: 40,
      trunkDiameter: 5,
      branchDiameter: 2
    };

    const result = await TreeSupportsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.treeSupports).toBeDefined();
  });

  
});