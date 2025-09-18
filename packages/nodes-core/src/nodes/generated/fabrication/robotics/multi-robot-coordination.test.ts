
import { describe, it, expect } from 'vitest';
import { MultiRobotCoordinationNode } from './multirobotcoordination-node';
import { createTestContext } from '../test-utils';

describe('MultiRobotCoordinationNode', () => {
  it('should create MultiRobotCoordination', async () => {
    const context = createTestContext();
    const inputs = {
      robotPaths: null
    };
    const params = {
      syncMethod: "position"
    };

    const result = await MultiRobotCoordinationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.synchronizedPaths).toBeDefined();
  });

  
});