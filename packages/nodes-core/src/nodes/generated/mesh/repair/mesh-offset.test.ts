
import { describe, it, expect } from 'vitest';
import { MeshOffsetNode } from './meshoffset-node';
import { createTestContext } from '../test-utils';

describe('MeshOffsetNode', () => {
  it('should create MeshOffset', async () => {
    const context = createTestContext();
    const inputs = {
      mesh: /* test value */
    };
    const params = {
      offsetDistance: 1,
      solidify: false
    };

    const result = await MeshOffsetNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.offset).toBeDefined();
  });

  
});