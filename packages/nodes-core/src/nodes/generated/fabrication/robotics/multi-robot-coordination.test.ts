
import { describe, it, expect } from 'vitest';
import { MultiRobotCoordinationNode } from './multi-robot-coordination.node';
import { createTestContext } from '../test-utils';

describe('MultiRobotCoordinationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      robotPaths: undefined
    } as any;
    const params = {
      syncMethod: "position"
    } as any;

    const result = await MultiRobotCoordinationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
