
import { describe, it, expect } from 'vitest';
import { RobotSimulationNode } from './robot-simulation.node';
import { createTestContext } from '../test-utils';

describe('RobotSimulationNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      program: undefined
    } as any;
    const params = {
      timeStep: 0.01,
      dynamics: false
    } as any;

    const result = await RobotSimulationNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
