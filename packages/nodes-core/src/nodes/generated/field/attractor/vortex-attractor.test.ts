
import { describe, it, expect } from 'vitest';
import { VortexAttractorNode } from './vortexattractor.node';
import { createTestContext } from './../../test-utils';

describe('VortexAttractorNode', () => {
  it('should create VortexAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      axis: null
    };
    const params = {
      strength: 1,
      radius: 100,
      coreRadius: 10,
      height: 200
    };

    const result = await VortexAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});