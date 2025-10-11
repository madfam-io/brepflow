
import { describe, it, expect } from 'vitest';
import { JitteredGridNode } from './jittered-grid.node';
import { createTestContext } from '../test-utils';

describe('JitteredGridNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      gridSize: 10,
      jitter: 0.5
    } as any;

    const result = await JitteredGridNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
