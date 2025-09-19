
import { describe, it, expect } from 'vitest';
import { SetIntersectionNode } from './setintersection.node';
import { createTestContext } from './../../test-utils';

describe('SetIntersectionNode', () => {
  it('should create SetIntersection', async () => {
    const context = createTestContext();
    const inputs = {
      setA: null,
      setB: null
    };
    const params = {
      
    };

    const result = await SetIntersectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.intersection).toBeDefined();
  });

  
});