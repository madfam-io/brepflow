
import { describe, it, expect } from 'vitest';
import { JitteredGridNode } from './jitteredgrid.node';
import { createTestContext } from './../../test-utils';

describe('JitteredGridNode', () => {
  it('should create JitteredGrid', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      gridSize: 10,
      jitter: 0.5
    };

    const result = await JitteredGridNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.points).toBeDefined();
  });

  
});