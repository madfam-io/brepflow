
import { describe, it, expect } from 'vitest';
import { PoissonDiskNode } from './poissondisk.node';
import { createTestContext } from './../../test-utils';

describe('PoissonDiskNode', () => {
  it('should create PoissonDisk', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: null
    };
    const params = {
      radius: 5,
      k: 30
    };

    const result = await PoissonDiskNode.evaluate(context, inputs, params);

    expect(result).toBeDefined();
    expect(result.points).toBeDefined();
  });

  
});