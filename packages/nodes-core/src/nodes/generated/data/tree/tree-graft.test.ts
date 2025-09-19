
import { describe, it, expect } from 'vitest';
import { TreeGraftNode } from './treegraft.node';
import { createTestContext } from './../../test-utils';

describe('TreeGraftNode', () => {
  it('should create TreeGraft', async () => {
    const context = createTestContext();
    const inputs = {
      tree: null
    };
    const params = {
      
    };

    const result = await TreeGraftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.grafted).toBeDefined();
  });

  
});