
import { describe, it, expect } from 'vitest';
import { PathArrayNode } from './patharray-node';
import { createTestContext } from '../test-utils';

describe('PathArrayNode', () => {
  it('should create PathArray', async () => {
    const context = createTestContext();
    const inputs = {
      shape: /* test value */,
      path: /* test value */
    };
    const params = {
      count: 10,
      alignToPath: true,
      spacing: "equal",
      distance: 50,
      merge: false
    };

    const result = await PathArrayNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.array).toBeDefined();
    expect(result.merged).toBeDefined();
  });

  
});