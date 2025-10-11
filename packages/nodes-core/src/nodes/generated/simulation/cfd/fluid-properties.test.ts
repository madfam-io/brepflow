
import { describe, it, expect } from 'vitest';
import { FluidPropertiesNode } from './fluid-properties.node';
import { createTestContext } from '../test-utils';

describe('FluidPropertiesNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      domain: undefined
    } as any;
    const params = {
      fluid: "air",
      density: 1.225,
      viscosity: 0.0000181,
      compressible: false
    } as any;

    const result = await FluidPropertiesNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
