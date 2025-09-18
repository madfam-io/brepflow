
import { describe, it, expect } from 'vitest';
import { CompositeFloorNode } from './compositefloor-node';
import { createTestContext } from '../test-utils';

describe('CompositeFloorNode', () => {
  it('should create CompositeFloor', async () => {
    const context = createTestContext();
    const inputs = {
      floorOutline: /* test value */,
      beams: /* test value */
    };
    const params = {
      deckType: "3-inch",
      concreteThickness: 100
    };

    const result = await CompositeFloorNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.compositeFloor).toBeDefined();
    expect(result.deck).toBeDefined();
  });

  
});