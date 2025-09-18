
import { describe, it, expect } from 'vitest';
import { HelicalRampNode } from './helicalramp-node';
import { createTestContext } from '../test-utils';

describe('HelicalRampNode', () => {
  it('should create HelicalRamp', async () => {
    const context = createTestContext();
    const inputs = {
      centerPoint: /* test value */,
      levels: /* test value */
    };
    const params = {
      radius: 15000,
      pitch: 3000,
      width: 7000
    };

    const result = await HelicalRampNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.helicalRamp).toBeDefined();
  });

  
});