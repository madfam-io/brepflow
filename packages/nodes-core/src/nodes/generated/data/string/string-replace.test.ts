
import { describe, it, expect } from 'vitest';
import { StringReplaceNode } from './stringreplace-node';
import { createTestContext } from '../test-utils';

describe('StringReplaceNode', () => {
  it('should create StringReplace', async () => {
    const context = createTestContext();
    const inputs = {
      string: /* test value */,
      search: /* test value */,
      replace: /* test value */
    };
    const params = {
      global: true
    };

    const result = await StringReplaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});