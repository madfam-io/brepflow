
import { describe, it, expect } from 'vitest';
import { RoboticMillingNode } from './robotic-milling.node';
import { createTestContext } from '../test-utils';

describe('RoboticMillingNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      millingPaths: undefined
    } as any;
    const params = {
      spindleSpeed: 10000,
      feedRate: 1000
    } as any;

    const result = await RoboticMillingNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
