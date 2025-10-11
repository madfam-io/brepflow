
import { describe, it, expect } from 'vitest';
import { VortexAttractorNode } from './vortex-attractor.node';
import { createTestContext } from '../test-utils';

describe('VortexAttractorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      axis: undefined
    } as any;
    const params = {
      strength: 1,
      radius: 100,
      coreRadius: 10,
      height: 200
    } as any;

    const result = await VortexAttractorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
