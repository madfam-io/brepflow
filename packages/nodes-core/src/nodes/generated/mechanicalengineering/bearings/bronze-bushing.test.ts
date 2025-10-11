
import { describe, it, expect } from 'vitest';
import { BronzeBushingNode } from './bronze-bushing.node';
import { createTestContext } from '../test-utils';

describe('BronzeBushingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      center: undefined
    } as any;
    const params = {
      innerDiameter: 10,
      outerDiameter: 14,
      length: 15,
      oilGrooves: true,
      flanged: false
    } as any;

    const result = await BronzeBushingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
