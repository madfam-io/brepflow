
import { describe, it, expect } from 'vitest';
import { CenterOfMassNode } from './centerofmass.node';
import { createTestContext } from './../../test-utils';

describe('CenterOfMassNode', () => {
  it('should create CenterOfMass', async () => {
    const context = createTestContext();
    const inputs = {
      shape: null
    };
    const params = {
      density: 1
    };

    const result = await CenterOfMassNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.center).toBeDefined();
    expect(result.mass).toBeDefined();
  });

  
});