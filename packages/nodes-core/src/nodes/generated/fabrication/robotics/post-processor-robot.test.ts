
import { describe, it, expect } from 'vitest';
import { PostProcessorRobotNode } from './post-processor-robot.node';
import { createTestContext } from '../test-utils';

describe('PostProcessorRobotNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      trajectory: undefined
    } as any;
    const params = {
      robotBrand: "abb"
    } as any;

    const result = await PostProcessorRobotNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
