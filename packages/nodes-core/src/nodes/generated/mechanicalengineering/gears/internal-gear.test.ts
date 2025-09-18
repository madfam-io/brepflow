
import { describe, it, expect } from 'vitest';
import { InternalGearNode } from './internalgear-node';
import { createTestContext } from '../test-utils';

describe('InternalGearNode', () => {
  it('should create InternalGear', async () => {
    const context = createTestContext();
    const inputs = {
      center: /* test value */
    };
    const params = {
      module: 2,
      teeth: 60,
      rimThickness: 10,
      width: 20
    };

    const result = await InternalGearNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.gear).toBeDefined();
    expect(result.innerProfile).toBeDefined();
  });

  
});