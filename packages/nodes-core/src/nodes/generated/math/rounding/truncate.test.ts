
import { describe, it, expect } from 'vitest';
import { TruncateNode } from './truncate-node';
import { createTestContext } from '../test-utils';

describe('TruncateNode', () => {
  it('should create Truncate', async () => {
    const context = createTestContext();
    const inputs = {
      value: /* test value */
    };
    const params = {
      
    };

    const result = await TruncateNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});