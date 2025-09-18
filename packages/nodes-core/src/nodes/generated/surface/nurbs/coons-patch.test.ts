
import { describe, it, expect } from 'vitest';
import { CoonsPatchNode } from './coonspatch-node';
import { createTestContext } from '../test-utils';

describe('CoonsPatchNode', () => {
  it('should create CoonsPatch', async () => {
    const context = createTestContext();
    const inputs = {
      edge1: /* test value */,
      edge2: /* test value */,
      edge3: /* test value */,
      edge4: /* test value */
    };
    const params = {
      
    };

    const result = await CoonsPatchNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});