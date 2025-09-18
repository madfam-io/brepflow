
import { describe, it, expect } from 'vitest';
import { EpoxyFloorNode } from './epoxyfloor-node';
import { createTestContext } from '../test-utils';

describe('EpoxyFloorNode', () => {
  it('should create EpoxyFloor', async () => {
    const context = createTestContext();
    const inputs = {
      floorSurface: null
    };
    const params = {
      thickness: 3,
      texture: "smooth"
    };

    const result = await EpoxyFloorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.epoxyFloor).toBeDefined();
  });

  
});