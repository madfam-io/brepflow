
import { describe, it, expect } from 'vitest';
import { OrientNode } from './orient-node';
import { createTestContext } from '../test-utils';

describe('OrientNode', () => {
  it('should create Orient', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null,
      fromDirection: null,
      toDirection: null
    };
    const params = {
      
    };

    const result = await OrientNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.oriented).toBeDefined();
  });

  
});