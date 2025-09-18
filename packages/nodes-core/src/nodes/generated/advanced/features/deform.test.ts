
import { describe, it, expect } from 'vitest';
import { DeformNode } from './deform-node';
import { createTestContext } from '../test-utils';

describe('DeformNode', () => {
  it('should create Deform', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null,
      controlPoints: null,
      targetPoints: null
    };
    const params = {
      deformType: "point",
      radius: 50,
      stiffness: 0.5
    };

    const result = await DeformNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.deformed).toBeDefined();
  });

  
});