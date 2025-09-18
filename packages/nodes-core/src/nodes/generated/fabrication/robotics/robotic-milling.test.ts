
import { describe, it, expect } from 'vitest';
import { RoboticMillingNode } from './roboticmilling-node';
import { createTestContext } from '../test-utils';

describe('RoboticMillingNode', () => {
  it('should create RoboticMilling', async () => {
    const context = createTestContext();
    const inputs = {
      millingPaths: /* test value */
    };
    const params = {
      spindleSpeed: 10000,
      feedRate: 1000
    };

    const result = await RoboticMillingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.robotProgram).toBeDefined();
  });

  
});