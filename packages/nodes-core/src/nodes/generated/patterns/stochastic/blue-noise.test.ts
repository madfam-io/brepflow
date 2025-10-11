
import { describe, it, expect } from 'vitest';
import { BlueNoiseNode } from './blue-noise.node';
import { createTestContext } from '../test-utils';

describe('BlueNoiseNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      count: 100,
      minDistance: 1
    } as any;

    const result = await BlueNoiseNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
