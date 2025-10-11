
import { describe, it, expect } from 'vitest';
import { MezzanineFloorNode } from './mezzanine-floor.node';
import { createTestContext } from '../test-utils';

describe('MezzanineFloorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      mezzanineOutline: undefined
    } as any;
    const params = {
      structureType: "steel",
      clearHeight: 2400
    } as any;

    const result = await MezzanineFloorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
