
import { describe, it, expect } from 'vitest';
import { SolubleSupportInterfaceNode } from './solublesupportinterface.node';
import { createTestContext } from './../../test-utils';

describe('SolubleSupportInterfaceNode', () => {
  it('should create SolubleSupportInterface', async () => {
    const context = createTestContext();
    const inputs = {
      supports: null
    };
    const params = {
      interfaceLayers: 2,
      interfaceDensity: 0.9
    };

    const result = await SolubleSupportInterfaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.interface).toBeDefined();
  });

  
});