
import { describe, it, expect } from 'vitest';
import { DeleteFaceNode } from './deleteface-node';
import { createTestContext } from '../test-utils';

describe('DeleteFaceNode', () => {
  it('should create DeleteFace', async () => {
    const context = createTestContext();
    const inputs = {
      shape: /* test value */,
      facesToDelete: /* test value */
    };
    const params = {
      healingType: "extend"
    };

    const result = await DeleteFaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});