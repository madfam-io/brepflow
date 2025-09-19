
import { describe, it, expect } from 'vitest';
import { MountingBossNode } from './mountingboss.node';
import { createTestContext } from './../../test-utils';

describe('MountingBossNode', () => {
  it('should create MountingBoss', async () => {
    const context = createTestContext();
    const inputs = {
      face: null,
      position: null
    };
    const params = {
      outerDiameter: 12,
      innerDiameter: 5,
      height: 10,
      draftAngle: 1
    };

    const result = await MountingBossNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.shape).toBeDefined();
  });

  
});