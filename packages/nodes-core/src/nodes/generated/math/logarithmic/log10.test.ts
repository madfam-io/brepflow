
import { describe, it, expect } from 'vitest';
import { Log10Node } from './log10-node';
import { createTestContext } from '../test-utils';

describe('Log10Node', () => {
  it('should create Log10', async () => {
    const context = createTestContext();
    const inputs = {
      value: /* test value */
    };
    const params = {
      
    };

    const result = await Log10Node.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});