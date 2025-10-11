
import { describe, it, expect } from 'vitest';
import { PoissonDiskNode } from './poisson-disk.node';
import { createTestContext } from '../test-utils';

describe('PoissonDiskNode', () => {
  it('should evaluate without throwing', async () => {
    const context = createTestContext();
    const inputs = {
      boundary: undefined
    } as any;
    const params = {
      radius: 5,
      k: 30
    } as any;

    const result = await PoissonDiskNode.evaluate(context, inputs, params);
    expect(result).toBeDefined();
  });
});
