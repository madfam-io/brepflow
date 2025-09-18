
import { describe, it, expect } from 'vitest';
import { PickAndPlaceNode } from './pickandplace-node';
import { createTestContext } from '../test-utils';

describe('PickAndPlaceNode', () => {
  it('should create PickAndPlace', async () => {
    const context = createTestContext();
    const inputs = {
      pickPoints: /* test value */,
      placePoints: /* test value */
    };
    const params = {
      gripperType: "parallel",
      approachAngle: 0
    };

    const result = await PickAndPlaceNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.pickPlaceSequence).toBeDefined();
  });

  
});