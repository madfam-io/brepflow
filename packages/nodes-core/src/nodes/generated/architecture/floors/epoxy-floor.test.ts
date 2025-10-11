
import { describe, it, expect } from 'vitest';
import { EpoxyFloorNode } from './epoxy-floor.node';
import { createTestContext } from '../test-utils';

describe('EpoxyFloorNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      floorSurface: undefined
    } as any;
    const params = {
      thickness: 3,
      texture: "smooth"
    } as any;

    const result = await EpoxyFloorNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
