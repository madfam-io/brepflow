
import { describe, it, expect } from 'vitest';
import { SwarmMillingNode } from './swarmmilling-node';
import { createTestContext } from '../test-utils';

describe('SwarmMillingNode', () => {
  it('should create SwarmMilling', async () => {
    const context = createTestContext();
    const inputs = {
      surface: null
    };
    const params = {
      passCount: 5,
      overlap: 0.1
    };

    const result = await SwarmMillingNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.swarmPaths).toBeDefined();
  });

  
});