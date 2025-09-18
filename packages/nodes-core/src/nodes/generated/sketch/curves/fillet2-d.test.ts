
import { describe, it, expect } from 'vitest';
import { Fillet2DNode } from './fillet2d-node';
import { createTestContext } from '../test-utils';

describe('Fillet2DNode', () => {
  it('should create Fillet2D', async () => {
    const context = createTestContext();
    const inputs = {
      wire: null
    };
    const params = {
      radius: 5,
      allCorners: true
    };

    const result = await Fillet2DNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.filleted).toBeDefined();
  });

  
});