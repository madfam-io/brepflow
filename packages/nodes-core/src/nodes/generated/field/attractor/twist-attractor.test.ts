
import { describe, it, expect } from 'vitest';
import { TwistAttractorNode } from './twistattractor-node';
import { createTestContext } from '../test-utils';

describe('TwistAttractorNode', () => {
  it('should create TwistAttractor', async () => {
    const context = createTestContext();
    const inputs = {
      axis: null
    };
    const params = {
      angle: 90,
      height: 100,
      radius: 50,
      falloff: "smooth"
    };

    const result = await TwistAttractorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.field).toBeDefined();
  });

  
});