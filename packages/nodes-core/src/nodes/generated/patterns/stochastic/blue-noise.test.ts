
import { describe, it, expect } from 'vitest';
import { BlueNoiseNode } from './bluenoise-node';
import { createTestContext } from '../test-utils';

describe('BlueNoiseNode', () => {
  it('should create BlueNoise', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      count: 100,
      minDistance: 1
    };

    const result = await BlueNoiseNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.points).toBeDefined();
  });

  
});