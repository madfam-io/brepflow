
import { describe, it, expect } from 'vitest';
import { RelativeNeighborhoodNode } from './relativeneighborhood.node';
import { createTestContext } from './../../test-utils';

describe('RelativeNeighborhoodNode', () => {
  it('should create RelativeNeighborhood', async () => {
    const context = createTestContext();
    const inputs = {
      points: null
    };
    const params = {
      
    };

    const result = await RelativeNeighborhoodNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.network).toBeDefined();
  });

  
});