
import { describe, it, expect } from 'vitest';
import { CoonsPatchNode } from './coonspatch.node';
import { createTestContext } from './../../test-utils';

describe('CoonsPatchNode', () => {
  it('should create CoonsPatch', async () => {
    const context = createTestContext();
    const inputs = {
      edge1: null,
      edge2: null,
      edge3: null,
      edge4: null
    };
    const params = {
      
    };

    const result = await CoonsPatchNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.surface).toBeDefined();
  });

  
});