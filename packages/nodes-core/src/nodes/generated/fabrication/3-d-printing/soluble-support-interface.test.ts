
import { describe, it, expect } from 'vitest';
import { SolubleSupportInterfaceNode } from './soluble-support-interface.node';
import { createTestContext } from '../test-utils';

describe('SolubleSupportInterfaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      supports: undefined
    } as any;
    const params = {
      interfaceLayers: 2,
      interfaceDensity: 0.9
    } as any;

    const result = await SolubleSupportInterfaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
