
import { describe, it, expect } from 'vitest';
import { CylindricalFieldNode } from './cylindricalfield.node';
import { createTestContext } from './../../test-utils';

describe('CylindricalFieldNode', () => {
  it('should create CylindricalField', async () => {
    const context = createTestContext();
    const inputs = {
      axis: null
    };
    const params = {
      radius: 50,
      height: 100,
      falloff: "smooth"
    };

    const result = await CylindricalFieldNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});