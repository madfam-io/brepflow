
import { describe, it, expect } from 'vitest';
import { FragmentNode } from './fragment-node';
import { createTestContext } from '../test-utils';

describe('FragmentNode', () => {
  it('should create Fragment', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null
    };
    const params = {
      
    };

    const result = await FragmentNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fragments).toBeDefined();
  });

  
});