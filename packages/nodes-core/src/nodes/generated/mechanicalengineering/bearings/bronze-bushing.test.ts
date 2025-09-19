
import { describe, it, expect } from 'vitest';
import { BronzeBushingNode } from './bronzebushing.node';
import { createTestContext } from './../../test-utils';

describe('BronzeBushingNode', () => {
  it('should create BronzeBushing', async () => {
    const context = createTestContext();
    const inputs = {
      center: null
    };
    const params = {
      innerDiameter: 10,
      outerDiameter: 14,
      length: 15,
      oilGrooves: true,
      flanged: false
    };

    const result = await BronzeBushingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.bushing).toBeDefined();
    expect(result.grooves).toBeDefined();
  });

  
});