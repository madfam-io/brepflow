
import { describe, it, expect } from 'vitest';
import { ConstrainedDelaunayNode } from './constraineddelaunay-node';
import { createTestContext } from '../test-utils';

describe('ConstrainedDelaunayNode', () => {
  it('should create ConstrainedDelaunay', async () => {
    const context = createTestContext();
    const inputs = {
      points: null,
      boundary: null
    };
    const params = {
      refinement: true,
      maxArea: 100
    };

    const result = await ConstrainedDelaunayNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.triangulation).toBeDefined();
  });

  
});