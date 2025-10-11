
import { describe, it, expect } from 'vitest';
import { HelicalGearNode } from './helical-gear.node';
import { createTestContext } from '../test-utils';

describe('HelicalGearNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {

    } as any;
    const params = {
      module: 2,
      teeth: 20,
      helixAngle: 15,
      width: 20,
      handedness: "right"
    } as any;

    const result = await HelicalGearNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
