
import { describe, it, expect } from 'vitest';
import { PostProcessorRobotNode } from './postprocessorrobot-node';
import { createTestContext } from '../test-utils';

describe('PostProcessorRobotNode', () => {
  it('should create PostProcessorRobot', async () => {
    const context = createTestContext();
    const inputs = {
      trajectory: null
    };
    const params = {
      robotBrand: "abb"
    };

    const result = await PostProcessorRobotNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.robotCode).toBeDefined();
  });

  
});