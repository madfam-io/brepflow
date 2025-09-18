
import { describe, it, expect } from 'vitest';
import { MezzanineFloorNode } from './mezzaninefloor-node';
import { createTestContext } from '../test-utils';

describe('MezzanineFloorNode', () => {
  it('should create MezzanineFloor', async () => {
    const context = createTestContext();
    const inputs = {
      mezzanineOutline: null
    };
    const params = {
      structureType: "steel",
      clearHeight: 2400
    };

    const result = await MezzanineFloorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.mezzanine).toBeDefined();
    expect(result.structure).toBeDefined();
  });

  
});