
import { describe, it, expect } from 'vitest';
import { TreeShiftNode } from './treeshift-node';
import { createTestContext } from '../test-utils';

describe('TreeShiftNode', () => {
  it('should create TreeShift', async () => {
    const context = createTestContext();
    const inputs = {
      tree: /* test value */,
      offset: /* test value */
    };
    const params = {
      
    };

    const result = await TreeShiftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shifted).toBeDefined();
  });

  
});