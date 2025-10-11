
import { describe, it, expect } from 'vitest';
import { CollisionAvoidanceNode } from './collision-avoidance.node';
import { createTestContext } from '../test-utils';

describe('CollisionAvoidanceNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      robotPath: undefined,
      environment: undefined
    } as any;
    const params = {
      safetyMargin: 10
    } as any;

    const result = await CollisionAvoidanceNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
