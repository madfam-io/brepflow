
import { describe, it, expect } from 'vitest';
import { StringSplitNode } from './stringsplit.node';
import { createTestContext } from './../../test-utils';

describe('StringSplitNode', () => {
  it('should create StringSplit', async () => {
    const context = createTestContext();
    const inputs = {
      string: null
    };
    const params = {
      delimiter: ","
    };

    const result = await StringSplitNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.parts).toBeDefined();
  });

  
});