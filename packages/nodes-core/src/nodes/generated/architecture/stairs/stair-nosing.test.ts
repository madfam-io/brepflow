
import { describe, it, expect } from 'vitest';
import { StairNosingNode } from './stairnosing-node';
import { createTestContext } from '../test-utils';

describe('StairNosingNode', () => {
  it('should create StairNosing', async () => {
    const context = createTestContext();
    const inputs = {
      treadEdges: null
    };
    const params = {
      projection: 25,
      material: "aluminum"
    };

    const result = await StairNosingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.nosing).toBeDefined();
  });

  
});