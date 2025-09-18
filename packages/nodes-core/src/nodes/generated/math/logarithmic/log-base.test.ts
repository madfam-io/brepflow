
import { describe, it, expect } from 'vitest';
import { LogBaseNode } from './logbase-node';
import { createTestContext } from '../test-utils';

describe('LogBaseNode', () => {
  it('should create LogBase', async () => {
    const context = createTestContext();
    const inputs = {
      value: /* test value */,
      base: /* test value */
    };
    const params = {
      
    };

    const result = await LogBaseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});