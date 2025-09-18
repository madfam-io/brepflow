
import { describe, it, expect } from 'vitest';
import { OldhamCouplingNode } from './oldhamcoupling-node';
import { createTestContext } from '../test-utils';

describe('OldhamCouplingNode', () => {
  it('should create OldhamCoupling', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      hubDiameter: 40,
      discDiameter: 35,
      slotWidth: 8,
      totalLength: 40
    };

    const result = await OldhamCouplingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.assembly).toBeDefined();
    expect(result.hubs).toBeDefined();
    expect(result.disc).toBeDefined();
  });

  
});