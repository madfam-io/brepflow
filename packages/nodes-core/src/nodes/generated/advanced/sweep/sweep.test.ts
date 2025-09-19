
import { describe, it, expect } from 'vitest';
import { SweepNode } from './sweep.node';
import { createTestContext } from './../../test-utils';

describe('SweepNode', () => {
  it('should create Sweep', async () => {
    const context = createTestContext();
    const inputs = {
      profile: null,
      path: null
    };
    const params = {
      twistAngle: 0,
      scaleFactor: 1,
      keepOrientation: false,
      solid: true
    };

    const result = await SweepNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});