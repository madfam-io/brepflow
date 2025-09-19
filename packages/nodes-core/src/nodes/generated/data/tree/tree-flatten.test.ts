
import { describe, it, expect } from 'vitest';
import { TreeFlattenNode } from './treeflatten.node';
import { createTestContext } from './../../test-utils';

describe('TreeFlattenNode', () => {
  it('should create TreeFlatten', async () => {
    const context = createTestContext();
    const inputs = {
      tree: null
    };
    const params = {
      depth: 1
    };

    const result = await TreeFlattenNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.flattened).toBeDefined();
  });

  
});