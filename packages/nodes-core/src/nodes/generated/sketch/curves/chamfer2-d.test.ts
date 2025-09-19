
import { describe, it, expect } from 'vitest';
import { Chamfer2DNode } from './chamfer2d-node';
import { createTestContext } from './../../test-utils';

describe('Chamfer2DNode', () => {
  it('should create Chamfer2D', async () => {
    const context = createTestContext();
    const inputs = {
      wire: null
    };
    const params = {
      distance: 5
    };

    const result = await Chamfer2DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.chamfered).toBeDefined();
  });

  
});