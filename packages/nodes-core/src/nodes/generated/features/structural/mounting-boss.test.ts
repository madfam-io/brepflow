
import { describe, it, expect } from 'vitest';
import { MountingBossNode } from './mounting-boss.node';
import { createTestContext } from '../test-utils';

describe('MountingBossNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      face: undefined,
      position: undefined
    } as any;
    const params = {
      outerDiameter: 12,
      innerDiameter: 5,
      height: 10,
      draftAngle: 1
    } as any;

    const result = await MountingBossNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
