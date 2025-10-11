
import { describe, it, expect } from 'vitest';
import { PickAndPlaceNode } from './pick-and-place.node';
import { createTestContext } from '../test-utils';

describe('PickAndPlaceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      pickPoints: undefined,
      placePoints: undefined
    } as any;
    const params = {
      gripperType: "parallel",
      approachAngle: 0
    } as any;

    const result = await PickAndPlaceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
