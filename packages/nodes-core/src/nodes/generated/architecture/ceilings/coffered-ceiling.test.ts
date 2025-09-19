
import { describe, it, expect } from 'vitest';
import { CofferedCeilingNode } from './cofferedceiling.node';
import { createTestContext } from './../../test-utils';

describe('CofferedCeilingNode', () => {
  it('should create CofferedCeiling', async () => {
    const context = createTestContext();
    const inputs = {
      ceilingBoundary: null
    };
    const params = {
      cofferSize: 1200,
      cofferDepth: 150,
      beamWidth: 200
    };

    const result = await CofferedCeilingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.cofferedCeiling).toBeDefined();
  });

  
});