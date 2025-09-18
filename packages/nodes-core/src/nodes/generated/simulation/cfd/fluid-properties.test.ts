
import { describe, it, expect } from 'vitest';
import { FluidPropertiesNode } from './fluidproperties-node';
import { createTestContext } from '../test-utils';

describe('FluidPropertiesNode', () => {
  it('should create FluidProperties', async () => {
    const context = createTestContext();
    const inputs = {
      domain: /* test value */
    };
    const params = {
      fluid: "air",
      density: 1.225,
      viscosity: 0.0000181,
      compressible: false
    };

    const result = await FluidPropertiesNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.fluidDomain).toBeDefined();
    expect(result.fluidData).toBeDefined();
  });

  
});