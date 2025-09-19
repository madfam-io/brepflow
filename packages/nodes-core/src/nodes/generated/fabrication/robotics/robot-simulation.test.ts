
import { describe, it, expect } from 'vitest';
import { RobotSimulationNode } from './robotsimulation.node';
import { createTestContext } from './../../test-utils';

describe('RobotSimulationNode', () => {
  it('should create RobotSimulation', async () => {
    const context = createTestContext();
    const inputs = {
      program: null
    };
    const params = {
      timeStep: 0.01,
      dynamics: false
    };

    const result = await RobotSimulationNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.simulation).toBeDefined();
    expect(result.cycleTime).toBeDefined();
  });

  
});