
import { describe, it, expect } from 'vitest';
import { IntersectionNode } from './intersection.node';
import { createTestContext } from './../test-utils';

describe('IntersectionNode', () => {
  it('should create Intersection', async () => {
    const context = createTestContext();
    const inputs = {
      shapes: null
    };
    const params = {
      keepOriginals: false,
      fuzzyValue: 1e-7
    };

    const result = await IntersectionNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
  });

  
});