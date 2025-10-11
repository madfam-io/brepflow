
import { describe, it, expect } from 'vitest';
import { RobotKinematicsNode } from './robot-kinematics.node';
import { createTestContext } from '../test-utils';

describe('RobotKinematicsNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      target: undefined
    } as any;
    const params = {
      robotType: "6-axis",
      solver: "inverse"
    } as any;

    const result = await RobotKinematicsNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
