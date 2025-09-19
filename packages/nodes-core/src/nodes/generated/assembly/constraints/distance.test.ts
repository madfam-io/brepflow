
import { describe, it, expect } from 'vitest';
import { DistanceNode } from './distance.node';
import { createTestContext } from './../../test-utils';

describe('DistanceNode', () => {
  it('should create Distance', async () => {
    const context = createTestContext();
    const inputs = {
      entity1: null,
      entity2: null
    };
    const params = {
      distance: 10,
      minimum: false
    };

    const result = await DistanceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.constrained).toBeDefined();
    expect(result.constraint).toBeDefined();
  });

  
});