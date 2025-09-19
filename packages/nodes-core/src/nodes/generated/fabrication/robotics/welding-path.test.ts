
import { describe, it, expect } from 'vitest';
import { WeldingPathNode } from './weldingpath.node';
import { createTestContext } from './../../test-utils';

describe('WeldingPathNode', () => {
  it('should create WeldingPath', async () => {
    const context = createTestContext();
    const inputs = {
      seamPath: null
    };
    const params = {
      weldType: "mig",
      weavePattern: "none",
      travelSpeed: 10
    };

    const result = await WeldingPathNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.weldPath).toBeDefined();
    expect(result.weldParameters).toBeDefined();
  });

  
});