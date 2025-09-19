
import { describe, it, expect } from 'vitest';
import { RobotKinematicsNode } from './robotkinematics.node';
import { createTestContext } from './../../test-utils';

describe('RobotKinematicsNode', () => {
  it('should create RobotKinematics', async () => {
    const context = createTestContext();
    const inputs = {
      target: null
    };
    const params = {
      robotType: "6-axis",
      solver: "inverse"
    };

    const result = await RobotKinematicsNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.jointAngles).toBeDefined();
    expect(result.reachable).toBeDefined();
  });

  
});