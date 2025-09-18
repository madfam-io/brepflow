
import { describe, it, expect } from 'vitest';
import { DraftNode } from './draft-node';
import { createTestContext } from '../test-utils';

describe('DraftNode', () => {
  it('should create Draft', async () => {
    const context = createTestContext();
    const inputs = {
      solid: /* test value */,
      facesToDraft: /* test value */
    };
    const params = {
      angle: 3,
      pullDirection: [0,0,1],
      neutralPlane: [0,0,0]
    };

    const result = await DraftNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.drafted).toBeDefined();
  });

  
});